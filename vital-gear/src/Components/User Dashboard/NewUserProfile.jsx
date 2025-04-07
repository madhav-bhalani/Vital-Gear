import React, { useState } from "react";

const UserProfile = () => {
  // Sample user data - replace with your actual data fetching logic
  const [userData, setUserData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "(123) 456-7890",
  });

  // Sample addresses - replace with your actual data
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      addressType: "Home",
      streetAddress: "123 Main Street",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA",
      isDefault: true,
    },
    {
      id: 2,
      addressType: "Work",
      streetAddress: "456 Business Ave",
      city: "New York",
      state: "NY",
      zipCode: "10002",
      country: "USA",
      isDefault: false,
    },
  ]);

  // Sample orders - replace with your actual data
  const [orders, setOrders] = useState([
    {
      id: "ORD12345",
      date: "2025-03-30",
      status: "Delivered",
      items: [
        { id: 1, name: "VitalGear Pro Watch", quantity: 1, price: 199.99 },
      ],
      total: 199.99,
      shippingAddress: "Home",
    },
    {
      id: "ORD12346",
      date: "2025-04-02",
      status: "Processing",
      items: [
        { id: 2, name: "VitalGear Fitness Band", quantity: 1, price: 89.99 },
        { id: 3, name: "VitalGear Smart Scale", quantity: 1, price: 59.99 },
      ],
      total: 149.98,
      shippingAddress: "Work",
    },
  ]);

  // State for new address form
  const [newAddress, setNewAddress] = useState({
    addressType: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    isDefault: false,
  });

  // State to control which section is being edited
  const [editingSection, setEditingSection] = useState(null);
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);

  // Handle personal info form changes
  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle new address form changes
  const handleAddressChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewAddress((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle save personal info
  const handleSavePersonalInfo = (e) => {
    e.preventDefault();
    // Add your API call to update user data here
    setEditingSection(null);
  };

  // Handle save new address
  const handleSaveAddress = (e) => {
    e.preventDefault();
    // Add your API call to save new address here
    const newId =
      addresses.length > 0 ? Math.max(...addresses.map((a) => a.id)) + 1 : 1;
    setAddresses([...addresses, { ...newAddress, id: newId }]);
    setNewAddress({
      addressType: "",
      streetAddress: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      isDefault: false,
    });
    setShowAddAddressForm(false);
  };

  // Handle delete address
  const handleDeleteAddress = (id) => {
    // Add your API call to delete address here
    setAddresses(addresses.filter((address) => address.id !== id));
  };

  return (
    <div className="flex bg-[#dae0ef] min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-[#09274d] text-white">
        <div className="p-4 text-xl font-bold">VitalGear User</div>
        <div className="mt-8">
          <div className="p-4 flex items-center hover:bg-[#395c87] cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-3"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
            Profile
          </div>
          <div className="p-4 flex items-center hover:bg-[#395c87] cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-3"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v7h-2l-1 2H8l-1-2H5V5z"
                clipRule="evenodd"
              />
            </svg>
            Messages
          </div>
          <div className="p-4 flex items-center hover:bg-[#395c87] cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-3"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                clipRule="evenodd"
              />
            </svg>
            Orders
          </div>
          <div className="p-4 flex items-center hover:bg-[#395c87] cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-3"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                clipRule="evenodd"
              />
            </svg>
            Settings
          </div>
          <div className="p-4 flex items-center hover:bg-[#395c87] cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-3"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                clipRule="evenodd"
              />
            </svg>
            Logout
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#09274d]">My Profile</h1>
        </div>

        {/* Personal Information Section */}
        <div className="bg-white rounded-lg shadow-md mb-8 overflow-hidden">
          <div className="bg-[#395c87] text-white p-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Personal Information</h2>
            {editingSection !== "personal" && (
              <button
                onClick={() => setEditingSection("personal")}
                className="bg-[#09274d] text-white px-4 py-2 rounded hover:bg-[#0c3b7a]"
              >
                Edit
              </button>
            )}
          </div>
          <div className="p-6">
            {editingSection === "personal" ? (
              <form onSubmit={handleSavePersonalInfo}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={userData.firstName}
                      onChange={handlePersonalInfoChange}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#395c87]"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={userData.lastName}
                      onChange={handlePersonalInfoChange}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#395c87]"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={userData.email}
                      onChange={handlePersonalInfoChange}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#395c87]"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Phone</label>
                    <input
                      type="text"
                      name="phone"
                      value={userData.phone}
                      onChange={handlePersonalInfoChange}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#395c87]"
                    />
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setEditingSection(null)}
                    className="px-4 py-2 border border-gray-300 rounded mr-2 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#09274d] text-white px-4 py-2 rounded hover:bg-[#0c3b7a]"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-600 text-sm">First Name</p>
                  <p className="font-medium">{userData.firstName}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Last Name</p>
                  <p className="font-medium">{userData.lastName}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Email</p>
                  <p className="font-medium">{userData.email}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Phone</p>
                  <p className="font-medium">{userData.phone}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Addresses Section */}
        <div className="bg-white rounded-lg shadow-md mb-8 overflow-hidden">
          <div className="bg-[#395c87] text-white p-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold">My Addresses</h2>
            <button
              onClick={() => setShowAddAddressForm(!showAddAddressForm)}
              className="bg-[#09274d] text-white px-4 py-2 rounded hover:bg-[#0c3b7a]"
            >
              {showAddAddressForm ? "Cancel" : "Add New Address"}
            </button>
          </div>
          <div className="p-6">
            {showAddAddressForm && (
              <form
                onSubmit={handleSaveAddress}
                className="mb-8 p-4 border border-gray-200 rounded"
              >
                <h3 className="text-lg font-medium mb-4">Add New Address</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2">
                      Address Type
                    </label>
                    <input
                      type="text"
                      name="addressType"
                      value={newAddress.addressType}
                      onChange={handleAddressChange}
                      placeholder="Home, Work, etc."
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#395c87]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">
                      Street Address
                    </label>
                    <input
                      type="text"
                      name="streetAddress"
                      value={newAddress.streetAddress}
                      onChange={handleAddressChange}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#395c87]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">City</label>
                    <input
                      type="text"
                      name="city"
                      value={newAddress.city}
                      onChange={handleAddressChange}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#395c87]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">
                      State/Province
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={newAddress.state}
                      onChange={handleAddressChange}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#395c87]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">
                      ZIP/Postal Code
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      value={newAddress.zipCode}
                      onChange={handleAddressChange}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#395c87]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Country</label>
                    <input
                      type="text"
                      name="country"
                      value={newAddress.country}
                      onChange={handleAddressChange}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#395c87]"
                      required
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="isDefault"
                      checked={newAddress.isDefault}
                      onChange={handleAddressChange}
                      className="mr-2"
                    />
                    <span>Set as default address</span>
                  </label>
                </div>
                <div className="mt-6 flex justify-end">
                  <button
                    type="submit"
                    className="bg-[#09274d] text-white px-4 py-2 rounded hover:bg-[#0c3b7a]"
                  >
                    Save Address
                  </button>
                </div>
              </form>
            )}

            {addresses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addresses.map((address) => (
                  <div
                    key={address.id}
                    className="border border-gray-200 rounded p-4 relative"
                  >
                    {address.isDefault && (
                      <span className="absolute top-2 right-2 bg-[#395c87] text-white text-xs px-2 py-1 rounded">
                        Default
                      </span>
                    )}
                    <h3 className="font-medium text-lg">
                      {address.addressType}
                    </h3>
                    <p className="text-gray-700 mt-2">
                      {address.streetAddress}
                    </p>
                    <p className="text-gray-700">
                      {address.city}, {address.state} {address.zipCode}
                    </p>
                    <p className="text-gray-700">{address.country}</p>
                    <div className="mt-4 flex justify-end">
                      <button
                        onClick={() => handleDeleteAddress(address.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">
                No addresses found. Add a new address to get started.
              </p>
            )}
          </div>
        </div>

        {/* Orders Section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-[#395c87] text-white p-4">
            <h2 className="text-xl font-semibold">My Orders</h2>
          </div>
          <div className="p-6">
            {orders.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {orders.map((order) => (
                      <tr key={order.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {order.id}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {order.date}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              order.status === "Delivered"
                                ? "bg-green-100 text-green-800"
                                : order.status === "Processing"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            ${order.total.toFixed(2)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#395c87]">
                          <button className="hover:text-[#09274d]">
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No orders found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
