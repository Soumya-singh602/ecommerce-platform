import json
import httpx

from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async

from .models import Message


class ChatConsumer(AsyncWebsocketConsumer):

    async def connect(self):

        self.admin_id = str(self.scope["url_route"]["kwargs"]["admin_id"])
        self.customer_id = str(self.scope["url_route"]["kwargs"]["customer_id"])

        ids = sorted([self.admin_id, self.customer_id])
        self.room_group_name = f"chat_{ids[0]}_{ids[1]}"

        query = self.scope["query_string"].decode()

        token = ""

        if query.startswith("token="):
            token = query.replace("token=", "")

        if not token:
            await self.close(code=4001)
            return

        async with httpx.AsyncClient() as client:

            response = await client.get(
                "http://user-service:8001/users/verify/",
                headers={
                    "Authorization": f"Bearer {token}"
                }
            )

        if response.status_code != 200:
            await self.close(code=4003)
            return

        self.user = {
            "id": response.headers.get("X-User-Id"),
            "email": response.headers.get("X-User-Email"),
            "role": response.headers.get("X-User-Role"),
        }

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name,
        )

        await self.accept()

        print("CONNECTED :", self.room_group_name)
        print("USER :", self.user)

    async def disconnect(self, close_code):

        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name,
        )

        print("DISCONNECTED :", self.room_group_name)

    @database_sync_to_async
    def save_message(self, sender_id, receiver_id, message):

        return Message.objects.create(
            sender_id=sender_id,
            receiver_id=receiver_id,
            message=message,
        )

    async def receive(self, text_data=None, bytes_data=None):

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

        await self.save_message(
            sender_id=self.user["id"],
            receiver_id=receiver_id,
            message=message,
        )

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                "type": "chat_message",
                "sender": self.user["email"],
                "message": message,
            },
        )

    async def chat_message(self, event):

        await self.send(
            text_data=json.dumps(
                {
                    "sender": event["sender"],
                    "message": event["message"],
                }
            )
        )