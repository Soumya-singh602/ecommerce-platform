import api from "../api/axios";

export const createPaymentIntent = async (data) => {
  const response = await api.post(
    "/payments/create-payment-intent/",
    data
  );

  return response.data;
};

export const getPayments = async () => {
  const response = await api.get("/payments/");

  return response.data;
};