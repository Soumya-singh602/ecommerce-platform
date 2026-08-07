
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import {
  getOrders,
  cancelOrder
} from "../services/orderService";

export default function MyOrders() {

  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);


  // ============================================================
  // MEDIA URL
  // ============================================================

  const MEDIA_URL =
    import.meta.env.VITE_MEDIA_URL || "";


  // ============================================================
  // FETCH ORDERS
  // ============================================================

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
        response?.data?.orders || []
      );

    }

    catch (error) {

      console.log(
        "ORDER ERROR:",
        error
      );

      setOrders([]);

    }

    finally {

      setLoading(false);

    }

  };


  // ============================================================
  // PRODUCT IMAGE URL
  // ============================================================

  const getProductImage = (image) => {

    if (!image) {
      return null;
    }


    // Already complete URL
    if (
      image.startsWith("http://") ||
      image.startsWith("https://")
    ) {

      return image;

    }


    // Remove duplicate slash
    return `${MEDIA_URL.replace(/\/$/, "")}/${image.replace(/^\//, "")}`;

  };


  // ============================================================
  // CANCEL ORDER
  // ============================================================

  const handleCancelOrder = async (id) => {

    try {

      const response =
        await cancelOrder(id);

      console.log(
        "CANCEL RESPONSE:",
        response
      );


      alert(
        "Order cancelled successfully"
      );


      fetchOrders();

    }

    catch (error) {

      console.log(
        "CANCEL ERROR:",
        error
      );


      alert(
        "Cancel failed"
      );

    }

  };


  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {

    return (

      <MainLayout>

        <div className="text-center py-20">

          Loading Orders...

        </div>

      </MainLayout>

    );

  }


  // ============================================================
  // UI
  // ============================================================

  return (

    <MainLayout>

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

            orders.map((order) => {


              const productImage =
                getProductImage(
                  order.product?.image
                );


              return (

                <div

                  key={order.id}

                  className="
                    border
                    rounded-xl
                    p-6
                    mb-5
                    shadow-sm
                    bg-white
                  "

                >


                  {/* ==================================================
                      HEADER
                  ================================================== */}


                  <div className="
                    flex
                    justify-between
                    items-center
                  ">


                    <h2 className="text-xl font-bold">

                      Order #{order.id}

                    </h2>


                    <span className="
                      px-3
                      py-1
                      rounded-full
                      bg-yellow-100
                      text-yellow-700
                      font-semibold
                    ">

                      {order.status}

                    </span>


                  </div>



                  {/* ==================================================
                      PRODUCT DETAILS
                  ================================================== */}


                  <div className="
                    mt-6
                    flex
                    gap-5
                  ">


                    {/* PRODUCT IMAGE */}


                    <div className="
                      w-32
                      h-32
                      bg-gray-100
                      rounded-lg
                      overflow-hidden
                      flex
                      items-center
                      justify-center
                      flex-shrink-0
                    ">


                      {
                        productImage ? (

                          <img

                            src={productImage}

                            alt={
                              order.product?.name ||
                              "Product"
                            }

                            className="
                              w-full
                              h-full
                              object-cover
                              rounded-lg
                            "

                            onError={(e) => {

                              console.log(
                                "ORDER IMAGE LOAD ERROR:",
                                productImage
                              );

                              e.currentTarget.style.display =
                                "none";

                            }}

                          />

                        ) : (

                          <span className="text-gray-400">

                            No Image

                          </span>

                        )
                      }


                    </div>



                    {/* PRODUCT INFORMATION */}


                    <div>


                      <h3 className="text-xl font-bold">

                        {order.product?.name ||
                          "Product"}

                      </h3>


                      <p className="
                        text-gray-600
                        mt-2
                      ">

                        {order.product?.description ||
                          "No description available"}

                      </p>


                      <p className="
                        text-blue-600
                        font-bold
                        text-lg
                        mt-2
                      ">

                        ₹
                        {order.product?.price || 0}

                      </p>


                    </div>


                  </div>



                  {/* ==================================================
                      ORDER INFO
                  ================================================== */}


                  <div className="
                    mt-6
                    space-y-3
                  ">


                    <p>

                      Quantity:

                      <span className="
                        font-semibold
                        ml-2
                      ">

                        {order.quantity}

                      </span>

                    </p>



                    <p>

                      Total Amount:

                      <span className="
                        font-semibold
                        ml-2
                      ">

                        ₹
                        {
                          Number(
                            order.product?.price || 0
                          ) *
                          Number(
                            order.quantity || 0
                          )
                        }

                      </span>

                    </p>



                    <p>

                      Address:

                      <span className="
                        font-semibold
                        ml-2
                      ">

                        {order.address || "N/A"}

                      </span>

                    </p>



                    <p>

                      City:

                      <span className="
                        font-semibold
                        ml-2
                      ">

                        {order.city || "N/A"}

                      </span>

                    </p>



                    <p>

                      Phone:

                      <span className="
                        font-semibold
                        ml-2
                      ">

                        {order.phone || "N/A"}

                      </span>

                    </p>



                    <p>

                      Pincode:

                      <span className="
                        font-semibold
                        ml-2
                      ">

                        {order.pincode || "N/A"}

                      </span>

                    </p>



                    <p>

                      Order Date:

                      <span className="
                        font-semibold
                        ml-2
                      ">

                        {
                          order.created_at
                            ? new Date(
                                order.created_at
                              ).toLocaleDateString()
                            : "N/A"
                        }

                      </span>

                    </p>


                  </div>



                  {/* ==================================================
                      BUTTONS
                  ================================================== */}


                  <div className="
                    flex
                    gap-4
                    mt-6
                  ">


                    <button

                      onClick={() =>
                        navigate(
                          `/orders/${order.id}`
                        )
                      }

                      className="
                        bg-blue-600
                        text-white
                        px-5
                        py-2
                        rounded-lg
                        hover:bg-blue-700
                      "

                    >

                      View Details

                    </button>



                    {
                      order.status !== "Cancelled" && (

                        <button

                          onClick={() =>
                            handleCancelOrder(
                              order.id
                            )
                          }

                          className="
                            bg-red-600
                            text-white
                            px-5
                            py-2
                            rounded-lg
                            hover:bg-red-700
                          "

                        >

                          Cancel Order

                        </button>

                      )
                    }


                  </div>


                </div>

              );

            })

          )
        }


      </div>

    </MainLayout>

  );

}

