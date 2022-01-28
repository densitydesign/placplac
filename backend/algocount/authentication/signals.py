import os

def populate_models(sender, **kwargs):
    from django.contrib.auth import get_user_model
    from django.contrib.auth.models import Group, Permission
    from django.contrib.contenttypes.models import ContentType
    from cms.models import Project, ProjectUser, ProjectMedia, Experiment, Step, GlossaryTerm, GlossaryCategory,StepDownload,ExperimentAdditionalMaterial, Reference
    def add_permissions(group, model):
        content_type = ContentType.objects.get_for_model(model)
        permissions = Permission.objects.filter(content_type=content_type)
        for permission in permissions:
            group.permissions.add(permission)

    User = get_user_model()
    if not User.objects.filter(email=os.getenv("ADMIN_EMAIL")).exists():
        User.objects.create_superuser(os.getenv("ADMIN_EMAIL"), os.getenv("ADMIN_PASSWORD"))

    group, result = Group.objects.get_or_create(name="editor")
    add_permissions(group, Project)
    add_permissions(group, ProjectUser)
    add_permissions(group, ProjectMedia)
    add_permissions(group, Experiment)
    add_permissions(group, Step)
    add_permissions(group, GlossaryTerm)
    add_permissions(group, GlossaryCategory)
    add_permissions(group, StepDownload)
    add_permissions(group, Reference)
    add_permissions(group, ExperimentAdditionalMaterial)
