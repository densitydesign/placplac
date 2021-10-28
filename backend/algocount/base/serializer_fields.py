import base64
import os

from drf_extra_fields.fields import Base64ImageField
from rest_framework import serializers


class DisplayNameWritableField(serializers.ChoiceField):
    def __init__(self, **kwargs):
        self.html_cutoff = kwargs.pop('html_cutoff', self.html_cutoff)
        self.html_cutoff_text = kwargs.pop('html_cutoff_text', self.html_cutoff_text)

        self.allow_blank = kwargs.pop('allow_blank', False)
        super(DisplayNameWritableField, self).__init__(**kwargs)

    def to_representation(self, value):
        return self.choices.get(value, value)

    def bind(self, field_name, parent):
        super().bind(field_name, parent)
        self.choices = parent.Meta.model._meta.get_field(field_name).choices


class BlankableFloatField(serializers.FloatField):
    """
    We wanted to be able to receive an empty string ('') for a float field
    and in that case turn it into a None
    """

    def to_internal_value(self, data):
        if data == '':
            return None

        return super(BlankableFloatField, self).to_internal_value(data)


class BlankableIntegerField(serializers.IntegerField):
    """
    We wanted to be able to receive an empty string ('') for a float field
    and in that case turn it into a None
    """

    def to_internal_value(self, data):
        if data == '':
            return None

        return super(BlankableIntegerField, self).to_internal_value(data)


class BlankableDateField(serializers.DateField):
    """
    We wanted to be able to receive an empty string ('') for a date field
    and in that case turn it into a None
    """

    def to_internal_value(self, data):
        if data == '':
            return None

        return super(BlankableDateField, self).to_internal_value(data)


class BlankableDateTimeField(serializers.DateTimeField):
    """
    We wanted to be able to receive an empty string ('') for a date field
    and in that case turn it into a None
    """

    def to_internal_value(self, data):
        if data == '':
            return None

        return super(BlankableDateTimeField, self).to_internal_value(data)


class DisplayNameWritableField(serializers.ChoiceField):
    def __init__(self, **kwargs):
        self.html_cutoff = kwargs.pop('html_cutoff', self.html_cutoff)
        self.html_cutoff_text = kwargs.pop('html_cutoff_text', self.html_cutoff_text)

        self.allow_blank = kwargs.pop('allow_blank', False)
        super(DisplayNameWritableField, self).__init__(**kwargs)

    def to_representation(self, value):
        return self.choices.get(value, value)

    def bind(self, field_name, parent):
        super().bind(field_name, parent)
        self.choices = parent.Meta.model._meta.get_field(field_name).choices


class Base64ImageFieldAllImages(Base64ImageField):

    def to_representation(self, file):
        if self.represent_in_base64:
            # If the underlying ImageField is blank, a ValueError would be
            # raised on `open`. When representing as base64, simply return an
            # empty base64 str rather than let the exception propagate unhandled
            # up into serializers.
            if not file:
                return ""

            try:
                with open(file.path, "rb") as f:
                    return base64.b64encode(f.read()).decode()
            except Exception:
                raise IOError("Error encoding file")
        else:
            if not file:
                return None
            return os.path.basename(file.name)


class Base64ImageFieldCustom(Base64ImageFieldAllImages):
    ALLOWED_TYPES = (
        "tiff"
    )
