export default function OrderCancelModal({

    order,

    onClose,

    onConfirm

}) {

    if (!order) return null;

    return (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white rounded-2xl p-6 w-[400px]">

                <h2 className="text-2xl font-bold mb-4">

                    Cancel Order

                </h2>

                <p className="text-gray-600 mb-6">

                    Are you sure you want to cancel
                    <strong> Order #{order.id}</strong> ?

                </p>

                <div className="flex justify-end gap-3">

                    <button

                        onClick={onClose}

                        className="px-4 py-2 border rounded-lg"

                    >

                        No

                    </button>

                    <button

                        onClick={() => onConfirm(order.id)}

                        className="bg-red-600 text-white px-4 py-2 rounded-lg"

                    >

                        Yes, Cancel

                    </button>

                </div>

            </div>

        </div>

    );

}