import React, { useState, useEffect } from "react";
import { Search, Eye, ArrowUpDown, Loader } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function AdminOrders() {
  // Static sample order data
  const sampleOrders = [
    {
      _id: "6580df21a12345",
      orderId: "ORD-568923",
      userId: "USR-34567",
      userName: "John Doe",
      createdAt: "2025-04-08T14:32:11Z",
      totalAmount: 129.99,
      status: "delivered",
      items: 3,
      shippingAddress: "123 Main St, Anytown, CA"
    },
    {
      _id: "6580df21b67890",
      orderId: "ORD-568924",
      userId: "USR-12345",
      userName: "Sarah Johnson",
      createdAt: "2025-04-08T10:15:32Z",
      totalAmount: 75.50,
      status: "shipped",
      items: 2,
      shippingAddress: "456 Oak Ave, Someville, NY"
    },
    {
      _id: "6580df21c23456",
      orderId: "ORD-568925",
      userId: "USR-45678",
      userName: "Mike Wilson",
      createdAt: "2025-04-07T18:22:43Z",
      totalAmount: 210.75,
      status: "processing",
      items: 4,
      shippingAddress: "789 Pine Rd, Elsewhere, TX"
    },
    {
      _id: "6580df21d78901",
      orderId: "ORD-568926",
      userId: "USR-23456",
      userName: "Lisa Brown",
      createdAt: "2025-04-07T09:45:12Z",
      totalAmount: 49.99,
      status: "pending",
      items: 1,
      shippingAddress: "101 Elm St, Nowhere, FL"
    },
    {
      _id: "6580df21e34567",
      orderId: "ORD-568927",
      userId: "USR-56789",
      userName: "David Garcia",
      createdAt: "2025-04-06T16:30:22Z",
      totalAmount: 299.95,
      status: "cancelled",
      items: 5,
      shippingAddress: "202 Maple Dr, Somewhere, WA"
    },
    {
      _id: "6580df21f90123",
      orderId: "ORD-568928",
      userId: "USR-67890",
      userName: "Emily Chen",
      createdAt: "2025-04-06T11:18:09Z",
      totalAmount: 89.50,
      status: "delivered",
      items: 2,
      shippingAddress: "303 Cedar Ln, Anyplace, IL"
    },
    {
      _id: "6580df22a45678",
      orderId: "ORD-568929",
      userId: "USR-78901",
      userName: "Robert Taylor",
      createdAt: "2025-04-05T20:12:36Z",
      totalAmount: 154.25,
      status: "shipped",
      items: 3,
      shippingAddress: "404 Birch Rd, Someplace, OR"
    }
  ];

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
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
  ];

  // Status options for dropdown
  const statusOptions = [
    { value: "pending", label: "Pending" },
    { value: "processing", label: "Processing" },
    { value: "shipped", label: "Shipped" },
    { value: "delivered", label: "Delivered" },
    { value: "cancelled", label: "Cancelled" },
  ];

  // Handle search input
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle status filter selection
  const handleStatusSelect = (statusId) => {
    setSelectedStatus(statusId);
  };

  // Handle sorting
  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Handle status update
  const handleStatusChange = (orderId, newStatus) => {
    // Update the order status in the UI only for now
    setOrders(orders.map(order => 
      order._id === orderId ? { ...order, status: newStatus } : order
    ));
    
    // Show confirmation message
    alert(`Order ${orderId} status updated to ${newStatus}`);
  };

  // Load sample data with simulated loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setOrders(sampleOrders);
      setLoading(false);
    }, 1000); // Simulate 1 second loading time
    
    return () => clearTimeout(timer);
  }, []);

  // Filter orders based on search term and selected status
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) || 
      order.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.userName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === "all" || order.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  // Sort orders based on sortConfig
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (!sortConfig.key) return 0;
    
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    
    if (aValue < bValue) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <div className="flex items-center gap-2">
          <Loader size={24} className="animate-spin text-[#395c87]" />
          <span className="text-lg font-medium">Loading orders...</span>
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
                Showing {sortedOrders.length} orders
              </p>
              <p className="text-sm font-medium">
                Total Orders: <span className="text-[#09274d] font-bold">{orders.length}</span>
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
                {sortedOrders.length > 0 ? (
                  sortedOrders.map((order) => (
                    <tr
                      key={order._id}
                      className="bg-white border-b hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {order.orderId}
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-medium">{order.userName}</div>
                          <div className="text-xs text-gray-500">{order.userId}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {order.items}
                      </td>
                      <td className="px-6 py-4 font-medium">
                        ${order.totalAmount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order._id, e.target.value)}
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
                          <NavLink to={`/admin/orders/${order._id}`}>
                            <button
                              className="px-3 py-1 bg-[#395c87] text-white rounded-md hover:bg-[#09274d] flex items-center"
                            >
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