
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, PackageSearch } from "lucide-react";

import MainLayout from "../layouts/MainLayout";
import Breadcrumb from "../components/shop/Breadcrumb";
import SearchBar from "../components/shop/SearchBar";
import SortDropdown from "../components/shop/SortDropdown";
import FilterSidebar from "../components/shop/FilterSidebar";
import ProductGrid from "../components/shop/ProductGrid";
import Pagination from "../components/shop/Pagination";

import { getProducts } from "../services/productService";

export default function Shop() {

    const [searchParams] = useSearchParams();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState(
        searchParams.get("search") || ""
    );

    const [ordering, setOrdering] = useState("");

    const [page, setPage] = useState(1);

    const [totalPages, setTotalPages] = useState(1);

    const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

    // ==========================
    // FILTER STATES
    // ==========================

    const [selectedCategory, setSelectedCategory] = useState("");

    const [maxPrice, setMaxPrice] = useState(5000);

    const [selectedRating, setSelectedRating] = useState("");


    // ==========================
    // SEARCH PARAMETER
    // ==========================

    useEffect(() => {

        const keyword =
            searchParams.get("search") || "";

        setSearch(keyword);

        setPage(1);

    }, [searchParams]);


    // ==========================
    // FETCH PRODUCTS
    // ==========================

    const fetchProducts = async () => {

        try {

            setLoading(true);

            const response = await getProducts({

                search: search,

                sort: ordering,

                page: page

            });

            console.log(
                "PRODUCT RESPONSE:",
                response
            );


            if (
                response.success &&
                response.data
            ) {

                setProducts(
                    response.data.products || []
                );

                setTotalPages(
                    response.data.total_pages || 1
                );

            } else {

                setProducts([]);

                setTotalPages(1);

            }

        } catch (error) {

            console.log(
                "PRODUCT ERROR:",
                error
            );

            setProducts([]);

            setTotalPages(1);

        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        fetchProducts();

    }, [
        search,
        ordering,
        page
    ]);


    return (

        <MainLayout>

            <div className="bg-slate-50 min-h-screen">

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">


                    {/* ==========================
                        BREADCRUMB
                    ========================== */}

                    <Breadcrumb />


                    {/* ==========================
                        SHOP HEADER
                    ========================== */}

                    <div className="mt-6">

                        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">

                            <div>

                                <p className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
                                    Explore Our Collection
                                </p>

                                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2">
                                    Shop
                                </h1>

                                <p className="text-gray-500 mt-3 max-w-2xl">
                                    Discover quality products, latest arrivals
                                    and great deals all in one place.
                                </p>

                            </div>


                            <div className="hidden md:flex items-center gap-2 bg-white border border-gray-200 px-4 py-3 rounded-xl">

                                <PackageSearch
                                    size={20}
                                    className="text-blue-600"
                                />

                                <span className="text-sm text-gray-600">

                                    {products.length > 0
                                        ? `${products.length} products`
                                        : "Browse products"}

                                </span>

                            </div>

                        </div>

                    </div>


                    {/* ==========================
                        SEARCH + SORT
                    ========================== */}

                    <div className="mt-8 bg-white rounded-2xl border border-gray-100 shadow-sm p-4">

                        <div className="flex flex-col lg:flex-row gap-4">


                            <div className="flex-1">

                                <SearchBar

                                    value={search}

                                    setSearch={(value) => {

                                        setSearch(value);

                                        setPage(1);

                                    }}

                                />

                            </div>


                            {/* MOBILE FILTER */}

                            <button

                                type="button"

                                onClick={() =>
                                    setMobileFilterOpen(
                                        !mobileFilterOpen
                                    )
                                }

                                className="lg:hidden h-12 px-5 border border-gray-200 rounded-xl bg-white text-gray-700 font-semibold flex items-center justify-center gap-2 hover:border-blue-500 hover:text-blue-600 transition"

                            >

                                <SlidersHorizontal size={18} />

                                Filters

                            </button>


                            {/* SORT */}

                            <div className="lg:w-52">

                                <SortDropdown

                                    setOrdering={(value) => {

                                        setOrdering(value);

                                        setPage(1);

                                    }}

                                />

                            </div>

                        </div>

                    </div>


                    {/* ==========================
                        MAIN SHOP AREA
                    ========================== */}

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">


                        {/* ==========================
                            DESKTOP FILTER
                        ========================== */}

                        <aside className="hidden lg:block">

                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sticky top-24">

                                <div className="flex items-center gap-2 mb-5">

                                    <SlidersHorizontal
                                        size={19}
                                        className="text-blue-600"
                                    />

                                    <h2 className="text-lg font-bold text-gray-900">
                                        Filters
                                    </h2>

                                </div>


                                <FilterSidebar

                                    selectedCategory={
                                        selectedCategory
                                    }

                                    setSelectedCategory={
                                        setSelectedCategory
                                    }

                                    maxPrice={
                                        maxPrice
                                    }

                                    setMaxPrice={
                                        setMaxPrice
                                    }

                                    selectedRating={
                                        selectedRating
                                    }

                                    setSelectedRating={
                                        setSelectedRating
                                    }

                                />

                            </div>

                        </aside>


                        {/* ==========================
                            MOBILE FILTER
                        ========================== */}

                        {mobileFilterOpen && (

                            <div className="lg:hidden bg-white rounded-2xl border border-gray-100 shadow-sm p-5">

                                <div className="flex items-center justify-between mb-5">

                                    <div className="flex items-center gap-2">

                                        <SlidersHorizontal
                                            size={19}
                                            className="text-blue-600"
                                        />

                                        <h2 className="text-lg font-bold">
                                            Filters
                                        </h2>

                                    </div>


                                    <button

                                        type="button"

                                        onClick={() =>
                                            setMobileFilterOpen(
                                                false
                                            )
                                        }

                                        className="text-sm text-gray-500 hover:text-gray-900"

                                    >

                                        Close

                                    </button>

                                </div>


                                <FilterSidebar

                                    selectedCategory={
                                        selectedCategory
                                    }

                                    setSelectedCategory={
                                        setSelectedCategory
                                    }

                                    maxPrice={
                                        maxPrice
                                    }

                                    setMaxPrice={
                                        setMaxPrice
                                    }

                                    selectedRating={
                                        selectedRating
                                    }

                                    setSelectedRating={
                                        setSelectedRating
                                    }

                                />

                            </div>

                        )}


                        {/* ==========================
                            PRODUCTS AREA
                        ========================== */}

                        <main className="lg:col-span-3">


                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">

                                <div>

                                    <h2 className="text-2xl font-bold text-gray-900">

                                        {search
                                            ? `Results for "${search}"`
                                            : "All Products"}

                                    </h2>


                                    <p className="text-gray-500 text-sm mt-1">

                                        {loading
                                            ? "Finding products..."
                                            : `${products.length} products on this page`}

                                    </p>

                                </div>


                                {search && (

                                    <button

                                        type="button"

                                        onClick={() => {

                                            setSearch("");

                                            setPage(1);

                                        }}

                                        className="text-sm text-blue-600 font-semibold hover:text-blue-800"

                                    >

                                        Clear Search

                                    </button>

                                )}

                            </div>


                            {/* ==========================
                                LOADING
                            ========================== */}

                            {loading ? (

                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

                                    {[1, 2, 3, 4, 5, 6].map(
                                        (item) => (

                                            <div
                                                key={item}
                                                className="bg-white rounded-2xl overflow-hidden border border-gray-100 animate-pulse"
                                            >

                                                <div className="h-64 bg-gray-100" />

                                                <div className="p-5 space-y-3">

                                                    <div className="h-5 bg-gray-100 rounded w-3/4" />

                                                    <div className="h-4 bg-gray-100 rounded w-full" />

                                                    <div className="h-4 bg-gray-100 rounded w-2/3" />

                                                    <div className="h-10 bg-gray-100 rounded mt-4" />

                                                </div>

                                            </div>

                                        )
                                    )}

                                </div>

                            ) : products.length > 0 ? (

                                <>

                                    <ProductGrid
                                        products={products}
                                    />


                                    <div className="mt-10">

                                        <Pagination

                                            page={page}

                                            setPage={setPage}

                                            totalPages={totalPages}

                                        />

                                    </div>

                                </>

                            ) : (

                                /* ==========================
                                   EMPTY STATE
                                ========================== */

                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm py-20 px-6 text-center">

                                    <div className="w-16 h-16 mx-auto rounded-full bg-blue-50 flex items-center justify-center">

                                        <PackageSearch
                                            size={30}
                                            className="text-blue-600"
                                        />

                                    </div>


                                    <h3 className="text-2xl font-bold text-gray-900 mt-5">
                                        No products found
                                    </h3>


                                    <p className="text-gray-500 mt-2 max-w-md mx-auto">

                                        We couldn't find any products matching
                                        your search. Try another keyword or
                                        browse our complete collection.

                                    </p>


                                    <button

                                        type="button"

                                        onClick={() => {

                                            setSearch("");

                                            setOrdering("");

                                            setSelectedCategory("");

                                            setMaxPrice(5000);

                                            setSelectedRating("");

                                            setPage(1);

                                        }}

                                        className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"

                                    >

                                        Browse All Products

                                    </button>

                                </div>

                            )}

                        </main>

                    </div>

                </div>

            </div>

        </MainLayout>

    );

}

