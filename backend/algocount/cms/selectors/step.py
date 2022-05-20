from django.http import Http404
from rest_framework import exceptions

from authentication.models import User
from base.services import get_object
from cms.filters.step import StepFilter, StepDownloadFilter
from cms.models import Step, StepDownload
from cms.selectors.project import user_has_change_project_permissions


def step_list(*, user_request: User, filters: dict = None):
    filters = filters if filters else {}
    if user_request.is_superuser:
        steps = Step.objects.all()
    else:
        steps = Step.objects.filter(experiment__project__projectuser__user=user_request)
    return StepFilter(filters, steps).qs


def get_step(*, user_request: User, **kwargs):
    step = get_object(step_list(user_request=user_request), **kwargs)
    if not step:
        raise Http404
    if not user_has_change_project_permissions(project=step.experiment.project,
                                               user=user_request):
        raise exceptions.PermissionDenied()
    return step


def step_download_list(*, user_request: User, filters: dict = None):
    filters = filters if filters else {}
    if user_request.is_superuser:
        step_downloads = StepDownload.objects.all()
    else:
        step_downloads = StepDownload.objects.filter(step__experiment__project__projectuser__user=user_request)
    return StepDownloadFilter(filters, step_downloads).qs


def get_step_download(*, user_request: User, **kwargs):
    step_download = get_object(step_download_list(user_request=user_request), **kwargs)
    if not step_download:
        raise Http404
    if not user_has_change_project_permissions(project=step_download.step.experiment.project,
                                               user=user_request):
        raise exceptions.PermissionDenied()
    return step_download
