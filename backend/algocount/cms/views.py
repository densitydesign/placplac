import os
import shutil
import subprocess
import tempfile

from django.http import Http404, HttpResponse
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
            with tempfile.TemporaryDirectory() as tmpdirname:
                shutil.copytree(settings.PROJECT_FRONTEND_EXPORT, tmpdirname, dirs_exist_ok=True, symlinks=True)
                file = os.path.join(tmpdirname, "data.json")
                with open(file, 'w') as f:
                    json.dump(serializer.data, f)
                subprocess.check_call('npx cross-env-shell FILE_PATH="{}" next build && npx next export'.format(file),
                                      shell=True,
                                      cwd=tmpdirname)

                zip_name = os.path.join(tmpdirname, "site")
                out_directory = os.path.join(tmpdirname, "out")
                zip_file = open(shutil.make_archive(zip_name, 'zip', out_directory), 'rb')
                response = HttpResponse(zip_file, content_type='application/zip')
                response['Content-Disposition'] = 'attachment; filename=site.zip'
                return response
            #return Response(serializer.data)
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
