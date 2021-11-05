from django.urls import path
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView

from authentication import views

router = DefaultRouter()
router.register(r'users', views.UserViewSet, basename='users')
router.register(r'register', views.UserRegistrationViewSet, basename='users-register')
urlpatterns = [
    path('token/', views.ObtainTokenPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
