from rest_framework import serializers
from .models import *

class MovilidadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movilidad
        fields = '__all__'

class EnvioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Envio
        fields = '__all__'
        
class FormularioEntregaSerializer(serializers.ModelSerializer):
    class Meta:
        model = FormularioEntrega
        fields = '__all__'
        
    def create(self, validated_data):
        return super().create(validated_data)
        
    def update(self, instance, validated_data):
        instance.some_field = validated_data.get('some_field', instance.some_field)
        # Update any other fields as necessary
        instance.save()
        return instance
