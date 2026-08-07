
import { Link } from "react-router-dom";

import {
  Mail,
  Phone,
  MapPin
} from "lucide-react";

export default function Footer() {

  const currentYear = new Date().getFullYear();

  const quickLinks = [
    {
      label: "Home",
      path: "/"
    },
    {
      label: "Shop",
      path: "/shop"
    }
  ];

  const supportLinks = [
    {
      label: "Contact Us",
      path: "/contact"
    },
    {
      label: "Shipping Policy",
      path: "/shipping-policy"
    },
    {
      label: "Return Policy",
      path: "/return-policy"
    },
    {
      label: "Privacy Policy",
      path: "/privacy-policy"
    }
  ];

  return (

    <footer className="bg-gray-900 text-white mt-16">

      {/* =========================
          MAIN FOOTER
      ========================== */}

      <div
        className="
          max-w-7xl
          mx-auto
          px-5
          py-12
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-4
          gap-10
        "
      >

        {/* =========================
            BRAND
        ========================== */}

        <div>

          <Link to="/">

            <h2 className="text-2xl font-bold text-blue-400">
              Ecommerce
            </h2>

          </Link>

          <p className="text-gray-400 mt-4 leading-7">

            Your trusted online shopping destination for
            quality products, secure payments and reliable
            delivery.

          </p>

        </div>


        {/* =========================
            QUICK LINKS
        ========================== */}

        <div>

          <h3 className="font-semibold text-lg mb-5">
            Quick Links
          </h3>

          <ul className="space-y-3">

            {quickLinks.map((link) => (

              <li key={link.path}>

                <Link
                  to={link.path}
                  className="
                    text-gray-400
                    hover:text-blue-400
                    transition
                  "
                >
                  {link.label}
                </Link>

              </li>

            ))}

          </ul>

        </div>


        {/* =========================
            CUSTOMER SUPPORT
        ========================== */}

        <div>

          <h3 className="font-semibold text-lg mb-5">
            Customer Support
          </h3>

          <ul className="space-y-3">

            {supportLinks.map((link) => (

              <li key={link.path}>

                <Link
                  to={link.path}
                  className="
                    text-gray-400
                    hover:text-blue-400
                    transition
                  "
                >
                  {link.label}
                </Link>

              </li>

            ))}

          </ul>

        </div>


        {/* =========================
            CONTACT
        ========================== */}

        <div>

          <h3 className="font-semibold text-lg mb-5">
            Contact Us
          </h3>

          <div className="space-y-4">

            <div className="flex items-start gap-3 text-gray-400">

              <Mail
                size={18}
                className="mt-1 flex-shrink-0"
              />

              <span>
                support@ecommerce.com
              </span>

            </div>


            <div className="flex items-start gap-3 text-gray-400">

              <Phone
                size={18}
                className="mt-1 flex-shrink-0"
              />

              <span>
                +91 9876543210
              </span>

            </div>


            <div className="flex items-start gap-3 text-gray-400">

              <MapPin
                size={18}
                className="mt-1 flex-shrink-0"
              />

              <span>
                India
              </span>

            </div>

          </div>

        </div>

      </div>


      {/* =========================
          BOTTOM FOOTER
      ========================== */}

      <div className="border-t border-gray-800">

        <div
          className="
            max-w-7xl
            mx-auto
            px-5
            py-5
            flex
            flex-col
            md:flex-row
            items-center
            justify-between
            gap-3
            text-sm
          "
        >

          <p className="text-gray-500">

            © {currentYear} Ecommerce.
            All rights reserved.

          </p>


          <p className="text-gray-500">

            Secure Shopping • Trusted Payments • Fast Delivery

          </p>

        </div>

      </div>

    </footer>
  );
}

