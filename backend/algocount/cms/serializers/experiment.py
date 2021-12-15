import json

from rest_framework import serializers

from base.serializer_fields import Base64ImageFieldAllImages, FormattedJSONField
from cms.models import Experiment
from cms.serializers.glossary import FullGlossaryTermSerializer
from cms.serializers.reference import ReferenceSerializer
from cms.serializers.step import FullStepSerializer


class ExperimentSerializer(serializers.ModelSerializer):
    step_set = serializers.PrimaryKeyRelatedField(required=False, read_only=True, many=True)
    reference_set = serializers.PrimaryKeyRelatedField(read_only=True, many=True)

    class Meta:
        model = Experiment
        fields = ["id", "title", "tags",
                  "description",
                  "context",
                  "research_question",
                  "experiment_setup",
                  "findings",
                  "project",
                  "step_set", "cover", "reference_set"]


class FullExperimentSerializer(serializers.ModelSerializer):
    cover = Base64ImageFieldAllImages(read_only=True)
    context = FormattedJSONField()
    findings = FormattedJSONField()
    experiment_setup = FormattedJSONField()
    steps = serializers.SerializerMethodField('get_steps')
    glossary_terms = serializers.SerializerMethodField('get_glossary_terms')
    references = serializers.SerializerMethodField('get_references')

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
        references = object.reference_set.all().order_by("title")
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
                  "steps", "cover", "glossary_terms", "references"]
