from django.urls import path
from .views import payment_health , create_payment_intent , payment_list

urlpatterns = [
    path("health/", payment_health, name="payment-health"),
    path("create-payment-intent/", create_payment_intent),
    path("", payment_list, name="payment-list"),
]
