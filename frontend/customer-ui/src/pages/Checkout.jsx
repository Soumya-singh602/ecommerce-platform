
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  Elements,
  useStripe,
  useElements,
  CardNumberElement,
} from "@stripe/react-stripe-js";

import stripePromise from "../config/stripe";

import MainLayout from "../layouts/MainLayout";
import Breadcrumb from "../components/shop/Breadcrumb";
import BillingForm from "../components/checkout/BillingForm";
import PaymentMethod from "../components/checkout/PaymentMethod";
import CheckoutSummary from "../components/checkout/CheckoutSummary";

import { placeOrder } from "../services/orderService";

import {
  createPaymentIntent,
  getSavedCards,
  saveCard,
} from "../services/paymentService";


function Checkout() {

  const location = useLocation();
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);

  const [paymentType, setPaymentType] = useState("cod");

  const [savedCards, setSavedCards] = useState([]);

  const [selectedCard, setSelectedCard] = useState(null);

  const [loadingCards, setLoadingCards] = useState(true);


  const {
    product,
    quantity,
    cartItems,
  } = location.state || {};


  console.log(
    "CHECKOUT STATE:",
    location.state
  );


  // ============================================================
  // LOAD SAVED CARDS
  // ============================================================

  useEffect(() => {

    const fetchSavedCards = async () => {

      try {

        setLoadingCards(true);

        const response =
          await getSavedCards();

        console.log(
          "SAVED CARDS RESPONSE:",
          response
        );


        if (response?.success) {

          const cards =
            response.data || [];


          setSavedCards(cards);


          if (cards.length > 0) {

            const defaultCard =
              cards.find(
                (card) =>
                  card.is_default === true
              ) || cards[0];


            setSelectedCard(
              defaultCard
            );

            setPaymentType(
              "saved"
            );

          }

        }

      }

      catch (error) {

        console.log(
          "SAVED CARDS ERROR:",
          error
        );

        setSavedCards([]);

      }

      finally {

        setLoadingCards(false);

      }

    };


    fetchSavedCards();

  }, []);


  // ============================================================
  // PAYMENT TYPE CHANGE
  // ============================================================

  const handlePaymentTypeChange = (type) => {

    setPaymentType(type);


    if (type !== "saved") {

      setSelectedCard(null);

    }

  };


  // ============================================================
  // CONFIRM STRIPE PAYMENT
  // ============================================================

  const confirmStripePayment = async (
    clientSecret,
    paymentMethodId
  ) => {

    if (!stripe) {

      throw new Error(
        "Stripe is not loaded"
      );

    }


    console.log(
      "CONFIRMING STRIPE PAYMENT:",
      {
        paymentMethodId,
      }
    );


    const result =
      await stripe.confirmCardPayment(

        clientSecret,

        {
          payment_method:
            paymentMethodId,
        }

      );


    console.log(
      "STRIPE CONFIRM RESULT:",
      result
    );


    // ============================================================
    // STRIPE PAYMENT ERROR
    // ============================================================

    if (result.error) {

      console.log(
        "STRIPE PAYMENT ERROR:",
        result.error
      );


      throw new Error(
        result.error.message ||
        "Payment failed"
      );

    }


    if (!result.paymentIntent) {

      throw new Error(
        "Payment Intent response missing"
      );

    }


    console.log(
      "PAYMENT INTENT STATUS:",
      result.paymentIntent.status
    );


    // ============================================================
    // PAYMENT MUST BE SUCCESSFUL
    // ============================================================

    if (
      result.paymentIntent.status !==
      "succeeded"
    ) {

      throw new Error(
        "Payment not completed. Stripe status: " +
        result.paymentIntent.status
      );

    }


    return result.paymentIntent;

  };


  // ============================================================
  // PLACE ORDER
  // ============================================================

  const handlePlaceOrder = async () => {

    try {

      setLoading(true);


      // ========================================================
      // STRIPE CHECK
      // ========================================================

      if (
        paymentType === "saved" ||
        paymentType === "new-card"
      ) {

        if (!stripe) {

          alert(
            "Stripe is not loaded"
          );

          return;

        }

      }


      // ========================================================
      // SAVED CARD VALIDATION
      // ========================================================

      if (
        paymentType === "saved"
      ) {

        if (!selectedCard) {

          alert(
            "Please select a saved card"
          );

          return;

        }


        if (
          !selectedCard.payment_method_id
        ) {

          alert(
            "Selected card is invalid"
          );

          return;

        }

      }


      // ========================================================
      // NEW CARD VALIDATION
      // ========================================================

      let cardNumber = null;


      if (
        paymentType === "new-card"
      ) {

        if (!elements) {

          alert(
            "Stripe Elements is not loaded"
          );

          return;

        }


        cardNumber =
          elements.getElement(
            CardNumberElement
          );


        if (!cardNumber) {

          alert(
            "Please enter card details"
          );

          return;

        }

      }


      // ========================================================
      // ORDER DATA
      // ========================================================

      let orderData;


      // BUY NOW

      if (product) {

        orderData = {

          product_id:
            product.id,

          quantity:
            quantity || 1,

        };

      }


      // CART

      else if (cartItems) {

        orderData = {

          items:

            cartItems.map(
              (item) => ({

                product_id:
                  item.id,

                quantity:
                  item.quantity || 1,

              })
            ),

        };

      }


      else {

        alert(
          "No product found"
        );

        return;

      }


      console.log(
        "ORDER DATA:",
        orderData
      );


      // ========================================================
      // CREATE ORDER
      // ========================================================

      const orderResponse =
        await placeOrder(
          orderData
        );


      console.log(
        "ORDER RESPONSE:",
        orderResponse
      );


      if (
        !orderResponse?.success
      ) {

        throw new Error(
          orderResponse?.message ||
          "Order creation failed"
        );

      }


      // ========================================================
      // PAYMENT DATA
      // ========================================================

      let paymentData;


      if (product) {

        paymentData = {

          order_id:
            orderResponse.data.id,

          amount:
            orderResponse.data.total_price,

          currency:
            "usd",

        };

      }

      else {

        paymentData = {

          order_ids:
            orderResponse.data.order_ids,

          amount:
            orderResponse.data.total_price,

          currency:
            "usd",

        };

      }


      // ========================================================
      // SAVED CARD PAYMENT
      // ========================================================

      if (
        paymentType === "saved"
      ) {

        console.log(
          "USING SAVED CARD:",
          selectedCard
        );


        const paymentResponse =
          await createPaymentIntent({

            ...paymentData,

            payment_method:
              selectedCard.payment_method_id,

          });


        console.log(
          "SAVED CARD PAYMENT RESPONSE:",
          paymentResponse
        );


        if (
          !paymentResponse?.success
        ) {

          throw new Error(
            paymentResponse?.error ||
            paymentResponse?.message ||
            "Payment Intent creation failed"
          );

        }


        const paymentIntent =
          await confirmStripePayment(

            paymentResponse.client_secret,

            selectedCard.payment_method_id

          );


        console.log(
          "SAVED CARD PAYMENT SUCCESS:",
          paymentIntent
        );

      }


      // ========================================================
      // NEW CARD PAYMENT
      // ========================================================

      else if (
        paymentType === "new-card"
      ) {


        // ------------------------------------------------------
        // CREATE PAYMENT METHOD
        // ------------------------------------------------------

        const {
          error,
          paymentMethod,
        } =
          await stripe.createPaymentMethod({

            type: "card",

            card: cardNumber,

          });


        if (error) {

          console.log(
            "CREATE PAYMENT METHOD ERROR:",
            error
          );


          throw new Error(
            error.message
          );

        }


        console.log(
          "NEW PAYMENT METHOD:",
          paymentMethod
        );


        // ------------------------------------------------------
        // CREATE PAYMENT INTENT
        // ------------------------------------------------------

        /*
         IMPORTANT:

         Card ko payment se pehle save nahi kar rahe.

         Pehle PaymentIntent create hoga.
        */

        const paymentResponse =
          await createPaymentIntent({

            ...paymentData,

            payment_method:
              paymentMethod.id,

          });


        console.log(
          "NEW CARD PAYMENT RESPONSE:",
          paymentResponse
        );


        if (
          !paymentResponse?.success
        ) {

          throw new Error(
            paymentResponse?.error ||
            paymentResponse?.message ||
            "Payment Intent creation failed"
          );

        }


        // ------------------------------------------------------
        // CONFIRM PAYMENT
        // ------------------------------------------------------

        const paymentIntent =
          await confirmStripePayment(

            paymentResponse.client_secret,

            paymentMethod.id

          );


        console.log(
          "NEW CARD PAYMENT SUCCESS:",
          paymentIntent
        );


        // ------------------------------------------------------
        // SAVE CARD ONLY AFTER SUCCESS
        // ------------------------------------------------------

        try {

          const saveResponse =
            await saveCard({

              payment_method_id:
                paymentMethod.id,

            });


          console.log(
            "SAVE CARD AFTER SUCCESS:",
            saveResponse
          );


          if (
            !saveResponse?.success
          ) {

            console.log(
              "CARD SAVE FAILED AFTER PAYMENT:",
              saveResponse
            );

          }

        }

        catch (saveError) {

          /*
           Payment successful hai.
           Card save fail hone par payment ko
           failed nahi karna hai.
          */

          console.log(
            "CARD SAVE ERROR AFTER PAYMENT:",
            saveError
          );

        }

      }


      // ========================================================
      // COD
      // ========================================================

      else if (
        paymentType === "cod"
      ) {

        console.log(
          "COD ORDER"
        );

      }


      // ========================================================
      // UPI
      // ========================================================

      else if (
        paymentType === "upi"
      ) {

        alert(
          "UPI payment coming soon"
        );

        return;

      }


      // ========================================================
      // FINAL SUCCESS
      // ========================================================

      alert(
        "Order Completed Successfully"
      );


      navigate(
        "/orders"
      );

    }

    catch (error) {

      console.log(
        "ORDER ERROR:",
        error
      );


      console.log(
        "SERVER RESPONSE:",
        error?.response?.data
      );


      alert(
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        error?.message ||
        "Order failed"
      );

    }

    finally {

      setLoading(false);

    }

  };


  // ============================================================
  // UI
  // ============================================================

  return (

    <MainLayout>

      <div className="max-w-7xl mx-auto py-10 px-4">

        <Breadcrumb />


        <h1 className="text-4xl font-bold mt-6 mb-10">

          Checkout

        </h1>


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">


          <div className="lg:col-span-2">

            <BillingForm />


            <PaymentMethod

              paymentType={
                paymentType
              }

              setPaymentType={
                handlePaymentTypeChange
              }

              savedCards={
                savedCards
              }

              selectedCard={
                selectedCard
              }

              setSelectedCard={
                setSelectedCard
              }

              loadingCards={
                loadingCards
              }

            />

          </div>


          <div>

            <CheckoutSummary

              product={product}

              quantity={quantity}

              cartItems={cartItems}

            />


            <button

              onClick={
                handlePlaceOrder
              }

              disabled={
                loading
              }

              className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg font-semibold disabled:opacity-50"

            >

              {

                loading
                  ? "Processing..."
                  : "Confirm Order"

              }

            </button>

          </div>


        </div>

      </div>

    </MainLayout>

  );

}


// ============================================================
// STRIPE ELEMENTS WRAPPER
// ============================================================

export default function CheckoutWrapper() {

  return (

    <Elements
      stripe={stripePromise}
    >

      <Checkout />

    </Elements>

  );

}

