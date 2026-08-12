
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
    ArrowLeft,
    Package,
    MapPin,
    Phone,
    CalendarDays,
    CreditCard,
    XCircle,
    ShoppingBag,
} from "lucide-react";

import MainLayout from "../layouts/MainLayout";

import {
    getOrderDetail,
    cancelOrder,
} from "../services/orderService";

export default function OrderDetails() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);


    // ============================================================
    // FETCH ORDER
    // ============================================================

    useEffect(() => {

        fetchOrder();

    }, [id]);


    const fetchOrder = async () => {

        try {

            setLoading(true);

            const response =
                await getOrderDetail(id);

            console.log(
                "ORDER DETAIL RESPONSE:",
                response
            );

            setOrder(
                response?.data || null
            );

        } catch (error) {

            console.log(
                "ORDER DETAIL ERROR:",
                error
            );

            setOrder(null);

        } finally {

            setLoading(false);

        }

    };


    // ============================================================
    // CANCEL ORDER
    // ============================================================

    const handleCancelOrder = async () => {

        const confirmed = window.confirm(
            "Are you sure you want to cancel this order?"
        );

        if (!confirmed) {
            return;
        }

        try {

            await cancelOrder(id);

            alert(
                "Order cancelled successfully"
            );

            fetchOrder();

        } catch (error) {

            console.log(
                "CANCEL ERROR:",
                error
            );

            alert(
                "Unable to cancel order"
            );

        }

    };


    // ============================================================
    // STATUS STYLE
    // ============================================================

    const getStatusStyle = (status) => {

        switch (status) {

            case "Delivered":

                return "bg-green-50 text-green-700 border-green-200";

            case "Shipped":

                return "bg-blue-50 text-blue-700 border-blue-200";

            case "Confirmed":

                return "bg-indigo-50 text-indigo-700 border-indigo-200";

            case "Cancelled":

                return "bg-red-50 text-red-700 border-red-200";

            default:

                return "bg-yellow-50 text-yellow-700 border-yellow-200";

        }

    };


    // ============================================================
    // LOADING
    // ============================================================

    if (loading) {

        return (

            <MainLayout>

                <div className="bg-slate-50 min-h-screen">

                    <div className="max-w-6xl mx-auto px-4 py-12">

                        <div className="animate-pulse space-y-6">

                            <div className="h-5 bg-gray-200 rounded w-32" />

                            <div className="h-10 bg-gray-200 rounded w-64" />

                            <div className="bg-white rounded-2xl p-6 border border-gray-100">

                                <div className="flex flex-col md:flex-row gap-6">

                                    <div className="w-full md:w-48 h-48 bg-gray-200 rounded-xl" />

                                    <div className="flex-1 space-y-4">

                                        <div className="h-7 bg-gray-200 rounded w-1/2" />

                                        <div className="h-4 bg-gray-200 rounded w-3/4" />

                                        <div className="h-6 bg-gray-200 rounded w-32" />

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </MainLayout>

        );

    }


    // ============================================================
    // ORDER NOT FOUND
    // ============================================================

    if (!order) {

        return (

            <MainLayout>

                <div className="bg-slate-50 min-h-screen">

                    <div className="max-w-6xl mx-auto px-4 py-20 text-center">

                        <div className="w-20 h-20 mx-auto rounded-full bg-red-50 flex items-center justify-center">

                            <Package
                                size={36}
                                className="text-red-500"
                            />

                        </div>

                        <h1 className="text-2xl font-bold text-gray-900 mt-6">

                            Order Not Found

                        </h1>

                        <p className="text-gray-500 mt-2">

                            We couldn't find the order you're looking for.

                        </p>

                        <button

                            onClick={() =>
                                navigate("/orders")
                            }

                            className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"

                        >

                            Back To Orders

                        </button>

                    </div>

                </div>

            </MainLayout>

        );

    }


    // ============================================================
    // PRODUCT DATA
    // ============================================================

    const mediaUrl =
        import.meta.env.VITE_MEDIA_URL || "";


    const image = order.product?.image;


    const productImage = image
        ? (
            image.startsWith("http://") ||
            image.startsWith("https://")
        )
            ? image
            : `${mediaUrl.replace(
                /\/$/,
                ""
            )}/${image.replace(
                /^\//,
                ""
            )}`
        : null;


    const price =
        Number(
            order.product?.price || 0
        );


    const quantity =
        Number(
            order.quantity || 0
        );


    const total =
        price * quantity;


    const paymentStatus =
        order.payment_status ||
        "pending";


    return (

        <MainLayout>

            <div className="bg-slate-50 min-h-screen">

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">


                    {/* ==================================================
                        BACK
                    ================================================== */}

                    <button

                        onClick={() =>
                            navigate("/orders")
                        }

                        className="flex items-center gap-2 text-gray-500 hover:text-blue-600 font-medium transition"

                    >

                        <ArrowLeft size={18} />

                        Back To Orders

                    </button>


                    {/* ==================================================
                        HEADER
                    ================================================== */}

                    <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                        <div>

                            <p className="text-blue-600 font-semibold text-sm uppercase tracking-wider">

                                Order Details

                            </p>

                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-1">

                                Order #{order.id}

                            </h1>

                            <div className="flex items-center gap-2 text-gray-500 mt-2">

                                <CalendarDays size={16} />

                                {order.created_at
                                    ? new Date(
                                        order.created_at
                                    ).toLocaleDateString(
                                        "en-IN",
                                        {
                                            day: "2-digit",
                                            month: "long",
                                            year: "numeric",
                                        }
                                    )
                                    : "N/A"}

                            </div>

                        </div>


                        <span
                            className={`w-fit px-4 py-2 rounded-full border text-sm font-semibold ${getStatusStyle(
                                order.status
                            )}`}
                        >

                            {order.status}

                        </span>

                    </div>


                    {/* ==================================================
                        MAIN GRID
                    ================================================== */}

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">


                        {/* ==================================================
                            LEFT CONTENT
                        ================================================== */}

                        <div className="lg:col-span-2 space-y-6">


                            {/* PRODUCT CARD */}

                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

                                <div className="px-6 py-4 border-b border-gray-100">

                                    <h2 className="font-bold text-gray-900">

                                        Product Details

                                    </h2>

                                </div>


                                <div className="p-6">

                                    <div className="flex flex-col sm:flex-row gap-6">


                                        {/* IMAGE */}

                                        <div className="w-full sm:w-44 h-44 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">

                                            {productImage ? (

                                                <img

                                                    src={productImage}

                                                    alt={
                                                        order.product?.name ||
                                                        "Product"
                                                    }

                                                    className="w-full h-full object-cover"

                                                    onError={(e) => {

                                                        e.currentTarget.style.display =
                                                            "none";

                                                    }}

                                                />

                                            ) : (

                                                <div className="w-full h-full flex items-center justify-center">

                                                    <ShoppingBag
                                                        size={38}
                                                        className="text-gray-300"
                                                    />

                                                </div>

                                            )}

                                        </div>


                                        {/* INFO */}

                                        <div className="flex-1">

                                            <h2 className="text-2xl font-bold text-gray-900">

                                                {order.product?.name ||
                                                    "Product"}

                                            </h2>


                                            <p className="text-gray-500 mt-2 leading-relaxed">

                                                {order.product?.description ||
                                                    "Quality product from our collection."}

                                            </p>


                                            <div className="flex flex-wrap gap-8 mt-6">

                                                <div>

                                                    <p className="text-xs text-gray-400 uppercase tracking-wide">

                                                        Unit Price

                                                    </p>

                                                    <p className="text-lg font-bold text-gray-900 mt-1">

                                                        ₹
                                                        {price.toLocaleString(
                                                            "en-IN"
                                                        )}

                                                    </p>

                                                </div>


                                                <div>

                                                    <p className="text-xs text-gray-400 uppercase tracking-wide">

                                                        Quantity

                                                    </p>

                                                    <p className="text-lg font-bold text-gray-900 mt-1">

                                                        {quantity}

                                                    </p>

                                                </div>


                                                <div>

                                                    <p className="text-xs text-gray-400 uppercase tracking-wide">

                                                        Product ID

                                                    </p>

                                                    <p className="text-lg font-bold text-gray-900 mt-1">

                                                        #{order.product_id}

                                                    </p>

                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>


                            {/* DELIVERY */}

                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

                                <div className="px-6 py-4 border-b border-gray-100">

                                    <h2 className="font-bold text-gray-900">

                                        Delivery Information

                                    </h2>

                                </div>


                                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">


                                    <div className="flex gap-3">

                                        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">

                                            <MapPin size={19} />

                                        </div>

                                        <div>

                                            <p className="text-xs text-gray-400 uppercase tracking-wide">

                                                Address

                                            </p>

                                            <p className="font-medium text-gray-800 mt-1">

                                                {order.address ||
                                                    "N/A"}

                                            </p>

                                            <p className="text-sm text-gray-500">

                                                {order.city &&
                                                    `${order.city}`}

                                                {order.pincode &&
                                                    ` - ${order.pincode}`}

                                            </p>

                                        </div>

                                    </div>


                                    <div className="flex gap-3">

                                        <div className="w-10 h-10 rounded-xl bg-gray-100 text-gray-600 flex items-center justify-center flex-shrink-0">

                                            <Phone size={19} />

                                        </div>

                                        <div>

                                            <p className="text-xs text-gray-400 uppercase tracking-wide">

                                                Phone

                                            </p>

                                            <p className="font-medium text-gray-800 mt-1">

                                                {order.phone ||
                                                    "N/A"}

                                            </p>

                                        </div>

                                    </div>

                                </div>

                            </div>


                            {/* ORDER STATUS */}

                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">

                                <h2 className="font-bold text-gray-900 mb-5">

                                    Order Status

                                </h2>


                                <div className="flex items-center">

                                    <div className="flex flex-col items-center">

                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${order.status === "Cancelled"
                                                ? "bg-red-100 text-red-600"
                                                : "bg-blue-100 text-blue-600"
                                            }`}>

                                            {order.status === "Cancelled" ? (
                                                <XCircle size={20} />
                                            ) : (
                                                <Package size={20} />
                                            )}

                                        </div>

                                    </div>


                                    <div className="ml-4">

                                        <p className="font-semibold text-gray-900">

                                            {order.status}

                                        </p>

                                        <p className="text-sm text-gray-500 mt-1">

                                            Your order is currently{" "}
                                            {order.status?.toLowerCase()}.

                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>


                        {/* ==================================================
                            RIGHT SUMMARY
                        ================================================== */}

                        <div>

                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:sticky lg:top-24">

                                <h2 className="text-xl font-bold text-gray-900">

                                    Order Summary

                                </h2>


                                <div className="mt-6 space-y-4">


                                    <div className="flex justify-between text-gray-600">

                                        <span>
                                            Product Price
                                        </span>

                                        <span className="font-medium text-gray-900">

                                            ₹
                                            {price.toLocaleString(
                                                "en-IN"
                                            )}

                                        </span>

                                    </div>


                                    <div className="flex justify-between text-gray-600">

                                        <span>
                                            Quantity
                                        </span>

                                        <span className="font-medium text-gray-900">

                                            {quantity}

                                        </span>

                                    </div>


                                    <div className="flex justify-between text-gray-600">

                                        <span>
                                            Payment
                                        </span>

                                        <span className="font-semibold capitalize text-green-600">

                                            {paymentStatus}

                                        </span>

                                    </div>


                                    <div className="border-t border-gray-100 pt-4 flex justify-between">

                                        <span className="font-bold text-gray-900">

                                            Total Amount

                                        </span>

                                        <span className="text-2xl font-bold text-blue-600">

                                            ₹
                                            {total.toLocaleString(
                                                "en-IN"
                                            )}

                                        </span>

                                    </div>

                                </div>


                                {/* PAYMENT */}

                                <div className="mt-6 p-4 rounded-xl bg-slate-50 flex items-center gap-3">

                                    <CreditCard
                                        size={20}
                                        className="text-blue-600"
                                    />

                                    <div>

                                        <p className="text-xs text-gray-400 uppercase tracking-wide">

                                            Payment Status

                                        </p>

                                        <p className="font-semibold capitalize text-gray-800 mt-1">

                                            {paymentStatus}

                                        </p>

                                    </div>

                                </div>


                                {/* ACTIONS */}

                                <div className="mt-6 space-y-3">

                                    {order.status !== "Cancelled" &&
                                        order.status !== "Delivered" && (

                                            <button

                                                onClick={
                                                    handleCancelOrder
                                                }

                                                className="w-full border border-red-200 text-red-600 py-3 rounded-xl font-semibold hover:bg-red-50 transition flex items-center justify-center gap-2"

                                            >

                                                <XCircle
                                                    size={18}
                                                />

                                                Cancel Order

                                            </button>

                                        )}


                                    <button

                                        onClick={() =>
                                            navigate("/shop")
                                        }

                                        className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"

                                    >

                                        Continue Shopping

                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </MainLayout>

    );

}

