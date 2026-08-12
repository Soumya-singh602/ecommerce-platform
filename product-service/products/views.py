from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view 
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from django.core.paginator import Paginator , EmptyPage

from .models import Product , Category , Banner , Review
from .serializers import ProductSerializer , CategorySerializer , BannerSerializer , ReviewSerializer
from django.db.models import Q
from ecommerce_common.response import success_response
from ecommerce_common.exceptions import NotFoundException
from ecommerce_common.utils import get_user_info
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.decorators import parser_classes
from django.http import JsonResponse





# CREATE PRODUCT
@api_view(["POST"])
@parser_classes([MultiPartParser, FormParser])
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

    all_products = request.GET.get("all")

    if all_products == "true":

      serializer = ProductSerializer(products, many=True)

      return success_response(
          message="Products fetched successfully",
          data={
            "current_page": 1,
            "total_pages": 1,
            "total_products": products.count(),
            "products": serializer.data,
        }
    )
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
@parser_classes([MultiPartParser, FormParser])
def update_product(request, id):
    user = get_user_info(request)

    print(user["user_id"])

    try:
      product = Product.objects.get(id=id)

    except Product.DoesNotExist:
     raise NotFoundException("Product not found")
    
    serializer = ProductSerializer(
        product,
        data=request.data,
        partial=True

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


def health_check(request):
    return JsonResponse({
        "status": "ok",
        "service": "product-service"
    })

@api_view(["GET"])
def category_list(request):

    user = get_user_info(request)

    print("User ID :", user["user_id"])
    print("User Email :", user["user_email"])


    categories = Category.objects.all()

    serializer = CategorySerializer(
        categories,
        many=True
    )

    return success_response(
        message="Categories fetched successfully",
        data=serializer.data
    )

@api_view(["GET"])
def banner_detail(request):

    banner = Banner.objects.filter(
        is_active=True
    ).first()

    if not banner:

        return Response(
            {
                "success": False,
                "message": "No active banner found",
                "data": None
            },
            status=status.HTTP_404_NOT_FOUND
        )

    serializer = BannerSerializer(banner)

    return success_response(
        message="Banner fetched successfully",
        data=serializer.data
    )

@api_view(["GET"])
def banner_list(request):

    banners = Banner.objects.all().order_by("-created_at")

    serializer = BannerSerializer(
        banners,
        many=True
    )

    return success_response(
        message="Banners fetched successfully",
        data=serializer.data
    )

@api_view(["POST"])
@parser_classes([MultiPartParser, FormParser])
def create_banner(request):
    print("====================")
    print("FILES:", request.FILES)
    print("DATA:", request.data)
    print("IMAGE")
    print(request.FILES.get("image"))
    print("====================")
    serializer = BannerSerializer(data=request.data)

    if serializer.is_valid():

        

        banner = serializer.save()


        print("IMAGE NAME:", banner.image.name)
        print("IMAGE PATH:", banner.image.path)


        return success_response(
            message="Banner created successfully",
            data=serializer.data,
            status_code=201
        )

    return Response(
        {
            "success": False,
            "message": "Validation failed",
            "data": serializer.errors
        },
        status=status.HTTP_400_BAD_REQUEST
    )

@api_view(["PUT"])
@parser_classes([MultiPartParser, FormParser])
def update_banner(request, id):

    try:

        banner = Banner.objects.get(id=id)

    except Banner.DoesNotExist:

        raise NotFoundException(
            "Banner not found"
        )

    serializer = BannerSerializer(
        banner,
        data=request.data,
        partial=True
    )

    if serializer.is_valid():

        serializer.save()

        return success_response(
            message="Banner updated successfully",
            data=serializer.data
        )

    return Response(
        {
            "success": False,
            "message": "Validation failed",
            "data": serializer.errors
        },
        status=status.HTTP_400_BAD_REQUEST
    )

@api_view(["DELETE"])
def delete_banner(request, id):

    try:

        banner = Banner.objects.get(id=id)

    except Banner.DoesNotExist:

        raise NotFoundException(
            "Banner not found"
        )

    banner.delete()

    return success_response(
        message="Banner deleted successfully",
        data={
            "banner_id": id
        }
    )

# ============================================================
# PRODUCT REVIEWS
# ============================================================

@api_view(["GET", "POST"])
def product_reviews(request, product_id):

    user = get_user_info(request)

    print("User ID :", user["user_id"])
    print("User Email :", user["user_email"])

    try:
        product = Product.objects.get(id=product_id)

    except Product.DoesNotExist:
        raise NotFoundException("Product not found")

    # ========================================================
    # GET REVIEWS
    # ========================================================

    if request.method == "GET":

        reviews = Review.objects.filter(
            product=product
        ).select_related("product")

        serializer = ReviewSerializer(
            reviews,
            many=True
        )

        total_reviews = reviews.count()

        if total_reviews > 0:
            average_rating = sum(
                review.rating
                for review in reviews
            ) / total_reviews
        else:
            average_rating = 0

        return success_response(
            message="Reviews fetched successfully",
            data={
                "product_id": product.id,
                "average_rating": round(
                    average_rating,
                    1
                ),
                "total_reviews": total_reviews,
                "reviews": serializer.data,
            }
        )

    # ========================================================
    # CREATE REVIEW
    # ========================================================

    if request.method == "POST":

        # Check if user already reviewed this product

        existing_review = Review.objects.filter(
            product=product,
            user_id=user["user_id"]
        ).first()

        if existing_review:

            return Response(
                {
                    "status": "failed",
                    "message": "You have already reviewed this product.",
                    "data": None,
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = ReviewSerializer(
            data=request.data
        )

        if serializer.is_valid():

            review = serializer.save(
                product=product,
                user_id=user["user_id"]
            )

            return success_response(
                message="Review added successfully",
                data=ReviewSerializer(review).data,
                status_code=201
            )

        return Response(
            {
                "status": "failed",
                "message": "Validation failed",
                "data": serializer.errors,
            },
            status=status.HTTP_400_BAD_REQUEST
        )


# ============================================================
# UPDATE / DELETE REVIEW
# ============================================================

@api_view(["PUT", "PATCH", "DELETE"])
def review_detail(request, review_id):

    user = get_user_info(request)

    user_id = int(user["user_id"])

    print("User ID :", user_id)

    try:
        review = Review.objects.get(
            id=review_id
        )

    except Review.DoesNotExist:
        raise NotFoundException(
            "Review not found"
        )

    # ========================================================
    # CHECK REVIEW OWNER
    # ========================================================

    print("LOGIN USER ID:", user_id)
    print("REVIEW USER ID:", review.user_id)

    if review.user_id != user_id:

        return Response(
            {
                "status": "failed",
                "message": "You can only modify your own review.",
                "data": None,
            },
            status=status.HTTP_403_FORBIDDEN
        )

    # ========================================================
    # DELETE REVIEW
    # ========================================================

    if request.method == "DELETE":

        review.delete()

        return success_response(
            message="Review deleted successfully",
            data={
                "review_id": review_id
            }
        )

    # ========================================================
    # UPDATE REVIEW
    # ========================================================

    serializer = ReviewSerializer(
        review,
        data=request.data,
        partial=True
    )

    if serializer.is_valid():

        serializer.save()

        return success_response(
            message="Review updated successfully",
            data=serializer.data
        )

    return Response(
        {
            "status": "failed",
            "message": "Validation failed",
            "data": serializer.errors,
        },
        status=status.HTTP_400_BAD_REQUEST
    )