import api from "./axios";

export const loginUser = async (email, password) => {
    const response = await api.post("/users/login/", {
        email,
        password,
    });

    return response.data;
};

export const changePassword = async (old_password, new_password) => {
    const response = await api.put("/users/change-password/", {
        old_password,
        new_password,
    });

    return response.data;
};

export const getUserProfile = async () => {
    const response = await api.get("/users/profile/");
    return response.data;
};

export const updateUserProfile = async (data) => {
    const response = await api.put("/users/profile/update/", data);
    return response.data;
};