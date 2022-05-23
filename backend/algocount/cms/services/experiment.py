from datetime import datetime
from typing import List

from django.db import transaction
from django.db.models import Max
from django.db.models.functions import Coalesce
from rest_framework.exceptions import ValidationError

from authentication.models import User
from base.services import model_update
from cms.models import Project, Experiment, ExperimentAdditionalMaterial
from cms.selectors.experiment import experiment_list
from cms.selectors.project import user_has_change_project_permissions


def create_experiment(*, user_request: User, project: Project,
                      tags: List[str] = None,
                      cover: str = None,
                      title: str,
                      description: str = None,
                      context: str = None,
                      research_question: str = None,
                      experiment_setup: str = None,
                      findings: str = None,
                      pdf_report: str = None
                      ):
    if not user_has_change_project_permissions(project=project, user=user_request):
        raise ValidationError({"project": ["Project not found!"]})
    tags = tags if tags else []
    order = experiment_list(user_request=user_request).filter(project=project).aggregate(
        max_order=Coalesce(Max("order"), 0))["max_order"]
    experiment = Experiment.objects.create(project=project,
                                           tags=tags,
                                           cover=cover,
                                           title=title,
                                           description=description,
                                           context=context,
                                           research_question=research_question,
                                           experiment_setup=experiment_setup,
                                           findings=findings,
                                           order=order + 1,
                                           pdf_report=pdf_report)
    experiment.project.last_update = datetime.now()
    experiment.project.save()
    return experiment


def update_experiment(*, experiment: Experiment, data: dict):
    fields = ["tags",
              "cover",
              "title",
              "description",
              "context",
              "research_question",
              "experiment_setup",
              "findings",
              "pdf_report"]
    experiment, updated = model_update(instance=experiment, fields=fields, data=data)
    if updated:
        experiment.project.last_update = datetime.now()
        experiment.project.save()
    return experiment


@transaction.atomic
def reorder_experiments(*, project: Project, experiments: List[Experiment], user_request: User):
    if not user_has_change_project_permissions(project=project, user=user_request):
        raise ValidationError({"project": ["Project not found!"]})

    for index, experiment in enumerate(experiments):
        if experiment.project != project:
            raise ValidationError({"detail": "The experiments must belong to the same project!"})
        experiment.order = index + 1
        experiment.save()


def delete_experiment(*, experiment: Experiment):
    project = experiment.project
    experiment.delete()
    project.last_update = datetime.now()
    project.save()


def create_experiment_additional_material(*, user_request: User,
                                          file: str,
                                          experiment: Experiment):
    if not user_has_change_project_permissions(project=experiment.project, user=user_request):
        raise ValidationError({"experiment": ["Experiment not found!"]})
    experiment_add = ExperimentAdditionalMaterial.objects.create(experiment=experiment,
                                                                 file=file)
    experiment.project.last_update = datetime.now()
    experiment.project.save()
    return experiment_add


def delete_experiment_additional_material(*, experiment_additional_material: ExperimentAdditionalMaterial):
    project = experiment_additional_material.experiment.project
    project.last_update = datetime.now()
    project.save()
    experiment_additional_material.delete()
