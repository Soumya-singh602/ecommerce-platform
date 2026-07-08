from django.shortcuts import render

# Create your views here.
import requests
from rest_framework.decorators import api_view , authentication_classes
from rest_framework.response import Response
from rest_framework import status

from .serializers import OrderSerializer
from .authentication import UserServiceAuthentication
from .models import Order


@api_view(["POST"])
@authentication_classes([UserServiceAuthentication])
def place_order(request):

    # Request data copy
    data = request.data.copy()

    
    data["user_id"] = request.user["id"]

    
    product_id = request.data.get("product_id")

    
    auth_header = request.headers.get("Authorization")

    response = requests.get(
    f"http://127.0.0.1:8002/products/{product_id}/",
    headers={
        "Authorization": auth_header
    }
)

    print("Status Code:", response.status_code)
    print("Response:", response.text)

    if response.status_code != 200:
        return Response(
        {
            "status_code": response.status_code,
            "response": response.text
        },
        status=response.status_code
    )

    
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


@api_view(["GET"])
@authentication_classes([UserServiceAuthentication])
def order_list(request):

    user_id = request.user["id"]

    orders = Order.objects.filter(user_id=user_id)

    serializer = OrderSerializer(orders, many=True)

    return Response(serializer.data)