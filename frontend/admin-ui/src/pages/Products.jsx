import { useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import ProductHeader from "../components/products/ProductHeader";
import ProductToolbar from "../components/products/ProductToolbar";
import AddProductModal from "../components/products/AddProductModal";

const products = [
    {
        id: 1,
        image: "https://via.placeholder.com/60",
        name: "iPhone 15",
        category: "Mobile",
        price: "₹70,000",
        stock: 20,
        status: "In Stock",
    },
    {
        id: 2,
        image: "https://via.placeholder.com/60",
        name: "MacBook Air M3",
        category: "Laptop",
        price: "₹1,15,000",
        stock: 12,
        status: "In Stock",
    },
    {
        id: 3,
        image: "https://via.placeholder.com/60",
        name: "Samsung S25 Ultra",
        category: "Mobile",
        price: "₹1,10,000",
        stock: 0,
        status: "Out of Stock",
    },
];

export default function Products() {

    const [openModal, setOpenModal] = useState(false);

    return (

        <DashboardLayout>

            <ProductHeader
                onAddProduct={() => setOpenModal(true)}
            />

            <ProductToolbar />

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
                                Category
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

                        {products.map((product) => (

                            <tr
                                key={product.id}
                                className="border-t hover:bg-slate-50"
                            >

                                <td className="p-4">

                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-14 h-14 rounded-lg object-cover"
                                    />

                                </td>

                                <td className="p-4 font-semibold">
                                    {product.name}
                                </td>

                                <td className="p-4">
                                    {product.category}
                                </td>

                                <td className="p-4">
                                    {product.price}
                                </td>

                                <td className="p-4">
                                    {product.stock}
                                </td>

                                <td className="p-4">

                                    <span
                                        className={
                                            product.status === "In Stock"
                                                ? "bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
                                                : "bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm"
                                        }
                                    >
                                        {product.status}
                                    </span>

                                </td>

                                <td className="p-4 space-x-2">

                                    <button className="bg-slate-700 text-white px-3 py-2 rounded-lg hover:bg-slate-800">

                                        View

                                    </button>

                                    <button className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700">

                                        Edit

                                    </button>

                                    <button className="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700">

                                        Delete

                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

            <AddProductModal
                open={openModal}
                onClose={() => setOpenModal(false)}
            />

        </DashboardLayout>

    );

}