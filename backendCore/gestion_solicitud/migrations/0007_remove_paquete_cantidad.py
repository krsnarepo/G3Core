# Generated by Django 5.0.6 on 2024-07-19 05:56

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('gestion_solicitud', '0006_paquete_cantidad'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='paquete',
            name='cantidad',
        ),
    ]
