from rest_framework import generics, status
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated, AllowAny

from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework import serializers

from .models import Cliente, Worker
from .serializers import UserSerializer, ClienteSerializer, WorkerSerializer

# Create your views here.

class ListUserView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    
# class DeleteUserView(generics.DestroyAPIView):
#     queryset = User.objects.all()
#     permission_classes = [AllowAny]
    
#     def delete(self, request, *args, **kwargs):
#         self.queryset.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    
    # def post(self, request, *args, **kwargs):
    #     # Obtener datos de la solicitud
    #     data = request.data.copy()

    #     # Determinar el username (por ejemplo, utilizando el email)
    #     email = data.get('email')
    #     username = email.split('@')[0]  # Si no se proporciona username, usar parte del email

    #     # Añadir username a los datos
    #     data['username'] = username
        
    #     print(data)

    #     # Crear el serializador con los datos modificados
    #     serializer = self.get_serializer(data=data)
    #     serializer.is_valid(raise_exception=True)
    #     self.perform_create(serializer)
        
    #     # Retornar respuesta
    #     return Response(serializer.data, status=status.HTTP_201_CREATED)
    
class DeleteUserView(generics.DestroyAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return super().get_queryset().filter(id=self.request.user.id)

    def get_object(self):
        return self.request.user

class WorkerTypeView(generics.RetrieveAPIView):
    serializer_class = WorkerSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        user = self.request.user
        return Worker.objects.get(user=user)

class CreateClienteView(generics.ListCreateAPIView):
    #queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Cliente.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        if (serializer.is_valid()):
            serializer.save(user=self.request.user)
        else:
            print(serializer.errors)