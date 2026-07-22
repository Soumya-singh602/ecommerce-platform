import { useState, useEffect } from "react";

export default function QuantitySelector({ onQuantityChange }) {

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {

    onQuantityChange(quantity);

  }, [quantity, onQuantityChange]);

  const increase = () => {

    setQuantity(quantity + 1);

  };

  const decrease = () => {

    if (quantity > 1) {

      setQuantity(quantity - 1);

    }

  };

  return (

    <div className="flex items-center gap-4 mt-8">

      <button
        onClick={decrease}
        className="w-10 h-10 border rounded-lg text-xl hover:bg-gray-100"
      >
        -
      </button>

      <span className="text-xl font-semibold">
        {quantity}
      </span>

      <button
        onClick={increase}
        className="w-10 h-10 border rounded-lg text-xl hover:bg-gray-100"
      >
        +
      </button>

    </div>

  );

}