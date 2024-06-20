from django.urls import path
from . import views

urlpatterns = [
    #path('create')
    path('order/', views.PedidoListCreate.as_view(), name='order'),
    path('package/', views.ListPaqueteView.as_view(), name='package'),
]
