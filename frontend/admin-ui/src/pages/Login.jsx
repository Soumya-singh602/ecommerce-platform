import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

export default function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        setError("");

        try {

            const response = await loginUser(email, password);

            localStorage.setItem("access", response.data.access);

            localStorage.setItem("refresh", response.data.refresh);

            localStorage.setItem("user_id", response.data.user_id);

            localStorage.setItem("email", response.data.email);

            localStorage.setItem("role", response.data.role);

            navigate("/dashboard");

        }

        catch (err) {

            setError(

                err.response?.data?.message ||

                "Invalid Email or Password"

            );

        }

        finally {

            setLoading(false);

        }

    };

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

                {

                    error && (

                        <div className="bg-red-100 text-red-700 p-3 rounded-xl mb-4">

                            {error}

                        </div>

                    )

                }

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <div>

                        <label className="text-sm font-semibold">

                            Email

                        </label>

                        <input

                            type="email"

                            value={email}

                            onChange={(e)=>setEmail(e.target.value)}

                            placeholder="admin@example.com"

                            className="w-full mt-2 px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"

                            required

                        />

                    </div>

                    <div>

                        <label className="text-sm font-semibold">

                            Password

                        </label>

                        <input

                            type="password"

                            value={password}

                            onChange={(e)=>setPassword(e.target.value)}

                            placeholder="********"

                            className="w-full mt-2 px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"

                            required

                        />

                    </div>

                    <button

                        type="submit"

                        disabled={loading}

                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold"

                    >

                        {

                            loading

                            ?

                            "Logging in..."

                            :

                            "Login"

                        }

                    </button>

                </form>

            </div>

        </div>

    );

}