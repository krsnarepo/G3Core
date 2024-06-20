from django.db import models
from django.core.validators import MinLengthValidator, MaxLengthValidator
from login.models import Cliente

# Create your models here.

class Pedido(models.Model):
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    #email = models.EmailField()
    telefono = models.CharField(max_length=20)
    direccion = models.CharField(max_length=100)
    dni_emisor = models.CharField(max_length=8,validators=[MinLengthValidator(8), MaxLengthValidator(8)])
    dni_receptor = models.CharField(max_length=8,validators=[MinLengthValidator(8), MaxLengthValidator(8)])
    fecha = models.DateTimeField(auto_now_add=True)
    cliente = models.OneToOneField(Cliente, on_delete=models.CASCADE, related_name='pedidos')
    
    def __str__(self):
        return self.nombre


# class Solicitud(models.Model):
#     cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)
#     Pedido = models.ForeignKey(Pedido, on_delete=models.CASCADE)
#     fecha = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return self.cliente.nombre

class Paquete(models.Model):
    peso = models.DecimalField(max_digits=10, decimal_places=2)
    largo = models.DecimalField(max_digits=10, decimal_places=2)
    ancho = models.DecimalField(max_digits=10, decimal_places=2)
    altura = models.DecimalField(max_digits=10, decimal_places=2)
    descripcion = models.TextField()
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    pedido = models.ForeignKey(Pedido, on_delete=models.CASCADE, related_name='paquetes')
    def __str__(self):
        return self.peso
    
# class TablaPrecios(models.Model):
#     peso = models.DecimalField(max_digits=10, decimal_places=2)
#     precio = models.DecimalField(max_digits=10, decimal_places=2)
#     def __str__(self):
#         return self.peso
    
# class Comprobante(models.Model):
#     fecha = models.DateTimeField(auto_now_add=True)
#     monto = models.DecimalField(max_digits=10, decimal_places=2)
#     pedido = models.OneToOneField(Pedido, on_delete=models.CASCADE, related_name='comprobante')
#     def __str__(self):
#         return self.monto