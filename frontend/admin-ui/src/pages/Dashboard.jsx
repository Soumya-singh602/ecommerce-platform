import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import StatCard from "../components/dashboard/StatCard";
import RecentOrders from "../components/dashboard/RecentOrders";

import {
    Package,
    ShoppingCart,
    Users,
    IndianRupee,
} from "lucide-react";

import { getDashboardData } from "../services/dashboardService";

export default function Dashboard() {

    const [dashboardData, setDashboardData] = useState({

        totalProducts: 0,

        totalOrders: 0,

        totalCustomers: 0,

        recentOrders: [],

        revenue: 0,

    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchDashboard = async () => {

            try {

                const data = await getDashboardData();

                setDashboardData(data);

            } catch (error) {

                console.log("Dashboard Error:", error);

            } finally {

                setLoading(false);

            }

        };

        fetchDashboard();

    }, []);

    if (loading) {

        return (

            <DashboardLayout>

                <div className="text-xl font-semibold">

                    Loading Dashboard...

                </div>

            </DashboardLayout>

        );

    }

    return (

        <DashboardLayout>

            <h1 className="text-4xl font-bold text-slate-800">

                Admin Dashboard 🚀

            </h1>

            <p className="text-gray-500 mt-2">

                Manage your ecommerce business here.

            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">

                <StatCard
                    title="Products"
                    value={dashboardData.totalProducts}
                    icon={<Package size={28} />}
                />

                <StatCard
                    title="Orders"
                    value={dashboardData.totalOrders}
                    icon={<ShoppingCart size={28} />}
                />

                <StatCard
                    title="Customers"
                    value={dashboardData.totalCustomers}
                    icon={<Users size={28} />}
                />

                <StatCard
                    title="Revenue"
                    value={`₹${dashboardData.revenue.toLocaleString()}`}
                    icon={<IndianRupee size={28} />}
                />

            </div>

            <RecentOrders
                orders={dashboardData.recentOrders}
            />

        </DashboardLayout>

    );

}