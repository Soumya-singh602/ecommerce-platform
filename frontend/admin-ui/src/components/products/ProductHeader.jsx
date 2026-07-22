export default function ProductHeader({ onAddProduct }) {

    return (

        <div className="flex justify-between items-center mb-8">

            <div>

                <h1 className="text-3xl font-bold text-slate-800">
                    Product Management
                </h1>

                <p className="text-gray-500 mt-2">
                    Manage all ecommerce products
                </p>

            </div>

            <button
                onClick={onAddProduct}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl"
            >
                + Add Product
            </button>

        </div>

    );

}