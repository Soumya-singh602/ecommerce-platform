FROM python:3.12

WORKDIR /app

COPY order-service/requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY ecommerce-common /tmp/ecommerce-common

RUN pip install /tmp/ecommerce-common

COPY order-service/ .

EXPOSE 8003

CMD ["python", "manage.py", "runserver", "0.0.0.0:8003"]