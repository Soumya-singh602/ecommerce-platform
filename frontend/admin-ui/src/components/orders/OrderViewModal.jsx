export default function OrderViewModal({

    order,

    onClose

}) {

    if (!order) return null;

    return (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white rounded-2xl p-6 w-[500px]">

                <h2 className="text-2xl font-bold mb-6">

                    Order Details

                </h2>

                <div className="space-y-3">

                    <p><strong>Order ID:</strong> #{order.id}</p>

                    <p><strong>User ID:</strong> {order.user_id}</p>

                    <p><strong>Product ID:</strong> {order.product_id}</p>

                    <p><strong>Quantity:</strong> {order.quantity}</p>

                    <p><strong>Status:</strong> {order.status}</p>

                    <p><strong>Address:</strong> {order.address || "-"}</p>

                    <p><strong>Phone:</strong> {order.phone || "-"}</p>

                    <p><strong>City:</strong> {order.city || "-"}</p>

                    <p><strong>Pincode:</strong> {order.pincode || "-"}</p>

                </div>

                <div className="mt-6 text-right">

                    <button

                        onClick={onClose}

                        className="bg-red-600 text-white px-5 py-2 rounded-lg"

                    >

                        Close

                    </button>

                </div>

            </div>

        </div>

    );

}