# En views.py
from django.shortcuts import get_object_or_404
from gestion_solicitud.models import Paquete, Pedido
from gestion_solicitud.serializers import PedidoSerializer, PaqueteSerializer
from .models import DocumentoControl
from rest_framework.response import Response
from rest_framework import generics, status
from .serializers import DocumentoControlSerializer, PaqueteUpdateSerializer

from login.permissions import IsWarehouseWorker

class ValidarView(generics.GenericAPIView):
    serializer_class = PedidoSerializer
    permission_classes = [IsWarehouseWorker]

    def post(self, request, *args, **kwargs):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
            print(self.request.session.session_key + " created")
        else:
            print(self.request.session.session_key + " exists")
        codigo_paquete = self.request.data.get('codigo_paquete')
        #print(self.request.session['formularios'])
        
        if not codigo_paquete:
            return Response({"mensaje": "Código de paquete es requerido"}, status=status.HTTP_400_BAD_REQUEST)
        
        paquete = get_object_or_404(Paquete, codigo=codigo_paquete)
        formulario = paquete.pedido
                       
        if not formulario:
            return Response({"mensaje": "Paquete no asociado a un formulario"}, status=status.HTTP_400_BAD_REQUEST)

        if self.is_package_validated(request, paquete.codigo):
            return Response({"mensaje": "Paquete ya ha sido validado"}, status=status.HTTP_400_BAD_REQUEST)
        
        # Validate order state as "confirmed"
        if formulario.state == "confirmed" and not formulario.doc_control:
            self.add_package_to_session(request, paquete.codigo)
            self.add_order_to_session(request, formulario.num_pedido)
            return Response({"mensaje": "Validación exitosa",
                             "formulario": PedidoSerializer(formulario).data}, status=status.HTTP_200_OK)
        else:
            # remove recently added package from session
            self.delete_package_from_session(request, paquete.codigo)
            return Response({"mensaje": "Validación fallida, formulario no confirmado o ya ha sido procesado a doc_control"}, status=status.HTTP_400_BAD_REQUEST)
            
    def is_package_validated(self, request, codigo_paquete):
        return codigo_paquete in self.request.session.get('paquete', [])
    
    def add_package_to_session(self, request, codigo_paquete):
        if 'paquete' not in self.request.session:
            self.request.session['paquete'] = []
        if codigo_paquete not in request.session['paquete']:
            self.request.session['paquete'].append(codigo_paquete)
            self.request.session.modified = True
            
    def add_order_to_session(self, request, formulario_num_pedido):
        if 'formularios' not in request.session:
            request.session['formularios'] = []
        if formulario_num_pedido not in request.session['formularios']:
            request.session['formularios'].append(formulario_num_pedido)
            request.session.modified = True
            
    def delete_package_from_session(self, request, codigo_paquete):
        if 'paquete' in request.session:
            if codigo_paquete in request.session['paquete']:
                request.session['paquete'].remove(codigo_paquete)
                request.session.modified = True
            else:
                print("Paquete no encontrado en la sesión")
        else:
            print("No hay paquetes en la sesión")

class ClassifiedPaqueteGetView(generics.ListAPIView):
    serializer_class = PaqueteSerializer
    permission_classes = [IsWarehouseWorker]
    
    def get_queryset(self):
        print(self.request.session.keys())
        print(self.request.session.session_key)
        paquete_codigo = self.request.session.get('paquete', [])
        return Paquete.objects.filter(codigo__in=paquete_codigo, clasificado=False)

class PaqueteUpdateView(generics.UpdateAPIView):
    queryset = Paquete.objects.all()
    serializer_class = PaqueteUpdateSerializer
    lookup_field = 'codigo'
    permission_classes = [IsWarehouseWorker]
    
    def update(self, request, *args, **kwargs):
        # self.delete_package_from_session(request, kwargs['codigo'])
        print(request.session['paquete'])
        print(request.session['formularios'])
        package = self.get_object()
        # package.distancia = request.data.get('distancia')
        # package.agencia = request.data.get('agencia')
        if package.codigo in request.session.get('paquete', []):
            package.clasificado = True
            serializer = self.get_serializer(package, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            self.perform_update(serializer)
            print("Paquete validado")
            return super().update(request, *args, **kwargs)
        else:
            print("Paquete no validado")
            return Response({'message': 'Paquete no validado'}, status=status.HTTP_400_BAD_REQUEST)
        
    def delete_package_from_session(self, request, codigo_paquete):
        if 'paquete' in request.session:
            if codigo_paquete in request.session['paquete']:
                request.session['paquete'].remove(codigo_paquete)
                request.session.modified = True
    
class DocumentoControlCreateView(generics.CreateAPIView):
    serializer_class = DocumentoControlSerializer
    permission_classes = [IsWarehouseWorker]
    def create(self, request, *args, **kwargs):
        # Verificar si disparar la creación del documento de control
        # en la interfaz de validar o en la de generar documento
        if 'formularios' in request.session:
            formularios_num_pedido = request.session['formularios']
            formularios = Pedido.objects.filter(num_pedido__in=formularios_num_pedido)
            
            if not formularios:
                self.clean_session(request)
                return Response({"mensaje": f"No se encontraron formularios con ${formularios_num_pedido}"}, status=status.HTTP_400_BAD_REQUEST)

            doc_control = DocumentoControl.objects.create()
            doc_control.save()
            
            for formulario in formularios:
                formulario.doc_control = doc_control
                formulario.save()

            # Limpiar la sesión
            self.clean_session(request)

            return Response(DocumentoControlSerializer(doc_control).data, status=status.HTTP_201_CREATED)
        return Response({"mensaje": "No hay formularios acumulados"}, status=status.HTTP_400_BAD_REQUEST)
    
    def clean_session(self, request):
        del request.session['formularios']
        request.session.modified = True
        del request.session['paquete']
        request.session.modified = True

class DocumentoControlUpdateView(generics.UpdateAPIView):
    serializer_class = DocumentoControlSerializer
    queryset = DocumentoControl.objects.all()
    lookup_field = 'numero_documento'
    permission_classes = [IsWarehouseWorker]
    
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        pedidos_ids = request.data.get('pedidos',[])
        # pedidos_data = request.data.get('pedidos',[]) # Optimize this gay ass shit, the request should be a list of ids
        # pedidos_ids = [pedido.get('num_pedido') for pedido in pedidos_data if 'num_pedido' in pedido]
        
        if not pedidos_ids:
            return Response({"mensaje": "Se requieren IDs de pedidos"}, status=status.HTTP_400_BAD_REQUEST)
        
        pedidos = Pedido.objects.filter(num_pedido__in=pedidos_ids)
        
        if len(pedidos) != len(pedidos_ids):
            return Response({"mensaje": "Uno o más IDs de pedidos no son válidos"}, status=status.HTTP_400_BAD_REQUEST)

        instance.pedidos.set(pedidos)
        instance.save()

        return Response(DocumentoControlSerializer(instance).data, status=status.HTTP_200_OK)

class DocumentoControlListView(generics.ListAPIView):
    queryset = DocumentoControl.objects.all()
    serializer_class = DocumentoControlSerializer
    permission_classes = [IsWarehouseWorker]
