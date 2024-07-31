from django.urls import path
from django.contrib import admin
from . import views

urlpatterns = [
    #path('mng/',admin.site.urls),
    path('order/', views.PedidoListCreate.as_view(), name='order'),
    path('confirm/<str:num_pedido>/', views.ConfirmPedidoView.as_view(), name='detail'),
    path('receipt/',views.ListComprobanteView.as_view(), name='receipt'),
    path('receipt/<str:num_comprobante>/', views.RetrieveComprobanteView.as_view(), name='update_receipt'),
    path('package/', views.ListPaqueteView.as_view(), name='package'),
    path('price_table/create/', views.TablaListCreate.as_view(), name='prices_table'),
    path('price_table/<str:codigo>/update/', views.TablaUpdateView.as_view(), name='update_price_table'),
    path('price_table/<str:codigo>/delete/', views.TablaDeleteView.as_view(), name='delete_price_table'),
]
