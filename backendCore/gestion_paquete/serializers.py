from rest_framework import serializers
from gestion_solicitud.models import Paquete, Pedido
from .models import DocumentoControl
from gestion_solicitud.serializers import PedidoSerializer

class PaqueteUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Paquete
        fields = ['distancia', 'agencia']

# class FormularioEnvioSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = FormularioEnvio
#         fields = '__all__'
#         extra_kwargs = {"documento": {"required": False}}
class CustomPedidoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pedido
        exclude = ['doc_control']

class DocumentoControlSerializer(serializers.ModelSerializer):
    #pedidos = CustomPedidoSerializer(many=True)
    pedidos = PedidoSerializer(many=True)

    class Meta:
        model = DocumentoControl
        fields = ['fecha_emision', 'numero_documento', 'pedidos']

    def create(self, validated_data):
        print(validated_data)
        pedidos_data = validated_data.pop('pedidos')
        documento = DocumentoControl.objects.create(**validated_data)
        for pedido_data in pedidos_data:
            pedido = Pedido.objects.get(id=pedido_data['id'])
            pedido.doc_control = documento
            pedido.save()
        return documento
    
    def update(self, instance, validated_data):
        pedidos_data = validated_data.pop('pedidos')
        instance.some_field = validated_data.get('some_field', instance.some_field)
        # Update any other fields as necessary
        instance.save()

        # Update orders
        for pedido_data in pedidos_data:
            pedido = Pedido.objects.get(id=pedido_data['id'])
            pedido.doc_control = instance
            pedido.save()
        return instance


