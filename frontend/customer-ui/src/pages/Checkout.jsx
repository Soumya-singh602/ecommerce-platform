import MainLayout from "../layouts/MainLayout";
import Breadcrumb from "../components/shop/Breadcrumb";
import BillingForm from "../components/checkout/BillingForm";
import PaymentMethod from "../components/checkout/PaymentMethod";
import CheckoutSummary from "../components/checkout/CheckoutSummary";

export default function Checkout() {
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

            <CheckoutSummary />

          </div>

        </div>

      </div>
    </MainLayout>
  );
}