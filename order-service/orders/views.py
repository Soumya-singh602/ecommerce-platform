from django.shortcuts import render

# Create your views here.
import requests
from rest_framework.decorators import api_view , authentication_classes
from rest_framework.response import Response
from rest_framework import status

from .serializers import OrderSerializer
from .authentication import UserServiceAuthentication


@api_view(["POST"])
@authentication_classes([UserServiceAuthentication])
def place_order(request):

    # Request data copy
    data = request.data.copy()

    # Logged-in user ki ID JWT se lo
    data["user_id"] = request.user["id"]

    # Product ID nikalo
    product_id = request.data.get("product_id")

    # Product Service ko call karo
    response = requests.get(
        f"http://127.0.0.1:8002/products/{product_id}/"
    )

    # Product exist nahi karta
    if response.status_code != 200:
        return Response(
            {
                "message": "Product not found"
            },
            status=status.HTTP_404_NOT_FOUND
        )

    # Order save karo
    serializer = OrderSerializer(data=data)

    if serializer.is_valid():
        serializer.save()

        return Response(
            {
                "message": "Order placed successfully",
                "data": serializer.data
            },
            status=status.HTTP_201_CREATED
        )

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )

