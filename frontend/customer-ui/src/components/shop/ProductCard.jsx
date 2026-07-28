import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";


export default function ProductCard({ product }) {


  const { addToCart } = useCart();


  const handleAddToCart = (e) => {

    e.preventDefault();

    console.log("ADDING PRODUCT:", product);

    addToCart(product);

  };


  return (

    <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition">


      {/* Product Image + Details */}

      <Link to={`/product/${product.id}`}>

        <img
          src={
            product.image
              ? `http://127.0.0.1:8002${product.image}`
              : "https://picsum.photos/400/300"
          }
          alt={product.name}
          className="w-full h-60 object-cover"
        />


        <div className="p-4">

          <h3 className="text-lg font-semibold">
            {product.name}
          </h3>


          <p className="text-gray-500 mt-2">
            {product.description}
          </p>


          <p className="text-blue-600 text-xl font-bold mt-3">
            ₹ {product.price}
          </p>


        </div>


      </Link>



      {/* Add Cart Button */}

      <div className="p-4">


        <button

          type="button"

          onClick={handleAddToCart}

          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"

        >

          <ShoppingCart size={20} />

          Add To Cart


        </button>


      </div>



    </div>

  );

}