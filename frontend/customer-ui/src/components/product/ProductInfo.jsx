
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Star } from "lucide-react";

import QuantitySelector from "./QuantitySelector";
import { useCart } from "../../context/CartContext";

export default function ProductInfo({ product }) {

  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart();


  // ============================================================
  // ADD TO CART
  // ============================================================

  const handleAddToCart = () => {

    if (!product) {
      return;
    }

    if (product.stock <= 0) {
      alert("Product is out of stock");
      return;
    }

    if (quantity > product.stock) {
      alert(`Only ${product.stock} items are available`);
      return;
    }

    addToCart(product, quantity);

    alert("Product added to cart successfully");
  };


  // ============================================================
  // BUY NOW
  // ============================================================

  const handleBuyNow = () => {

    if (!product) {
      return;
    }

    if (product.stock <= 0) {
      alert("Product is out of stock");
      return;
    }

    if (quantity > product.stock) {
      alert(`Only ${product.stock} items are available`);
      return;
    }

    navigate("/checkout", {

      state: {
        product: product,
        quantity: quantity
      }

    });

  };


  return (

    <div>

      {/* PRODUCT NAME */}

      <h1 className="text-4xl font-bold">

        {product?.name}

      </h1>


      {/* RATING */}

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


      {/* PRICE */}

      <h2 className="text-3xl font-bold text-blue-600 mt-6">

        ₹{Number(product?.price || 0) * quantity}

      </h2>


      {/* DESCRIPTION */}

      <p className="text-gray-600 mt-6 leading-7">

        {product?.description}

      </p>


      {/* STOCK */}

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


      {/* QUANTITY */}

      <QuantitySelector
        onQuantityChange={setQuantity}
      />


      {/* BUTTONS */}

      <div className="flex flex-col sm:flex-row gap-4 mt-8">

        {/* ADD TO CART */}

        <button

          type="button"

          onClick={handleAddToCart}

          disabled={!product || product.stock <= 0}

          className="
            flex-1
            bg-blue-600
            text-white
            py-3
            rounded-lg
            font-semibold
            hover:bg-blue-700
            transition
            disabled:bg-gray-400
            disabled:cursor-not-allowed
          "

        >

          Add to Cart

        </button>


        {/* BUY NOW */}

        <button

          type="button"

          onClick={handleBuyNow}

          disabled={!product || product.stock <= 0}

          className="
            flex-1
            bg-green-600
            text-white
            py-3
            rounded-lg
            font-semibold
            hover:bg-green-700
            transition
            disabled:bg-gray-400
            disabled:cursor-not-allowed
          "

        >

          Buy Now

        </button>

      </div>

    </div>

  );

}

