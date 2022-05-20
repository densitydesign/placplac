from rest_framework import viewsets, status
from rest_framework.response import Response

from base.utils import get_paginated_response
from cms.filters.reference import ReferenceFilter
from cms.models import Reference
from cms.selectors.reference import get_reference, reference_list
from cms.serializers.reference import ReferenceSerializer, FilterReferenceSerializer
from cms.services.reference import create_reference, update_reference, delete_reference


class ReferenceViewSet(viewsets.ModelViewSet):
    queryset = Reference.objects.all()
    serializer_class = ReferenceSerializer
    filterset_class = ReferenceFilter

    def retrieve(self, request, *args, **kwargs):
        instance = get_reference(user_request=self.request.user, id=kwargs["pk"])
        serializer = ReferenceSerializer(instance)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        serializer = ReferenceSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        project = create_reference(user_request=self.request.user, **serializer.validated_data)
        serializer = ReferenceSerializer(project)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        instance = get_reference(user_request=self.request.user, id=kwargs["pk"])
        serializer = ReferenceSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = update_reference(reference=instance, data=serializer.validated_data)
        serializer = ReferenceSerializer(instance)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        instance = get_reference(user_request=self.request.user, id=kwargs["pk"])
        delete_reference(reference=instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def list(self, request, *args, **kwargs):
        filter_serializer = FilterReferenceSerializer(data=request.query_params)
        filter_serializer.is_valid(raise_exception=True)
        queryset = reference_list(user_request=self.request.user, filters=filter_serializer.validated_data)
        return get_paginated_response(
            pagination_class=self.pagination_class,
            serializer_class=ReferenceSerializer,
            queryset=queryset,
            request=request,
            view=self)
