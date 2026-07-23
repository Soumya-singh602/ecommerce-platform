import { useEffect, useState } from "react";

import { updateProduct } from "../../services/productService";


export default function EditProductModal({
    product,
    onClose,
    onUpdated
}) {


    const [formData, setFormData] = useState({

        name: "",
        description: "",
        price: "",
        stock: "",

    });



    useEffect(() => {

        if(product){

            setFormData({

                name: product.name || "",

                description: product.description || "",

                price: product.price || "",

                stock: product.stock || "",

            });

        }

    }, [product]);




    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };




    const handleSubmit = async (e) => {

        e.preventDefault();


        try {


            await updateProduct(
                product.id,
                formData
            );


            alert(
                "Product updated successfully"
            );


            onUpdated();


            onClose();


        }

        catch(error){

            console.log(
                "UPDATE ERROR:",
                error
            );


            alert(
                "Unable to update product"
            );

        }


    };




    if(!product){

        return null;

    }



    return (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">


            <div className="bg-white rounded-xl p-6 w-96">


                <h2 className="text-2xl font-bold mb-5">

                    Edit Product

                </h2>



                <form onSubmit={handleSubmit}>


                    <input

                        name="name"

                        value={formData.name}

                        onChange={handleChange}

                        placeholder="Product Name"

                        className="w-full border p-2 rounded mb-3"

                    />



                    <textarea

                        name="description"

                        value={formData.description}

                        onChange={handleChange}

                        placeholder="Description"

                        className="w-full border p-2 rounded mb-3"

                    />



                    <input

                        name="price"

                        value={formData.price}

                        onChange={handleChange}

                        placeholder="Price"

                        type="number"

                        className="w-full border p-2 rounded mb-3"

                    />



                    <input

                        name="stock"

                        value={formData.stock}

                        onChange={handleChange}

                        placeholder="Stock"

                        type="number"

                        className="w-full border p-2 rounded mb-3"

                    />



                    <div className="flex justify-end gap-3">


                        <button

                            type="button"

                            onClick={onClose}

                            className="px-4 py-2 bg-gray-300 rounded"

                        >

                            Cancel

                        </button>




                        <button

                            type="submit"

                            className="px-4 py-2 bg-blue-600 text-white rounded"

                        >

                            Update

                        </button>


                    </div>


                </form>


            </div>


        </div>

    );

}