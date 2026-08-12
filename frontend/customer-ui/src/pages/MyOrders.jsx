
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    Package,
    MapPin,
    Phone,
    CalendarDays,
    ChevronRight,
    XCircle,
    CreditCard,
    ShoppingBag,
} from "lucide-react";

import MainLayout from "../layouts/MainLayout";

import {
    getOrders,
    cancelOrder,
} from "../services/orderService";

export default function MyOrders() {

    const navigate = useNavigate();

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const MEDIA_URL =
        import.meta.env.VITE_MEDIA_URL || "";


    // ============================================================
    // FETCH ORDERS
    // ============================================================

    useEffect(() => {

        fetchOrders();

    }, []);


    const fetchOrders = async () => {

        try {

            setLoading(true);

            const response = await getOrders();

            console.log(
                "ORDERS RESPONSE:",
                response
            );

            setOrders(
                response?.data?.orders || []
            );

        } catch (error) {

            console.log(
                "ORDER ERROR:",
                error
            );

            setOrders([]);

        } finally {

            setLoading(false);

        }

    };


    // ============================================================
    // PRODUCT IMAGE
    // ============================================================

    const getProductImage = (image) => {

        if (!image) {
            return null;
        }

        if (
            image.startsWith("http://") ||
            image.startsWith("https://")
        ) {

            return image;

        }

        return `${MEDIA_URL.replace(
            /\/$/,
            ""
        )}/${image.replace(
            /^\//,
            ""
        )}`;

    };


    // ============================================================
    // CANCEL ORDER
    // ============================================================

    const handleCancelOrder = async (id) => {

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

            fetchOrders();

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
    // PAYMENT STYLE
    // ============================================================

    const getPaymentStyle = (status) => {

        switch (status) {

            case "paid":

                return "text-green-600";

            case "failed":

                return "text-red-600";

            default:

                return "text-yellow-600";

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

                            <div className="h-9 bg-gray-200 rounded w-48" />

                            <div className="h-5 bg-gray-200 rounded w-80" />

                            {[1, 2, 3].map((item) => (

                                <div
                                    key={item}
                                    className="bg-white rounded-2xl p-6 border border-gray-100"
                                >

                                    <div className="flex gap-5">

                                        <div className="w-28 h-28 bg-gray-200 rounded-xl" />

                                        <div className="flex-1 space-y-4">

                                            <div className="h-5 bg-gray-200 rounded w-1/3" />

                                            <div className="h-4 bg-gray-200 rounded w-2/3" />

                                            <div className="h-4 bg-gray-200 rounded w-1/4" />

                                        </div>

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
    // UI
    // ============================================================

    return (

        <MainLayout>

            <div className="bg-slate-50 min-h-screen">

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">


                    {/* ==================================================
                        PAGE HEADER
                    ================================================== */}

                    <div className="mb-8">

                        <div className="flex items-center gap-3">

                            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-sm">

                                <Package size={24} />

                            </div>

                            <div>

                                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">

                                    My Orders

                                </h1>

                                <p className="text-gray-500 mt-1">

                                    Track and manage your recent orders

                                </p>

                            </div>

                        </div>

                    </div>


                    {/* ==================================================
                        EMPTY STATE
                    ================================================== */}

                    {orders.length === 0 ? (

                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm py-20 px-6 text-center">

                            <div className="w-20 h-20 mx-auto rounded-full bg-blue-50 flex items-center justify-center">

                                <ShoppingBag
                                    size={36}
                                    className="text-blue-600"
                                />

                            </div>

                            <h2 className="text-2xl font-bold text-gray-900 mt-6">

                                No orders yet

                            </h2>

                            <p className="text-gray-500 mt-2 max-w-md mx-auto">

                                You haven't placed any orders yet.
                                Start shopping and your orders will
                                appear here.

                            </p>

                            <button

                                onClick={() =>
                                    navigate("/shop")
                                }

                                className="mt-7 bg-blue-600 text-white px-7 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"

                            >

                                Start Shopping

                            </button>

                        </div>

                    ) : (

                        <div className="space-y-6">

                            {orders.map((order) => {

                                const productImage =
                                    getProductImage(
                                        order.product?.image
                                    );


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

                                    <div
                                        key={order.id}
                                        className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
                                    >


                                        {/* ==================================================
                                            ORDER HEADER
                                        ================================================== */}

                                        <div className="px-5 sm:px-6 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                                            <div>

                                                <div className="flex items-center gap-3">

                                                    <h2 className="font-bold text-gray-900">

                                                        Order #{order.id}

                                                    </h2>

                                                    <span
                                                        className={`px-3 py-1 rounded-full border text-xs font-semibold ${getStatusStyle(
                                                            order.status
                                                        )}`}
                                                    >

                                                        {order.status}

                                                    </span>

                                                </div>

                                                <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">

                                                    <CalendarDays
                                                        size={15}
                                                    />

                                                    {order.created_at
                                                        ? new Date(
                                                            order.created_at
                                                        ).toLocaleDateString(
                                                            "en-IN",
                                                            {
                                                                day: "2-digit",
                                                                month: "short",
                                                                year: "numeric",
                                                            }
                                                        )
                                                        : "N/A"}

                                                </div>

                                            </div>


                                            <div className="flex items-center gap-2 text-sm">

                                                <CreditCard
                                                    size={16}
                                                    className={
                                                        getPaymentStyle(
                                                            paymentStatus
                                                        )
                                                    }
                                                />

                                                <span className="text-gray-500">
                                                    Payment:
                                                </span>

                                                <span
                                                    className={`font-semibold capitalize ${getPaymentStyle(
                                                        paymentStatus
                                                    )}`}
                                                >

                                                    {paymentStatus}

                                                </span>

                                            </div>

                                        </div>


                                        {/* ==================================================
                                            PRODUCT
                                        ================================================== */}

                                        <div className="p-5 sm:p-6">

                                            <div className="flex flex-col sm:flex-row gap-5">


                                                {/* PRODUCT IMAGE */}

                                                <div className="w-full sm:w-32 h-40 sm:h-32 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">

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

                                                            <Package
                                                                size={32}
                                                                className="text-gray-300"
                                                            />

                                                        </div>

                                                    )}

                                                </div>


                                                {/* PRODUCT INFO */}

                                                <div className="flex-1 min-w-0">

                                                    <div className="flex flex-col sm:flex-row sm:justify-between gap-3">

                                                        <div>

                                                            <h3 className="text-xl font-bold text-gray-900">

                                                                {order.product?.name ||
                                                                    "Product"}

                                                            </h3>

                                                            <p className="text-gray-500 text-sm mt-2 line-clamp-2">

                                                                {order.product?.description ||
                                                                    "Quality product from our collection."}

                                                            </p>

                                                        </div>


                                                        <div className="sm:text-right">

                                                            <p className="text-xs text-gray-400 uppercase tracking-wide">

                                                                Total

                                                            </p>

                                                            <p className="text-xl font-bold text-gray-900 mt-1">

                                                                ₹
                                                                {total.toLocaleString(
                                                                    "en-IN"
                                                                )}

                                                            </p>

                                                        </div>

                                                    </div>


                                                    <div className="flex flex-wrap gap-x-8 gap-y-2 mt-5 text-sm">

                                                        <div>

                                                            <span className="text-gray-400">
                                                                Price
                                                            </span>

                                                            <p className="font-semibold text-gray-800">

                                                                ₹
                                                                {price.toLocaleString(
                                                                    "en-IN"
                                                                )}

                                                            </p>

                                                        </div>


                                                        <div>

                                                            <span className="text-gray-400">
                                                                Quantity
                                                            </span>

                                                            <p className="font-semibold text-gray-800">

                                                                {quantity}

                                                            </p>

                                                        </div>


                                                        <div>

                                                            <span className="text-gray-400">
                                                                Product ID
                                                            </span>

                                                            <p className="font-semibold text-gray-800">

                                                                #{order.product_id}

                                                            </p>

                                                        </div>

                                                    </div>

                                                </div>

                                            </div>


                                            {/* ==================================================
                                                DELIVERY INFO
                                            ================================================== */}

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-100">


                                                <div className="flex gap-3">

                                                    <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">

                                                        <MapPin size={18} />

                                                    </div>

                                                    <div>

                                                        <p className="text-xs text-gray-400 uppercase tracking-wide">
                                                            Delivery Address
                                                        </p>

                                                        <p className="text-sm font-medium text-gray-800 mt-1">

                                                            {order.address ||
                                                                "N/A"}

                                                            {order.city &&
                                                                `, ${order.city}`}

                                                            {order.pincode &&
                                                                ` - ${order.pincode}`}

                                                        </p>

                                                    </div>

                                                </div>


                                                <div className="flex gap-3">

                                                    <div className="w-9 h-9 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center flex-shrink-0">

                                                        <Phone size={18} />

                                                    </div>

                                                    <div>

                                                        <p className="text-xs text-gray-400 uppercase tracking-wide">
                                                            Contact
                                                        </p>

                                                        <p className="text-sm font-medium text-gray-800 mt-1">

                                                            {order.phone ||
                                                                "N/A"}

                                                        </p>

                                                    </div>

                                                </div>

                                            </div>


                                            {/* ==================================================
                                                ACTIONS
                                            ================================================== */}

                                            <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-5 border-t border-gray-100">

                                                <button

                                                    onClick={() =>
                                                        navigate(
                                                            `/orders/${order.id}`
                                                        )
                                                    }

                                                    className="flex-1 sm:flex-none bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"

                                                >

                                                    View Order Details

                                                    <ChevronRight
                                                        size={18}
                                                    />

                                                </button>


                                                {order.status !==
                                                    "Cancelled" &&
                                                    order.status !==
                                                    "Delivered" && (

                                                        <button

                                                            onClick={() =>
                                                                handleCancelOrder(
                                                                    order.id
                                                                )
                                                            }

                                                            className="flex-1 sm:flex-none px-6 py-3 rounded-xl border border-red-200 text-red-600 font-semibold hover:bg-red-50 transition flex items-center justify-center gap-2"

                                                        >

                                                            <XCircle
                                                                size={18}
                                                            />

                                                            Cancel Order

                                                        </button>

                                                    )}

                                            </div>

                                        </div>

                                    </div>

                                );

                            })}

                        </div>

                    )}

                </div>

            </div>

        </MainLayout>

    );

}

