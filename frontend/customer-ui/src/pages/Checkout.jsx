import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

import MainLayout from "../layouts/MainLayout";
import Breadcrumb from "../components/shop/Breadcrumb";
import BillingForm from "../components/checkout/BillingForm";
import PaymentMethod from "../components/checkout/PaymentMethod";
import CheckoutSummary from "../components/checkout/CheckoutSummary";

import { placeOrder } from "../services/orderService";


export default function Checkout() {


  const location = useLocation();

  const navigate = useNavigate();


  const { product, quantity } = location.state || {};

  const [loading, setLoading] = useState(false);



  const handlePlaceOrder = async () => {


    try {


      setLoading(true);


      const data = {

        product_id: product.id,

        quantity: quantity

      };



      const response = await placeOrder(data);



      console.log(
        "ORDER RESPONSE:",
        response
      );



      alert(
        "Order placed successfully"
      );



      navigate("/orders");



    } catch(error) {


      console.log(
        "ORDER ERROR:",
        error
      );


      alert(
        "Order failed"
      );


    } finally {


      setLoading(false);


    }


  };





  return (

    <MainLayout>


      <div className="max-w-7xl mx-auto py-10 px-4">


        <Breadcrumb />


        <h1 className="text-4xl font-bold mt-6 mb-10">

          Checkout

        </h1>




        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">



          {/* Left Section */}

          <div className="lg:col-span-2">


            <BillingForm />


            <PaymentMethod />


          </div>





          {/* Right Section */}

          <div>


            <CheckoutSummary

              product={product}

              quantity={quantity}

            />



            <button


              onClick={handlePlaceOrder}

              disabled={loading}


              className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg font-semibold"


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