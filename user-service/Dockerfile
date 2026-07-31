FROM python:3.12

WORKDIR /app

COPY user-service/requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY ecommerce-common /tmp/ecommerce-common

RUN pip install /tmp/ecommerce-common

COPY user-service/ .

EXPOSE 8001

CMD ["sh", "-c", "gunicorn user_service.wsgi:application --bind 0.0.0.0:$PORT"]