from rest_framework import serializers

from cms.models import Reference, Project


class ReferenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reference
        fields = ["id", "description",
                  "project", "in_text_citation"]


class FilterReferenceSerializer(serializers.Serializer):
    project = serializers.PrimaryKeyRelatedField(queryset=Project.objects.all(), required=False)
