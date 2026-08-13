import { Link } from "react-router-dom";

import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  ShoppingBag,
  ShieldCheck,
  Truck,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    {
      label: "Home",
      path: "/",
    },
    {
      label: "Shop",
      path: "/shop",
    },
  ];

  const supportLinks = [
    {
      label: "Contact Us",
      path: "/contact",
    },
    {
      label: "Shipping Policy",
      path: "/shipping-policy",
    },
    {
      label: "Return Policy",
      path: "/return-policy",
    },
    {
      label: "Privacy Policy",
      path: "/privacy-policy",
    },
  ];

  return (
    <footer className="mt-16 bg-slate-950 text-white">

      {/* ======================================================
          TOP CTA
      ====================================================== */}

      <div className="border-b border-slate-800">

        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-8">

          <div className="rounded-2xl bg-blue-600 px-6 py-7 sm:px-8 sm:py-8 shadow-xl shadow-blue-950/20">

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

              <div className="flex items-start gap-4">

                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-white/15">
                  <ShoppingBag size={23} />
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-bold">
                    Shop with confidence
                  </h3>

                  <p className="mt-1.5 text-sm sm:text-base text-blue-100">
                    Quality products, secure payments and reliable delivery.
                  </p>
                </div>

              </div>

              <Link
                to="/shop"
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-white
                  px-5
                  py-3
                  text-sm
                  font-bold
                  text-blue-700
                  shadow-sm
                  transition
                  duration-200
                  hover:bg-blue-50
                  hover:shadow-md
                "
              >
                Explore Shop
                <ArrowRight size={17} />
              </Link>

            </div>

          </div>

        </div>

      </div>


      {/* ======================================================
          MAIN FOOTER
      ====================================================== */}

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-12">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-14">

          {/* ==================================================
              BRAND
          ================================================== */}

          <div>

            <Link
              to="/"
              className="inline-flex items-center gap-3 group"
            >

              <div
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  bg-blue-600
                  text-white
                  shadow-lg
                  shadow-blue-600/20
                  transition
                  duration-200
                  group-hover:scale-105
                "
              >
                <ShoppingBag size={21} />
              </div>

              <div>

                <h2 className="text-xl font-bold tracking-tight">
                  NEXORA
                </h2>

                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-400">
                  Shop Smart. Live Better.
                </p>

              </div>

            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">
              Your trusted online shopping destination for quality products,
              secure payments and reliable delivery.
            </p>

            {/* Trust badges */}

            <div className="mt-6 flex flex-wrap gap-2">

              <div className="inline-flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900 px-3 py-2">
                <ShieldCheck
                  size={15}
                  className="text-blue-400"
                />

                <span className="text-xs font-medium text-slate-300">
                  Secure Payment
                </span>
              </div>

              <div className="inline-flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900 px-3 py-2">
                <Truck
                  size={15}
                  className="text-blue-400"
                />

                <span className="text-xs font-medium text-slate-300">
                  Fast Delivery
                </span>
              </div>

            </div>

          </div>


          {/* ==================================================
              QUICK LINKS
          ================================================== */}

          <div>

            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Quick Links
            </h3>

            <div className="mt-5 h-1 w-8 rounded-full bg-blue-600" />

            <ul className="mt-5 space-y-3">

              {quickLinks.map((link) => (

                <li key={link.path}>

                  <Link
                    to={link.path}
                    className="
                      group
                      inline-flex
                      items-center
                      gap-2
                      text-sm
                      text-slate-400
                      transition
                      duration-200
                      hover:text-blue-400
                    "
                  >

                    <ArrowRight
                      size={14}
                      className="
                        text-slate-600
                        transition
                        duration-200
                        group-hover:translate-x-1
                        group-hover:text-blue-400
                      "
                    />

                    {link.label}

                  </Link>

                </li>

              ))}

            </ul>

          </div>


          {/* ==================================================
              CUSTOMER SUPPORT
          ================================================== */}

          <div>

            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Customer Support
            </h3>

            <div className="mt-5 h-1 w-8 rounded-full bg-blue-600" />

            <ul className="mt-5 space-y-3">

              {supportLinks.map((link) => (

                <li key={link.path}>

                  <Link
                    to={link.path}
                    className="
                      group
                      inline-flex
                      items-center
                      gap-2
                      text-sm
                      text-slate-400
                      transition
                      duration-200
                      hover:text-blue-400
                    "
                  >

                    <ArrowRight
                      size={14}
                      className="
                        text-slate-600
                        transition
                        duration-200
                        group-hover:translate-x-1
                        group-hover:text-blue-400
                      "
                    />

                    {link.label}

                  </Link>

                </li>

              ))}

            </ul>

          </div>


          {/* ==================================================
              CONTACT
          ================================================== */}

          <div>

            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Contact Us
            </h3>

            <div className="mt-5 h-1 w-8 rounded-full bg-blue-600" />

            <div className="mt-5 space-y-3">

              {/* EMAIL */}

              <a
                href="mailto:support@ecommerce.com"
                className="
                  group
                  flex
                  items-center
                  gap-3
                  rounded-xl
                  border
                  border-slate-800
                  bg-slate-900/60
                  px-3
                  py-3
                  text-sm
                  text-slate-400
                  transition
                  duration-200
                  hover:border-blue-800
                  hover:bg-blue-950/40
                  hover:text-blue-300
                "
              >

                <span
                  className="
                    flex
                    h-9
                    w-9
                    flex-shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    bg-blue-600/10
                    text-blue-400
                    transition
                    group-hover:bg-blue-600
                    group-hover:text-white
                  "
                >
                  <Mail size={17} />
                </span>

                <span className="truncate">
                  support@ecommerce.com
                </span>

              </a>


              {/* PHONE */}

              <a
                href="tel:+919876543210"
                className="
                  group
                  flex
                  items-center
                  gap-3
                  rounded-xl
                  border
                  border-slate-800
                  bg-slate-900/60
                  px-3
                  py-3
                  text-sm
                  text-slate-400
                  transition
                  duration-200
                  hover:border-blue-800
                  hover:bg-blue-950/40
                  hover:text-blue-300
                "
              >

                <span
                  className="
                    flex
                    h-9
                    w-9
                    flex-shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    bg-blue-600/10
                    text-blue-400
                    transition
                    group-hover:bg-blue-600
                    group-hover:text-white
                  "
                >
                  <Phone size={17} />
                </span>

                <span>
                  +91 9876543210
                </span>

              </a>


              {/* LOCATION */}

              <a
                href="https://www.google.com/maps/search/?api=1&query=India"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group
                  flex
                  items-center
                  gap-3
                  rounded-xl
                  border
                  border-slate-800
                  bg-slate-900/60
                  px-3
                  py-3
                  text-sm
                  text-slate-400
                  transition
                  duration-200
                  hover:border-blue-800
                  hover:bg-blue-950/40
                  hover:text-blue-300
                "
              >

                <span
                  className="
                    flex
                    h-9
                    w-9
                    flex-shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    bg-blue-600/10
                    text-blue-400
                    transition
                    group-hover:bg-blue-600
                    group-hover:text-white
                  "
                >
                  <MapPin size={17} />
                </span>

                <span>
                  India
                </span>

              </a>

            </div>

          </div>

        </div>

      </div>


      {/* ======================================================
          BOTTOM FOOTER
      ====================================================== */}

      <div className="border-t border-slate-800">

        <div
          className="
            max-w-7xl
            mx-auto
            px-5
            sm:px-6
            lg:px-8
            py-5
            flex
            flex-col
            md:flex-row
            items-center
            justify-between
            gap-3
            text-center
            md:text-left
          "
        >

          <p className="text-xs sm:text-sm text-slate-500">
            © {currentYear} Ecommerce. All rights reserved.
          </p>

          <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500">

            <span className="h-1 w-1 rounded-full bg-blue-500" />

            <span>Secure Shopping</span>

            <span className="h-1 w-1 rounded-full bg-blue-500" />

            <span>Trusted Payments</span>

            <span className="h-1 w-1 rounded-full bg-blue-500" />

            <span>Fast Delivery</span>

          </div>

        </div>

      </div>

    </footer>
  );
}