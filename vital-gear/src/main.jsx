import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./Components/Home";
import "./index.css";
import "./App.css";
import Protein from "./Components/Categories/Protein";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Gainers from "./Components/Categories/Gainers";
import Vitamins from "./Components/Categories/Vitamins";
import PreWorkouts from "./Components/Categories/PreWorkouts";
import PostWorkouts from "./Components/Categories/PostWorkouts";
import ActiveWear from "./Components/Categories/ActiveWear";
import { ModalProvider } from "./ModalContext";
import BuyProduct from "./Components/BuyProduct";
import Contact from "./Components/Contact";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import Basics from "./Components/Basics";
import AddProduct from "./Components/Dashboard/AddProduct";
import AdminLayout from "./Components/Dashboard/Admin";
import Dashboard from "./Components/Dashboard/Dashboard";
import ProductDashboard from "./Components/Dashboard/AdminProducts";
import EditProduct from "./Components/Dashboard/EditProduct";
import UserProfile from "./Components/User Dashboard/UserProfile";
import AdminOrders from "./Components/Dashboard/AdminOrders";
import AdminOrderDetails from "./Components/Dashboard/AdminOrderDetails";
import Checkout from "./Components/Checkout";

const router = createBrowserRouter([
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "orders", element: <AdminOrders/>},
      { path: "orders/details/:orderId", element: <AdminOrderDetails/>},
      { path: "products", element: <ProductDashboard /> },
      { path: "products/add", element: <AddProduct /> },
      { path: "products/edit/:id", element: <EditProduct /> },
      // { path: "users", element: <UsersList /> },
      // { path: "settings", element: <Settings /> },
    ],
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <SignIn/>
  },
  {
    path: "/Proteins",
    element: <Protein />,
  },
  {
    path: "/Gainers",
    element: <Gainers />,
  },
  {
    path: "/PreWorkouts",
    element: <PreWorkouts />,
  },
  {
    path: "/checkout",
    element: <Checkout/>
  },
  {
    path: "/PostWorkouts",
    element: <PostWorkouts />,
  },
  {
    path: "/Vitamins",
    element: <Vitamins />,
  },
  {
    path: "/ActiveWear",
    element: <ActiveWear />,
  },
  {
    path: "/Products/:productId",
    element: <BuyProduct />,
  },
  {
    path: "/Contact",
    element: <Contact />,
  },
  {
    path: "/User",
    element: <UserProfile />,
  }
  // {
  //   path: "/Dashboard",
  //   element: <AddProduct />,
  // },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ModalProvider>
      <RouterProvider router={router} />
    </ModalProvider>
  </React.StrictMode>
);
