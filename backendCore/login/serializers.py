from django.contrib.auth.models import User
from rest_framework import serializers
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username', 'password']
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        #validated_data['username'] = validated_data['email']
        print(validated_data)
        user = User.objects.create_user(**validated_data)
        return user
    
class WorkerTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkerType
        fields = ['name']

class WorkerSerializer(serializers.ModelSerializer):
    worker_type = WorkerTypeSerializer()
    
    class Meta:
        model = Worker
        fields = ['worker_type']

class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = '__all__'
        extra_kwargs = {"user": {"read_only": True}}
        
    def create(self, validated_data):
        cliente = Cliente.objects.create(**validated_data)
        return cliente
    
    def update(self, instance, validated_data):
        instance.nombre = validated_data.get('nombre', instance.nombre)
        instance.apellido = validated_data.get('apellido', instance.apellido)
        instance.telefono = validated_data.get('telefono', instance.telefono)
        instance.save()
        return instance