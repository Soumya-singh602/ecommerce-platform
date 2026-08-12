import { useState } from "react";
import { Eye, EyeOff, LockKeyhole } from "lucide-react";
import { changePassword } from "../../services/authService";

export default function PasswordSettings() {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");

        if (!oldPassword || !newPassword || !confirmPassword) {
            setError("All fields are required.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError(
                "New password and confirm password do not match."
            );
            return;
        }

        if (newPassword.length < 8) {
            setError(
                "New password must be at least 8 characters."
            );
            return;
        }

        try {
            setLoading(true);

            const response = await changePassword(
                oldPassword,
                newPassword
            );

            setMessage(
                response?.message ||
                "Password changed successfully."
            );

            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");

        } catch (err) {
            setError(
                err?.response?.data?.message ||
                err?.response?.data?.data?.new_password?.[0] ||
                "Failed to change password."
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">

            {/* Header */}

            <div className="flex items-center gap-3 mb-6">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                    <LockKeyhole size={21} />
                </div>

                <div>

                    <h2 className="text-xl font-semibold text-slate-900">
                        Change Password
                    </h2>

                    <p className="text-sm text-slate-500 mt-1">
                        Keep your account secure with a strong password.
                    </p>

                </div>

            </div>

            {/* Success */}

            {message && (
                <div className="mb-4 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                    {message}
                </div>
            )}

            {/* Error */}

            {error && (
                <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                    {error}
                </div>
            )}

            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >

                {/* Current Password */}

                <div>

                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Current Password
                    </label>

                    <div className="relative">

                        <input
                            type={
                                showOldPassword
                                    ? "text"
                                    : "password"
                            }
                            placeholder="Enter current password"
                            value={oldPassword}
                            onChange={(e) =>
                                setOldPassword(e.target.value)
                            }
                            className="
                                w-full
                                rounded-xl
                                border
                                border-slate-200
                                bg-slate-50
                                px-4
                                py-3
                                pr-12
                                text-sm
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
                                setShowOldPassword(
                                    !showOldPassword
                                )
                            }
                            className="
                                absolute
                                right-4
                                top-1/2
                                -translate-y-1/2
                                text-slate-400
                                transition
                                hover:text-indigo-600
                            "
                            aria-label={
                                showOldPassword
                                    ? "Hide current password"
                                    : "Show current password"
                            }
                        >
                            {showOldPassword ? (
                                <EyeOff size={19} />
                            ) : (
                                <Eye size={19} />
                            )}
                        </button>

                    </div>

                </div>

                {/* New Password */}

                <div>

                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                        New Password
                    </label>

                    <div className="relative">

                        <input
                            type={
                                showNewPassword
                                    ? "text"
                                    : "password"
                            }
                            placeholder="Enter new password"
                            value={newPassword}
                            onChange={(e) =>
                                setNewPassword(e.target.value)
                            }
                            className="
                                w-full
                                rounded-xl
                                border
                                border-slate-200
                                bg-slate-50
                                px-4
                                py-3
                                pr-12
                                text-sm
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
                                setShowNewPassword(
                                    !showNewPassword
                                )
                            }
                            className="
                                absolute
                                right-4
                                top-1/2
                                -translate-y-1/2
                                text-slate-400
                                transition
                                hover:text-indigo-600
                            "
                            aria-label={
                                showNewPassword
                                    ? "Hide new password"
                                    : "Show new password"
                            }
                        >
                            {showNewPassword ? (
                                <EyeOff size={19} />
                            ) : (
                                <Eye size={19} />
                            )}
                        </button>

                    </div>

                    <p className="mt-2 text-xs text-slate-400">
                        Password must contain at least 8 characters.
                    </p>

                </div>

                {/* Confirm Password */}

                <div>

                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Confirm Password
                    </label>

                    <div className="relative">

                        <input
                            type={
                                showConfirmPassword
                                    ? "text"
                                    : "password"
                            }
                            placeholder="Confirm new password"
                            value={confirmPassword}
                            onChange={(e) =>
                                setConfirmPassword(e.target.value)
                            }
                            className="
                                w-full
                                rounded-xl
                                border
                                border-slate-200
                                bg-slate-50
                                px-4
                                py-3
                                pr-12
                                text-sm
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
                                setShowConfirmPassword(
                                    !showConfirmPassword
                                )
                            }
                            className="
                                absolute
                                right-4
                                top-1/2
                                -translate-y-1/2
                                text-slate-400
                                transition
                                hover:text-indigo-600
                            "
                            aria-label={
                                showConfirmPassword
                                    ? "Hide confirm password"
                                    : "Show confirm password"
                            }
                        >
                            {showConfirmPassword ? (
                                <EyeOff size={19} />
                            ) : (
                                <Eye size={19} />
                            )}
                        </button>

                    </div>

                </div>

                {/* Button */}

                <button
                    type="submit"
                    disabled={loading}
                    className="
                        mt-2
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
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                    "
                >
                    {loading
                        ? "Updating..."
                        : "Update Password"}
                </button>

            </form>

        </div>
    );
}