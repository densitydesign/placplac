from rest_framework import serializers

from cms.models import GlossaryCategory, GlossaryTerm
from base.serializer_fields import Base64ImageFieldAllImages


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
    image = Base64ImageFieldAllImages(source="image.file", )

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
                  "more_info_url", "project", "category_title"]
class GlossaryCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = GlossaryCategory
        fields = ["id", "title",
                  "description",
                  "color",
                  ]
