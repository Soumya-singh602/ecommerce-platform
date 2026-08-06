from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.conf import settings
from ecommerce_common.utils import get_user_info
import stripe

from .models import Payment, PaymentOrder , PaymentCustomer
from orders.models import Order

from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse



@api_view(["GET"])
def payment_health(request):

    return Response({
        "success": True,
        "message": "Payment Service Working"
    })



@api_view(["POST"])
def create_payment_intent(request):

    user = get_user_info(request)

    print("USER INFO FROM PAYMENT:", user)


    amount = request.data.get("amount")
    currency = request.data.get("currency", "usd")

    order_id = request.data.get("order_id")
    order_ids = request.data.get("order_ids")


    if not amount:

        return Response(
            {
                "success": False,
                "message": "Amount is required"
            },
            status=400
        )


    if not order_id and not order_ids:

        return Response(
            {
                "success": False,
                "message": "Order ID(s) are required"
            },
            status=400
        )


    stripe.api_key = settings.STRIPE_SECRET_KEY


    try:

        intent = stripe.PaymentIntent.create(

            amount=int(float(amount) * 100),

            currency=currency

        )


        payment = Payment.objects.create(

            user_id=user["user_id"],

            order_id=order_id if order_id else order_ids[0],

            amount=amount,

            currency=currency,

            stripe_payment_intent_id=intent.id,

            status="pending"

        )


        if order_id:

            PaymentOrder.objects.create(

                payment=payment,

                order_id=order_id

            )


        if order_ids:

            for oid in order_ids:

                PaymentOrder.objects.create(

                    payment=payment,

                    order_id=oid

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


        linked_orders = PaymentOrder.objects.filter(

            payment=payment

        ).values_list(

            "order_id",

            flat=True

        )


        data.append({

            "id": payment.id,

            "order_id": payment.order_id,

            "order_ids": list(linked_orders),

            "amount": str(payment.amount),

            "currency": payment.currency,

            "status": payment.status,

            "created_at": payment.created_at

        })


    return Response({

        "success": True,

        "message": "Payments fetched successfully",

        "data": data

    })





@api_view(["GET"])
def admin_payment_list(request):


    payments = Payment.objects.all().order_by("-created_at")


    data = []


    for payment in payments:


        linked_orders = PaymentOrder.objects.filter(

            payment=payment

        ).values_list(

            "order_id",

            flat=True

        )


        data.append({

            "id": payment.id,

            "user_id": payment.user_id,

            "order_id": payment.order_id,

            "order_ids": list(linked_orders),

            "amount": str(payment.amount),

            "currency": payment.currency,

            "status": payment.status,

            "created_at": payment.created_at

        })


    return Response({

        "success": True,

        "message": "All payments fetched successfully",

        "data": data

    })





@csrf_exempt
def stripe_webhook(request):


    if request.method != "POST":

        return HttpResponse(
            "Method Not Allowed",
            status=405
        )


    stripe.api_key = settings.STRIPE_SECRET_KEY


    payload = request.body

    sig_header = request.META.get(
        "HTTP_STRIPE_SIGNATURE"
    )


    try:

        event = stripe.Webhook.construct_event(

            payload,

            sig_header,

            settings.STRIPE_WEBHOOK_SECRET

        )


    except ValueError as e:

        print("INVALID PAYLOAD:", e)

        return HttpResponse(status=400)


    except stripe.error.SignatureVerificationError as e:

        print("INVALID SIGNATURE:", e)

        return HttpResponse(status=400)



    print(
        "EVENT TYPE:",
        event["type"]
    )



    # SUCCESS PAYMENT

    if event["type"] == "payment_intent.succeeded":


        payment_intent = event["data"]["object"]

        stripe_payment_intent_id = payment_intent["id"]


        try:


            payment = Payment.objects.get(

                stripe_payment_intent_id=stripe_payment_intent_id

            )


            payment.status = "paid"

            payment.save()



            for item in PaymentOrder.objects.filter(payment=payment):


                order = Order.objects.get(

                    id=item.order_id

                )


                order.status = "Confirmed"

                order.save()



            print(
                "PAYMENT SUCCESS:",
                payment.id
            )


        except Payment.DoesNotExist:


            print(
                "PAYMENT NOT FOUND:",
                stripe_payment_intent_id
            )



    # FAILED PAYMENT

    elif event["type"] == "payment_intent.payment_failed":


        payment_intent = event["data"]["object"]

        stripe_payment_intent_id = payment_intent["id"]


        try:


            payment = Payment.objects.get(

                stripe_payment_intent_id=stripe_payment_intent_id

            )


            payment.status = "failed"

            payment.save()



            for item in PaymentOrder.objects.filter(payment=payment):


                order = Order.objects.get(

                    id=item.order_id

                )


                order.status = "Failed"

                order.save()



            print(
                "PAYMENT FAILED:",
                payment.id
            )


        except Payment.DoesNotExist:


            print(
                "PAYMENT NOT FOUND:",
                stripe_payment_intent_id
            )



    return HttpResponse(
        status=200
    )

@api_view(["POST"])
def create_stripe_customer(request):

    user = get_user_info(request)

    stripe.api_key = settings.STRIPE_SECRET_KEY


    existing_customer = PaymentCustomer.objects.filter(
        user_id=user["user_id"]
    ).first()


    if existing_customer:

        return Response({
            "success": True,
            "customer_id": existing_customer.stripe_customer_id
        })


    customer = stripe.Customer.create(
        email=user["user_email"]
    )


    PaymentCustomer.objects.create(

        user_id=user["user_id"],

        stripe_customer_id=customer.id

    )


    return Response({

        "success": True,

        "customer_id": customer.id

    })

@api_view(["POST"])
def create_setup_intent(request):

    user = get_user_info(request)

    stripe.api_key = settings.STRIPE_SECRET_KEY


    customer = PaymentCustomer.objects.filter(
        user_id=user["user_id"]
    ).first()


    if not customer:

        return Response(
            {
                "success": False,
                "message": "Stripe customer not found"
            },
            status=400
        )


    try:

        setup_intent = stripe.SetupIntent.create(

            customer=customer.stripe_customer_id,

            payment_method_types=[
                "card"
            ]

        )


        return Response({

            "success": True,

            "client_secret": setup_intent.client_secret

        })


    except Exception as e:

        return Response({

            "success": False,

            "error": str(e)

        }, status=500)