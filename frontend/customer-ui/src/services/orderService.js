import api from "../api/axios";


// CREATE ORDER
export const placeOrder = async (data) => {

  const response = await api.post(
    "/orders/create/",
    data
  );

  return response.data;

};



// GET MY ORDERS
export const getOrders = async () => {

  const response = await api.get(
    "/orders/"
  );

  return response.data;

};



// GET ORDER DETAIL
export const getOrderDetail = async (id) => {

  const response = await api.get(
    `/orders/${id}/`
  );

  return response.data;

};



// CANCEL ORDER
export const cancelOrder = async (id) => {

  const response = await api.put(
    `/orders/${id}/cancel/`
  );

  return response.data;

};