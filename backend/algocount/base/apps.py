from django.apps import AppConfig
from django.db.models.signals import post_migrate


class BaseConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'base'

    def ready(self):
        from .signals import populate_models
        post_migrate.connect(populate_models, sender=self)
