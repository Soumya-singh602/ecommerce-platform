
import {
    Home,
    ShoppingBag,
    Package,
    User,
    CreditCard,
    MessageCircle,
    LogOut
} from "lucide-react";

import {
    Link,
    useNavigate
} from "react-router-dom";

import {
    logout,
    getUser
} from "../utils/auth";


export default function Sidebar() {

    const navigate = useNavigate();

    const user = getUser();


    const handleLogout = () => {

        logout();

        navigate("/login");

    };


    return (

        <aside
            className="
                w-64
                bg-white
                shadow-md
                min-h-full
                flex
                flex-col
                border-r
            "
        >


            {/* =========================
                USER / ACCOUNT SECTION
            ========================== */}

            <Link
                to="/profile"
                className="
                    p-5
                    border-b
                    block
                    hover:bg-blue-50
                    transition
                    cursor-pointer
                "
            >

                <div className="flex items-center gap-3">


                    <div
                        className="
                            w-10
                            h-10
                            rounded-full
                            bg-blue-600
                            text-white
                            flex
                            items-center
                            justify-center
                            font-bold
                        "
                    >

                        <User size={22} />

                    </div>


                    <div>

                        <p className="font-semibold text-gray-800">
                            Account
                        </p>


                        <p className="text-xs text-gray-500">
                            {user?.email}
                        </p>

                    </div>


                </div>

            </Link>


            {/* =========================
                MENU
            ========================== */}

            <nav className="flex-1 p-4 space-y-2">


                <Link
                    to="/"
                    className="
                        flex
                        items-center
                        gap-3
                        p-3
                        rounded-lg
                        hover:bg-blue-50
                        hover:text-blue-600
                    "
                >

                    <Home size={20} />

                    Home

                </Link>


                <Link
                    to="/shop"
                    className="
                        flex
                        items-center
                        gap-3
                        p-3
                        rounded-lg
                        hover:bg-blue-50
                        hover:text-blue-600
                    "
                >

                    <ShoppingBag size={20} />

                    Shop

                </Link>


                <Link
                    to="/orders"
                    className="
                        flex
                        items-center
                        gap-3
                        p-3
                        rounded-lg
                        hover:bg-blue-50
                        hover:text-blue-600
                    "
                >

                    <Package size={20} />

                    Orders

                </Link>


                <Link
                    to="/profile"
                    className="
                        flex
                        items-center
                        gap-3
                        p-3
                        rounded-lg
                        hover:bg-blue-50
                        hover:text-blue-600
                    "
                >

                    <User size={20} />

                    Profile

                </Link>


                <Link
                    to="/saved-cards"
                    className="
                        flex
                        items-center
                        gap-3
                        p-3
                        rounded-lg
                        hover:bg-blue-50
                        hover:text-blue-600
                    "
                >

                    <CreditCard size={20} />

                    Saved Cards

                </Link>


                <Link
                    to="/chat"
                    className="
                        flex
                        items-center
                        gap-3
                        p-3
                        rounded-lg
                        hover:bg-blue-50
                        hover:text-blue-600
                    "
                >

                    <MessageCircle size={20} />

                    Chat

                </Link>


            </nav>


            {/* =========================
                LOGOUT
            ========================== */}

            <div className="p-4 border-t">


                <button
                    onClick={handleLogout}
                    className="
                        w-full
                        flex
                        items-center
                        justify-center
                        gap-3
                        bg-red-500
                        text-white
                        py-3
                        rounded-lg
                        hover:bg-red-600
                        transition
                    "
                >

                    <LogOut size={20} />

                    Logout

                </button>


            </div>


        </aside>

    );

}

