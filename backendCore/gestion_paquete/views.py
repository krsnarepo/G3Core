# En views.py
from django.http import HttpResponse
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

        codigo_paquete = request.data.get('codigo_paquete')
        
        if not codigo_paquete:
            print("Código de paquete es requerido")
            return Response({"mensaje": "Código de paquete es requerido"}, status=status.HTTP_400_BAD_REQUEST)
        
        paquete = get_object_or_404(Paquete, codigo=codigo_paquete)
        formulario = paquete.pedido
                       
        if not formulario:
            print("Paquete no asociado a un formulario")
            return Response({"mensaje": "Paquete no asociado a un formulario"}, status=status.HTTP_400_BAD_REQUEST)

        if paquete.validado:
            print("Paquete ya ha sido validado")
            return Response({"mensaje": "Paquete ya ha sido validado"}, status=status.HTTP_400_BAD_REQUEST)
        
        paquete.validado = True
        paquete.save()

        # Validate order state as "confirmed"
        if formulario.state == "confirmed" and not formulario.doc_control:
            # self.add_order_to_session(request, formulario.id)
            # print(request.session['paquete'])
            return Response(PaqueteSerializer(paquete).data, status=status.HTTP_200_OK)
        
        return Response({
            "mensaje": "Validación fallida, pedido no confirmado o ya ha sido procesado a doc_control"
            }, status=status.HTTP_400_BAD_REQUEST)
            
    # def is_package_validated(self, request, codigo_paquete):
    #     return codigo_paquete in request.session.get('paquete', [])
    
    # def add_package_to_session(self, request, codigo_paquete):
    #     if 'paquete' not in request.session:
    #         request.session['paquete'] = []
    #         request.session.modified = True
    #     if codigo_paquete not in request.session['paquete']:
    #         request.session['paquete'].append(codigo_paquete)
    #         request.session.modified = True
            
    # def add_order_to_session(self, request, formulario_id):
    #     if 'formularios' not in request.session:
    #         request.session['formularios'] = []
    #         request.session.modified = True
    #     if formulario_id not in request.session['formularios']:
    #         request.session['formularios'].append(formulario_id)
    #         request.session.modified = True

class UnclassifiedPaqueteGetView(generics.ListAPIView):
    serializer_class = PaqueteSerializer
    permission_classes = [IsWarehouseWorker]
    
    def get_queryset(self):
        # print("Session data:", dict(self.request.session))
        # paquete_codigo = self.request.session.get('paquete', [])
        # print("Paquete códigos:", paquete_codigo)
        queryset = Paquete.objects.filter(validado = True, clasificado=False)
        print("Queryset:", queryset)
        return queryset
    
class PaqueteUpdateView(generics.UpdateAPIView):
    queryset = Paquete.objects.all()
    serializer_class = PaqueteUpdateSerializer
    lookup_field = 'codigo'
    permission_classes = [IsWarehouseWorker]
    
    def update(self, request, *args, **kwargs):
        # self.delete_package_from_session(request, kwargs['codigo'])
        # print(request.session['paquete'])
        package = self.get_object()
        if package.validado:
            package.clasificado = True
            # package.distancia = request.data.get('distancia')
            # package.agencia = request.data.get('agencia')
            return super().update(request, *args, **kwargs)
        else:
            print("Paquete no validado")
            return Response({'message': 'Paquete no validado'}, status=status.HTTP_403_FORBIDDEN)
        
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
        
        formularios = Pedido.objects.filter(state = "confirmed", doc_control=None)
        
        if formularios.count() > 0:
            doc_control = DocumentoControl.objects.create()
            doc_control.save()
            
            for formulario in formularios:
                formulario.doc_control = doc_control
                formulario.save()
            
            return Response(DocumentoControlSerializer(doc_control).data, status=status.HTTP_201_CREATED)
        
        # if 'formularios' in request.session:
        #     formularios_ids = request.session['formularios']
        #     formularios = Pedido.objects.filter(id__in=formularios_ids)

        #     doc_control = DocumentoControl.objects.create()
        #     doc_control.save()
            
        #     for formulario in formularios:
        #         formulario.doc_control = doc_control
        #         formulario.save()

        #     # Limpiar la sesión
        #     del request.session['formularios']
        #     request.session.modified = True
            
        #     del request.session['paquete']
        #     request.session.modified = True

            # return Response(DocumentoControlSerializer(doc_control).data, status=status.HTTP_201_CREATED)
        return Response({"mensaje": "No hay formularios acumulados"}, status=status.HTTP_400_BAD_REQUEST)

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
    serializer_class = DocumentoControlSerializer
    permission_classes = [IsWarehouseWorker]

    def get_queryset(self):
        codigo_documento = self.request.query_params.get('codigo_documento')
        if codigo_documento:
            queryset = DocumentoControl.objects.filter(codigo=codigo_documento)
        else:
            queryset = DocumentoControl.objects.all()
        return queryset

class DocumentoControlRetrieveView(generics.RetrieveAPIView):
    queryset = DocumentoControl.objects.filter( )
    serializer_class = DocumentoControlSerializer
    lookup_field = 'numero_documento'
    permission_classes = [IsWarehouseWorker]

    def get(self, request, *args, **kwargs):
        # Llama al método de la vista base para obtener el objeto
        doc_control = self.get_object()
        # Verifica si el documento de control tiene pedidos asociados
        if doc_control.pedidos.count() > 0:
            return super().get(request, *args, **kwargs)
        
        return Response({"mensaje": "Documento de control sin pedidos asociados"}, status=status.HTTP_400_BAD_REQUEST)
        
    

# def clasificar_paquetes_view(request):
#     paquetes_sin_clasificar = Paquete.objects.filter(clasificado=False)

#     if request.method == 'POST':
#         form = ClasificarPaqueteForm(request.POST)
#         if form.is_valid():
#             paquete_id = form.cleaned_data['paquete_id']
#             distancia = form.cleaned_data['distancia']
#             agencia = form.cleaned_data['agencia']

#             try:
#                 paquete = Paquete.objects.get(id=paquete_id)
#                 paquete.distancia = distancia
#                 paquete.agencia = agencia
#                 paquete.clasificado = True
#                 paquete.save()

#                 # Generar resumen de clasificación
#                 paquetes_clasificados = Paquete.objects.filter(clasificado=True)

#                 context = {
#                     'paquetes_clasificados': paquetes_clasificados,
#                     # Otros datos para el contexto de tu plantilla de resumen
#                 }
#                 return Response(context)

#             except Paquete.DoesNotExist:
#                 return Response({'error': 'Paquete no encontrado'}, status=status.HTTP_404_NOT_FOUND)

#     else:
#         form = ClasificarPaqueteForm()

#     context = {
#         'form': form,
#         'paquetes_sin_clasificar': paquetes_sin_clasificar,
#     }
#     return render(request, 'clasificar_paquetes.html', context)

# def actualizar_documento_control_view(request):
#     documentos = DocumentoControl.objects.all()

#     if request.method == 'POST':
#         # Obtener el ID del documento de control a actualizar desde el formulario POST
#         documento_id = request.POST.get('documento_id')
#         documento = get_object_or_404(DocumentoControl, pk=documento_id)

#         try:
#             # Obtener datos actualizados del formulario
#             nueva_fecha_emision = request.POST.get('fecha_emision')
#             numero_documento = request.POST.get('numero_documento')
#             formularios_envio_ids = request.POST.getlist('formularios_envio')

#             # Validar que todos los campos requeridos estén presentes
#             if not nueva_fecha_emision or not numero_documento or not formularios_envio_ids:
#                 error_message = 'Todos los campos son requeridos.'
#                 context = {
#                     'documentos': documentos,
#                     'error_message': error_message,
#                 }
#                 return render(request, 'actualizar_documento_control.html', context)

#             # Actualizar los datos del documento de control
#             documento.fecha_emision = nueva_fecha_emision
#             documento.numero_documento = numero_documento

#             # Limpiar y establecer los nuevos formularios de envío asociados
#             documento.formularios_envio.clear()
#             nuevos_formularios_envio = FormularioEnvio.objects.filter(pk__in=formularios_envio_ids)
#             documento.formularios_envio.add(*nuevos_formularios_envio)

#             # Guardar los cambios en el documento de control
#             documento.save()

#             # Mostrar mensaje de éxito y redirigir a la misma página
#             messages.success(request, 'Documento de Control actualizado correctamente.')
#             return redirect('actualizar_documento_control')

#         except Exception as e:
#             # Manejar errores de validación o de guardado aquí según sea necesario
#             error_message = f'Error al actualizar el documento: {str(e)}'
#             context = {
#                 'documentos': documentos,
#                 'error_message': error_message,
#             }
#             return render(request, 'actualizar_documento_control.html', context)

#     # Si la solicitud no es POST, renderizar la página inicial de actualización de documentos
#     context = {
#         'documentos': documentos,
#     }
#     return render(request, 'actualizar_documento_control.html', context)





# def generar_documento_control_view(request):
#     if request.method == 'POST':
#         # Obtener los datos del formulario
#         fecha_emision = request.POST.get('fecha_emision')
#         numero_documento = request.POST.get('numero_documento')

#         # Validar los datos (esto es un ejemplo básico, deberías agregar más validaciones según tus requerimientos)
#         if not fecha_emision or not numero_documento:
#             return render(request, 'generar_documento_control.html', {'error_message': 'Todos los campos son requeridos'})

#         try:
#             # Crear una instancia de DocumentoControl
#             documento_control = DocumentoControl.objects.create(
#                 fecha_emision=fecha_emision,
#                 numero_documento=numero_documento
#             )

#             # Obtener los formularios de envío seleccionados (esto es un ejemplo básico)
#             formularios_envio_ids = request.POST.getlist('formularios_envio')  # Obtener los IDs de los formularios seleccionados

#             # Asociar los formularios de envío al documento de control
#             for formulario_id in formularios_envio_ids:
#                 formulario_envio = FormularioEnvio.objects.get(pk=formulario_id)
#                 documento_control.formularios_envio.add(formulario_envio)

#             # Guardar los cambios en la relación many-to-many
#             documento_control.save()

#             # Renderizar la plantilla documento_control.html con los datos del documento generado
#             return render(request, 'documento_control.html', {'documento': documento_control})

#         except Exception as e:
#             # Manejar errores de creación del documento aquí según sea necesario
#             return render(request, 'generar_documento_control.html', {'error_message': f'Error al generar el documento: {str(e)}'})

#     # Si no es una solicitud POST, renderizar el formulario para generar el documento
#     formularios_envio = FormularioEnvio.objects.all()  # Obtener todos los formularios de envío
#     return render(request, 'generar_documento_control.html', {'formularios_envio': formularios_envio})

