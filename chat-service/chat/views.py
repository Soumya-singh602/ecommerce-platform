from django.shortcuts import render

# Create your views here.
from django.db.models import Q

from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Message
from .serializers import MessageSerializer
from .services import get_user_details
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
import httpx



from .models import Conversation
from .redis_client import redis_client


@api_view(["GET"])
def chat_history(request, user1, user2):

    messages = Message.objects.filter(
        Q(sender_id=user1, receiver_id=user2) |
        Q(sender_id=user2, receiver_id=user1)
    ).order_by("created_at")

    serializer = MessageSerializer(messages, many=True)

    return Response(serializer.data)



@api_view(["GET"])
def conversation_list(request, user_id):

    token = request.headers.get("Authorization")

    messages = (
        Message.objects
        .filter(
            Q(sender_id=user_id) |
            Q(receiver_id=user_id)
        )
        .order_by("-created_at")
    )


    conversations = {}


    for message in messages:

        if message.sender_id == user_id:
            other_user = message.receiver_id
        else:
            other_user = message.sender_id


        if other_user not in conversations:

            user_data = get_user_details(
                other_user,
                token
            )


            unread_count = Message.objects.filter(
                sender_id=other_user,
                receiver_id=user_id,
                is_read=False
            ).count()


            conversations[other_user] = {

                "user_id": other_user,


                "name": (
                    f"{user_data.get('first_name', '')} "
                    f"{user_data.get('last_name', '')}"
                ).strip(),


                "email": user_data.get("email"),


                "role": user_data.get("role"),


                "last_message": message.message,


                "unread_count": unread_count,


                "time": message.created_at
            }


    return Response(
        list(conversations.values())
    )



@api_view(["PATCH"])
def mark_messages_read(request, sender_id, receiver_id):

    updated = Message.objects.filter(
        sender_id=sender_id,
        receiver_id=receiver_id,
        is_read=False
    ).update(is_read=True)

    if updated > 0:

        ids = sorted([str(sender_id), str(receiver_id)])
        room_group_name = f"chat_{ids[0]}_{ids[1]}"

        channel_layer = get_channel_layer()

        async_to_sync(channel_layer.group_send)(
            room_group_name,
            {
                "type": "messages_read",
                "sender_id": sender_id,
                "receiver_id": receiver_id,
            }
        )

    return Response({
        "success": True,
        "messages_read": updated
    })




@api_view(["GET"])
def dashboard(request):

    online_users = list(
        redis_client.smembers("online_users")
    )


    conversations = Conversation.objects.all().order_by(
        "-created_at"
    )


    data = []

    for conversation in conversations:

        data.append(
            {
                "admin_id": conversation.admin_id,

                "customer_id": conversation.customer_id,

                "last_message": conversation.last_message,

                "unread_count": conversation.unread_count,

                "is_online": str(
                    conversation.customer_id
                ) in online_users,
            }
        )


    return Response(
        {
            "status": "success",
            "online_users": online_users,
            "conversations": data,
        }
    )