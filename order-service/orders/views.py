from django.shortcuts import render

# Create your views here.
import requests
from rest_framework.decorators import api_view , authentication_classes
from rest_framework.response import Response
from rest_framework import status

from .serializers import OrderSerializer
from .authentication import UserServiceAuthentication
from .models import Order


#PLACE ORDER
@api_view(["POST"])
@authentication_classes([UserServiceAuthentication])
def place_order(request):

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

    if response.status_code != 200:

        return Response(
            {
                "status": "failed",
                "message": "Product not found",
                "data": None
            },
            status=status.HTTP_404_NOT_FOUND
        )

    serializer = OrderSerializer(data=data)

    if serializer.is_valid():

        serializer.save()

        return Response(
            {
                "status": "success",
                "message": "Order placed successfully",
                "data": serializer.data
            },
            status=status.HTTP_201_CREATED
        )

    return Response(
        {
            "status": "failed",
            "message": "Validation failed",
            "data": serializer.errors
        },
        status=status.HTTP_400_BAD_REQUEST
    )

#ORDER LIST
@api_view(["GET"])
@authentication_classes([UserServiceAuthentication])
def order_list(request):

    user_id = request.user["id"]

    orders = Order.objects.filter(user_id=user_id)

    serializer = OrderSerializer(orders, many=True)

    return Response(
        {
            "status": "success",
            "message": "Orders fetched successfully",
            "data": serializer.data
        },
        status=status.HTTP_200_OK
    )

#ORDER DETAIL
@api_view(["GET"])
@authentication_classes([UserServiceAuthentication])
def order_detail(request, id):

    user_id = request.user["id"]

    try:

        order = Order.objects.get(
            id=id,
            user_id=user_id
        )

    except Order.DoesNotExist:

        return Response(
            {
                "status": "failed",
                "message": "Order not found",
                "data": None
            },
            status=status.HTTP_404_NOT_FOUND
        )

    serializer = OrderSerializer(order)

    return Response(
        {
            "status": "success",
            "message": "Order fetched successfully",
            "data": serializer.data
        }
    )

#CANCLE ORDER
@api_view(["PUT"])
@authentication_classes([UserServiceAuthentication])
def cancel_order(request, id):

    user_id = request.user["id"]

    try:

        order = Order.objects.get(
            id=id,
            user_id=user_id
        )

    except Order.DoesNotExist:

        return Response(
            {
                "status": "failed",
                "message": "Order not found",
                "data": None
            },
            status=status.HTTP_404_NOT_FOUND
        )

    if order.status == "Cancelled":

        return Response(
            {
                "status": "failed",
                "message": "Order already cancelled",
                "data": None
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    order.status = "Cancelled"

    order.save()

    serializer = OrderSerializer(order)

    return Response(
        {
            "status": "success",
            "message": "Order cancelled successfully",
            "data": serializer.data
        },
        status=status.HTTP_200_OK
    )

#UPDATE ORDER STATUS
@api_view(["PUT"])
@authentication_classes([UserServiceAuthentication])
def update_order_status(request, id):

    try:

        order = Order.objects.get(id=id)

    except Order.DoesNotExist:

        return Response(
            {
                "status": "failed",
                "message": "Order not found",
                "data": None
            },
            status=status.HTTP_404_NOT_FOUND
        )

    new_status = request.data.get("status")

    valid_status = [
        "Pending",
        "Confirmed",
        "Shipped",
        "Delivered",
        "Cancelled"
    ]

    if new_status not in valid_status:

        return Response(
            {
                "status": "failed",
                "message": "Invalid order status",
                "data": None
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    order.status = new_status

    order.save()

    serializer = OrderSerializer(order)

    return Response(
        {
            "status": "success",
            "message": "Order status updated successfully",
            "data": serializer.data
        },
        status=status.HTTP_200_OK
    )