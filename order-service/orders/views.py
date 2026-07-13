from django.shortcuts import render

# Create your views here.
import requests
from rest_framework.decorators import api_view 
from rest_framework.response import Response
from rest_framework import status

from .serializers import OrderSerializer
from .models import Order
from django.core.paginator import Paginator, EmptyPage
from django.db.models import Count


#PLACE ORDER
@api_view(["POST"])
def place_order(request):

    data = request.data.copy()

    user_id = request.headers.get("X-User-Id")
    user_email = request.headers.get("X-User-Email")

    print("User ID :", user_id)
    print("User Email :", user_email)

    data["user_id"] = user_id

    product_id = request.data.get("product_id")

    response = requests.get(
        f"http://127.0.0.1:8002/products/{product_id}/",
        headers={
           "Authorization": request.headers.get("Authorization")
     }
    )

    if response.status_code != 200:

        return Response(
            {
                "status": "failed",
                "message": "Product not found",
                "data": None,
            },
            status=status.HTTP_404_NOT_FOUND,
        )

    serializer = OrderSerializer(data=data)

    if serializer.is_valid():

        serializer.save()

        return Response(
            {
                "status": "success",
                "message": "Order placed successfully",
                "data": serializer.data,
            },
            status=status.HTTP_201_CREATED,
        )

    return Response(
        {
            "status": "failed",
            "message": "Validation failed",
            "data": serializer.errors,
        },
        status=status.HTTP_400_BAD_REQUEST,
    )


# ORDER LIST
@api_view(["GET"])
def order_list(request):

    user_id = request.headers.get("X-User-Id")

    orders = Order.objects.filter(user_id=user_id)

    # STATUS FILTER
    status_filter = request.GET.get("status")

    if status_filter:

        orders = orders.filter(status__iexact=status_filter)

    # SORTING
    sort = request.GET.get("sort")

    if sort:

        if sort in ["created_at", "-created_at"]:

            orders = orders.order_by(sort)

        else:

            return Response(
                {
                    "status": "failed",
                    "message": "Invalid sorting field",
                    "data": None
                },
                status=status.HTTP_400_BAD_REQUEST
            )

    # NO DATA
    if not orders.exists():

        return Response(
            {
                "status": "failed",
                "message": "No orders found",
                "data": []
            },
            status=status.HTTP_404_NOT_FOUND
        )

    # PAGINATION
    page = request.GET.get("page", 1)

    paginator = Paginator(orders, 5)

    try:

        page_obj = paginator.page(page)

    except EmptyPage:

        return Response(
            {
                "status": "failed",
                "message": "Page does not exist",
                "data": None
            },
            status=status.HTTP_404_NOT_FOUND
        )

    serializer = OrderSerializer(page_obj, many=True)

    return Response(
        {
            "status": "success",
            "message": "Orders fetched successfully",
            "data": {
                "current_page": page_obj.number,
                "total_pages": paginator.num_pages,
                "total_orders": paginator.count,
                "orders": serializer.data
            }
        },
        status=status.HTTP_200_OK
    )

#ORDER DETAIL
@api_view(["GET"])
def order_detail(request, id):

    user_id = request.headers.get("X-User-Id")

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
def cancel_order(request, id):

    user_id = request.headers.get("X-User-Id")

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


# ORDER STATISTICS
@api_view(["GET"])
def order_statistics(request):

    user_id = request.headers.get("X-User-Id")

    orders = Order.objects.filter(user_id=user_id)

    if not orders.exists():

        return Response(
            {
                "status": "failed",
                "message": "No orders found",
                "data": None
            },
            status=status.HTTP_404_NOT_FOUND
        )

    data = {
        "total_orders": orders.count(),
        "pending_orders": orders.filter(status="Pending").count(),
        "confirmed_orders": orders.filter(status="Confirmed").count(),
        "shipped_orders": orders.filter(status="Shipped").count(),
        "delivered_orders": orders.filter(status="Delivered").count(),
        "cancelled_orders": orders.filter(status="Cancelled").count()
    }

    return Response(
        {
            "status": "success",
            "message": "Order statistics fetched successfully",
            "data": data
        },
        status=status.HTTP_200_OK
    )