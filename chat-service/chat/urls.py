from django.urls import path

from .views import chat_history


urlpatterns = [
    path(
        "history/<int:user1>/<int:user2>/",
        chat_history,
    ),
]