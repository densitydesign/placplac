import django_filters

from cms.models import Step, StepDownload


class StepFilter(django_filters.FilterSet):
    class Meta:
        model = Step
        fields = ["experiment"]

class StepDownloadFilter(django_filters.FilterSet):
    class Meta:
        model = StepDownload
        fields = ["step"]

