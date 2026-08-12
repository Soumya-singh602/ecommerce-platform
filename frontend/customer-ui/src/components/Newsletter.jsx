
import { useState } from "react";
import { Mail, ArrowRight, CheckCircle } from "lucide-react";

export default function Newsletter() {

    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);


    const handleSubscribe = (e) => {

        e.preventDefault();

        if (!email.trim()) {
            return;
        }

        setSubscribed(true);
        setEmail("");

    };


    return (

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 mb-10">

            <div className="relative overflow-hidden rounded-3xl bg-blue-600">


                {/* Decorative background */}

                <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/10" />

                <div className="absolute -bottom-32 -left-20 w-80 h-80 rounded-full bg-white/10" />


                <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 items-center px-6 sm:px-10 lg:px-16 py-12 lg:py-14">


                    {/* ==========================
                        LEFT CONTENT
                    ========================== */}

                    <div className="text-white">

                        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2">

                            <Mail size={16} />

                            <span className="text-sm font-medium">
                                Stay Updated
                            </span>

                        </div>


                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-5 leading-tight">

                            Get the latest
                            <br />

                            <span className="text-blue-100">
                                offers & updates.
                            </span>

                        </h2>


                        <p className="text-blue-100 mt-5 text-base sm:text-lg max-w-xl leading-relaxed">

                            Subscribe to our newsletter and be the first
                            to know about new arrivals, exclusive deals,
                            discounts and special offers.

                        </p>


                        {/* Benefits */}

                        <div className="flex flex-wrap gap-x-6 gap-y-3 mt-6">

                            <div className="flex items-center gap-2 text-sm text-blue-50">

                                <CheckCircle size={17} />

                                Exclusive offers

                            </div>


                            <div className="flex items-center gap-2 text-sm text-blue-50">

                                <CheckCircle size={17} />

                                New arrivals

                            </div>


                            <div className="flex items-center gap-2 text-sm text-blue-50">

                                <CheckCircle size={17} />

                                Special discounts

                            </div>

                        </div>

                    </div>


                    {/* ==========================
                        RIGHT SUBSCRIBE BOX
                    ========================== */}

                    <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-2xl">

                        {!subscribed ? (

                            <>

                                <h3 className="text-xl font-bold text-gray-900">
                                    Subscribe to our newsletter
                                </h3>


                                <p className="text-gray-500 text-sm mt-2">
                                    Join our community and get exclusive updates.
                                </p>


                                <form
                                    onSubmit={handleSubscribe}
                                    className="mt-6"
                                >

                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address
                                    </label>


                                    <div className="flex flex-col sm:flex-row gap-3">

                                        <div className="relative flex-1">

                                            <Mail
                                                size={19}
                                                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                            />


                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) =>
                                                    setEmail(e.target.value)
                                                }
                                                placeholder="Enter your email"
                                                required
                                                className="w-full h-12 pl-11 pr-4 border border-gray-200 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                                            />

                                        </div>


                                        <button
                                            type="submit"
                                            className="h-12 px-6 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
                                        >

                                            Subscribe

                                            <ArrowRight size={18} />

                                        </button>

                                    </div>


                                    <p className="text-xs text-gray-400 mt-4">
                                        By subscribing, you agree to receive our latest updates and offers.
                                    </p>

                                </form>

                            </>

                        ) : (

                            <div className="text-center py-8">

                                <div className="mx-auto w-14 h-14 rounded-full bg-green-100 text-green-600 flex items-center justify-center">

                                    <CheckCircle size={30} />

                                </div>


                                <h3 className="text-2xl font-bold text-gray-900 mt-5">
                                    You're subscribed!
                                </h3>


                                <p className="text-gray-500 mt-2">
                                    Thanks for joining us. Keep an eye on your inbox for exclusive offers.
                                </p>


                                <button
                                    onClick={() => setSubscribed(false)}
                                    className="mt-5 text-blue-600 font-semibold hover:text-blue-800"
                                >
                                    Subscribe another email
                                </button>

                            </div>

                        )}

                    </div>

                </div>

            </div>

        </section>

    );

}

