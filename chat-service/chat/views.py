from django.shortcuts import render

# Create your views here.
from django.db.models import Q

from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Message
from .serializers import MessageSerializer


@api_view(["GET"])
def chat_history(request, user1, user2):

    messages = Message.objects.filter(
        Q(sender_id=user1, receiver_id=user2) |
        Q(sender_id=user2, receiver_id=user1)
    ).order_by("created_at")

    serializer = MessageSerializer(messages, many=True)

    return Response(serializer.data)