
import { Link } from "react-router-dom";
import {
  ShoppingCart,
  Package,
  User,
  CreditCard,
  Mail,
  Phone
} from "lucide-react";

import { isAuthenticated } from "../utils/auth";
import { useCart } from "../context/CartContext";


export default function Footer() {

  const currentYear = new Date().getFullYear();

  const loggedIn = isAuthenticated();

  const { cartItems } = useCart();


  // ============================================================
  // QUICK LINKS
  // ============================================================

  const quickLinks = [
    {
      label: "Home",
      path: "/"
    },
    {
      label: "Shop",
      path: "/shop"
    },
    {
      label: "Cart",
      path: "/cart"
    }
  ];


  // ============================================================
  // ACCOUNT LINKS
  // ============================================================

  const accountLinks = loggedIn
    ? [
        {
          label: "My Orders",
          path: "/orders",
          icon: Package
        },
        {
          label: "My Profile",
          path: "/profile",
          icon: User
        },
        {
          label: "Saved Cards",
          path: "/saved-cards",
          icon: CreditCard
        }
      ]
    : [
        {
          label: "Login",
          path: "/login",
          icon: User
        },
        {
          label: "Register",
          path: "/register",
          icon: User
        }
      ];


  // ============================================================
  // SUPPORT LINKS
  // ============================================================

  const supportLinks = [
    "Contact Us",
    "Shipping Policy",
    "Return Policy",
    "Privacy Policy"
  ];


  return (

    <footer className="bg-gray-900 text-white mt-16">

      {/* ========================================================
          MAIN FOOTER
      ======================================================== */}

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

        {/* ======================================================
            BRAND
        ====================================================== */}

        <div>

          <Link to="/">

            <h2 className="text-2xl font-bold text-blue-400">

              Ecommerce

            </h2>

          </Link>


          <p className="text-gray-400 mt-4 leading-6">

            Shop quality products at the best prices.
            Fast delivery, secure payments and a
            simple shopping experience.

          </p>


          {/* CART STATUS */}

          <Link
            to="/cart"
            className="
              inline-flex
              items-center
              gap-2
              mt-5
              text-gray-300
              hover:text-blue-400
              transition
            "
          >

            <ShoppingCart size={18} />

            <span>

              Cart ({cartItems.length})

            </span>

          </Link>

        </div>


        {/* ======================================================
            QUICK LINKS
        ====================================================== */}

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


        {/* ======================================================
            ACCOUNT
        ====================================================== */}

        <div>

          <h3 className="font-semibold text-lg mb-5">

            {loggedIn
              ? "My Account"
              : "Account"
            }

          </h3>


          <ul className="space-y-3">

            {accountLinks.map((link) => {

              const Icon = link.icon;

              return (

                <li key={link.path}>

                  <Link
                    to={link.path}
                    className="
                      flex
                      items-center
                      gap-2
                      text-gray-400
                      hover:text-blue-400
                      transition
                    "
                  >

                    <Icon size={17} />

                    {link.label}

                  </Link>

                </li>

              );

            })}

          </ul>

        </div>


        {/* ======================================================
            CONTACT / SUPPORT
        ====================================================== */}

        <div>

          <h3 className="font-semibold text-lg mb-5">

            Customer Support

          </h3>


          <ul className="space-y-3 text-gray-400">

            {supportLinks.map((item) => (

              <li
                key={item}
                className="
                  hover:text-blue-400
                  cursor-pointer
                  transition
                "
              >

                {item}

              </li>

            ))}

          </ul>


          {/* CONTACT DETAILS */}

          <div className="mt-6 space-y-3">

            <div
              className="
                flex
                items-center
                gap-3
                text-gray-400
              "
            >

              <Mail size={17} />

              <span>

                support@ecommerce.com

              </span>

            </div>


            <div
              className="
                flex
                items-center
                gap-3
                text-gray-400
              "
            >

              <Phone size={17} />

              <span>

                +91 9876543210

              </span>

            </div>

          </div>

        </div>

      </div>


      {/* ========================================================
          BOTTOM FOOTER
      ======================================================== */}

      <div
        className="
          border-t
          border-gray-800
          px-5
          py-5
        "
      >

        <div
          className="
            max-w-7xl
            mx-auto
            flex
            flex-col
            md:flex-row
            items-center
            justify-between
            gap-3
            text-sm
            text-gray-500
          "
        >

          <p>

            © {currentYear} Ecommerce.
            All rights reserved.

          </p>


          <p>

            Secure Shopping • Trusted Payments • Fast Delivery

          </p>

        </div>

      </div>

    </footer>

  );

}

