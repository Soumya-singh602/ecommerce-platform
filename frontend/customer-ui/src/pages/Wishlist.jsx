import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Heart,
  ShoppingBag,
  Trash2,
  ArrowRight,
  Eye,
  Package,
} from "lucide-react";

import MainLayout from "../layouts/MainLayout";

import {
  getWishlist,
  removeFromWishlist,
} from "../services/wishlistService";

import { getProductDetails } from "../services/productService";

// ============================================================
// MEDIA URL
// ============================================================

const MEDIA_URL =
  import.meta.env.VITE_MEDIA_URL || "";

// ============================================================
// IMAGE URL HELPER
// ============================================================

const getImageUrl = (image) => {
  if (!image) {
    return null;
  }

  // Full URL
  if (
    image.startsWith("http://") ||
    image.startsWith("https://")
  ) {
    return image;
  }

  // Relative media URL
  if (image.startsWith("/")) {
    return `${MEDIA_URL}${image}`;
  }

  return `${MEDIA_URL}/${image}`;
};

// ============================================================
// WISHLIST PAGE
// ============================================================

export default function Wishlist() {
  const navigate = useNavigate();

  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState(null);

  // ============================================================
  // LOAD WISHLIST
  // ============================================================

  const loadWishlist = async () => {
    try {
      setLoading(true);

      const response = await getWishlist();

      console.log("WISHLIST RESPONSE:", response);

      const wishlistItems = response?.data || [];

      const products = await Promise.all(
        wishlistItems.map(async (item) => {
          try {
            const productResponse =
              await getProductDetails(
                item.product_id
              );

            console.log(
              `PRODUCT ${item.product_id} RESPONSE:`,
              productResponse
            );

            const product =
              productResponse?.data?.data ||
              productResponse?.data ||
              productResponse;

            if (!product) {
              return null;
            }

            return {
              ...product,

              wishlistId: item.id,

              productId:
                product.id ||
                item.product_id,

              image:
                product.image ||
                product.image_url ||
                null,
            };
          } catch (error) {
            console.error(
              `Failed to load product ${item.product_id}`,
              error
            );

            return null;
          }
        })
      );

      const validProducts =
        products.filter(Boolean);

      console.log(
        "FINAL WISHLIST PRODUCTS:",
        validProducts
      );

      setWishlist(validProducts);
    } catch (error) {
      console.error(
        "WISHLIST LOAD ERROR:",
        error
      );

      setWishlist([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWishlist();
  }, []);

  // ============================================================
  // REMOVE PRODUCT
  // ============================================================

  const handleRemove = async (productId) => {
    try {
      setRemovingId(productId);

      await removeFromWishlist(productId);

      setWishlist((current) =>
        current.filter(
          (product) =>
            product.productId !== productId
        )
      );
    } catch (error) {
      console.error(
        "REMOVE WISHLIST ERROR:",
        error
      );

      alert(
        "Failed to remove product from wishlist"
      );
    } finally {
      setRemovingId(null);
    }
  };

  // ============================================================
  // PRODUCT DETAILS
  // ============================================================

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {
    return (
      <MainLayout>
        <div className="min-h-[70vh] bg-slate-50">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

            <div className="mb-10">
              <div className="h-8 w-52 animate-pulse rounded-lg bg-slate-200" />
              <div className="mt-3 h-4 w-72 animate-pulse rounded bg-slate-200" />
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
                >
                  <div className="h-64 animate-pulse bg-slate-100" />

                  <div className="space-y-3 p-5">
                    <div className="h-5 animate-pulse rounded bg-slate-100" />
                    <div className="h-6 w-28 animate-pulse rounded bg-slate-100" />
                    <div className="h-11 animate-pulse rounded-xl bg-slate-100" />
                  </div>
                </div>
              ))}

            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  // ============================================================
  // EMPTY WISHLIST
  // ============================================================

  if (wishlist.length === 0) {
    return (
      <MainLayout>
        <div className="min-h-[70vh] bg-slate-50">
          <div className="flex min-h-[70vh] items-center justify-center px-4">

            <div className="max-w-lg text-center">

              <div
                className="
                  mx-auto
                  flex
                  h-24
                  w-24
                  items-center
                  justify-center
                  rounded-full
                  bg-blue-50
                  ring-8
                  ring-blue-50/50
                "
              >
                <Heart
                  size={42}
                  className="text-blue-600"
                />
              </div>

              <h1 className="mt-7 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Your Wishlist is Empty
              </h1>

              <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-slate-500 sm:text-base">
                Save the products you love and
                keep them here for later. Your
                favorite products will be waiting
                for you.
              </p>

              <button
                type="button"
                onClick={() =>
                  navigate("/shop")
                }
                className="
                  mt-8
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-blue-600
                  px-7
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
                  active:scale-[0.98]
                "
              >
                <ShoppingBag size={19} />

                Continue Shopping

                <ArrowRight size={17} />
              </button>

            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  // ============================================================
  // WISHLIST
  // ============================================================

  return (
    <MainLayout>
      <div className="min-h-screen bg-slate-50">

        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

          {/* ==================================================
              HEADER
          ================================================== */}

          <div className="mb-8">

            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

              <div className="flex items-center gap-4">

                <div
                  className="
                    flex
                    h-14
                    w-14
                    flex-shrink-0
                    items-center
                    justify-center
                    rounded-2xl
                    bg-blue-50
                    ring-1
                    ring-blue-100
                  "
                >
                  <Heart
                    size={27}
                    className="fill-blue-600 text-blue-600"
                  />
                </div>

                <div>

                  <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                    My Wishlist
                  </h1>

                  <p className="mt-1 text-sm text-slate-500">
                    Your favorite products in one place
                  </p>

                </div>

              </div>

              <div
                className="
                  inline-flex
                  w-fit
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-slate-200
                  bg-white
                  px-4
                  py-2
                  text-sm
                  font-semibold
                  text-slate-600
                  shadow-sm
                "
              >
                <Heart
                  size={16}
                  className="text-blue-600"
                />

                {wishlist.length}{" "}
                {wishlist.length === 1
                  ? "Product"
                  : "Products"}{" "}
                Saved
              </div>

            </div>

          </div>

          {/* ==================================================
              PRODUCTS
          ================================================== */}

          <div
            className="
              grid
              grid-cols-1
              gap-6
              sm:grid-cols-2
              lg:grid-cols-3
              xl:grid-cols-4
            "
          >

            {wishlist.map((product) => {

              const imageUrl =
                getImageUrl(product.image);

              const isRemoving =
                removingId ===
                product.productId;

              return (
                <div
                  key={product.productId}
                  className="
                    group
                    overflow-hidden
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    shadow-sm
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-blue-100
                    hover:shadow-xl
                  "
                >

                  {/* ==================================================
                      IMAGE
                  ================================================== */}

                  <div
                    className="
                      relative
                      h-72
                      cursor-pointer
                      overflow-hidden
                      bg-slate-50
                    "
                    onClick={() =>
                      handleProductClick(
                        product.productId
                      )
                    }
                  >

                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={
                          product.name ||
                          "Product"
                        }
                        className="
                          h-full
                          w-full
                          object-contain
                          p-6
                          transition-transform
                          duration-500
                          group-hover:scale-105
                        "
                        onLoad={() => {
                          console.log(
                            "IMAGE LOADED:",
                            imageUrl
                          );
                        }}
                        onError={(event) => {
                          console.error(
                            "IMAGE LOAD FAILED:",
                            imageUrl
                          );

                          event.currentTarget.style.display =
                            "none";

                          const parent =
                            event.currentTarget
                              .parentElement;

                          if (parent) {
                            parent
                              .querySelector(
                                ".image-fallback"
                              )
                              ?.classList.remove(
                                "hidden"
                              );
                          }
                        }}
                      />
                    ) : null}

                    {/* IMAGE FALLBACK */}

                    <div
                      className={`
                        image-fallback
                        absolute
                        inset-0
                        flex
                        flex-col
                        items-center
                        justify-center
                        gap-2
                        text-slate-400
                        ${
                          imageUrl
                            ? "hidden"
                            : ""
                        }
                      `}
                    >
                      <Package size={42} />

                      <span className="text-sm">
                        No Image Available
                      </span>
                    </div>

                    {/* REMOVE BUTTON */}

                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();

                        handleRemove(
                          product.productId
                        );
                      }}
                      disabled={isRemoving}
                      className="
                        absolute
                        right-4
                        top-4
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-slate-200
                        bg-white
                        text-red-500
                        shadow-md
                        transition-all
                        duration-200
                        hover:bg-red-50
                        hover:text-red-600
                        hover:shadow-lg
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                      "
                      title="Remove from wishlist"
                    >

                      {isRemoving ? (
                        <span
                          className="
                            h-4
                            w-4
                            animate-spin
                            rounded-full
                            border-2
                            border-red-200
                            border-t-red-500
                          "
                        />
                      ) : (
                        <Trash2 size={18} />
                      )}

                    </button>

                    {/* WISHLIST BADGE */}

                    <div
                      className="
                        absolute
                        left-4
                        top-4
                        rounded-full
                        bg-blue-600
                        px-3
                        py-1.5
                        text-xs
                        font-bold
                        text-white
                        shadow-md
                      "
                    >
                      Saved
                    </div>

                  </div>

                  {/* ==================================================
                      PRODUCT INFO
                  ================================================== */}

                  <div className="p-5">

                    <h2
                      className="
                        cursor-pointer
                        truncate
                        text-base
                        font-bold
                        text-slate-900
                        transition
                        hover:text-blue-600
                      "
                      title={product.name}
                      onClick={() =>
                        handleProductClick(
                          product.productId
                        )
                      }
                    >
                      {product.name}
                    </h2>

                    {product.description && (
                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
                        {product.description}
                      </p>
                    )}

                    {/* PRICE */}

                    <div className="mt-4 flex items-center justify-between">

                      <div>

                        <p className="text-2xl font-bold text-blue-600">
                          ₹
                          {Number(
                            product.price || 0
                          ).toLocaleString(
                            "en-IN"
                          )}
                        </p>

                        <p className="mt-0.5 text-xs text-slate-400">
                          Inclusive of applicable taxes
                        </p>

                      </div>

                      {/* STOCK */}

                      {Number(product.stock) > 0 ? (
                        <span
                          className="
                            rounded-full
                            bg-blue-50
                            px-2.5
                            py-1
                            text-xs
                            font-semibold
                            text-blue-700
                          "
                        >
                          In Stock
                        </span>
                      ) : (
                        <span
                          className="
                            rounded-full
                            bg-red-50
                            px-2.5
                            py-1
                            text-xs
                            font-semibold
                            text-red-600
                          "
                        >
                          Out of Stock
                        </span>
                      )}

                    </div>

                    {/* VIEW PRODUCT */}

                    <button
                      type="button"
                      onClick={() =>
                        handleProductClick(
                          product.productId
                        )
                      }
                      className="
                        mt-5
                        flex
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        bg-blue-600
                        px-4
                        py-3
                        text-sm
                        font-bold
                        text-white
                        shadow-md
                        shadow-blue-600/10
                        transition-all
                        duration-200
                        hover:bg-blue-700
                        hover:shadow-lg
                        active:scale-[0.99]
                      "
                    >

                      <Eye size={17} />

                      View Product

                      <ArrowRight
                        size={17}
                        className="
                          transition-transform
                          duration-200
                          group-hover:translate-x-0.5
                        "
                      />

                    </button>

                  </div>

                </div>
              );
            })}

          </div>

        </div>
      </div>
    </MainLayout>
  );
}