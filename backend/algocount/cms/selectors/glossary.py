from django.http import Http404
from rest_framework import exceptions

from authentication.models import User
from base.services import get_object
from base.types import PermissionType
from cms.filters.glossary_category import GlossaryCategoryFilter
from cms.filters.glossary_term import GlossaryTermFilter
from cms.models import GlossaryCategory, GlossaryTerm
from cms.selectors.project import user_has_change_project_permissions, user_has_delete_project_permissions


def glossary_category_list(*, user_request: User, filters: dict = None):
    filters = filters if filters else {}
    if user_request.is_superuser:
        users = GlossaryCategory.objects.all()
    else:
        users = GlossaryCategory.objects.filter(project__projectuser__user=user_request)
    return GlossaryCategoryFilter(filters, users).qs


def get_glossary_category(*, user_request: User, permission: PermissionType,
                          **kwargs):
    glossary_category = get_object(glossary_category_list(user_request=user_request), **kwargs)
    if not glossary_category:
        raise Http404

    if permission == PermissionType.READ and not user_has_change_project_permissions(project=glossary_category.project,
                                                                                     user=user_request):
        raise exceptions.PermissionDenied()
    if permission in [PermissionType.WRITE, PermissionType.DELETE] and not user_has_delete_project_permissions(
            project=glossary_category.project,
            user=user_request):
        raise exceptions.PermissionDenied()

    return glossary_category


def glossary_term_list(*, user_request: User, filters: dict = None):
    filters = filters if filters else {}
    if user_request.is_superuser:
        users = GlossaryTerm.objects.all()
    else:
        users = GlossaryTerm.objects.filter(project__projectuser__user=user_request)
    return GlossaryTermFilter(filters, users).qs


def get_glossary_term(*, user_request: User, **kwargs):
    glossary_term = get_object(glossary_term_list(user_request=user_request), **kwargs)
    if not glossary_term:
        raise Http404

    if not user_has_change_project_permissions(project=glossary_term.project,
                                               user=user_request):
        raise exceptions.PermissionDenied()

    return glossary_term
