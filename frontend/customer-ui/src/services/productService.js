import api from "../api/axios";



// Get All Products
export const getProducts = async (params = {}) => {


    const response = await api.get(
        "/products/",
        {
            params: params
        }
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