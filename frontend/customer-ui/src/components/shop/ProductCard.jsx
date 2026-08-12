
import { ShoppingCart, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

export default function ProductCard({ product }) {

    const { addToCart } = useCart();


    const handleAddToCart = (e) => {

        e.preventDefault();
        e.stopPropagation();

        console.log("ADDING PRODUCT:", product);

        addToCart(product);

    };


    return (

        <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">


            {/* ==========================
                PRODUCT IMAGE
            ========================== */}

            <Link
                to={`/product/${product.id}`}
                className="block relative overflow-hidden bg-gray-100"
            >

                <img
                    src={
                        product.image
                            ? `${import.meta.env.VITE_MEDIA_URL}${product.image}`
                            : "/placeholder.png"
                    }
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />


                {/* View Product Icon */}

                <div className="absolute top-4 right-4">

                    <div className="w-10 h-10 rounded-full bg-white/95 backdrop-blur-sm shadow flex items-center justify-center text-gray-700 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">

                        <ArrowUpRight size={18} />

                    </div>

                </div>

            </Link>


            {/* ==========================
                PRODUCT DETAILS
            ========================== */}

            <div className="p-5">


                <Link to={`/product/${product.id}`}>

                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-1 hover:text-blue-600 transition">

                        {product.name}

                    </h3>


                    <p className="text-gray-500 text-sm mt-2 line-clamp-2 min-h-[40px]">

                        {product.description ||
                            "Quality product from our collection."}

                    </p>

                </Link>


                {/* ==========================
                    PRICE
                ========================== */}

                <div className="mt-5">

                    <p className="text-xs text-gray-400 uppercase tracking-wide">
                        Price
                    </p>

                    <p className="text-xl font-bold text-gray-900 mt-1">

                        ₹ {Number(product.price).toLocaleString("en-IN")}

                    </p>

                </div>


                {/* ==========================
                    ADD TO CART
                ========================== */}

                <button

                    type="button"

                    onClick={handleAddToCart}

                    className="w-full mt-4 bg-gray-900 text-white py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center gap-2"

                >

                    <ShoppingCart size={18} />

                    Add To Cart

                </button>


            </div>

        </div>

    );

}

