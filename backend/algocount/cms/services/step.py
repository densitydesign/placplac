import datetime
from typing import List

from django.db import transaction
from django.db.models import Max
from django.db.models.functions import Coalesce
from rest_framework.exceptions import ValidationError

from authentication.models import User
from base.services import model_update
from cms.models import Experiment, Step, StepDownload
from cms.selectors.project import user_has_change_project_permissions
from cms.selectors.step import step_list


def create_step(*, user_request: User,
                experiment: Experiment,
                title: str,
                description: str = None,
                content: str = None):
    if not user_has_change_project_permissions(user=user_request, project=experiment.project):
        raise ValidationError({"experiment": ["Experiment not found!"]})
    step_number = step_list(user_request=user_request, filters={"experiment": experiment}).aggregate(
        max_step_number=Coalesce(Max("step_number"), 0))["max_step_number"]
    step = Step.objects.create(experiment=experiment,
                               title=title,
                               description=description,
                               content=content,
                               step_number=step_number + 1)
    step.experiment.project.last_update = datetime.datetime.now()
    step.experiment.project.save()
    return step


def update_step(*, step: Step, data: dict):
    fields = ["title",
              "description",
              "content"]
    step, updated = model_update(instance=step, fields=fields, data=data)
    if updated:
        step.experiment.project.last_update = datetime.datetime.now()
        step.experiment.project.save()
    return step


@transaction.atomic
def reorder_steps(*, experiment: Experiment, steps: List[Step], user_request: User):
    if not user_has_change_project_permissions(project=experiment.project, user=user_request):
        raise ValidationError({"experiment": ["Experiment not found!"]})

    for index, step in enumerate(steps):
        if step.experiment != experiment:
            raise ValidationError({"detail": "The steps must belong to the same experiment!"})
        step.step_number = index + 1
        step.save()


def delete_step(*, step: Step):
    project = step.experiment.project
    step.delete()
    project.last_update = datetime.datetime.now()
    project.save()


def create_step_download(*, user_request: User,
                         title: str,
                         file: str,
                         step: Step):
    if not user_has_change_project_permissions(user=user_request, project=step.experiment.project):
        raise ValidationError({"step": ["Step not found!"]})

    step_download = StepDownload.objects.create(step=step,
                                                title=title,
                                                file=file)
    step_download.step.experiment.project.last_update = datetime.datetime.now()
    step_download.step.experiment.project.save()
    return step_download


def update_step_download(*, step_download: StepDownload, data: dict):
    fields = ["title"]
    step_download, updated = model_update(instance=step_download, fields=fields, data=data)
    if updated:
        step_download.step.experiment.project.last_update = datetime.datetime.now()
        step_download.step.experiment.project.save()
    return step_download


def delete_step_download(*, step_download: StepDownload):
    project = step_download.step.experiment.project
    step_download.delete()
    project.last_update = datetime.datetime.now()
    project.save()
