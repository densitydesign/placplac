from django.contrib.auth.models import User
from django.contrib.postgres.fields import ArrayField
from django.db import models

from base.models import CustomModel


class Project(CustomModel):
    STATUS_CHOICES = (("1", "Published"), ("2", "Draft"))
    title = models.CharField(max_length=255)
    short_description = models.TextField(null=True)
    experiments_description = models.TextField(null=True)
    long_description = models.TextField(null=True)
    status = models.CharField(default="2", choices=STATUS_CHOICES, max_length=1)


class ProjectUser(CustomModel):
    # the administrator can delete the project
    # the editor can only edit the project
    LEVEL_CHOICES = (("1", "Author"), ("2", "Editor"))

    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    level = models.CharField(choices=LEVEL_CHOICES, max_length=1)


class ProjectMedia(CustomModel):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    file = models.FileField()
    description = models.TextField(null=True, blank=True)


class Experiment(CustomModel):
    cover = models.ForeignKey(ProjectMedia, on_delete=models.SET_NULL, null=True)
    title = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)
    context = models.JSONField(null=True, blank=True)
    research_question = models.CharField(max_length=255, null=True, blank=True)
    experiment_setup = models.JSONField(null=True, blank=True)
    disclaimers = ArrayField(base_field=models.TextField(), null=True, blank=True)
    findings = models.JSONField(null=True, blank=True)
    order = models.SmallIntegerField(default=0)

    project = models.ForeignKey(Project, on_delete=models.CASCADE)


class Step(CustomModel):
    title = models.CharField(max_length=255)
    description = models.TextField(null=True)
    content = models.JSONField()
    step_number = models.SmallIntegerField()
    experiment = models.ForeignKey(Experiment, on_delete=models.CASCADE)


class GlossaryCategory(CustomModel):
    title = models.CharField(max_length=50)
    description = models.TextField()
    color = models.CharField(max_length=10)


class GlossaryTerm(CustomModel):
    title = models.CharField(max_length=100)
    image = models.ForeignKey(ProjectMedia, on_delete=models.SET_NULL, null=True)
    description = models.TextField()
    related = models.ManyToManyField("self", blank=True)
    glossary_category = models.ForeignKey(GlossaryCategory, on_delete=models.CASCADE)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    more_info_url = models.TextField(null=True, blank=True)
