import { ShoppingCart } from "lucide-react";

export default function ProductCard({ product }) {
  return (
    <div className="border rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition duration-300">

      <img
        src={product.image}
        alt={product.name}
        className="w-full h-60 object-cover"
      />

      <div className="p-4">

        <h3 className="text-lg font-semibold">
          {product.name}
        </h3>

        <p className="text-gray-500 text-sm mt-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-4">

          <span className="text-xl font-bold text-blue-600">
            ₹{product.price}
          </span>

          <button className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700">
            <ShoppingCart size={20} />
          </button>

        </div>

      </div>

    </div>
  );
}