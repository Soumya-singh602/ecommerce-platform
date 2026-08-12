
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

import {
  ArrowLeft,
  ShieldCheck,
  CreditCard,
  Lock,
  CheckCircle2,
  ShoppingBag,
  User,
} from "lucide-react";


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

  const [billingData, setBillingData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });


  const {
    product,
    quantity,
    cartItems,
  } = location.state || {};


  // ============================================================
  // ITEM COUNT
  // ============================================================

  const itemCount = product
    ? quantity || 1
    : cartItems?.reduce(
        (total, item) =>
          total + (item.quantity || 1),
        0
      ) || 0;


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

  const handlePaymentTypeChange = (
    type
  ) => {

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

          address:
            billingData.address,

          city:
            billingData.city,

          phone:
            billingData.phone,

          pincode:
            billingData.pincode,

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

          address:
            billingData.address,

          city:
            billingData.city,

          phone:
            billingData.phone,

          pincode:
            billingData.pincode,

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


        const paymentIntent =
          await confirmStripePayment(

            paymentResponse.client_secret,

            paymentMethod.id

          );


        console.log(
          "NEW CARD PAYMENT SUCCESS:",
          paymentIntent
        );


        // ======================================================
        // SAVE CARD AFTER SUCCESS
        // ======================================================

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
      // SUCCESS
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

      <div className="min-h-screen bg-slate-50">

        <div
          className="
            max-w-7xl
            mx-auto
            px-4
            sm:px-6
            lg:px-8
            py-8
          "
        >

          {/* ==================================================
              BREADCRUMB
          ================================================== */}

          <Breadcrumb />


          {/* ==================================================
              HEADER
          ================================================== */}

          <div className="mt-7 mb-8">

            <button
              type="button"
              onClick={() =>
                navigate(-1)
              }
              className="
                mb-5
                inline-flex
                items-center
                gap-2
                text-sm
                font-medium
                text-slate-500
                transition
                hover:text-blue-600
              "
            >

              <ArrowLeft size={17} />

              Back

            </button>


            <div
              className="
                flex
                flex-col
                gap-4
                md:flex-row
                md:items-end
                md:justify-between
              "
            >

              <div>

                <div
                  className="
                    mb-2
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    bg-blue-50
                    px-3
                    py-1.5
                    text-xs
                    font-semibold
                    text-blue-700
                  "
                >

                  <ShieldCheck size={14} />

                  Secure Checkout

                </div>


                <h1
                  className="
                    text-3xl
                    sm:text-4xl
                    font-bold
                    tracking-tight
                    text-slate-900
                  "
                >
                  Complete your order
                </h1>


                <p
                  className="
                    mt-2
                    max-w-2xl
                    text-sm
                    leading-6
                    text-slate-500
                  "
                >
                  Enter your delivery details and
                  choose your preferred payment method.
                </p>

              </div>


              {/* CHECKOUT STEPS */}

              <div
                className="
                  hidden
                  sm:flex
                  items-center
                  gap-3
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  px-4
                  py-3
                  shadow-sm
                "
              >

                <div
                  className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-full
                    bg-blue-600
                    text-xs
                    font-bold
                    text-white
                  "
                >
                  1
                </div>


                <span
                  className="
                    text-sm
                    font-semibold
                    text-blue-700
                  "
                >
                  Checkout
                </span>


                <div
                  className="
                    h-px
                    w-8
                    bg-slate-200
                  "
                />


                <div
                  className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-full
                    bg-slate-100
                    text-xs
                    font-semibold
                    text-slate-400
                  "
                >
                  2
                </div>


                <span
                  className="
                    text-sm
                    font-medium
                    text-slate-400
                  "
                >
                  Complete
                </span>

              </div>

            </div>

          </div>


          {/* ==================================================
              MAIN GRID
          ================================================== */}

          <div
            className="
              grid
              grid-cols-1
              lg:grid-cols-3
              gap-6
              lg:gap-8
              items-start
            "
          >

            {/* =================================================
                LEFT SIDE
            ================================================= */}

            <div
              className="
                lg:col-span-2
                space-y-6
              "
            >

              {/* =================================================
                  BILLING
              ================================================= */}

              <section
                className="
                  overflow-hidden
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  shadow-sm
                "
              >

                <div
                  className="
                    border-b
                    border-slate-100
                    px-5
                    py-5
                    sm:px-6
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      gap-4
                    "
                  >

                    <div
                      className="
                        flex
                        h-11
                        w-11
                        flex-shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        bg-blue-50
                        text-blue-600
                      "
                    >

                      <User size={20} />

                    </div>


                    <div>

                      <h2
                        className="
                          text-lg
                          font-bold
                          text-slate-900
                        "
                      >
                        Billing Information
                      </h2>


                      <p
                        className="
                          mt-0.5
                          text-sm
                          text-slate-500
                        "
                      >
                        Enter your delivery details
                      </p>

                    </div>

                  </div>

                </div>


                <div className="p-5 sm:p-6">

                  <BillingForm
                    billingData={
                      billingData
                    }

                    setBillingData={
                      setBillingData
                    }
                  />

                </div>

              </section>


              {/* =================================================
                  PAYMENT
              ================================================= */}

              <section
                className="
                  overflow-hidden
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  shadow-sm
                "
              >

                <div
                  className="
                    border-b
                    border-slate-100
                    px-5
                    py-5
                    sm:px-6
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      gap-4
                    "
                  >

                    <div
                      className="
                        flex
                        items-center
                        gap-4
                      "
                    >

                      <div
                        className="
                          flex
                          h-11
                          w-11
                          flex-shrink-0
                          items-center
                          justify-center
                          rounded-xl
                          bg-blue-50
                          text-blue-600
                        "
                      >

                        <CreditCard size={20} />

                      </div>


                      <div>

                        <h2
                          className="
                            text-lg
                            font-bold
                            text-slate-900
                          "
                        >
                          Payment Method
                        </h2>


                        <p
                          className="
                            mt-0.5
                            text-sm
                            text-slate-500
                          "
                        >
                          Choose how you want to pay
                        </p>

                      </div>

                    </div>


                    <div
                      className="
                        hidden
                        sm:flex
                        items-center
                        gap-1.5
                        text-xs
                        font-medium
                        text-slate-400
                      "
                    >

                      <Lock size={14} />

                      Secure Payment

                    </div>

                  </div>

                </div>


                <div className="p-5 sm:p-6">

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

                    setSavedCards={
                      setSavedCards
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

              </section>


              {/* =================================================
                  SECURITY NOTICE
              ================================================= */}

              <div
                className="
                  flex
                  items-start
                  gap-3
                  rounded-2xl
                  border
                  border-blue-100
                  bg-blue-50
                  p-4
                "
              >

                <ShieldCheck
                  size={20}
                  className="
                    mt-0.5
                    flex-shrink-0
                    text-blue-600
                  "
                />


                <div>

                  <p
                    className="
                      text-sm
                      font-semibold
                      text-blue-900
                    "
                  >
                    Your payment is secure
                  </p>


                  <p
                    className="
                      mt-1
                      text-xs
                      leading-5
                      text-blue-700
                    "
                  >
                    Your payment information is
                    securely processed. Card details
                    are protected by Stripe.
                  </p>

                </div>

              </div>

            </div>


            {/* =================================================
                RIGHT SIDE
            ================================================= */}

            <div
              className="
                lg:sticky
                lg:top-24
                space-y-4
              "
            >

              {/* =================================================
                  ORDER SUMMARY
              ================================================= */}

              <section
                className="
                  overflow-hidden
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  shadow-sm
                "
              >

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    border-b
                    border-slate-100
                    px-5
                    py-5
                  "
                >

                  <div>

                    <h2
                      className="
                        text-lg
                        font-bold
                        text-slate-900
                      "
                    >
                      Order Summary
                    </h2>


                    <p
                      className="
                        mt-1
                        text-sm
                        text-slate-500
                      "
                    >
                      {itemCount}{" "}
                      {itemCount === 1
                        ? "item"
                        : "items"}
                    </p>

                  </div>


                  <div
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-xl
                      bg-blue-50
                      text-blue-600
                    "
                  >

                    <ShoppingBag size={19} />

                  </div>

                </div>


                <div className="p-5">

                  <CheckoutSummary
                    product={product}
                    quantity={quantity}
                    cartItems={cartItems}
                  />

                </div>

              </section>


              {/* =================================================
                  CONFIRM ORDER
              ================================================= */}

              <button
                type="button"
                onClick={
                  handlePlaceOrder
                }
                disabled={loading}
                className="
                  group
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2.5
                  rounded-xl
                  bg-blue-600
                  px-6
                  py-4
                  text-sm
                  font-bold
                  text-white
                  shadow-lg
                  shadow-blue-600/20
                  transition
                  duration-200
                  hover:bg-blue-700
                  hover:shadow-blue-600/30
                  active:scale-[0.99]
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                  disabled:hover:bg-blue-600
                "
              >

                {loading ? (

                  <>

                    <span
                      className="
                        h-5
                        w-5
                        animate-spin
                        rounded-full
                        border-2
                        border-white/40
                        border-t-white
                      "
                    />

                    Processing...

                  </>

                ) : (

                  <>

                    <CheckCircle2 size={18} />

                    Confirm Order

                  </>

                )}

              </button>


              {/* =================================================
                  SECURITY
              ================================================= */}

              <div
                className="
                  flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  px-4
                  py-3
                  text-xs
                  font-medium
                  text-slate-500
                "
              >

                <Lock size={13} />

                Secure & encrypted payment

              </div>


              <p
                className="
                  px-3
                  text-center
                  text-[11px]
                  leading-5
                  text-slate-400
                "
              >
                By placing your order, you agree
                to our terms and conditions and
                acknowledge our privacy policy.
              </p>

            </div>

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