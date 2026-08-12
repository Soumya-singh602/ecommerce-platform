
import { Trash2, Minus, Plus } from "lucide-react";
import { useCart } from "../../context/CartContext";

export default function CartItem({ product }) {

    const {
        increaseQuantity,
        decreaseQuantity,
        removeFromCart
    } = useCart();


    const imageUrl = product.image
        ? `${import.meta.env.VITE_MEDIA_URL}${product.image}`
        : "/placeholder.png";


    const price = Number(product.price || 0);

    const quantity = Number(product.quantity || 1);

    const subtotal = price * quantity;


    return (

        <div className="
            bg-white
            border
            border-gray-200
            rounded-2xl
            p-4
            md:p-5
            transition
            hover:shadow-md
        ">

            <div className="
                flex
                flex-col
                sm:flex-row
                gap-4
                sm:items-center
            ">


                {/* ================= PRODUCT ================= */}

                <div className="flex items-center gap-4 flex-1 min-w-0">

                    <div className="
                        w-24
                        h-24
                        md:w-28
                        md:h-28
                        rounded-xl
                        overflow-hidden
                        bg-gray-100
                        flex-shrink-0
                    ">

                        <img
                            src={imageUrl}
                            alt={product.name}
                            className="
                                w-full
                                h-full
                                object-cover
                                hover:scale-105
                                transition-transform
                                duration-300
                            "
                        />

                    </div>


                    <div className="min-w-0">

                        <h2 className="
                            text-base
                            md:text-lg
                            font-bold
                            text-gray-900
                            truncate
                        ">

                            {product.name}

                        </h2>


                        <p className="text-sm text-gray-500 mt-1">

                            Unit Price

                        </p>


                        <p className="
                            text-indigo-600
                            font-bold
                            mt-1
                        ">

                            ₹{price.toLocaleString("en-IN")}

                        </p>

                    </div>

                </div>


                {/* ================= QUANTITY ================= */}

                <div className="
                    flex
                    items-center
                    justify-between
                    sm:justify-center
                    gap-5
                ">

                    <div>

                        <p className="
                            text-xs
                            text-gray-400
                            mb-2
                            text-center
                        ">

                            Quantity

                        </p>


                        <div className="
                            flex
                            items-center
                            border
                            border-gray-200
                            rounded-xl
                            overflow-hidden
                            bg-gray-50
                        ">

                            <button
                                type="button"
                                onClick={() =>
                                    decreaseQuantity(product.id)
                                }
                                disabled={quantity <= 1}
                                className="
                                    w-9
                                    h-9
                                    flex
                                    items-center
                                    justify-center
                                    text-gray-600
                                    hover:bg-gray-200
                                    disabled:opacity-40
                                    disabled:cursor-not-allowed
                                    transition
                                "
                            >

                                <Minus size={15} />

                            </button>


                            <span className="
                                w-10
                                text-center
                                font-semibold
                                text-gray-800
                            ">

                                {quantity}

                            </span>


                            <button
                                type="button"
                                onClick={() =>
                                    increaseQuantity(product.id)
                                }
                                className="
                                    w-9
                                    h-9
                                    flex
                                    items-center
                                    justify-center
                                    text-gray-600
                                    hover:bg-gray-200
                                    transition
                                "
                            >

                                <Plus size={15} />

                            </button>

                        </div>

                    </div>


                    {/* ================= SUBTOTAL ================= */}

                    <div className="hidden sm:block min-w-[100px] text-right">

                        <p className="
                            text-xs
                            text-gray-400
                            mb-1
                        ">

                            Subtotal

                        </p>

                        <p className="
                            font-bold
                            text-gray-900
                        ">

                            ₹{subtotal.toLocaleString("en-IN")}

                        </p>

                    </div>


                    {/* ================= REMOVE ================= */}

                    <button
                        type="button"
                        onClick={() =>
                            removeFromCart(product.id)
                        }
                        className="
                            w-10
                            h-10
                            rounded-xl
                            flex
                            items-center
                            justify-center
                            text-red-500
                            bg-red-50
                            hover:bg-red-100
                            transition
                        "
                        title="Remove item"
                    >

                        <Trash2 size={19} />

                    </button>

                </div>

            </div>


            {/* MOBILE SUBTOTAL */}

            <div className="
                sm:hidden
                mt-4
                pt-4
                border-t
                border-gray-100
                flex
                justify-between
                items-center
            ">

                <span className="text-sm text-gray-500">
                    Subtotal
                </span>

                <span className="font-bold text-gray-900">
                    ₹{subtotal.toLocaleString("en-IN")}
                </span>

            </div>

        </div>

    );
}
