import json
import os

from rest_framework import serializers

from base.serializer_fields import FormattedJSONField, CustomFileField
from cms.models import Experiment, ExperimentAdditionalMaterial
from cms.serializers.glossary import FullGlossaryTermSerializer
from cms.serializers.reference import ReferenceSerializer
from cms.serializers.step import FullStepSerializer


class ExperimentSerializer(serializers.ModelSerializer):
    step_set = serializers.PrimaryKeyRelatedField(required=False, read_only=True, many=True)
    reference_set = serializers.PrimaryKeyRelatedField(read_only=True, many=True)
    experimentadditionalmaterial_set = serializers.PrimaryKeyRelatedField(read_only=True, many=True)

    class Meta:
        model = Experiment
        fields = ["id", "title", "tags",
                  "description",
                  "context",
                  "research_question",
                  "experiment_setup",
                  "findings",
                  "project",
                  "step_set", "cover", "reference_set","pdf_report","experimentadditionalmaterial_set"]

class ExperimentAdditionalMaterialSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField('get_filename')
    file = CustomFileField()

    def get_filename(self, object):
        return os.path.basename(object.file.path) if object.file else None

    class Meta:
        model = ExperimentAdditionalMaterial
        fields = ["id", "experiment",
                  "file",
                  "name"
                  ]

class FullExperimentSerializer(serializers.ModelSerializer):
    context = FormattedJSONField()
    findings = FormattedJSONField()
    experiment_setup = FormattedJSONField()
    steps = serializers.SerializerMethodField('get_steps')
    glossary_terms = serializers.SerializerMethodField('get_glossary_terms')
    references = serializers.SerializerMethodField('get_references')
    additional_material = ExperimentAdditionalMaterialSerializer(many=True, source="experimentadditionalmaterial_set")


    def get_steps(self, object):
        return FullStepSerializer(object.step_set.all().order_by("step_number"), many=True, source="step_set").data

    def get_glossary_terms(self, object):
        glossary_terms = object.project.glossaryterm_set.all()
        found_glossary_terms = []
        steps_content = "".join(
            ["{}{}".format(json.dumps(step.content), step.description) for step in object.step_set.all()])
        content_str = "{}{}{}{}{}".format(json.dumps(object.context), json.dumps(object.findings), json.dumps(
            object.experiment_setup), object.description, steps_content)

        for term in glossary_terms:
            check_link = "glossary/{}".format(term.id)
            if check_link in content_str:
                found_glossary_terms.append(term)
                continue

        return FullGlossaryTermSerializer(found_glossary_terms, many=True).data

    def get_references(self, object):
        references = object.reference_set.all().order_by("description")
        return ReferenceSerializer(references, many=True).data

    class Meta:
        model = Experiment
        fields = ["id", "title",
                  "tags",
                  "description",
                  "context",
                  "research_question",
                  "experiment_setup",
                  "findings",
                  "project",
                  "steps", "cover", "glossary_terms", "references","pdf_report","additional_material"]
