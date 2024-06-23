from django.contrib import admin
from .models import Worker, WorkerType

# Register your models here.

admin.site.register(Worker)
admin.site.register(WorkerType)