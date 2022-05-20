from rest_framework import viewsets, status
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response

from base.utils import get_paginated_response
from cms.filters.step import StepFilter, StepDownloadFilter
from cms.models import Step, StepDownload
from cms.selectors.step import get_step, step_list, get_step_download, step_download_list
from cms.serializers.step import StepSerializer, StepDownloadSerializer, StepFilterSerializer, \
    StepDownloadFilterSerializer
from cms.services.step import create_step, update_step, delete_step, create_step_download, update_step_download, \
    delete_step_download


class StepViewSet(viewsets.ModelViewSet):
    queryset = Step.objects.all()
    serializer_class = StepSerializer
    filterset_class = StepFilter

    def retrieve(self, request, *args, **kwargs):
        instance = get_step(user_request=self.request.user, id=kwargs["pk"])
        serializer = StepSerializer(instance)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        serializer = StepSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        project = create_step(user_request=self.request.user, **serializer.validated_data)
        serializer = StepSerializer(project)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        instance = get_step(user_request=self.request.user, id=kwargs["pk"])
        serializer = StepSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = update_step(step=instance, data=serializer.validated_data)
        serializer = StepSerializer(instance)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        instance = get_step(user_request=self.request.user, id=kwargs["pk"])
        delete_step(step=instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def list(self, request, *args, **kwargs):
        filter_serializer = StepFilterSerializer(data=request.query_params)
        filter_serializer.is_valid(raise_exception=True)
        queryset = step_list(user_request=self.request.user, filters=filter_serializer.validated_data)
        return get_paginated_response(
            pagination_class=self.pagination_class,
            serializer_class=StepSerializer,
            queryset=queryset,
            request=request,
            view=self)


class StepDownloadViewSet(viewsets.ModelViewSet):
    queryset = StepDownload.objects.all()
    serializer_class = StepDownloadSerializer
    parser_classes = [MultiPartParser]
    filterset_class = StepDownloadFilter

    def retrieve(self, request, *args, **kwargs):
        instance = get_step_download(user_request=self.request.user, id=kwargs["pk"])
        serializer = StepDownloadSerializer(instance)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        serializer = StepSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        project = create_step_download(user_request=self.request.user, **serializer.validated_data)
        serializer = StepDownloadSerializer(project)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        instance = get_step_download(user_request=self.request.user, id=kwargs["pk"])
        serializer = StepDownloadSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = update_step_download(step_download=instance, data=serializer.validated_data)
        serializer = StepDownloadSerializer(instance)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        instance = get_step_download(user_request=self.request.user, id=kwargs["pk"])
        delete_step_download(step_download=instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def list(self, request, *args, **kwargs):
        filter_serializer = StepDownloadFilterSerializer(data=request.query_params)
        filter_serializer.is_valid(raise_exception=True)
        queryset = step_download_list(user_request=self.request.user, filters=filter_serializer.validated_data)
        return get_paginated_response(
            pagination_class=self.pagination_class,
            serializer_class=StepDownloadSerializer,
            queryset=queryset,
            request=request,
            view=self)
