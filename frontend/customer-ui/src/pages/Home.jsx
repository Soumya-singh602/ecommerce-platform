
import MainLayout from "../layouts/MainLayout";

import Hero from "../components/Hero";
import Categories from "../components/Categories";
import FeaturedProducts from "../components/FeaturedProducts";
import TrendingProducts from "../components/TrendingProducts";
import Newsletter from "../components/Newsletter";

export default function Home() {

    return (

        <MainLayout>

            {/* =========================
                HERO SECTION
            ========================= */}

            <section className="bg-white">
                <Hero />
            </section>


            {/* =========================
                CATEGORIES
            ========================= */}

            <section className="bg-slate-50 py-16">

                <div className="max-w-7xl mx-auto px-6">

                    <Categories />

                </div>

            </section>


            {/* =========================
                FEATURED PRODUCTS
            ========================= */}

            <section className="bg-white py-16">

                <div className="max-w-7xl mx-auto px-6">

                    <FeaturedProducts />

                </div>

            </section>


            {/* =========================
                TRENDING PRODUCTS
            ========================= */}

            <section className="bg-slate-50 py-16">

                <div className="max-w-7xl mx-auto px-6">

                    <TrendingProducts />

                </div>

            </section>


            {/* =========================
                NEWSLETTER
            ========================= */}

            <section className="bg-white">

                <Newsletter />

            </section>

        </MainLayout>

    );
}

