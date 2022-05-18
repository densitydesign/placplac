import json
import json
import os
import shutil
import tempfile

from django.conf import settings

from cms.export_import.resources import ProjectResource, ProjectMediaResource, ExperimentResource, \
    ExperimentAdditionalMaterialResource, \
    StepResource, StepDownloadResource, GlossaryCategoryResource, GlossaryTermResource, ReferenceResource
from cms.models import Project, ProjectMedia, StepDownload, ExperimentAdditionalMaterial


def get_project_dataset(*,project:Project):
    dataset_project = ProjectResource().export([project])
    dataset_references = ReferenceResource().export(project.reference_set.all())
    dataset_project_media = ProjectMediaResource().export(project.projectmedia_set.all())
    project_dataset = {"project": dataset_project.dict,
                       "experiments": [],
                       "glossary_categories": [],
                       "references": dataset_references.dict,
                       "project_media": dataset_project_media.dict}
    for glossary_category in project.glossarycategory_set.all():
        dataset_glossary_category = GlossaryCategoryResource().export([glossary_category])
        dataset_glossary_terms = GlossaryTermResource().export(glossary_category.glossaryterm_set.all())
        glossary_category_dataset = {"glossary_category": dataset_glossary_category.dict,
                                     "glossary_terms": dataset_glossary_terms.dict}
        project_dataset["glossary_categories"].append(glossary_category_dataset)

    for experiment in project.experiment_set.all():
        dataset_experiment = ExperimentResource().export([experiment])
        dataset_experiment_additional_material = ExperimentAdditionalMaterialResource().export(
            ExperimentAdditionalMaterial.objects.filter(experiment=experiment))
        print(dataset_experiment.dict)
        experiment_dataset = {"experiment": dataset_experiment.dict,
                              "experiment_additional_material": dataset_experiment_additional_material.dict,
                              "steps": []
                              }
        for step in experiment.step_set.all():
            dataset_step = StepResource().export([step])
            dataset_step_download = StepDownloadResource().export(step.stepdownload_set.all())
            step_dataset = {"step": dataset_step.dict,
                            "step_downloads": dataset_step_download.dict}
            experiment_dataset["steps"].append(step_dataset)
        project_dataset["experiments"].append(experiment_dataset)
    return project_dataset

def get_paths_to_copy(*, project:Project):
    downloads = [download.file.path for download in StepDownload.objects.filter(step__experiment__project=project)]
    additional_materials = [additional_material.file.path for additional_material in ExperimentAdditionalMaterial.objects.filter(experiment__project=project)]
    project_media =[media.file.path for media in ProjectMedia.objects.filter(project=project)]
    return downloads + additional_materials + project_media

def make_export(*,project:Project):
    dataset = get_project_dataset(project=project)
    files_to_copy_paths= get_paths_to_copy(project=project)
    with tempfile.TemporaryDirectory() as tmp_dirname:
        tmp_dirname = tmp_dirname + "/export"
        downloads_path = os.path.join(tmp_dirname,"files", "media")
        if not os.path.isdir(downloads_path):
            os.makedirs(downloads_path)
        for path in files_to_copy_paths:
            try:
                shutil.copy(path, downloads_path)
            except FileNotFoundError as e:
                settings.LOGGER.error("File not found")

        file = os.path.join(tmp_dirname,"files", "data.json")
        with open(file, 'w') as f:
            json.dump(dataset,f)

        zip_name = os.path.join(tmp_dirname, f"{project.title}")
        out_directory = os.path.join(tmp_dirname,"files")
        zip_file = open(shutil.make_archive(zip_name, 'zip', out_directory), 'rb')
        return zip_file