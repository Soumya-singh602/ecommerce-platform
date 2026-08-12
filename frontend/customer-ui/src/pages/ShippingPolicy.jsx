import MainLayout from "../layouts/MainLayout";

import {
  PackageCheck,
  Truck,
  CreditCard,
  Clock3,
  ShieldCheck,
} from "lucide-react";

export default function ShippingPolicy() {
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
                <Truck size={15} />
                Delivery Information
              </div>

              <h1 className="mt-5 text-4xl sm:text-5xl font-bold tracking-tight text-slate-900">
                Shipping Policy
              </h1>

              <p className="mt-4 text-base sm:text-lg leading-7 text-slate-500">
                Everything you need to know about order processing,
                delivery times and shipping charges.
              </p>

            </div>

          </div>

        </section>


        {/* ======================================================
            CONTENT
        ====================================================== */}

        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-10 sm:py-12">

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">

            {/* ==================================================
                POLICY CARDS
            ================================================== */}

            <div className="lg:col-span-2 space-y-5">

              {/* ORDER PROCESSING */}

              <section
                className="
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  p-6
                  sm:p-7
                  shadow-sm
                "
              >

                <div className="flex items-start gap-4">

                  <div
                    className="
                      flex
                      h-12
                      w-12
                      flex-shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-blue-50
                      text-blue-600
                    "
                  >
                    <PackageCheck size={23} />
                  </div>

                  <div>

                    <h2 className="text-xl font-bold text-slate-900">
                      Order Processing
                    </h2>

                    <p className="mt-3 text-sm sm:text-base leading-7 text-slate-600">
                      Orders are normally processed within 1-2
                      business days after successful order
                      confirmation.
                    </p>

                  </div>

                </div>

              </section>


              {/* DELIVERY TIME */}

              <section
                className="
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  p-6
                  sm:p-7
                  shadow-sm
                "
              >

                <div className="flex items-start gap-4">

                  <div
                    className="
                      flex
                      h-12
                      w-12
                      flex-shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-blue-50
                      text-blue-600
                    "
                  >
                    <Clock3 size={23} />
                  </div>

                  <div>

                    <h2 className="text-xl font-bold text-slate-900">
                      Delivery Time
                    </h2>

                    <p className="mt-3 text-sm sm:text-base leading-7 text-slate-600">
                      Standard delivery usually takes 3-7
                      business days, depending on your location.
                    </p>

                  </div>

                </div>

              </section>


              {/* SHIPPING CHARGES */}

              <section
                className="
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  p-6
                  sm:p-7
                  shadow-sm
                "
              >

                <div className="flex items-start gap-4">

                  <div
                    className="
                      flex
                      h-12
                      w-12
                      flex-shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-blue-50
                      text-blue-600
                    "
                  >
                    <CreditCard size={23} />
                  </div>

                  <div>

                    <h2 className="text-xl font-bold text-slate-900">
                      Shipping Charges
                    </h2>

                    <p className="mt-3 text-sm sm:text-base leading-7 text-slate-600">
                      Applicable shipping charges are displayed
                      during checkout before you confirm your
                      order.
                    </p>

                  </div>

                </div>

              </section>

            </div>


            {/* ==================================================
                DELIVERY INFO PANEL
            ================================================== */}

            <aside
              className="
                h-fit
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
                <Truck size={23} />
              </div>

              <h2 className="mt-6 text-2xl font-bold">
                Fast & Reliable Delivery
              </h2>

              <p className="mt-3 text-sm leading-7 text-blue-100">
                We work to make sure your order reaches you safely
                and within the expected delivery timeframe.
              </p>

              <div className="mt-7 space-y-3">

                <div className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3">

                  <PackageCheck size={18} />

                  <span className="text-sm">
                    Orders processed in 1-2 days
                  </span>

                </div>

                <div className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3">

                  <Truck size={18} />

                  <span className="text-sm">
                    Delivery in 3-7 business days
                  </span>

                </div>

                <div className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3">

                  <ShieldCheck size={18} />

                  <span className="text-sm">
                    Safe and reliable shipping
                  </span>

                </div>

              </div>

              <div className="mt-7 rounded-xl bg-white/10 p-4">

                <p className="text-xs font-semibold uppercase tracking-wider text-blue-200">
                  Good to know
                </p>

                <p className="mt-2 text-sm leading-6 text-blue-50">
                  Your final shipping cost will always be shown
                  clearly at checkout before placing your order.
                </p>

              </div>

            </aside>

          </div>

        </div>

      </div>

    </MainLayout>
  );
}