import api from "../api/axios";


// Payment Intent
export const createPaymentIntent = async (data) => {

    const response = await api.post(
        "/payments/create-payment-intent/",
        data
    );

    return response.data;

};



// Payment list
export const getPayments = async () => {

    const response = await api.get(
        "/payments/list/"
    );

    return response.data;

};



// Stripe Customer create
export const createStripeCustomer = async () => {

    const response = await api.post(
        "/payments/create-customer/"
    );

    return response.data;

};



// Save Card Setup Intent
export const createSetupIntent = async () => {

    const response = await api.post(
        "/payments/create-setup-intent/"
    );

    return response.data;

};

export const saveCard = async (data) => {

    const response = await api.post(
        "/payments/save-card/",
        data
    );

    return response.data;

};