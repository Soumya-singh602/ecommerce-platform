import { User, Mail, Phone, MapPin, Building2, Hash } from "lucide-react";

export default function BillingForm({
  billingData,
  setBillingData,
}) {
  const handleChange = (e) => {
    setBillingData({
      ...billingData,
      [e.target.name]: e.target.value,
    });
  };

  const inputClass = `
    w-full
    rounded-xl
    border
    border-slate-200
    bg-slate-50
    px-4
    py-3
    text-sm
    text-slate-900
    outline-none
    transition
    duration-200
    placeholder:text-slate-400
    hover:border-blue-300
    focus:border-blue-500
    focus:bg-white
    focus:ring-4
    focus:ring-blue-500/10
  `;

  return (
    <div className="space-y-6">
      {/* HEADER */}

      <div className="flex items-center gap-4">
        <div
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            bg-blue-50
            text-blue-600
          "
        >
          <User size={21} />
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Billing Details
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Enter your contact and delivery information
          </p>
        </div>
      </div>

      {/* FORM */}

      <div className="space-y-5">
        {/* NAME + EMAIL */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* FULL NAME */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Full Name
            </label>

            <div className="relative">
              <User
                size={18}
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                "
              />

              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={billingData.name}
                onChange={handleChange}
                className={`${inputClass} pl-11`}
              />
            </div>
          </div>

          {/* EMAIL */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Email Address
            </label>

            <div className="relative">
              <Mail
                size={18}
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                "
              />

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={billingData.email}
                onChange={handleChange}
                className={`${inputClass} pl-11`}
              />
            </div>
          </div>
        </div>

        {/* PHONE */}

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Phone Number
          </label>

          <div className="relative">
            <Phone
              size={18}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-slate-400
              "
            />

            <input
              type="tel"
              name="phone"
              placeholder="Enter your phone number"
              value={billingData.phone}
              onChange={handleChange}
              className={`${inputClass} pl-11`}
            />
          </div>
        </div>

        {/* ADDRESS */}

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Shipping Address
          </label>

          <div className="relative">
            <MapPin
              size={18}
              className="
                absolute
                left-4
                top-4
                text-slate-400
              "
            />

            <textarea
              name="address"
              placeholder="Enter your complete shipping address"
              value={billingData.address}
              onChange={handleChange}
              rows="4"
              className={`${inputClass} resize-none pl-11`}
            />
          </div>
        </div>

        {/* CITY + PINCODE */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* CITY */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              City
            </label>

            <div className="relative">
              <Building2
                size={18}
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                "
              />

              <input
                type="text"
                name="city"
                placeholder="Enter your city"
                value={billingData.city}
                onChange={handleChange}
                className={`${inputClass} pl-11`}
              />
            </div>
          </div>

          {/* PINCODE */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Pincode
            </label>

            <div className="relative">
              <Hash
                size={18}
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                "
              />

              <input
                type="text"
                name="pincode"
                placeholder="Enter pincode"
                value={billingData.pincode}
                onChange={handleChange}
                className={`${inputClass} pl-11`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* INFO */}

      <div
        className="
          flex
          items-start
          gap-3
          rounded-xl
          border
          border-blue-100
          bg-blue-50
          px-4
          py-3
        "
      >
        <MapPin
          size={18}
          className="mt-0.5 flex-shrink-0 text-blue-600"
        />

        <p className="text-xs leading-5 text-blue-700">
          Please make sure your delivery address and contact
          information are correct before placing your order.
        </p>
      </div>
    </div>
  );
}