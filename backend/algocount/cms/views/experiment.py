from rest_framework import viewsets, status, mixins
from rest_framework.decorators import action
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from base.utils import get_paginated_response
from cms.filters.experiment import ExperimentAdditionalMaterialFilter
from cms.models import Experiment, ExperimentAdditionalMaterial
from cms.selectors.experiment import get_experiment, experiment_list, get_experiment_additional_material, \
    experiment_additional_material_list
from cms.serializers.experiment import ExperimentSerializer, ExperimentAdditionalMaterialSerializer, \
    FilterExperimentAdditionalMaterialSerializer, ReorderExperimentsSerializer
from cms.services.experiment import create_experiment, update_experiment, delete_experiment, \
    create_experiment_additional_material, delete_experiment_additional_material, reorder_experiments


class ExperimentViewSet(viewsets.ModelViewSet):
    queryset = Experiment.objects.all()
    serializer_class = ExperimentSerializer

    @action(detail=False, methods=["POST"])
    def reorder(self, request):
        serializer = ReorderExperimentsSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        reorder_experiments(user_request=request.user, **serializer.validated_data)
        return Response()

    def retrieve(self, request, *args, **kwargs):
        instance = get_experiment(user_request=self.request.user, id=kwargs["pk"])
        serializer = ExperimentSerializer(instance)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        serializer = ExperimentSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        project = create_experiment(user_request=self.request.user, **serializer.validated_data)
        serializer = ExperimentSerializer(project)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        instance = get_experiment(user_request=self.request.user, id=kwargs["pk"])
        serializer = ExperimentSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = update_experiment(experiment=instance, data=serializer.validated_data)
        serializer = ExperimentSerializer(instance)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        instance = get_experiment(user_request=self.request.user, id=kwargs["pk"])
        delete_experiment(experiment=instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def list(self, request, *args, **kwargs):
        queryset = experiment_list(user_request=self.request.user)
        return get_paginated_response(
            pagination_class=self.pagination_class,
            serializer_class=self.get_serializer,
            queryset=queryset,
            request=request,
            view=self)


class ExperimentAdditionalMaterialViewSet(mixins.CreateModelMixin,
                                          mixins.RetrieveModelMixin,
                                          mixins.DestroyModelMixin,
                                          mixins.ListModelMixin,
                                          GenericViewSet):
    queryset = ExperimentAdditionalMaterial.objects.all()
    serializer_class = ExperimentAdditionalMaterialSerializer
    parser_classes = [MultiPartParser]
    filterset_class = ExperimentAdditionalMaterialFilter

    def retrieve(self, request, *args, **kwargs):
        instance = get_experiment_additional_material(user_request=self.request.user, id=kwargs["pk"])
        serializer = ExperimentAdditionalMaterialSerializer(instance)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        serializer = ExperimentAdditionalMaterialSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        project = create_experiment_additional_material(user_request=self.request.user, **serializer.validated_data)
        serializer = ExperimentAdditionalMaterialSerializer(project)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def destroy(self, request, *args, **kwargs):
        instance = get_experiment_additional_material(user_request=self.request.user, id=kwargs["pk"])
        delete_experiment_additional_material(experiment_additional_material=instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def list(self, request, *args, **kwargs):
        filter_serializer = FilterExperimentAdditionalMaterialSerializer(data=request.query_params)
        filter_serializer.is_valid(raise_exception=True)
        queryset = experiment_additional_material_list(user_request=self.request.user,
                                                       filters=filter_serializer.validated_data)
        return get_paginated_response(
            pagination_class=self.pagination_class,
            serializer_class=ExperimentAdditionalMaterialSerializer,
            queryset=queryset,
            request=request,
            view=self)
