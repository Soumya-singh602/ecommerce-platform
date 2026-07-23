export default function ProductViewModal({
    product,
    onClose
}) {


    if(!product){
        return null;
    }


    return (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">


            <div className="bg-white rounded-xl p-6 w-96">


                <h2 className="text-2xl font-bold mb-5">
                    Product Details
                </h2>


                <p>
                    <b>Name:</b> {product.name}
                </p>


                <p>
                    <b>Description:</b> {product.description}
                </p>


                <p>
                    <b>Price:</b> ₹{product.price}
                </p>


                <p>
                    <b>Stock:</b> {product.stock}
                </p>


                <button

                    onClick={onClose}

                    className="mt-5 bg-red-600 text-white px-4 py-2 rounded"

                >

                    Close

                </button>


            </div>


        </div>

    );

}