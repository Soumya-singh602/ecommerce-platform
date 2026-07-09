from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view 
from rest_framework.response import Response
from rest_framework import status
from .authentication import UserServiceAuthentication
from rest_framework.decorators import authentication_classes
from django.core.paginator import Paginator , EmptyPage

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

# PRODUCT LIST
@api_view(["GET"])
@authentication_classes([UserServiceAuthentication])
def product_list(request):

    products = Product.objects.all()

    search = request.GET.get("search")

    min_price = request.GET.get("min_price")
    max_price = request.GET.get("max_price")

    sort = request.GET.get("sort")
    # SEARCH
    if search:

        products = products.filter(
            Q(name__icontains=search) |
            Q(description__icontains=search)
        )
    # PRICE FILTER
    if min_price:

        products = products.filter(price__gte=min_price)

    if max_price:

        products = products.filter(price__lte=max_price)

    # SORTING
    if sort:

      if sort in ["price", "-price"]:

        products = products.order_by(sort)

      else:

        return Response(
            {
                "status": "failed",
                "message": "Invalid sorting field",
                "data": None
            },
            status=status.HTTP_400_BAD_REQUEST
        )
    
    # CHECK DATA
    if not products.exists():

     return Response(
        {
            "status": "failed",
            "message": "No products found",
            "data": []
        },
        status=status.HTTP_404_NOT_FOUND
    )
    # PAGINATION
    page = request.GET.get("page", 1)

    paginator = Paginator(products, 5)


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


    serializer = ProductSerializer(page_obj, many=True)

    return Response(
        {
            "status": "success",
            "message": "Products fetched successfully",
            "data": {
                      "current_page": page_obj.number,
                      "total_pages": paginator.num_pages,
                      "total_products": paginator.count,
                      "products": serializer.data
                    }
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
    )

# DELETE PRODUCT
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
            "data": {
                "product_id": id
            }
        },
        status=status.HTTP_200_OK
    )