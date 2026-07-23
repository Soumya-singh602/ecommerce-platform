export default function OrderTable({ orders, onView  , onUpdate}) {

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
                            Status
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
                                    colSpan="7"
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

                                    <td className="p-4">

                                        {new Date(order.created_at).toLocaleDateString()}

                                    </td>

                                    <td className="p-4 space-x-2">

                                        <button
                                            onClick={() => onView(order.id)}
                                            className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700"
                                        >

                                            View

                                        </button>

                                        <button
                                            onClick={() => onUpdate(order)}
                                            className="bg-indigo-600 text-white px-3 py-2 rounded-lg hover:bg-indigo-700"
                                        >

                                            Update

                                        </button>

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