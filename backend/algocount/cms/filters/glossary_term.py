import django_filters

from cms.models import GlossaryTerm


class GlossaryTermFilter(django_filters.FilterSet):
    class Meta:
        model = GlossaryTerm
        fields = ["project"]
