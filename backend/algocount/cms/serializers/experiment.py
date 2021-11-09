from rest_framework import serializers

from base.serializer_fields import Base64ImageFieldAllImages, FormattedJSONField
from cms.models import Experiment
from cms.serializers.step import FullStepSerializer


class ExperimentSerializer(serializers.ModelSerializer):
    step_set = serializers.PrimaryKeyRelatedField(required=False, read_only=True, many=True)

    class Meta:
        model = Experiment
        fields = ["id", "title","tags",
                  "description",
                  "context",
                  "research_question",
                  "experiment_setup",
                  "disclaimers",
                  "findings",
                  "project",
                  "step_set", "cover"]


class FullExperimentSerializer(serializers.ModelSerializer):
    cover = Base64ImageFieldAllImages( read_only=True)
    context = FormattedJSONField()
    findings = FormattedJSONField()
    experiment_setup = FormattedJSONField()
    steps = FullStepSerializer(many=True, source="step_set")

    class Meta:
        model = Experiment
        fields = ["id", "title",
                  "tags",
                  "description",
                  "context",
                  "research_question",
                  "experiment_setup",
                  "disclaimers",
                  "findings",
                  "project",
                  "steps", "cover"]
