export default function CustomerTable({

    customers,

    onView,

    onDelete

}) {

    return (

        <div className="bg-white rounded-2xl shadow overflow-hidden">

            <table className="w-full">

                <thead className="bg-slate-100">

                    <tr>

                        <th className="p-4 text-left">
                            ID
                        </th>

                        <th className="p-4 text-left">
                            Name
                        </th>

                        <th className="p-4 text-left">
                            Email
                        </th>

                        <th className="p-4 text-left">
                            Role
                        </th>

                        <th className="p-4 text-left">
                            Joined
                        </th>

                        <th className="p-4 text-left">
                            Action
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {

                        customers.length === 0 ? (

                            <tr>

                                <td
                                    colSpan="6"
                                    className="text-center p-6 text-gray-500"
                                >

                                    No Customers Found

                                </td>

                            </tr>

                        ) : (

                            customers.map((customer) => (

                                <tr
                                    key={customer.id}
                                    className="border-t hover:bg-slate-50"
                                >

                                    <td className="p-4">

                                        #{customer.id}

                                    </td>

                                    <td className="p-4">

                                        {customer.first_name} {customer.last_name}

                                    </td>

                                    <td className="p-4">

                                        {customer.email}

                                    </td>

                                    <td className="p-4">

                                        <span
                                            className={
                                                customer.role === "admin"
                                                    ? "bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm"
                                                    : "bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
                                            }
                                        >

                                            {customer.role}

                                        </span>

                                    </td>

                                    <td className="p-4">

                                        {new Date(
                                            customer.created_at
                                        ).toLocaleDateString()}

                                    </td>

                                    <td className="p-4 space-x-2">

                                        <button

                                            onClick={() => onView(customer.id)}

                                            className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700"

                                        >

                                            View

                                        </button>

                                        <button
                                            onClick={() => onDelete(customer.id)}
                                            className="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700"
                                        >

                                            Delete

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