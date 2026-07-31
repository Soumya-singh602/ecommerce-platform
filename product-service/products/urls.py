from django.urls import path
from .views import create_product, product_list, product_detail,update_product , delete_product , health_check

urlpatterns = [
     path("", product_list, name="product-list"),
    path("create/", create_product, name="create-product"),
     path("<int:id>/", product_detail, name="product-detail"),
      path("<int:id>/update/", update_product, name="update-product"),
      path("<int:id>/delete/", delete_product, name="delete-product"),
       path("health/", health_check),
]
