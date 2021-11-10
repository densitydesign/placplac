import os

from django.contrib.auth import get_user_model
from rest_framework import serializers

from cms.models import Project, ProjectMedia, ProjectUser, GlossaryCategory
from cms.serializers.experiment import FullExperimentSerializer
from cms.serializers.glossary import FullGlossaryTermSerializer, GlossaryCategorySerializer

User = get_user_model()


class ProjectSerializer(serializers.ModelSerializer):
    experiment_set = serializers.PrimaryKeyRelatedField(read_only=True, many=True)
    glossaryterm_set = serializers.PrimaryKeyRelatedField(read_only=True, many=True)
    projectuser_set = serializers.PrimaryKeyRelatedField(read_only=True, many=True)
    projectmedia_set = serializers.PrimaryKeyRelatedField(read_only=True, many=True)

    class Meta:
        model = Project
        fields = ["id", "title",
                  "short_description",
                  "experiments_description",
                  "long_description",
                  "status", "created_date", "last_update", "experiment_set", "glossaryterm_set", "projectuser_set",
                  "projectmedia_set"]


class ProjectMediaSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField('get_filename')

    def get_filename(self, object):
        return os.path.basename(object.file.path)

    class Meta:
        model = ProjectMedia
        fields = ["id", "project",
                  "file",
                  "description", "type", "name"
                  ]


class FullProjectSerializer(serializers.ModelSerializer):
    experiments = FullExperimentSerializer(many=True, source="experiment_set")
    glossary_terms = FullGlossaryTermSerializer(many=True, source="glossaryterm_set")
    glossary_categories = serializers.SerializerMethodField('get_categories')

    def get_categories(self, value):
        return GlossaryCategorySerializer(GlossaryCategory.objects.all(), many=True).data

    class Meta:
        model = Project
        fields = ["id", "title",
                  "short_description",
                  "experiments_description",
                  "long_description",
                  "status", "created_date", "last_update", "experiments", "glossary_terms", "glossary_categories"]


class ProjectUserSerializer(serializers.ModelSerializer):
    user = serializers.SlugRelatedField(slug_field="email", read_only=True)
    user_id = serializers.PrimaryKeyRelatedField(source="user", queryset=User.objects.all(), write_only=True)

    class Meta:
        model = ProjectUser
        fields = ["id", "project", "user_id",
                  "user",
                  "level",
                  ]
