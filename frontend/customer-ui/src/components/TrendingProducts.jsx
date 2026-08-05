import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "./shop/ProductCard";
import { getAllProducts } from "../services/productService";


export default function TrendingProducts() {


    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);



    useEffect(()=>{

        fetchTrendingProducts();

    },[]);




    const fetchTrendingProducts = async()=>{


        try{


            const response = await getAllProducts();



            if(response.success){



                const sortedProducts = [
                    ...response.data.products
                ].sort(
                    (a,b)=>
                        new Date(b.created_at) -
                        new Date(a.created_at)
                );



                // Skip Featured products
                // Show next 4 products
                const trendingProducts = sortedProducts.slice(4,8);



                setProducts(trendingProducts);



            }



        }catch(error){


            console.error(
                "Error fetching trending products:",
                error
            );


        }finally{


            setLoading(false);


        }


    };




    if(loading){


        return (

            <section className="max-w-7xl mx-auto mt-20 px-4">


                <h2 className="text-3xl font-bold mb-8">
                    Trending Products
                </h2>


                <p>
                    Loading products...
                </p>


            </section>

        );


    }




    return (

        <section className="max-w-7xl mx-auto mt-20 px-4">


            <div className="flex justify-between items-center mb-8">


                <h2 className="text-3xl font-bold">
                    Trending Products
                </h2>



                <Link
                    to="/shop"
                    className="text-blue-600 font-semibold hover:underline"
                >

                    View All

                </Link>


            </div>




            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">


                {
                    products.map((product)=>(


                        <ProductCard

                            key={product.id}

                            product={product}

                        />


                    ))
                }


            </div>



        </section>

    );


}