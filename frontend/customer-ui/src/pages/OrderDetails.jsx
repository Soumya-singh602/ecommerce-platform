import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOrderDetail, cancelOrder } from "../services/orderService";


export default function OrderDetails() {


  const { id } = useParams();

  const navigate = useNavigate();


  const [order, setOrder] = useState(null);



  useEffect(() => {

    fetchOrder();

  }, []);




  const fetchOrder = async () => {

    try {

      const response = await getOrderDetail(id);

      console.log(
        "ORDER DETAIL RESPONSE:",
        response
      );


      setOrder(response.data);


    } catch(error) {

      console.log(
        "ORDER DETAIL ERROR:",
        error
      );

    }

  };





  const handleCancelOrder = async () => {

    try {


      const response = await cancelOrder(id);


      console.log(
        "CANCEL RESPONSE:",
        response
      );


      alert(
        "Order cancelled successfully"
      );


      fetchOrder();


    } catch(error) {


      console.log(
        "CANCEL ERROR:",
        error
      );


      alert(
        "Cancel failed"
      );


    }

  };





  if(!order){

    return (

      <div className="text-center py-20">

        Loading Order...

      </div>

    );

  }





  return (

    <div className="max-w-5xl mx-auto py-10 px-4">


      <h1 className="text-3xl font-bold mb-8">

        Order Details

      </h1>




      <div className="border rounded-xl p-6 shadow bg-white">



        {/* Product */}

        <div className="flex gap-6">


          <div className="w-40 h-40 bg-gray-100 rounded-lg flex items-center justify-center">


            {
              order.product?.image ? (

                <img

                  src={`http://localhost:8002${order.product.image}`}

                  alt={order.product.name}

                  className="w-full h-full object-cover rounded-lg"

                />

              ) : (

                <span className="text-gray-400">

                  No Image

                </span>

              )

            }


          </div>




          <div>


            <h2 className="text-2xl font-bold">

              {order.product?.name}

            </h2>



            <p className="text-gray-600 mt-2">

              {order.product?.description}

            </p>




            <p className="text-xl font-bold text-blue-600 mt-4">

              ₹{order.product?.price}

            </p>



          </div>


        </div>





        {/* Order Info */}


        <div className="mt-8 space-y-3">


          <p>

            Order ID:

            <span className="font-semibold ml-2">

              #{order.id}

            </span>

          </p>




          <p>

            Quantity:

            <span className="font-semibold ml-2">

              {order.quantity}

            </span>

          </p>




          <p>

            Total Amount:

            <span className="font-semibold ml-2">

              ₹{Number(order.product?.price || 0) * order.quantity}

            </span>

          </p>




          <p>

            Status:

            <span className="font-semibold ml-2">

              {order.status}

            </span>

          </p>




          <p>

            Order Date:

            <span className="font-semibold ml-2">

              {
                new Date(order.created_at)
                .toLocaleDateString()
              }

            </span>

          </p>



        </div>





        {/* Buttons */}

        <div className="flex gap-4 mt-8">


          <button

            onClick={() => navigate("/orders")}

            className="bg-gray-600 text-white px-5 py-2 rounded-lg hover:bg-gray-700"

          >

            Back To Orders

          </button>





          {
            order.status !== "Cancelled" && (

              <button

                onClick={handleCancelOrder}

                className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700"

              >

                Cancel Order

              </button>

            )
          }



        </div>



      </div>



    </div>

  );

}