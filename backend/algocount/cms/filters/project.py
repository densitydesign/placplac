import django_filters

from cms.models import ProjectMedia, ProjectUser


class ProjectMediaFilter(django_filters.FilterSet):
    class Meta:
        model = ProjectMedia
        fields = ["project", "type"]


class ProjectUserFilter(django_filters.FilterSet):
    class Meta:
        model = ProjectUser
        fields = ["project"]
