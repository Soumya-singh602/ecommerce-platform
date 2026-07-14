FROM python:3.12

WORKDIR /app

COPY product-service/requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY ecommerce-common /tmp/ecommerce-common

RUN pip install /tmp/ecommerce-common

COPY product-service/ .

EXPOSE 8002

CMD ["python", "manage.py", "runserver", "0.0.0.0:8002"]