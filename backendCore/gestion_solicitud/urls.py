from django.urls import path
from django.contrib import admin
from . import views

urlpatterns = [
    #path('mng/',admin.site.urls),
    path('order/', views.PedidoListCreate.as_view(), name='order'),
    path('confirm/<int:pk>/', views.ConfirmPedidoView.as_view(), name='detail'),
    path('receipt/',views.ListComprobanteView.as_view(), name='receipt'),
    path('package/', views.ListPaqueteView.as_view(), name='package'),
    path('tabla/', views.TablaListCreate.as_view(), name='tabla')
]
