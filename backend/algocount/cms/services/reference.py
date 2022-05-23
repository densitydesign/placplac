import datetime

from rest_framework.exceptions import ValidationError

from authentication.models import User
from base.services import model_update
from cms.models import Project, Reference
from cms.selectors.project import user_has_change_project_permissions


def create_reference(*, user_request: User, project: Project,
                     in_text_citation: str,
                     description: str
                     ):
    if not user_has_change_project_permissions(project=project, user=user_request):
        raise ValidationError({"project": ["Project not found!"]})

    reference = Reference.objects.create(project=project,
                                         in_text_citation=in_text_citation,
                                         description=description,
                                         )
    reference.project.last_update = datetime.datetime.now()
    reference.project.save()

    return reference


def update_reference(*, reference: Reference, data: dict):
    fields = ["in_text_citation",
              "description"]
    reference, updated = model_update(instance=reference, fields=fields, data=data)
    if updated:
        reference.project.last_update = datetime.datetime.now()
        reference.project.save()
    return reference


def delete_reference(*, reference: Reference):
    project = reference.project
    reference.delete()
    project.last_update = datetime.datetime.now()
    project.save()
