from rest_framework import serializers
from rest_framework.settings import api_settings


class FormattedJSONField(serializers.Field):

    def to_representation(self, value):
        if not value or value == "":
            return None
        return value


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
