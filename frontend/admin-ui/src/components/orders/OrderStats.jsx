export default function OrderStats({ stats }) {

    if (!stats) return null;


    const cards = [

        {
            title: "Total Orders",
            value: stats.total_orders || 0,
        },

        {
            title: "Pending",
            value: stats.pending_orders || 0,
        },

        {
            title: "Confirmed",
            value: stats.confirmed_orders || 0,
        },

        {
            title: "Shipped",
            value: stats.shipped_orders || 0,
        },

        {
            title: "Delivered",
            value: stats.delivered_orders || 0,
        },

        {
            title: "Cancelled",
            value: stats.cancelled_orders || 0,
        },

    ];


    return (

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">

            {
                cards.map((card) => (

                    <div
                        key={card.title}
                        className="bg-white rounded-2xl shadow p-5"
                    >

                        <h3 className="text-gray-500">
                            {card.title}
                        </h3>


                        <p className="text-3xl font-bold mt-2">
                            {card.value}
                        </p>


                    </div>

                ))
            }

        </div>

    );

}