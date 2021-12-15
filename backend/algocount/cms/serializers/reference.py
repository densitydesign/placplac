from rest_framework import serializers

from cms.models import Reference


class ReferenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reference
        fields = ["id", "title",
                  "link",
                  "project"]
