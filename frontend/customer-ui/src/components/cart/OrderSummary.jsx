
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Truck, ArrowRight } from "lucide-react";

export default function OrderSummary({ cartItems }) {

    const navigate = useNavigate();


    // =========================
    // CALCULATE SUBTOTAL
    // =========================

    const subtotal = cartItems.reduce(
        (total, item) => {
            return (
                total +
                Number(item.price || 0) *
                Number(item.quantity || 1)
            );
        },
        0
    );


    // =========================
    // CHARGES
    // =========================

    const shipping = subtotal > 0 ? 99 : 0;

    const tax = Math.round(subtotal * 0.005);

    const totalAmount = subtotal + shipping + tax;


    const formatPrice = (amount) =>
        Number(amount).toLocaleString("en-IN");


    // =========================
    // CHECKOUT
    // =========================

    const handleCheckout = () => {

        navigate("/checkout", {
            state: {
                cartItems: cartItems
            }
        });

    };


    return (

        <div className="
            bg-white
            border
            border-gray-200
            rounded-2xl
            shadow-sm
            overflow-hidden
        ">


            {/* ================= HEADER ================= */}

            <div className="px-6 py-5 border-b border-gray-100">

                <h2 className="text-xl font-bold text-gray-900">
                    Order Summary
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                    Review your order before checkout.
                </p>

            </div>


            {/* ================= SUMMARY ================= */}

            <div className="p-6">


                <div className="space-y-4">


                    {/* SUBTOTAL */}

                    <div className="flex justify-between text-sm">

                        <span className="text-gray-500">
                            Subtotal
                        </span>

                        <span className="font-medium text-gray-900">
                            ₹{formatPrice(subtotal)}
                        </span>

                    </div>


                    {/* SHIPPING */}

                    <div className="flex justify-between text-sm">

                        <span className="text-gray-500">
                            Shipping
                        </span>

                        <span className="font-medium text-gray-900">
                            ₹{formatPrice(shipping)}
                        </span>

                    </div>


                    {/* TAX */}

                    <div className="flex justify-between text-sm">

                        <span className="text-gray-500">
                            Tax
                        </span>

                        <span className="font-medium text-gray-900">
                            ₹{formatPrice(tax)}
                        </span>

                    </div>


                    <div className="border-t border-dashed border-gray-200 pt-5">


                        {/* TOTAL */}

                        <div className="flex justify-between items-center">

                            <span className="text-lg font-bold text-gray-900">
                                Total
                            </span>

                            <span className="text-2xl font-bold text-indigo-600">
                                ₹{formatPrice(totalAmount)}
                            </span>

                        </div>

                    </div>

                </div>


                {/* ================= CHECKOUT BUTTON ================= */}

                <button
                    type="button"
                    onClick={handleCheckout}
                    disabled={cartItems.length === 0}
                    className="
                        w-full
                        mt-6
                        bg-indigo-600
                        hover:bg-indigo-700
                        disabled:bg-gray-300
                        disabled:cursor-not-allowed
                        text-white
                        py-3.5
                        rounded-xl
                        font-semibold
                        flex
                        items-center
                        justify-center
                        gap-2
                        transition
                    "
                >

                    Proceed to Checkout

                    <ArrowRight size={18} />

                </button>


                {/* ================= BENEFITS ================= */}

                <div className="mt-6 space-y-3">


                    <div className="flex items-center gap-3">

                        <div className="w-9 h-9 rounded-lg bg-green-50 text-green-600 flex items-center justify-center">

                            <ShieldCheck size={18} />

                        </div>

                        <div>

                            <p className="text-sm font-medium text-gray-800">
                                Secure Checkout
                            </p>

                            <p className="text-xs text-gray-500">
                                Your payment is protected
                            </p>

                        </div>

                    </div>


                    <div className="flex items-center gap-3">

                        <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">

                            <Truck size={18} />

                        </div>

                        <div>

                            <p className="text-sm font-medium text-gray-800">
                                Reliable Delivery
                            </p>

                            <p className="text-xs text-gray-500">
                                Fast and secure shipping
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );
}
