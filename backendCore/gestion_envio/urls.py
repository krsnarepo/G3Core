from django.urls import path
from . import views

urlpatterns = [
    path('movilidad/', views.MovilidadListView.as_view(), name='movilidad-list'),
    path('movilidad/update/<int:id_movilidad>/', views.MovilidadUpdateView.as_view(), name='movilidad-update'),
    path('pedido/sin-movilidad/', views.ListPedidoSinMov.as_view(), name='pedido-sin-movilidad'),
    path('envio/create/', views.EnvioCreateView.as_view(), name='envio-create'),
    path('envio/', views.EnvioListView.as_view(), name='envio-list'),
    path('formulario/create/', views.FormularioCreateView.as_view(), name='formulario-create'),
    path('formulario/', views.FormularioListView.as_view(), name='formulario-list'),
    path('formulario/update/<int:id_formulario>/', views.FormularioUpdateView.as_view(), name='formulario-update'),
]