import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

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

    useEffect(() => {

        const keyword = searchParams.get("search") || "";

        setSearch(keyword);

        setPage(1);

    }, [searchParams]);

    const fetchProducts = async () => {

        try {

            setLoading(true);

            const response = await getProducts({

                search: search,
                sort: ordering,
                page: page

            });

            console.log("PRODUCT RESPONSE:", response);

            if (response.success && response.data) {

                setProducts(response.data.products);

                setTotalPages(response.data.total_pages);

            }

            else {

                setProducts([]);

            }

        }

        catch (error) {

            console.log("PRODUCT ERROR:", error);

            setProducts([]);

        }

        finally {

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

            <div className="max-w-7xl mx-auto py-10 px-4">

                <Breadcrumb />

                <h1 className="text-4xl font-bold">

                    Shop

                </h1>

                <div className="mt-6 flex flex-col md:flex-row gap-4 md:items-center">

                    <div className="flex-1">

                        <SearchBar

                            value={search}

                            setSearch={(value) => {

                                setSearch(value);

                                setPage(1);

                            }}

                        />

                    </div>

                    <SortDropdown

                        setOrdering={(value) => {

                            setOrdering(value);

                            setPage(1);

                        }}

                    />

                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-10">

                    <div>

                        <FilterSidebar />

                    </div>

                    <div className="lg:col-span-3">

                        <h2 className="text-2xl font-semibold mb-6">

                            Products

                        </h2>

                        {

                            loading ? (

                                <p>

                                    Loading products...

                                </p>

                            ) : products.length > 0 ? (

                                <ProductGrid

                                    products={products}

                                />

                            ) : (

                                <p>

                                    No products found

                                </p>

                            )

                        }

                        <Pagination

                            page={page}

                            setPage={setPage}

                            totalPages={totalPages}

                        />

                    </div>

                </div>

            </div>

        </MainLayout>

    );

}