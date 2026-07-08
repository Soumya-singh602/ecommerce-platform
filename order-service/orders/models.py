from django.db import models

# Create your models here.
STATUS_CHOICES = (

    ("Pending", "Pending"),

    ("Confirmed", "Confirmed"),

    ("Shipped", "Shipped"),

    ("Delivered", "Delivered"),

    ("Cancelled", "Cancelled"),

)
class Order(models.Model):

    user_id = models.IntegerField()

    product_id = models.IntegerField()

    quantity = models.PositiveIntegerField(default=1)

    status = models.CharField(
        max_length=20, choices=STATUS_CHOICES,
        default="Pending"
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order {self.id}"