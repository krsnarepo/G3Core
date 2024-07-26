from django import forms

class ClasificarPaqueteForm(forms.Form):
    paquete_id = forms.IntegerField(widget=forms.HiddenInput())
    distancia = forms.CharField(max_length=100, required=True)
    agencia = forms.CharField(max_length=100, required=True)
