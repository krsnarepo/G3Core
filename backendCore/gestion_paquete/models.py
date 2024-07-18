from django.db import models
from django.core.validators import MinLengthValidator, MaxLengthValidator
from gestion_solicitud.services import generate_unique, generate_unique8
import uuid
    
class DocumentoControl(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    fecha_emision = models.DateField(auto_now_add=True)
    numero_documento = models.CharField(max_length=32, validators=[MinLengthValidator(32), MaxLengthValidator(32)], default=generate_unique, unique=True)

    def __str__(self):
        return f"Documento {self.numero_documento}. Fecha de emisión: {self.fecha_emision}"
    
    def save(self, *args, **kwargs):
        if not self.numero_documento:
            self.numero_documento = generate_unique()
            while DocumentoControl.objects.filter(numero_documento=self.numero_documento).exists():
                self.numero_documento = generate_unique()
        super().save(*args, **kwargs)
    
    class Meta:
        verbose_name_plural = 'Documentos de Control'



