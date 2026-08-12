import api from "../api/axios";

// ============================================================
// ADD TO WISHLIST
// ============================================================

export const addToWishlist = async (productId) => {
  const response = await api.post(
    "/users/wishlist/add/",
    {
      product_id: productId,
    }
  );

  return response.data;
};


// ============================================================
// GET MY WISHLIST
// ============================================================

export const getWishlist = async () => {
  const response = await api.get(
    "/users/wishlist/"
  );

  return response.data;
};


// ============================================================
// REMOVE FROM WISHLIST
// ============================================================

export const removeFromWishlist = async (productId) => {
  const response = await api.delete(
    `/users/wishlist/remove/${productId}/`
  );

  return response.data;
};


// ============================================================
// CHECK WISHLIST
// ============================================================

export const checkWishlist = async (productId) => {
  const response = await api.get(
    `/users/wishlist/check/${productId}/`
  );

  return response.data;
};