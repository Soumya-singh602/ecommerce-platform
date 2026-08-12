import { useEffect, useState } from "react";
import {
    User,
    Mail,
    Phone,
    ShieldCheck,
} from "lucide-react";

import {
    getUserProfile,
    updateUserProfile,
} from "../../services/authService";

export default function ProfileSettings() {
    const [profile, setProfile] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        role: "",
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await getUserProfile();

            const data = response?.data || {};

            setProfile({
                first_name: data.first_name || "",
                last_name: data.last_name || "",
                email: data.email || "",
                phone: data.phone || "",
                role: data.role || "",
            });

        } catch (err) {
            setError(
                err?.response?.data?.message ||
                "Failed to load profile."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setProfile((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (error) {
            setError("");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");

        try {
            setSaving(true);

            const response = await updateUserProfile({
                first_name: profile.first_name,
                last_name: profile.last_name,
                phone: profile.phone,
            });

            const updatedData = response?.data || {};

            setProfile((prev) => ({
                ...prev,
                ...updatedData,
            }));

            setMessage(
                response?.message ||
                "Profile updated successfully."
            );

        } catch (err) {
            setError(
                err?.response?.data?.message ||
                "Failed to update profile."
            );
        } finally {
            setSaving(false);
        }
    };

    /* ==================================================
       LOADING
    ================================================== */

    if (loading) {
        return (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">

                <div className="flex items-center gap-3 mb-6">

                    <div className="h-11 w-11 animate-pulse rounded-xl bg-slate-200" />

                    <div>
                        <div className="h-5 w-32 animate-pulse rounded bg-slate-200" />
                        <div className="mt-2 h-3 w-48 animate-pulse rounded bg-slate-100" />
                    </div>

                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                    {[1, 2, 3, 4, 5].map((item) => (
                        <div
                            key={item}
                            className="h-12 animate-pulse rounded-xl bg-slate-100"
                        />
                    ))}

                </div>

            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">

            {/* ==================================================
                HEADER
            ================================================== */}

            <div className="mb-6 flex items-center gap-3">

                <div
                    className="
                        flex
                        h-11
                        w-11
                        flex-shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        bg-indigo-50
                        text-indigo-600
                    "
                >
                    <User size={21} />
                </div>

                <div>

                    <h2 className="text-xl font-semibold text-slate-900">
                        Admin Profile
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Manage your personal information.
                    </p>

                </div>

            </div>

            {/* ==================================================
                SUCCESS
            ================================================== */}

            {message && (
                <div className="mb-5 flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3">

                    <ShieldCheck
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

            <form onSubmit={handleSubmit}>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                    {/* First Name */}

                    <div>

                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            First Name
                        </label>

                        <div className="relative">

                            <User
                                size={18}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                            />

                            <input
                                type="text"
                                name="first_name"
                                placeholder="Enter first name"
                                value={profile.first_name}
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

                    {/* Last Name */}

                    <div>

                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            Last Name
                        </label>

                        <div className="relative">

                            <User
                                size={18}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                            />

                            <input
                                type="text"
                                name="last_name"
                                placeholder="Enter last name"
                                value={profile.last_name}
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

                    {/* Email */}

                    <div>

                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            Email Address
                        </label>

                        <div className="relative">

                            <Mail
                                size={18}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                            />

                            <input
                                type="email"
                                name="email"
                                value={profile.email}
                                disabled
                                className="
                                    w-full
                                    cursor-not-allowed
                                    rounded-xl
                                    border
                                    border-slate-200
                                    bg-slate-100
                                    py-3
                                    pl-11
                                    pr-4
                                    text-sm
                                    text-slate-500
                                    outline-none
                                "
                            />

                        </div>

                        <p className="mt-1.5 text-xs text-slate-400">
                            Email address cannot be changed.
                        </p>

                    </div>

                    {/* Phone */}

                    <div>

                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            Phone Number
                        </label>

                        <div className="relative">

                            <Phone
                                size={18}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                            />

                            <input
                                type="text"
                                name="phone"
                                placeholder="Enter phone number"
                                value={profile.phone}
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

                    {/* Role */}

                    <div className="md:col-span-2">

                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            Account Role
                        </label>

                        <div className="relative">

                            <ShieldCheck
                                size={18}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                            />

                            <input
                                type="text"
                                name="role"
                                value={
                                    profile.role
                                        ? profile.role.toUpperCase()
                                        : ""
                                }
                                disabled
                                className="
                                    w-full
                                    cursor-not-allowed
                                    rounded-xl
                                    border
                                    border-slate-200
                                    bg-slate-100
                                    py-3
                                    pl-11
                                    pr-4
                                    text-sm
                                    font-semibold
                                    text-slate-500
                                    outline-none
                                "
                            />

                        </div>

                    </div>

                </div>

                {/* ==================================================
                    BUTTON
                ================================================== */}

                <div className="mt-6 flex justify-end">

                    <button
                        type="submit"
                        disabled={saving}
                        className="
                            rounded-xl
                            bg-indigo-600
                            px-6
                            py-3
                            text-sm
                            font-semibold
                            text-white
                            shadow-md
                            shadow-indigo-600/20
                            transition
                            hover:bg-indigo-700
                            hover:shadow-lg
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                        "
                    >
                        {saving
                            ? "Saving..."
                            : "Save Changes"}
                    </button>

                </div>

            </form>

        </div>
    );
}