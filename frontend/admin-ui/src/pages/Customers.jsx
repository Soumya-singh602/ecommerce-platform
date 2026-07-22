import DashboardLayout from "../layouts/DashboardLayout";

import CustomerHeader from "../components/customers/CustomerHeader";
import CustomerToolbar from "../components/customers/CustomerToolbar";
import CustomerTable from "../components/customers/CustomerTable";

export default function Customers() {

    return (

        <DashboardLayout>

            <CustomerHeader />

            <CustomerToolbar />

            <CustomerTable />

        </DashboardLayout>

    );

}