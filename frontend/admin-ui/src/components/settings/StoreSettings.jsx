import { useState } from "react";
import {
    Store,
    Mail,
    Phone,
    MapPin,
    CheckCircle,
} from "lucide-react";

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

        if (message) {
            setMessage("");
        }

        if (error) {
            setError("");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");
        setSaving(true);

        try {
            // Backend API connect hone ke baad:
            // await updateStoreSettings(settings);

            setMessage(
                "Store settings saved successfully."
            );

        } catch (err) {
            setError(
                "Failed to save store settings."
            );

        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

            {/* ==================================================
                HEADER
            ================================================== */}

            <div className="flex items-center gap-3 mb-6">

                <div
                    className="
                        flex
                        h-11
                        w-11
                        flex-shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        bg-emerald-50
                        text-emerald-600
                    "
                >
                    <Store size={21} />
                </div>

                <div>

                    <h2 className="text-xl font-semibold text-slate-900">
                        Store Information
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Manage your store and customer support details.
                    </p>

                </div>

            </div>

            {/* ==================================================
                SUCCESS
            ================================================== */}

            {message && (
                <div className="mb-5 flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3">

                    <CheckCircle
                        size={18}
                        className="text-green-600"
                    />

                    <p className="text-sm font-medium text-green-700">
                        {message}
                    </p>

                </div>
            )}

            {/* ==================================================
                ERROR
            ================================================== */}

            {error && (
                <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3">

                    <p className="text-sm font-medium text-red-700">
                        {error}
                    </p>

                </div>
            )}

            {/* ==================================================
                FORM
            ================================================== */}

            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                    {/* Store Name */}

                    <div>

                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            Store Name
                        </label>

                        <div className="relative">

                            <Store
                                size={18}
                                className="
                                    absolute
                                    left-4
                                    top-1/2
                                    -translate-y-1/2
                                    text-slate-400
                                "
                            />

                            <input
                                type="text"
                                name="store_name"
                                placeholder="Enter store name"
                                value={settings.store_name}
                                onChange={handleChange}
                                className="
                                    w-full
                                    rounded-xl
                                    border
                                    border-slate-200
                                    bg-slate-50
                                    py-3
                                    pl-11
                                    pr-4
                                    text-sm
                                    outline-none
                                    transition
                                    focus:border-indigo-500
                                    focus:bg-white
                                    focus:ring-4
                                    focus:ring-indigo-100
                                "
                            />

                        </div>

                    </div>

                    {/* Support Email */}

                    <div>

                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            Support Email
                        </label>

                        <div className="relative">

                            <Mail
                                size={18}
                                className="
                                    absolute
                                    left-4
                                    top-1/2
                                    -translate-y-1/2
                                    text-slate-400
                                "
                            />

                            <input
                                type="email"
                                name="support_email"
                                placeholder="support@example.com"
                                value={settings.support_email}
                                onChange={handleChange}
                                className="
                                    w-full
                                    rounded-xl
                                    border
                                    border-slate-200
                                    bg-slate-50
                                    py-3
                                    pl-11
                                    pr-4
                                    text-sm
                                    outline-none
                                    transition
                                    focus:border-indigo-500
                                    focus:bg-white
                                    focus:ring-4
                                    focus:ring-indigo-100
                                "
                            />

                        </div>

                    </div>

                    {/* Support Phone */}

                    <div>

                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            Support Phone
                        </label>

                        <div className="relative">

                            <Phone
                                size={18}
                                className="
                                    absolute
                                    left-4
                                    top-1/2
                                    -translate-y-1/2
                                    text-slate-400
                                "
                            />

                            <input
                                type="text"
                                name="support_phone"
                                placeholder="Enter support phone"
                                value={settings.support_phone}
                                onChange={handleChange}
                                className="
                                    w-full
                                    rounded-xl
                                    border
                                    border-slate-200
                                    bg-slate-50
                                    py-3
                                    pl-11
                                    pr-4
                                    text-sm
                                    outline-none
                                    transition
                                    focus:border-indigo-500
                                    focus:bg-white
                                    focus:ring-4
                                    focus:ring-indigo-100
                                "
                            />

                        </div>

                    </div>

                </div>

                {/* Store Address */}

                <div>

                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Store Address
                    </label>

                    <div className="relative">

                        <MapPin
                            size={18}
                            className="
                                absolute
                                left-4
                                top-4
                                text-slate-400
                            "
                        />

                        <textarea
                            name="store_address"
                            rows="4"
                            placeholder="Enter complete store address"
                            value={settings.store_address}
                            onChange={handleChange}
                            className="
                                w-full
                                resize-none
                                rounded-xl
                                border
                                border-slate-200
                                bg-slate-50
                                py-3
                                pl-11
                                pr-4
                                text-sm
                                outline-none
                                transition
                                focus:border-indigo-500
                                focus:bg-white
                                focus:ring-4
                                focus:ring-indigo-100
                            "
                        />

                    </div>

                </div>

                {/* ==================================================
                    BUTTON
                ================================================== */}

                <div className="flex justify-end pt-1">

                    <button
                        type="submit"
                        disabled={saving}
                        className="
                            rounded-xl
                            bg-emerald-600
                            px-6
                            py-3
                            text-sm
                            font-semibold
                            text-white
                            shadow-md
                            shadow-emerald-600/20
                            transition
                            hover:bg-emerald-700
                            hover:shadow-lg
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                        "
                    >
                        {saving
                            ? "Saving..."
                            : "Save Settings"}
                    </button>

                </div>

            </form>

        </div>
    );
}