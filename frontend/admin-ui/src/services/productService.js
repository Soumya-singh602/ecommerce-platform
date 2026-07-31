import api from "./axios";

export const getProducts = async (
    search = "",
    sort = "",
    minPrice = "",
    maxPrice = "",
    page = 1
) => {

    const params = {};

    if (search) {
        params.search = search;
    }

    if (sort) {
        params.sort = sort;
    }

    if (minPrice) {
        params.min_price = minPrice;
    }

    if (maxPrice) {
        params.max_price = maxPrice;
    }

    params.page = page;

    const response = await api.get(
        "/products/",
        {
            params
        }
    );

    return response.data.data;

};

export const deleteProduct = async (id) => {

    const response = await api.delete(
        `/products/${id}/delete/`
    );

    return response.data;

};

export const updateProduct = async (id, data) => {

    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("stock", data.stock);

    if (data.image) {
        formData.append("image", data.image);
    }

    const response = await api.put(
        `/products/${id}/update/`,
        formData
    );

    return response.data;

};

export const createProduct = async (data) => {

    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("stock", data.stock);

    if (data.image) {
        formData.append("image", data.image);
    }

    const response = await api.post(
        "/products/create/",
        formData
    );

    return response.data;

};

export const getProductDetail = async (id) => {

    const response = await api.get(
        `/products/${id}/`
    );

    return response.data;

};