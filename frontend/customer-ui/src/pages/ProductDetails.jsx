import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  Truck,
  ShieldCheck,
  RotateCcw,
  Share2,
  ArrowLeft,
} from "lucide-react";

import MainLayout from "../layouts/MainLayout";
import Breadcrumb from "../components/shop/Breadcrumb";
import ProductImage from "../components/product/ProductImage";
import ProductInfo from "../components/product/ProductInfo";
import RelatedProducts from "../components/product/RelatedProducts";
import ProductReviews from "../components/product/ProductReviews";

import { getProductDetails } from "../services/productService";

export default function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareCopied, setShareCopied] = useState(false);

  // ============================================================
  // FETCH PRODUCT
  // ============================================================

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);

      const response = await getProductDetails(id);

      console.log("PRODUCT DETAILS:", response);

      setProduct(response.data);
    } catch (error) {
      console.log("ERROR:", error);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // SHARE PRODUCT
  // ============================================================

  const handleShare = async () => {
    if (!product) return;

    const shareUrl = window.location.href;

    try {
      // ========================================================
      // NATIVE SHARE
      // ========================================================

      if (navigator.share) {
        await navigator.share({
          title: product.name || "Product",
          text: `Check out ${product.name || "this product"}`,
          url: shareUrl,
        });

        return;
      }

      // ========================================================
      // CLIPBOARD
      // ========================================================

      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);

        setShareCopied(true);

        setTimeout(() => {
          setShareCopied(false);
        }, 2000);

        return;
      }

      // ========================================================
      // FALLBACK COPY
      // ========================================================

      const textArea = document.createElement("textarea");

      textArea.value = shareUrl;

      document.body.appendChild(textArea);

      textArea.select();

      document.execCommand("copy");

      document.body.removeChild(textArea);

      setShareCopied(true);

      setTimeout(() => {
        setShareCopied(false);
      }, 2000);
    } catch (error) {
      if (error?.name !== "AbortError") {
        console.error("SHARE ERROR:", error);
      }
    }
  };

  // ============================================================
  // LOADING STATE
  // ============================================================

  if (loading) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-slate-50">

          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

            <Breadcrumb />

            {/* PAGE SKELETON */}

            <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">

              {/* IMAGE SKELETON */}

              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

                <div className="aspect-square animate-pulse bg-slate-200" />

                <div className="flex gap-3 border-t border-slate-100 p-4">

                  <div className="h-16 w-16 animate-pulse rounded-xl bg-slate-200" />

                  <div className="h-16 w-16 animate-pulse rounded-xl bg-slate-200" />

                  <div className="h-16 w-16 animate-pulse rounded-xl bg-slate-200" />

                </div>

              </div>

              {/* INFO SKELETON */}

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

                <div className="h-6 w-28 animate-pulse rounded-full bg-slate-200" />

                <div className="mt-5 h-10 w-4/5 animate-pulse rounded-lg bg-slate-200" />

                <div className="mt-5 h-5 w-40 animate-pulse rounded bg-slate-200" />

                <div className="mt-8 space-y-3">

                  <div className="h-4 w-full animate-pulse rounded bg-slate-200" />

                  <div className="h-4 w-11/12 animate-pulse rounded bg-slate-200" />

                  <div className="h-4 w-4/5 animate-pulse rounded bg-slate-200" />

                </div>

                <div className="mt-8 h-12 w-36 animate-pulse rounded-xl bg-slate-200" />

                <div className="mt-8 h-14 w-full animate-pulse rounded-xl bg-slate-200" />

                <div className="mt-4 h-14 w-full animate-pulse rounded-xl bg-slate-200" />

              </div>

            </div>

            {/* BENEFITS SKELETON */}

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">

              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-24 animate-pulse rounded-2xl border border-slate-200 bg-white"
                />
              ))}

            </div>

          </div>

        </div>
      </MainLayout>
    );
  }

  // ============================================================
  // PRODUCT NOT FOUND
  // ============================================================

  if (!product) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-slate-50">

          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

            <Breadcrumb />

            <div className="flex min-h-[550px] items-center justify-center">

              <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">

                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-50 text-red-500">

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v4m0 4h.01M10.29 3.86l-8.18 14A2 2 0 003.82 21h16.36a2 2 0 001.71-3.14l-8.18-14a2 2 0 003.42 0z"
                    />
                  </svg>

                </div>

                <h1 className="mt-6 text-2xl font-bold text-slate-900">
                  Product not found
                </h1>

                <p className="mt-2 leading-6 text-slate-500">
                  We couldn't find the product you're looking for.
                  It may have been removed or is no longer available.
                </p>

                <button
                  type="button"
                  onClick={() => window.history.back()}
                  className="
                    mt-7
                    inline-flex
                    items-center
                    gap-2
                    rounded-xl
                    bg-blue-600
                    px-5
                    py-3
                    text-sm
                    font-semibold
                    text-white
                    shadow-lg
                    shadow-blue-600/20
                    transition
                    hover:bg-blue-700
                  "
                >
                  <ArrowLeft size={17} />
                  Go Back
                </button>

              </div>

            </div>

          </div>

        </div>
      </MainLayout>
    );
  }

  // ============================================================
  // PRODUCT DETAILS
  // ============================================================

  return (
    <MainLayout>

      <div className="min-h-screen bg-slate-50">

        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

          {/* ==================================================
              BREADCRUMB
          ================================================== */}

          <Breadcrumb />

          {/* ==================================================
              PRODUCT HEADER
          ================================================== */}

          <div className="mt-7 flex flex-col gap-3 border-b border-slate-200 pb-6 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <p className="text-sm font-semibold text-blue-600">
                Product Details
              </p>

              <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                {product.name}
              </h1>

            </div>

            {/* SHARE */}

            <div className="relative flex items-center gap-2">

              <button
                type="button"
                onClick={handleShare}
                className="
                  group
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  text-slate-500
                  shadow-sm
                  transition
                  duration-200
                  hover:-translate-y-0.5
                  hover:border-blue-200
                  hover:bg-blue-50
                  hover:text-blue-600
                  hover:shadow-md
                "
                title="Share product"
                aria-label="Share product"
              >
                <Share2
                  size={19}
                  className="
                    transition-transform
                    duration-200
                    group-hover:scale-110
                  "
                />
              </button>

              {/* COPY SUCCESS */}

              {shareCopied && (
                <div
                  className="
                    absolute
                    right-0
                    top-14
                    z-50
                    whitespace-nowrap
                    rounded-lg
                    bg-slate-900
                    px-3
                    py-2
                    text-xs
                    font-semibold
                    text-white
                    shadow-lg
                  "
                >
                  Link copied!
                </div>
              )}

            </div>

          </div>

          {/* ==================================================
              MAIN PRODUCT SECTION
          ================================================== */}

          <div className="mt-8 grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-12">

            {/* PRODUCT IMAGE */}

            <div className="lg:sticky lg:top-24">

              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

                {/* IMAGE HEADER */}

                <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">

                  <div className="flex items-center gap-2">

                    <span className="h-2.5 w-2.5 rounded-full bg-blue-600" />

                    <span className="text-sm font-semibold text-slate-700">
                      Product Preview
                    </span>

                  </div>

                  {product.stock > 0 && (
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                      Available
                    </span>
                  )}

                </div>

                {/* PRODUCT IMAGE */}

                <div className="bg-slate-50 p-3 sm:p-5">

                  <div className="overflow-hidden rounded-2xl bg-white">

                    <ProductImage product={product} />

                  </div>

                </div>

              </div>

            </div>

            {/* PRODUCT INFORMATION */}

            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

              <div className="p-6 sm:p-8">

                <ProductInfo product={product} />

              </div>

            </div>

          </div>

          {/* ==================================================
              TRUST / BENEFITS
          ================================================== */}

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">

            {/* FAST DELIVERY */}

            <div
              className="
                group
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-5
                shadow-sm
                transition
                duration-200
                hover:-translate-y-0.5
                hover:border-blue-200
                hover:shadow-md
              "
            >
              <div className="flex items-center gap-4">

                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">

                  <Truck size={22} />

                </div>

                <div>

                  <p className="text-sm font-bold text-slate-900">
                    Fast Delivery
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Quick and reliable shipping
                  </p>

                </div>

              </div>
            </div>

            {/* SECURE PAYMENT */}

            <div
              className="
                group
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-5
                shadow-sm
                transition
                duration-200
                hover:-translate-y-0.5
                hover:border-blue-200
                hover:shadow-md
              "
            >
              <div className="flex items-center gap-4">

                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">

                  <ShieldCheck size={22} />

                </div>

                <div>

                  <p className="text-sm font-bold text-slate-900">
                    Secure Payment
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Safe and protected checkout
                  </p>

                </div>

              </div>
            </div>

            {/* EASY RETURNS */}

            <div
              className="
                group
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-5
                shadow-sm
                transition
                duration-200
                hover:-translate-y-0.5
                hover:border-blue-200
                hover:shadow-md
              "
            >
              <div className="flex items-center gap-4">

                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">

                  <RotateCcw size={22} />

                </div>

                <div>

                  <p className="text-sm font-bold text-slate-900">
                    Easy Returns
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Simple return experience
                  </p>

                </div>

              </div>
            </div>

          </div>

          {/* ==================================================
              PRODUCT DESCRIPTION
          ================================================== */}

          <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

            <div className="max-w-4xl">

              <div className="flex items-center gap-3">

                <div className="h-8 w-1 rounded-full bg-blue-600" />

                <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
                  About this product
                </h2>

              </div>

              <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base">
                {product.description ||
                  "No description available for this product."}
              </p>

            </div>

          </section>

          {/* ==================================================
              CUSTOMER REVIEWS
          ================================================== */}

          <ProductReviews productId={product.id} />

          {/* ==================================================
              RELATED PRODUCTS
          ================================================== */}

          <section className="mt-14 sm:mt-16">

            <div className="mb-7">

              <div className="flex items-center gap-3">

                <div className="h-8 w-1 rounded-full bg-blue-600" />

                <div>

                  <p className="text-sm font-semibold text-blue-600">
                    More to explore
                  </p>

                  <h2 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
                    Related Products
                  </h2>

                </div>

              </div>

              <p className="mt-3 text-sm text-slate-500">
                Discover more products you might like.
              </p>

            </div>

            <RelatedProducts />

          </section>

        </div>

      </div>

    </MainLayout>
  );
}