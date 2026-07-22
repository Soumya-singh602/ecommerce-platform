export default function Login() {

    return (

        <div className="min-h-screen flex items-center justify-center bg-slate-100">

            <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl">

                <div className="text-center mb-8">

                    <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto">

                        <span className="text-white text-3xl font-bold">
                            E
                        </span>

                    </div>


                    <h1 className="text-3xl font-bold mt-5 text-slate-800">

                        Welcome Back

                    </h1>


                    <p className="text-gray-500 mt-2">

                        Login to Admin Dashboard

                    </p>

                </div>


                <form className="space-y-5">


                    <div>

                        <label className="text-sm font-semibold">
                            Email
                        </label>


                        <input

                            type="email"

                            placeholder="admin@example.com"

                            className="w-full mt-2 px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"

                        />

                    </div>



                    <div>

                        <label className="text-sm font-semibold">
                            Password
                        </label>


                        <input

                            type="password"

                            placeholder="********"

                            className="w-full mt-2 px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"

                        />

                    </div>



                    <button

                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold"

                    >

                        Login

                    </button>


                </form>


            </div>

        </div>

    );

}