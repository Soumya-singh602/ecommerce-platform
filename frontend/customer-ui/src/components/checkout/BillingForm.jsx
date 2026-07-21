export default function BillingForm() {
  return (
    <div className="border rounded-xl shadow-sm p-6">

      <h2 className="text-2xl font-bold mb-6">
        Billing Details
      </h2>

      <div className="space-y-4">

        <input
          type="text"
          placeholder="Full Name"
          className="w-full border rounded-lg px-4 py-3"
        />

        <input
          type="email"
          placeholder="Email Address"
          className="w-full border rounded-lg px-4 py-3"
        />

        <input
          type="text"
          placeholder="Phone Number"
          className="w-full border rounded-lg px-4 py-3"
        />

        <textarea
          placeholder="Shipping Address"
          rows="4"
          className="w-full border rounded-lg px-4 py-3"
        ></textarea>

      </div>

    </div>
  );
}