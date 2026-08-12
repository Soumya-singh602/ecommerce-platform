import {
  ShoppingBag,
  Truck,
  Receipt,
  Package,
} from "lucide-react";

export default function CheckoutSummary({
  product,
  quantity,
  cartItems,
}) {
  let subtotal = 0;

  if (product) {
    subtotal =
      Number(product.price || 0) *
      (quantity || 1);
  } else if (cartItems) {
    subtotal = cartItems.reduce(
      (total, item) =>
        total +
        Number(item.price || 0) *
          (item.quantity || 1),
      0
    );
  }

  const shipping = 99;
  const tax = 300;
  const total = subtotal + shipping + tax;

  const totalQuantity = product
    ? quantity || 1
    : cartItems?.reduce(
        (total, item) =>
          total + (item.quantity || 1),
        0
      ) || 0;

  const formatPrice = (price) =>
    Number(price).toLocaleString("en-IN");

  return (
    <div
      className="
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        shadow-sm
      "
    >

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div
        className="
          border-b
          border-slate-100
          bg-slate-50
          px-6
          py-5
        "
      >

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-lg font-bold text-slate-900">
              Order Summary
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Review your order before placing it
            </p>

          </div>

          <div
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-xl
              bg-blue-100
              text-blue-600
            "
          >
            <ShoppingBag size={21} />
          </div>

        </div>

      </div>


      {/* =====================================================
          PRODUCTS
      ===================================================== */}

      <div className="p-5">

        <div className="space-y-3">

          {/* BUY NOW */}

          {product && (
            <div
              className="
                flex
                items-center
                gap-3
                rounded-xl
                border
                border-slate-100
                bg-slate-50
                p-3
              "
            >

              <div
                className="
                  flex
                  h-12
                  w-12
                  flex-shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  bg-blue-100
                  text-blue-600
                "
              >
                <Package size={20} />
              </div>


              <div className="min-w-0 flex-1">

                <p
                  className="
                    truncate
                    text-sm
                    font-semibold
                    text-slate-800
                  "
                >
                  {product.name}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Quantity: {quantity || 1}
                </p>

              </div>


              <p className="text-sm font-bold text-slate-800">
                ₹
                {formatPrice(
                  Number(product.price || 0) *
                    (quantity || 1)
                )}
              </p>

            </div>
          )}


          {/* CART ITEMS */}

          {cartItems &&
            cartItems.map((item) => (
              <div
                key={item.id}
                className="
                  flex
                  items-center
                  gap-3
                  rounded-xl
                  border
                  border-slate-100
                  bg-slate-50
                  p-3
                "
              >

                <div
                  className="
                    flex
                    h-12
                    w-12
                    flex-shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    bg-blue-100
                    text-blue-600
                  "
                >
                  <Package size={20} />
                </div>


                <div className="min-w-0 flex-1">

                  <p
                    className="
                      truncate
                      text-sm
                      font-semibold
                      text-slate-800
                    "
                  >
                    {item.name}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Quantity: {item.quantity || 1}
                  </p>

                </div>


                <p className="text-sm font-bold text-slate-800">

                  ₹
                  {formatPrice(
                    Number(item.price || 0) *
                      (item.quantity || 1)
                  )}

                </p>

              </div>
            ))}

        </div>


        {/* =================================================
            PRICE DETAILS
        ================================================= */}

        <div className="mt-5 border-t border-slate-200 pt-5">

          <div className="space-y-4">

            {/* SUBTOTAL */}

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-2">

                <Receipt
                  size={16}
                  className="text-slate-400"
                />

                <span className="text-sm text-slate-500">
                  Subtotal
                </span>

              </div>

              <span className="text-sm font-semibold text-slate-800">
                ₹{formatPrice(subtotal)}
              </span>

            </div>


            {/* SHIPPING */}

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-2">

                <Truck
                  size={16}
                  className="text-slate-400"
                />

                <span className="text-sm text-slate-500">
                  Shipping
                </span>

              </div>

              <span className="text-sm font-semibold text-slate-800">
                ₹{formatPrice(shipping)}
              </span>

            </div>


            {/* TAX */}

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-2">

                <Receipt
                  size={16}
                  className="text-slate-400"
                />

                <span className="text-sm text-slate-500">
                  Tax
                </span>

              </div>

              <span className="text-sm font-semibold text-slate-800">
                ₹{formatPrice(tax)}
              </span>

            </div>

          </div>

        </div>


        {/* =================================================
            TOTAL
        ================================================= */}

        <div
          className="
            mt-5
            rounded-xl
            bg-blue-600
            p-4
            text-white
            shadow-md
            shadow-blue-600/20
          "
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-medium text-blue-100">
                Total Amount
              </p>

              <p className="mt-1 text-xs text-blue-200">
                {totalQuantity}{" "}
                {totalQuantity === 1
                  ? "item"
                  : "items"}
              </p>

            </div>


            <p className="text-2xl font-bold">
              ₹{formatPrice(total)}
            </p>

          </div>

        </div>


        {/* =================================================
            SHIPPING MESSAGE
        ================================================= */}

        <div
          className="
            mt-4
            flex
            items-start
            gap-2
            rounded-xl
            bg-blue-50
            px-4
            py-3
          "
        >

          <Truck
            size={16}
            className="mt-0.5 flex-shrink-0 text-blue-600"
          />

          <p className="text-xs leading-5 text-blue-700">
            Your order will be delivered to the
            address provided above.
          </p>

        </div>

      </div>

    </div>
  );
}