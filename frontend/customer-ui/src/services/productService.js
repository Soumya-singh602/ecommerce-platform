import api from "../api/axios";


// Get All Products
export const getProducts = async () => {

    const response = await api.get(
        "/products/"
    );

    return response.data;

};


// Get Single Product
export const getProductDetails = async (id) => {

    const response = await api.get(
        `/products/${id}/`
    );

    return response.data;

};