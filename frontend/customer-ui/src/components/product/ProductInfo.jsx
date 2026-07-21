import { Star } from "lucide-react";
import QuantitySelector from "./QuantitySelector";

export default function ProductInfo({ product }) {

  return (

    <div>

      <h1 className="text-4xl font-bold">
        {product?.name}
      </h1>

      {/* Rating */}
      <div className="flex items-center gap-1 mt-4">

        <Star size={18} fill="gold" color="gold" />
        <Star size={18} fill="gold" color="gold" />
        <Star size={18} fill="gold" color="gold" />
        <Star size={18} fill="gold" color="gold" />
        <Star size={18} color="#d1d5db" />

        <span className="ml-2 text-gray-500">
          (0 Reviews)
        </span>

      </div>

      {/* Price */}
      <h2 className="text-3xl font-bold text-blue-600 mt-6">
        ₹{product?.price}
      </h2>

      {/* Description */}
      <p className="text-gray-600 mt-6 leading-7">
        {product?.description}
      </p>

      {/* Stock */}
      <div className="mt-6">

        {product?.stock > 0 ? (

          <span className="text-green-600 font-semibold">
            ✓ In Stock ({product.stock} available)
          </span>

        ) : (

          <span className="text-red-600 font-semibold">
            Out of Stock
          </span>

        )}

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