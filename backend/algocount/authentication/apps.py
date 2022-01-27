from django.apps import AppConfig
from django.db.models.signals import post_migrate

class AuthenticationConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'authentication'

    def ready(self):
        from .signals import populate_models
        post_migrate.connect(populate_models, sender=self)
