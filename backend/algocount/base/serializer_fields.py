from rest_framework import serializers
from rest_framework.settings import api_settings

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
                if "type" in col and col["type"] == "image":
                    try:
                        image = ProjectMedia.objects.get(id=col["content"]["image"])
                        col["content"]["image"] = file_to_base64(image.file.path) if image.file else None
                    except ProjectMedia.DoesNotExist:
                        col["content"]["image"] = None
        return context


class CustomFileField(serializers.FileField):

    def to_representation(self, value):
        if not value:
            return None

        use_url = getattr(self, 'use_url', api_settings.UPLOADED_FILES_USE_URL)
        if use_url:
            try:
                url = value.url
            except AttributeError:
                return None

            return url

        return value.name