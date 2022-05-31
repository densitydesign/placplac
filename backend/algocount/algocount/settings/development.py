from .base import *

DEBUG = True



EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

REST_FRAMEWORK = {
    'DEFAULT_METADATA_CLASS': 'base.metadata.OverridePermissionsMetadata',
    'DEFAULT_FILTER_BACKENDS': (
        'django_filters.rest_framework.DjangoFilterBackend',
        "rest_framework.filters.OrderingFilter"
    ),
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.BasicAuthentication',
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        "base.permissions.DjangoModelViewPermissions",
    ],
    'DEFAULT_PAGINATION_CLASS': 'base.pagination.CustomPageNumberPagination',
    'PAGE_SIZE': 100,
    "DATE_INPUT_FORMATS": ['%d/%m/%Y', '%Y-%m-%d'],
    "DATETIME_INPUT_FORMATS": ["ISO-8601"],
}
