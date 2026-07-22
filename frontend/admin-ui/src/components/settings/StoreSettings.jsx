export default function StoreSettings() {

    return (

        <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="text-xl font-semibold mb-6">

                Store Information

            </h2>

            <div className="space-y-4">

                <input
                    placeholder="Store Name"
                    className="w-full border rounded-xl px-4 py-3"
                />

                <input
                    placeholder="Support Email"
                    className="w-full border rounded-xl px-4 py-3"
                />

                <input
                    placeholder="Support Phone"
                    className="w-full border rounded-xl px-4 py-3"
                />

                <textarea
                    rows="4"
                    placeholder="Store Address"
                    className="w-full border rounded-xl px-4 py-3"
                />

                <button
                    className="bg-green-600 text-white px-6 py-3 rounded-xl"
                >

                    Save Settings

                </button>

            </div>

        </div>

    );

}