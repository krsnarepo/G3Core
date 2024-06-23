from django.shortcuts import get_object_or_404
from rest_framework import generics
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
    #queryset = Pedido.objects.all()
    serializer_class = PedidoSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        if user.worker.worker_type.name == 'Recepcionista':
            return Pedido.objects.all()
        return Pedido.objects.filter(cliente=user.cliente)
    
    @transaction.atomic
    def perform_create(self, serializer):
        if (serializer.is_valid()):
            pedido = serializer.save(cliente=self.request.user.cliente, state='unconfirmed')
            total_price = 0
            list_price = []
            for paquete in pedido.paquetes.all():
                paquete.calculate_price()
                list_price.append(paquete.precio)
                total_price += paquete.precio
            
            return Response({
                'message': 'Pedido created',
                'total_price': total_price,
                'list_price': list_price
            })
            # Comprobante.objects.create(
            #     nombre_cliente=pedido.nombre,
            #     apellido_cliente=pedido.apellido,
            #     dni_cliente=pedido.dni_emisor,
            #     pedido=pedido,
            #     monto=total_price
            # )
        else:
            print(serializer.errors)
            
class ConfirmPedidoView(generics.UpdateAPIView):
    queryset = Pedido.objects.filter(state = 'unconfirmed')
    serializer_class = PedidoSerializer
    permission_classes = [IsAuthenticated]
    
    @transaction.atomic
    def update(self, request, *args, **kwargs):
        if external_payment_service(self.get_object()):
            instance = self.get_object() # This shit should work with only one order and no more
            if instance.state != 'unconfirmed':
                return Response({'error': 'Order already confirmed'})
            
            instance.state = 'confirmed'
            instance.save()
            
            total_price = 0
            
            for paquete in instance.paquetes.all():
                total_price += paquete.precio
            
            Comprobante.objects.create(
                nombre_cliente=instance.nombre,
                apellido_cliente=instance.apellido,
                dni_cliente=instance.dni_emisor,
                pedido=instance,
                monto=total_price
            )
            return Response({'message': 'Order confirmed and receipt generated'})
        else:
            return Response({'message': 'Payment incompleted'})

class ConfirmarPedido(APIView):
    permission_classes = [IsAuthenticated]

    @transaction.atomic
    def put(self, request, pk):
        user = request.user
        pedido = get_object_or_404(Pedido, pk=pk, cliente=user.cliente, estado='provisional')

        total_price = 0
        for paquete in pedido.paquetes.all():
            total_price += paquete.precio

        pedido.estado = 'confirmado'
        pedido.save()

        Comprobante.objects.create(
            nombre_cliente=pedido.nombre,
            apellido_cliente=pedido.apellido,
            dni_cliente=pedido.dni_emisor,
            pedido=pedido,
            monto=total_price
        )

        return Response({'message': 'Pedido confirmado y comprobante generado'})

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
    permission_classes = [IsAuthenticated]
    
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
