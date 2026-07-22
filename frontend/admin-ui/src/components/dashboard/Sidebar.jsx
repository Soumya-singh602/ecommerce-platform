import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users,
    MessageCircle,
    Settings,
    LogOut
} from "lucide-react";

import { Link } from "react-router-dom";

export default function Sidebar() {

    return (

        <aside className="w-64 min-h-screen bg-slate-900 text-white p-6 flex flex-col">

            {/* Logo */}

            <h1 className="text-3xl font-bold mb-10">
                Ecommerce
            </h1>

            {/* Menu */}

            <nav className="space-y-2 flex-1">

                <Link
                    to="/dashboard"
                    className="flex items-center gap-3 p-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition"
                >
                    <LayoutDashboard size={22} />
                    <span>Dashboard</span>
                </Link>


                <Link
                    to="/products"
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800 transition"
                >
                    <Package size={22} />
                    <span>Products</span>
                </Link>


                <Link
                    to="/orders"
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800 transition"
                >
                    <ShoppingCart size={22} />
                    <span>Orders</span>
                </Link>


                <Link
                    to="/customers"
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800 transition"
                >
                    <Users size={22} />
                    <span>Customers</span>
                </Link>


                <Link
                    to="/chat"
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800 transition"
                >
                    <MessageCircle size={22} />
                    <span>Chat</span>
                </Link>


                <Link
                    to="/settings"
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800 transition"
                >
                    <Settings size={22} />
                    <span>Settings</span>
                </Link>

            </nav>


            {/* Logout */}

            <div className="border-t border-slate-700 pt-5">

                <button
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800 transition"
                >
                    <LogOut size={22} />
                    <span>Logout</span>
                </button>

            </div>

        </aside>

    );

}