import { Routes, Route } from "react-router-dom";


import Home from "../pages/Home";
import Shop from "../pages/Shop";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";


import Login from "../pages/Login";
import Register from "../pages/Register";


import MyOrders from "../pages/MyOrders";
import OrderDetails from "../pages/OrderDetails";


import Chat from "../pages/Chat";
import Profile from "../pages/Profile";


import AddCard from "../pages/AddCard";
import SavedCards from "../pages/SavedCards";


import Contact from "../pages/Contact";
import ShippingPolicy from "../pages/ShippingPolicy";
import ReturnPolicy from "../pages/ReturnPolicy";
import PrivacyPolicy from "../pages/PrivacyPolicy";


// Wishlist
import Wishlist from "../pages/Wishlist";


import ProtectedRoute from "../components/auth/ProtectedRoute";


export default function AppRoutes() {

  return (

    <Routes>


      {/* =====================================================
          PUBLIC
      ===================================================== */}


      <Route
        path="/"
        element={<Home />}
      />


      <Route
        path="/shop"
        element={<Shop />}
      />


      <Route
        path="/product/:id"
        element={<ProductDetails />}
      />


      <Route
        path="/login"
        element={<Login />}
      />


      <Route
        path="/register"
        element={<Register />}
      />


      <Route
        path="/cart"
        element={<Cart />}
      />


      {/* =====================================================
          FOOTER PAGES
      ===================================================== */}


      <Route
        path="/contact"
        element={<Contact />}
      />


      <Route
        path="/shipping-policy"
        element={<ShippingPolicy />}
      />


      <Route
        path="/return-policy"
        element={<ReturnPolicy />}
      />


      <Route
        path="/privacy-policy"
        element={<PrivacyPolicy />}
      />


      {/* =====================================================
          PROTECTED
      ===================================================== */}


      <Route
        path="/wishlist"
        element={
          <ProtectedRoute>
            <Wishlist />
          </ProtectedRoute>
        }
      />


      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }
      />


      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <MyOrders />
          </ProtectedRoute>
        }
      />


      <Route
        path="/orders/:id"
        element={
          <ProtectedRoute>
            <OrderDetails />
          </ProtectedRoute>
        }
      />


      <Route
        path="/chat"
        element={
          <ProtectedRoute>
            <Chat />
          </ProtectedRoute>
        }
      />


      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />


      <Route
        path="/add-card"
        element={
          <ProtectedRoute>
            <AddCard />
          </ProtectedRoute>
        }
      />


      <Route
        path="/saved-cards"
        element={
          <ProtectedRoute>
            <SavedCards />
          </ProtectedRoute>
        }
      />


    </Routes>

  );

}