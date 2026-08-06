import axios from "../api/axios";


export const getProfile = async () => {

    const response = await axios.get(
        "/users/profile/"
    );

    return response.data;

};



export const updateProfile = async (data) => {

    const response = await axios.put(
        "/users/profile/update/",
        data
    );

    return response.data;

};