import React, { useEffect, useState } from "react";
import { Search, Eye, ArrowUpDown, Loader } from "lucide-react";
import { NavLink } from "react-router-dom";
import allOrders from "../../../controllers/Admin/allOrders"; // Adjust the import path as needed

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  // Order status filters
  const statusFilters = [
    { id: "all", name: "All Orders" },
    { id: "pending", name: "Pending" },
    { id: "processing", name: "Processing" },
    { id: "shipped", name: "Shipped" },
    { id: "delivered", name: "Delivered" },
    { id: "cancelled", name: "Cancelled" },
    { value: "in-transit", label: "In Transit"},
    { value: "out for delivery", label: "Out for Delivery"},
    { value: "placed", label: "Placed"}
  ];

  // Status options for dropdown
  const statusOptions = [
    { value: "pending", label: "Pending" },
    { value: "processing", label: "Processing" },
    { value: "shipped", label: "Shipped" },
    { value: "delivered", label: "Delivered" },
    { value: "cancelled", label: "Cancelled" },
    { value: "in-transit", label: "In Transit"},
    { value: "out for delivery", label: "Out for Delivery"},
    { value: "placed", label: "Placed"}
  ];

  // Handle search input
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    // You may want to implement debouncing here for better performance
  };

  // Handle status filter selection
  const handleStatusSelect = (statusId) => {
    setSelectedStatus(statusId);
    // TODO: Implement API call to filter by status if needed
  };

  // Handle sorting
  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
    // TODO: Implement sorting API call if needed
  };

  // Handle status update
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      setLoading(true);
      // TODO: Implement your API call to update order status
      // Example:
      // await updateOrderStatus(orderId, newStatus);

      // Update the local state after successful API call
      setOrders(
        orders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );

      // Show success message
      // Example:
      // showSuccessMessage(`Order status updated to ${newStatus}`);
    } catch (err) {
      // Handle error
      // Example:
      // showErrorMessage(err.message);
      console.error("Error updating order status:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch orders
  useEffect(() => {
    allOrders(setOrders, setLoading, setError);
    console.log("HG orders: ", orders);
  }, []);

  // You can implement additional useEffect hooks for search/filter/sort if needed
  // Example:
  // useEffect(() => {
  //   // Call API with filters when searchTerm or selectedStatus changes
  // }, [searchTerm, selectedStatus]);

  if (loading && orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <div className="flex items-center gap-2">
          <Loader size={24} className="animate-spin text-[#395c87]" />
          <span className="text-lg font-medium">Loading orders...</span>
        </div>
      </div>
    );
  }

  if (error && orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <div className="p-6 bg-white rounded-lg shadow max-w-md">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Error</h2>
          <p className="text-gray-700">{error}</p>
          <button
            onClick={() => {
              // TODO: Implement retry function
              // Example:
              // fetchOrders();
            }}
            className="mt-4 px-4 py-2 bg-[#395c87] text-white rounded-md hover:bg-[#09274d]"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main Content */}
      <div className="p-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-6">Orders Management</h2>

          {/* Search Bar */}
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={18} className="text-gray-500" />
            </div>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5"
              placeholder="Search orders by ID, user ID or customer name..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          {/* Status Filters */}
          <div className="flex overflow-x-auto bg-[#dae0ef] rounded-lg p-1 mb-6">
            {statusFilters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => handleStatusSelect(filter.id)}
                className={`px-4 py-2 rounded-md whitespace-nowrap mx-1 ${
                  selectedStatus === filter.id
                    ? "bg-[#395c87] text-white"
                    : "text-[#09274d]"
                }`}
              >
                {filter.name}
              </button>
            ))}
          </div>

          {/* Orders List */}
          <div className="overflow-x-auto">
            <div className="mb-4 flex justify-between items-center">
              <p className="text-sm text-gray-500">
                Showing {orders.length} orders
              </p>
            </div>

            <table className="w-full text-sm text-left border-collapse">
              <thead className="text-xs uppercase bg-[#dae0ef] text-[#09274d]">
                <tr>
                  <th
                    onClick={() => requestSort("orderId")}
                    className="px-6 py-3 cursor-pointer"
                  >
                    <div className="flex items-center">
                      Order ID
                      <ArrowUpDown size={14} className="ml-1" />
                    </div>
                  </th>
                  <th
                    onClick={() => requestSort("userId")}
                    className="px-6 py-3 cursor-pointer"
                  >
                    <div className="flex items-center">
                      Customer
                      <ArrowUpDown size={14} className="ml-1" />
                    </div>
                  </th>
                  <th
                    onClick={() => requestSort("createdAt")}
                    className="px-6 py-3 cursor-pointer"
                  >
                    <div className="flex items-center">
                      Order Date
                      <ArrowUpDown size={14} className="ml-1" />
                    </div>
                  </th>
                  <th
                    onClick={() => requestSort("items")}
                    className="px-6 py-3 cursor-pointer"
                  >
                    <div className="flex items-center">
                      Items
                      <ArrowUpDown size={14} className="ml-1" />
                    </div>
                  </th>
                  <th
                    onClick={() => requestSort("totalAmount")}
                    className="px-6 py-3 cursor-pointer"
                  >
                    <div className="flex items-center">
                      Amount
                      <ArrowUpDown size={14} className="ml-1" />
                    </div>
                  </th>
                  <th
                    onClick={() => requestSort("status")}
                    className="px-6 py-3 cursor-pointer"
                  >
                    <div className="flex items-center">
                      Status
                      <ArrowUpDown size={14} className="ml-1" />
                    </div>
                  </th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <tr
                      key={order._id}
                      className="bg-white border-b hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {/* Display order ID from your API response */}
                        {`${order._id.substring(0,7)}...`}
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          {/* Display customer name */}
                          <div className="font-medium">
                            {`${order.user?.firstName} ${order.user?.lastName}`}
                          </div>
                          {/* Display user ID */}
                          {/* <div className="text-xs text-gray-500">
                            {order.user?._id}
                          </div> */}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {/* Format date as needed */}
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {/* Display number of items */}
                        { order.orderItems?.length || 0}
                      </td>
                      <td className="px-6 py-4 font-medium">
                        {/* Format amount */}₹
                        {order.orderAmount?.toFixed(2) || "0.00"}
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={order.orderStatus || "pending"}
                          onChange={(e) =>
                            handleStatusChange(order._id, e.target.value)
                          }
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            order.status === "delivered"
                              ? "bg-green-100 text-green-800"
                              : order.status === "cancelled"
                              ? "bg-red-100 text-red-800"
                              : order.status === "shipped"
                              ? "bg-blue-100 text-blue-800"
                              : order.status === "processing"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {statusOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <NavLink to={`/admin/orders/details/${order._id}`}>
                            <button className="px-3 py-1 bg-[#395c87] text-white rounded-md hover:bg-[#09274d] flex items-center">
                              <Eye size={14} className="mr-1" />
                              View Details
                            </button>
                          </NavLink>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="bg-white border-b">
                    <td
                      colSpan="7"
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      No orders found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
