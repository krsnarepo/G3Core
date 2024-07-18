from django.utils.crypto import get_random_string

## Implement your extra business logic here

def calculate_price(paquete, TablaPrecios):
    try:
        price_entry = TablaPrecios.objects.get(peso=paquete.peso)
        return price_entry.precio
    except TablaPrecios.DoesNotExist:
        raise ValueError("No price available for this package")
    
def calculate_total_price(pedido):
    total_price = 0
    for paquete in pedido.paquetes.all():
        total_price += paquete.precio
    return total_price

def external_payment_service(pedido):
    # Call external payment service
    # ¿If payment is successful return true?
    return True

def generate_unique():
    return get_random_string(length=32)

def generate_unique8():
    return get_random_string(length=8)