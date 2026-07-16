from django.db import models

# Create your models here.
from django.db import models


class Message(models.Model):

    sender_id = models.IntegerField()

    receiver_id = models.IntegerField()

    message = models.TextField()

    is_read = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["created_at"]

    def __str__(self):
        return f"{self.sender_id} -> {self.receiver_id}"
