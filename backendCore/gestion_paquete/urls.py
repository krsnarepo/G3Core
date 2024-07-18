from django.urls import path
from . import views

urlpatterns = [
    path('validate-code/', views.ValidarView.as_view(), name='validate-code'),
    path('<str:codigo>/update/', views.PaqueteUpdateView.as_view(), name='package-update'),
    path('get-package/', views.ClassifiedPaqueteGetView.as_view(), name='get-package'),
    path('create-doc/', views.DocumentoControlCreateView.as_view(), name='create-doc'),
    path('update-doc/<str:numero_documento>/', views.DocumentoControlUpdateView.as_view(), name='update-doc'),
    path('list-doc/', views.DocumentoControlListView.as_view(), name='list-doc'),
]
