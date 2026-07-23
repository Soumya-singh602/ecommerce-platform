import api from "./axios";

export const getDashboardData = async () => {

    const [products, orders, users] = await Promise.all([

        api.get("/products/"),
        api.get("/orders/admin/"),
        api.get("/users/"),

    ]);

    const recentOrders = orders.data.data.orders;

    const revenue = recentOrders.reduce((total, order) => {

        return total + (Number(order.product?.price || 0) * order.quantity);

    }, 0);

    return {

        totalProducts: products.data.data.total_products,

        totalOrders: orders.data.data.total_orders,

        totalCustomers: users.data.data.length,

        recentOrders,

        revenue,

    };

};