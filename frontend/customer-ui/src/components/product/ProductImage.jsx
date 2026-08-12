export default function ProductImage({ product }) {
  const imageUrl = product?.image
    ? `${import.meta.env.VITE_MEDIA_URL}${product.image}`
    : "/placeholder.png";

  return (
    <div
      className="
        group
        relative
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        shadow-sm
        transition
        duration-300
        hover:shadow-xl
        hover:shadow-blue-100
      "
    >
      {/* IMAGE CONTAINER */}

      <div className="relative flex min-h-[500px] items-center justify-center overflow-hidden bg-slate-50">

        <img
          src={imageUrl}
          alt={product?.name || "Product"}
          className="
            h-[500px]
            w-full
            object-contain
            p-6
            transition
            duration-500
            ease-out
            group-hover:scale-105
          "
        />

        {/* IMAGE OVERLAY */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-gradient-to-t
            from-black/5
            via-transparent
            to-transparent
            opacity-0
            transition
            duration-300
            group-hover:opacity-100
          "
        />
      </div>

      {/* PRODUCT STATUS */}

      {product?.stock > 0 && (
        <div className="absolute left-5 top-5">
          <span
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-blue-600
              px-3
              py-1.5
              text-xs
              font-semibold
              text-white
              shadow-lg
              shadow-blue-600/20
            "
          >
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            In Stock
          </span>
        </div>
      )}

      {product?.stock <= 0 && (
        <div className="absolute left-5 top-5">
          <span
            className="
              inline-flex
              items-center
              rounded-full
              bg-red-600
              px-3
              py-1.5
              text-xs
              font-semibold
              text-white
              shadow-lg
              shadow-red-600/20
            "
          >
            Out of Stock
          </span>
        </div>
      )}
    </div>
  );
}