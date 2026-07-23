import api from "./axios";

export const getCustomers = async (
    search = "",
    page = 1
) => {

    let url = `/users/internal/?page=${page}`;

    if (search) {

        url += `&search=${search}`;

    }

    const response = await api.get(url);

    return response.data.data;

};

export const getCustomerDetail = async (id) => {

    const response = await api.get(
        `/users/internal/${id}/`
    );

    return response.data.data;

};

export const deleteCustomer = async (id) => {

    const response = await api.delete(
        `/users/${id}/delete/`
    );

    return response.data;

};