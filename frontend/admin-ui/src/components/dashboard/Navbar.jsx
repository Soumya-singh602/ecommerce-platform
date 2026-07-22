import { Bell } from "lucide-react";


export default function Navbar() {

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



            <div className="flex items-center gap-6">


                <button className="relative">

                    <Bell size={24} />

                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">

                        3

                    </span>

                </button>



                <div className="flex items-center gap-3">


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


                </div>


            </div>


        </header>

    );

}