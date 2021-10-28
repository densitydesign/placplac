from rest_framework import serializers

from cms.models import Step


class StepSerializer(serializers.ModelSerializer):

    class Meta:
        model = Step
        fields = ["id", "title",
                  "description",
                  "content",
                  "step_number",
                  "experiment"]
