# Generated by Django 5.0.6 on 2024-06-23 00:08

import django.core.validators
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gestion_solicitud', '0002_tablaprecios'),
    ]

    operations = [
        migrations.AddField(
            model_name='pedido',
            name='state',
            field=models.CharField(choices=[('unconfirmed', 'Unconfirmed'), ('confirmed', 'Confirmed'), ('delivered', 'Delivered')], default='unconfirmed', max_length=20),
        ),
        migrations.AlterField(
            model_name='tablaprecios',
            name='agencia1',
            field=models.DecimalField(decimal_places=2, max_digits=10),
        ),
        migrations.AlterField(
            model_name='tablaprecios',
            name='agencia2',
            field=models.DecimalField(decimal_places=2, max_digits=10),
        ),
        migrations.AlterField(
            model_name='tablaprecios',
            name='agencia3',
            field=models.DecimalField(decimal_places=2, max_digits=10),
        ),
        migrations.AlterField(
            model_name='tablaprecios',
            name='agencia4',
            field=models.DecimalField(decimal_places=2, max_digits=10),
        ),
        migrations.AlterField(
            model_name='tablaprecios',
            name='distancia',
            field=models.DecimalField(decimal_places=2, max_digits=10),
        ),
        migrations.AlterField(
            model_name='tablaprecios',
            name='precio',
            field=models.DecimalField(decimal_places=2, max_digits=10),
        ),
        migrations.CreateModel(
            name='Comprobante',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre_cliente', models.CharField(max_length=100)),
                ('apellido_cliente', models.CharField(max_length=100)),
                ('dni_cliente', models.CharField(max_length=8, validators=[django.core.validators.MinLengthValidator(8), django.core.validators.MaxLengthValidator(8)])),
                ('fecha', models.DateTimeField(auto_now_add=True)),
                ('monto', models.DecimalField(decimal_places=2, max_digits=10)),
                ('pedido', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='comprobante', to='gestion_solicitud.pedido')),
            ],
        ),
    ]