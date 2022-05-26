import os

from import_export import resources

from cms.models import Project, ProjectMedia, Experiment, ExperimentAdditionalMaterial, Step, StepDownload, \
    GlossaryCategory, GlossaryTerm, Reference, ProjectUser
from cms.services.project import add_user_to_project


class CustomResource(resources.ModelResource):
    def get_instance(self, instance_loader, row):
        return

    def after_save_instance(self, instance, using_transactions, dry_run):
        self.instance = instance
        return super().after_save_instance(instance, using_transactions, dry_run)


class ProjectResource(CustomResource):
    def after_import_instance(self, instance, new, **kwargs):
        add_user_to_project(user=kwargs['user'], level=ProjectUser.LevelChoices.AUTHOR, project=instance)

    class Meta:
        model = Project
        force_init_instance = True
        exclude = ("id", "last_build_time", "base_path_build", "last_build")
        skip_diff = True


class ProjectMediaResource(CustomResource):
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

    class Meta:
        model = ProjectMedia
        exclude = ("project", "id")
        skip_diff = True


class ExperimentResource(CustomResource):
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
    def __init__(self, *args, **kwargs):
        self._project = kwargs.pop('project', None)
        self._glossary_category = kwargs.pop('glossary_category', None)
        super().__init__()

    def before_save_instance(self, instance, using_transactions, dry_run):
        setattr(instance, "project", self._project)
        setattr(instance, "glossary_category", self._glossary_category)

    class Meta:
        model = GlossaryTerm
        skip_diff = True
        exclude = ("project", "glossary_category", "id")


class ReferenceResource(CustomResource):
    def __init__(self, *args, **kwargs):
        self._project = kwargs.pop('project', None)
        super().__init__()

    def before_save_instance(self, instance, using_transactions, dry_run):
        setattr(instance, "project", self._project)

    class Meta:
        model = Reference
        skip_diff = True
        exclude = ("project", "id")
