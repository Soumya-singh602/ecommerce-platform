
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import ProductCard from "./shop/ProductCard";
import { getAllProducts } from "../services/productService";

export default function FeaturedProducts() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        fetchProducts();

    }, []);


    const fetchProducts = async () => {

        try {

            const response = await getAllProducts();

            if (response.success) {

                const sortedProducts = [
                    ...response.data.products
                ].sort(
                    (a, b) =>
                        new Date(b.created_at) -
                        new Date(a.created_at)
                );


                // Latest 4 products

                const featuredProducts =
                    sortedProducts.slice(0, 4);


                setProducts(featuredProducts);

            }

        } catch (error) {

            console.error(
                "Error fetching featured products:",
                error
            );

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
                            Handpicked For You
                        </p>

                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
                            Featured Products
                        </h2>

                    </div>

                </div>


                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                    {[1, 2, 3, 4].map((item) => (

                        <div
                            key={item}
                            className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse"
                        >

                            <div className="h-64 bg-gray-100" />

                            <div className="p-5 space-y-3">

                                <div className="h-4 bg-gray-100 rounded w-3/4" />

                                <div className="h-4 bg-gray-100 rounded w-1/2" />

                                <div className="h-8 bg-gray-100 rounded w-1/3" />

                            </div>

                        </div>

                    ))}

                </div>

            </section>

        );

    }


    /* ==========================
       EMPTY STATE
    ========================== */

    if (!products.length) {

        return (

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center py-10">

                    <p className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
                        Our Collection
                    </p>

                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
                        Featured Products
                    </h2>

                    <p className="text-gray-500 mt-3">
                        Products will appear here soon.
                    </p>

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
                        Handpicked For You
                    </p>

                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
                        Featured Products
                    </h2>

                    <p className="text-gray-500 mt-2">
                        Discover our latest and most popular products.
                    </p>

                </div>


                <Link
                    to="/shop"
                    className="hidden sm:flex items-center gap-1 text-blue-600 font-semibold hover:text-blue-800 transition"
                >

                    View All

                    <span>
                        →
                    </span>

                </Link>

            </div>


            {/* ==========================
                PRODUCTS
            ========================== */}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                {products.map((product) => (

                    <div
                        key={product.id}
                        className="group"
                    >

                        <ProductCard
                            product={product}
                        />

                    </div>

                ))}

            </div>


            {/* Mobile View All */}

            <div className="sm:hidden text-center mt-8">

                <Link
                    to="/shop"
                    className="inline-flex items-center gap-1 text-blue-600 font-semibold"
                >

                    View All Products →

                </Link>

            </div>

        </section>

    );

}

