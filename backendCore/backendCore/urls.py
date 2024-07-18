"""
URL configuration for backendCore project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from login.views import CreateUserView, ListUserView, DeleteUserView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('login/user/register/', CreateUserView.as_view(), name='register'),
    path('login/user/all/',ListUserView.as_view(), name='list_users'),
    path('login/user/delete/',DeleteUserView.as_view(), name='delete_user'),
    path('login/token/', TokenObtainPairView.as_view(), name='get_token'),
    path('login/token/refresh/', TokenRefreshView.as_view(), name='refresh_token'),
    path('login-auth/', include('rest_framework.urls')),
    path('', include('login.urls'), name='login'),
    path('solicitudes/', include('gestion_solicitud.urls'), name='solicitudes'),
    path('paquetes/', include('gestion_paquete.urls'), name='paquetes'),
    path('envios/', include('gestion_envio.urls'), name='envios'),
]
