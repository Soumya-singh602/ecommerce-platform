import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import { Eye, EyeOff, Mail, Lock, ShieldCheck } from "lucide-react";

export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError("");

        try {
            const response = await loginUser(email, password);

            // =========================
            // ROLE VALIDATION
            // =========================

            if (response.data.role !== "admin") {
                setError("Admin account required");
                setLoading(false);
                return;
            }

            localStorage.setItem(
                "access",
                response.data.access
            );

            localStorage.setItem(
                "refresh",
                response.data.refresh
            );

            localStorage.setItem(
                "user_id",
                response.data.user_id
            );

            localStorage.setItem(
                "email",
                response.data.email
            );

            localStorage.setItem(
                "role",
                response.data.role
            );

            navigate("/dashboard");

        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Invalid Email or Password"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-100 flex">

            {/* ==================================================
                LEFT BRANDING SECTION
            ================================================== */}

            <div className="hidden lg:flex lg:w-1/2 bg-indigo-700 relative overflow-hidden">

                {/* Decorative shapes */}

                <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-white/10" />

                <div className="absolute -bottom-32 -right-20 w-96 h-96 rounded-full bg-white/10" />

                <div className="absolute top-1/3 right-20 w-24 h-24 rounded-full bg-indigo-500/40" />

                <div className="relative z-10 flex flex-col justify-center px-16 xl:px-24 text-white">

                    {/* Logo */}

                    <div className="flex items-center gap-4 mb-10">

                        <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-xl">

                            <span className="text-indigo-700 text-2xl font-extrabold">
                                E
                            </span>

                        </div>

                        <div>

                            <h1 className="text-2xl font-bold">
                                Ecommerce
                            </h1>

                            <p className="text-indigo-200 text-sm">
                                Administration Panel
                            </p>

                        </div>

                    </div>

                    {/* Heading */}

                    <h2 className="text-4xl xl:text-5xl font-bold leading-tight max-w-lg">

                        Manage your store
                        <span className="block text-indigo-200">
                            with confidence.
                        </span>

                    </h2>

                    <p className="mt-6 text-indigo-100 leading-7 max-w-md">
                        Manage products, orders, customers and
                        everything your ecommerce platform needs
                        from one powerful dashboard.
                    </p>

                    {/* Features */}

                    <div className="mt-10 space-y-4">

                        <div className="flex items-center gap-3">

                            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                                <ShieldCheck size={17} />
                            </div>

                            <span className="text-sm text-indigo-100">
                                Secure administrator access
                            </span>

                        </div>

                        <div className="flex items-center gap-3">

                            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                                <ShieldCheck size={17} />
                            </div>

                            <span className="text-sm text-indigo-100">
                                Complete store management
                            </span>

                        </div>

                        <div className="flex items-center gap-3">

                            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                                <ShieldCheck size={17} />
                            </div>

                            <span className="text-sm text-indigo-100">
                                Real-time dashboard insights
                            </span>

                        </div>

                    </div>

                </div>

            </div>

            {/* ==================================================
                LOGIN SECTION
            ================================================== */}

            <div className="flex-1 flex items-center justify-center px-5 py-10">

                <div className="w-full max-w-md">

                    {/* Mobile Logo */}

                    <div className="flex lg:hidden items-center justify-center gap-3 mb-8">

                        <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg">

                            <span className="text-white text-xl font-bold">
                                E
                            </span>

                        </div>

                        <div>

                            <h1 className="text-xl font-bold text-slate-900">
                                Ecommerce
                            </h1>

                            <p className="text-xs text-slate-500">
                                Admin Panel
                            </p>

                        </div>

                    </div>

                    {/* Card */}

                    <div className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/60 p-7 sm:p-9">

                        {/* Header */}

                        <div className="mb-8">

                            <div className="flex items-center justify-between">

                                <div>

                                    <p className="text-sm font-semibold text-indigo-600">
                                        ADMIN PORTAL
                                    </p>

                                    <h2 className="text-3xl font-bold text-slate-900 mt-2">
                                        Welcome back
                                    </h2>

                                </div>

                                <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center">

                                    <ShieldCheck
                                        size={24}
                                        className="text-indigo-600"
                                    />

                                </div>

                            </div>

                            <p className="text-sm text-slate-500 mt-3">
                                Sign in to access your administration dashboard.
                            </p>

                        </div>

                        {/* Error */}

                        {error && (
                            <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3">

                                <div className="mt-0.5 h-2 w-2 rounded-full bg-red-500 flex-shrink-0" />

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
                                    className="block text-sm font-semibold text-slate-700 mb-2"
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
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        placeholder="admin@example.com"
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

                                <div className="flex items-center justify-between mb-2">

                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-semibold text-slate-700"
                                    >
                                        Password
                                    </label>

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
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
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
                                            setShowPassword(
                                                !showPassword
                                            )
                                        }
                                        className="
                                            absolute
                                            right-4
                                            top-1/2
                                            -translate-y-1/2
                                            text-slate-400
                                            hover:text-slate-600
                                        "
                                        aria-label={
                                            showPassword
                                                ? "Hide password"
                                                : "Show password"
                                        }
                                    >
                                        {showPassword ? (
                                            <EyeOff size={19} />
                                        ) : (
                                            <Eye size={19} />
                                        )}
                                    </button>

                                </div>

                            </div>

                            {/* Login Button */}

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
                                    "Sign In to Dashboard"
                                )}

                            </button>

                        </form>

                        {/* Footer */}

                        <div className="mt-7 border-t border-slate-100 pt-5">

                            <p className="text-center text-xs text-slate-400">
                                Authorized administrators only
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}