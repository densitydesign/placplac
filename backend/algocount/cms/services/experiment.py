from typing import List

from rest_framework.exceptions import ValidationError

from authentication.models import User
from base.services import model_update
from cms.models import Project, Experiment, ExperimentAdditionalMaterial
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
                      order: int = 0,
                      pdf_report: str = None
                      ):
    if user_has_change_project_permissions(project=project, user=user_request):
        raise ValidationError({"project": ["Project not found!"]})
    tags = tags if tags else []
    experiment = Experiment.objects.create(project=project,
                                           tags=tags,
                                           cover=cover,
                                           title=title,
                                           description=description,
                                           context=context,
                                           research_question=research_question,
                                           experiment_setup=experiment_setup,
                                           findings=findings,
                                           order=order,
                                           pdf_report=pdf_report)
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
              "order",
              "pdf_report"]
    experiment, updated = model_update(instance=experiment, fields=fields, data=data)
    return experiment


def delete_experiment(*, experiment: Experiment):
    experiment.delete()


def create_experiment_additional_material(*, user_request: User,
                                          file: str,
                                          experiment: Experiment):
    if user_has_change_project_permissions(project=experiment.project, user=user_request):
        raise ValidationError({"experiment": ["Experiment not found!"]})
    experiment = ExperimentAdditionalMaterial.objects.create(experiment=experiment,
                                                             file=file)
    return experiment


def delete_experiment_additional_material(*, experiment_additional_material: ExperimentAdditionalMaterial):
    experiment_additional_material.delete()
