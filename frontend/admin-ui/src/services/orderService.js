import api from "./axios";


export const getOrders = async (
    search = "",
    status = "",
    sort = "",
    page = 1
) => {

    let url = `/orders/admin/?page=${page}`;

    if (search) {
        url += `&search=${search}`;
    }

    if (status) {
        url += `&status=${status}`;
    }

    if (sort) {
        url += `&sort=${sort}`;
    }

    const response = await api.get(url);

    return response.data.data;
};

export const getOrderDetail = async (id) => {

    const response = await api.get(`/orders/admin/${id}/`);

    return response.data.data;

};
export const updateOrderStatus = async (id, status) => {

    const response = await api.put(

        `/orders/${id}/status/`,

        {
            status
        }

    );

    return response.data;

};

export const getOrderStats = async () => {

    const response = await api.get(
        "/orders/admin/stats/"
    );

    return response.data.data;

};