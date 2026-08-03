from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.conf import settings
from ecommerce_common.utils import get_user_info
import stripe

from .models import Payment


@api_view(["GET"])
def payment_health(request):
    return Response({
        "success": True,
        "message": "Payment Service Working"
    })


@api_view(["POST"])
def create_payment_intent(request):

    # Logged in user
    user = get_user_info(request)

    amount = request.data.get("amount")
    currency = request.data.get("currency", "usd")
    order_id = request.data.get("order_id")

    if not amount:
        return Response(
            {
                "success": False,
                "message": "Amount is required"
            },
            status=400
        )

    if not order_id:
        return Response(
            {
                "success": False,
                "message": "Order ID is required"
            },
            status=400
        )

    stripe.api_key = settings.STRIPE_SECRET_KEY

    try:

        intent = stripe.PaymentIntent.create(
            amount=int(float(amount) * 100),
            currency=currency,
        )

        payment = Payment.objects.create(
            user_id=user["user_id"],
            order_id=order_id,
            amount=amount,
            currency=currency,
            stripe_payment_intent_id=intent.id,
            status="pending"
        )

        return Response({
            "success": True,
            "message": "Payment Intent Created Successfully",
            "payment_id": payment.id,
            "client_secret": intent.client_secret,
            "payment_intent_id": intent.id
        })

    except Exception as e:
        return Response(
            {
                "success": False,
                "error": str(e)
            },
            status=500
        )

@api_view(["GET"])
def payment_list(request):

    user = get_user_info(request)

    payments = Payment.objects.filter(
        user_id=user["user_id"]
    ).order_by("-created_at")

    data = []

    for payment in payments:
        data.append({
            "id": payment.id,
            "order_id": payment.order_id,
            "amount": str(payment.amount),
            "currency": payment.currency,
            "status": payment.status,
            "created_at": payment.created_at,
        })

    return Response({
        "success": True,
        "message": "Payments fetched successfully",
        "data": data
    })  