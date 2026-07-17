import json

from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async

from .models import Message


class ChatConsumer(AsyncWebsocketConsumer):

    async def connect(self):

        self.admin_id = str(
            self.scope["url_route"]["kwargs"]["admin_id"]
        )

        self.customer_id = str(
            self.scope["url_route"]["kwargs"]["customer_id"]
        )


        # Create private chat room
        ids = sorted(
            [self.admin_id, self.customer_id]
        )

        self.room_group_name = f"chat_{ids[0]}_{ids[1]}"


        # Get user details from API Gateway
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


        # Add websocket connection to room
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
    def save_message(
        self,
        sender_id,
        receiver_id,
        message
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



    async def receive(
        self,
        text_data=None,
        bytes_data=None
    ):

        if not text_data:
            return


        data = json.loads(text_data)

        message = data.get("message")


        if not message:
            return



        # Decide receiver
        if self.user["id"] == self.admin_id:

            receiver_id = self.customer_id

        else:

            receiver_id = self.admin_id



        saved_message = await self.save_message(
            sender_id=self.user["id"],
            receiver_id=receiver_id,
            message=message,
        )


        await self.mark_delivered(
            saved_message.id
        )



        # Send message to private room
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