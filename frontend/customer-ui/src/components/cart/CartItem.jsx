import { Trash2 } from "lucide-react";

export default function CartItem() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between border rounded-xl p-4 mb-6 shadow-sm">

      {/* Product Image */}
      <div className="flex items-center gap-4">

        <img
          src="https://picsum.photos/150/150"
          alt="Product"
          className="w-24 h-24 rounded-lg object-cover"
        />

        <div>

          <h2 className="text-xl font-semibold">
            Wireless Headphones
          </h2>

          <p className="text-gray-500">
            Premium wireless headphones
          </p>

          <p className="text-blue-600 font-bold mt-2">
            ₹2,999
          </p>

        </div>

      </div>

      {/* Quantity + Remove */}
      <div className="flex items-center gap-6 mt-4 md:mt-0">

        <div className="flex items-center border rounded-lg">

          <button className="px-3 py-2 hover:bg-gray-100">
            -
          </button>

          <span className="px-4">
            1
          </span>

          <button className="px-3 py-2 hover:bg-gray-100">
            +
          </button>

        </div>

        <button className="text-red-600 hover:text-red-700">
          <Trash2 size={22} />
        </button>

      </div>

    </div>
  );
}