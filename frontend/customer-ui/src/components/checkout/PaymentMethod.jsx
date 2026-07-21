export default function PaymentMethod() {
  return (
    <div className="border rounded-xl shadow-sm p-6 mt-8">

      <h2 className="text-2xl font-bold mb-6">
        Payment Method
      </h2>

      <div className="space-y-4">

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="radio"
            name="payment"
            defaultChecked
          />
          <span>Cash on Delivery (COD)</span>
        </label>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="radio"
            name="payment"
          />
          <span>Credit / Debit Card</span>
        </label>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="radio"
            name="payment"
          />
          <span>UPI Payment</span>
        </label>

      </div>

    </div>
  );
}