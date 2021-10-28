import django_filters

from cms.models import  Step


class StepFilter(django_filters.FilterSet):
    class Meta:
        model = Step
        fields = ["experiment"]
