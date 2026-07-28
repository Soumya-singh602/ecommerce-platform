import { Trash2 } from "lucide-react";
import { useCart } from "../../context/CartContext";


export default function CartItem({ product }) {


    const {
        increaseQuantity,
        decreaseQuantity,
        removeFromCart
    } = useCart();




    return (

        <div className="flex flex-col md:flex-row items-center justify-between border rounded-xl p-4 mb-6 shadow-sm">


            <div className="flex items-center gap-4">


                <img

                    src={
                        product.image
                        ?
                        `http://127.0.0.1:8002${product.image}`
                        :
                        "https://picsum.photos/150"
                    }

                    className="w-24 h-24 rounded-lg object-cover"

                />



                <div>


                    <h2 className="text-xl font-semibold">

                        {product.name}

                    </h2>



                    <p className="text-blue-600 font-bold">

                        ₹ {product.price}

                    </p>


                </div>


            </div>





            <div className="flex items-center gap-5 mt-4">


                <div className="flex border rounded-lg">


                    <button

                        onClick={()=>
                            decreaseQuantity(product.id)
                        }

                        className="px-3"

                    >

                        -

                    </button>




                    <span className="px-4">

                        {product.quantity}

                    </span>




                    <button

                        onClick={()=>
                            increaseQuantity(product.id)
                        }

                        className="px-3"

                    >

                        +

                    </button>


                </div>




                <button

                    onClick={()=>
                        removeFromCart(product.id)
                    }

                    className="text-red-600"

                >

                    <Trash2 size={22}/>

                </button>


            </div>


        </div>

    );

}