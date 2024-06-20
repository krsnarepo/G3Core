from rest_framework import permissions

class IsManager(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.worker.worker_type.name == 'Jefe de Logistica'

class IsReceptionist(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.worker.worker_type.name == 'Recepcionista'

class IsWarehouseWorker(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.worker.worker_type.name == 'Trabajador de Almacen'

class IsDelivery(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.worker.worker_type.name == 'Repartidor'