from rest_framework import serializers

from cms.models import Experiment
from cms.serializers.step import StepSerializer


class ExperimentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experiment
        fields = ["id", "title",
                  "description",
                  "context",
                  "research_question",
                  "experiment_setup",
                  "disclaimers",
                  "findings",
                  "project",
                  "step_set", "cover"]


class FullExperimentSerializer(serializers.ModelSerializer):
    cover = serializers.SerializerMethodField(method_name="get_image")
    steps = StepSerializer(many=True, source="step_set")
    def get_image(self, obj):
        return obj.cover.file.url if obj.cover else None

    class Meta:
        model = Experiment
        fields = ["id", "title",
                  "description",
                  "context",
                  "research_question",
                  "experiment_setup",
                  "disclaimers",
                  "findings",
                  "project",
                  "steps", "cover"]
