from rest_framework import serializers

from cms.models import Step
from base.serializer_fields import FormattedJSONField


class StepSerializer(serializers.ModelSerializer):

    class Meta:
        model = Step
        fields = ["id", "title",
                  "description",
                  "content",
                  "step_number",
                  "experiment"]

class FullStepSerializer(serializers.ModelSerializer):
    content = FormattedJSONField()

    class Meta:
        model = Step
        fields = ["id", "title",
                  "description",
                  "content",
                  "step_number",
                  "experiment"]
