export default function ProductCard({

    title,
    price,
    image,

}) {

    return (

        <div className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden">

            <img
                src={image}
                alt={title}
                className="h-60 w-full object-cover"
            />

            <div className="p-4">

                <h3 className="font-semibold text-lg">
                    {title}
                </h3>

                <p className="text-blue-600 text-xl font-bold mt-2">
                    ₹ {price}
                </p>

                <button
                    className="mt-4 w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700"
                >
                    Add To Cart
                </button>

            </div>

        </div>

    );

}