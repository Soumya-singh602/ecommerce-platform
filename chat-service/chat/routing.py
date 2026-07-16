from django.urls import path
from .consumers import ChatConsumer

websocket_urlpatterns = [
    path(
        "ws/chat/<int:admin_id>/<int:customer_id>/",
        ChatConsumer.as_asgi(),
    ),
]