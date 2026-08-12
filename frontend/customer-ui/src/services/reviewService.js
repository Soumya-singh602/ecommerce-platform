import api from "../api/axios";

// ============================================================
// GET PRODUCT REVIEWS
// ============================================================

export const getProductReviews = async (productId) => {
  const response = await api.get(
    `/products/${productId}/reviews/`
  );

  return response.data;
};

// ============================================================
// ADD PRODUCT REVIEW
// ============================================================

export const addProductReview = async (productId, data) => {
  const response = await api.post(
    `/products/${productId}/reviews/`,
    data
  );

  return response.data;
};

// ============================================================
// UPDATE PRODUCT REVIEW
// ============================================================

export const updateProductReview = async (reviewId, data) => {
  const response = await api.put(
    `/products/reviews/${reviewId}/`,
    data
  );

  return response.data;
};

// ============================================================
// DELETE PRODUCT REVIEW
// ============================================================

export const deleteProductReview = async (reviewId) => {
  const response = await api.delete(
    `/products/reviews/${reviewId}/`
  );

  return response.data;
};