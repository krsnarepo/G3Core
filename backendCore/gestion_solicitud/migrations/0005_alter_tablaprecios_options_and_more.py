# Generated by Django 5.0.6 on 2024-07-18 23:31

import django.core.validators
import django.db.models.deletion
import django.utils.timezone
import gestion_solicitud.services
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gestion_paquete', '0001_initial'),
        ('gestion_solicitud', '0004_alter_pedido_cliente'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='tablaprecios',
            options={'verbose_name_plural': 'Tabla de Precios'},
        ),
        migrations.AddField(
            model_name='comprobante',
            name='num_comprobante',
            field=models.CharField(default=gestion_solicitud.services.generate_unique8, max_length=8, unique=True, validators=[django.core.validators.MinLengthValidator(8), django.core.validators.MaxLengthValidator(8)]),
        ),
        migrations.AddField(
            model_name='paquete',
            name='agencia',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='paquete',
            name='clasificado',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='paquete',
            name='codigo',
            field=models.CharField(default=gestion_solicitud.services.generate_unique8, max_length=8, unique=True, validators=[django.core.validators.MinLengthValidator(8), django.core.validators.MaxLengthValidator(8)]),
        ),
        migrations.AddField(
            model_name='paquete',
            name='distancia',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=4, null=True),
        ),
        migrations.AddField(
            model_name='paquete',
            name='tipo',
            field=models.CharField(default=django.utils.timezone.now, max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='pedido',
            name='doc_control',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='pedidos', to='gestion_paquete.documentocontrol'),
        ),
        migrations.AddField(
            model_name='pedido',
            name='num_pedido',
            field=models.CharField(default=gestion_solicitud.services.generate_unique, max_length=32, unique=True, validators=[django.core.validators.MinLengthValidator(32), django.core.validators.MaxLengthValidator(32)]),
        ),
        migrations.AlterField(
            model_name='tablaprecios',
            name='codigo',
            field=models.CharField(max_length=10, unique=True),
        ),
    ]
