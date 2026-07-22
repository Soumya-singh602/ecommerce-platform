import DashboardLayout from "../layouts/DashboardLayout";

import OrderHeader from "../components/orders/OrderHeader";
import OrderToolbar from "../components/orders/OrderToolbar";
import OrderTable from "../components/orders/OrderTable";

export default function Orders() {

    return (

        <DashboardLayout>

            <OrderHeader />

            <OrderToolbar />

            <OrderTable />

        </DashboardLayout>

    );

}