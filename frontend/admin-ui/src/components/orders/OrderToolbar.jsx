export default function OrderToolbar() {

    return (

        <div className="bg-white rounded-2xl shadow p-5 mb-6">

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                <input
                    type="text"
                    placeholder="Search Orders..."
                    className="border rounded-xl px-4 py-3"
                />

                <select className="border rounded-xl px-4 py-3">

                    <option>

                        All Status

                    </option>

                    <option>

                        Pending

                    </option>

                    <option>

                        Processing

                    </option>

                    <option>

                        Delivered

                    </option>

                    <option>

                        Cancelled

                    </option>

                </select>

                <input
                    type="date"
                    className="border rounded-xl px-4 py-3"
                />

            </div>

        </div>

    );

}