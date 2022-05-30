import os
import re
import zipfile

from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from base.serializer_fields import CustomFileField
from cms.models import Project, ProjectMedia, ProjectUser, GlossaryCategory
from cms.serializers.experiment import FullExperimentSerializer
from cms.serializers.glossary import FullGlossaryTermSerializer, GlossaryCategorySerializer
from cms.serializers.reference import ReferenceSerializer

User = get_user_model()


class ProjectSerializer(serializers.ModelSerializer):
    experiment_set = serializers.PrimaryKeyRelatedField(read_only=True, many=True)
    glossaryterm_set = serializers.PrimaryKeyRelatedField(read_only=True, many=True)
    projectuser_set = serializers.PrimaryKeyRelatedField(read_only=True, many=True)
    projectmedia_set = serializers.PrimaryKeyRelatedField(read_only=True, many=True)
    reference_set = serializers.PrimaryKeyRelatedField(read_only=True, many=True)
    user_level = serializers.SerializerMethodField(method_name="get_user_level")
    last_build = CustomFileField(read_only=True)
    last_build_time = serializers.DateTimeField(read_only=True)
    last_update = serializers.DateTimeField(read_only=True)
    anchors = serializers.SerializerMethodField(method_name="get_anchors")

    def get_anchors(self, project: Project):
        def find_anchors(content: str):
            anchors = []
            matched_anchors = re.findall(r"<span+[^>]+data-anchor-id=+[^>]+></span>", content)
            for anchor in matched_anchors:
                name = re.search(r"data-anchor-id=\"([^\"]+)\"", anchor)
                if not name:
                    name = re.search(r"data-anchor-id=\\\"([^\"]+)\\\"", anchor)
                if name:
                    anchors.append(name.group(1))
            return anchors

        anchors = []
        project_content = project.get_content()
        matched_anchors = find_anchors(project_content)
        if len(matched_anchors) >= 0:
            formatted_anchors = []
            for anchor in matched_anchors:
                formatted_anchors.append(
                    {"text": anchor, "value": f"#{anchor}"})
            anchors.append({"title": "Project home page", "anchors": formatted_anchors})
        for glossary_term in project.glossaryterm_set.all():
            content = glossary_term.description
            matched_anchors = find_anchors(content)
            if len(matched_anchors) > 0:
                formatted_anchors = []
                for anchor in matched_anchors:
                    formatted_anchors.append(
                        {"text": anchor, "value": f"glossary/{glossary_term.glossary_category_id}#{anchor}"})
                anchors.append({"title": f"Glossary: {glossary_term.title}", "anchors": formatted_anchors})
        for experiment in project.experiment_set.all():
            content = experiment.get_all_content()
            matched_anchors = find_anchors(content)
            if len(matched_anchors) > 0:
                formatted_anchors = []
                for anchor in matched_anchors:
                    formatted_anchors.append({"text": anchor, "value": f"experiments/{experiment.id}#{anchor}"})
                anchors.append({"title": experiment.title, "anchors": formatted_anchors})
        return anchors

    def get_user_level(self, object):
        request = self.context["request"]
        if request.user.is_superuser:
            return "1"
        project_user = ProjectUser.objects.get(project=object, user=request.user)
        return project_user.level

    class Meta:
        model = Project
        fields = ["id", "title",
                  "short_description",
                  "experiments_description",
                  "long_description",
                  "status", "created_date", "last_update", "experiment_set", "glossaryterm_set", "projectuser_set",
                  "projectmedia_set", "language", "user_level", "reference_set", "footer", "glossary_description",
                  "project_explanation", "last_build", "last_build_time", "cover_images", "anchors"]


class ProjectMediaSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField('get_filename')
    file = CustomFileField(required=False)
    file_url = serializers.URLField(required=False, write_only=True)

    def get_filename(self, object):
        return os.path.basename(object.file.path) if object.file else None

    class Meta:
        model = ProjectMedia
        fields = ["id", "project",
                  "file",
                  "description", "type", "name", "file_url"
                  ]


class FullProjectSerializer(serializers.ModelSerializer):
    experiments = FullExperimentSerializer(many=True, source="experiment_set")
    glossary_terms = FullGlossaryTermSerializer(many=True, source="glossaryterm_set")
    references = ReferenceSerializer(many=True, source="reference_set")
    glossary_categories = serializers.SerializerMethodField('get_categories')
    in_project_references = serializers.SerializerMethodField('get_references')

    def get_categories(self, value):
        return GlossaryCategorySerializer(GlossaryCategory.objects.filter(project=value.id), many=True).data

    def get_references(self, object):
        references = object.reference_set.all().order_by("description")
        in_project_references = []
        content_str = object.get_content()
        for reference in references:
            check_reference = f'data-reference=\\"{reference.id}\\"'
            if check_reference in content_str:
                in_project_references.append(reference)
        return ReferenceSerializer(in_project_references, many=True).data

    class Meta:
        model = Project
        fields = ["id", "title",
                  "short_description",
                  "experiments_description",
                  "long_description",
                  "status", "created_date", "last_update", "experiments", "glossary_terms", "glossary_categories",
                  "language", "references", "footer", "glossary_description", "project_explanation",
                  "in_project_references", "cover_images"]


class ProjectUserSerializer(serializers.ModelSerializer):
    user = serializers.SlugRelatedField(slug_field="email", read_only=True)
    user_id = serializers.PrimaryKeyRelatedField(source="user", queryset=User.objects.all(), write_only=True)

    class Meta:
        model = ProjectUser
        fields = ["id", "project", "user_id",
                  "user",
                  "level",
                  ]


class ImportProjectSerializer(serializers.Serializer):
    file = serializers.FileField()

    def validate_file(self, value):
        if not zipfile.is_zipfile(value):
            raise ValidationError("You must upload a zip file!")
        return value


class FilterProjectUserSerializer(serializers.Serializer):
    project = serializers.PrimaryKeyRelatedField(queryset=Project.objects.all(), required=False)


class FilterProjectMediaSerializer(serializers.Serializer):
    file = serializers.CharField(required=False)
    project = serializers.PrimaryKeyRelatedField(queryset=Project.objects.all(), required=False)
    type = serializers.ChoiceField(choices=ProjectMedia.FileTypeChoices.choices, required=False)
