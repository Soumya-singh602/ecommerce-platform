import MainLayout from "../layouts/MainLayout";
import Breadcrumb from "../components/shop/Breadcrumb";
import CartItem from "../components/cart/CartItem";
import OrderSummary from "../components/cart/OrderSummary";

export default function Cart() {
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
            <CartItem />
          </div>

          {/* Order Summary */}
          <div>
            <OrderSummary />
          </div>

        </div>

      </div>
    </MainLayout>
  );
}