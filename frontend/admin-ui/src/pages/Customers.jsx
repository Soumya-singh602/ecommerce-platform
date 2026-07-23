import { useState, useEffect } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import CustomerHeader from "../components/customers/CustomerHeader";
import CustomerToolbar from "../components/customers/CustomerToolbar";
import CustomerTable from "../components/customers/CustomerTable";
import CustomerViewModal from "../components/customers/CustomerViewModal";

import {
    getCustomers,
    getCustomerDetail,
    deleteCustomer,
} from "../services/customerService";

export default function Customers() {

    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);

    const [selectedCustomer, setSelectedCustomer] = useState(null);

    const [search, setSearch] = useState("");

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // ==========================
    // FETCH CUSTOMERS
    // ==========================

    const fetchCustomers = async () => {

        try {

            setLoading(true);

            const data = await getCustomers(
                search,
                page
            );

            setCustomers(data.customers);

            setTotalPages(data.total_pages);

        } catch (error) {

            console.log("CUSTOMER ERROR:", error);

        } finally {

            setLoading(false);

        }

    };

    // ==========================
    // VIEW CUSTOMER
    // ==========================

    const handleView = async (id) => {

        try {

            const data = await getCustomerDetail(id);

            setSelectedCustomer(data);

        } catch (error) {

            console.log(error);

            alert("Unable to fetch customer");

        }

    };

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
           "Are you sure you want to delete this customer?"
        );

        if (!confirmDelete) {

        return;

        }

        try {

            await deleteCustomer(id);

            alert("Customer deleted successfully");

            fetchCustomers();

        }catch (error) {

             console.log(error);

             alert("Unable to delete customer");

        }

    };

    useEffect(() => {

        fetchCustomers();

    }, [search, page]);

    if (loading) {

        return (

            <DashboardLayout>

                <h2 className="text-xl font-semibold">

                    Loading Customers...

                </h2>

            </DashboardLayout>

        );

    }

    return (

        <DashboardLayout>

            <CustomerHeader />

            <CustomerToolbar
                search={search}
                setSearch={(value) => {

                    setSearch(value);

                    setPage(1);

                }}
            />

            <CustomerTable
                customers={customers}
                onView={handleView}
                onDelete={handleDelete}
            />

            {/* Pagination */}

            <div className="flex justify-center items-center gap-2 mt-6">

                <button
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                    className="px-4 py-2 border rounded-lg disabled:opacity-50"
                >
                    Previous
                </button>

                {

                    [...Array(totalPages)].map((_, index) => (

                        <button

                            key={index}

                            onClick={() => setPage(index + 1)}

                            className={
                                page === index + 1
                                    ? "px-4 py-2 bg-indigo-600 text-white rounded-lg"
                                    : "px-4 py-2 border rounded-lg hover:bg-gray-100"
                            }

                        >

                            {index + 1}

                        </button>

                    ))

                }

                <button
                    onClick={() => setPage(page + 1)}
                    disabled={page === totalPages}
                    className="px-4 py-2 border rounded-lg disabled:opacity-50"
                >
                    Next
                </button>

            </div>

            <CustomerViewModal
                customer={selectedCustomer}
                onClose={() => setSelectedCustomer(null)}
            />

        </DashboardLayout>

    );

}