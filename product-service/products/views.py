from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view 
from rest_framework.response import Response
from rest_framework import status
from .authentication import UserServiceAuthentication
from rest_framework.decorators import authentication_classes

from .models import Product
from .serializers import ProductSerializer

from django.shortcuts import get_object_or_404



@api_view(["POST"])
@authentication_classes([UserServiceAuthentication])
def create_product(request):

    serializer = ProductSerializer(data=request.data)

    if serializer.is_valid():

        serializer.save()

        return Response(
            {
                "message": "Product Created Successfully",
                "data": serializer.data
            },
            status=status.HTTP_201_CREATED
        )

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET"])
@authentication_classes([UserServiceAuthentication])
def product_list(request):

    products = Product.objects.all()

    serializer = ProductSerializer(products, many=True)

    return Response(serializer.data)

@api_view(["GET"])
@authentication_classes([UserServiceAuthentication])
def product_detail(request, id):

    product = get_object_or_404(Product, id=id)

    serializer = ProductSerializer(product)

    return Response(serializer.data)


@api_view(["PUT"])
@authentication_classes([UserServiceAuthentication])
def update_product(request, id):

    product = get_object_or_404(Product, id=id)

    serializer = ProductSerializer(
        product,
        data=request.data
    )

    if serializer.is_valid():

        serializer.save()

        return Response(
            {
                "message": "Product Updated Successfully",
                "data": serializer.data
            },
            status=status.HTTP_200_OK
        )

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )

@api_view(["DELETE"])
@authentication_classes([UserServiceAuthentication])
def delete_product(request, id):

    product = get_object_or_404(Product, id=id)

    product.delete()

    return Response(
        {
            "message": "Product Deleted Successfully"
        },
        status=status.HTTP_200_OK
    )