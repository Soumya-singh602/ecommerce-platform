
import { ShoppingBag, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import Breadcrumb from "../components/shop/Breadcrumb";
import CartItem from "../components/cart/CartItem";
import OrderSummary from "../components/cart/OrderSummary";
import { useCart } from "../context/CartContext";

export default function Cart() {

    const { cartItems } = useCart();

    console.log("CART ITEMS:", cartItems);

    return (

        <MainLayout>

            <div className="min-h-screen bg-gray-50">

                <div className="max-w-7xl mx-auto px-4 py-8 md:py-10">

                    <Breadcrumb />


                    {/* ================= HEADER ================= */}

                    <div className="mt-8 mb-8">

                        <div className="flex items-center gap-3">

                            <div className="w-11 h-11 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">

                                <ShoppingBag size={22} />

                            </div>

                            <div>

                                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                                    Shopping Cart
                                </h1>

                                <p className="text-gray-500 mt-1">
                                    Review your items before checkout.
                                </p>

                            </div>

                        </div>

                    </div>


                    {/* ================= EMPTY CART ================= */}

                    {cartItems.length === 0 ? (

                        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-10 md:p-16 text-center">

                            <div className="w-20 h-20 mx-auto rounded-full bg-gray-100 flex items-center justify-center text-gray-400">

                                <ShoppingBag size={36} />

                            </div>

                            <h2 className="text-2xl font-bold text-gray-900 mt-6">
                                Your cart is empty
                            </h2>

                            <p className="text-gray-500 mt-2 max-w-md mx-auto">
                                Looks like you haven't added anything to your
                                cart yet. Explore our products and find
                                something you love.
                            </p>

                            <Link
                                to="/shop"
                                className="inline-flex items-center gap-2 mt-7 bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
                            >

                                Continue Shopping

                                <ArrowRight size={18} />

                            </Link>

                        </div>

                    ) : (

                        /* ================= CART ================= */

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                            {/* ================= ITEMS ================= */}

                            <div className="lg:col-span-2">

                                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

                                    <div className="px-5 md:px-6 py-5 border-b border-gray-100 flex items-center justify-between">

                                        <div>

                                            <h2 className="text-lg font-bold text-gray-900">
                                                Cart Items
                                            </h2>

                                            <p className="text-sm text-gray-500 mt-1">
                                                {cartItems.length}{" "}
                                                {cartItems.length === 1
                                                    ? "item"
                                                    : "items"}{" "}
                                                in your cart
                                            </p>

                                        </div>

                                    </div>


                                    <div className="p-4 md:p-6 space-y-4">

                                        {cartItems.map((item) => (

                                            <CartItem
                                                key={item.id}
                                                product={item}
                                            />

                                        ))}

                                    </div>

                                </div>


                                {/* CONTINUE SHOPPING */}

                                <Link
                                    to="/shop"
                                    className="inline-flex items-center gap-2 mt-5 text-indigo-600 font-semibold hover:text-indigo-700 transition"
                                >

                                    <span className="text-lg">
                                        ←
                                    </span>

                                    Continue Shopping

                                </Link>

                            </div>


                            {/* ================= SUMMARY ================= */}

                            <div className="lg:sticky lg:top-24 h-fit">

                                <OrderSummary
                                    cartItems={cartItems}
                                />

                            </div>

                        </div>

                    )}

                </div>

            </div>

        </MainLayout>
    );
}
