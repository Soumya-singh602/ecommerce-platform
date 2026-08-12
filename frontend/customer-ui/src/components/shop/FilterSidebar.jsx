
import { useEffect, useState } from "react";
import axios from "axios";

export default function FilterSidebar({
    selectedCategory,
    setSelectedCategory,
    maxPrice,
    setMaxPrice,
    selectedRating,
    setSelectedRating,
}) {

    const [categories, setCategories] = useState([]);
    const [loadingCategories, setLoadingCategories] = useState(true);

    // ==========================
    // SAFE MAX PRICE
    // ==========================

    const safeMaxPrice =
        maxPrice === undefined ||
        maxPrice === null ||
        Number.isNaN(Number(maxPrice))
            ? 5000
            : Number(maxPrice);


    // ==========================
    // FETCH CATEGORIES
    // ==========================

    useEffect(() => {

        const fetchCategories = async () => {

            try {

                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/products/categories/`
                );

                setCategories(
                    response.data.data || []
                );

            } catch (error) {

                console.log(
                    "FILTER CATEGORY ERROR:",
                    error
                );

            } finally {

                setLoadingCategories(false);

            }

        };

        fetchCategories();

    }, []);


    return (

        <div className="bg-white">


            {/* ==========================
                FILTER HEADER
            ========================== */}

            <div className="flex items-center justify-between mb-6">

                <h2 className="text-xl font-bold text-gray-900">
                    Filters
                </h2>


                <button
                    type="button"
                    onClick={() => {

                        setSelectedCategory("");
                        setMaxPrice(5000);
                        setSelectedRating("");

                    }}
                    className="text-sm text-blue-600 font-semibold hover:text-blue-800"
                >

                    Clear All

                </button>

            </div>


            {/* ==========================
                CATEGORY
            ========================== */}

            <div className="pb-6 border-b border-gray-100">

                <h3 className="font-semibold text-gray-900 mb-4">
                    Category
                </h3>


                {loadingCategories ? (

                    <p className="text-sm text-gray-400">
                        Loading categories...
                    </p>

                ) : categories.length === 0 ? (

                    <p className="text-sm text-gray-400">
                        No categories available
                    </p>

                ) : (

                    <div className="space-y-3">

                        {categories.map((category) => (

                            <label
                                key={category.id}
                                className="flex items-center gap-3 cursor-pointer group"
                            >

                                <input
                                    type="radio"
                                    name="category"
                                    value={category.id}
                                    checked={
                                        String(selectedCategory) ===
                                        String(category.id)
                                    }
                                    onChange={() =>
                                        setSelectedCategory(
                                            category.id
                                        )
                                    }
                                    className="w-4 h-4 accent-blue-600"
                                />

                                <span className="text-gray-600 group-hover:text-blue-600 transition">

                                    {category.name}

                                </span>

                            </label>

                        ))}

                    </div>

                )}

            </div>


            {/* ==========================
                PRICE
            ========================== */}

            <div className="py-6 border-b border-gray-100">

                <h3 className="font-semibold text-gray-900 mb-4">
                    Price
                </h3>


                <input
                    type="range"
                    min="0"
                    max="5000"
                    step="100"
                    value={safeMaxPrice}
                    onChange={(e) =>
                        setMaxPrice(
                            Number(e.target.value)
                        )
                    }
                    className="w-full accent-blue-600"
                />


                <div className="flex justify-between text-sm text-gray-500 mt-3">

                    <span>
                        ₹0
                    </span>

                    <span className="font-semibold text-gray-900">
                        ₹{safeMaxPrice.toLocaleString("en-IN")}
                    </span>

                </div>

            </div>


            {/* ==========================
                RATING
            ========================== */}

            <div className="pt-6">

                <h3 className="font-semibold text-gray-900 mb-4">
                    Rating
                </h3>


                <div className="space-y-3">


                    <label className="flex items-center gap-3 cursor-pointer">

                        <input
                            type="radio"
                            name="rating"
                            value="4"
                            checked={selectedRating === "4"}
                            onChange={(e) =>
                                setSelectedRating(
                                    e.target.value
                                )
                            }
                            className="w-4 h-4 accent-blue-600"
                        />

                        <span className="text-gray-600">
                            ⭐ 4★ & Above
                        </span>

                    </label>


                    <label className="flex items-center gap-3 cursor-pointer">

                        <input
                            type="radio"
                            name="rating"
                            value="3"
                            checked={selectedRating === "3"}
                            onChange={(e) =>
                                setSelectedRating(
                                    e.target.value
                                )
                            }
                            className="w-4 h-4 accent-blue-600"
                        />

                        <span className="text-gray-600">
                            ⭐ 3★ & Above
                        </span>

                    </label>


                </div>

            </div>


        </div>

    );

}

