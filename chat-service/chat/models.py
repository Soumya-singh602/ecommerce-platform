from django.db import models


class Message(models.Model):

    sender_id = models.IntegerField()

    receiver_id = models.IntegerField()

    message = models.TextField()

    # message receiver tak pahucha
    is_delivered = models.BooleanField(default=False)

    # receiver ne padh liya
    is_read = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)


    class Meta:
        ordering = ["created_at"]


    def __str__(self):
        return f"{self.sender_id} -> {self.receiver_id}"
    
class Conversation(models.Model):

    admin_id = models.CharField(max_length=100)

    customer_id = models.CharField(max_length=100)

    last_message = models.TextField(blank=True)

    unread_count = models.PositiveIntegerField(default=0)

    updated_at = models.DateTimeField(auto_now=True)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:

        unique_together = ("admin_id", "customer_id")

        ordering = ["-updated_at"]

    def __str__(self):

        return f"{self.admin_id} - {self.customer_id}"