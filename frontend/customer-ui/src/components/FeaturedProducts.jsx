import ProductCard from "./ProductCard";

const products = [

    {
        id:1,
        title:"Wireless Headphone",
        price:2499,
        image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"
    },

    {
        id:2,
        title:"Smart Watch",
        price:3999,
        image:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"
    },

    {
        id:3,
        title:"Laptop",
        price:55999,
        image:"https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500"
    },

    {
        id:4,
        title:"Camera",
        price:29999,
        image:"https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500"
    }

];

export default function FeaturedProducts(){

    return(

        <section className="max-w-7xl mx-auto mt-14 px-4">

            <h2 className="text-3xl font-bold mb-8">

                Featured Products

            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

                {

                    products.map((product)=>(

                        <ProductCard

                            key={product.id}

                            title={product.title}

                            price={product.price}

                            image={product.image}

                        />

                    ))

                }

            </div>

        </section>

    )

}