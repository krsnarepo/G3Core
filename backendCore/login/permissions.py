from rest_framework import permissions

class IsManager(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.worker.worker_type.name == 'manager'

class IsReceptionist(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.worker.worker_type.name == 'recepcionist'

class IsWarehouseWorker(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.worker.worker_type.name == 'warehouse'

class IsDelivery(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.worker.worker_type.name == 'delivery'