import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./Components/Home";
import "./index.css";
import "./App.css";
import Protein from "./Components/Protein";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Gainers from "./Components/Gainers";
import PrePostWorkouts from "./Components/PrePostWorkouts";
import Vitamins from "./Components/Vitamins";
import ActiveWear from "./Components/ActiveWear";
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

const router = createBrowserRouter([
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <AddProduct /> },
      // { path: "orders", element: <OrdersList /> },
      // { path: "products", element: <ProductsList /> },
      { path: "products/add", element: <AddProduct /> },
      // { path: "products/edit", element: <EditProducts /> },
      // { path: "users", element: <UsersList /> },
      // { path: "settings", element: <Settings /> },
    ],
  },
  {
    path: "/",
    element: <Home />,
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
    path: "/PrePostWorkouts",
    element: <PrePostWorkouts />,
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
    path: "/Proteins/BuyProduct",
    element: <BuyProduct />,
  },
  {
    path: "/Contact",
    element: <Contact />,
  },
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
