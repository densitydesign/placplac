from django.contrib.auth import get_user_model
from rest_framework import viewsets
from rest_framework.mixins import CreateModelMixin
from rest_framework.permissions import AllowAny
from rest_framework.viewsets import GenericViewSet
from rest_framework_simplejwt.views import TokenObtainPairView

from authentication.serializers import DefaultTokenObtainPairSerializer, UserSerializer, UserRegistrationSerializer
from base.permissions import IsSuperUserOrReadOnly

User = get_user_model()


class ObtainTokenPairView(TokenObtainPairView):
    permission_classes = (AllowAny,)
    serializer_class = DefaultTokenObtainPairSerializer


class UserViewSet(viewsets.ModelViewSet):
    permission_classes = (IsSuperUserOrReadOnly,)
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_queryset(self):
        if self.request.user and self.request.user.is_superuser:
            return User.objects.all()
        return User.objects.filter(is_active=True).exclude(id=self.request.user.id)


class UserRegistrationViewSet(CreateModelMixin, GenericViewSet):
    permission_classes = (AllowAny,)
    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer
