from django.db import IntegrityError, models, transaction
from django.core.validators import MinLengthValidator, MaxLengthValidator
from login.models import Cliente
from gestion_paquete.models import DocumentoControl, generate_unique, generate_unique8

# Create your models here.

class Pedido(models.Model):
    order_state = [('unconfirmed', 'Unconfirmed'), ('confirmed', 'Confirmed'), ('delivered', 'Delivered')]
    num_pedido = models.CharField(max_length=32, validators=[MinLengthValidator(32), MaxLengthValidator(32)],default=generate_unique, unique=True)
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
    doc_control = models.ForeignKey(DocumentoControl, on_delete=models.CASCADE, related_name='pedidos', null=True, blank=True)
    
    def __str__(self):
        return str(self.pk) + " " + self.nombre + " " + self.num_pedido
    
    def confirm_state(self):
        self.state = 'confirmed'
        self.save()
        
    def save(self, *args, **kwargs):
        if not self.num_pedido:
            for _ in range(10):
                try:
                    self.num_pedido = generate_unique()
                    with transaction.atomic():
                        super().save(*args, **kwargs)
                    break
                except IntegrityError:
                    continue
            else:
                raise ValueError("Failed to generate a unique code after several attempts.")
        else:
            super().save(*args, **kwargs)
        

class Paquete(models.Model):
    peso = models.DecimalField(max_digits=10, decimal_places=2)
    largo = models.DecimalField(max_digits=10, decimal_places=2)
    ancho = models.DecimalField(max_digits=10, decimal_places=2)
    altura = models.DecimalField(max_digits=10, decimal_places=2)
    descripcion = models.TextField()
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    pedido = models.ForeignKey(Pedido, on_delete=models.CASCADE, related_name='paquetes')
    codigo = models.CharField(max_length=8, validators=[MinLengthValidator(8), MaxLengthValidator(8)], default=generate_unique8, unique=True)
    tipo = models.CharField(max_length=100)
     # Nuevos campos agregados para la clasificación
    distancia = models.DecimalField(max_digits=4, decimal_places=2, null=True, blank=True)
    agencia = models.CharField(max_length=100, null=True, blank=True)
    clasificado = models.BooleanField(default=False)

    def __str__(self):
        return "codigo: " + self.codigo + " peso: " + str(self.peso) + " " + self.pedido.num_pedido
    
    def calculate_price(self):
        try:
            price_entry = TablaPrecios.objects.get(tipo_paquete=self.tipo)
            self.precio = price_entry.precio
            self.save()
        except TablaPrecios.DoesNotExist:
            raise ValueError("No price available for this package")
    
    def save(self, *args, **kwargs):
        if not self.codigo or self.codigo == '':
        # Attempt to generate a unique code with a limited number of retries
            for _ in range(10):  # Limit the number of retries to prevent infinite loops
                try:
                    self.codigo = generate_unique8()
                    with transaction.atomic():
                        # Attempt to save the object, relying on the database's unique constraint
                        super().save(*args, **kwargs)
                    break  # Exit the loop if save was successful
                except IntegrityError:
                    # If an IntegrityError is raised, it means the code was not unique
                    continue
            else:
                # Handle the case where a unique code could not be generated after several attempts
                raise ValueError("Failed to generate a unique code after several attempts.")
        else:
            super().save(*args, **kwargs)
    
class TablaPrecios(models.Model):
    codigo = models.CharField(max_length=10, unique=True)
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
    class Meta:
        verbose_name_plural = 'Tabla de Precios'
    
class Comprobante(models.Model):
    num_comprobante = models.CharField(max_length=8, validators=[MinLengthValidator(8), MaxLengthValidator(8)], default=generate_unique8, unique=True)
    nombre_cliente = models.CharField(max_length=100)
    apellido_cliente = models.CharField(max_length=100)
    dni_cliente = models.CharField(max_length=8,validators=[MinLengthValidator(8), MaxLengthValidator(8)])
    fecha = models.DateTimeField(auto_now_add=True)
    monto = models.DecimalField(max_digits=10, decimal_places=2)
    pedido = models.OneToOneField(Pedido, on_delete=models.CASCADE, related_name='comprobante')
    def __str__(self):
        return self.nombre_cliente + " " + self.apellido_cliente
        