import django_filters

from cms.models import ProjectMedia


class ProjectMediaFilter(django_filters.FilterSet):
    class Meta:
        model = ProjectMedia
        fields = ["project"]
