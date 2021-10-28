from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from authentication import views

urlpatterns = [
    path('token/', views.ObtainTokenPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
