export default function AddProductModal({ open, onClose }) {

    if (!open) return null;

    return (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white rounded-2xl w-full max-w-xl p-6">

                <h2 className="text-2xl font-bold mb-6">

                    Add Product

                </h2>


                <div className="space-y-4">

                    <input
                        placeholder="Product Name"
                        className="w-full border rounded-xl px-4 py-3"
                    />

                    <input
                        placeholder="Category"
                        className="w-full border rounded-xl px-4 py-3"
                    />

                    <input
                        placeholder="Price"
                        className="w-full border rounded-xl px-4 py-3"
                    />

                    <input
                        placeholder="Stock"
                        className="w-full border rounded-xl px-4 py-3"
                    />

                    <input
                        placeholder="Image URL"
                        className="w-full border rounded-xl px-4 py-3"
                    />

                    <textarea
                        rows="4"
                        placeholder="Description"
                        className="w-full border rounded-xl px-4 py-3"
                    />

                </div>


                <div className="flex justify-end gap-3 mt-6">

                    <button
                        onClick={onClose}
                        className="px-5 py-3 rounded-xl border"
                    >
                        Cancel
                    </button>

                    <button
                        className="bg-indigo-600 text-white px-5 py-3 rounded-xl"
                    >
                        Save Product
                    </button>

                </div>

            </div>

        </div>

    );

}