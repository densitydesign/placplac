import json
import os
import shutil
import subprocess
import tempfile
from io import BytesIO

from django.conf import settings
from django.core import files
from django.db.models import Q
from django.http import Http404, HttpResponse
from rest_framework import permissions, exceptions, status
from rest_framework.decorators import action
from rest_framework.parsers import MultiPartParser, JSONParser
from rest_framework.response import Response

from base.viewsets import CustomModelView
from cms.export_import import make_import, make_export, make_build
from cms.filters.experiment import ExperimentAdditionalMaterialFilter
from cms.filters.glossary_category import GlossaryCategoryFilter
from cms.filters.glossary_term import GlossaryTermFilter
from cms.filters.project import ProjectMediaFilter, ProjectUserFilter
from cms.filters.reference import ReferenceFilter
from cms.filters.step import StepFilter, StepDownloadFilter
from cms.models import Project, Experiment, ProjectMedia, GlossaryCategory, GlossaryTerm, Step, ProjectUser, Reference, \
    StepDownload, ExperimentAdditionalMaterial
from cms.serializers.experiment import ExperimentSerializer, ExperimentAdditionalMaterialSerializer
from cms.serializers.glossary import GlossaryCategorySerializer, GlossaryTermSerializer
from cms.serializers.project import ProjectSerializer, ProjectMediaSerializer, FullProjectSerializer, \
    ProjectUserSerializer, ImportProjectSerializer
from cms.serializers.reference import ReferenceSerializer
from cms.serializers.step import StepSerializer, StepDownloadSerializer
import requests

def get_all_relation_objects(relation_set):
    related_objects = []
    for related in relation_set.all():
        related.pk = None
        related._state.adding = True
        related_objects.append(related)
    return related_objects


def save_new_relation_objects(objects_list, field: str, related_obj):
    for obj in objects_list:
        setattr(obj, field, related_obj)
        obj.save()

def clone_simple_relation(relation_set, project):
        for related in relation_set.all():
            new_related= related
            new_related.pk = None
            new_related._state.adding = True
            new_related.project = project
            new_related.save()

class ProjectViewSet(CustomModelView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

    def check_object_permissions(self, request, instance):
        if not self.request.user.is_superuser and not ProjectUser.objects.filter(project=instance,
                                                                                 user=self.request.user,
                                                                                 level="1").exists() \
                and request.method not in [*permissions.SAFE_METHODS, "PATCH"]:
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

    @action(detail=False, methods=["POST"])
    def import_project(self, request):
        serializer = ImportProjectSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        file = serializer.validated_data["file"]
        project = make_import(file=file)
        if not project:
            return Response(status=status.HTTP_400_BAD_REQUEST, data={"detail":"The file cannot be imported!"})
        return Response()

    @action(detail=True, methods=["GET"])
    def export_to_importable_format(self, request, pk):
        project = self.get_object()
        zip_file = make_export(project=project)
        response = HttpResponse(zip_file, content_type='application/zip')
        response['Content-Disposition'] = f"attachment; filename={project.title}.zip"
        return response

    @action(detail=True, methods=["POST"])
    def export(self, request, pk):
        instance = self.get_object()
        base_path = self.request.data.get("base_path", "")
        zip_file = make_build(project=instance, base_path=base_path)
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

        clone_simple_relation(instance.projectuser_set, new_instance)
        clone_simple_relation(instance.projectmedia_set, new_instance)
        clone_simple_relation(instance.reference_set, new_instance)

        for glossary_term in instance.glossaryterm_set.all():
            glossary_category = GlossaryCategory.objects.get_or_create(project=new_instance,
                                                                       title=glossary_term.glossary_category.title,
                                                                       description=glossary_term.glossary_category.description,
                                                                       color=glossary_term.glossary_category.color)
            new_glossary_term = glossary_term
            new_glossary_term.glossary_category = glossary_category
            new_glossary_term.pk = None
            new_glossary_term._state.adding = True
            new_glossary_term.project = new_instance
            new_glossary_term.save()


        for experiment in instance.experiment_set.all():
            references = get_all_relation_objects(experiment.reference_set)
            additional_materials = get_all_relation_objects(experiment.experimentadditionalmaterial_set)
            steps = []
            for step in experiment.step_set.all():
                step_downloads =  get_all_relation_objects(step.stepdownload_set)
                step.pk = None
                step._state.adding = True
                steps.append([step,step_downloads])

            experiment.pk = None
            experiment._state.adding = True
            experiment.project = new_instance
            experiment.save()
            save_new_relation_objects(references, "experiment", experiment)
            save_new_relation_objects(additional_materials, "experiment", experiment)
            for step in steps:
                step[0].experiment=experiment
                step[0].save()
                save_new_relation_objects(step[1], "step", step[0])

        project_user, result = ProjectUser.objects.get_or_create(project=new_instance, user=self.request.user)
        project_user.level = "1"
        project_user.save()
        serializer = ProjectSerializer(new_instance, context={"request": self.request})
        return Response(serializer.data)


class ProjectMediaViewSet(CustomModelView):
    queryset = ProjectMedia.objects.all()
    serializer_class = ProjectMediaSerializer
    parser_classes = [MultiPartParser,JSONParser]
    filterset_class = ProjectMediaFilter

    # @action(detail=False, methods=["POST"])
    # def upload_image_from_link(self, request):
    #     url = self.request.data.get("url", "")
    #     project = self.request.data.get("project", "")
    #     try:
    #         response = requests.get(url, stream=True)
    #     except requests.exceptions.RequestException as e:  # This is the correct syntax
    #         return Response(status=status.HTTP_400_BAD_REQUEST)
    #     if response.status_code != requests.codes.ok:
    #         return Response(status=status.HTTP_400_BAD_REQUEST)
    #     file_name = url.split('/')[-1]
    #     fp = BytesIO()
    #     fp.write(response.content)
    #
    #     media = ProjectMedia.objects.create(project_id=project, file=files.File(fp, name=file_name))
    #     return Response(ProjectMediaSerializer(media).data)

    def get_queryset(self):
        user = self.request.user
        if user.is_superuser:
            return ProjectMedia.objects.all()
        return ProjectMedia.objects.filter(project__projectuser__user=user)


class StepDownloadViewSet(CustomModelView):
    queryset = StepDownload.objects.all()
    serializer_class = StepDownloadSerializer
    parser_classes = [MultiPartParser]
    filterset_class = StepDownloadFilter

    def get_queryset(self):
        user = self.request.user
        if user.is_superuser:
            return StepDownload.objects.all()
        return StepDownload.objects.filter(step__experiment__project__projectuser__user=user)


class ExperimentAdditionalMaterialViewSet(CustomModelView):
    queryset = ExperimentAdditionalMaterial.objects.all()
    serializer_class = ExperimentAdditionalMaterialSerializer
    parser_classes = [MultiPartParser]
    filterset_class = ExperimentAdditionalMaterialFilter

    def get_queryset(self):
        user = self.request.user
        if user.is_superuser:
            return ExperimentAdditionalMaterial.objects.all()
        return ExperimentAdditionalMaterial.objects.filter(experiment__project__projectuser__user=user)


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
        if not self.request.user.is_superuser \
                and not ProjectUser.objects.filter(project=obj.project, user=self.request.user, level="1").exists() \
                and request.method not in permissions.SAFE_METHODS:
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
        return Reference.objects.filter(
            Q(project__projectuser__user=user, experiment__isnull=True) |
            Q(experiment__project__projectuser__user=user, project__isnull=True)).distinct()
