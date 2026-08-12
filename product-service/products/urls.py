from django.urls import path

from .views import (
    create_product,
    product_list,
    product_detail,
    update_product,
    delete_product,
    health_check,
    category_list,
    banner_detail,
    banner_list,
    create_banner,
    update_banner,
    delete_banner,
    product_reviews,
    review_detail,
)


urlpatterns = [

    # Products
    path("", product_list, name="product-list"),
    path("create/", create_product, name="create-product"),

    path("<int:id>/", product_detail, name="product-detail"),
    path("<int:id>/update/", update_product, name="update-product"),
    path("<int:id>/delete/", delete_product, name="delete-product"),


    # Categories
    path("categories/", category_list, name="categories"),


    # Customer Banner
    path("banner/", banner_detail, name="banner"),


    # Admin Banner CRUD
    path("banners/", banner_list, name="banner-list"),
    path("banners/create/", create_banner, name="create-banner"),
    path("banners/<int:id>/update/", update_banner, name="update-banner"),
    path("banners/<int:id>/delete/", delete_banner, name="delete-banner"),


    # Product Reviews
    path(
        "<int:product_id>/reviews/",
        product_reviews,
        name="product-reviews",
    ),

    path(
        "reviews/<int:review_id>/",
        review_detail,
        name="review-detail",
    ),


    # Health
    path("health/", health_check, name="health"),
]