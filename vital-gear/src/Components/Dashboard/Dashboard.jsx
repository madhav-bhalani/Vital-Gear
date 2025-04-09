import React, { useState } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  // Sample data - in a real application, this would come from your API
  const [stats] = useState({
    totalSales: 182650,
    totalOrders: 312,
    pendingOrders: 24,
    totalProducts: 86,
    lowStockProducts: 9,
    totalUsers: 528,
    recentSales: [
      {
        id: "ORD-7851",
        customer: "Rahul Sharma",
        date: "1 Apr 2025",
        amount: 1240,
        status: "Delivered",
      },
      {
        id: "ORD-7850",
        customer: "Priya Singh",
        date: "1 Apr 2025",
        amount: 3600,
        status: "Processing",
      },
      {
        id: "ORD-7849",
        customer: "Amit Kumar",
        date: "31 Mar 2025",
        amount: 950,
        status: "Shipped",
      },
      {
        id: "ORD-7848",
        customer: "Neha Patel",
        date: "31 Mar 2025",
        amount: 2100,
        status: "Delivered",
      },
      {
        id: "ORD-7847",
        customer: "Vikram Joshi",
        date: "30 Mar 2025",
        amount: 1875,
        status: "Delivered",
      },
    ],
    topProducts: [
      {
        id: "PRD-1234",
        name: "Whey Protein Isolate",
        category: "protein",
        sold: 42,
        revenue: 33600,
      },
      {
        id: "PRD-8756",
        name: "Performance Pre-Workout",
        category: "pre-workout",
        sold: 38,
        revenue: 22800,
      },
      {
        id: "PRD-6524",
        name: "Fitness Compression T-shirt",
        category: "active-wear",
        sold: 35,
        revenue: 17500,
      },
      {
        id: "PRD-9078",
        name: "Mass Gainer Pro",
        category: "gainer",
        sold: 31,
        revenue: 24800,
      },
    ],
  });

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Dashboard Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#09274d]">
          Dashboard Overview
        </h1>
        <div className="text-sm text-gray-500">
          Last updated: 1 Apr 2025, 10:30 AM
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Sales Card */}
        {/* <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#09274d]">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Sales</p>
              <p className="text-2xl font-bold text-[#09274d]">{formatCurrency(stats.totalSales)}</p>
            </div>
            <div className="p-2 bg-[#dae0ef] rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#09274d]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="mt-2 text-sm text-green-600 font-medium">+8.2% from last month</div>
        </div> */}

        {/* Orders Card */}
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#395c87]">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Orders</p>
              <p className="text-2xl font-bold text-[#09274d]">
                {stats.totalOrders}
              </p>
            </div>
            <div className="p-2 bg-[#dae0ef] rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-[#395c87]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
          </div>
          <div className="mt-2 flex items-center">
            <span className="text-sm text-amber-600 font-medium">
              {stats.pendingOrders} pending orders
            </span>
            <Link
              to="/admin/orders"
              className="ml-2 text-sm text-[#395c87] hover:underline"
            >
              View all
            </Link>
          </div>
        </div>

        {/* Products Card */}
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#09274d]">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Total Products
              </p>
              <p className="text-2xl font-bold text-[#09274d]">
                {stats.totalProducts}
              </p>
            </div>
            <div className="p-2 bg-[#dae0ef] rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-[#09274d]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
          </div>
          <div className="mt-2 flex items-center">
            <span className="text-sm text-red-600 font-medium">
              {stats.lowStockProducts} low stock items
            </span>
            <Link
              to="/admin/products"
              className="ml-2 text-sm text-[#395c87] hover:underline"
            >
              View all
            </Link>
          </div>
        </div>

        {/* Users Card */}
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#395c87]">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Users</p>
              <p className="text-2xl font-bold text-[#09274d]">
                {stats.totalUsers}
              </p>
            </div>
            <div className="p-2 bg-[#dae0ef] rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-[#395c87]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
          </div>
          <div className="mt-2 text-sm text-green-600 font-medium">
            +12 new users this week
          </div>
        </div>
      </div>

      {/* Recent Orders and Top Products sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-[#09274d]">
              Recent Orders
            </h2>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-[#dae0ef]">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-[#09274d] uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-[#09274d] uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-[#09274d] uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-[#09274d] uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-[#09274d] uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {stats.recentSales.map((order, index) => (
                    <tr
                      key={order.id}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-[#395c87]">
                        {order.id}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                        {order.customer}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {order.date}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                        {formatCurrency(order.amount)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-800"
                              : order.status === "Shipped"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 text-center">
              <Link
                to="/admin/orders"
                className="text-sm text-[#395c87] hover:underline"
              >
                View all orders →
              </Link>
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-[#09274d]">
              Top Selling Products
            </h2>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-[#dae0ef]">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-[#09274d] uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-[#09274d] uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-[#09274d] uppercase tracking-wider">
                      Sold
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-[#09274d] uppercase tracking-wider">
                      Revenue
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {stats.topProducts.map((product, index) => (
                    <tr
                      key={product.id}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8 bg-[#dae0ef] rounded-md flex items-center justify-center">
                            <span className="text-xs font-medium text-[#09274d]">
                              {product.id.slice(-2)}
                            </span>
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-[#09274d]">
                              {product.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-[#dae0ef] text-[#09274d]">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                        {product.sold} units
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-700">
                        {formatCurrency(product.revenue)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 text-center">
              <Link
                to="/admin/products"
                className="text-sm text-[#395c87] hover:underline"
              >
                View all products →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-medium text-[#09274d] mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/admin/products/add"
            className="flex items-center p-4 bg-[#dae0ef] rounded-lg hover:bg-[#09274d] hover:text-white transition-colors group"
          >
            <div className="p-2 bg-white rounded-md mr-3 group-hover:bg-[#395c87]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-[#09274d] group-hover:text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
            <span className="text-sm font-medium">Add New Product</span>
          </Link>

          <Link
            to="/admin/orders"
            className="flex items-center p-4 bg-[#dae0ef] rounded-lg hover:bg-[#09274d] hover:text-white transition-colors group"
          >
            <div className="p-2 bg-white rounded-md mr-3 group-hover:bg-[#395c87]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-[#09274d] group-hover:text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <span className="text-sm font-medium">Manage Orders</span>
          </Link>

          <Link
            to="/admin/products/edit"
            className="flex items-center p-4 bg-[#dae0ef] rounded-lg hover:bg-[#09274d] hover:text-white transition-colors group"
          >
            <div className="p-2 bg-white rounded-md mr-3 group-hover:bg-[#395c87]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-[#09274d] group-hover:text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </div>
            <span className="text-sm font-medium">Update Inventory</span>
          </Link>

          {/* <Link
            to="/admin/settings"
            className="flex items-center p-4 bg-[#dae0ef] rounded-lg hover:bg-[#09274d] hover:text-white transition-colors group"
          >
            <div className="p-2 bg-white rounded-md mr-3 group-hover:bg-[#395c87]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-[#09274d] group-hover:text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <span className="text-sm font-medium">Store Settings</span>
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
