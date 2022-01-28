import django_filters

from cms.models import ProjectMedia, ProjectUser


class ProjectMediaFilter(django_filters.FilterSet):
    file = django_filters.CharFilter(lookup_expr="icontains")
    class Meta:
        model = ProjectMedia
        fields = ["project", "type","file"]


class ProjectUserFilter(django_filters.FilterSet):
    class Meta:
        model = ProjectUser
        fields = ["project"]
