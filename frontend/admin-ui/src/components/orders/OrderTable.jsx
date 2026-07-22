const orders = [

    {
        id:"#1001",
        customer:"Rahul Sharma",
        total:"₹70,000",
        status:"Pending",
        date:"22 Jul 2026"
    },

    {
        id:"#1002",
        customer:"Amit Kumar",
        total:"₹55,000",
        status:"Delivered",
        date:"21 Jul 2026"
    },

    {
        id:"#1003",
        customer:"Priya Singh",
        total:"₹3,000",
        status:"Cancelled",
        date:"20 Jul 2026"
    }

];

export default function OrderTable(){

    return(

        <div className="bg-white rounded-2xl shadow overflow-hidden">

            <table className="w-full">

                <thead className="bg-slate-100">

                    <tr>

                        <th className="p-4 text-left">Order ID</th>

                        <th className="p-4 text-left">Customer</th>

                        <th className="p-4 text-left">Total</th>

                        <th className="p-4 text-left">Status</th>

                        <th className="p-4 text-left">Date</th>

                        <th className="p-4 text-left">Action</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        orders.map((order)=>(

                            <tr
                            key={order.id}
                            className="border-t hover:bg-slate-50"
                            >

                                <td className="p-4">{order.id}</td>

                                <td className="p-4">{order.customer}</td>

                                <td className="p-4">{order.total}</td>

                                <td className="p-4">

                                    <span
                                    className={
                                        order.status==="Delivered"
                                        ?
                                        "bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
                                        :
                                        order.status==="Pending"
                                        ?
                                        "bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm"
                                        :
                                        "bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm"
                                    }
                                    >

                                        {order.status}

                                    </span>

                                </td>

                                <td className="p-4">{order.date}</td>

                                <td className="p-4 space-x-2">

                                    <button className="bg-blue-600 text-white px-3 py-2 rounded-lg">

                                        View

                                    </button>

                                    <button className="bg-indigo-600 text-white px-3 py-2 rounded-lg">

                                        Update

                                    </button>

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    )

}