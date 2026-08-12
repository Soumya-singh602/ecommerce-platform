import { ShoppingBag } from "lucide-react";

export default function RelatedProducts() {
  return (
    <section className="mt-16 border-t border-slate-200 pt-10">

      {/* HEADER */}

      <div className="mb-7 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            You may also like
          </p>

          <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Related Products
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Discover more products you might be interested in.
          </p>
        </div>

      </div>


      {/* EMPTY STATE */}

      <div
        className="
          flex
          min-h-[220px]
          flex-col
          items-center
          justify-center
          rounded-2xl
          border
          border-blue-100
          bg-blue-50/50
          px-6
          py-10
          text-center
        "
      >

        {/* ICON */}

        <div
          className="
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            bg-white
            text-blue-600
            shadow-sm
            ring-1
            ring-blue-100
          "
        >
          <ShoppingBag size={25} />
        </div>


        {/* TEXT */}

        <h3 className="mt-5 text-lg font-bold text-slate-900">
          More products coming soon
        </h3>

        <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
          We are preparing more products for you.
          Check back soon to discover something new.
        </p>


        {/* DECORATIVE DOTS */}

        <div className="mt-5 flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
          <span className="h-1.5 w-1.5 rounded-full bg-blue-300" />
          <span className="h-1.5 w-1.5 rounded-full bg-blue-200" />
        </div>

      </div>

    </section>
  );
}