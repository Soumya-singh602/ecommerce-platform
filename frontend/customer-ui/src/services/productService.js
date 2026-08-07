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

// Get All Products (Without Pagination)
export const getAllProducts = async () => {

    const response = await api.get(
        "/products/",
        {
            params:{
                all:true
            }
        }
    );


    console.log(
        "TOTAL:",
        response.data.data.total_products
    );

    console.log(
        "PRODUCT LENGTH:",
        response.data.data.products.length
    );


    return response.data;

};

