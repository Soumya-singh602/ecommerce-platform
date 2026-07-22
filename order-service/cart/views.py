from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view, authentication_classes
from rest_framework.response import Response
from rest_framework import status

from authentication.authentication import UserServiceAuthentication

from .models import Cart, CartItem
from .serializers import CartItemSerializer


@api_view(["POST"])
@authentication_classes([UserServiceAuthentication])
def add_to_cart(request):

    serializer = CartItemSerializer(data=request.data)

    if not serializer.is_valid():

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

    user_id = request.user["id"]

    cart, created = Cart.objects.get_or_create(
        user_id=user_id
    )

    product_id = serializer.validated_data["product_id"]
    quantity = serializer.validated_data["quantity"]

    cart_item = CartItem.objects.filter(
        cart=cart,
        product_id=product_id
    ).first()

    if cart_item:

        cart_item.quantity += quantity
        cart_item.save()

    else:

        CartItem.objects.create(
            cart=cart,
            product_id=product_id,
            quantity=quantity
        )

    return Response(
        {
            "success": True,
            "message": "Product added to cart"
        },
        status=status.HTTP_201_CREATED
    )