import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SortDropdown from "../components/SortDropdown";


import DashboardLayout from "../layouts/DashboardLayout";
import ProductHeader from "../components/products/ProductHeader";
import ProductToolbar from "../components/products/ProductToolbar";
import AddProductModal from "../components/products/AddProductModal";
import EditProductModal from "../components/products/EditProductModal";
import ProductViewModal from "../components/products/ProductViewModal";



import {
    getProducts,
    deleteProduct,
    updateProduct,
    getProductDetail,
} from "../services/productService";

export default function Products() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedViewProduct, setSelectedViewProduct] = useState(null);
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    // ==========================
    // FETCH PRODUCTS
    // ==========================
    const fetchProducts = async () => {

        try {

            setLoading(true);

            const data = await getProducts(search,sort , minPrice , maxPrice , page);

            setProducts(data.products);
            setTotalPages(data.total_pages);

        } catch (error) {

            console.log("PRODUCT ERROR:", error);

        } finally {

            setLoading(false);

        }

    };

    // ==========================
    // DELETE PRODUCT
    // ==========================
    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmDelete) return;

        try {

            await deleteProduct(id);

            alert("Product deleted successfully");

            fetchProducts();

        } catch (error) {

            console.log(error);

            alert("Unable to delete product");

        }

    };

    useEffect(() => {

        fetchProducts();

    }, [search , sort , minPrice , maxPrice , page]);

    if (loading) {

        return (

            <DashboardLayout>

                <div className="text-xl font-semibold">

                    Loading Products...

                </div>

            </DashboardLayout>

        );

    }

    return (

        <DashboardLayout>

            <ProductHeader
                onAddProduct={() => setOpenModal(true)}

            />

            <ProductToolbar 
                 search={search}

                 setSearch={setSearch}

                 minPrice={minPrice}
                 setMinPrice={setMinPrice}

                 maxPrice={maxPrice}
                 setMaxPrice={setMaxPrice}



            />
            <SortDropdown setSort={setSort}/>

            <div className="bg-white rounded-2xl shadow overflow-hidden">

                <table className="w-full">

                    <thead className="bg-slate-100">

                        <tr>

                            <th className="p-4 text-left">
                                Image
                            </th>

                            <th className="p-4 text-left">
                                Product
                            </th>

                            <th className="p-4 text-left">
                                Description
                            </th>

                            <th className="p-4 text-left">
                                Price
                            </th>

                            <th className="p-4 text-left">
                                Stock
                            </th>

                            <th className="p-4 text-left">
                                Status
                            </th>

                            <th className="p-4 text-left">
                                Action
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {products.length === 0 ? (

                            <tr>

                                <td
                                    colSpan="7"
                                    className="text-center p-6 text-gray-500"
                                >

                                    No Products Found

                                </td>

                            </tr>

                        ) : (

                            products.map((product) => (

                                <tr
                                    key={product.id}
                                    className="border-t hover:bg-slate-50"
                                >

                                    <td className="p-4">

                                        <img
                                            src={
                                                product.image ||
                                                "https://via.placeholder.com/60"
                                            }
                                            alt={product.name}
                                            className="w-14 h-14 rounded-lg object-cover"
                                        />
                                
                                    </td>

                                    <td className="p-4 font-semibold">

                                        {product.name}

                                    </td>

                                    <td className="p-4">

                                        {product.description || "-"}

                                    </td>

                                    <td className="p-4">

                                        ₹{product.price}

                                    </td>

                                    <td className="p-4">

                                        {product.stock}

                                    </td>

                                    <td className="p-4">

                                        <span
                                            className={
                                                product.stock > 0
                                                    ? "bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
                                                    : "bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm"
                                            }
                                        >

                                            {product.stock > 0
                                                ? "In Stock"
                                                : "Out of Stock"}

                                        </span>

                                    </td>

                                    <td className="p-4 space-x-2">

                                        <button

                                            onClick={() => navigate(`/products/${product.id}`)}

                                              className="bg-slate-700 text-white px-3 py-2 rounded-lg hover:bg-slate-800"

                                                    >

                                                       View

                                        </button>

                                        <button 
                                            onClick={() => setSelectedProduct(product)}
                                            className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700">

                                            Edit

                                        </button>

                                        <button
                                            onClick={() => handleDelete(product.id)}
                                            className="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700"
                                        >

                                            Delete

                                        </button>

                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>

            {/* Pagination */}

            <div className="flex justify-center gap-3 mt-6">

                {
                 Array.from(
                 { length: totalPages },
                 (_, index) => (

                  <button

                    key={index}

                    onClick={() => setPage(index + 1)}

                    className={
                        page === index + 1
                        ? "bg-indigo-600 text-white px-4 py-2 rounded-lg"
                        : "bg-slate-200 px-4 py-2 rounded-lg"
                    }

                        >

                          {index + 1}

                </button>

                        )
                    )
                }

           </div>

            <AddProductModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                onAdded={fetchProducts}
            />
            <EditProductModal

                 product={selectedProduct}

                 onClose={() => setSelectedProduct(null)}

                 onUpdated={fetchProducts}

            />

            <ProductViewModal

                product={selectedViewProduct}

                onClose={() => setSelectedViewProduct(null)}

                />

        </DashboardLayout>

    );

}