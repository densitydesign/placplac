from rest_framework import serializers

from cms.models import ProjectMedia
from base.utils import file_to_base64


class Base64ImageFieldAllImages(serializers.RelatedField):

    def to_representation(self, file):
        if not file:
            return ""
        return file_to_base64( file.file.path)


class FormattedJSONField(serializers.Field):

    def to_representation(self, value):
        if not value or value == "":
            return None

        context = value.copy()
        for row in context:
            for col in row:
                if col["type"] == "image":
                    try:
                        image = ProjectMedia.objects.get(id=col["content"]["image"])
                        col["content"]["image"] = file_to_base64(image.file.path)
                    except ProjectMedia.DoesNotExist:
                        col["content"]["image"] = None
        return context
