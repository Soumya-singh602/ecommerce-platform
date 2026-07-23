import { useState, useEffect } from "react";

export default function OrderUpdateModal({
    order,
    onClose,
    onUpdate
}) {

    const [status, setStatus] = useState("");

    useEffect(() => {

        if (order) {
            setStatus(order.status);
        }

    }, [order]);


    if (!order) return null;


    return (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

            <div className="bg-white rounded-2xl w-[400px] p-6">

                <h2 className="text-xl font-bold mb-6">
                    Update Order Status
                </h2>


                <div className="space-y-4">

                    <label className="font-semibold">
                        Status
                    </label>


                    <select

                        value={status}

                        onChange={(e) => setStatus(e.target.value)}

                        className="w-full border rounded-lg px-4 py-3"

                    >

                        <option value="Pending">
                            Pending
                        </option>

                        <option value="Confirmed">
                            Confirmed
                        </option>

                        <option value="Shipped">
                            Shipped
                        </option>

                        <option value="Delivered">
                            Delivered
                        </option>

                        <option value="Cancelled">
                            Cancelled
                        </option>


                    </select>

                </div>


                <div className="flex justify-end gap-3 mt-6">


                    <button

                        onClick={onClose}

                        className="px-4 py-2 rounded-lg border"

                    >

                        Cancel

                    </button>


                    <button

                        onClick={() => {

                            onUpdate(order.id, status);

                            onClose();

                        }}

                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg"

                    >

                        Update

                    </button>


                </div>


            </div>

        </div>

    );

}