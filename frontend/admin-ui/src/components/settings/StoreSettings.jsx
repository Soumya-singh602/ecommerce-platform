import { useState } from "react";

export default function StoreSettings() {
    const [settings, setSettings] = useState({
        store_name: "",
        support_email: "",
        support_phone: "",
        store_address: "",
    });

    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        setSettings((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");

        // Backend API connect hone ke baad yahan API call aayegi.
        setSaving(true);

        try {
            // await updateStoreSettings(settings);

            setMessage("Store settings saved successfully.");
        } catch (err) {
            setError("Failed to save store settings.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="text-xl font-semibold mb-6">
                Store Information
            </h2>

            {message && (
                <div className="mb-4 rounded-xl bg-green-50 border border-green-200 px-4 py-3 text-green-700">
                    {message}
                </div>
            )}

            {error && (
                <div className="mb-4 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-red-700">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">

                <input
                    type="text"
                    name="store_name"
                    placeholder="Store Name"
                    value={settings.store_name}
                    onChange={handleChange}
                    className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                />

                <input
                    type="email"
                    name="support_email"
                    placeholder="Support Email"
                    value={settings.support_email}
                    onChange={handleChange}
                    className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                />

                <input
                    type="text"
                    name="support_phone"
                    placeholder="Support Phone"
                    value={settings.support_phone}
                    onChange={handleChange}
                    className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                />

                <textarea
                    name="store_address"
                    rows="4"
                    placeholder="Store Address"
                    value={settings.store_address}
                    onChange={handleChange}
                    className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                />

                <button
                    type="submit"
                    disabled={saving}
                    className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white px-6 py-3 rounded-xl transition"
                >
                    {saving ? "Saving..." : "Save Settings"}
                </button>

            </form>

        </div>
    );
}