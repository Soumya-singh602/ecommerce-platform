import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";

import {
  CreditCard,
  ShieldCheck,
  Trash2,
  Wallet,
  Smartphone,
  Lock,
} from "lucide-react";

import { deleteSavedCard } from "../../services/paymentService";

export default function PaymentMethod({
  paymentType,
  setPaymentType,
  savedCards,
  setSavedCards,
  selectedCard,
  setSelectedCard,
  loadingCards,
}) {
  const handleDeleteCard = async (cardId) => {
    try {
      const response = await deleteSavedCard(cardId);

      console.log("DELETE CARD RESPONSE:", response);

      if (response?.success) {
        setSavedCards((prev) =>
          prev.filter((card) => card.id !== cardId)
        );

        if (selectedCard?.id === cardId) {
          setSelectedCard(null);
          setPaymentType("new-card");
        }
      }
    } catch (error) {
      console.log("DELETE CARD ERROR:", error);
    }
  };

  const paymentOptionClass = (active) => `
    group
    flex
    items-center
    gap-4
    rounded-xl
    border
    p-4
    cursor-pointer
    transition-all
    duration-200
    ${
      active
        ? "border-blue-500 bg-blue-50 ring-2 ring-blue-500/10"
        : "border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50"
    }
  `;

  return (
    <div className="space-y-6">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="flex items-center gap-4">
        <div
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            bg-blue-50
            text-blue-600
          "
        >
          <CreditCard size={21} />
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Payment Method
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Choose your preferred payment option
          </p>
        </div>
      </div>

      {/* =====================================================
          SAVED CARDS
      ===================================================== */}

      {loadingCards ? (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
          <div className="flex items-center gap-3">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />

            <p className="text-sm font-medium text-slate-500">
              Loading your saved cards...
            </p>
          </div>
        </div>
      ) : savedCards && savedCards.length > 0 ? (
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
              Saved Cards
            </h3>

            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
              {savedCards.length}{" "}
              {savedCards.length === 1 ? "Card" : "Cards"}
            </span>
          </div>

          <div className="space-y-3">
            {savedCards.map((card) => {
              const active =
                paymentType === "saved" &&
                selectedCard?.id === card.id;

              return (
                <div
                  key={card.id}
                  className={`
                    relative
                    rounded-xl
                    border
                    p-4
                    transition-all
                    duration-200
                    ${
                      active
                        ? "border-blue-500 bg-blue-50 ring-2 ring-blue-500/10"
                        : "border-slate-200 bg-white hover:border-blue-300"
                    }
                  `}
                >
                  <div className="flex items-center justify-between gap-4">
                    {/* CARD SELECT */}

                    <div
                      className="flex min-w-0 flex-1 items-center gap-3 cursor-pointer"
                      onClick={() => {
                        setSelectedCard(card);
                        setPaymentType("saved");
                      }}
                    >
                      <input
                        type="radio"
                        name="payment"
                        checked={active}
                        onChange={() => {}}
                        className="
                          h-4
                          w-4
                          accent-blue-600
                        "
                      />

                      {/* CARD ICON */}

                      <div
                        className={`
                          flex
                          h-10
                          w-10
                          flex-shrink-0
                          items-center
                          justify-center
                          rounded-lg
                          ${
                            active
                              ? "bg-blue-600 text-white"
                              : "bg-slate-100 text-slate-500"
                          }
                        `}
                      >
                        <CreditCard size={19} />
                      </div>

                      {/* CARD INFO */}

                      <div className="min-w-0">
                        <p className="font-semibold capitalize text-slate-900">
                          {card.brand}{" "}
                          <span className="text-slate-500">
                            •••• {card.last4}
                          </span>
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          Expires{" "}
                          {String(card.exp_month).padStart(
                            2,
                            "0"
                          )}
                          /{card.exp_year}
                        </p>
                      </div>
                    </div>

                    {/* ACTIONS */}

                    <div className="flex flex-shrink-0 items-center gap-2">
                      {card.is_default && (
                        <span
                          className="
                            hidden
                            sm:inline-flex
                            rounded-full
                            bg-blue-100
                            px-2.5
                            py-1
                            text-[11px]
                            font-bold
                            text-blue-700
                          "
                        >
                          Default
                        </span>
                      )}

                      <button
                        type="button"
                        onClick={() =>
                          handleDeleteCard(card.id)
                        }
                        className="
                          flex
                          h-9
                          w-9
                          items-center
                          justify-center
                          rounded-lg
                          text-slate-400
                          transition
                          hover:bg-red-50
                          hover:text-red-600
                        "
                        title="Delete card"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div
          className="
            rounded-xl
            border
            border-dashed
            border-slate-300
            bg-slate-50
            p-5
          "
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-200 text-slate-500">
              <CreditCard size={19} />
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-700">
                No saved cards
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Add a card below for faster checkout.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          NEW CARD
      ===================================================== */}

      <div>
        <div
          className={paymentOptionClass(
            paymentType === "new-card"
          )}
          onClick={() => {
            setSelectedCard(null);
            setPaymentType("new-card");
          }}
        >
          <input
            type="radio"
            name="payment"
            checked={paymentType === "new-card"}
            onChange={() => {}}
            className="h-4 w-4 accent-blue-600"
          />

          <div
            className={`
              flex
              h-10
              w-10
              flex-shrink-0
              items-center
              justify-center
              rounded-lg
              ${
                paymentType === "new-card"
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 text-slate-500"
              }
            `}
          >
            <CreditCard size={19} />
          </div>

          <div>
            <p className="font-semibold text-slate-900">
              Use a new card
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Pay securely with your debit or credit card
            </p>
          </div>
        </div>

        {/* CARD FIELDS */}

        {paymentType === "new-card" && (
          <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50/40 p-5">
            <div className="space-y-4">
              {/* CARD NUMBER */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Card Number
                </label>

                <div
                  className="
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    px-4
                    py-3.5
                    transition
                    focus-within:border-blue-500
                    focus-within:ring-4
                    focus-within:ring-blue-500/10
                  "
                >
                  <CardNumberElement
                    options={{
                      style: {
                        base: {
                          fontSize: "15px",
                          color: "#0f172a",
                          "::placeholder": {
                            color: "#94a3b8",
                          },
                        },
                      },
                    }}
                  />
                </div>
              </div>

              {/* EXPIRY + CVC */}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Expiry Date
                  </label>

                  <div
                    className="
                      rounded-xl
                      border
                      border-slate-200
                      bg-white
                      px-4
                      py-3.5
                      transition
                      focus-within:border-blue-500
                      focus-within:ring-4
                      focus-within:ring-blue-500/10
                    "
                  >
                    <CardExpiryElement
                      options={{
                        style: {
                          base: {
                            fontSize: "15px",
                            color: "#0f172a",
                            "::placeholder": {
                              color: "#94a3b8",
                            },
                          },
                        },
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    CVC
                  </label>

                  <div
                    className="
                      rounded-xl
                      border
                      border-slate-200
                      bg-white
                      px-4
                      py-3.5
                      transition
                      focus-within:border-blue-500
                      focus-within:ring-4
                      focus-within:ring-blue-500/10
                    "
                  >
                    <CardCvcElement
                      options={{
                        style: {
                          base: {
                            fontSize: "15px",
                            color: "#0f172a",
                            "::placeholder": {
                              color: "#94a3b8",
                            },
                          },
                        },
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* SAVE CARD INFO */}

              <div className="flex items-start gap-3 rounded-lg bg-white border border-blue-100 p-3">
                <ShieldCheck
                  size={18}
                  className="mt-0.5 flex-shrink-0 text-blue-600"
                />

                <p className="text-xs leading-5 text-slate-600">
                  Your card details are securely processed.
                  After successful payment, this card can be
                  saved for faster future checkout.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* =====================================================
          COD
      ===================================================== */}

      <div
        className={paymentOptionClass(
          paymentType === "cod"
        )}
        onClick={() => {
          setSelectedCard(null);
          setPaymentType("cod");
        }}
      >
        <input
          type="radio"
          name="payment"
          checked={paymentType === "cod"}
          onChange={() => {}}
          className="h-4 w-4 accent-blue-600"
        />

        <div
          className={`
            flex
            h-10
            w-10
            flex-shrink-0
            items-center
            justify-center
            rounded-lg
            ${
              paymentType === "cod"
                ? "bg-blue-600 text-white"
                : "bg-slate-100 text-slate-500"
            }
          `}
        >
          <Wallet size={19} />
        </div>

        <div>
          <p className="font-semibold text-slate-900">
            Cash on Delivery
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Pay when your order is delivered
          </p>
        </div>
      </div>

      {/* =====================================================
          UPI
      ===================================================== */}

      <div
        className={paymentOptionClass(
          paymentType === "upi"
        )}
        onClick={() => {
          setSelectedCard(null);
          setPaymentType("upi");
        }}
      >
        <input
          type="radio"
          name="payment"
          checked={paymentType === "upi"}
          onChange={() => {}}
          className="h-4 w-4 accent-blue-600"
        />

        <div
          className={`
            flex
            h-10
            w-10
            flex-shrink-0
            items-center
            justify-center
            rounded-lg
            ${
              paymentType === "upi"
                ? "bg-blue-600 text-white"
                : "bg-slate-100 text-slate-500"
            }
          `}
        >
          <Smartphone size={19} />
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2">
            <p className="font-semibold text-slate-900">
              UPI Payment
            </p>

            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-500">
              Coming Soon
            </span>
          </div>

          <p className="mt-1 text-xs text-slate-500">
            Pay using your preferred UPI app
          </p>
        </div>
      </div>

      {/* =====================================================
          SECURITY FOOTER
      ===================================================== */}

      <div className="flex items-center justify-center gap-2 pt-1 text-xs text-slate-400">
        <Lock size={13} />

        <span>Secure and encrypted payment</span>
      </div>
    </div>
  );
}