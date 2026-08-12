import {
    User,
    Lock,
    Store,
    Settings as SettingsIcon,
} from "lucide-react";

import DashboardLayout from "../layouts/DashboardLayout";

import SettingsHeader from "../components/settings/SettingsHeader";
import ProfileSettings from "../components/settings/ProfileSettings";
import PasswordSettings from "../components/settings/PasswordSettings";
import StoreSettings from "../components/settings/StoreSettings";

export default function Settings() {
    return (
        <DashboardLayout>

            <div className="max-w-7xl mx-auto">

                {/* ==================================================
                    PAGE HEADER
                ================================================== */}

                <div className="mb-8">

                    <div className="flex items-center gap-3">

                        <div
                            className="
                                flex
                                h-11
                                w-11
                                items-center
                                justify-center
                                rounded-xl
                                bg-indigo-600
                                text-white
                                shadow-lg
                                shadow-indigo-600/20
                            "
                        >
                            <SettingsIcon size={22} />
                        </div>

                        <div>

                            <h1 className="text-2xl font-bold text-slate-900">
                                Settings
                            </h1>

                            <p className="mt-1 text-sm text-slate-500">
                                Manage your account and store preferences
                            </p>

                        </div>

                    </div>

                </div>

                {/* ==================================================
                    SETTINGS NAVIGATION
                ================================================== */}

                <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">

                    {/* Profile */}

                    <div
                        className="
                            flex
                            items-center
                            gap-4
                            rounded-2xl
                            border
                            border-slate-200
                            bg-white
                            p-4
                            shadow-sm
                        "
                    >

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

                            <p className="text-sm font-semibold text-slate-900">
                                Profile
                            </p>

                            <p className="mt-0.5 text-xs text-slate-500">
                                Personal information
                            </p>

                        </div>

                    </div>

                    {/* Security */}

                    <div
                        className="
                            flex
                            items-center
                            gap-4
                            rounded-2xl
                            border
                            border-slate-200
                            bg-white
                            p-4
                            shadow-sm
                        "
                    >

                        <div
                            className="
                                flex
                                h-11
                                w-11
                                flex-shrink-0
                                items-center
                                justify-center
                                rounded-xl
                                bg-amber-50
                                text-amber-600
                            "
                        >
                            <Lock size={21} />
                        </div>

                        <div>

                            <p className="text-sm font-semibold text-slate-900">
                                Security
                            </p>

                            <p className="mt-0.5 text-xs text-slate-500">
                                Password & security
                            </p>

                        </div>

                    </div>

                    {/* Store */}

                    <div
                        className="
                            flex
                            items-center
                            gap-4
                            rounded-2xl
                            border
                            border-slate-200
                            bg-white
                            p-4
                            shadow-sm
                        "
                    >

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

                            <p className="text-sm font-semibold text-slate-900">
                                Store
                            </p>

                            <p className="mt-0.5 text-xs text-slate-500">
                                Store configuration
                            </p>

                        </div>

                    </div>

                </div>

                {/* ==================================================
                    SETTINGS CONTENT
                ================================================== */}

                <div className="space-y-6">

                    {/* Header component */}

                    <SettingsHeader />

                    {/* Profile + Password */}

                    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

                        <div
                            className="
                                overflow-hidden
                                rounded-2xl
                                border
                                border-slate-200
                                bg-white
                                shadow-sm
                                transition
                                hover:shadow-md
                            "
                        >
                            <ProfileSettings />
                        </div>

                        <div
                            className="
                                overflow-hidden
                                rounded-2xl
                                border
                                border-slate-200
                                bg-white
                                shadow-sm
                                transition
                                hover:shadow-md
                            "
                        >
                            <PasswordSettings />
                        </div>

                    </div>

                    {/* Store */}

                    <div
                        className="
                            overflow-hidden
                            rounded-2xl
                            border
                            border-slate-200
                            bg-white
                            shadow-sm
                            transition
                            hover:shadow-md
                        "
                    >

                        <StoreSettings />

                    </div>

                </div>

            </div>

        </DashboardLayout>
    );
}