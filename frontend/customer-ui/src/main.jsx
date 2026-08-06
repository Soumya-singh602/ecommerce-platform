import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/CartContext";

import { Elements } from "@stripe/react-stripe-js";
import stripePromise from "./config/stripe";

import "./index.css";
import App from "./App";

ReactDOM.createRoot(
    document.getElementById("root")
).render(
    <BrowserRouter>
        <Elements stripe={stripePromise}>
            <CartProvider>
                <App />
            </CartProvider>
        </Elements>
    </BrowserRouter>
);