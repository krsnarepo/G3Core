from django.db import models
from django.core.validators import MinLengthValidator, MaxLengthValidator
from login.models import Cliente

# Create your models here.

class Pedido(models.Model):
    order_state = [('unconfirmed', 'Unconfirmed'), ('confirmed', 'Confirmed'), ('delivered', 'Delivered')]
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    #email = models.EmailField()
    telefono = models.CharField(max_length=20)
    direccion = models.CharField(max_length=100)
    dni_emisor = models.CharField(max_length=8,validators=[MinLengthValidator(8), MaxLengthValidator(8)])
    dni_receptor = models.CharField(max_length=8,validators=[MinLengthValidator(8), MaxLengthValidator(8)])
    fecha = models.DateTimeField(auto_now_add=True)
    state = models.CharField(max_length=20, choices=order_state, default='unconfirmed')
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE, related_name='pedidos')
    
    def __str__(self):
        return str(self.pk) + " " + self.nombre
    
    def confirm_state(self):
        self.state = 'confirmed'
        self.save()


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
        return str(self.pk) + " " + self.peso
    
    def calculate_price(self):
        try:
            price_entry = TablaPrecios.objects.get(peso=self.peso)
            self.precio = price_entry.precio
            self.save()
        except TablaPrecios.DoesNotExist:
            raise ValueError("No price available for this package")
    
class TablaPrecios(models.Model):
    codigo = models.CharField(max_length=10)
    tipo_paquete = models.CharField(max_length=20)
    peso = models.DecimalField(max_digits=6, decimal_places=2)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    distancia = models.DecimalField(max_digits=10, decimal_places=2)
    agencia1 = models.DecimalField(max_digits=10, decimal_places=2)
    agencia2 = models.DecimalField(max_digits=10, decimal_places=2)
    agencia3 = models.DecimalField(max_digits=10, decimal_places=2)
    agencia4 = models.DecimalField(max_digits=10, decimal_places=2)
    def __str__(self):
        return self.codigo
    
class Comprobante(models.Model):
    nombre_cliente = models.CharField(max_length=100)
    apellido_cliente = models.CharField(max_length=100)
    dni_cliente = models.CharField(max_length=8,validators=[MinLengthValidator(8), MaxLengthValidator(8)])
    fecha = models.DateTimeField(auto_now_add=True)
    monto = models.DecimalField(max_digits=10, decimal_places=2)
    pedido = models.OneToOneField(Pedido, on_delete=models.CASCADE, related_name='comprobante')
    def __str__(self):
        return self.nombre_cliente + " " + self.apellido_cliente
        
    # def update_totalprice(self, pedido):
    #     totalprice = 0
    #     for paquete in pedido.paquetes:
    #         totalprice += self.calculate_price(pedido, paquete)
    #     return totalprice