import { useState, useEffect } from "react";
import DashboardLayout from "../layouts/DashboardLayout";

import OrderHeader from "../components/orders/OrderHeader";
import OrderToolbar from "../components/orders/OrderToolbar";
import OrderTable from "../components/orders/OrderTable";
import OrderViewModal from "../components/orders/OrderViewModal";
import OrderUpdateModal from "../components/orders/OrderUpdateModal";
import OrderStats from "../components/orders/OrderStats";

import {
    getOrders,
    getOrderDetail,
    updateOrderStatus,
    getOrderStats,
} from "../services/orderService";

export default function Orders() {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [sort, setSort] = useState("");

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedUpdateOrder, setSelectedUpdateOrder] = useState(null);
    const [stats, setStats] = useState({
    total_orders: 0,
    pending_orders: 0,
    confirmed_orders: 0,
    shipped_orders: 0,
    delivered_orders: 0,
    cancelled_orders: 0,
});

    // ==========================
    // FETCH ORDERS
    // ==========================
    const fetchOrders = async () => {

        try {

            setLoading(true);

            const data = await getOrders(
                search,
                status,
                sort,
                page
            );

            setOrders(data.orders);

            setTotalPages(data.total_pages);

        } catch (error) {

            console.log("ORDER ERROR:", error);

        } finally {

            setLoading(false);

        }

    };
    const fetchStats = async () => {

    try {

        const data = await getOrderStats();

        setStats(data);

    } catch (error) {

        console.log("STATS ERROR:", error);

    }

};

    // ==========================
    // VIEW ORDER
    // ==========================
    const handleView = async (id) => {

        try {

            const data = await getOrderDetail(id);

            setSelectedOrder(data);

        } catch (error) {

            console.log(error);

            alert("Unable to fetch order details");

        }

    };

    const handleUpdateClick = (order) => {

          setSelectedUpdateOrder(order);

        };

    // ==========================
    // UPDATE STATUS
    // ==========================
    const handleStatusUpdate = async (id, status) => {

        try {

            await updateOrderStatus(id, status);

            alert("Order status updated successfully");

            fetchOrders();

        } catch (error) {

            console.log(error);

            alert("Unable to update order");

        }

    };

    useEffect(() => {

        fetchOrders();
        fetchStats();

    }, [search, status, sort, page]);

    if (loading) {

        return (

            <DashboardLayout>

                <h2 className="text-xl font-semibold">
                    Loading Orders...
                </h2>

            </DashboardLayout>

        );

    }

    return (

        <DashboardLayout>

            <OrderHeader />

            <OrderStats stats={stats} />

            <OrderToolbar
                search={search}
                setSearch={setSearch}
                status={status}
                setStatus={setStatus}
                sort={sort}
                setSort={setSort}
            />

            <OrderTable
                orders={orders}
                onView={handleView}
                onUpdateStatus={handleStatusUpdate}
                onUpdate={handleUpdateClick}
            />

            {/* Pagination */}

            <div className="flex justify-center items-center gap-2 mt-6">

                <button
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                    className="px-4 py-2 border rounded-lg disabled:opacity-50"
                >
                    Previous
                </button>

                {

                    [...Array(totalPages)].map((_, index) => (

                        <button

                            key={index}

                            onClick={() => setPage(index + 1)}

                            className={
                                page === index + 1
                                    ? "px-4 py-2 bg-indigo-600 text-white rounded-lg"
                                    : "px-4 py-2 border rounded-lg hover:bg-gray-100"
                            }

                        >

                            {index + 1}

                        </button>

                    ))

                }

                <button
                    onClick={() => setPage(page + 1)}
                    disabled={page === totalPages}
                    className="px-4 py-2 border rounded-lg disabled:opacity-50"
                >
                    Next
                </button>

            </div>

            <OrderViewModal
                order={selectedOrder}
                onClose={() => setSelectedOrder(null)}
            />
            <OrderUpdateModal
                order={selectedUpdateOrder}
                onClose={() => setSelectedUpdateOrder(null)}
                onUpdate={handleStatusUpdate}
                />

        </DashboardLayout>

    );

}