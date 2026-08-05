import axios from "./axios";

export const getBanners = async () => {

    const response = await axios.get(
        "/products/banners/"
    );

    return response.data;
};

export const getBanner = async () => {

    const response = await axios.get(
        "/products/banner/"
    );

    return response.data;
};

export const createBanner = async (formData) => {

    const response = await axios.post(
        "/products/banners/create/",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
    );

    return response.data;
};

export const updateBanner = async (id, formData) => {

    const response = await axios.put(
        `/products/banners/${id}/update/`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
    );

    return response.data;
};

export const deleteBanner = async (id) => {

    const response = await axios.delete(
        `/products/banners/${id}/delete/`
    );

    return response.data;
};