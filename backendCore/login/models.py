from django.db import models
from django.contrib.auth.models import User

# Create your models here.

# User._meta.get_field('email')._unique = True
# User._meta.get_field('email').blank = False
# User._meta.get_field('email').null = False

# User._meta.get_field('username').blank = True

class Cliente(models.Model):
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    telefono = models.CharField(max_length=9)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='cliente')

    def __str__(self):
        return self.nombre
    
class WorkerType(models.Model):
    name = models.CharField(max_length=100)
    
    def __str__(self):
        return self.name

class Worker(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='worker')
    worker_type = models.ForeignKey(WorkerType, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.user.username