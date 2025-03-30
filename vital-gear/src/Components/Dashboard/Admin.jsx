import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import Basics from "../Basics";
import Header from "../Header";

const AdminLayout = () => {
  return (
    <>
      <Header />
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-6">
            <Outlet />
          </div>
        </div>
      </div>
      <Basics />
    </>
  );
};

export default AdminLayout;
