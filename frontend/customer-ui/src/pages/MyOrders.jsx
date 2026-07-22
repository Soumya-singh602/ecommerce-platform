import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getOrders, cancelOrder } from "../services/orderService";


export default function MyOrders() {


  const navigate = useNavigate();


  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);



  useEffect(() => {

    fetchOrders();

  }, []);




  const fetchOrders = async () => {

    try {

      const response = await getOrders();


      console.log(
        "ORDERS RESPONSE:",
        response
      );


      setOrders(
        response.data.orders
      );


    } catch(error) {


      console.log(
        "ORDER ERROR:",
        error
      );


    } finally {


      setLoading(false);


    }

  };





  const handleCancelOrder = async (id) => {

    try {


      const response = await cancelOrder(id);


      console.log(
        "CANCEL RESPONSE:",
        response
      );


      alert(
        "Order cancelled successfully"
      );


      fetchOrders();


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






  if(loading){

    return (

      <div className="text-center py-20">

        Loading Orders...

      </div>

    );

  }





  return (

    <div className="max-w-7xl mx-auto py-10 px-4">


      <h1 className="text-3xl font-bold mb-8">

        My Orders

      </h1>




      {
        orders.length === 0 ? (

          <p className="text-gray-500 text-lg">

            No Orders Found

          </p>


        ) : (


          orders.map((order)=>(


            <div

              key={order.id}

              className="border rounded-xl p-6 mb-5 shadow-sm bg-white"


            >



              {/* Header */}

              <div className="flex justify-between items-center">


                <h2 className="text-xl font-bold">

                  Order #{order.id}

                </h2>



                <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 font-semibold">

                  {order.status}

                </span>


              </div>





              {/* Product Details */}

              <div className="mt-6 flex gap-5">


                <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center">


                  {
                    order.product?.image ? (

                      <img

                        src={order.product.image}

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


                  <h3 className="text-xl font-bold">

                    {order.product?.name}

                  </h3>



                  <p className="text-gray-600 mt-2">

                    {order.product?.description}

                  </p>



                  <p className="text-blue-600 font-bold text-lg mt-2">

                    ₹{order.product?.price}

                  </p>


                </div>


              </div>





              {/* Order Info */}

              <div className="mt-6 space-y-3">


                <p>

                  Quantity:

                  <span className="font-semibold ml-2">

                    {order.quantity}

                  </span>

                </p>




                <p>

                  Total Amount:

                  <span className="font-semibold ml-2">

                    ₹
                    {
                      Number(order.product?.price || 0)
                      *
                      order.quantity
                    }

                  </span>

                </p>




                <p>

                  Address:

                  <span className="font-semibold ml-2">

                    {order.address}

                  </span>

                </p>




                <p>

                  City:

                  <span className="font-semibold ml-2">

                    {order.city}

                  </span>

                </p>




                <p>

                  Phone:

                  <span className="font-semibold ml-2">

                    {order.phone}

                  </span>

                </p>




                <p>

                  Pincode:

                  <span className="font-semibold ml-2">

                    {order.pincode}

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

              <div className="flex gap-4 mt-6">


                {/* View Details */}

                <button

                  onClick={() => navigate(`/orders/${order.id}`)}

                  className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"

                >

                  View Details

                </button>





                {/* Cancel Order */}

                {
                  order.status !== "Cancelled" && (

                    <button

                      onClick={() => handleCancelOrder(order.id)}

                      className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700"

                    >

                      Cancel Order

                    </button>

                  )
                }



              </div>





            </div>


          ))


        )

      }



    </div>

  );

}