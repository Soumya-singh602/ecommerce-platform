
from django.shortcuts import render

# Create your views here.
import requests
import os

from payments.models import PaymentOrder

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from django.core.paginator import Paginator, EmptyPage
from django.db.models import Q

from .serializers import OrderSerializer
from .models import Order

from ecommerce_common.response import success_response
from ecommerce_common.exceptions import NotFoundException
from ecommerce_common.utils import get_user_info

from django.http import JsonResponse


PRODUCT_SERVICE_URL = os.getenv("PRODUCT_SERVICE_URL")


# ============================================================
# HELPER - GET PRODUCT
# ============================================================

def get_product(product_id, authorization):

    try:

        response = requests.get(
            f"{PRODUCT_SERVICE_URL}/products/{product_id}/",
            headers={
                "Authorization": authorization
            },
            timeout=10
        )

    except requests.RequestException:

        return None, Response(
            {
                "status": "failed",
                "message": "Product service is unavailable",
                "data": None
            },
            status=status.HTTP_503_SERVICE_UNAVAILABLE
        )

    if response.status_code != 200:

        return None, Response(
            {
                "status": "failed",
                "message": f"Product {product_id} not found",
                "data": None
            },
            status=status.HTTP_404_NOT_FOUND
        )

    try:

        product_data = response.json().get("data")

    except ValueError:

        return None, Response(
            {
                "status": "failed",
                "message": "Invalid response from product service",
                "data": None
            },
            status=status.HTTP_502_BAD_GATEWAY
        )

    if not product_data:

        return None, Response(
            {
                "status": "failed",
                "message": "Product data not found",
                "data": None
            },
            status=status.HTTP_404_NOT_FOUND
        )

    return product_data, None


# ============================================================
# HELPER - UPDATE PRODUCT STOCK
# ============================================================

def update_stock(
    product_id,
    quantity,
    action,
    authorization
):

    try:

        response = requests.put(
            f"{PRODUCT_SERVICE_URL}/products/{product_id}/stock/",
            json={
                "quantity": quantity,
                "action": action
            },
            headers={
                "Authorization": authorization
            },
            timeout=10
        )

    except requests.RequestException:

        return False, {
            "status": "failed",
            "message": "Unable to connect to product service",
            "data": None
        }

    try:

        response_data = response.json()

    except ValueError:

        response_data = {
            "status": "failed",
            "message": "Invalid response from product service",
            "data": None
        }

    if response.status_code != 200:

        return False, response_data

    return True, response_data


# ============================================================
# PLACE ORDER
# ============================================================

@api_view(["POST"])
def place_order(request):

    data = request.data.copy()

    user = get_user_info(request)

    data["user_id"] = user["user_id"]

    authorization = request.headers.get("Authorization")

    # ========================================================
    # CART ORDER
    # ========================================================

    if "items" in request.data:

        items = request.data.get("items")

        if not items:

            return Response(
                {
                    "status": "failed",
                    "message": "Cart is empty",
                    "data": None
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        created_orders = []

        order_ids = []

        total_price = 0

        # ----------------------------------------------------
        # FIRST CHECK ALL PRODUCTS AND STOCK
        # ----------------------------------------------------

        checked_items = []

        for item in items:

            product_id = item.get("product_id")

            quantity = item.get("quantity", 1)

            if not product_id:

                return Response(
                    {
                        "status": "failed",
                        "message": "Product ID is required",
                        "data": None
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )

            try:

                quantity = int(quantity)

            except (TypeError, ValueError):

                return Response(
                    {
                        "status": "failed",
                        "message": "Quantity must be a valid number",
                        "data": None
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )

            if quantity <= 0:

                return Response(
                    {
                        "status": "failed",
                        "message": "Quantity must be greater than 0",
                        "data": None
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )

            product_data, error_response = get_product(
                product_id,
                authorization
            )

            if error_response:

                return error_response

            available_stock = int(
                product_data.get("stock", 0)
            )

            if available_stock < quantity:

                return Response(
                    {
                        "status": "failed",
                        "message": "Insufficient stock",
                        "data": {
                            "product_id": product_id,
                            "available_stock": available_stock,
                            "requested_quantity": quantity
                        }
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )

            checked_items.append(
                {
                    "product_id": product_id,
                    "quantity": quantity,
                    "product": product_data
                }
            )

            total_price += (
                float(product_data["price"]) * quantity
            )

        # ----------------------------------------------------
        # DECREASE STOCK + CREATE ORDERS
        # ----------------------------------------------------

        for item in checked_items:

            product_id = item["product_id"]

            quantity = item["quantity"]

            product_data = item["product"]

            stock_updated, stock_response = update_stock(
                product_id,
                quantity,
                "decrease",
                authorization
            )

            if not stock_updated:

                return Response(
                    {
                        "status": "failed",
                        "message": stock_response.get(
                            "message",
                            "Unable to update product stock"
                        ),
                        "data": stock_response.get("data")
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )

            order_data = {

                "user_id": user["user_id"],

                "product_id": product_id,

                "quantity": quantity,

                "address": request.data.get(
                    "address"
                ),

                "city": request.data.get(
                    "city"
                ),

                "phone": request.data.get(
                    "phone"
                ),

                "pincode": request.data.get(
                    "pincode"
                )
            }

            serializer = OrderSerializer(
                data=order_data
            )

            if serializer.is_valid():

                serializer.save()

                created_orders.append(
                    serializer.data
                )

                order_ids.append(
                    serializer.data["id"]
                )

            else:

                # Rollback stock if order creation fails
                update_stock(
                    product_id,
                    quantity,
                    "increase",
                    authorization
                )

                return Response(
                    {
                        "status": "failed",
                        "message": "Order validation failed",
                        "data": serializer.errors
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )

        return success_response(
            message="Cart order placed successfully",
            data={
                "orders": created_orders,
                "order_ids": order_ids,
                "total_price": total_price
            },
            status_code=201
        )

    # ========================================================
    # BUY NOW ORDER
    # ========================================================

    product_id = request.data.get("product_id")

    quantity = request.data.get(
        "quantity",
        1
    )

    if not product_id:

        return Response(
            {
                "status": "failed",
                "message": "Product ID is required",
                "data": None
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    try:

        quantity = int(quantity)

    except (TypeError, ValueError):

        return Response(
            {
                "status": "failed",
                "message": "Quantity must be a valid number",
                "data": None
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    if quantity <= 0:

        return Response(
            {
                "status": "failed",
                "message": "Quantity must be greater than 0",
                "data": None
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    # --------------------------------------------------------
    # GET PRODUCT
    # --------------------------------------------------------

    product_data, error_response = get_product(
        product_id,
        authorization
    )

    if error_response:

        return error_response

    available_stock = int(
        product_data.get("stock", 0)
    )

    if available_stock < quantity:

        return Response(
            {
                "status": "failed",
                "message": "Insufficient stock",
                "data": {
                    "product_id": product_id,
                    "available_stock": available_stock,
                    "requested_quantity": quantity
                }
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    # --------------------------------------------------------
    # DECREASE STOCK
    # --------------------------------------------------------

    stock_updated, stock_response = update_stock(
        product_id,
        quantity,
        "decrease",
        authorization
    )

    if not stock_updated:

        return Response(
            {
                "status": "failed",
                "message": stock_response.get(
                    "message",
                    "Unable to update product stock"
                ),
                "data": stock_response.get("data")
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    # --------------------------------------------------------
    # CREATE ORDER
    # --------------------------------------------------------

    serializer = OrderSerializer(
        data=data
    )

    if serializer.is_valid():

        serializer.save()

        return success_response(
            message="Order placed successfully",
            data={
                **serializer.data,
                "total_price": product_data["price"]
            },
            status_code=201
        )

    # --------------------------------------------------------
    # ROLLBACK STOCK
    # --------------------------------------------------------

    update_stock(
        product_id,
        quantity,
        "increase",
        authorization
    )

    return Response(
        {
            "status": "failed",
            "message": "Validation failed",
            "data": serializer.errors
        },
        status=status.HTTP_400_BAD_REQUEST
    )


# ============================================================
# ORDER LIST
# ============================================================

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

        if sort in [
            "created_at",
            "-created_at"
        ]:

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

        product_data, error_response = get_product(
            order["product_id"],
            request.headers.get("Authorization")
        )

        if error_response:

            product_data = None

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


# ============================================================
# ORDER DETAIL
# ============================================================

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

        raise NotFoundException(
            "Order not found"
        )

    product_data, error_response = get_product(
        order.product_id,
        request.headers.get("Authorization")
    )

    if error_response:

        product_data = None

    serializer = OrderSerializer(order)

    data = {
        **serializer.data,
        "product": product_data
    }

    return success_response(
        message="Order fetched successfully",
        data=data
    )


# ============================================================
# CANCEL ORDER - CUSTOMER
# ============================================================

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

        raise NotFoundException(
            "Order not found"
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

    # --------------------------------------------------------
    # INCREASE STOCK
    # --------------------------------------------------------

    stock_updated, stock_response = update_stock(
        order.product_id,
        order.quantity,
        "increase",
        request.headers.get("Authorization")
    )

    if not stock_updated:

        return Response(
            {
                "status": "failed",
                "message": stock_response.get(
                    "message",
                    "Unable to restore product stock"
                ),
                "data": stock_response.get("data")
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


# ============================================================
# UPDATE ORDER STATUS
# ============================================================

@api_view(["PUT"])
def update_order_status(request, id):

    try:

        order = Order.objects.get(
            id=id
        )

    except Order.DoesNotExist:

        raise NotFoundException(
            "Order not found"
        )

    new_status = request.data.get(
        "status"
    )

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

    # --------------------------------------------------------
    # IF ADMIN CHANGES ORDER TO CANCELLED
    # --------------------------------------------------------

    if (
        new_status == "Cancelled"
        and order.status != "Cancelled"
    ):

        stock_updated, stock_response = update_stock(
            order.product_id,
            order.quantity,
            "increase",
            request.headers.get("Authorization")
        )

        if not stock_updated:

            return Response(
                {
                    "status": "failed",
                    "message": stock_response.get(
                        "message",
                        "Unable to restore product stock"
                    ),
                    "data": stock_response.get("data")
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


# ============================================================
# ORDER STATISTICS
# ============================================================

@api_view(["GET"])
def order_statistics(request):

    user = get_user_info(request)

    user_id = user["user_id"]

    orders = Order.objects.filter(
        user_id=user_id
    )

    if not orders.exists():

        raise NotFoundException(
            "No orders found"
        )

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
        message="Order statistics fetched successfully",
        data=data
    )


# ============================================================
# ADMIN ORDER LIST
# ============================================================

@api_view(["GET"])
def admin_order_list(request):

    orders = Order.objects.all().order_by(
        "-created_at"
    )

    # SEARCH

    search = request.GET.get(
        "search"
    )

    if search:

        orders = orders.filter(
            Q(id__icontains=search) |
            Q(user_id__icontains=search) |
            Q(product_id__icontains=search)
        )

    # STATUS FILTER

    status_filter = request.GET.get(
        "status"
    )

    if status_filter:

        orders = orders.filter(
            status__iexact=status_filter
        )

    # SORTING

    sort = request.GET.get(
        "sort"
    )

    if sort:

        if sort in [
            "created_at",
            "-created_at"
        ]:

            orders = orders.order_by(
                sort
            )

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

        page_obj = paginator.page(
            page
        )

    except EmptyPage:

        raise NotFoundException(
            "Page does not exist"
        )

    serializer = OrderSerializer(
        page_obj,
        many=True
    )

    orders_data = []

    # PRODUCT DETAILS

    for order in serializer.data:

        product_data, error_response = get_product(
            order["product_id"],
            request.headers.get(
                "Authorization"
            )
        )

        if error_response:

            product_data = None

        order["product"] = product_data

        # PAYMENT STATUS

        payment_status = "pending"

        payment_order = (
            PaymentOrder.objects
            .select_related("payment")
            .filter(
                order_id=order["id"]
            )
            .first()
        )

        if payment_order:

            payment_status = (
                payment_order.payment.status
            )

        order["payment_status"] = payment_status

        orders_data.append(
            order
        )

    return success_response(
        message="All orders fetched successfully",
        data={
            "current_page": page_obj.number,
            "total_pages": paginator.num_pages,
            "total_orders": paginator.count,
            "orders": orders_data
        }
    )


# ============================================================
# ADMIN ORDER DETAIL
# ============================================================

@api_view(["GET"])
def admin_order_detail(request, id):

    try:

        order = Order.objects.get(
            id=id
        )

    except Order.DoesNotExist:

        raise NotFoundException(
            "Order not found"
        )

    serializer = OrderSerializer(order)

    return success_response(
        message="Order fetched successfully",
        data=serializer.data
    )


# ============================================================
# ADMIN ORDER STATISTICS
# ============================================================

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


# ============================================================
# ADMIN CANCEL ORDER
# ============================================================

@api_view(["PUT"])
def admin_cancel_order(request, id):

    try:

        order = Order.objects.get(
            id=id
        )

    except Order.DoesNotExist:

        raise NotFoundException(
            "Order not found"
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

    # --------------------------------------------------------
    # RESTORE STOCK
    # --------------------------------------------------------

    stock_updated, stock_response = update_stock(
        order.product_id,
        order.quantity,
        "increase",
        request.headers.get("Authorization")
    )

    if not stock_updated:

        return Response(
            {
                "status": "failed",
                "message": stock_response.get(
                    "message",
                    "Unable to restore product stock"
                ),
                "data": stock_response.get("data")
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


# ============================================================
# HEALTH CHECK
# ============================================================

def health_check(request):

    return JsonResponse(
        {
            "status": "ok",
            "service": "order-service"
        }
    )


# ============================================================
# DELETE ADMIN ORDER
# ============================================================

@api_view(["DELETE"])
def delete_order(request, id):

    try:

        order = Order.objects.get(
            id=id
        )

    except Order.DoesNotExist:

        raise NotFoundException(
            "Order not found"
        )

    # Delete payment-order mapping

    PaymentOrder.objects.filter(
        order_id=order.id
    ).delete()

    # Delete order

    order.delete()

    return success_response(
        message="Order deleted successfully",
        data={
            "order_id": id
        }
    )

