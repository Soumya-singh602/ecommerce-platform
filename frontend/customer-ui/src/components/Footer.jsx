import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16">

      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">


        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-blue-400">
            Ecommerce
          </h2>

          <p className="text-gray-400 mt-4">
            Shop quality products at the best prices.
          </p>
        </div>



        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-lg mb-4">
            Quick Links
          </h3>

          <ul className="space-y-3 text-gray-400">

            <li>
              <Link to="/">
                Home
              </Link>
            </li>

            <li>
              <Link to="/shop">
                Shop
              </Link>
            </li>

            <li>
              <Link to="/cart">
                Cart
              </Link>
            </li>

          </ul>
        </div>



        {/* Customer Support */}
        <div>

          <h3 className="font-semibold text-lg mb-4">
            Customer Support
          </h3>

          <ul className="space-y-3 text-gray-400">

            <li>
              Contact Us
            </li>

            <li>
              Shipping Policy
            </li>

            <li>
              Return Policy
            </li>

            <li>
              Privacy Policy
            </li>

          </ul>

        </div>



        {/* Contact */}
        <div>

          <h3 className="font-semibold text-lg mb-4">
            Contact
          </h3>

          <p className="text-gray-400">
            Email: support@ecommerce.com
          </p>

          <p className="text-gray-400 mt-2">
            Phone: +91 9876543210
          </p>

        </div>


      </div>



      <div className="border-t border-gray-700 text-center py-4 text-gray-400">

        © 2026 Ecommerce. All rights reserved.

      </div>


    </footer>
  );
}