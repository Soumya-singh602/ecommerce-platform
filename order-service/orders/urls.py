from django.urls import path
from .views import place_order , order_list

urlpatterns = [

    path("create/", place_order, name="place-order"),
     path("", order_list, name="order-list"),



]