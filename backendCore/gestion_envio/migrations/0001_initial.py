# Generated by Django 5.0.6 on 2024-07-18 23:31

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('gestion_solicitud', '0005_alter_tablaprecios_options_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Movilidad',
            fields=[
                ('id_movilidad', models.AutoField(primary_key=True, serialize=False)),
                ('nombre_rep', models.CharField(max_length=30)),
                ('modelo', models.CharField(max_length=20)),
                ('placa', models.CharField(max_length=6)),
                ('estado_movilidad', models.CharField(choices=[('IN USE', 'En uso'), ('AVAILABLE', 'Disponible'), ('NOT AVAILABLE', 'No disponible')], default='AVAILABLE', max_length=20)),
                ('estado_repartidor', models.CharField(choices=[('IN ROUTE', 'En ruta'), ('AVAILABLE', 'Disponible'), ('NOT AVAILABLE', 'No disponible')], default='AVAILABLE', max_length=20)),
                ('ruta', models.CharField(max_length=100)),
            ],
            options={
                'verbose_name_plural': 'Movilidades',
            },
        ),
        migrations.CreateModel(
            name='Envio',
            fields=[
                ('id_envio', models.AutoField(primary_key=True, serialize=False)),
                ('pedido', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='envio', to='gestion_solicitud.pedido')),
                ('movilidad', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='envio', to='gestion_envio.movilidad')),
            ],
        ),
        migrations.CreateModel(
            name='FormularioEntrega',
            fields=[
                ('id_form_entrega', models.AutoField(primary_key=True, serialize=False)),
                ('estado_envio', models.CharField(choices=[('IN ROUTE', 'En camino'), ('DELIVERED', 'Entregado'), ('FAILED DELIVERY ATTEMPT', 'Intento de entrega fallido')], default='En camino', max_length=30)),
                ('fecha_envio', models.DateTimeField(auto_now_add=True)),
                ('fecha_entrega', models.DateTimeField()),
                ('direccion_entrega', models.CharField(max_length=100)),
                ('envio', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='form_entrega', to='gestion_envio.envio')),
            ],
            options={
                'verbose_name_plural': 'Formularios de Entrega',
            },
        ),
    ]