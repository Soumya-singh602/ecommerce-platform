
import { useEffect, useState } from "react";
import { getBanner } from "../services/bannerService";
import { useNavigate } from "react-router-dom";

export default function Hero() {

    const [banner, setBanner] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {

        const fetchBanner = async () => {

            try {

                const response = await getBanner();

                console.log("BANNER:", response);

                setBanner(response.data);

            } catch (error) {

                console.log("BANNER ERROR:", error);

            }

        };

        fetchBanner();

    }, []);


    if (!banner) {
        return null;
    }


    const mediaUrl =
        import.meta.env.VITE_MEDIA_URL || "";


    return (

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-10">

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">


                {/* =========================
                    MAIN HERO
                ========================= */}

                <div
                    className="lg:col-span-2 relative min-h-[430px] md:min-h-[500px] rounded-3xl overflow-hidden bg-cover bg-center"
                    style={{
                        backgroundImage:
                            `url(${mediaUrl}${banner.image})`
                    }}
                >

                    {/* Dark overlay */}

                    <div className="absolute inset-0 bg-black/40" />


                    {/* Content */}

                    <div className="relative z-10 h-full min-h-[430px] md:min-h-[500px] flex items-center">

                        <div className="max-w-xl px-7 py-12 sm:px-10 md:px-14 text-white">


                            <span className="inline-block bg-white/20 backdrop-blur-sm border border-white/30 px-4 py-2 rounded-full text-sm font-medium">

                                New Collection

                            </span>


                            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mt-6">

                                {banner.title}

                            </h1>


                            <p className="mt-5 text-base sm:text-lg text-white/90 leading-relaxed max-w-lg">

                                {banner.subtitle}

                            </p>


                            <div className="mt-8 flex flex-wrap gap-4">

                                <button
                                    onClick={() =>
                                        navigate(banner.button_link)
                                    }
                                    className="bg-white text-blue-700 px-7 py-3.5 rounded-xl font-semibold hover:bg-gray-100 transition shadow-lg"
                                >

                                    {banner.button_text}

                                </button>


                                <button
                                    onClick={() =>
                                        navigate("/shop")
                                    }
                                    className="border border-white/70 text-white px-7 py-3.5 rounded-xl font-semibold hover:bg-white/10 transition"
                                >

                                    Shop All

                                </button>

                            </div>

                        </div>

                    </div>

                </div>


                {/* =========================
                    SIDE CATEGORY CARDS
                ========================= */}

                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">


                    {/* Electronics */}

                    <div
                        onClick={() =>
                            navigate("/shop?category=electronics")
                        }
                        className="group bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-lg transition cursor-pointer"
                    >

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-sm text-gray-500">
                                    Explore
                                </p>

                                <h3 className="font-bold text-xl text-gray-900 mt-1">
                                    Electronics
                                </h3>

                            </div>


                            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-2xl group-hover:scale-110 transition">

                                ⚡

                            </div>

                        </div>


                        <p className="text-gray-500 text-sm mt-4">
                            Discover the latest gadgets and technology.
                        </p>


                        <span className="inline-block mt-4 text-blue-600 font-semibold text-sm group-hover:translate-x-1 transition">

                            Shop now →

                        </span>

                    </div>


                    {/* Fashion */}

                    <div
                        onClick={() =>
                            navigate("/shop?category=fashion")
                        }
                        className="group bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-lg transition cursor-pointer"
                    >

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-sm text-gray-500">
                                    Explore
                                </p>

                                <h3 className="font-bold text-xl text-gray-900 mt-1">
                                    Fashion
                                </h3>

                            </div>


                            <div className="w-12 h-12 rounded-xl bg-pink-50 flex items-center justify-center text-2xl group-hover:scale-110 transition">

                                👕
                                
                            </div>

                        </div>


                        <p className="text-gray-500 text-sm mt-4">
                            Find trending styles for every occasion.
                        </p>


                        <span className="inline-block mt-4 text-blue-600 font-semibold text-sm group-hover:translate-x-1 transition">

                            Shop now →

                        </span>

                    </div>


                    {/* Home & Living */}

                    <div
                        onClick={() =>
                            navigate("/shop?category=home")
                        }
                        className="group bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-lg transition cursor-pointer"
                    >

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-sm text-gray-500">
                                    Explore
                                </p>

                                <h3 className="font-bold text-xl text-gray-900 mt-1">
                                    Home & Living
                                </h3>

                            </div>


                            <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-2xl group-hover:scale-110 transition">

                                🏠

                            </div>

                        </div>


                        <p className="text-gray-500 text-sm mt-4">
                            Upgrade your home with beautiful essentials.
                        </p>


                        <span className="inline-block mt-4 text-blue-600 font-semibold text-sm group-hover:translate-x-1 transition">

                            Shop now →

                        </span>

                    </div>


                </div>

            </div>

        </section>

    );
}

