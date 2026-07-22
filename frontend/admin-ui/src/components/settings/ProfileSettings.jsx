export default function ProfileSettings() {

    return (

        <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="text-xl font-semibold mb-6">

                Admin Profile

            </h2>

            <div className="grid grid-cols-2 gap-4">

                <input
                    placeholder="Full Name"
                    className="border rounded-xl px-4 py-3"
                />

                <input
                    placeholder="Email"
                    className="border rounded-xl px-4 py-3"
                />

                <input
                    placeholder="Phone"
                    className="border rounded-xl px-4 py-3"
                />

                <input
                    placeholder="Role"
                    className="border rounded-xl px-4 py-3"
                />

            </div>

        </div>

    );

}