from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from login.permissions import IsReceptionist

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
    
    def perform_create(self, serializer):
        if (serializer.is_valid()):
            serializer.save(cliente=self.request.user.cliente)
        else:
            print(serializer.errors)
            
class ListPaqueteView(generics.ListAPIView):
    queryset = Paquete.objects.all()
    serializer_class = PaqueteSerializer
    permission_classes = [IsAuthenticated]