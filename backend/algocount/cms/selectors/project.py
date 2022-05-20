from django.db.models import Q
from django.http import Http404
from rest_framework import exceptions

from authentication.models import User
from base.services import get_object
from base.types import PermissionType
from cms.filters.project import ProjectUserFilter, ProjectMediaFilter
from cms.models import Project, ProjectUser, ProjectMedia


def user_has_read_project_permissions(project: Project, user: User):
    return user.is_superuser or ProjectUser.objects.filter(project=project, user=user).exists()


def user_has_change_project_permissions(project: Project, user: User):
    return user.is_superuser or ProjectUser.objects.filter(Q(level=ProjectUser.LevelChoices.AUTHOR) |
                                                           Q(level=ProjectUser.LevelChoices.COLLABORATOR),
                                                           project=project,
                                                           user=user).exists()


def user_has_delete_project_permissions(project: Project, user: User):
    return user.is_superuser or ProjectUser.objects.filter(level=ProjectUser.LevelChoices.AUTHOR,
                                                           project=project,
                                                           user=user).exists()


def project_list(*, user_request: User):
    if user_request.is_superuser:
        projects = Project.objects.all()
    else:
        projects = Project.objects.filter(projectuser__user=user_request)

    return projects


def get_project(*, user_request: User, permission: PermissionType, **kwargs):
    project = get_object(project_list(user_request=user_request), **kwargs)
    if not project:
        raise Http404
    if permission == PermissionType.READ and not user_has_read_project_permissions(project=project, user=user_request):
        raise exceptions.PermissionDenied()
    if permission == PermissionType.DELETE and not user_has_delete_project_permissions(project=project,
                                                                                       user=user_request):
        raise exceptions.PermissionDenied()
    if permission == PermissionType.WRITE and not user_has_change_project_permissions(project=project,
                                                                                      user=user_request):
        raise exceptions.PermissionDenied()
    return project


def project_user_list(*, user_request: User, filters: dict = None):
    filters = filters if filters else {}
    if user_request.is_superuser:
        users = ProjectUser.objects.all()
    else:
        users = ProjectUser.objects.filter(project__projectuser__user=user_request)
    return ProjectUserFilter(filters, users).qs


def get_project_user(*, user_request: User, permission: PermissionType, **kwargs):
    project_user = get_object(project_user_list(user_request=user_request), **kwargs)
    if not project_user:
        raise Http404
    if permission == PermissionType.READ and not user_has_read_project_permissions(project=project_user.project,
                                                                                   user=user_request):
        raise exceptions.PermissionDenied()
    if permission in [PermissionType.DELETE, PermissionType.WRITE] and not user_has_delete_project_permissions(
            project=project_user.project,
            user=user_request):
        raise exceptions.PermissionDenied()
    return project_user


def project_media_list(*, user_request: User, filters: dict = None):
    filters = filters if filters else {}
    if user_request.is_superuser:
        users = ProjectMedia.objects.all()
    else:
        users = ProjectMedia.objects.filter(project__projectuser__user=user_request)
    return ProjectMediaFilter(filters, users).qs


def get_project_media(*, user_request: User, **kwargs):
    project_user = get_object(project_media_list(user_request=user_request), **kwargs)
    if not project_user:
        raise Http404
    if not user_has_change_project_permissions(project=project_user.project, user=user_request):
        raise exceptions.PermissionDenied()
    return project_user
