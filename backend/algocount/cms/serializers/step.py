from rest_framework import serializers

from base.serializer_fields import FormattedJSONField
from cms.models import Step


class StepSerializer(serializers.ModelSerializer):
    project = serializers.SlugRelatedField(read_only=True, source="experiment", slug_field="project_id")

    class Meta:
        model = Step
        fields = ["id", "title",
                  "description",
                  "content",
                  "step_number",
                  "experiment", "project"]


class FullStepSerializer(serializers.ModelSerializer):
    content = FormattedJSONField()

    class Meta:
        model = Step
        fields = ["id", "title",
                  "description",
                  "content",
                  "step_number",
                  "experiment"]
