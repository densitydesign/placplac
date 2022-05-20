from django.http import Http404
from rest_framework import exceptions

from authentication.models import User
from base.services import get_object
from cms.filters.experiment import ExperimentAdditionalMaterialFilter
from cms.models import Experiment, ExperimentAdditionalMaterial
from cms.selectors.project import user_has_change_project_permissions


def experiment_list(*, user_request: User):
    if user_request.is_superuser:
        experiments = Experiment.objects.all()
    else:
        experiments = Experiment.objects.filter(project__projectuser__user=user_request)
    return experiments


def get_experiment(*, user_request: User, **kwargs):
    experiment = get_object(experiment_list(user_request=user_request), **kwargs)
    if not experiment:
        raise Http404
    if not user_has_change_project_permissions(project=experiment.project,
                                               user=user_request):
        raise exceptions.PermissionDenied()
    return experiment


def experiment_additional_material_list(*, user_request: User, filters: dict = None):
    filters = filters if filters else {}
    if user_request.is_superuser:
        experiment_additional_materials = ExperimentAdditionalMaterial.objects.all()
    else:
        experiment_additional_materials = ExperimentAdditionalMaterial.objects.filter(
            experiment__project__projectuser__user=user_request)
    return ExperimentAdditionalMaterialFilter(filters, experiment_additional_materials).qs


def get_experiment_additional_material(*, user_request: User, **kwargs):
    experiment_additional_material = get_object(experiment_additional_material_list(user_request=user_request),
                                                **kwargs)
    if not experiment_additional_material:
        raise Http404
    if not user_has_change_project_permissions(project=experiment_additional_material.experiment.project,
                                               user=user_request):
        raise exceptions.PermissionDenied()
    return experiment_additional_material
