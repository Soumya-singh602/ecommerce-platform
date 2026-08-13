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

    const mediaUrl = import.meta.env.VITE_MEDIA_URL || "";

    const imageUrl = `${mediaUrl.replace(/\/$/, "")}/${String(
        banner.image || ""
    ).replace(/^\//, "")}`;

    const goTo = (path) => {
        navigate(path);
    };

    return (
        <section className="w-full bg-white">
            <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-6">

                {/* =====================================================
                    MAIN HERO
                ====================================================== */}

                <div
                    className="relative overflow-hidden rounded-3xl min-h-[480px] md:min-h-[540px] bg-cover bg-center shadow-sm"
                    style={{
                        backgroundImage: `url("${imageUrl}")`,
                    }}
                >

                    {/* Soft blue/white overlay */}

                    <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-white/10" />

                    {/* Content */}

                    <div className="relative z-10 min-h-[480px] md:min-h-[540px] flex items-center">

                        <div className="w-full max-w-2xl px-7 sm:px-10 lg:px-14 py-12">

                            {/* Small Label */}

                            <span className="inline-flex items-center gap-2 bg-white/90 border border-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold shadow-sm">

                                <span className="w-2 h-2 rounded-full bg-blue-600" />

                                New Collection

                            </span>


                            {/* Title */}

                            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight text-slate-900">

                                {banner.title}

                            </h1>


                            {/* Subtitle */}

                            <p className="mt-5 max-w-xl text-base sm:text-lg leading-7 text-slate-600">

                                {banner.subtitle}

                            </p>


                            {/* Category text */}

                            <div className="mt-4 flex flex-wrap gap-2 text-sm font-medium text-slate-500">

                                <span>Fashion</span>
                                <span>•</span>

                                <span>Beauty</span>
                                <span>•</span>

                                <span>Electronics</span>
                                <span>•</span>

                                <span>Home</span>

                            </div>


                            {/* Buttons */}

                            <div className="mt-8 flex flex-wrap gap-3">

                                <button
                                    onClick={() =>
                                        goTo(banner.button_link || "/shop")
                                    }
                                    className="px-7 py-3.5 rounded-xl bg-blue-600 text-white font-semibold shadow-lg shadow-blue-600/20 hover:bg-blue-700 hover:-translate-y-0.5 transition-all"
                                >
                                    {banner.button_text || "Shop Now"}
                                </button>


                                <button
                                    onClick={() => goTo("/shop")}
                                    className="px-7 py-3.5 rounded-xl bg-white border border-blue-200 text-blue-700 font-semibold hover:bg-blue-50 transition-all"
                                >
                                    Explore Categories
                                </button>

                            </div>


                            {/* Trust Features */}

                            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-4">

                                <div className="flex items-center gap-3">

                                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 text-lg">
                                        🚚
                                    </div>

                                    <div>
                                        <p className="text-sm font-bold text-slate-800">
                                            Free Shipping
                                        </p>

                                        <p className="text-xs text-slate-500">
                                            On orders over $49
                                        </p>
                                    </div>

                                </div>


                                <div className="flex items-center gap-3">

                                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 text-lg">
                                        ↩
                                    </div>

                                    <div>
                                        <p className="text-sm font-bold text-slate-800">
                                            Easy Returns
                                        </p>

                                        <p className="text-xs text-slate-500">
                                            30 days return policy
                                        </p>
                                    </div>

                                </div>


                                <div className="flex items-center gap-3">

                                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 text-lg">
                                        🛡
                                    </div>

                                    <div>
                                        <p className="text-sm font-bold text-slate-800">
                                            Secure Payment
                                        </p>

                                        <p className="text-xs text-slate-500">
                                            100% secure checkout
                                        </p>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* Slider dots */}

                    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">

                        <span className="w-7 h-2 rounded-full bg-blue-600" />

                        <span className="w-2 h-2 rounded-full bg-white/80" />

                        <span className="w-2 h-2 rounded-full bg-white/80" />

                        <span className="w-2 h-2 rounded-full bg-white/80" />

                    </div>

                </div>


                {/* =====================================================
                    CATEGORY STRIP
                ====================================================== */}

                <div className="mt-5 bg-white border border-slate-100 rounded-2xl shadow-sm">

                    <div className="grid grid-cols-2 md:grid-cols-4">

                        {/* Fashion */}

                        <CategoryItem
                            icon="👗"
                            title="Fashion"
                            subtitle="Trendy styles for you"
                            onClick={() =>
                                goTo("/shop?category=fashion")
                            }
                        />


                        {/* Beauty */}

                        <CategoryItem
                            icon="💄"
                            title="Beauty"
                            subtitle="Look good, feel great"
                            onClick={() =>
                                goTo("/shop?category=beauty")
                            }
                        />


                        {/* Electronics */}

                        <CategoryItem
                            icon="🎧"
                            title="Electronics"
                            subtitle="Latest gadgets & more"
                            onClick={() =>
                                goTo("/shop?category=electronics")
                            }
                        />


                        {/* Home */}

                        <CategoryItem
                            icon="🏠"
                            title="Home & Living"
                            subtitle="Make your home better"
                            onClick={() =>
                                goTo("/shop?category=home")
                            }
                        />

                    </div>

                </div>


                {/* =====================================================
                    PROMO CARDS
                ====================================================== */}

                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                    {/* Mega Sale */}

                    <PromoCard
                        title="MEGA SALE"
                        subtitle="Up to 50% OFF"
                        description="On selected products"
                        button="Shop Now"
                        className="bg-blue-600 text-white"
                        buttonClass="bg-white text-blue-700"
                        onClick={() => goTo("/shop")}
                    />


                    {/* New Arrivals */}

                    <PromoCard
                        title="New Arrivals"
                        subtitle="Fresh & Trending"
                        description="Check out the latest products"
                        button="Explore Now"
                        className="bg-blue-50 text-slate-900"
                        buttonClass="bg-white text-blue-700"
                        onClick={() => goTo("/shop")}
                    />


                    {/* Best Deals */}

                    <PromoCard
                        title="Best Deals"
                        subtitle="Great Prices"
                        description="Amazing products at better prices"
                        button="View Deals"
                        className="bg-slate-50 text-slate-900"
                        buttonClass="bg-blue-600 text-white"
                        onClick={() => goTo("/shop")}
                    />


                    {/* Top Brands */}

                    <PromoCard
                        title="Top Brands"
                        subtitle="Quality Products"
                        description="Shop from trusted brands"
                        button="Shop Now"
                        className="bg-blue-50 text-slate-900"
                        buttonClass="bg-blue-600 text-white"
                        onClick={() => goTo("/shop")}
                    />

                </div>

            </div>
        </section>
    );
}


/* =========================================================
   CATEGORY ITEM
========================================================= */

function CategoryItem({
    icon,
    title,
    subtitle,
    onClick,
}) {
    return (
        <button
            onClick={onClick}
            className="group flex items-center gap-4 p-5 text-left border-b md:border-b-0 md:border-r last:border-r-0 border-slate-100 hover:bg-blue-50/50 transition"
        >

            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">

                {icon}

            </div>


            <div className="min-w-0">

                <h3 className="font-bold text-slate-900">
                    {title}
                </h3>

                <p className="text-xs text-slate-500 mt-1">
                    {subtitle}
                </p>

                <span className="inline-block mt-2 text-xs font-semibold text-blue-600">
                    Shop now →
                </span>

            </div>

        </button>
    );
}


/* =========================================================
   PROMO CARD
========================================================= */

function PromoCard({
    title,
    subtitle,
    description,
    button,
    className,
    buttonClass,
    onClick,
}) {
    return (
        <div
            className={`relative overflow-hidden rounded-2xl p-5 min-h-[180px] ${className}`}
        >

            {/* Decorative circle */}

            <div className="absolute -right-10 -bottom-10 w-32 h-32 rounded-full bg-white/10" />


            <div className="relative z-10">

                <p className="text-xs font-semibold uppercase tracking-wider opacity-70">
                    {title}
                </p>


                <h3 className="mt-3 text-xl font-bold">
                    {subtitle}
                </h3>


                <p className="mt-2 text-sm opacity-75 max-w-[190px]">
                    {description}
                </p>


                <button
                    onClick={onClick}
                    className={`mt-5 px-4 py-2 rounded-lg text-sm font-semibold ${buttonClass} hover:scale-105 transition`}
                >
                    {button}
                </button>

            </div>

        </div>
    );
}