import { useState } from "react";

import { createProduct } from "../../services/productService";

export default function AddProductModal({
    open,
    onClose,
    onAdded
}) {

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        image: null,
    });

    if (!open) {
        return null;
    }

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await createProduct(formData);

            alert("Product added successfully");

            setFormData({
                name: "",
                description: "",
                price: "",
                stock: "",
                image: null,
            });

            onAdded();

            onClose();

        }
        catch (error) {

            console.log(
                "CREATE PRODUCT ERROR:",
                error
            );

            alert("Unable to create product");

        }

    };

    return (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

            <div className="bg-white rounded-xl p-6 w-96">

                <h2 className="text-2xl font-bold mb-5">
                    Add Product
                </h2>

                <form onSubmit={handleSubmit}>

                    <input
                        name="name"
                        placeholder="Product Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border p-2 rounded mb-3"
                    />

                    <textarea
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full border p-2 rounded mb-3"
                    />

                    <input
                        name="price"
                        type="number"
                        placeholder="Price"
                        value={formData.price}
                        onChange={handleChange}
                        className="w-full border p-2 rounded mb-3"
                    />

                    <input
                        name="stock"
                        type="number"
                        placeholder="Stock"
                        value={formData.stock}
                        onChange={handleChange}
                        className="w-full border p-2 rounded mb-3"
                    />

                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                image: e.target.files[0],
                            })
                        }
                        className="w-full border p-2 rounded mb-3"
                    />

                    <div className="flex justify-end gap-3">

                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-300 px-4 py-2 rounded"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="bg-green-600 text-white px-4 py-2 rounded"
                        >
                            Save
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}