from django.db import models


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


    # Billing Details

    address = models.TextField(
        null=True,
        blank=True
    )


    phone = models.CharField(
        max_length=15,
        null=True,
        blank=True
    )


    city = models.CharField(
        max_length=100,
        null=True,
        blank=True
    )


    pincode = models.CharField(
        max_length=10,
        null=True,
        blank=True
    )


    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="Pending"
    )


    created_at = models.DateTimeField(
        auto_now_add=True
    )



    def __str__(self):

        return f"Order {self.id}"