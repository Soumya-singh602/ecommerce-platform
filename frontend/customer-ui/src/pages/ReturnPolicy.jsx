import MainLayout from "../layouts/MainLayout";
import {
  RotateCcw,
  PackageCheck,
  CreditCard,
  ShieldCheck,
} from "lucide-react";

export default function ReturnPolicy() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">

          {/* HEADER */}
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-sm font-semibold text-blue-700">
              <RotateCcw size={16} />
              Customer Policy
            </div>

            <h1 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
              Return Policy
            </h1>

            <p className="mt-3 max-w-2xl text-slate-500 leading-7">
              We want you to have a smooth shopping experience. Please
              review the information below to understand our return and
              refund process.
            </p>
          </div>

          {/* POLICY CARD */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

            {/* RETURN ELIGIBILITY */}
            <section className="p-6 sm:p-8 border-b border-slate-100">
              <div className="flex items-start gap-4">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <ShieldCheck size={21} />
                </div>

                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                    Return Eligibility
                  </h2>

                  <p className="mt-2 text-sm sm:text-base text-slate-600 leading-7">
                    Products may be eligible for return depending on
                    their condition and the applicable return period.
                    Please make sure your return request meets the
                    applicable requirements.
                  </p>
                </div>

              </div>
            </section>

            {/* PRODUCT CONDITION */}
            <section className="p-6 sm:p-8 border-b border-slate-100">
              <div className="flex items-start gap-4">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <PackageCheck size={21} />
                </div>

                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                    Product Condition
                  </h2>

                  <p className="mt-2 text-sm sm:text-base text-slate-600 leading-7">
                    Returned products should be unused and in their
                    original packaging wherever applicable. Products
                    should include all original accessories and
                    components when required.
                  </p>
                </div>

              </div>
            </section>

            {/* REFUND */}
            <section className="p-6 sm:p-8">
              <div className="flex items-start gap-4">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <CreditCard size={21} />
                </div>

                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                    Refund
                  </h2>

                  <p className="mt-2 text-sm sm:text-base text-slate-600 leading-7">
                    Approved refunds are processed according to the
                    original payment method and applicable processing
                    time. The time required for the refund to appear
                    may depend on your payment provider.
                  </p>
                </div>

              </div>
            </section>

          </div>

          {/* HELP CARD */}
          <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-5 sm:p-6">
            <div className="flex items-start gap-3">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
                <RotateCcw size={19} />
              </div>

              <div>
                <h3 className="text-sm sm:text-base font-bold text-blue-900">
                  Need help with a return?
                </h3>

                <p className="mt-1 text-sm text-blue-700 leading-6">
                  Contact our support team if you have questions about
                  your return or refund.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </MainLayout>
  );
}