from datetime import datetime

from django.http import HttpResponse
from rest_framework import status, viewsets, mixins
from rest_framework.decorators import action
from rest_framework.parsers import MultiPartParser, JSONParser
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from base.types import PermissionType
from base.utils import get_paginated_response
from cms.export_import import make_import, make_export, make_build
from cms.filters.project import ProjectMediaFilter, ProjectUserFilter
from cms.models import Project, ProjectMedia, ProjectUser
from cms.selectors.project import project_list, get_project, get_project_user, project_user_list, get_project_media, \
    project_media_list
from cms.serializers.project import ProjectSerializer, FullProjectSerializer, ImportProjectSerializer, \
    ProjectMediaSerializer, ProjectUserSerializer, FilterProjectUserSerializer, FilterProjectMediaSerializer
from cms.services.project import create_project, update_project, delete_project, clone_project, add_user_to_project, \
    remove_user_from_project, create_project_media, delete_project_media


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

    def retrieve(self, request, *args, **kwargs):
        instance = get_project(user_request=self.request.user, id=kwargs["pk"], permission=PermissionType.READ)
        serializer = ProjectSerializer(instance, context={"request": self.request})
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        serializer = ProjectSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        project = create_project(user_request=self.request.user, **serializer.validated_data)
        serializer = ProjectSerializer(project, context={"request": self.request})
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        instance = get_project(user_request=self.request.user, id=kwargs["pk"], permission=PermissionType.WRITE)
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        instance = update_project(project=instance, data=serializer.validated_data)
        serializer = ProjectSerializer(instance, context={"request": self.request})
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        instance = get_project(user_request=self.request.user, id=kwargs["pk"], permission=PermissionType.DELETE)
        delete_project(project=instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def list(self, request, *args, **kwargs):
        sort = request.query_params.get('ordering')
        queryset = project_list(user_request=self.request.user)
        if sort:
            queryset = queryset.order_by(sort)
        return get_paginated_response(
            pagination_class=self.pagination_class,
            serializer_class=self.get_serializer,
            queryset=queryset,
            request=request,
            view=self)

    @action(detail=True, methods=["GET"])
    def get_full(self, request, pk):
        instance = get_project(user_request=self.request.user, id=pk, permission=PermissionType.READ)
        serializer = FullProjectSerializer(instance)
        return Response(serializer.data)

    @action(detail=False, methods=["POST"])
    def import_project(self, request):
        serializer = ImportProjectSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        file = serializer.validated_data["file"]
        project = make_import(file=file, user_request=self.request.user)
        if not project:
            return Response(status=status.HTTP_400_BAD_REQUEST, data={"detail": "The file cannot be imported!"})
        serializer = ProjectSerializer(project, context={"request": self.request})
        return Response(serializer.data)

    @action(detail=True, methods=["GET"])
    def export_to_importable_format(self, request, pk):
        project = get_project(user_request=self.request.user, id=pk, permission=PermissionType.READ)
        zip_file = make_export(project=project)
        response = HttpResponse(zip_file, content_type='application/zip')
        response['Content-Disposition'] = f"attachment; filename={project.title}.zip"
        return response

    @action(detail=True, methods=["POST"])
    def export(self, request, pk):
        instance = get_project(user_request=self.request.user, id=pk, permission=PermissionType.READ)
        base_path = self.request.data.get("base_path", "")
        zip_file = make_build(project=instance, base_path=base_path)

        instance.last_build.save("project.zip", zip_file)
        instance.last_build_time = datetime.now()
        instance.base_path = base_path
        instance.save()
        response = HttpResponse(open(instance.last_build.path, 'rb'), content_type='application/zip')
        response['Content-Disposition'] = 'attachment; filename=site.zip'
        return response

    @action(detail=True, methods=["GET"])
    def clone(self, request, pk):
        instance = get_project(user_request=self.request.user, id=pk, permission=PermissionType.READ)
        new_instance = clone_project(project=instance, user_request=self.request.user)
        serializer = ProjectSerializer(new_instance, context={"request": self.request})
        return Response(serializer.data)


class ProjectMediaViewSet(mixins.CreateModelMixin,
                          mixins.RetrieveModelMixin,
                          mixins.DestroyModelMixin,
                          mixins.ListModelMixin,
                          GenericViewSet):
    queryset = ProjectMedia.objects.all()
    serializer_class = ProjectMediaSerializer
    parser_classes = [MultiPartParser, JSONParser]
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

    def retrieve(self, request, *args, **kwargs):
        instance = get_project_media(user_request=self.request.user, id=kwargs["pk"])
        serializer = ProjectMediaSerializer(instance)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        serializer = ProjectMediaSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        project_media = create_project_media(request_user=self.request.user, **serializer.validated_data)
        serializer = ProjectMediaSerializer(project_media)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def destroy(self, request, *args, **kwargs):
        instance = get_project_media(user_request=self.request.user, id=kwargs["pk"])
        delete_project_media(project_media=instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def list(self, request, *args, **kwargs):
        filter_serializer = FilterProjectMediaSerializer(data=request.query_params)
        filter_serializer.is_valid(raise_exception=True)
        queryset = project_media_list(user_request=self.request.user, filters=filter_serializer.validated_data)
        return get_paginated_response(
            pagination_class=self.pagination_class,
            serializer_class=ProjectMediaSerializer,
            queryset=queryset,
            request=request,
            view=self)


class ProjectUserViewSet(mixins.CreateModelMixin,
                         mixins.RetrieveModelMixin,
                         mixins.DestroyModelMixin,
                         mixins.ListModelMixin,
                         GenericViewSet):
    queryset = ProjectUser.objects.all()
    serializer_class = ProjectUserSerializer
    filterset_class = ProjectUserFilter

    def retrieve(self, request, *args, **kwargs):
        instance = get_project_user(user_request=self.request.user, id=kwargs["pk"], permission=PermissionType.READ)
        serializer = ProjectUserSerializer(instance)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        serializer = ProjectUserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        project_user = add_user_to_project(request_user=self.request.user, **serializer.validated_data)
        serializer = ProjectUserSerializer(project_user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def destroy(self, request, *args, **kwargs):
        instance = get_project_user(user_request=self.request.user, id=kwargs["pk"], permission=PermissionType.DELETE)
        remove_user_from_project(project_user=instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def list(self, request, *args, **kwargs):
        filter_serializer = FilterProjectUserSerializer(data=request.query_params)
        filter_serializer.is_valid(raise_exception=True)
        queryset = project_user_list(user_request=self.request.user, filters=filter_serializer.validated_data)
        return get_paginated_response(
            pagination_class=self.pagination_class,
            serializer_class=self.get_serializer,
            queryset=queryset,
            request=request,
            view=self)
