from rest_framework import exceptions, mixins, viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response


class AutocompleteViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet):

    def check_permissions(self, request):
        if not request.user.is_authenticated:
            raise exceptions.NotAuthenticated()
        return True


class CustomModelView(viewsets.ModelViewSet):
    page_size_query_param = "page_size"
    max_page_size = "100"

    @action(detail=False, methods=["POST"])
    def bulk_delete(self, request):
        if "ids" not in request.data or len(request.data["ids"]) <= 0:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        queryset = self.filter_queryset(self.get_queryset()).filter(id__in=request.data["ids"])
        for obj in queryset:
            self.check_object_permissions(request, obj)
        queryset.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
