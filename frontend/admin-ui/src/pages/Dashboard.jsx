import DashboardLayout from "../layouts/DashboardLayout";

import StatCard from "../components/dashboard/StatCard";
import RecentOrders from "../components/dashboard/RecentOrders";

import {
    Package,
    ShoppingCart,
    Users,
    IndianRupee
} from "lucide-react";


export default function Dashboard() {


    return (

        <DashboardLayout>


            <h1 className="text-4xl font-bold text-slate-800">

                Admin Dashboard 🚀

            </h1>


            <p className="text-gray-500 mt-2">

                Manage your ecommerce business here.

            </p>



            {/* Statistics Cards */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">


                <StatCard

                    title="Products"

                    value="120"

                    icon={<Package size={28} />}

                />



                <StatCard

                    title="Orders"

                    value="85"

                    icon={<ShoppingCart size={28} />}

                />



                <StatCard

                    title="Customers"

                    value="350"

                    icon={<Users size={28} />}

                />



                <StatCard

                    title="Revenue"

                    value="₹50,000"

                    icon={<IndianRupee size={28} />}

                />


            </div>




            {/* Recent Orders */}

            <RecentOrders />


        </DashboardLayout>

    );

}