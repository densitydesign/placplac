import os
import subprocess

from django.http import Http404
from rest_framework.decorators import action
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response

from base.viewsets import CustomModelView
from cms.filters.glossary_term import GlossaryTermFilter
from cms.filters.project import ProjectMediaFilter
from cms.filters.step import StepFilter
from cms.models import Project, Experiment, ProjectMedia, GlossaryCategory, GlossaryTerm, Step
from cms.serializers.experiment import ExperimentSerializer
from cms.serializers.glossary import GlossaryCategorySerializer, GlossaryTermSerializer
from cms.serializers.project import ProjectSerializer, ProjectMediaSerializer, FullProjectSerializer
from cms.serializers.step import StepSerializer
import json
from django.conf import settings


class ProjectViewSet(CustomModelView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

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
        try:
            instance = self.get_object()
            serializer = FullProjectSerializer(instance)
            with open(os.path.join(settings.EXPORT_IMPORT,"data.json" ), 'w') as f:
                json.dump(serializer.data, f)
            subprocess.check_call('npm --help', shell=True)

            return Response(serializer.data)
        except Project.DoesNotExist:
            raise Http404


class ProjectMediaViewSet(CustomModelView):
    queryset = ProjectMedia.objects.all()
    serializer_class = ProjectMediaSerializer
    parser_classes = [MultiPartParser]
    filterset_class = ProjectMediaFilter


class ExperimentViewSet(CustomModelView):
    queryset = Experiment.objects.all()
    serializer_class = ExperimentSerializer
    # filterset_class = CachetFilter


class GlossaryCategorytViewSet(CustomModelView):
    queryset = GlossaryCategory.objects.all()
    serializer_class = GlossaryCategorySerializer


class GlossaryTermViewSet(CustomModelView):
    queryset = GlossaryTerm.objects.all()
    serializer_class = GlossaryTermSerializer
    filterset_class = GlossaryTermFilter


class StepViewSet(CustomModelView):
    queryset = Step.objects.all()
    serializer_class = StepSerializer
    filterset_class = StepFilter
