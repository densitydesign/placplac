import json
import os

from rest_framework import serializers

from base.serializer_fields import FormattedJSONField, CustomFileField
from cms.models import Experiment, ExperimentAdditionalMaterial, Project
from cms.serializers.glossary import FullGlossaryTermSerializer
from cms.serializers.reference import ReferenceSerializer
from cms.serializers.step import FullStepSerializer


class ExperimentSerializer(serializers.ModelSerializer):
    step_set = serializers.PrimaryKeyRelatedField(required=False, read_only=True, many=True)
    experimentadditionalmaterial_set = serializers.PrimaryKeyRelatedField(read_only=True, many=True)

    class Meta:
        model = Experiment
        fields = ["id", "title", "tags",
                  "description",
                  "order",
                  "context",
                  "research_question",
                  "experiment_setup",
                  "findings",
                  "project",
                  "step_set", "cover", "pdf_report", "experimentadditionalmaterial_set"]


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


class ReorderExperimentsSerializer(serializers.Serializer):
    project = serializers.PrimaryKeyRelatedField(queryset=Project.objects.all())
    experiments = serializers.PrimaryKeyRelatedField(queryset=Experiment.objects.all(), many=True)


class FilterExperimentAdditionalMaterialSerializer(serializers.Serializer):
    experiment = serializers.PrimaryKeyRelatedField(queryset=Experiment.objects.all(), required=False)


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

    def get_glossary_terms(self, object: Experiment):
        glossary_terms = object.project.glossaryterm_set.all()
        found_glossary_terms = []
        content_str = object.get_all_content()
        for term in glossary_terms:
            check_link = "glossary/{}".format(term.id)
            if check_link in content_str:
                found_glossary_terms.append(term)
                continue

        return FullGlossaryTermSerializer(found_glossary_terms, many=True).data

    def get_references(self, object):
        references = object.project.reference_set.all().order_by("description")
        in_experiment_references = []
        content_str = object.get_all_content()
        for reference in references:
            check_reference = f'data-reference=\\"{reference.id}\\"'
            if check_reference in content_str:
                in_experiment_references.append(reference)
        return ReferenceSerializer(in_experiment_references, many=True).data

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
                  "steps", "cover", "glossary_terms", "references", "pdf_report", "additional_material"]
