import json

from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async

from .models import Message, Conversation
from .redis_client import redis_client


class ChatConsumer(AsyncWebsocketConsumer):

    async def connect(self):

        self.admin_id = str(
            self.scope["url_route"]["kwargs"]["admin_id"]
        )

        self.customer_id = str(
            self.scope["url_route"]["kwargs"]["customer_id"]
        )

        ids = sorted(
            [self.admin_id, self.customer_id]
        )

        self.room_group_name = f"chat_{ids[0]}_{ids[1]}"

        headers = dict(self.scope["headers"])

        user_id = headers.get(b"x-user-id")
        user_email = headers.get(b"x-user-email")
        user_role = headers.get(b"x-user-role")

        if not user_id:
            await self.close(code=4001)
            return

        self.user = {
            "id": user_id.decode(),
            "email": user_email.decode() if user_email else "",
            "role": user_role.decode() if user_role else "",
        }

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name,
        )

        await self.accept()
        # Notify admin when customer comes online
        if self.user["role"] == "customer":

         await self.channel_layer.group_send(
          "admin_dashboard",
        {
            "type": "dashboard_update",
            "event": "online",
            "customer_id": self.user["id"],
        }
    )

        redis_client.sadd(
            "online_users",
            self.user["id"],
        )

        print("CONNECTED :", self.room_group_name)
        print("USER :", self.user)

    async def disconnect(self, close_code):

        if hasattr(self, "user"):
            redis_client.srem(
                "online_users",
                self.user["id"],
            )
        # Notify admin when customer goes offline
        if self.user["role"] == "customer":

         await self.channel_layer.group_send(
        "admin_dashboard",
        {
            "type": "dashboard_update",
            "event": "offline",
            "customer_id": self.user["id"],
        }
    )    

        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name,
        )

        print("DISCONNECTED :", self.room_group_name)

    @database_sync_to_async
    def save_message(
        self,
        sender_id,
        receiver_id,
        message,
    ):

        return Message.objects.create(
            sender_id=sender_id,
            receiver_id=receiver_id,
            message=message,
        )

    @database_sync_to_async
    def mark_delivered(self, message_id):

        Message.objects.filter(
            id=message_id
        ).update(
            is_delivered=True
        )

    @database_sync_to_async
    def update_conversation(
        self,
        sender_id,
        receiver_id,
        message,
    ):
        print("========== UPDATE CONVERSATION ==========")
        if str(sender_id) == self.admin_id:

            admin_id = int(sender_id)
            customer_id = int(receiver_id)

        else:

            admin_id = int(receiver_id)
            customer_id = int(sender_id)

        conversation, created = Conversation.objects.get_or_create(
            admin_id=admin_id,
            customer_id=customer_id,
        )

        conversation.last_message = message

        if str(sender_id) != self.admin_id:
            conversation.unread_count += 1

        conversation.save()

    async def receive(
        self,
        text_data=None,
        bytes_data=None,
    ):
        print("MESSAGE RECEIVED")
        print("TEXT DATA:", text_data)

        if not text_data:
            return

        data = json.loads(text_data)

        message = data.get("message")

        if not message:
            return

        if self.user["id"] == self.admin_id:

            receiver_id = self.customer_id

        else:

            receiver_id = self.admin_id

        saved_message = await self.save_message(
            sender_id=self.user["id"],
            receiver_id=receiver_id,
            message=message,
        )

        await self.update_conversation(
            sender_id=self.user["id"],
            receiver_id=receiver_id,
            message=message,
        )

        # Notify admin dashboard about new message
        await self.channel_layer.group_send(
         "admin_dashboard",
    {
        "type": "dashboard_update",
        "event": "new_message",
        "customer_id": self.customer_id,
        "last_message": message,
    }
)

        await self.mark_delivered(
            saved_message.id
        )

        await self.channel_layer.group_send(

            self.room_group_name,

            {
                "type": "chat_message",

                "id": saved_message.id,

                "sender_id": self.user["id"],

                "receiver_id": receiver_id,

                "sender": self.user["email"],

                "message": message,

                "is_delivered": True,

                "is_read": False,

                "created_at": saved_message.created_at.isoformat(),
            }
        )

    async def chat_message(self, event):

        await self.send(
            text_data=json.dumps(
                {
                    "id": event["id"],
                    "sender_id": event["sender_id"],
                    "receiver_id": event["receiver_id"],
                    "sender": event["sender"],
                    "message": event["message"],
                    "is_delivered": event["is_delivered"],
                    "is_read": event["is_read"],
                    "created_at": event["created_at"],
                }
            )
        )

    async def messages_read(self, event):

        await self.send(
            text_data=json.dumps(
                {
                    "type": "messages_read",
                    "sender_id": event["sender_id"],
                    "receiver_id": event["receiver_id"],
                }
            )
        )

class DashboardConsumer(AsyncWebsocketConsumer):

    async def connect(self):

        headers = dict(self.scope["headers"])

        user_role = headers.get(b"x-user-role")

        if not user_role:
            await self.close()
            return

        if user_role.decode() != "admin":
            await self.close()
            return

        await self.channel_layer.group_add(
            "admin_dashboard",
            self.channel_name,
        )

        await self.accept()

        print("ADMIN DASHBOARD CONNECTED")

    async def disconnect(self, close_code):

        await self.channel_layer.group_discard(
            "admin_dashboard",
            self.channel_name,
        )

        print("ADMIN DASHBOARD DISCONNECTED")

    async def dashboard_update(self, event):

        await self.send(
            text_data=json.dumps(
                {
                    "type": "dashboard_update",
                    "event": event["event"],
                    "customer_id": event["customer_id"],
                    "last_message": event.get(
                        "last_message",
                        "",
                    ),
                }
            )
        )