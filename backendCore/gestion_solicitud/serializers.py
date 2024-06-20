from django.contrib.auth.models import User
from rest_framework import serializers
from .models import *

class PaqueteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Paquete
        fields = '__all__'
        extra_kwargs = {"pedido": {"required": False}}
    # def create(self, validated_data):
    #     return super().create(**validated_data)

class PedidoSerializer(serializers.ModelSerializer):
    paquetes = PaqueteSerializer(many=True)
    class Meta:
        model = Pedido
        fields = '__all__'
        extra_kwargs = {"cliente": {"read_only": True}}
    
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
        