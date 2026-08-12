from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator


class Category(models.Model):

    name = models.CharField(
        max_length=100,
        unique=True
    )

    image = models.ImageField(
        upload_to="categories/",
        null=True,
        blank=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.name


class Banner(models.Model):

    title = models.CharField(
        max_length=200
    )

    subtitle = models.CharField(
        max_length=300
    )

    button_text = models.CharField(
        max_length=100
    )

    button_link = models.CharField(
        max_length=200
    )

    image = models.ImageField(
        upload_to="banners/"
    )

    is_active = models.BooleanField(
        default=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.title


class Product(models.Model):

    name = models.CharField(
        max_length=200
    )

    description = models.TextField()

    price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    stock = models.PositiveIntegerField(
        default=0
    )

    image = models.ImageField(
        upload_to="products/",
        null=True,
        blank=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):
        return self.name


class Review(models.Model):

    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name="reviews"
    )

    user_id = models.IntegerField()

    rating = models.PositiveSmallIntegerField(
        validators=[
            MinValueValidator(1),
            MaxValueValidator(5)
        ]
    )

    comment = models.TextField()

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["product", "user_id"],
                name="unique_product_user_review"
            )
        ]

        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.product.name} - {self.rating}/5"