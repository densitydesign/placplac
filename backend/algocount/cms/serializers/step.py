import json
import os

from rest_framework import serializers

from base.serializer_fields import FormattedJSONField, CustomFileField
from cms.models import Step, StepDownload, Experiment
from cms.serializers.glossary import FullGlossaryTermSerializer


class StepSerializer(serializers.ModelSerializer):
    project = serializers.SlugRelatedField(read_only=True, source="experiment", slug_field="project_id")
    stepdownload_set = serializers.PrimaryKeyRelatedField(read_only=True, many=True)
    step_number = serializers.IntegerField(read_only=True)

    class Meta:
        model = Step
        fields = ["id", "title",
                  "description",
                  "content",
                  "step_number",
                  "experiment", "project", "stepdownload_set"]


class ReorderStepSerializer(serializers.Serializer):
    experiment = serializers.PrimaryKeyRelatedField(queryset=Experiment.objects.all())
    steps = serializers.PrimaryKeyRelatedField(queryset=Step.objects.all(), many=True)


class StepDownloadSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField('get_filename')
    file = CustomFileField()

    def get_filename(self, object):
        return os.path.basename(object.file.path) if object.file else None

    class Meta:
        model = StepDownload
        fields = ["id", "step",
                  "file",
                  "title", "name"
                  ]


class FullStepSerializer(serializers.ModelSerializer):
    content = FormattedJSONField()
    downloads = StepDownloadSerializer(many=True, source="stepdownload_set")
    glossary_terms = serializers.SerializerMethodField('get_glossary_terms')

    def get_glossary_terms(self, object):
        glossary_terms = object.experiment.project.glossaryterm_set.all()
        found_glossary_terms = []
        steps_content = "{}{}".format(json.dumps(object.content), object.description)

        for term in glossary_terms:
            check_link = "glossary/{}".format(term.id)
            if check_link in steps_content:
                found_glossary_terms.append(term)
                continue

        return FullGlossaryTermSerializer(found_glossary_terms, many=True).data

    class Meta:
        model = Step
        fields = ["id", "title",
                  "description",
                  "content",
                  "step_number",
                  "experiment", "downloads", "glossary_terms"]


class StepFilterSerializer(serializers.Serializer):
    experiment = serializers.PrimaryKeyRelatedField(queryset=Experiment.objects.all(), required=False)


class StepDownloadFilterSerializer(serializers.Serializer):
    step = serializers.PrimaryKeyRelatedField(queryset=Step.objects.all(), required=False)
