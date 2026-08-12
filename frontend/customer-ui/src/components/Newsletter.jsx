
import { useState } from "react";

export default function Newsletter() {

    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubscribe = (e) => {

        e.preventDefault();

        setMessage("");
        setError("");

        if (!email.trim()) {
            setError("Please enter your email address.");
            return;
        }

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        setMessage(
            "Thank you for subscribing to our newsletter!"
        );

        setEmail("");
    };

    return (
        <section className="bg-blue-600 mt-20">

            <div className="max-w-7xl mx-auto py-16 px-6 text-center">

                <h2 className="text-4xl font-bold text-white">
                    Subscribe To Our Newsletter
                </h2>

                <p className="text-blue-100 mt-4">
                    Get latest offers, discounts and new arrivals directly in your inbox.
                </p>

                <form
                    onSubmit={handleSubscribe}
                    className="mt-8 flex flex-col md:flex-row justify-center items-center gap-4"
                >

                    <div className="bg-white rounded-xl shadow-md w-full md:w-96">

                        <input
                            type="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setError("");
                                setMessage("");
                            }}
                            placeholder="Enter your email"
                            className="w-full px-6 py-4 rounded-xl outline-none text-gray-700 bg-white"
                        />

                    </div>

                    <button
                        type="submit"
                        className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold shadow-md hover:bg-gray-100 transition"
                    >
                        Subscribe
                    </button>

                </form>

                {error && (
                    <p className="text-red-200 mt-4 font-medium">
                        {error}
                    </p>
                )}

                {message && (
                    <p className="text-white mt-4 font-medium">
                        {message}
                    </p>
                )}

            </div>

        </section>
    );
}

