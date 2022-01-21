from django.contrib.auth import get_user_model
from django.contrib.postgres.fields import ArrayField
from django.db import models
from django.db.models import Func, F, Value

from base.models import CustomModel

User = get_user_model()


class Project(CustomModel):
    STATUS_CHOICES = (("1", "Published"), ("2", "Draft"))
    LANGUAGE_CHOICES = (("it", "Italian"), ("en", "English"))
    title = models.CharField(max_length=255)
    short_description = models.TextField(null=True)
    experiments_description = models.TextField(null=True)
    long_description = models.TextField(null=True)
    status = models.CharField(default="2", choices=STATUS_CHOICES, max_length=1)
    language = models.CharField(default="en", choices=LANGUAGE_CHOICES, max_length=2)
    footer = models.JSONField(null=True, blank=True)


class ProjectUser(CustomModel):
    # the administrator can delete the project
    # the editor can only edit the project
    LEVEL_CHOICES = (("1", "Author"), ("2", "Collaborator"))

    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    level = models.CharField(choices=LEVEL_CHOICES, max_length=1, default="2")

    class Meta:
        unique_together = (('user', 'project'),)


class ProjectMedia(CustomModel):
    TYPE_CHOICES = (("image", "Image"), ("file", "File"))

    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    file = models.FileField()
    description = models.TextField(null=True, blank=True)
    type = models.CharField(default="image", choices=TYPE_CHOICES, max_length=10)


class Experiment(CustomModel):
    tags = ArrayField(base_field=models.TextField(), null=True, blank=True)
    cover = models.TextField(blank=True, null=True)
    title = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)
    context = models.JSONField(null=True, blank=True)
    research_question = models.CharField(max_length=255, null=True, blank=True)
    experiment_setup = models.JSONField(null=True, blank=True)
    findings = models.JSONField(null=True, blank=True)
    order = models.SmallIntegerField(default=0)

    project = models.ForeignKey(Project, on_delete=models.CASCADE)


class Step(CustomModel):
    title = models.CharField(max_length=255)
    description = models.TextField(null=True)
    content = models.JSONField(null=True, blank=True)
    step_number = models.SmallIntegerField()
    experiment = models.ForeignKey(Experiment, on_delete=models.CASCADE)


class StepDownload(CustomModel):
    title = models.TextField()
    file = models.FileField()
    step = models.ForeignKey(Step, on_delete=models.CASCADE)


class GlossaryCategory(CustomModel):
    title = models.CharField(max_length=50, unique=True)
    description = models.TextField()
    color = models.CharField(max_length=10)
    project = models.ForeignKey(Project, on_delete=models.CASCADE, null=True)


class GlossaryTerm(CustomModel):
    title = models.CharField(max_length=100)
    image = models.TextField(blank=True, null=True)
    description = models.TextField()
    related = models.ManyToManyField("self", blank=True)
    glossary_category = models.ForeignKey(GlossaryCategory, on_delete=models.CASCADE)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    more_info_url = models.TextField(null=True, blank=True)

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
    objects=ReferenceManager()
    description = models.TextField()
    project = models.ForeignKey(Project, on_delete=models.CASCADE, null=True, blank=True)
    experiment = models.ForeignKey(Experiment, on_delete=models.CASCADE, null=True, blank=True)

