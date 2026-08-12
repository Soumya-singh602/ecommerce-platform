
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Categories() {

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {

        try {

            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/products/categories/`
            );

            setCategories(response.data.data);

        } catch (error) {

            console.log("CATEGORY ERROR:", error);

        } finally {

            setLoading(false);

        }

    };


    /* ==========================
       LOADING
    ========================== */

    if (loading) {

        return (

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="flex justify-between items-end mb-8">

                    <div>

                        <p className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
                            Explore
                        </p>

                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
                            Shop By Category
                        </h2>

                    </div>

                </div>


                <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">

                    {[1, 2, 3, 4].map((item) => (

                        <div
                            key={item}
                            className="h-64 rounded-2xl bg-gray-100 animate-pulse"
                        />

                    ))}

                </div>

            </section>

        );

    }


    /* ==========================
       EMPTY STATE
    ========================== */

    if (!categories.length) {

        return (

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center py-10">

                    <h2 className="text-3xl font-bold text-gray-900">
                        Shop By Category
                    </h2>

                    <p className="text-gray-500 mt-3">
                        No categories available right now.
                    </p>

                    <Link
                        to="/shop"
                        className="inline-block mt-5 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
                    >
                        Browse Products
                    </Link>

                </div>

            </section>

        );

    }


    return (

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* ==========================
                SECTION HEADER
            ========================== */}

            <div className="flex justify-between items-end mb-8">

                <div>

                    <p className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
                        Explore Collections
                    </p>

                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
                        Shop By Category
                    </h2>

                    <p className="text-gray-500 mt-2">
                        Find everything you need in one place.
                    </p>

                </div>


                <Link
                    to="/shop"
                    className="hidden sm:block text-blue-600 font-semibold hover:text-blue-800 transition"
                >
                    View All →
                </Link>

            </div>


            {/* ==========================
                CATEGORY GRID
            ========================== */}

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">

                {categories.map((category) => (

                    <Link
                        key={category.id}
                        to={`/shop?category=${category.id}`}
                        className="group relative rounded-2xl overflow-hidden bg-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
                    >

                        {/* Image */}

                        <img
                            src={
                                category.image
                                    ? `${import.meta.env.VITE_MEDIA_URL}${category.image}`
                                    : "https://via.placeholder.com/600x400?text=Category"
                            }
                            alt={category.name}
                            className="h-56 sm:h-64 w-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />


                        {/* Gradient overlay */}

                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />


                        {/* Content */}

                        <div className="absolute inset-x-0 bottom-0 p-5">

                            <div className="flex items-end justify-between gap-3">

                                <div>

                                    <h3 className="text-white text-xl font-bold">
                                        {category.name}
                                    </h3>

                                    <p className="text-white/80 text-sm mt-1">
                                        Explore collection
                                    </p>

                                </div>


                                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-blue-600 font-bold group-hover:bg-blue-600 group-hover:text-white transition">

                                    →

                                </div>

                            </div>

                        </div>

                    </Link>

                ))}

            </div>


            {/* Mobile View All */}

            <div className="sm:hidden text-center mt-7">

                <Link
                    to="/shop"
                    className="inline-block text-blue-600 font-semibold"
                >
                    View All Categories →
                </Link>

            </div>

        </section>

    );
}

