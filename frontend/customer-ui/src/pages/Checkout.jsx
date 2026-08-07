
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  Elements,
  useStripe,
  useElements,
  CardNumberElement
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
  saveCard
} from "../services/paymentService";


function Checkout() {

  const location = useLocation();
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();


  const [loading, setLoading] = useState(false);

  const [paymentType, setPaymentType] = useState("cod");


  // Saved cards
  const [savedCards, setSavedCards] = useState([]);

  const [selectedCard, setSelectedCard] = useState(null);

  const [loadingCards, setLoadingCards] = useState(true);


  const {
    product,
    quantity,
    cartItems
  } = location.state || {};


  console.log(
    "CHECKOUT STATE:",
    location.state
  );


  /*
  ==========================================
  LOAD SAVED CARDS
  ==========================================
  */

  useEffect(() => {

    const fetchSavedCards = async () => {

      try {

        setLoadingCards(true);

        const response = await getSavedCards();

        console.log(
          "SAVED CARDS RESPONSE:",
          response
        );


        if (response?.success) {

          const cards = response.data || [];

          setSavedCards(cards);


          /*
          Select default card first.
          If no default card exists,
          select first card.
          */

          if (cards.length > 0) {

            const defaultCard =
              cards.find(
                (card) => card.is_default === true
              ) || cards[0];


            setSelectedCard(defaultCard);

            setPaymentType("saved");

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


  /*
  ==========================================
  PAYMENT TYPE CHANGE
  ==========================================
  */

  const handlePaymentTypeChange = (type) => {

    setPaymentType(type);


    if (type !== "saved") {

      setSelectedCard(null);

    }

  };


  /*
  ==========================================
  PLACE ORDER
  ==========================================
  */

  const handlePlaceOrder = async () => {

    try {

      setLoading(true);


      /*
      ========================================
      SAVED CARD VALIDATION
      ========================================
      */

      if (paymentType === "saved") {

        if (!selectedCard) {

          alert(
            "Please select a saved card"
          );

          return;

        }


        if (!selectedCard.payment_method_id) {

          alert(
            "Selected card is invalid"
          );

          return;

        }

      }


      /*
      ========================================
      NEW CARD VALIDATION
      ========================================
      */

      if (paymentType === "new-card") {

        if (!stripe || !elements) {

          alert(
            "Stripe is not loaded"
          );

          return;

        }


        const cardNumber =
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


      /*
      ========================================
      CREATE ORDER DATA
      ========================================
      */

      let data;


      // BUY NOW

      if (product) {

        data = {

          product_id: product.id,

          quantity: quantity || 1

        };

      }


      // CART ORDER

      else if (cartItems) {

        data = {

          items: cartItems.map((item) => ({

            product_id: item.id,

            quantity: item.quantity || 1

          }))

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
        data
      );


      /*
      ========================================
      CREATE ORDER
      ========================================
      */

      const response =
        await placeOrder(data);


      console.log(
        "ORDER RESPONSE:",
        response
      );


      /*
      ========================================
      PAYMENT DATA
      ========================================
      */

      let paymentData;


      if (product) {

        paymentData = {

          order_id: response.data.id,

          amount: response.data.total_price,

          currency: "usd"

        };

      }

      else {

        paymentData = {

          order_ids: response.data.order_ids,

          amount: response.data.total_price,

          currency: "usd"

        };

      }


      /*
      ========================================
      SAVED CARD PAYMENT
      ========================================
      */

      if (paymentType === "saved") {

        console.log(
          "USING SAVED CARD:",
          selectedCard
        );


        const paymentResponse =
          await createPaymentIntent({

            ...paymentData,

            payment_method:
              selectedCard.payment_method_id

          });


        console.log(
          "SAVED CARD PAYMENT RESPONSE:",
          paymentResponse
        );


        if (!paymentResponse?.success) {

          alert(
            paymentResponse?.error ||
            paymentResponse?.message ||
            "Payment failed"
          );

          return;

        }


        /*
        If backend says additional
        authentication is required.
        */

        if (
          paymentResponse.requires_action &&
          stripe &&
          paymentResponse.client_secret
        ) {

          const result =
            await stripe.confirmCardPayment(
              paymentResponse.client_secret
            );


          if (result.error) {

            console.log(
              "SAVED CARD STRIPE ERROR:",
              result.error
            );

            alert(
              result.error.message
            );

            return;

          }

        }

      }


      /*
      ========================================
      NEW CARD PAYMENT
      ========================================
      */

      else if (paymentType === "new-card") {

        if (!stripe || !elements) {

          alert(
            "Stripe is not loaded"
          );

          return;

        }


        const cardNumber =
          elements.getElement(
            CardNumberElement
          );


        if (!cardNumber) {

          alert(
            "Please enter card details"
          );

          return;

        }


        /*
        ======================================
        CREATE STRIPE PAYMENT METHOD
        ======================================
        */

        const {
          error,
          paymentMethod
        } =
          await stripe.createPaymentMethod({

            type: "card",

            card: cardNumber

          });


        if (error) {

          console.log(
            "CREATE PAYMENT METHOD ERROR:",
            error
          );

          alert(
            error.message
          );

          return;

        }


        console.log(
          "NEW PAYMENT METHOD:",
          paymentMethod
        );


        /*
        ======================================
        SAVE NEW CARD
        ======================================
        */

        const saveResponse =
          await saveCard({

            payment_method_id:
              paymentMethod.id

          });


        console.log(
          "SAVE CARD RESPONSE:",
          saveResponse
        );


        if (!saveResponse?.success) {

          console.log(
            "CARD SAVE FAILED:",
            saveResponse
          );

          /*
          Payment will not continue with
          an unsaved/unattached card.
          */

          alert(
            saveResponse?.error ||
            saveResponse?.message ||
            "Unable to save card"
          );

          return;

        }


        /*
        ======================================
        CREATE PAYMENT INTENT
        ======================================
        */

        const paymentResponse =
          await createPaymentIntent({

            ...paymentData,

            payment_method:
              paymentMethod.id

          });


        console.log(
          "NEW CARD PAYMENT RESPONSE:",
          paymentResponse
        );


        if (!paymentResponse?.success) {

          alert(
            paymentResponse?.error ||
            paymentResponse?.message ||
            "Payment failed"
          );

          return;

        }


        /*
        ======================================
        3D SECURE / ADDITIONAL ACTION
        ======================================
        */

        if (
          paymentResponse.requires_action &&
          stripe &&
          paymentResponse.client_secret
        ) {

          const result =
            await stripe.confirmCardPayment(
              paymentResponse.client_secret
            );


          if (result.error) {

            console.log(
              "STRIPE ERROR:",
              result.error
            );

            alert(
              result.error.message
            );

            return;

          }

        }

      }


      /*
      ========================================
      COD
      ========================================
      */

      else if (paymentType === "cod") {

        console.log(
          "COD ORDER"
        );

      }


      /*
      ========================================
      UPI
      ========================================
      */

      else if (paymentType === "upi") {

        alert(
          "UPI payment coming soon"
        );

        return;

      }


      /*
      ========================================
      SUCCESS
      ========================================
      */

      alert(
        "Order Completed Successfully"
      );


      navigate("/orders");

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
        "Order failed"
      );

    }

    finally {

      setLoading(false);

    }

  };


  /*
  ==========================================
  UI
  ==========================================
  */

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

              paymentType={paymentType}

              setPaymentType={
                handlePaymentTypeChange
              }

              savedCards={savedCards}

              selectedCard={selectedCard}

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

              onClick={handlePlaceOrder}

              disabled={loading}

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


/*
==========================================
STRIPE ELEMENTS WRAPPER
==========================================
*/

export default function CheckoutWrapper() {

  return (

    <Elements stripe={stripePromise}>

      <Checkout />

    </Elements>

  );

}

