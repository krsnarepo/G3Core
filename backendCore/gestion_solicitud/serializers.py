from django.contrib.auth.models import User
from rest_framework import serializers
from .models import *

class PaqueteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Paquete
        fields = ['peso', 'largo', 'ancho', 'altura', 'descripcion', 'precio', 'codigo','pedido', 'tipo']
        extra_kwargs = {"pedido": {"required": False}, 'codigo': {'read_only': True}}
    # def create(self, validated_data):
    #     return super().create(**validated_data)

class PedidoSerializer(serializers.ModelSerializer):
    paquetes = PaqueteSerializer(many=True)
    class Meta:
        model = Pedido
        exclude = ['doc_control']
        extra_kwargs = {"cliente": {"read_only": True}, "doc_control": {"required": False, "write_only": True}, "state": {"read_only": True}}
    
    def validate_paquetes(self, value):
        if not value:
            raise serializers.ValidationError("Debe agregar al menos un paquete")
        return value
        
    def create(self, validated_data):
        paquetes_data = validated_data.pop('paquetes')
        if not paquetes_data:
            raise serializers.ValidationError("Debe agregar al menos un paquete")
        pedido = Pedido.objects.create(**validated_data)
        for paquete_data in paquetes_data:
            Paquete.objects.create(pedido=pedido, **paquete_data)
        return pedido

class ComprobanteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comprobante
        fields = '__all__'


class TablaPreciosSerializer(serializers.ModelSerializer):
    class Meta:
        model = TablaPrecios
        exclude = ['id']

    def create(self, validated_data):
        return super().create(validated_data)