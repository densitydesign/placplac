import django_filters

from cms.models import ExperimentAdditionalMaterial


class ExperimentAdditionalMaterialFilter(django_filters.FilterSet):
    class Meta:
        model = ExperimentAdditionalMaterial
        fields = ["experiment"]
