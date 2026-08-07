
import MainLayout from "../layouts/MainLayout";

export default function Contact() {

  return (

    <MainLayout>

      <div className="max-w-4xl mx-auto px-4 py-12">

        <h1 className="text-4xl font-bold mb-8">
          Contact Us
        </h1>

        <div className="bg-white border rounded-xl shadow-sm p-8 space-y-6">

          <p className="text-gray-600 leading-7">
            Have a question or need help with your order?
            Our customer support team is here to help.
          </p>

          <div>

            <h2 className="text-xl font-semibold mb-2">
              Email
            </h2>

            <p className="text-gray-600">
              support@ecommerce.com
            </p>

          </div>

          <div>

            <h2 className="text-xl font-semibold mb-2">
              Phone
            </h2>

            <p className="text-gray-600">
              +91 9876543210
            </p>

          </div>

          <div>

            <h2 className="text-xl font-semibold mb-2">
              Support Hours
            </h2>

            <p className="text-gray-600">
              Monday - Saturday: 9:00 AM - 6:00 PM
            </p>

          </div>

        </div>

      </div>

    </MainLayout>

  );

}
