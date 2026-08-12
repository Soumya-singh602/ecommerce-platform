import MainLayout from "../layouts/MainLayout";

import {
  Mail,
  Phone,
  Clock3,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export default function Contact() {
  return (
    <MainLayout>

      <div className="min-h-screen bg-slate-50">

        {/* ======================================================
            HERO
        ====================================================== */}

        <section className="bg-white border-b border-slate-200">

          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-12 sm:py-16">

            <div className="max-w-3xl">

              <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-blue-700">
                <MessageCircle size={15} />
                Customer Support
              </div>

              <h1 className="mt-5 text-4xl sm:text-5xl font-bold tracking-tight text-slate-900">
                We're here to help
              </h1>

              <p className="mt-4 max-w-2xl text-base sm:text-lg leading-7 text-slate-500">
                Have a question about your order or need assistance?
                Get in touch with our support team and we'll be happy
                to help.
              </p>

            </div>

          </div>

        </section>


        {/* ======================================================
            MAIN CONTENT
        ====================================================== */}

        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-10 sm:py-12">

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">

            {/* ==================================================
                CONTACT CARDS
            ================================================== */}

            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-5">

              {/* EMAIL */}

              <a
                href="mailto:support@ecommerce.com"
                className="
                  group
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  p-6
                  shadow-sm
                  transition
                  duration-200
                  hover:-translate-y-1
                  hover:border-blue-200
                  hover:shadow-lg
                  hover:shadow-blue-900/5
                "
              >

                <div className="flex items-start justify-between">

                  <div
                    className="
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-xl
                      bg-blue-50
                      text-blue-600
                      transition
                      duration-200
                      group-hover:bg-blue-600
                      group-hover:text-white
                    "
                  >
                    <Mail size={22} />
                  </div>

                  <ArrowRight
                    size={18}
                    className="
                      text-slate-300
                      transition
                      duration-200
                      group-hover:translate-x-1
                      group-hover:text-blue-600
                    "
                  />

                </div>

                <h2 className="mt-5 text-lg font-bold text-slate-900">
                  Email Us
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Send us your questions anytime.
                </p>

                <p className="mt-4 text-sm font-semibold text-blue-600">
                  support@ecommerce.com
                </p>

              </a>


              {/* PHONE */}

              <a
                href="tel:+919876543210"
                className="
                  group
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  p-6
                  shadow-sm
                  transition
                  duration-200
                  hover:-translate-y-1
                  hover:border-blue-200
                  hover:shadow-lg
                  hover:shadow-blue-900/5
                "
              >

                <div className="flex items-start justify-between">

                  <div
                    className="
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-xl
                      bg-blue-50
                      text-blue-600
                      transition
                      duration-200
                      group-hover:bg-blue-600
                      group-hover:text-white
                    "
                  >
                    <Phone size={22} />
                  </div>

                  <ArrowRight
                    size={18}
                    className="
                      text-slate-300
                      transition
                      duration-200
                      group-hover:translate-x-1
                      group-hover:text-blue-600
                    "
                  />

                </div>

                <h2 className="mt-5 text-lg font-bold text-slate-900">
                  Call Us
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Talk directly with our support team.
                </p>

                <p className="mt-4 text-sm font-semibold text-blue-600">
                  +91 9876543210
                </p>

              </a>


              {/* SUPPORT HOURS */}

              <div
                className="
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  p-6
                  shadow-sm
                "
              >

                <div
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-xl
                    bg-blue-50
                    text-blue-600
                  "
                >
                  <Clock3 size={22} />
                </div>

                <h2 className="mt-5 text-lg font-bold text-slate-900">
                  Support Hours
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Our team is available during the following hours.
                </p>

                <p className="mt-4 text-sm font-semibold text-slate-700">
                  Monday - Saturday
                </p>

                <p className="mt-1 text-sm text-blue-600 font-medium">
                  9:00 AM - 6:00 PM
                </p>

              </div>


              {/* QUICK HELP */}

              <div
                className="
                  rounded-2xl
                  border
                  border-blue-100
                  bg-blue-50
                  p-6
                "
              >

                <div
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-xl
                    bg-blue-600
                    text-white
                    shadow-sm
                  "
                >
                  <ShieldCheck size={22} />
                </div>

                <h2 className="mt-5 text-lg font-bold text-slate-900">
                  Need order assistance?
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Keep your order details ready so our team can
                  help you faster.
                </p>

              </div>

            </div>


            {/* ==================================================
                SUPPORT PANEL
            ================================================== */}

            <div
              className="
                rounded-2xl
                bg-blue-600
                p-7
                sm:p-8
                text-white
                shadow-xl
                shadow-blue-900/15
              "
            >

              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-xl
                  bg-white/15
                "
              >
                <MessageCircle size={23} />
              </div>

              <h2 className="mt-6 text-2xl font-bold">
                Let's talk
              </h2>

              <p className="mt-3 text-sm leading-7 text-blue-100">
                Whether you have a question about products, orders,
                payments or delivery, our support team is ready to
                assist you.
              </p>

              <div className="mt-7 space-y-3">

                <div className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3">

                  <Mail size={17} />

                  <span className="text-sm">
                    support@ecommerce.com
                  </span>

                </div>

                <div className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3">

                  <Phone size={17} />

                  <span className="text-sm">
                    +91 9876543210
                  </span>

                </div>

              </div>

              <a
                href="mailto:support@ecommerce.com"
                className="
                  mt-7
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-white
                  px-5
                  py-3.5
                  text-sm
                  font-bold
                  text-blue-700
                  transition
                  duration-200
                  hover:bg-blue-50
                "
              >
                Send us an Email
                <ArrowRight size={17} />
              </a>

            </div>

          </div>

        </div>

      </div>

    </MainLayout>
  );
}