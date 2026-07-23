from django.shortcuts import render

# Create your views here.
import requests
from rest_framework.decorators import api_view 
from rest_framework.response import Response
from rest_framework import status

from .serializers import OrderSerializer
from .models import Order
from django.core.paginator import Paginator, EmptyPage
from django.db.models import Count , Q
from ecommerce_common.response import success_response
from ecommerce_common.exceptions import NotFoundException
from ecommerce_common.utils import get_user_info



# PLACE ORDER
@api_view(["POST"])
def place_order(request):

    data = request.data.copy()

    user = get_user_info(request)

    print("User ID :", user["user_id"])
    print("User Email :", user["user_email"])

    data["user_id"] = user["user_id"]

    product_id = request.data.get("product_id")

    response = requests.get(
    f"http://product-service:8002/products/{product_id}/",
    headers={
        "Authorization": request.headers.get("Authorization")
    }
)

    if response.status_code != 200:
        raise NotFoundException("Product not found")

    serializer = OrderSerializer(data=data)

    if serializer.is_valid():

        serializer.save()

        return success_response(
            message="Order placed successfully",
            data=serializer.data,
            status_code=201
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
# ORDER LIST
@api_view(["GET"])
def order_list(request):

    user = get_user_info(request)

    user_id = user["user_id"]


    orders = Order.objects.filter(
        user_id=user_id
    ).order_by("-created_at")



    # STATUS FILTER

    status_filter = request.GET.get("status")


    if status_filter:

        orders = orders.filter(
            status__iexact=status_filter
        )



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

        raise NotFoundException(
            "No orders found"
        )



    # PAGINATION

    page = request.GET.get(
        "page",
        1
    )


    paginator = Paginator(
        orders,
        5
    )


    try:

        page_obj = paginator.page(page)


    except EmptyPage:

        raise NotFoundException(
            "Page does not exist"
        )



    serializer = OrderSerializer(
        page_obj,
        many=True
    )



    orders_data = []



    for order in serializer.data:


        product_response = requests.get(


            f"http://product-service:8002/products/{order['product_id']}/",


            headers={

                "Authorization": request.headers.get(
                    "Authorization"
                )

            }

        )



        product_data = None



        if product_response.status_code == 200:


            product_data = product_response.json().get(
                "data"
            )



        order["product"] = product_data



        orders_data.append(
            order
        )




    return success_response(

        message="Orders fetched successfully",


        data={

            "current_page": page_obj.number,


            "total_pages": paginator.num_pages,


            "total_orders": paginator.count,


            "orders": orders_data

        }

    )

# ORDER DETAIL
@api_view(["GET"])
def order_detail(request, id):

    user = get_user_info(request)
    user_id = user["user_id"]


    try:

        order = Order.objects.get(
            id=id,
            user_id=user_id
        )


    except Order.DoesNotExist:

        raise NotFoundException("Order not found")



    product_response = requests.get(

        f"http://product-service:8002/products/{order.product_id}/",

        headers={

            "Authorization": request.headers.get("Authorization")

        }

    )



    product_data = None


    if product_response.status_code == 200:

        product_data = product_response.json()["data"]



    serializer = OrderSerializer(order)



    data = {

        **serializer.data,

        "product": product_data

    }



    return success_response(

        message="Order fetched successfully",

        data=data

    )

# CANCEL ORDER
@api_view(["PUT"])
def cancel_order(request, id):

    user = get_user_info(request)
    user_id = user["user_id"]

    try:
        order = Order.objects.get(
            id=id,
            user_id=user_id
        )

    except Order.DoesNotExist:
        raise NotFoundException("Order not found")

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

    return success_response(
        message="Order cancelled successfully",
        data=serializer.data
    )


# UPDATE ORDER STATUS
@api_view(["PUT"])
def update_order_status(request, id):

    try:
        order = Order.objects.get(id=id)

    except Order.DoesNotExist:
        raise NotFoundException("Order not found")

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

    return success_response(
        message="Order status updated successfully",
        data=serializer.data
    )



# ORDER STATISTICS
@api_view(["GET"])
def order_statistics(request):

    user = get_user_info(request)
    user_id = user["user_id"]

    orders = Order.objects.filter(user_id=user_id)

    if not orders.exists():
        raise NotFoundException("No orders found")

    data = {
        "total_orders": orders.count(),
        "pending_orders": orders.filter(status="Pending").count(),
        "confirmed_orders": orders.filter(status="Confirmed").count(),
        "shipped_orders": orders.filter(status="Shipped").count(),
        "delivered_orders": orders.filter(status="Delivered").count(),
        "cancelled_orders": orders.filter(status="Cancelled").count(),
    }

    return success_response(
        message="Order statistics fetched successfully",
        data=data
    )

@api_view(["GET"])
def admin_order_list(request):

    orders = Order.objects.all().order_by("-created_at")

    # ==========================
    # SEARCH
    # ==========================
    search = request.GET.get("search")

    if search:

        orders = orders.filter(
            Q(id__icontains=search) |
            Q(user_id__icontains=search) |
            Q(product_id__icontains=search)
        )

    # ==========================
    # STATUS FILTER
    # ==========================
    status_filter = request.GET.get("status")

    if status_filter:

        orders = orders.filter(
            status__iexact=status_filter
        )

    # ==========================
    # SORTING
    # ==========================
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

    # ==========================
    # NO DATA
    # ==========================
    if not orders.exists():

        raise NotFoundException("No orders found")

    # ==========================
    # PAGINATION
    # ==========================
    page = request.GET.get("page", 1)

    paginator = Paginator(orders, 5)

    try:

        page_obj = paginator.page(page)

    except EmptyPage:

        raise NotFoundException("Page does not exist")

    serializer = OrderSerializer(page_obj, many=True)

    orders_data = []

    # ==========================
    # PRODUCT DETAILS
    # ==========================
    for order in serializer.data:

        product_response = requests.get(
            f"http://product-service:8002/products/{order['product_id']}/",
            headers={
                "Authorization": request.headers.get("Authorization")
            }
        )

        product_data = None

        if product_response.status_code == 200:

            product_data = product_response.json().get("data")

        order["product"] = product_data

        orders_data.append(order)

    return success_response(
        message="All orders fetched successfully",
        data={
            "current_page": page_obj.number,
            "total_pages": paginator.num_pages,
            "total_orders": paginator.count,
            "orders": orders_data
        }
    )
@api_view(["GET"])
def admin_order_detail(request, id):

    try:
        order = Order.objects.get(id=id)

    except Order.DoesNotExist:
        raise NotFoundException("Order not found")

    serializer = OrderSerializer(order)

    return success_response(
        message="Order fetched successfully",
        data=serializer.data
    )

@api_view(["GET"])
def admin_order_statistics(request):

    orders = Order.objects.all()

    data = {

        "total_orders": orders.count(),

        "pending_orders": orders.filter(
            status="Pending"
        ).count(),

        "confirmed_orders": orders.filter(
            status="Confirmed"
        ).count(),

        "shipped_orders": orders.filter(
            status="Shipped"
        ).count(),

        "delivered_orders": orders.filter(
            status="Delivered"
        ).count(),

        "cancelled_orders": orders.filter(
            status="Cancelled"
        ).count(),

    }


    return success_response(

        message="Admin order statistics fetched successfully",

        data=data

    )

@api_view(["PUT"])
def admin_cancel_order(request, id):

    try:
        order = Order.objects.get(id=id)

    except Order.DoesNotExist:
        raise NotFoundException("Order not found")

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

    return success_response(
        message="Order cancelled successfully",
        data=serializer.data
    )