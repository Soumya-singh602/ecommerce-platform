import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Star,
  ShoppingCart,
  Zap,
  ShieldCheck,
  Truck,
  Heart,
} from "lucide-react";

import QuantitySelector from "./QuantitySelector";
import { useCart } from "../../context/CartContext";

import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "../../services/wishlistService";

import { getProductReviews } from "../../services/reviewService";

export default function ProductInfo({ product }) {
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);

  const [isWishlisted, setIsWishlisted] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);

  const { addToCart } = useCart();

  // ============================================================
  // FETCH REVIEWS / RATING
  // ============================================================

  useEffect(() => {
    const fetchRating = async () => {
      if (!product?.id) {
        return;
      }

      try {
        const response = await getProductReviews(product.id);

        console.log("PRODUCT RATING RESPONSE:", response);

        /*
         * reviewService already returns response.data.
         *
         * Backend response:
         *
         * {
         *   status: "success",
         *   message: "...",
         *   data: {
         *     reviews: [],
         *     average_rating: 5,
         *     total_reviews: 1
         *   }
         * }
         */

        const data = response?.data || {};

        console.log("PRODUCT RATING DATA:", data);

        setAverageRating(
          Number(data.average_rating ?? 0)
        );

        setTotalReviews(
          Number(data.total_reviews ?? 0)
        );
      } catch (error) {
        console.error("PRODUCT RATING ERROR:", error);

        console.error(
          "PRODUCT RATING ERROR RESPONSE:",
          error?.response?.data
        );

        setAverageRating(0);
        setTotalReviews(0);
      }
    };

    fetchRating();
  }, [product?.id]);

  // ============================================================
  // CHECK WISHLIST
  // ============================================================

  useEffect(() => {
    const checkWishlist = async () => {
      if (!product?.id) {
        return;
      }

      try {
        const response = await getWishlist();

        console.log("WISHLIST:", response);

        const wishlistItems =
          response?.data?.wishlist ||
          response?.data ||
          [];

        const exists = wishlistItems.some(
          (item) =>
            Number(
              item.product_id ||
                item.product?.id
            ) === Number(product.id)
        );

        setIsWishlisted(exists);
      } catch (error) {
        console.log("WISHLIST FETCH ERROR:", error);

        setIsWishlisted(false);
      }
    };

    checkWishlist();
  }, [product?.id]);

  // ============================================================
  // WISHLIST
  // ============================================================

  const handleWishlist = async () => {
    if (!product?.id) {
      return;
    }

    if (wishlistLoading) {
      return;
    }

    try {
      setWishlistLoading(true);

      if (isWishlisted) {
        await removeFromWishlist(product.id);

        setIsWishlisted(false);

        alert("Removed from wishlist");
      } else {
        await addToWishlist(product.id);

        setIsWishlisted(true);

        alert("Added to wishlist");
      }
    } catch (error) {
      console.log("WISHLIST ERROR:", error);

      const status = error?.response?.status;

      if (status === 401) {
        alert("Please login to use wishlist");

        navigate("/login");
        return;
      }

      alert(
        error?.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setWishlistLoading(false);
    }
  };

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
      alert(
        `Only ${product.stock} items are available`
      );
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
      alert(
        `Only ${product.stock} items are available`
      );
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
  // RATING
  // ============================================================

  const roundedRating = Math.round(
    averageRating
  );

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div className="w-full">

      {/* ======================================================
          PRODUCT HEADER
      ====================================================== */}

      <div className="relative">

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

        <button
          type="button"
          onClick={handleWishlist}
          disabled={wishlistLoading}
          aria-label={
            isWishlisted
              ? "Remove from wishlist"
              : "Add to wishlist"
          }
          className={`
            absolute
            right-0
            top-0
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-full
            border
            transition-all
            duration-200
            ${
              isWishlisted
                ? "border-red-200 bg-red-50 text-red-500 shadow-sm"
                : "border-slate-200 bg-white text-slate-500 hover:border-red-200 hover:bg-red-50 hover:text-red-500"
            }
            disabled:cursor-not-allowed
            disabled:opacity-60
          `}
        >
          <Heart
            size={21}
            fill={
              isWishlisted
                ? "currentColor"
                : "none"
            }
            className="
              transition-transform
              duration-200
              hover:scale-110
            "
          />
        </button>

        <h1
          className="
            mt-4
            pr-14
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

        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={18}
            fill={
              star <= roundedRating
                ? "currentColor"
                : "none"
            }
            className={
              star <= roundedRating
                ? "text-amber-400"
                : "text-slate-300"
            }
          />
        ))}

        <span className="ml-2 text-sm font-medium text-slate-600">
          {averageRating.toFixed(1)}
        </span>

        <span className="text-sm text-slate-300">
          •
        </span>

        <span className="text-sm text-slate-500">
          {totalReviews} review
          {totalReviews !== 1 ? "s" : ""}
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
              ₹{unitPrice.toLocaleString("en-IN")} ×{" "}
              {quantity}
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
          disabled={
            !product ||
            product.stock <= 0
          }
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
          disabled={
            !product ||
            product.stock <= 0
          }
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