from django.urls import path

from .consumers import (
    ChatConsumer,
    DashboardConsumer,
)

websocket_urlpatterns = [

    path(
        "ws/chat/<int:admin_id>/<int:customer_id>/",
        ChatConsumer.as_asgi(),
    ),

    path(
        "ws/dashboard/",
        DashboardConsumer.as_asgi(),
    ),

]