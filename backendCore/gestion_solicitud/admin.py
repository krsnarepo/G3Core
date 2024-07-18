from django.contrib import admin
from .models import Pedido, TablaPrecios, Comprobante, Paquete

# Register your models here.
admin.site.register(Pedido)
admin.site.register(TablaPrecios)
admin.site.register(Comprobante)
admin.site.register(Paquete)