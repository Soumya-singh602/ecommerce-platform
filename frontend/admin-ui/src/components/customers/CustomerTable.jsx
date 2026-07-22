const customers = [

    {
        id:1,
        name:"Rahul Sharma",
        email:"rahul@gmail.com",
        phone:"+91 9876543210",
        status:"Active"
    },

    {
        id:2,
        name:"Priya Singh",
        email:"priya@gmail.com",
        phone:"+91 9876501234",
        status:"Active"
    },

    {
        id:3,
        name:"Amit Kumar",
        email:"amit@gmail.com",
        phone:"+91 9876511111",
        status:"Blocked"
    }

];

export default function CustomerTable(){

    return(

        <div className="bg-white rounded-2xl shadow overflow-hidden">

            <table className="w-full">

                <thead className="bg-slate-100">

                    <tr>

                        <th className="p-4 text-left">ID</th>

                        <th className="p-4 text-left">Name</th>

                        <th className="p-4 text-left">Email</th>

                        <th className="p-4 text-left">Phone</th>

                        <th className="p-4 text-left">Status</th>

                        <th className="p-4 text-left">Action</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        customers.map((customer)=>(

                            <tr
                            key={customer.id}
                            className="border-t hover:bg-slate-50"
                            >

                                <td className="p-4">
                                    {customer.id}
                                </td>

                                <td className="p-4 font-semibold">
                                    {customer.name}
                                </td>

                                <td className="p-4">
                                    {customer.email}
                                </td>

                                <td className="p-4">
                                    {customer.phone}
                                </td>

                                <td className="p-4">

                                    <span
                                    className={
                                        customer.status==="Active"
                                        ?
                                        "bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
                                        :
                                        "bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm"
                                    }
                                    >

                                        {customer.status}

                                    </span>

                                </td>

                                <td className="p-4 space-x-2">

                                    <button className="bg-blue-600 text-white px-3 py-2 rounded-lg">

                                        View

                                    </button>

                                    <button className="bg-red-600 text-white px-3 py-2 rounded-lg">

                                        Delete

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