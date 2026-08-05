import { useEffect, useState } from "react";
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
                const featuredProducts = sortedProducts.slice(0, 4);


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



    if (loading) {

        return (

            <section className="max-w-7xl mx-auto mt-14 px-4">

                <h2 className="text-3xl font-bold mb-8">
                    Featured Products
                </h2>

                <p>
                    Loading products...
                </p>

            </section>

        );

    }



    return (

        <section className="max-w-7xl mx-auto mt-14 px-4">


            <h2 className="text-3xl font-bold mb-8">
                Featured Products
            </h2>



            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">


                {
                    products.map((product)=> (

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