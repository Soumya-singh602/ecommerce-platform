
import MainLayout from "../layouts/MainLayout";

export default function ReturnPolicy() {

  return (

    <MainLayout>

      <div className="max-w-4xl mx-auto px-4 py-12">

        <h1 className="text-4xl font-bold mb-8">
          Return Policy
        </h1>

        <div className="bg-white border rounded-xl shadow-sm p-8 space-y-6">

          <div>

            <h2 className="text-xl font-semibold mb-2">
              Return Eligibility
            </h2>

            <p className="text-gray-600 leading-7">
              Products may be eligible for return depending on
              their condition and the applicable return period.
            </p>

          </div>

          <div>

            <h2 className="text-xl font-semibold mb-2">
              Product Condition
            </h2>

            <p className="text-gray-600 leading-7">
              Returned products should be unused and in their
              original packaging wherever applicable.
            </p>

          </div>

          <div>

            <h2 className="text-xl font-semibold mb-2">
              Refund
            </h2>

            <p className="text-gray-600 leading-7">
              Approved refunds are processed according to the
              original payment method and applicable processing time.
            </p>

          </div>

        </div>

      </div>

    </MainLayout>

  );

}

