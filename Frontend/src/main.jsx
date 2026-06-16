import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import { AuthProvider } from "./customer/context/AuthContext";

import App from "./App.jsx";
import AppSeler from "./AppSeler.jsx";

// Customer Pages
import Home from "./customer/pages/Home.jsx";
import Explore from "./customer/pages/Explore.jsx";
import Login from "./customer/pages/Login.jsx";
import Signup from "./customer/pages/Signup.jsx";
import Payment from "./customer/pages/payment.jsx";
import { ShopProvider } from "./customer/context/useShop";
import ProductDetail from "./customer/pages/ProductDetail.jsx";
import Wishlist from "./customer/pages/Wishlist.jsx";
import CustProfile from "./customer/pages/Profile.jsx";
import Cart from "./customer/pages/Cart.jsx";

// // Seller Layout
// import SellerLayout from "./seller/components/layout/Layout.jsx";

// Seller Pages
import Dashboard from "./seller/pages/Dashboard.jsx";
import Products from "./seller/pages/Products.jsx";
import CreateProfile from "./seller/pages/CreateProfile.jsx";
import Orders from "./seller/pages/OrdersDashboard.jsx";
import Customers from "./seller/pages/CustomerPage.jsx";
import SellerProfile from "./seller/pages/Profile.jsx";
import Settings from "./seller/pages/Settings.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "explore",
        element: <Explore />,
      },
      {
        path: "explore/:gender",
        element: <Explore />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "wishlist",
        element: <Wishlist />,
      },
      {
        path: "profile",
        element: <CustProfile />,
      },
      {
        path: "product/:id",
        element: <ProductDetail />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "payment",
        element: <Payment />,
      },
    ],
  },

  // Seller Routes
  {
    path: "/seller",
    element: <AppSeler />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "create-profile",
        element: <CreateProfile />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "customers",
        element: <Customers />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "profile",
        element: <SellerProfile />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ShopProvider>
        <RouterProvider router={router} />
      </ShopProvider>
    </AuthProvider>
  </StrictMode>,
);
