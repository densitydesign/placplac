import json
import os
import shutil
from zipfile import ZipFile

import tablib
from django.conf import settings
from django.db import transaction
from rest_framework.exceptions import ValidationError

from authentication.models import User
from cms.export_import.resources import ProjectResource, ProjectMediaResource, ExperimentResource, \
    ExperimentAdditionalMaterialResource, \
    StepResource, StepDownloadResource, GlossaryCategoryResource, GlossaryTermResource, ReferenceResource, \
    replace_values_in_project
from cms.models import ProjectUser
from cms.services.project import add_user_to_project


def get_import_dataset(*, data: dict, resource, resource_args: dict = None):
    resource_args = resource_args if resource_args else {}
    dataset_import = tablib.Dataset()
    dataset_import.dict = data
    project_resource = resource(**resource_args)
    result = project_resource.import_data(dataset_import, raise_errors=True)
    return getattr(project_resource, "instance", None), result


def extract_media(*, archive, project):
    destination = os.path.join(settings.MEDIA_ROOT, str(project.id))
    if not os.path.exists(destination):
        os.makedirs(destination)
    for member in archive.namelist():
        if member.startswith('media/') and not member.endswith('/'):
            filename = os.path.basename(member)
            source = archive.open(member)

            target = open(os.path.join(destination, filename), "wb")
            with source, target:
                shutil.copyfileobj(source, target)


def clean_up(project_id):
    destination = os.path.join(settings.MEDIA_ROOT, str(project_id))
    shutil.rmtree(destination, ignore_errors=True)


@transaction.atomic
def make_import(*, file, user_request: User):
    with ZipFile(file) as zip_file:
        names = zip_file.namelist()
        if "data.json" not in names or "media/" not in names:
            raise ValidationError({"file": ["The file has a wrong format"]})
        dataset = json.loads(zip_file.read("data.json"))
        project, project_result = get_import_dataset(data=dataset["project"], resource=ProjectResource)
        add_user_to_project(user=user_request, level=ProjectUser.LevelChoices.AUTHOR, project=project)
        extract_media(archive=zip_file, project=project)
        try:
            get_import_dataset(data=dataset["project_media"], resource=ProjectMediaResource,
                               resource_args={"project": project})
            get_import_dataset(data=dataset["references"], resource=ReferenceResource,
                               resource_args={"project": project})

            imported_experiments = []
            for experiment_dataset in dataset["experiments"]:
                experiment, experiment_result = get_import_dataset(data=experiment_dataset["experiment"],
                                                                   resource=ExperimentResource,
                                                                   resource_args={"project": project})
                imported_experiments.append(
                    {"new": experiment_result.rows[0].object_id, "old": experiment_dataset["experiment"][0]})
                get_import_dataset(data=experiment_dataset["experiment_additional_material"],
                                   resource=ExperimentAdditionalMaterialResource,
                                   resource_args={"experiment": experiment})

                for step_dataset in experiment_dataset["steps"]:
                    step, step_result = get_import_dataset(data=step_dataset["step"],
                                                           resource_args={"experiment": experiment},
                                                           resource=StepResource)
                    get_import_dataset(data=step_dataset["step_downloads"],
                                       resource=StepDownloadResource,
                                       resource_args={"step": step})
            imported_glossary_categories = []
            for glossary_category_dataset in dataset["glossary_categories"]:
                glossary_category, glossary_category_result = get_import_dataset(
                    data=glossary_category_dataset["glossary_category"],
                    resource=GlossaryCategoryResource,
                    resource_args={"project": project})
                imported_glossary_categories.append({"new": glossary_category_result.rows[0].object_id,
                                                     "old": glossary_category_dataset["glossary_category"][0]})

                get_import_dataset(data=glossary_category_dataset["glossary_terms"],
                                   resource=GlossaryTermResource,
                                   resource_args={"project": project, "glossary_category": glossary_category})

            old_media_path = f"media/{dataset['project'][0]['old_id']}/"
            new_media_path = f"media/{project.id}/"
            replace_values_in_project(project=project, old=old_media_path, new=new_media_path,
                                      method_for_attribute_list="get_to_replace_media_attributes")
            for glossary_category in imported_glossary_categories:
                old_path = f"glossary/{glossary_category['old']['old_id']}#"
                new_path = f"glossary/{glossary_category['new']}#"
                replace_values_in_project(project=project, old=old_path, new=new_path,
                                          method_for_attribute_list="get_to_replace_glossary_attributes")
            for experiment in imported_experiments:
                old_path = f"experiments/{experiment['old']['old_id']}#"
                new_path = f"experiments/{experiment['new']}#"
                replace_values_in_project(project=project, old=old_path, new=new_path,
                                          method_for_attribute_list="get_to_replace_glossary_attributes")
            return project
        except Exception as e:
            settings.LOGGER.error(e)
            clean_up(project.id)
            transaction.set_rollback(True)
        return None
