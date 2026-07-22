export default function PasswordSettings() {

    return (

        <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="text-xl font-semibold mb-6">

                Change Password

            </h2>

            <div className="space-y-4">

                <input
                    type="password"
                    placeholder="Current Password"
                    className="w-full border rounded-xl px-4 py-3"
                />

                <input
                    type="password"
                    placeholder="New Password"
                    className="w-full border rounded-xl px-4 py-3"
                />

                <input
                    type="password"
                    placeholder="Confirm Password"
                    className="w-full border rounded-xl px-4 py-3"
                />

                <button
                    className="bg-indigo-600 text-white px-6 py-3 rounded-xl"
                >

                    Update Password

                </button>

            </div>

        </div>

    );

}