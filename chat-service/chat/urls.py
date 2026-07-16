from django.urls import path

from .views import chat_history , conversation_list , mark_messages_read


urlpatterns = [
    path(
        "history/<int:user1>/<int:user2>/",
        chat_history,
    ),
    path("conversations/<int:user_id>/", conversation_list),

    path(
    "read/<int:sender_id>/<int:receiver_id>/",
    mark_messages_read,
),
]
