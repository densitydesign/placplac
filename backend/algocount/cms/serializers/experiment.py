from rest_framework import serializers

from cms.models import Experiment
from cms.serializers.step import FullStepSerializer

from base.serializer_fields import Base64ImageFieldAllImages, FormattedJSONField


class ExperimentSerializer(serializers.ModelSerializer):
    step_set = serializers.PrimaryKeyRelatedField(required=False, read_only=True, many=True)

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
    cover = Base64ImageFieldAllImages(source="cover.file", )
    context = FormattedJSONField()
    findings = FormattedJSONField()
    experiment_setup = FormattedJSONField()
    steps = FullStepSerializer(many=True, source="step_set")

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
