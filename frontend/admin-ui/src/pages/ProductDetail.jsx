import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import {
    getProductDetail
} from "../services/productService";


export default function ProductDetail(){


    const { id } = useParams();


    const [product,setProduct] = useState(null);



    useEffect(()=>{


        const fetchProduct = async()=>{


            try{


                const response = await getProductDetail(id);


                setProduct(response.data);


            }

            catch(error){


                console.log(
                    "PRODUCT DETAIL ERROR:",
                    error
                );


            }


        };


        fetchProduct();


    },[id]);




    return (

        <DashboardLayout>


            <h1 className="text-3xl font-bold mb-6">

                Product Details

            </h1>



            {
                product && (

                    <div className="bg-white rounded-xl shadow p-6">


                        <h2 className="text-2xl font-semibold mb-4">

                            {product.name}

                        </h2>



                        <p className="mb-3">

                            <b>Description:</b> {product.description}

                        </p>



                        <p className="mb-3">

                            <b>Price:</b> ₹{product.price}

                        </p>



                        <p className="mb-3">

                            <b>Stock:</b> {product.stock}

                        </p>


                    </div>

                )
            }



        </DashboardLayout>

    );

}