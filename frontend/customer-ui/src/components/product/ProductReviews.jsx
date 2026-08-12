
import { useEffect, useState } from "react";
import { Star, Trash2, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  getProductReviews,
  addProductReview,
  updateProductReview,
  deleteProductReview,
} from "../../services/reviewService";

export default function ProductReviews({ productId }) {
  const navigate = useNavigate();

  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [editingReview, setEditingReview] = useState(null);

  // ============================================================
  // FETCH REVIEWS
  // ============================================================

  useEffect(() => {
    if (productId) {
      fetchReviews();
    }
  }, [productId]);

  const fetchReviews = async () => {
    try {
      setLoading(true);

      const response = await getProductReviews(productId);

      console.log("========== REVIEW RESPONSE ==========");
      console.log("FULL RESPONSE:", response);
      console.log("RESPONSE DATA:", response?.data);
      console.log("=====================================");

      /*
       * Axios can return:
       *
       * response.data = {
       *   status,
       *   message,
       *   data: {
       *      reviews: [...]
       *   }
       * }
       *
       * OR reviewService may already return response.data.
       *
       * Handle both cases.
       */

      const responseData = response?.data ?? response ?? {};

      const data =
        responseData?.data ??
        responseData ??
        {};

      console.log("FINAL REVIEW DATA:", data);
      console.log("REVIEWS:", data?.reviews);

      setReviews(
        Array.isArray(data?.reviews)
          ? data.reviews
          : []
      );

      setAverageRating(
        Number(data?.average_rating ?? 0)
      );

      setTotalReviews(
        Number(data?.total_reviews ?? 0)
      );
    } catch (error) {
      console.error("REVIEWS ERROR:", error);

      console.error(
        "REVIEWS ERROR RESPONSE:",
        error?.response?.data
      );

      setReviews([]);
      setAverageRating(0);
      setTotalReviews(0);
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // SUBMIT / UPDATE REVIEW
  // ============================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("access");

    console.log(
      "REVIEW TOKEN EXISTS:",
      !!token
    );

    if (!token) {
      navigate("/login");
      return;
    }

    if (!rating) {
      alert("Please select a rating.");
      return;
    }

    if (!comment.trim()) {
      alert("Please write a review.");
      return;
    }

    try {
      setSubmitting(true);

      if (editingReview) {
        await updateProductReview(
          editingReview.id,
          {
            rating,
            comment: comment.trim(),
          }
        );
      } else {
        await addProductReview(
          productId,
          {
            rating,
            comment: comment.trim(),
          }
        );
      }

      /*
       * Clear form
       */

      setRating(0);
      setComment("");
      setEditingReview(null);

      /*
       * Fetch latest reviews from backend.
       */

      await fetchReviews();

      alert(
        editingReview
          ? "Review updated successfully."
          : "Review submitted successfully."
      );
    } catch (error) {
      console.error(
        "REVIEW SUBMIT ERROR:",
        error
      );

      console.log(
        "REVIEW STATUS:",
        error?.response?.status
      );

      console.log(
        "REVIEW RESPONSE:",
        error?.response?.data
      );

      alert(
        error?.response?.data?.message ||
          error?.response?.data?.detail ||
          "Unable to submit review."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // ============================================================
  // EDIT REVIEW
  // ============================================================

  const handleEdit = (review) => {
    setEditingReview(review);

    setRating(
      Number(review.rating) || 0
    );

    setComment(
      review.comment || ""
    );

    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  // ============================================================
  // DELETE REVIEW
  // ============================================================

  const handleDelete = async (reviewId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this review?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteProductReview(reviewId);

      await fetchReviews();

      alert("Review deleted successfully.");
    } catch (error) {
      console.error(
        "DELETE REVIEW ERROR:",
        error
      );

      console.log(
        "DELETE STATUS:",
        error?.response?.status
      );

      console.log(
        "DELETE RESPONSE:",
        error?.response?.data
      );

      alert(
        error?.response?.data?.message ||
          error?.response?.data?.detail ||
          "Unable to delete review."
      );
    }
  };

  // ============================================================
  // CANCEL EDIT
  // ============================================================

  const handleCancelEdit = () => {
    setEditingReview(null);
    setRating(0);
    setComment("");
  };

  // ============================================================
  // RENDER STARS
  // ============================================================

  const renderStars = (
    value,
    interactive = false
  ) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map(
          (star) => (
            <button
              key={star}
              type="button"
              onClick={
                interactive
                  ? () =>
                      setRating(star)
                  : undefined
              }
              disabled={!interactive}
              className={
                interactive
                  ? "transition hover:scale-110"
                  : "cursor-default"
              }
            >
              <Star
                size={
                  interactive
                    ? 24
                    : 17
                }
                className={
                  star <= value
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-slate-300"
                }
              />
            </button>
          )
        )}
      </div>
    );
  };

  // ============================================================
  // UI
  // ============================================================

  return (
    <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

      {/* ======================================================
          HEADER
      ====================================================== */}

      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <div className="flex items-center gap-3">

            <div className="h-8 w-1 rounded-full bg-blue-600" />

            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
              Customer Reviews
            </h2>

          </div>

          <p className="mt-2 text-sm text-slate-500">
            See what customers think about this product.
          </p>
        </div>

        {/* RATING SUMMARY */}

        <div className="flex items-center gap-4 rounded-2xl bg-slate-50 px-5 py-4">

          <div className="text-center">

            <p className="text-3xl font-bold text-slate-900">
              {averageRating.toFixed(1)}
            </p>

            <div className="mt-1">
              {renderStars(
                Math.round(
                  averageRating
                )
              )}
            </div>

            <p className="mt-1 text-xs text-slate-500">
              {totalReviews} review
              {totalReviews !== 1
                ? "s"
                : ""}
            </p>

          </div>

        </div>

      </div>

      {/* ======================================================
          REVIEWS
      ====================================================== */}

      <div className="mt-8">

        {loading ? (

          <div className="space-y-4">

            {[1, 2, 3].map(
              (item) => (
                <div
                  key={item}
                  className="h-28 animate-pulse rounded-2xl bg-slate-100"
                />
              )
            )}

          </div>

        ) : reviews.length === 0 ? (

          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">

            <p className="font-semibold text-slate-700">
              No reviews yet
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Be the first customer to review this product.
            </p>

          </div>

        ) : (

          <div className="space-y-4">

            {reviews.map(
              (review) => (

                <div
                  key={review.id}
                  className="rounded-2xl border border-slate-200 p-5"
                >

                  <div className="flex items-start justify-between gap-4">

                    <div>

                      <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
                          U
                        </div>

                        <div>

                          <p className="text-sm font-semibold text-slate-900">
                            Customer
                          </p>

                          <p className="text-xs text-slate-400">
                            {review.created_at
                              ? new Date(
                                  review.created_at
                                ).toLocaleDateString()
                              : ""}
                          </p>

                        </div>

                      </div>

                      <div className="mt-3">
                        {renderStars(
                          Number(
                            review.rating
                          ) || 0
                        )}
                      </div>

                    </div>

                    <div className="flex items-center gap-1">

                      <button
                        type="button"
                        onClick={() =>
                          handleEdit(
                            review
                          )
                        }
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-blue-50 hover:text-blue-600"
                        title="Edit review"
                      >
                        <Pencil
                          size={16}
                        />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(
                            review.id
                          )
                        }
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                        title="Delete review"
                      >
                        <Trash2
                          size={16}
                        />
                      </button>

                    </div>

                  </div>

                  <p className="mt-4 text-sm leading-6 text-slate-600">
                    {review.comment}
                  </p>

                </div>

              )
            )}

          </div>

        )}

      </div>

      {/* ======================================================
          WRITE REVIEW
      ====================================================== */}

      <div className="mt-8 border-t border-slate-200 pt-8">

        <h3 className="text-lg font-bold text-slate-900">
          {editingReview
            ? "Edit your review"
            : "Write a review"}
        </h3>

        <form
          onSubmit={handleSubmit}
          className="mt-5"
        >

          {/* RATING */}

          <div>

            <p className="text-sm font-medium text-slate-700">
              Your rating
            </p>

            <div className="mt-2">
              {renderStars(
                rating,
                true
              )}
            </div>

          </div>

          {/* COMMENT */}

          <div className="mt-5">

            <label className="text-sm font-medium text-slate-700">
              Your review
            </label>

            <textarea
              value={comment}
              onChange={(e) =>
                setComment(
                  e.target.value
                )
              }
              rows={4}
              placeholder="Share your experience with this product..."
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
            />

          </div>

          {/* BUTTONS */}

          <div className="mt-4 flex items-center gap-3">

            <button
              type="submit"
              disabled={submitting}
              className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting
                ? "Submitting..."
                : editingReview
                ? "Update Review"
                : "Submit Review"}
            </button>

            {editingReview && (
              <button
                type="button"
                onClick={
                  handleCancelEdit
                }
                className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                Cancel
              </button>
            )}

          </div>

        </form>

      </div>

    </section>
  );
}