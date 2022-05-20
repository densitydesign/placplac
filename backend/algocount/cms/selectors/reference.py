from django.http import Http404
from rest_framework import exceptions

from authentication.models import User
from base.services import get_object
from cms.filters.reference import ReferenceFilter
from cms.models import Reference
from cms.selectors.project import user_has_change_project_permissions


def reference_list(*, user_request: User, filters: dict = None):
    filters = filters if filters else {}
    if user_request.is_superuser:
        users = Reference.objects.all()
    else:
        users = Reference.objects.filter(project__projectuser__user=user_request)
    return ReferenceFilter(filters, users).qs


def get_reference(*, user_request: User, **kwargs):
    reference = get_object(reference_list(user_request=user_request), **kwargs)
    if not reference:
        raise Http404

    if not user_has_change_project_permissions(project=reference.project,
                                               user=user_request):
        raise exceptions.PermissionDenied()

    return reference
