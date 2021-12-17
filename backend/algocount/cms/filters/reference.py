import django_filters

from cms.models import Reference


class ReferenceFilter(django_filters.FilterSet):
    class Meta:
        model = Reference
        fields = ["project", "experiment"]
