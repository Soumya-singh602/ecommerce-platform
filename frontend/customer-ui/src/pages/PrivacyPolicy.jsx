import MainLayout from "../layouts/MainLayout";
import {
  ShieldCheck,
  CreditCard,
  LockKeyhole,
} from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">

          {/* HEADER */}
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-sm font-semibold text-blue-700">
              <ShieldCheck size={16} />
              Privacy & Security
            </div>

            <h1 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
              Privacy Policy
            </h1>

            <p className="mt-3 max-w-2xl text-slate-500 leading-7">
              Your privacy matters to us. Learn how we collect, use
              and protect your information while you use our platform.
            </p>
          </div>

          {/* POLICY CARD */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

            {/* INFORMATION WE COLLECT */}
            <section className="p-6 sm:p-8 border-b border-slate-100">
              <div className="flex items-start gap-4">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <ShieldCheck size={21} />
                </div>

                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                    Information We Collect
                  </h2>

                  <p className="mt-2 text-sm sm:text-base text-slate-600 leading-7">
                    We may collect information required to create your
                    account, process orders, provide support and improve
                    your overall shopping experience.
                  </p>
                </div>

              </div>
            </section>

            {/* PAYMENT INFORMATION */}
            <section className="p-6 sm:p-8 border-b border-slate-100">
              <div className="flex items-start gap-4">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <CreditCard size={21} />
                </div>

                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                    Payment Information
                  </h2>

                  <p className="mt-2 text-sm sm:text-base text-slate-600 leading-7">
                    Payment information is securely processed through
                    our payment provider. We do not store complete card
                    details on our application servers.
                  </p>
                </div>

              </div>
            </section>

            {/* DATA SECURITY */}
            <section className="p-6 sm:p-8">
              <div className="flex items-start gap-4">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <LockKeyhole size={21} />
                </div>

                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                    Data Security
                  </h2>

                  <p className="mt-2 text-sm sm:text-base text-slate-600 leading-7">
                    We take reasonable measures to protect account and
                    order information from unauthorized access, misuse
                    or disclosure.
                  </p>
                </div>

              </div>
            </section>

          </div>

          {/* SECURITY NOTICE */}
          <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-5 sm:p-6">
            <div className="flex items-start gap-3">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
                <LockKeyhole size={19} />
              </div>

              <div>
                <h3 className="text-sm sm:text-base font-bold text-blue-900">
                  Your information is protected
                </h3>

                <p className="mt-1 text-sm text-blue-700 leading-6">
                  We use appropriate security measures to help keep
                  your personal and order information protected.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </MainLayout>
  );
}