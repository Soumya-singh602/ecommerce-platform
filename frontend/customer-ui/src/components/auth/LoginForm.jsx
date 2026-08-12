import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { loginUser } from "../../services/authService";

export default function LoginForm() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
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
        setLoading(true);

        try {
            const response = await loginUser(formData);

            console.log("LOGIN RESPONSE:", response);

            const userData = response.data;

            console.log("USER DATA:", userData);

            if (userData.role !== "customer") {
                setError("Please login with customer account");
                setLoading(false);
                return;
            }

            localStorage.setItem(
                "access",
                userData.access
            );

            localStorage.setItem(
                "refresh",
                userData.refresh
            );

            localStorage.setItem(
                "user",
                JSON.stringify(userData)
            );

            console.log(
                "SAVED TOKEN:",
                localStorage.getItem("access")
            );

            window.dispatchEvent(new Event("storage"));

            navigate("/");

        } catch (error) {
            console.log(
                "LOGIN ERROR:",
                error.response?.data || error.message
            );

            setError(
                error.response?.data?.message ||
                "Invalid Email or Password"
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full rounded-3xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/60 sm:p-9">

            {/* Header */}

            <div className="mb-8">

                <div className="flex items-center justify-between">

                    <div>

                        <p className="text-sm font-semibold text-indigo-600">
                            CUSTOMER PORTAL
                        </p>

                        <h2 className="mt-2 text-3xl font-bold text-slate-900">
                            Welcome back
                        </h2>

                    </div>

                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50">

                        <ShieldCheck
                            size={24}
                            className="text-indigo-600"
                        />

                    </div>

                </div>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                    Sign in to continue shopping and manage your account.
                </p>

            </div>

            {/* Error */}

            {error && (
                <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3">

                    <div className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-red-500" />

                    <p className="text-sm font-medium text-red-600">
                        {error}
                    </p>

                </div>
            )}

            {/* Form */}

            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >

                {/* Email */}

                <div>

                    <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                        Email Address
                    </label>

                    <div className="relative">

                        <Mail
                            size={19}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className="
                                w-full
                                rounded-xl
                                border
                                border-slate-200
                                bg-slate-50
                                py-3.5
                                pl-11
                                pr-4
                                text-sm
                                text-slate-900
                                outline-none
                                transition
                                focus:border-indigo-500
                                focus:bg-white
                                focus:ring-4
                                focus:ring-indigo-100
                            "
                            required
                        />

                    </div>

                </div>

                {/* Password */}

                <div>

                    <div className="mb-2 flex items-center justify-between">

                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-slate-700"
                        >
                            Password
                        </label>

                        <Link
                            to="/forgot-password"
                            className="text-xs font-semibold text-indigo-600 transition hover:text-indigo-700"
                        >
                            Forgot Password?
                        </Link>

                    </div>

                    <div className="relative">

                        <Lock
                            size={19}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                            id="password"
                            type={
                                showPassword
                                    ? "text"
                                    : "password"
                            }
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            className="
                                w-full
                                rounded-xl
                                border
                                border-slate-200
                                bg-slate-50
                                py-3.5
                                pl-11
                                pr-12
                                text-sm
                                text-slate-900
                                outline-none
                                transition
                                focus:border-indigo-500
                                focus:bg-white
                                focus:ring-4
                                focus:ring-indigo-100
                            "
                            required
                        />

                        <button
                            type="button"
                            onClick={() =>
                                setShowPassword(!showPassword)
                            }
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600"
                        >
                            {showPassword ? (
                                <EyeOff size={19} />
                            ) : (
                                <Eye size={19} />
                            )}
                        </button>

                    </div>

                </div>

                {/* Login */}

                <button
                    type="submit"
                    disabled={loading}
                    className="
                        mt-2
                        w-full
                        rounded-xl
                        bg-indigo-600
                        py-3.5
                        text-sm
                        font-bold
                        text-white
                        shadow-lg
                        shadow-indigo-600/20
                        transition
                        hover:bg-indigo-700
                        hover:shadow-xl
                        focus:outline-none
                        focus:ring-4
                        focus:ring-indigo-200
                        disabled:cursor-not-allowed
                        disabled:opacity-70
                    "
                >
                    {loading ? (
                        <span className="flex items-center justify-center gap-2">

                            <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />

                            Signing in...

                        </span>
                    ) : (
                        "Sign In"
                    )}
                </button>

            </form>

            {/* Register */}

            <div className="mt-7 border-t border-slate-100 pt-5">

                <p className="text-center text-sm text-slate-500">

                    Don't have an account?{" "}

                    <Link
                        to="/register"
                        className="font-semibold text-indigo-600 transition hover:text-indigo-700"
                    >
                        Create an account
                    </Link>

                </p>

            </div>

        </div>
    );
}