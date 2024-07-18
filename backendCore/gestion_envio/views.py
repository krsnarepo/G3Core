from django.shortcuts import render

# Create your views here.

from django.shortcuts import render
from login.permissions import IsDelivery, IsManager
from .serializers import *
from rest_framework import generics, status
from rest_framework.response import Response
from gestion_solicitud.serializers import PedidoSerializer
# Create your views here.

class MovilidadListView(generics.ListAPIView):
    queryset = Movilidad.objects.all()
    serializer_class = MovilidadSerializer
    permission_classes = [IsManager]
    
class MovilidadUpdateView(generics.UpdateAPIView):
    queryset = Movilidad.objects.all()
    serializer_class = MovilidadSerializer
    permission_classes = [IsManager]
    lookup_field = 'id_movilidad'
    
class ListPedidoSinMov(generics.ListAPIView):
    serializer_class = PedidoSerializer
    permission_classes = [IsManager]
    
    def get_queryset(self):
        return Pedido.objects.filter(envio__isnull = True)
    
class EnvioCreateView(generics.CreateAPIView):
    serializer_class = EnvioSerializer
    permission_classes = [IsManager]
    
    def post(self, request, *args, **kwargs):
        id_movilidad = request.data.get('id_movilidad')
        id_pedido = request.data.get('id_pedido')
        
        movilidad = Movilidad.objects.get(id_movilidad = id_movilidad)
        if movilidad.estado_movilidad == 'En uso' or movilidad.estado_repartidor == 'En ruta':
            return Response({'message': 'Movilidad en uso'})
        
        pedido = Pedido.objects.get(id_pedido=id_pedido)
        Envio.objects.create(movilidad=movilidad, pedido=pedido)
        #pedido.order_state = 'En camino' # This shit needs to change in the order as said in the use case
        return Response({'message': 'Envio creado correctamente',
                         'estado pedido': 'En camino'})
             
class EnvioListView(generics.ListAPIView):
    queryset = Envio.objects.all()
    serializer_class = EnvioSerializer
    permission_classes = [IsManager]
    
class FormularioCreateView(generics.CreateAPIView):
    serializer_class = FormularioEntregaSerializer
    permission_classes = [IsManager]
    
    def create(self, request, *args, **kwargs):
        # Asume data comes in a list under the key 'formularios'
        formularios_data = request.data.get('formularios', [])
        
        if not isinstance(formularios_data, list):
            return Response({"error": "Se espera una lista de formularios"}, 
                            status=status.HTTP_400_BAD_REQUEST)

        serializer = self.get_serializer(data=formularios_data, many=True)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        serializer.save()
    
class FormularioListView(generics.ListAPIView):
    serializer_class = FormularioEntregaSerializer
    permission_classes = [IsManager,IsDelivery]
    
    def get_queryset(self):
        user = self.request.user
        if user.worker.worker_type.name == "Jefe de Logistica":
            return FormularioEntrega.objects.all()
        envio = Envio.objects.get(nombre_rep = user.username) # This is a problem, we need to change this so it can return the formularios linked to the repartidor
        return FormularioEntrega.objects.filter()

class FormularioUpdateView(generics.UpdateAPIView):
    queryset = FormularioEntrega.objects.all()
    serializer_class = FormularioEntregaSerializer
    permission_classes = [IsDelivery]
    lookup_field = 'id_formulario'
    
    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)