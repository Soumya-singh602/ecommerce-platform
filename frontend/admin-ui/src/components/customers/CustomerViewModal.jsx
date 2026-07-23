export default function CustomerViewModal({

    customer,

    onClose

}) {

    if (!customer) return null;

    return (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white rounded-2xl p-6 w-[500px]">

                <h2 className="text-2xl font-bold mb-6">

                    Customer Details

                </h2>

                <div className="space-y-3">

                    <p>

                        <strong>ID :</strong>

                        {" "}#{customer.id}

                    </p>

                    <p>

                        <strong>First Name :</strong>

                        {" "}{customer.first_name}

                    </p>

                    <p>

                        <strong>Last Name :</strong>

                        {" "}{customer.last_name}

                    </p>

                    <p>

                        <strong>Email :</strong>

                        {" "}{customer.email}

                    </p>

                    <p>

                        <strong>Role :</strong>

                        {" "}{customer.role}

                    </p>

                    <p>

                        <strong>Joined :</strong>

                        {" "}

                        {new Date(
                            customer.created_at
                        ).toLocaleDateString()}

                    </p>

                </div>

                <div className="mt-6 text-right">

                    <button

                        onClick={onClose}

                        className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700"

                    >

                        Close

                    </button>

                </div>

            </div>

        </div>

    );

}