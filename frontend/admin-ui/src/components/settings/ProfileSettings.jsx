import { useEffect, useState } from "react";
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

    if (loading) {
        return (
            <div className="bg-white rounded-2xl shadow p-6">
                <h2 className="text-xl font-semibold mb-6">
                    Admin Profile
                </h2>

                <p className="text-gray-500">
                    Loading profile...
                </p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="text-xl font-semibold mb-6">
                Admin Profile
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

            <form onSubmit={handleSubmit}>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <input
                        type="text"
                        name="first_name"
                        placeholder="First Name"
                        value={profile.first_name}
                        onChange={handleChange}
                        className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                    />

                    <input
                        type="text"
                        name="last_name"
                        placeholder="Last Name"
                        value={profile.last_name}
                        onChange={handleChange}
                        className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={profile.email}
                        disabled
                        className="border rounded-xl px-4 py-3 bg-gray-100 text-gray-500 cursor-not-allowed"
                    />

                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone"
                        value={profile.phone}
                        onChange={handleChange}
                        className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                    />

                    <input
                        type="text"
                        name="role"
                        placeholder="Role"
                        value={profile.role}
                        disabled
                        className="border rounded-xl px-4 py-3 bg-gray-100 text-gray-500 cursor-not-allowed"
                    />

                </div>

                <button
                    type="submit"
                    disabled={saving}
                    className="mt-5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white px-6 py-3 rounded-xl transition"
                >
                    {saving ? "Saving..." : "Save Changes"}
                </button>

            </form>

        </div>
    );
}