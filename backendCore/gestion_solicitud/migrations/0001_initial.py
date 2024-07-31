# Generated by Django 5.0.6 on 2024-06-16 04:27

import django.core.validators
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('login', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Pedido',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=100)),
                ('apellido', models.CharField(max_length=100)),
                ('telefono', models.CharField(max_length=20)),
                ('direccion', models.CharField(max_length=100)),
                ('dni_emisor', models.CharField(max_length=8, validators=[django.core.validators.MinLengthValidator(8), django.core.validators.MaxLengthValidator(8)])),
                ('dni_receptor', models.CharField(max_length=8, validators=[django.core.validators.MinLengthValidator(8), django.core.validators.MaxLengthValidator(8)])),
                ('fecha', models.DateTimeField(auto_now_add=True)),
                ('cliente', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='pedidos', to='login.cliente')),
            ],
        ),
        migrations.CreateModel(
            name='Paquete',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('peso', models.DecimalField(decimal_places=2, max_digits=10)),
                ('largo', models.DecimalField(decimal_places=2, max_digits=10)),
                ('ancho', models.DecimalField(decimal_places=2, max_digits=10)),
                ('altura', models.DecimalField(decimal_places=2, max_digits=10)),
                ('descripcion', models.TextField()),
                ('precio', models.DecimalField(decimal_places=2, max_digits=10)),
                ('pedido', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='paquetes', to='gestion_solicitud.pedido')),
            ],
        ),
    ]