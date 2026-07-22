import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Products from "../pages/Products";
import Orders from "../pages/Orders";
import Customers from "../pages/Customers";
import Chat from "../pages/Chat";
import Settings from "../pages/Settings";
export default function AppRoutes(){

    return(

        <Routes>


            <Route

                path="/login"

                element={<Login />}

            />


            <Route

                path="/dashboard"

                element={<Dashboard />}

            />


            <Route

                path="*"

                element={<Navigate to="/login" />}

            />
            <Route

                path="/products"

                  element={<Products />}

                       />

            <Route path="/orders" element={<Orders />} />
            <Route path="/customers" element={<Customers />} />
            <Route
                   path="/chat"
                  element={<Chat />}
           />
           <Route
               path="/settings"
                element={<Settings />}
             />
        </Routes>

    );

}