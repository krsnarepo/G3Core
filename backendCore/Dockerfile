# Usar una imagen base oficial de Python
FROM python:3.12-slim

WORKDIR /backendapp

COPY requirements.txt /backendapp

RUN apt-get update && apt-get install -y \
    build-essential \
    libmariadb-dev \
    pkg-config \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get clean \
    && pip install --no-cache-dir -r requirements.txt

# Copiar el código fuente al contenedor
# Dockerfile stablishes itself as the root of the project
COPY . /backendapp 

# Establecer la variable de entorno para Django
ENV DJANGO_SETTINGS_MODULE=backendCore.settings

# Exponer el puerto en el que la aplicación Django se ejecutará
EXPOSE 8000

# Comando para ejecutar la aplicación Django
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "backendCore.wsgi:application"]
