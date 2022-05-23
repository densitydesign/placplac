import datetime

from django.db import transaction
from rest_framework import exceptions
from typing import List

from rest_framework.exceptions import ValidationError

from authentication.models import User
from base.services import model_update
from cms.models import Project, GlossaryCategory, GlossaryTerm
from cms.selectors.project import user_has_change_project_permissions, user_has_delete_project_permissions


def create_glossary_category(*, user_request: User, project: Project,
                             color: str,
                             title: str,
                             description: str,
                             ):
    if user_has_delete_project_permissions(project=project, user=user_request):
        raise ValidationError({"project": ["Project not found!"]})

    glossary_category = GlossaryCategory.objects.create(project=project,
                                                        color=color,
                                                        title=title,
                                                        description=description)
    glossary_category.project.last_update = datetime.datetime.now()
    glossary_category.project.save()
    return glossary_category


def update_glossary_category(*, glossary_category: GlossaryCategory, data: dict):
    fields = ["title",
              "description",
              "color",
              ]
    glossary_category, updated = model_update(instance=glossary_category, fields=fields, data=data)
    if updated:
        glossary_category.project.last_update = datetime.datetime.now()
        glossary_category.project.save()
    return glossary_category


def delete_glossary_category(*, glossary_category: GlossaryCategory):
    project = glossary_category.project
    glossary_category.delete()
    project.last_update = datetime.datetime.now()
    project.save()


@transaction.atomic
def create_glossary_term(*, user_request: User, project: Project,
                         title: str,
                         description: str,
                         image: str = None,
                         related: List[GlossaryTerm] = None,
                         glossary_category: GlossaryCategory,
                         more_info_url: List[str] = None
                         ):
    if not user_has_change_project_permissions(project=project, user=user_request):
        raise ValidationError({"project": ["Project not found!"]})
    if project != glossary_category.project:
        raise ValidationError({"glossary_category": ["Glossary category not found!"]})
    more_info_url = more_info_url if more_info_url else []
    related = related if related else []
    glossary_term = GlossaryTerm.objects.create(project=project,
                                                title=title,
                                                description=description,
                                                image=image,
                                                glossary_category=glossary_category,
                                                more_info_url=more_info_url)
    for r in related:
        glossary_term.related.add(r)
    glossary_term.project.last_update = datetime.datetime.now()
    glossary_term.project.save()
    return glossary_term


def update_glossary_term(*, glossary_term: GlossaryTerm, data: dict):
    fields = ["title",
              "description",
              "image",
              "glossary_category",
              "more_info_url"
              ]
    if data["glossary_category"].project != glossary_term.project:
        raise ValidationError({"glossary_category": ["Glossary category not found!"]})
    glossary_term, updated = model_update(instance=glossary_term, fields=fields, data=data)
    if updated:
        glossary_term.project.last_update = datetime.datetime.now()
        glossary_term.project.save()
    return glossary_term


def delete_glossary_term(*, glossary_term: GlossaryTerm):
    project = glossary_term.project
    glossary_term.delete()
    project.last_update = datetime.datetime.now()
    project.save()
