import json
import os
from typing import List

from django.db.models.fields.files import FieldFile
from import_export import resources
from import_export.fields import Field

from cms.models import Project, ProjectMedia, Experiment, ExperimentAdditionalMaterial, Step, StepDownload, \
    GlossaryCategory, GlossaryTerm, Reference


class CustomResource(resources.ModelResource):
    def get_instance(self, instance_loader, row):
        return

    def after_save_instance(self, instance, using_transactions, dry_run):
        self.instance = instance
        return super().after_save_instance(instance, using_transactions, dry_run)


class ProjectResource(CustomResource):
    old_id = Field(attribute='id', column_name='old_id', readonly=True)

    class Meta:
        model = Project
        force_init_instance = True
        exclude = ("id", "last_build_time", "base_path_build", "last_build")
        skip_diff = True


def replace_attributes(*, attributes: List[str], object: object, old: str, new: str):
    def get_new_value(value):
        if value:
            if isinstance(value, dict):
                value = json.dumps(value)
                value = value.replace(old, new)
                value = json.loads(value)
            elif isinstance(value, list):
                new_value = []
                for v in value:
                    new_value.append(get_new_value(v))
                value = new_value
            elif isinstance(value, FieldFile):
                value.name = value.name.replace(old, new)
            else:
                value = value.replace(old, new)
        return value

    for attr in attributes:
        value = getattr(object, attr)

        value = get_new_value(value)
        setattr(object, attr, value)


def replace_values_in_project(old: str, new: str, project: Project, method_for_attribute_list: str):
    replace_attributes(
        attributes=getattr(Project, method_for_attribute_list)(),
        object=project,
        old=old,
        new=new)
    project.save()
    for experiment in project.experiment_set.all():
        replace_attributes(
            attributes=getattr(Experiment, method_for_attribute_list)(),
            object=experiment,
            old=old,
            new=new)

        experiment.save()
        for experiment_add in experiment.experimentadditionalmaterial_set.all():
            replace_attributes(
                attributes=getattr(ExperimentAdditionalMaterial, method_for_attribute_list)(),
                object=experiment_add,
                old=old,
                new=new)
            experiment_add.save()
        for step in experiment.step_set.all():
            replace_attributes(
                attributes=getattr(Step, method_for_attribute_list)(),
                object=step,
                old=old,
                new=new)
            step.save()
            for step_d in step.stepdownload_set.all():
                replace_attributes(
                    attributes=getattr(StepDownload, method_for_attribute_list)(),
                    object=step_d,
                    old=old,
                    new=new)
                step_d.save()
    for category in project.glossarycategory_set.all():
        replace_attributes(
            attributes=getattr(GlossaryCategory, method_for_attribute_list)(),
            object=category,
            old=old,
            new=new)
        category.save()
    for term in project.glossaryterm_set.all():
        replace_attributes(
            attributes=getattr(GlossaryTerm, method_for_attribute_list)(),
            object=term,
            old=old,
            new=new)
        term.save()
    for reference in project.reference_set.all():
        replace_attributes(
            attributes=getattr(Reference, method_for_attribute_list)(),
            object=reference,
            old=old,
            new=new)
        reference.save()


class ProjectMediaResource(CustomResource):
    old_id = Field(attribute='id', column_name='old_id', readonly=True)

    def __init__(self, *args, **kwargs):
        self._project = kwargs.pop('project', None)
        super().__init__()

    def before_save_instance(self, instance, using_transactions, dry_run):
        print("setting project", self._project)
        setattr(instance, "project", self._project)

    def before_import_row(self, row, row_number=None, **kwargs):
        file_path = f"{self._project.id}/{row['file']}"
        print(file_path)
        row["file"] = file_path

    def dehydrate_file(self, media):
        return os.path.basename(media.file.path)

    def dehydrate_short_description(self, media):
        return os.path.basename(media.file.path)

    class Meta:
        model = ProjectMedia
        exclude = ("project", "id")
        skip_diff = True


class ExperimentResource(CustomResource):
    old_id = Field(attribute='id', column_name='old_id', readonly=True)

    def __init__(self, *args, **kwargs):
        self._project = kwargs.pop('project', None)
        super().__init__()

    def before_save_instance(self, instance, using_transactions, dry_run):
        setattr(instance, "project", self._project)

    class Meta:
        model = Experiment
        exclude = ("project", "id")
        skip_diff = True


class ExperimentAdditionalMaterialResource(CustomResource):
    old_id = Field(attribute='id', column_name='old_id', readonly=True)

    def __init__(self, *args, **kwargs):
        self._experiment = kwargs.pop('experiment', None)
        super().__init__()

    def before_save_instance(self, instance, using_transactions, dry_run):
        setattr(instance, "experiment", self._experiment)

    class Meta:
        model = ExperimentAdditionalMaterial
        skip_diff = True
        exclude = ("experiment", "id")


class StepResource(CustomResource):
    old_id = Field(attribute='id', column_name='old_id', readonly=True)

    def __init__(self, *args, **kwargs):
        self._experiment = kwargs.pop('experiment', None)
        super().__init__()

    def before_save_instance(self, instance, using_transactions, dry_run):
        setattr(instance, "experiment", self._experiment)

    class Meta:
        model = Step
        skip_diff = True
        exclude = ("experiment", "id")


class StepDownloadResource(CustomResource):
    old_id = Field(attribute='id', column_name='old_id', readonly=True)

    def __init__(self, *args, **kwargs):
        self._step = kwargs.pop('step', None)
        super().__init__()

    def before_save_instance(self, instance, using_transactions, dry_run):
        setattr(instance, "step", self._step)

    class Meta:
        model = StepDownload
        skip_diff = True
        exclude = ("step", "id")


class GlossaryCategoryResource(CustomResource):
    old_id = Field(attribute='id', column_name='old_id', readonly=True)

    def __init__(self, *args, **kwargs):
        self._project = kwargs.pop('project', None)
        super().__init__()

    def before_save_instance(self, instance, using_transactions, dry_run):
        setattr(instance, "project", self._project)

    class Meta:
        model = GlossaryCategory
        skip_diff = True
        exclude = ("project", "id")


class GlossaryTermResource(CustomResource):
    old_id = Field(attribute='id', column_name='old_id', readonly=True)

    def __init__(self, *args, **kwargs):
        self._project = kwargs.pop('project', None)
        self._glossary_category = kwargs.pop('glossary_category', None)
        super().__init__()

    def before_save_instance(self, instance, using_transactions, dry_run):
        setattr(instance, "project", self._project)
        setattr(instance, "glossary_category", self._glossary_category)

    def after_import_row(self, row, row_result, row_number=None, **kwargs):
        old_tag = f"#glossary/{row['old_id']}"
        new_tag = f"#glossary/{row_result.object_id}"
        replace_values_in_project(old=old_tag, new=new_tag, project=self._project,
                                  method_for_attribute_list="get_to_replace_glossary_attributes")

    class Meta:
        model = GlossaryTerm
        skip_diff = True
        exclude = ("project", "glossary_category", "id")


class ReferenceResource(CustomResource):
    old_id = Field(attribute='id', column_name='old_id', readonly=True)

    def __init__(self, *args, **kwargs):
        self._project = kwargs.pop('project', None)
        super().__init__()

    def before_save_instance(self, instance, using_transactions, dry_run):
        setattr(instance, "project", self._project)

    def after_import_row(self, row, row_result, row_number=None, **kwargs):
        old_tag = f'data-reference="{row["old_id"]}"'
        new_tag = f'data-reference="{row_result.object_id}"'
        replace_values_in_project(old=old_tag, new=new_tag, project=self._project,
                                  method_for_attribute_list="get_to_replace_glossary_attributes")
        old_tag = f'data-reference=\\"{row["old_id"]}\\"'
        new_tag = f'data-reference=\\"{row_result.object_id}\\"'
        replace_values_in_project(old=old_tag, new=new_tag, project=self._project,
                                  method_for_attribute_list="get_to_replace_glossary_attributes")
        old_tag = f'#reference{row["old_id"]}'
        new_tag = f'#reference{row_result.object_id}'
        replace_values_in_project(old=old_tag, new=new_tag, project=self._project,
                                  method_for_attribute_list="get_to_replace_glossary_attributes")

    class Meta:
        model = Reference
        skip_diff = True
        exclude = ("project", "id")
