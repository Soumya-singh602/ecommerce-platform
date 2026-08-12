import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authService";

export default function RegisterForm() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

        if (error) {
            setError("");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");
        setLoading(true);

        try {
            await registerUser(formData);

            setSuccess(
                "Registration successful. Redirecting to login..."
            );

            setTimeout(() => {
                navigate("/login");
            }, 1500);

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Registration failed"
            );

            console.log(
                "Register Error:",
                error.response?.data
            );

            setLoading(false);
        }
    };

    return (
        <div className="w-full bg-white rounded-2xl shadow-xl border border-gray-100 p-8 sm:p-10">

            {/* Header */}
            <div className="text-center mb-8">

                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50">

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-7 w-7 text-blue-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="1.8"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a7.5 7.5 0 0115 0M19.5 8.25v5.25m2.625-2.625h-5.25"
                        />
                    </svg>

                </div>

                <h2 className="text-3xl font-bold text-gray-900">
                    Create Account
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                    Create your account and start shopping
                </p>

            </div>

            {/* Error */}
            {error && (
                <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {error}
                </div>
            )}

            {/* Success */}
            {success && (
                <div className="mb-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-600">
                    {success}
                </div>
            )}

            {/* Form */}
            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >

                {/* Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                    {/* First Name */}
                    <div>

                        <label
                            htmlFor="first_name"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            First Name
                        </label>

                        <input
                            type="text"
                            id="first_name"
                            name="first_name"
                            placeholder="First name"
                            value={formData.first_name}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                            required
                        />

                    </div>

                    {/* Last Name */}
                    <div>

                        <label
                            htmlFor="last_name"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Last Name
                        </label>

                        <input
                            type="text"
                            id="last_name"
                            name="last_name"
                            placeholder="Last name"
                            value={formData.last_name}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                            required
                        />

                    </div>

                </div>

                {/* Email */}
                <div>

                    <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-medium text-gray-700"
                    >
                        Email Address
                    </label>

                    <div className="relative">

                        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.8"
                                    d="M21.75 6.75v10.5A2.25 2.25 0 0119.5 19.5h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.1 1.93l-7.5 4.5a2.25 2.25 0 01-2.314 0l-7.5-4.5a2.25 2.25 0 01-1.1-1.93V6.75"
                                />
                            </svg>

                        </span>

                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-4 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                            required
                        />

                    </div>

                </div>

                {/* Password */}
                <div>

                    <label
                        htmlFor="password"
                        className="mb-2 block text-sm font-medium text-gray-700"
                    >
                        Password
                    </label>

                    <div className="relative">

                        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="1.8"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M16.5 10.5V7.875a4.875 4.875 0 10-9.75 0V10.5m-1.5 0h12.75A2.25 2.25 0 0120.25 12.75v6A2.25 2.25 0 0118 21H6a2.25 2.25 0 01-2.25-2.25v-6A2.25 2.25 0 015.25 10.5z"
                                />
                            </svg>

                        </span>

                        <input
                            type={
                                showPassword
                                    ? "text"
                                    : "password"
                            }
                            id="password"
                            name="password"
                            placeholder="Create a password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-12 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                            required
                        />

                        <button
                            type="button"
                            onClick={() =>
                                setShowPassword(!showPassword)
                            }
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-600"
                            aria-label={
                                showPassword
                                    ? "Hide password"
                                    : "Show password"
                            }
                        >
                            {showPassword ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.8"
                                        d="M3.98 8.223A10.477 10.477 0 001.5 12s3.75 6 10.5 6c1.61 0 3.01-.3 4.22-.78M6.228 6.228A10.45 10.45 0 0112 4.5c6.75 0 10.5 6 10.5 6a10.45 10.45 0 01-2.23 3.272M6.228 6.228L3 3m3.228 3.228l11.544 11.544M9.88 9.88a3 3 0 104.24 4.24"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.8"
                                        d="M2.25 12s3.75-6 9.75-6 9.75 6 9.75 6-3.75 6-9.75 6-9.75-6-9.75-6z"
                                    />
                                    <circle
                                        cx="12"
                                        cy="12"
                                        r="3"
                                        strokeWidth="1.8"
                                    />
                                </svg>
                            )}
                        </button>

                    </div>

                </div>

                {/* Register Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-xl bg-blue-600 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-70"
                >
                    {loading ? (
                        <span className="flex items-center justify-center gap-2">
                            <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                            Creating Account...
                        </span>
                    ) : (
                        "Create Account"
                    )}
                </button>

            </form>

            {/* Login */}
            <div className="mt-7 border-t border-gray-100 pt-6 text-center">

                <p className="text-sm text-gray-500">
                    Already have an account?{" "}

                    <Link
                        to="/login"
                        className="font-semibold text-blue-600 transition hover:text-blue-700"
                    >
                        Login
                    </Link>
                </p>

            </div>

        </div>
    );
}