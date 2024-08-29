# Etapa 1: Construcción de dependencias
FROM python:3.12-slim AS builder

# Establecer el directorio de trabajo para la construcción
WORKDIR /backendapp

# Instalar las dependencias necesarias para la construcción
RUN apt-get update && apt-get install -y \
    build-essential \
    default-libmysqlclient-dev \
    pkg-config \
    && rm -rf /var/lib/apt/lists/* 

# Copiar solo requirements.txt para instalar dependencias
COPY requirements.txt /backendapp

# Instalar dependencias de Python en un directorio temporal
RUN pip install --no-cache-dir --user -r requirements.txt

# Etapa 2: Imagen final
FROM python:3.12-slim

# Establecer el directorio de trabajo para la imagen final
WORKDIR /backendapp

# Copiar solo las dependencias instaladas desde la etapa de construcción
COPY --from=builder /root/.local /root/.local
COPY --from=builder /usr/lib/x86_64-linux-gnu/libmysql* /usr/lib/x86_64-linux-gnu
COPY --from=builder /usr/lib/x86_64-linux-gnu/libmaria* /usr/lib/x86_64-linux-gnu
COPY --from=builder /usr/lib/x86_64-linux-gnu/libmariadb3 /usr/lib/x86_64-linux-gnu/libmariadb3
COPY --from=builder /usr/bin/mysql_config /usr/bin

# Agregar el directorio de dependencias al PATH
ENV PATH=/root/.local/bin:$PATH

# Dockerfile stablishes itself as the root of the project
COPY . /backendapp 

# Establecer la variable de entorno para Django
ENV DJANGO_SETTINGS_MODULE=backendCore.settings

# Exponer el puerto en el que la aplicación Django se ejecutará
EXPOSE 8000

# Comando para ejecutar la aplicación Django
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "backendCore.wsgi:application"]