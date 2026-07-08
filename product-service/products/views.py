from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view 
from rest_framework.response import Response
from rest_framework import status
from .authentication import UserServiceAuthentication
from rest_framework.decorators import authentication_classes

from .models import Product
from .serializers import ProductSerializer
from django.db.models import Q




# CREATE PRODUCT
@api_view(["POST"])
@authentication_classes([UserServiceAuthentication])
def create_product(request):

    serializer = ProductSerializer(data=request.data)

    if serializer.is_valid():

        serializer.save()

        return Response(
            {
                "status": "success",
                "message": "Product created successfully",
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
#PRODUCT LIST
@api_view(["GET"])
@authentication_classes([UserServiceAuthentication])
def product_list(request):

    products = Product.objects.all()

    search = request.GET.get("search")

    if search:

        products = products.filter(
            Q(name__icontains=search) |
            Q(description__icontains=search)
        )

    serializer = ProductSerializer(products, many=True)

    return Response(
        {
            "status": "success",
            "message": "Products fetched successfully",
            "data": serializer.data
        },
        status=status.HTTP_200_OK
    )
    
#PRODUCT DETAILS
@api_view(["GET"])
@authentication_classes([UserServiceAuthentication])
def product_detail(request, id):

    try:
      product = Product.objects.get(id=id)

    except Product.DoesNotExist:

        return Response(
        {
            "status": "failed",
            "message": "Product not found",
            "data": None
        },
        status=status.HTTP_404_NOT_FOUND
    )

    serializer = ProductSerializer(product)

    return Response(
        {
            "status": "success",
            "message": "Product fetched successfully",
            "data": serializer.data
        },
        status=status.HTTP_200_OK
    )

#UPDATE PRODUCT
@api_view(["PUT"])
@authentication_classes([UserServiceAuthentication])
def update_product(request, id):

    try:
      product = Product.objects.get(id=id)

    except Product.DoesNotExist:

        return Response(
        {
            "status": "failed",
            "message": "Product not found",
            "data": None
        },
        status=status.HTTP_404_NOT_FOUND
    )
    serializer = ProductSerializer(
        product,
        data=request.data
    )

    if serializer.is_valid():

        serializer.save()

        return Response(
            {
                "status": "success",
                "message": "Product updated successfully",
                "data": serializer.data
            },
            status=status.HTTP_200_OK
        )

    return Response(
        {
            "status": "failed",
            "message": "Validation failed",
            "data": serializer.errors
        },
        status=status.HTTP_400_BAD_REQUEST
    )
#DELETE PRODUCT
@api_view(["DELETE"])
@authentication_classes([UserServiceAuthentication])
def delete_product(request, id):

    try:
     product = Product.objects.get(id=id)

    except Product.DoesNotExist:

     return Response(
        {
            "status": "failed",
            "message": "Product not found",
            "data": None
        },
        status=status.HTTP_404_NOT_FOUND
    )

    product.delete()

    return Response(
        {
            "status": "success",
            "message": "Product deleted successfully",
            "data": None
        },
        status=status.HTTP_200_OK
    )