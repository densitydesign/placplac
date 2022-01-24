import json

from rest_framework import serializers

from cms.models import GlossaryCategory, GlossaryTerm


class GlossaryTermSerializer(serializers.ModelSerializer):
    color = serializers.CharField(source="glossary_category.color", read_only=True)
    category_title = serializers.CharField(source="glossary_category.title", read_only=True)

    class Meta:
        model = GlossaryTerm
        fields = ["id", "title",
                  "image",
                  "description",
                  "related",
                  "glossary_category",
                  "color",
                  "more_info_url", "project", "category_title"]


class FullGlossaryTermSerializer(serializers.ModelSerializer):
    color = serializers.CharField(source="glossary_category.color", read_only=True)
    category_title = serializers.CharField(source="glossary_category.title", read_only=True)
    used_in = serializers.SerializerMethodField(method_name="get_used_in")
    related = serializers.SerializerMethodField(method_name="get_related")
    def get_related (self,object):
        result = []
        for related in object.related.all():
            result.append({"id":related.id,"title":related.title,"color":related.glossary_category.color, "category":related.glossary_category.id})
        return result

    def get_used_in(self, object):
        found_experiments = []
        for experiment in object.project.experiment_set.all():
            steps_content = "".join(
                ["{}{}".format(json.dumps(step.content), step.description) for step in experiment.step_set.all()])
            content_str = "{}{}{}{}{}".format(json.dumps(experiment.context), json.dumps(experiment.findings), json.dumps(
                experiment.experiment_setup), experiment.description, steps_content)
            check_link = "glossary/{}".format(object.id)
            if check_link in content_str:
                found_experiments.append({"id":experiment.id, "title" :experiment.title})
        return found_experiments

    def get_image(self, obj):
        return obj.image.file.url if obj.image else None

    class Meta:
        model = GlossaryTerm
        fields = ["id", "title",
                  "image",
                  "description",
                  "related",
                  "glossary_category",
                  "color",
                  "more_info_url", "project", "category_title","used_in"]


class GlossaryCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = GlossaryCategory
        fields = ["id", "title",
                  "description",
                  "color","project"
                  ]


