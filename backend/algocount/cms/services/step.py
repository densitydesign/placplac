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
                               step_number=step_number)
    return step


def update_step(*, step: Step, data: dict):
    fields = ["title",
              "description",
              "content",
              "step_number"]
    step, updated = model_update(instance=step, fields=fields, data=data)
    return step


def delete_step(*, step: Step):
    step.delete()


def create_step_download(*, user_request: User,
                         title: str,
                         file: str,
                         step: Step):
    if not user_has_change_project_permissions(user=user_request, project=step.experiment.project):
        raise ValidationError({"step": ["Step not found!"]})

    step_download = StepDownload.objects.create(step=step,
                                                title=title,
                                                file=file)
    return step_download


def update_step_download(*, step_download: StepDownload, data: dict):
    fields = ["title"]
    step_download, updated = model_update(instance=step_download, fields=fields, data=data)
    return step_download


def delete_step_download(*, step_download: StepDownload):
    step_download.delete()
