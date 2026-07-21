import { Star } from "lucide-react";
import QuantitySelector from "./QuantitySelector";

export default function ProductInfo() {
  return (
    <div>
      <h1 className="text-4xl font-bold">
        Wireless Headphones
      </h1>

      {/* Rating */}
      <div className="flex items-center gap-1 mt-4">
        <Star size={18} fill="gold" color="gold" />
        <Star size={18} fill="gold" color="gold" />
        <Star size={18} fill="gold" color="gold" />
        <Star size={18} fill="gold" color="gold" />
        <Star size={18} color="#d1d5db" />

        <span className="ml-2 text-gray-500">
          (124 Reviews)
        </span>
      </div>

      {/* Price */}
      <h2 className="text-3xl font-bold text-blue-600 mt-6">
        ₹2,999
      </h2>

      {/* Description */}
      <p className="text-gray-600 mt-6 leading-7">
        Premium wireless headphones with active noise cancellation,
        long battery life and crystal clear sound quality.
      </p>

      {/* Stock */}
      <div className="mt-6">
        <span className="text-green-600 font-semibold">
          ✓ In Stock
        </span>
      </div>

      {/* Quantity */}
      <QuantitySelector />

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8">

        <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
          Add to Cart
        </button>

        <button className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition">
          Buy Now
        </button>

      </div>
    </div>
  );
}