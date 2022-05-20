import json
import os

from django.contrib.auth import get_user_model
from django.contrib.postgres.fields import ArrayField
from django.db import models
from django.db.models import Func, F, Value
from base.models import CustomModel

User = get_user_model()


class Project(CustomModel):
    class StatusChoices(models.TextChoices):
        PUBLISHED = "1", "Published"
        DRAFT = "2", "Draft"

    class LanguageChoices(models.TextChoices):
        IT = "it", "Italian"
        EN = "en", "English"

    title = models.CharField(max_length=255)
    short_description = models.TextField(null=True, blank=True)
    project_explanation = models.TextField(null=True, blank=True)
    experiments_description = models.TextField(null=True, blank=True)
    long_description = models.TextField(null=True, blank=True)
    status = models.CharField(default=StatusChoices.DRAFT, choices=StatusChoices.choices, max_length=1)
    language = models.CharField(default=LanguageChoices.EN, choices=LanguageChoices.choices, max_length=2)
    footer = models.JSONField(null=True, blank=True)
    glossary_description = models.TextField(null=True, blank=True)

    def get_content(self):
        return "{}{}{}".format(self.short_description, self.project_explanation, self.long_description)


class ProjectUser(CustomModel):
    # the administrator can delete the project
    # the editor can only edit the project
    class LevelChoices(models.TextChoices):
        AUTHOR = "1", "Author"
        COLLABORATOR = "2", "Collaborator"
        VIEWER = "3", "Viewer"

    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    level = models.CharField(choices=LevelChoices.choices, max_length=1, default=LevelChoices.COLLABORATOR)

    class Meta:
        unique_together = (('user', 'project'),)


def get_upload_path(instance, filename):
    return os.path.join(str(instance.project_id), filename)


class ProjectMedia(CustomModel):
    class FileTypeChoices(models.TextChoices):
        IMAGE = "image", "Image"
        VIDEO = "video", "Video"
        FILE = "file", "Generic file"

    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    file = models.FileField(upload_to=get_upload_path)
    description = models.TextField(null=True, blank=True)
    type = models.CharField(default=FileTypeChoices.IMAGE, choices=FileTypeChoices.choices, max_length=10)


class Experiment(CustomModel):
    tags = ArrayField(base_field=models.TextField(), default=list, blank=True)
    cover = models.TextField(blank=True, null=True)
    title = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)
    context = models.JSONField(null=True, blank=True)
    research_question = models.CharField(max_length=255, null=True, blank=True)
    experiment_setup = models.JSONField(null=True, blank=True)
    findings = models.JSONField(null=True, blank=True)
    order = models.SmallIntegerField(default=0)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    pdf_report = models.TextField(blank=True, null=True)

    def get_all_content(self):
        steps_content = "".join(
            ["{}{}".format(json.dumps(step.content), step.description) for step in self.step_set.all()])
        return "{}{}{}{}{}".format(json.dumps(self.context), json.dumps(self.findings), json.dumps(
            self.experiment_setup), self.description, steps_content)


def get_upload_experiment_path(instance, filename):
    return os.path.join(str(instance.experiment.project_id), filename)


class ExperimentAdditionalMaterial(CustomModel):
    file = models.FileField(upload_to=get_upload_experiment_path)
    experiment = models.ForeignKey(Experiment, on_delete=models.CASCADE)


class Step(CustomModel):
    title = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)
    content = models.JSONField(null=True, blank=True)
    step_number = models.SmallIntegerField()
    experiment = models.ForeignKey(Experiment, on_delete=models.CASCADE)

    class Meta:
        unique_together = (('experiment', 'step_number'))


def get_upload_step_path(instance, filename):
    return os.path.join(str(instance.step.experiment.project_id), filename)


class StepDownload(CustomModel):
    title = models.TextField()
    file = models.FileField(upload_to=get_upload_step_path)
    step = models.ForeignKey(Step, on_delete=models.CASCADE)


class GlossaryCategory(CustomModel):
    title = models.CharField(max_length=50)
    description = models.TextField()
    color = models.CharField(max_length=10)
    project = models.ForeignKey(Project, on_delete=models.CASCADE, null=True)

    class Meta:
        unique_together = ('title', 'project',)


class GlossaryTerm(CustomModel):
    title = models.CharField(max_length=100)
    image = models.TextField(blank=True, null=True)
    description = models.TextField()
    related = models.ManyToManyField("self", blank=True)
    glossary_category = models.ForeignKey(GlossaryCategory, on_delete=models.CASCADE)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    more_info_url = ArrayField(base_field=models.JSONField(), blank=True, default=list)


class ReferenceManager(models.Manager):
    def get_queryset(self):
        qs = super().get_queryset()
        return qs.annotate(desc=Func(
            F('description'),
            Value(r'<[^>]+>'), Value(""), Value("gi"),
            function='REGEXP_REPLACE',
            output_field=models.TextField(),
        )).order_by('desc')


class Reference(CustomModel):
    objects = ReferenceManager()
    description = models.TextField()
    in_text_citation = models.TextField()
    project = models.ForeignKey(Project, on_delete=models.CASCADE, null=True, blank=True)
