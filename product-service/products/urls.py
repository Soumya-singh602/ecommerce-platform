from django.urls import path
from .views import create_product, product_list, product_detail

urlpatterns = [
     path("", product_list, name="product-list"),
    path("create/", create_product, name="create-product"),
     path("<int:id>/", product_detail, name="product-detail"),
]
