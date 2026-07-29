FROM python:3.12-slim

WORKDIR /app

RUN apt-get update && apt-get install -y \
    default-libmysqlclient-dev \
    build-essential \
    pkg-config \
    && rm -rf /var/lib/apt/lists/*

COPY chat-service/requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY chat-service/ .

EXPOSE 8004

CMD ["daphne", "-b", "0.0.0.0", "-p", "8004", "config.asgi:application"]