import { useEffect, useState } from "react";
import {
  CreditCard,
  ShieldCheck,
  Trash2,
  Plus,
  Loader2,
} from "lucide-react";

import {
  getSavedCards,
  deleteSavedCard,
} from "../services/paymentService";

import MainLayout from "../layouts/MainLayout";

export default function SavedCards() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  // ==========================
  // LOAD SAVED CARDS
  // ==========================

  const loadCards = async () => {
    try {
      setLoading(true);

      const response = await getSavedCards();

      setCards(response.data || []);
    } catch (error) {
      console.log("GET SAVED CARD ERROR:", error);
      setCards([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCards();
  }, []);

  // ==========================
  // DELETE CARD
  // ==========================

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this card?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(id);

      await deleteSavedCard(id);

      setCards((prevCards) =>
        prevCards.filter((card) => card.id !== id)
      );
    } catch (error) {
      console.log("DELETE SAVED CARD ERROR:", error);

      alert("Unable to remove card");
    } finally {
      setDeletingId(null);
    }
  };

  // ==========================
  // LOADING
  // ==========================

  if (loading) {
    return (
      <MainLayout>
        <div className="min-h-[70vh] flex items-center justify-center">
          <div className="text-center">
            <Loader2
              size={34}
              className="animate-spin text-blue-600 mx-auto"
            />

            <p className="text-gray-500 mt-3">
              Loading saved cards...
            </p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="bg-slate-50 min-h-[calc(100vh-80px)] py-10">
        <div className="max-w-5xl mx-auto px-4">

          {/* ==========================
              HEADER
          ========================== */}

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

            <div>
              <p className="text-sm text-blue-600 font-semibold uppercase tracking-wider">
                Payment
              </p>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
                Saved Cards
              </h1>

              <p className="text-gray-500 mt-2">
                Manage your saved payment methods securely.
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500 bg-white border border-gray-100 rounded-xl px-4 py-3 shadow-sm">
              <ShieldCheck
                size={18}
                className="text-green-600"
              />

              Secure payments
            </div>

          </div>

          {/* ==========================
              SAVED CARDS
          ========================== */}

          {cards.length === 0 ? (
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-10 md:p-16 text-center">

              <div className="w-20 h-20 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
                <CreditCard size={36} />
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mt-6">
                No saved cards
              </h2>

              <p className="text-gray-500 mt-2 max-w-md mx-auto">
                You haven't saved any payment cards yet.
                Your card can be saved securely during checkout.
              </p>

              <button
                type="button"
                className="mt-7 inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
              >
                <Plus size={18} />

                Add a Card
              </button>

            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {cards.map((card) => (
                <div
                  key={card.id}
                  className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
                >

                  {/* ==========================
                      CARD PREVIEW
                  ========================== */}

                  <div className="p-5">

                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-700 text-white p-6 min-h-[210px]">

                      {/* Decorative circle */}

                      <div className="absolute -right-12 -top-12 w-36 h-36 rounded-full bg-white/10" />

                      <div className="absolute -right-5 -bottom-16 w-32 h-32 rounded-full bg-white/10" />

                      {/* Top */}

                      <div className="relative flex justify-between items-start">

                        <div>
                          <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                            Saved Card
                          </p>

                          <p className="font-semibold mt-1">
                            {card.brand
                              ? card.brand.toUpperCase()
                              : "CARD"}
                          </p>
                        </div>

                        <CreditCard size={28} />
                      </div>

                      {/* Chip */}

                      <div className="relative mt-8">
                        <div className="w-11 h-8 rounded-md bg-yellow-200/80" />
                      </div>

                      {/* Card Number */}

                      <p className="relative mt-6 text-xl tracking-[0.18em] font-medium">
                        •••• •••• •••• {card.last4}
                      </p>

                      {/* Bottom */}

                      <div className="relative flex justify-between items-end mt-6">

                        <div>
                          <p className="text-[10px] uppercase text-white/60">
                            Card
                          </p>

                          <p className="text-sm font-medium">
                            {card.brand
                              ? card.brand.toUpperCase()
                              : "Payment Card"}
                          </p>
                        </div>

                        <div>
                          <p className="text-[10px] uppercase text-white/60">
                            Expires
                          </p>

                          <p className="text-sm font-medium">
                            {String(card.exp_month).padStart(2, "0")}/
                            {String(card.exp_year).slice(-2)}
                          </p>
                        </div>

                      </div>

                    </div>

                  </div>

                  {/* ==========================
                      CARD INFO
                  ========================== */}

                  <div className="px-5 pb-5">

                    <div className="flex items-center justify-between border-t border-gray-100 pt-4">

                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wide">
                          Payment Method
                        </p>

                        <p className="font-semibold text-gray-800 mt-1">
                          {card.brand
                            ? card.brand.toUpperCase()
                            : "Card"}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleDelete(card.id)}
                        disabled={deletingId === card.id}
                        className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-100 transition disabled:opacity-50"
                        title="Remove card"
                      >
                        {deletingId === card.id ? (
                          <Loader2
                            size={18}
                            className="animate-spin"
                          />
                        ) : (
                          <Trash2 size={18} />
                        )}
                      </button>

                    </div>

                    <div className="flex items-center gap-2 mt-4 text-xs text-gray-400">
                      <ShieldCheck
                        size={15}
                        className="text-green-600"
                      />

                      Your card details are securely stored.
                    </div>

                  </div>

                </div>
              ))}

            </div>
          )}

        </div>
      </div>
    </MainLayout>
  );
}