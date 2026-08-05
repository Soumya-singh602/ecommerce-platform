from django.urls import path
from . import views

urlpatterns = [
    path("health/", views.payment_health),
    path("create-payment-intent/", views.create_payment_intent),
    path("list/", views.payment_list),

    path(
        "webhook/",
        views.stripe_webhook,
        name="stripe-webhook"
    ),

    path(
    "admin/list/",
    views.admin_payment_list,
    name="admin-payment-list"
),
]