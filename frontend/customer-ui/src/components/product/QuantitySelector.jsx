import { useEffect, useState } from "react";

export default function QuantitySelector({
  onQuantityChange,
  maxQuantity,
}) {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    onQuantityChange(quantity);
  }, [quantity, onQuantityChange]);

  const increase = () => {
    if (maxQuantity && quantity >= maxQuantity) {
      return;
    }

    setQuantity((prev) => prev + 1);
  };

  const decrease = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  return (
    <div className="flex items-center gap-3">

      {/* LABEL */}

      <span className="mr-2 text-sm font-semibold text-slate-700">
        Quantity
      </span>

      {/* QUANTITY BOX */}

      <div
        className="
          flex
          items-center
          overflow-hidden
          rounded-xl
          border
          border-slate-200
          bg-white
          shadow-sm
        "
      >

        {/* DECREASE */}

        <button
          type="button"
          onClick={decrease}
          disabled={quantity <= 1}
          aria-label="Decrease quantity"
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            text-xl
            font-medium
            text-slate-600
            transition
            duration-200
            hover:bg-blue-50
            hover:text-blue-600
            disabled:cursor-not-allowed
            disabled:text-slate-300
          "
        >
          −
        </button>

        {/* NUMBER */}

        <div
          className="
            flex
            h-10
            min-w-[48px]
            items-center
            justify-center
            border-x
            border-slate-200
            bg-slate-50
            px-3
            text-sm
            font-bold
            text-slate-900
          "
        >
          {quantity}
        </div>

        {/* INCREASE */}

        <button
          type="button"
          onClick={increase}
          disabled={
            maxQuantity && quantity >= maxQuantity
          }
          aria-label="Increase quantity"
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            text-xl
            font-medium
            text-slate-600
            transition
            duration-200
            hover:bg-blue-50
            hover:text-blue-600
            disabled:cursor-not-allowed
            disabled:text-slate-300
          "
        >
          +
        </button>

      </div>

      {/* MAX STOCK */}

      {maxQuantity && (
        <span className="text-xs text-slate-400">
          Max {maxQuantity}
        </span>
      )}

    </div>
  );
}