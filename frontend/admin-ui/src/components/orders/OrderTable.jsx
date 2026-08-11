
export default function OrderTable({
    orders,
    onView,
    onUpdate,
    onCancel,
    onDelete,
}) {

    return (

        <div className="bg-white rounded-2xl shadow overflow-hidden">

            <table className="w-full">

                <thead className="bg-slate-100">

                    <tr>

                        <th className="p-4 text-left">
                            Order ID
                        </th>

                        <th className="p-4 text-left">
                            User ID
                        </th>

                        <th className="p-4 text-left">
                            Product ID
                        </th>

                        <th className="p-4 text-left">
                            Quantity
                        </th>

                        <th className="p-4 text-left">
                            Order Status
                        </th>

                        <th className="p-4 text-left">
                            Payment Status
                        </th>

                        <th className="p-4 text-left">
                            Date
                        </th>

                        <th className="p-4 text-left">
                            Action
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {
                        orders.length === 0 ? (

                            <tr>

                                <td
                                    colSpan="8"
                                    className="text-center p-6 text-gray-500"
                                >
                                    No Orders Found
                                </td>

                            </tr>

                        ) : (

                            orders.map((order) => (

                                <tr
                                    key={order.id}
                                    className="border-t hover:bg-slate-50"
                                >

                                    <td className="p-4">
                                        #{order.id}
                                    </td>

                                    <td className="p-4">
                                        {order.user_id}
                                    </td>

                                    <td className="p-4">
                                        {order.product_id}
                                    </td>

                                    <td className="p-4">
                                        {order.quantity}
                                    </td>


                                    {/* ==========================
                                        ORDER STATUS
                                    ========================== */}

                                    <td className="p-4">

                                        <span
                                            className={
                                                order.status === "Delivered"
                                                    ? "bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
                                                    : order.status === "Pending"
                                                    ? "bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm"
                                                    : order.status === "Confirmed"
                                                    ? "bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                                                    : order.status === "Shipped"
                                                    ? "bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm"
                                                    : "bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm"
                                            }
                                        >

                                            {order.status}

                                        </span>

                                    </td>


                                    {/* ==========================
                                        PAYMENT STATUS
                                    ========================== */}

                                    <td className="p-4">

                                        <span
                                            className={
                                                order.payment_status === "paid"
                                                    ? "bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
                                                    : order.payment_status === "pending"
                                                    ? "bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm"
                                                    : order.payment_status === "failed"
                                                    ? "bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm"
                                                    : "bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                                            }
                                        >

                                            {order.payment_status || "N/A"}

                                        </span>

                                    </td>


                                    {/* ==========================
                                        DATE
                                    ========================== */}

                                    <td className="p-4">

                                        {new Date(
                                            order.created_at
                                        ).toLocaleDateString()}

                                    </td>


                                    {/* ==========================
                                        ACTIONS
                                    ========================== */}

                                    <td className="p-4">

                                        <div className="flex gap-2 flex-wrap">

                                            {/* VIEW */}

                                            <button
                                                onClick={() =>
                                                    onView(order.id)
                                                }
                                                className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700"
                                            >
                                                View
                                            </button>


                                            {/* UPDATE */}

                                            <button
                                                onClick={() =>
                                                    onUpdate(order)
                                                }
                                                className="bg-indigo-600 text-white px-3 py-2 rounded-lg hover:bg-indigo-700"
                                            >
                                                Update
                                            </button>


                                            {/* CANCEL */}

                                            <button
                                                onClick={() =>
                                                    onCancel(order.id)
                                                }
                                                className="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700"
                                            >
                                                Cancel
                                            </button>


                                            {/* DELETE */}

                                            <button
                                                onClick={() =>
                                                    onDelete(order.id)
                                                }
                                                className="bg-gray-800 text-white px-3 py-2 rounded-lg hover:bg-gray-900"
                                            >
                                                Delete
                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))

                        )
                    }

                </tbody>

            </table>

        </div>

    );
}

