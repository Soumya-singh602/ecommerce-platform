import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Products from "../pages/Products";
import Orders from "../pages/Orders";
import Customers from "../pages/Customers";
import Chat from "../pages/Chat";
import Settings from "../pages/Settings";

import ProtectedRoute from "./ProtectedRoute";
import ProductDetail from "../pages/ProductDetail";

export default function AppRoutes() {

    return (

        <Routes>

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/products"
                element={
                    <ProtectedRoute>
                        <Products />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/orders"
                element={
                    <ProtectedRoute>
                        <Orders />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/customers"
                element={
                    <ProtectedRoute>
                        <Customers />
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
                path="/settings"
                element={
                    <ProtectedRoute>
                        <Settings />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/"
                element={<Navigate to="/dashboard" replace />}
            />

            <Route
                path="*"
                element={<Navigate to="/dashboard" replace />}
            />

            <Route
               path="/products/:id"element={<ProtectedRoute><ProductDetail /></ProtectedRoute>}/>
        </Routes>

    );

}