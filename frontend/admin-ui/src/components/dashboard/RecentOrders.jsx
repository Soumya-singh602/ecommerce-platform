export default function RecentOrders({ orders = [] }) {


    return (

        <div className="bg-white rounded-2xl shadow p-6 mt-8">


            <h2 className="text-2xl font-bold text-slate-800 mb-5">

                Recent Orders

            </h2>


            <div className="overflow-x-auto">


                <table className="w-full text-left">


                    <thead>

                        <tr className="border-b">


                            <th className="p-3">
                                Order ID
                            </th>


                            <th className="p-3">
                                Customer
                            </th>


                            <th className="p-3">
                                Product
                            </th>


                            <th className="p-3">
                                Amount
                            </th>


                            <th className="p-3">
                                Status
                            </th>


                        </tr>


                    </thead>



                    <tbody>


                        {

                        orders.length === 0 ?


                        (

                            <tr>

                                <td
                                colSpan="5"
                                className="text-center p-5 text-gray-500"
                                >

                                    No orders found

                                </td>

                            </tr>


                        )


                        :


                        orders.map((order)=>(


                            <tr

                            key={order.id}

                            className="border-b hover:bg-slate-50"

                            >



                                <td className="p-3 font-semibold">

                                    #{order.id}

                                </td>



                                <td className="p-3">

                                    User #{order.user_id}

                                </td>



                                <td className="p-3">

                                    {order.product?.name}

                                </td>



                                <td className="p-3">

                                    ₹
                                    {
                                    Number(order.product?.price)
                                    *
                                    order.quantity
                                    }

                                </td>



                                <td className="p-3">


                                    <span

                                    className={

                                        order.status === "Completed"

                                        ?

                                        "bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"

                                        :

                                        order.status === "Pending"

                                        ?

                                        "bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm"

                                        :

                                        "bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm"

                                    }


                                    >

                                        {order.status}


                                    </span>


                                </td>



                            </tr>


                        ))


                        }


                    </tbody>


                </table>


            </div>


        </div>


    );

}