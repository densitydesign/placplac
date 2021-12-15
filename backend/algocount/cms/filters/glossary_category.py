import django_filters
from django.db.models import Q

from cms.models import GlossaryCategory, Project


class GlossaryCategoryFilter(django_filters.FilterSet):
    project = django_filters.ModelChoiceFilter(queryset=Project.objects.all(), method="filter_project")

    def filter_project(self, queryset, name, value):
        return queryset.filter(Q(project_id=value) | Q(project__isnull=True))

    class Meta:
        model = GlossaryCategory
        fields = ["project"]
