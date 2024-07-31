from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from .models import Worker, WorkerType, Cliente

@receiver(post_save, sender=User)
def create_worker(sender, instance, created, **kwargs):
    if created:
        # Assuming there is a default WorkerType to assign to new workers
        default_worker_type = WorkerType.objects.get(name='client')
        # default_worker_type, created = WorkerType.objects.get_or_create(name='client')
        Worker.objects.create(user=instance, worker_type=default_worker_type)
        Cliente.objects.create(user=instance)