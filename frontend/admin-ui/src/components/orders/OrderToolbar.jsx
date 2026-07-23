export default function OrderToolbar({

    search,
    setSearch,

    status,
    setStatus,

    sort,
    setSort

}) {

    return (

        <div className="bg-white rounded-2xl shadow p-5 mb-6">

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">


                {/* Search */}

                <input

                    type="text"

                    placeholder="Search Orders..."

                    value={search}

                    onChange={(e) => setSearch(e.target.value)}

                    className="border rounded-xl px-4 py-3"

                />


                {/* Status Filter */}

                <select

                    value={status}

                    onChange={(e) => setStatus(e.target.value)}

                    className="border rounded-xl px-4 py-3"

                >

                    <option value="">
                        All Status
                    </option>

                    <option value="Pending">
                        Pending
                    </option>

                    <option value="Confirmed">
                        Confirmed
                    </option>

                    <option value="Shipped">
                        Shipped
                    </option>

                    <option value="Delivered">
                        Delivered
                    </option>

                    <option value="Cancelled">
                        Cancelled
                    </option>

                </select>


                {/* Sorting */}

                <select

                    value={sort}

                    onChange={(e) => setSort(e.target.value)}

                    className="border rounded-xl px-4 py-3"

                >

                    <option value="">
                        Sort Orders
                    </option>

                    <option value="-created_at">
                        Newest First
                    </option>

                    <option value="created_at">
                        Oldest First
                    </option>


                </select>



                {/* Date Filter (Next Step) */}

                <input

                    type="date"

                    className="border rounded-xl px-4 py-3"

                />


            </div>

        </div>

    );

}