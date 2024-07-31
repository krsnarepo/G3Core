# Generated by Django 5.0.6 on 2024-07-26 22:42

from django.db import migrations

def create_worker_types(apps, schema_editor):
    WorkerType = apps.get_model('login', 'WorkerType')
    worker_types = [
        ('warehouse', 'Trabajador de Almacen'),
        ('delivery', 'Repartidor'),
        ('client', 'Cliente'),
        ('manager', 'Jefe de Logistica'),
        ('receptionist', 'Recepcionista')
    ]
    for name, display_name in worker_types:
        WorkerType.objects.create(name=name)
    

class Migration(migrations.Migration):

    dependencies = [
        ('login', '0002_alter_workertype_name'),
    ]

    operations = [
        migrations.RunPython(create_worker_types),
    ]