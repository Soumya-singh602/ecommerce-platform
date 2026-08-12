import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Star,
  ShoppingCart,
  Zap,
  ShieldCheck,
  Truck,
} from "lucide-react";

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
        product,
        quantity,
      },
    });
  };

  // ============================================================
  // PRICE
  // ============================================================

  const unitPrice = Number(product?.price || 0);

  const totalPrice = unitPrice * quantity;

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div className="w-full">

      {/* ======================================================
          PRODUCT HEADER
      ====================================================== */}

      <div>
        <span
          className="
            inline-flex
            items-center
            rounded-full
            border
            border-blue-100
            bg-blue-50
            px-3
            py-1.5
            text-xs
            font-semibold
            text-blue-700
          "
        >
          Premium Product
        </span>

        <h1
          className="
            mt-4
            text-3xl
            font-bold
            tracking-tight
            text-slate-900
            sm:text-4xl
          "
        >
          {product?.name}
        </h1>
      </div>


      {/* ======================================================
          RATING
      ====================================================== */}

      <div className="mt-5 flex items-center gap-1">

        {[1, 2, 3, 4].map((star) => (
          <Star
            key={star}
            size={18}
            fill="currentColor"
            className="text-amber-400"
          />
        ))}

        <Star
          size={18}
          className="text-slate-300"
        />

        <span className="ml-2 text-sm font-medium text-slate-600">
          4.0
        </span>

        <span className="text-sm text-slate-300">
          •
        </span>

        <span className="text-sm text-slate-500">
          0 Reviews
        </span>

      </div>


      {/* ======================================================
          PRICE
      ====================================================== */}

      <div className="mt-7">

        <div className="flex flex-wrap items-end gap-3">

          <span
            className="
              text-3xl
              font-bold
              text-blue-600
              sm:text-4xl
            "
          >
            ₹{totalPrice.toLocaleString("en-IN")}
          </span>

          {quantity > 1 && (
            <span className="pb-1 text-sm text-slate-500">
              ₹{unitPrice.toLocaleString("en-IN")} × {quantity}
            </span>
          )}

        </div>

        <p className="mt-2 text-sm text-slate-500">
          Inclusive of applicable taxes
        </p>

      </div>


      {/* ======================================================
          DIVIDER
      ====================================================== */}

      <div className="my-7 border-t border-slate-200" />


      {/* ======================================================
          DESCRIPTION
      ====================================================== */}

      <div>

        <h2 className="text-base font-semibold text-slate-900">
          Product Details
        </h2>

        <p
          className="
            mt-3
            text-sm
            leading-7
            text-slate-600
            sm:text-base
          "
        >
          {product?.description ||
            "No description available for this product."}
        </p>

      </div>


      {/* ======================================================
          STOCK
      ====================================================== */}

      <div className="mt-6">

        {product?.stock > 0 ? (
          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              border
              border-blue-100
              bg-blue-50
              px-4
              py-2.5
            "
          >

            <span
              className="
                h-2.5
                w-2.5
                rounded-full
                bg-blue-600
              "
            />

            <span className="text-sm font-semibold text-blue-700">
              In Stock
            </span>

            <span className="text-sm text-blue-600">
              ({product.stock} available)
            </span>

          </div>
        ) : (
          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              border
              border-red-100
              bg-red-50
              px-4
              py-2.5
            "
          >

            <span className="h-2.5 w-2.5 rounded-full bg-red-500" />

            <span className="text-sm font-semibold text-red-700">
              Out of Stock
            </span>

          </div>
        )}

      </div>


      {/* ======================================================
          QUANTITY
      ====================================================== */}

      {product?.stock > 0 && (
        <div className="mt-7">

          <div className="mb-3 flex items-center justify-between">

            <span className="text-sm font-semibold text-slate-900">
              Quantity
            </span>

            <span className="text-xs text-slate-500">
              Max {product.stock}
            </span>

          </div>

          <QuantitySelector
            onQuantityChange={setQuantity}
          />

        </div>
      )}


      {/* ======================================================
          ACTION BUTTONS
      ====================================================== */}

      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">

        {/* ADD TO CART */}

        <button
          type="button"
          onClick={handleAddToCart}
          disabled={!product || product.stock <= 0}
          className="
            group
            flex
            items-center
            justify-center
            gap-2
            rounded-xl
            border
            border-blue-600
            bg-white
            px-5
            py-3.5
            text-sm
            font-bold
            text-blue-600
            transition
            duration-200
            hover:bg-blue-50
            hover:shadow-md
            hover:shadow-blue-100
            active:scale-[0.99]
            disabled:cursor-not-allowed
            disabled:border-slate-200
            disabled:bg-slate-100
            disabled:text-slate-400
          "
        >
          <ShoppingCart
            size={19}
            className="
              transition-transform
              duration-200
              group-hover:scale-110
            "
          />

          Add to Cart
        </button>


        {/* BUY NOW */}

        <button
          type="button"
          onClick={handleBuyNow}
          disabled={!product || product.stock <= 0}
          className="
            group
            flex
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-blue-600
            px-5
            py-3.5
            text-sm
            font-bold
            text-white
            shadow-lg
            shadow-blue-600/20
            transition
            duration-200
            hover:bg-blue-700
            hover:shadow-xl
            hover:shadow-blue-600/25
            active:scale-[0.99]
            disabled:cursor-not-allowed
            disabled:bg-slate-300
            disabled:shadow-none
          "
        >
          <Zap
            size={19}
            fill="currentColor"
            className="
              transition-transform
              duration-200
              group-hover:scale-110
            "
          />

          Buy Now
        </button>

      </div>


      {/* ======================================================
          BENEFITS
      ====================================================== */}

      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">

        {/* SECURE PAYMENT */}

        <div
          className="
            flex
            items-center
            gap-3
            rounded-xl
            border
            border-blue-100
            bg-blue-50/60
            p-4
          "
        >

          <div
            className="
              flex
              h-10
              w-10
              flex-shrink-0
              items-center
              justify-center
              rounded-lg
              bg-white
              text-blue-600
              shadow-sm
            "
          >
            <ShieldCheck size={20} />
          </div>

          <div>

            <p className="text-sm font-semibold text-slate-900">
              Secure Payment
            </p>

            <p className="mt-0.5 text-xs text-slate-500">
              Safe and protected checkout
            </p>

          </div>

        </div>


        {/* FAST DELIVERY */}

        <div
          className="
            flex
            items-center
            gap-3
            rounded-xl
            border
            border-blue-100
            bg-blue-50/60
            p-4
          "
        >

          <div
            className="
              flex
              h-10
              w-10
              flex-shrink-0
              items-center
              justify-center
              rounded-lg
              bg-white
              text-blue-600
              shadow-sm
            "
          >
            <Truck size={20} />
          </div>

          <div>

            <p className="text-sm font-semibold text-slate-900">
              Fast Delivery
            </p>

            <p className="mt-0.5 text-xs text-slate-500">
              Quick and reliable shipping
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}