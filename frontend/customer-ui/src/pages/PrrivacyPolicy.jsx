
import MainLayout from "../layouts/MainLayout";

export default function PrivacyPolicy() {

  return (

    <MainLayout>

      <div className="max-w-4xl mx-auto px-4 py-12">

        <h1 className="text-4xl font-bold mb-8">
          Privacy Policy
        </h1>

        <div className="bg-white border rounded-xl shadow-sm p-8 space-y-6">

          <div>

            <h2 className="text-xl font-semibold mb-2">
              Information We Collect
            </h2>

            <p className="text-gray-600 leading-7">
              We may collect information required to create your
              account, process orders, provide support and improve
              the shopping experience.
            </p>

          </div>

          <div>

            <h2 className="text-xl font-semibold mb-2">
              Payment Information
            </h2>

            <p className="text-gray-600 leading-7">
              Payment information is securely processed through
              our payment provider. We do not store complete card
              details on our application servers.
            </p>

          </div>

          <div>

            <h2 className="text-xl font-semibold mb-2">
              Data Security
            </h2>

            <p className="text-gray-600 leading-7">
              We take reasonable measures to protect account and
              order information from unauthorized access.
            </p>

          </div>

        </div>

      </div>

    </MainLayout>

  );

}

