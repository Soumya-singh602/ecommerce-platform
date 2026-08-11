import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();

    return (
        <header className="h-20 bg-white shadow flex items-center justify-between px-8">

            <div>
                <h2 className="text-2xl font-bold text-slate-800">
                    Dashboard
                </h2>

                <p className="text-sm text-gray-500">
                    Welcome back Admin 👋
                </p>
            </div>

            <div className="flex items-center">

                <button
                    onClick={() => navigate("/settings")}
                    className="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-gray-50 transition"
                >

                    <div className="text-right">
                        <h3 className="font-semibold text-slate-800">
                            Admin
                        </h3>

                        <p className="text-sm text-gray-500">
                            admin@gmail.com
                        </p>
                    </div>

                    <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
                        A
                    </div>

                </button>

            </div>

        </header>
    );
}