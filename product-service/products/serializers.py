from rest_framework import serializers

from .models import (
    Product,
    Category,
    Banner,
    Review,
)


class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = "__all__"


class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = "__all__"


class BannerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Banner
        fields = "__all__"


class ReviewSerializer(serializers.ModelSerializer):

    class Meta:
        model = Review

        fields = [
            "id",
            "product",
            "user_id",
            "rating",
            "comment",
            "created_at",
            "updated_at",
        ]

        read_only_fields = [
            "id",
            "product",
            "user_id",
            "created_at",
            "updated_at",
        ]