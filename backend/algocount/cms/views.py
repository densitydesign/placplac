import json
import os
import shutil
import subprocess
import tempfile

from django.conf import settings
from django.db.models import Q
from django.http import Http404, HttpResponse
from rest_framework import permissions, exceptions
from rest_framework.decorators import action
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response

from base.viewsets import CustomModelView
from cms.filters.glossary_category import GlossaryCategoryFilter
from cms.filters.glossary_term import GlossaryTermFilter
from cms.filters.project import ProjectMediaFilter, ProjectUserFilter
from cms.filters.reference import ReferenceFilter
from cms.filters.step import StepFilter
from cms.models import Project, Experiment, ProjectMedia, GlossaryCategory, GlossaryTerm, Step, ProjectUser, Reference
from cms.serializers.experiment import ExperimentSerializer
from cms.serializers.glossary import GlossaryCategorySerializer, GlossaryTermSerializer
from cms.serializers.project import ProjectSerializer, ProjectMediaSerializer, FullProjectSerializer, \
    ProjectUserSerializer
from cms.serializers.reference import ReferenceSerializer
from cms.serializers.step import StepSerializer


class ProjectViewSet(CustomModelView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

    def check_object_permissions(self, request, instance):
        if not self.request.user.is_superuser and not ProjectUser.objects.filter(project=instance,
                                                                                 user=self.request.user,
                                                                                 level="1").exists() \
                and request.method not in permissions.SAFE_METHODS:
            raise exceptions.PermissionDenied()

        return super(ProjectViewSet, self).check_object_permissions(request, instance)

    def perform_create(self, serializer):
        project = serializer.save()
        user = self.request.user
        ProjectUser.objects.create(project=project, user=user, level="1")

    def get_queryset(self):
        user = self.request.user
        if user.is_superuser:
            return Project.objects.all()
        return Project.objects.filter(projectuser__user=user)

    @action(detail=True, methods=["GET"])
    def get_full(self, request, pk):
        try:
            instance = self.get_object()
            serializer = FullProjectSerializer(instance)
            return Response(serializer.data)
        except Project.DoesNotExist:
            raise Http404

    @action(detail=True, methods=["GET"])
    def export(self, request, pk):
        instance = self.get_object()
        serializer = FullProjectSerializer(instance)
        with tempfile.TemporaryDirectory() as tmpdirname:
            shutil.copytree(settings.PROJECT_FRONTEND_EXPORT, tmpdirname, dirs_exist_ok=True, symlinks=True)
            file = os.path.join(tmpdirname, "data.json")
            with open(file, 'w') as f:
                json.dump(serializer.data, f)
            subprocess.check_call('npx cross-env-shell FILE_PATH="{}" next build && npx next export'.format(file),
                                  shell=True,
                                  cwd=tmpdirname, close_fds=True)

            zip_name = os.path.join(tmpdirname, "site")
            out_directory = os.path.join(tmpdirname, "out")
            zip_file = open(shutil.make_archive(zip_name, 'zip', out_directory), 'rb')
            response = HttpResponse(zip_file, content_type='application/zip')
            response['Content-Disposition'] = 'attachment; filename=site.zip'
            return response

    @action(detail=True, methods=["GET"])
    def clone(self, request, pk):
        instance = self.get_object()
        new_instance = instance
        new_instance.pk = None
        new_instance._state.adding = True
        new_instance.save()
        instance = self.get_object()

        for project_user in instance.projectuser_set.all():
            new_project_user = project_user
            new_project_user.pk = None
            new_project_user._state.adding = True
            new_project_user.project = new_instance
            new_project_user.save()
        for project_media in instance.projectmedia_set.all():
            new_project_media = project_media
            new_project_media.pk = None
            new_project_media._state.adding = True
            new_project_media.project = new_instance
            new_project_media.save()

        for glossary_term in instance.glossaryterm_set.all():
            new_glossary_term = glossary_term
            new_glossary_term.pk = None
            new_glossary_term._state.adding = True
            new_glossary_term.project = new_instance
            new_glossary_term.save()

        for experiment in instance.experiment_set.all():
            steps = []
            for step in experiment.step_set.all():
                step.pk = None
                step._state.adding = True
                steps.append(step)
            new_experiment = experiment
            new_experiment.pk = None
            new_experiment._state.adding = True
            new_experiment.project = new_instance
            new_experiment.save()
            for step in steps:
                step.experiment = new_experiment
                step.save()

        project_user, result = ProjectUser.objects.get_or_create(project=new_instance, user=self.request.user)
        project_user.level = "1"
        project_user.save()
        serializer = ProjectSerializer(new_instance, context={"request": self.request})
        return Response(serializer.data)


class ProjectMediaViewSet(CustomModelView):
    queryset = ProjectMedia.objects.all()
    serializer_class = ProjectMediaSerializer
    parser_classes = [MultiPartParser]
    filterset_class = ProjectMediaFilter

    def get_queryset(self):
        user = self.request.user
        if user.is_superuser:
            return ProjectMedia.objects.all()
        return ProjectMedia.objects.filter(project__projectuser__user=user)


class ProjectUserViewSet(CustomModelView):
    queryset = ProjectUser.objects.all()
    serializer_class = ProjectUserSerializer
    filterset_class = ProjectUserFilter

    def perform_create(self, serializer):
        if not self.request.user.is_superuser and not ProjectUser.objects.filter(
                project=serializer.validated_data["project"],
                user=self.request.user,
                level="1").exists():
            raise exceptions.PermissionDenied()
        serializer.save()

    def check_object_permissions(self, request, obj):

        if not self.request.user.is_superuser and not ProjectUser.objects.filter(project=obj.project,
                                                                                 user=self.request.user,
                                                                                 level="1").exists() and request.method not in permissions.SAFE_METHODS:
            raise exceptions.PermissionDenied()

        return super(ProjectUserViewSet, self).check_object_permissions(request, obj)

    # filterset_class = CachetFilter
    def get_queryset(self):
        user = self.request.user
        if user.is_superuser:
            return ProjectUser.objects.all()
        return ProjectUser.objects.filter(project__projectuser__user=user)


class ExperimentViewSet(CustomModelView):
    queryset = Experiment.objects.all()
    serializer_class = ExperimentSerializer

    # filterset_class = CachetFilter
    def get_queryset(self):
        user = self.request.user
        if user.is_superuser:
            return Experiment.objects.all()
        return Experiment.objects.filter(project__projectuser__user=user)


class GlossaryCategoryViewSet(CustomModelView):
    queryset = GlossaryCategory.objects.all()
    serializer_class = GlossaryCategorySerializer
    filterset_class = GlossaryCategoryFilter

    def check_object_permissions(self, request, obj):
        if not self.request.user.is_superuser and not GlossaryCategory.objects.filter(
                project__projectuser__user=self.request.user,
                ).exists() and request.method not in permissions.SAFE_METHODS:
            raise exceptions.PermissionDenied()

        return super(GlossaryCategoryViewSet, self).check_object_permissions(request, obj)

    def get_queryset(self):
        user = self.request.user
        if user.is_superuser:
            return GlossaryCategory.objects.all()
        return GlossaryCategory.objects.filter(Q(project__projectuser__user=user) | Q(project__isnull=True))


class GlossaryTermViewSet(CustomModelView):
    queryset = GlossaryTerm.objects.all()
    serializer_class = GlossaryTermSerializer
    filterset_class = GlossaryTermFilter

    def get_queryset(self):
        user = self.request.user
        if user.is_superuser:
            return GlossaryTerm.objects.all()
        return GlossaryTerm.objects.filter(project__projectuser__user=user)


class StepViewSet(CustomModelView):
    queryset = Step.objects.all()
    serializer_class = StepSerializer
    filterset_class = StepFilter

    def get_queryset(self):
        user = self.request.user
        if user.is_superuser:
            return Step.objects.all()
        return Step.objects.filter(experiment__project__projectuser__user=user)

class ReferenceViewSet(CustomModelView):
    queryset = Reference.objects.all()
    serializer_class = ReferenceSerializer
    filterset_class = ReferenceFilter

    def get_queryset(self):
        user = self.request.user
        if user.is_superuser:
            return Reference.objects.all()
        return Reference.objects.filter(project__projectuser__user=user)

