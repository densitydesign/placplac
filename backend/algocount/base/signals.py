def populate_models(sender, **kwargs):
    from django.contrib.auth import get_user_model
    from django.contrib.auth.models import Group, Permission
    from django.contrib.contenttypes.models import ContentType
    from cms.models import Project, ProjectUser, ProjectMedia, Experiment, Step, GlossaryTerm, GlossaryCategory
    from django.conf import settings
    def add_permissions(group, model):
        content_type = ContentType.objects.get_for_model(model)
        permissions = Permission.objects.filter(content_type=content_type)
        for permission in permissions:
            group.permissions.add(permission)

    User = get_user_model()
    if settings.DEBUG and not User.objects.filter(email="admin@admin.it").exists():
        User.objects.create_superuser('admin@admin.it', 'admin1234')

    group, result = Group.objects.get_or_create(name="editor")
    add_permissions(group, Project)
    add_permissions(group, ProjectUser)
    add_permissions(group, ProjectMedia)
    add_permissions(group, Experiment)
    add_permissions(group, Step)
    add_permissions(group, GlossaryTerm)
    add_permissions(group, GlossaryCategory)
