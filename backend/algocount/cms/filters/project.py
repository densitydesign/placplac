import django_filters
from cms.models import ProjectMedia, ProjectUser


class ProjectMediaFilter(django_filters.FilterSet):
    file = django_filters.CharFilter(lookup_expr="icontains")
    file_name = django_filters.CharFilter(method="filter_for_file_name")


    class Meta:
        model = ProjectMedia
        fields = ["project", "type","file","file_name"]


class ProjectUserFilter(django_filters.FilterSet):
    class Meta:
        model = ProjectUser
        fields = ["project"]
