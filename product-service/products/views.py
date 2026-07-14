from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view 
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from django.core.paginator import Paginator , EmptyPage

from .models import Product
from .serializers import ProductSerializer
from django.db.models import Q
from ecommerce_common.response import success_response
from ecommerce_common.exceptions import NotFoundException
from ecommerce_common.utils import get_user_info





# CREATE PRODUCT
@api_view(["POST"])
def create_product(request):

    user = get_user_info(request)

    print("User ID :", user["user_id"])
    print("User Email :", user["user_email"])

    serializer = ProductSerializer(data=request.data)

    if serializer.is_valid():

        serializer.save()

        return success_response(
               message="Product Created Successfully",
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

# PRODUCT LIST
@api_view(["GET"])
def product_list(request):
    user = get_user_info(request)

    print(user["user_id"])
    print(user["user_email"])

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

     raise NotFoundException("No products found")
    # PAGINATION
    page = request.GET.get("page", 1)

    paginator = Paginator(products, 5)


    try:

       page_obj = paginator.page(page)

    except EmptyPage:

        raise NotFoundException("Page does not exist")

    serializer = ProductSerializer(page_obj, many=True)

    return success_response(
    message="Products fetched successfully",
    data={
        "current_page": page_obj.number,
        "total_pages": paginator.num_pages,
        "total_products": paginator.count,
        "products": serializer.data,
    }
)
    
#PRODUCT DETAILS
@api_view(["GET"])
def product_detail(request, id):
    user = get_user_info(request)

    print(user["user_id"])

    try:
      product = Product.objects.get(id=id)

    except Product.DoesNotExist:
      raise NotFoundException("Product not found")

    serializer = ProductSerializer(product)

    return success_response(
      message="Product fetched successfully",
      data=serializer.data
)

#UPDATE PRODUCT
@api_view(["PUT"])
def update_product(request, id):
    user = get_user_info(request)

    print(user["user_id"])

    try:
      product = Product.objects.get(id=id)

    except Product.DoesNotExist:
     raise NotFoundException("Product not found")
    
    serializer = ProductSerializer(
        product,
        data=request.data
    )

    if serializer.is_valid():

        serializer.save()

        return success_response(
         message="Product updated successfully",
         data=serializer.data
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
def delete_product(request, id):
    user = get_user_info(request)

    print(user["user_id"])

    try:
        product = Product.objects.get(id=id)

    except Product.DoesNotExist:

        raise NotFoundException(
        "Product not found"
    )

    product.delete()

    return success_response(
        message="Product deleted successfully",
        data={
            "product_id": id
        }
    )