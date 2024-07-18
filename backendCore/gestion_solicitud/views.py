from django.shortcuts import get_object_or_404
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from login.permissions import IsManager
from django.db import transaction

from .services import external_payment_service
from .models import *
from .serializers import *

# Create your views here.

class PedidoListCreate(generics.ListCreateAPIView):
    serializer_class = PedidoSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        if user.worker.worker_type.name == 'Recepcionista':
            return Pedido.objects.all()
        return Pedido.objects.filter(cliente=user.cliente)
    
    @transaction.atomic
    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            pedido = serializer.save(cliente=self.request.user.cliente, state='unconfirmed')
            total_price = 0
            list_price = []
            for paquete in pedido.paquetes.all():
                paquete.calculate_price()
                list_price.append(paquete.precio)
                total_price += paquete.precio

            response_data = {
                'num_pedido': pedido.num_pedido, # needs to be received in frontend and returned back to confirm view
                'total_price': total_price,
                'list_price': list_price
            }

            headers = self.get_success_headers(serializer.data)
            return Response(response_data, status=status.HTTP_201_CREATED, headers=headers)
        else:
            print(serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
class ConfirmPedidoView(generics.UpdateAPIView):
    queryset = Pedido.objects.filter(state = 'unconfirmed')
    serializer_class = PedidoSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'num_pedido'
    
    @transaction.atomic
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        
        if instance.state != 'unconfirmed':
            return Response({'error': 'Order already confirmed'}, status=status.HTTP_400_BAD_REQUEST)
        
        if not external_payment_service(instance):
            return Response({'message': 'Payment incomplete'}, status=status.HTTP_402_PAYMENT_REQUIRED)

        instance.state = 'confirmed'
        instance.save()

        total_price = sum(paquete.precio for paquete in instance.paquetes.all())

        comprobante = Comprobante.objects.create(
            nombre_cliente=instance.nombre,
            apellido_cliente=instance.apellido,
            dni_cliente=instance.dni_emisor,
            pedido=instance,
            monto=total_price
        )

        return Response(ComprobanteSerializer(comprobante).data, status=status.HTTP_201_CREATED)

class ListPaqueteView(generics.ListAPIView):
    queryset = Paquete.objects.all()
    serializer_class = PaqueteSerializer
    permission_classes = [IsAuthenticated]
    
class ListComprobanteView(generics.ListAPIView):
    serializer_class = ComprobanteSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        return Comprobante.objects.filter(pedido__cliente=user.cliente)
    
class TablaListCreate(generics.ListCreateAPIView):
    queryset = TablaPrecios.objects.all()
    serializer_class = TablaPreciosSerializer
    permission_classes = [IsManager]
    
    def get_queryset(self):
        if IsManager.has_permission(self, self.request, self):
            return TablaPrecios.objects.all()
        else:
            return None
    
    def perform_create(self, serializer):
        if (serializer.is_valid() and IsManager.has_permission(self, self.request, self)):
            serializer.save()
        else:
            print(serializer.errors)

class TablaUpdateView(generics.UpdateAPIView):
    queryset = TablaPrecios.objects.all()
    serializer_class = TablaPreciosSerializer
    permission_classes = [IsManager]
    lookup_field = 'codigo'
    
    def update(self, request, *args, **kwargs):
        if IsManager.has_permission(self, request, self):
            return super().update(request, *args, **kwargs)
        else:
            return Response({'error': 'You do not have permission to update this table'})