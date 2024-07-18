from django.db import models
from login.models import Cliente
from gestion_solicitud.models import Pedido

# Create your models here.
    
class Movilidad(models.Model):
    estado_movilidad_choices = (("IN USE","En uso"), ("AVAILABLE","Disponible"),("NOT AVAILABLE","No disponible"))
    estado_repartidor_choices = (("IN ROUTE","En ruta"), ("AVAILABLE","Disponible"),("NOT AVAILABLE","No disponible"))
    id_movilidad = models.AutoField(primary_key=True)
    nombre_rep= models.CharField(max_length=30)
    modelo= models.CharField(max_length=20)
    placa= models.CharField(max_length=6)
    estado_movilidad= models.CharField(max_length=20, choices=estado_movilidad_choices, default='AVAILABLE')
    estado_repartidor= models.CharField(max_length=20, choices=estado_repartidor_choices, default='AVAILABLE')
    ruta= models.CharField(max_length=100)
    
    def __str__(self):
        return str(self.id_movilidad + " " + self.nombre_rep + " " + self.ruta)
    
    class Meta:
        verbose_name_plural = 'Movilidades'
    
class Envio(models.Model):
    id_envio = models.AutoField(primary_key=True)
    pedido = models.OneToOneField(Pedido, on_delete=models.CASCADE, related_name='envio')
    movilidad = models.OneToOneField(Movilidad, on_delete=models.CASCADE, related_name='envio')
    def __str__(self):
        return str(self.id_envio)
    
class FormularioEntrega(models.Model):
    estado_envio_choices = (("IN ROUTE","En camino"), ("DELIVERED","Entregado"),("FAILED DELIVERY ATTEMPT","Intento de entrega fallido"))
    id_form_entrega = models.AutoField(primary_key=True)
    envio = models.OneToOneField(Envio, on_delete=models.CASCADE, related_name='form_entrega')
    estado_envio = models.CharField(max_length=30,choices=estado_envio_choices, default='En camino')
    fecha_envio = models.DateTimeField(auto_now_add=True)
    fecha_entrega = models.DateTimeField()
    direccion_entrega = models.CharField(max_length=100)
    
    def __str__(self):
        return str(self.id_form_entrega)
    class Meta:
        verbose_name_plural = 'Formularios de Entrega'
    