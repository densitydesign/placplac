def populate_models(sender, **kwargs):
    from django.contrib.auth.models import User

    if not User.objects.filter(username="admin").exists():
        User.objects.create_superuser('admin', '', 'admin1234')
