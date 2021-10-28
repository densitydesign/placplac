from django.apps import AppConfig
from django.db.models.signals import post_migrate


class CmsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'cms'

    def ready(self):
        from .signals import init_db
        post_migrate.connect(init_db, sender=self)
