

import MainLayout from "../layouts/MainLayout";

export default function ShippingPolicy() {

  return (

    <MainLayout>

      <div className="max-w-4xl mx-auto px-4 py-12">

        <h1 className="text-4xl font-bold mb-8">
          Shipping Policy
        </h1>

        <div className="bg-white border rounded-xl shadow-sm p-8 space-y-6">

          <div>

            <h2 className="text-xl font-semibold mb-2">
              Order Processing
            </h2>

            <p className="text-gray-600 leading-7">
              Orders are normally processed within 1-2 business days
              after successful order confirmation.
            </p>

          </div>

          <div>

            <h2 className="text-xl font-semibold mb-2">
              Delivery Time
            </h2>

            <p className="text-gray-600 leading-7">
              Standard delivery usually takes 3-7 business days,
              depending on your location.
            </p>

          </div>

          <div>

            <h2 className="text-xl font-semibold mb-2">
              Shipping Charges
            </h2>

            <p className="text-gray-600 leading-7">
              Applicable shipping charges are displayed during
              checkout before you confirm your order.
            </p>

          </div>

        </div>

      </div>

    </MainLayout>

  );

}

