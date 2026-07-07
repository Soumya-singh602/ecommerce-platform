from django.urls import path
from .views import create_product

urlpatterns = [
    path("", create_product, name="create-product"),
]
