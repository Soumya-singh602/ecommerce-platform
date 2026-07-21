import { Link } from "react-router-dom";

export default function OrderSummary() {
  return (
    <div className="border rounded-xl shadow-sm p-6">

      <h2 className="text-2xl font-bold mb-6">
        Order Summary
      </h2>

      <div className="space-y-4">

        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹2,999</span>
        </div>

        <div className="flex justify-between">
          <span>Shipping</span>
          <span>₹99</span>
        </div>

        <div className="flex justify-between">
          <span>Tax</span>
          <span>₹300</span>
        </div>

        <hr />

        <div className="flex justify-between text-xl font-bold">
          <span>Total</span>
          <span>₹3,398</span>
        </div>

      </div>

      <Link to="/checkout">
        <button className="w-full mt-8 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
          Proceed to Checkout
        </button>
      </Link>

    </div>
  );
}