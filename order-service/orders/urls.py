from django.urls import path
from .views import place_order , order_list , order_detail, cancel_order,update_order_status , order_statistics , admin_order_list

urlpatterns = [

    path("create/", place_order, name="place-order"),
     path("", order_list, name="order-list"),
     path("<int:id>/", order_detail, name="order-detail"),
      path("<int:id>/cancel/",cancel_order,name="cancel-order"),
      path("<int:id>/status/",update_order_status,name="update-order-status"),
      path("stats/",order_statistics),
     path( "admin/",admin_order_list,name="admin-order-list",),




]