import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users,
    MessageCircle,
    Settings,
    LogOut,
    Image,
} from "lucide-react";

import {
    Link,
    useNavigate,
    useLocation,
} from "react-router-dom";

export default function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("user_id");
        localStorage.removeItem("email");
        localStorage.removeItem("role");

        navigate("/login");
    };

    const menuItems = [
        {
            name: "Dashboard",
            path: "/dashboard",
            icon: LayoutDashboard,
        },
        {
            name: "Products",
            path: "/products",
            icon: Package,
        },
        {
            name: "Orders",
            path: "/orders",
            icon: ShoppingCart,
        },
        {
            name: "Customers",
            path: "/customers",
            icon: Users,
        },
        {
            name: "Chat",
            path: "/chat",
            icon: MessageCircle,
        },
        {
            name: "Banners",
            path: "/banners",
            icon: Image,
        },
        {
            name: "Settings",
            path: "/settings",
            icon: Settings,
        },
    ];

    const isActive = (path) => {
        return (
            location.pathname === path ||
            location.pathname.startsWith(`${path}/`)
        );
    };

    return (
        <aside className="w-64 min-h-screen bg-slate-900 text-white p-6 flex flex-col">

            {/* ==================================================
                LOGO
            ================================================== */}

            <div className="mb-10">

                <h1 className="text-3xl font-bold">
                    NEXORA
                </h1>

                <p className="text-xs text-slate-400 mt-1">
                    Admin Dashboard
                </p>

            </div>

            {/* ==================================================
                MENU
            ================================================== */}

            <nav className="space-y-2 flex-1">

                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.path);

                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`
                                group
                                relative
                                flex
                                items-center
                                gap-3
                                p-3
                                rounded-xl
                                font-medium
                                transition-all
                                duration-200

                                ${
                                    active
                                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                                        : "text-slate-300 hover:bg-slate-800 hover:text-white"
                                }
                            `}
                        >

                            {/* Active indicator */}

                            {active && (
                                <span
                                    className="
                                        absolute
                                        left-0
                                        top-1/2
                                        -translate-y-1/2
                                        w-1
                                        h-7
                                        rounded-r-full
                                        bg-white
                                    "
                                />
                            )}

                            {/* Icon */}

                            <span
                                className={`
                                    flex
                                    items-center
                                    justify-center
                                    transition
                                    ${
                                        active
                                            ? "text-white"
                                            : "text-slate-400 group-hover:text-indigo-400"
                                    }
                                `}
                            >
                                <Icon size={22} />
                            </span>

                            {/* Name */}

                            <span className="flex-1">
                                {item.name}
                            </span>

                        </Link>
                    );
                })}

            </nav>

            {/* ==================================================
                LOGOUT
            ================================================== */}

            <div className="border-t border-slate-700 pt-5">

                <button
                    type="button"
                    onClick={handleLogout}
                    className="
                        group
                        w-full
                        flex
                        items-center
                        gap-3
                        p-3
                        rounded-xl
                        text-slate-300
                        hover:bg-red-600
                        hover:text-white
                        transition-all
                        duration-200
                    "
                >

                    <LogOut
                        size={22}
                        className="group-hover:text-white"
                    />

                    <span>
                        Logout
                    </span>

                </button>

            </div>

        </aside>
    );
}