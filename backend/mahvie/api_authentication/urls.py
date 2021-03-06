from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import CreateUserView, ActivateAccount

urlpatterns = [
    path('register/', CreateUserView.as_view(), name='create_user'),
    path('confirm-email/', ActivateAccount.as_view(), name='confirm_email'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('password_reset/', include('django_rest_passwordreset.urls',
                                    namespace='password_reset')),
]
