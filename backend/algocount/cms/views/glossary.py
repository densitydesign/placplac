from rest_framework import viewsets, status
from rest_framework.response import Response

from base.types import PermissionType
from base.utils import get_paginated_response
from cms.filters.glossary_category import GlossaryCategoryFilter
from cms.filters.glossary_term import GlossaryTermFilter
from cms.models import GlossaryCategory, GlossaryTerm
from cms.selectors.glossary import get_glossary_category, glossary_category_list, get_glossary_term, glossary_term_list
from cms.serializers.glossary import GlossaryCategorySerializer, GlossaryTermSerializer, \
    FilterGlossaryCategorySerializer, FilterGlossaryTermSerializer
from cms.services.glossary import create_glossary_category, update_glossary_category, delete_glossary_category, \
    create_glossary_term, update_glossary_term, delete_glossary_term


class GlossaryCategoryViewSet(viewsets.ModelViewSet):
    queryset = GlossaryCategory.objects.all()
    serializer_class = GlossaryCategorySerializer
    filterset_class = GlossaryCategoryFilter

    def retrieve(self, request, *args, **kwargs):
        instance = get_glossary_category(user_request=self.request.user, id=kwargs["pk"],
                                         permission=PermissionType.READ)
        serializer = GlossaryCategorySerializer(instance)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        serializer = GlossaryCategorySerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        project = create_glossary_category(user_request=self.request.user, **serializer.validated_data)
        serializer = GlossaryCategorySerializer(project)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        instance = get_glossary_category(user_request=self.request.user, id=kwargs["pk"],
                                         permission=PermissionType.WRITE)
        serializer = GlossaryCategorySerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = update_glossary_category(glossary_category=instance, data=serializer.validated_data)
        serializer = GlossaryCategorySerializer(instance)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        instance = get_glossary_category(user_request=self.request.user, id=kwargs["pk"],
                                         permission=PermissionType.DELETE)
        delete_glossary_category(glossary_category=instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def list(self, request, *args, **kwargs):
        filter_serializer = FilterGlossaryCategorySerializer(data=request.query_params)
        filter_serializer.is_valid(raise_exception=True)
        queryset = glossary_category_list(user_request=self.request.user, filters=filter_serializer.validated_data)
        return get_paginated_response(
            pagination_class=self.pagination_class,
            serializer_class=GlossaryCategorySerializer,
            queryset=queryset,
            request=request,
            view=self)


class GlossaryTermViewSet(viewsets.ModelViewSet):
    queryset = GlossaryTerm.objects.all()
    serializer_class = GlossaryTermSerializer
    filterset_class = GlossaryTermFilter

    def retrieve(self, request, *args, **kwargs):
        instance = get_glossary_term(user_request=self.request.user, id=kwargs["pk"])
        serializer = GlossaryTermSerializer(instance)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        serializer = GlossaryTermSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        project = create_glossary_term(user_request=self.request.user, **serializer.validated_data)
        serializer = GlossaryTermSerializer(project)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        instance = get_glossary_term(user_request=self.request.user, id=kwargs["pk"])
        serializer = GlossaryTermSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = update_glossary_term(glossary_term=instance, data=serializer.validated_data)
        serializer = GlossaryTermSerializer(instance)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        instance = get_glossary_term(user_request=self.request.user, id=kwargs["pk"])
        delete_glossary_term(glossary_term=instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def list(self, request, *args, **kwargs):
        filter_serializer = FilterGlossaryTermSerializer(data=request.query_params)
        filter_serializer.is_valid(raise_exception=True)
        queryset = glossary_term_list(user_request=self.request.user, filters=filter_serializer.validated_data)
        return get_paginated_response(
            pagination_class=self.pagination_class,
            serializer_class=GlossaryTermSerializer,
            queryset=queryset,
            request=request,
            view=self)
