from django.urls import path
from . import views

urlpatterns = [
    #path('create')
    path('account/', views.CreateClienteView.as_view(), name='create_account'),
    path('worker/', views.WorkerTypeView.as_view(), name='worker_type'),
]
