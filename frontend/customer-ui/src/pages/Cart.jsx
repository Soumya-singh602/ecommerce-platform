import MainLayout from "../layouts/MainLayout";
import Breadcrumb from "../components/shop/Breadcrumb";
import CartItem from "../components/cart/CartItem";
import OrderSummary from "../components/cart/OrderSummary";
import { useCart } from "../context/CartContext";


export default function Cart() {


  const { cartItems } = useCart();
  console.log("CART ITEMS:", cartItems);


  return (

    <MainLayout>

      <div className="max-w-7xl mx-auto py-10 px-4">


        <Breadcrumb />


        <h1 className="text-4xl font-bold mt-6 mb-10">
          Shopping Cart
        </h1>



        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">


          {/* Cart Items */}

          <div className="lg:col-span-2">


            {
              cartItems.length > 0 ? (

                cartItems.map((item) => (

                  <CartItem
                    key={item.id}
                    product={item}
                  />

                ))

              ) : (

                <p className="text-gray-500 text-lg">
                  Your cart is empty
                </p>

              )
            }


          </div>



          {/* Order Summary */}

          <div>

            <OrderSummary
              cartItems={cartItems}
            />

          </div>


        </div>


      </div>

    </MainLayout>

  );

}