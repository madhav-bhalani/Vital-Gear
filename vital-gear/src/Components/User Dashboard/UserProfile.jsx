import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";
import axios from "axios";
import Header from "../Header";
import Basics from "../Basics";
import { useModal } from "../../ModalContext";
import fetchUser from "../../../controllers/User/fetchUser";
import fetchAddresses from "../../../controllers/User/fetchAddress";
import allOrders from "../../../controllers/Admin/allOrders";

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState("profile");
  const navigate = useNavigate();

  // Handle signout
  const handleSignOut = () => {
    // Clear any stored user data/tokens
    localStorage.removeItem("userToken");
    // Redirect to login page
    navigate("/login");
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[white] py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-center text-3xl font-bold text-[#09274d] mb-8">
            My Account
          </h1>

          <div className="max-w-6xl mx-auto">
            <div className="bg-[#dae0ef] rounded-lg shadow-lg overflow-hidden">
              {/* Tabs */}
              <div className="flex border-b">
                <button
                  className={`px-6 py-4 text-sm font-medium ${
                    activeTab === "profile"
                      ? "bg-[#09274d] text-white"
                      : "text-[#09274d]"
                  }`}
                  onClick={() => setActiveTab("profile")}
                >
                  Personal Info
                </button>
                <button
                  className={`px-6 py-4 text-sm font-medium ${
                    activeTab === "addresses"
                      ? "bg-[#09274d] text-white"
                      : "text-[#09274d]"
                  }`}
                  onClick={() => setActiveTab("addresses")}
                >
                  Addresses
                </button>
                <button
                  className={`px-6 py-4 text-sm font-medium ${
                    activeTab === "orders"
                      ? "bg-[#09274d] text-white"
                      : "text-[#09274d]"
                  }`}
                  onClick={() => setActiveTab("orders")}
                >
                  Orders
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                {activeTab === "profile" && <ProfileInfo />}
                {activeTab === "addresses" && <AddressManagement />}
                {activeTab === "orders" && <OrderHistory />}
              </div>
            </div>

            <button
              onClick={handleSignOut}
              className="mt-6 px-6 py-3 bg-[#395c87] text-white rounded-lg flex items-center justify-center shadow-md hover:bg-[#09274d] transition duration-300"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
      <Basics />
    </>
  );
}

// Profile Information Component
function ProfileInfo() {
  const { userId, setUserId } = useModal();
  const [editMode, setEditMode] = useState(false);

  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [newPass, setNewPass] = useState("");
  const [password, setPassword] = useState("");

  const handleEditUser = async (e) => {
    //handleEditForm
    e.preventDefault();

    const formData = new URLSearchParams();

    formData.set("firstName", firstName);
    formData.set("lastName", lastName);
    formData.set("email", email);
    formData.set("phone", phone);
    formData.set("newPass", newPass);
    formData.set("password", password);

    try {
      console.log("HG Form: ", Array.from(formData.entries()));
      const response = await axios.put(
        `http://localhost:3000/user/${userId}`,
        formData,
        { withCredentials: true }
      );
      alert(response.data.message);
      navigate("/User");
    } catch (err) {
      alert(err.response.data.error);
      console.log(err.response.data.error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUser(userId, setLoading, setUser, setError);
    }
    console.log("HG userId", userId);
  }, [userId]);

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
      // setNewPass(user.password);
      // setPassword(user.password);
    }
  }, [user]);
  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>{error}</h1>;
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-[#09274d]">
          Personal Information
        </h2>
        {!editMode && (
          <button
            onClick={() => setEditMode(true)}
            className="px-4 py-2 bg-[#09274d] text-white rounded-lg text-sm"
          >
            Edit
          </button>
        )}
      </div>

      <form onSubmit={handleEditUser}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              disabled={!editMode}
              className="w-full bg-[white] rounded-lg border-gray-200 p-3 text-sm shadow-sm"
              required
            />
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              disabled={!editMode}
              className="w-full bg-[white]  rounded-lg border-gray-200 p-3 text-sm shadow-sm"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              title="Please enter a valid email address"
              onChange={(e) => setEmail(e.target.value)}
              disabled={!editMode}
              className="w-full bg-[white]  rounded-lg border-gray-200 p-3 text-sm shadow-sm"
              required
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Phone Number
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={phone}
              pattern="[0-9]{10}"
              title="Please enter a valid 10-digit phone number"
              onChange={(e) => setPhone(e.target.value)}
              disabled={!editMode}
              minLength={10}
              maxLength={10}
              className="w-full bg-[white] rounded-lg border-gray-200 p-3 text-sm shadow-sm"
              required
            />
          </div>

          {editMode && (
            <>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  New Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                  className="w-full bg-[white] rounded-lg border-gray-200 p-3 text-sm shadow-sm"
                  placeholder="Leave blank to keep current password"
                />
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[white]  rounded-lg border-gray-200 p-3 text-sm shadow-sm"
                  placeholder="Leave blank to keep current password"
                />
              </div>
            </>
          )}
        </div>

        {editMode && (
          <div className="flex justify-end mt-6 space-x-4">
            <button
              type="button"
              onClick={() => setEditMode(false)}
              className="px-5 py-2 bg-gray-200 text-gray-800 rounded-lg text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#09274d] text-white rounded-lg text-sm flex items-center"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

// Address Management Component
function AddressManagement() {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [currentAddress, setCurrentAddress] = useState(null);

  useEffect(() => {
    fetchAddresses(setAddresses, setLoading, setError);
  }, []);

  const handleAddAddress = () => {
    setCurrentAddress(null); // Reset current address for new entry
    setShowAddressModal(true);
  };

  const handleEditAddress = (address) => {
    setCurrentAddress(address); // Pass the selected address for editing
    setShowAddressModal(true);
  };

  const handleDeleteAddress = async (addressId) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      try {
        await axios.delete(`http://localhost:3000/address/${addressId}`, {
          withCredentials: true,
        });
        setAddresses(addresses.filter((addr) => addr.id !== addressId));
        alert("Address deleted successfully.");
      } catch (err) {
        console.error("Error deleting address:", err);
        alert("Failed to delete address. Please try again.");
      }
    }
  };

  const handleSetDefaultAddress = async (addressId) => {
    try {
      await axios.put(
        `http://localhost:3000/address/${addressId}/default`,
        {},
        { withCredentials: true }
      );
      const updatedAddresses = addresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === addressId,
      }));
      setAddresses(updatedAddresses);
      alert("Default address updated successfully.");
    } catch (err) {
      console.error("Error setting default address:", err);
      alert("Failed to set default address. Please try again.");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-[#09274d]">
          Saved Addresses
        </h2>
        <button
          onClick={handleAddAddress}
          className="px-4 py-2 bg-[#09274d] text-white rounded-lg text-sm"
        >
          Add New Address
        </button>
      </div>

      {addresses.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No addresses saved yet.</p>
          <button
            onClick={handleAddAddress}
            className="mt-4 px-5 py-2 bg-[#395c87] text-white rounded-lg text-sm"
          >
            Add Your First Address
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addresses.map((address) => (
            <div
              key={address.id}
              className={`border rounded-lg p-5 ${
                address.isDefault
                  ? "border-[#09274d] bg-[white]"
                  : "border-white bg-white"
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-medium">{address.name}</h3>
                {address.isDefault && (
                  <span className="bg-[#09274d] text-white text-xs px-2 py-1 rounded">
                    Default
                  </span>
                )}
              </div>

              <div className="text-gray-700 text-sm mb-4">
                <p>
                  {address.house}, {address.apartment}
                </p>
                <p>
                  {address.area}, {address.city}
                </p>
                <p>
                  {address.state} {address.zipcode}
                </p>
              </div>

              <div className="flex justify-between items-center">
                <div className="space-x-2">
                  <button
                    onClick={() => handleEditAddress(address)}
                    className="text-[#395c87] text-sm hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteAddress(address.id)}
                    className="text-red-600 text-sm hover:underline"
                  >
                    Delete
                  </button>
                </div>

                {!address.isDefault && (
                  <button
                    onClick={() => handleSetDefaultAddress(address.id)}
                    className="text-sm text-[#395c87] hover:underline"
                  >
                    Set as Default
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {showAddressModal && (
        <AddressModal
          address={currentAddress}
          onClose={() => setShowAddressModal(false)}
          onSave={(newAddress) => {
            if (currentAddress) {
              // Update existing address
              setAddresses(
                addresses.map((addr) =>
                  addr.id === newAddress.id ? newAddress : addr
                )
              );
            } else {
              // Add new address
              if (newAddress.isDefault) {
                setAddresses(
                  addresses.map((addr) => ({
                    ...addr,
                    isDefault: addr.id === newAddress.id,
                  }))
                );
              } else {
                setAddresses([...addresses, newAddress]);
              }
            }
            setShowAddressModal(false);
          }}
        />
      )}
    </div>
  );
}

// Address Modal Component
function AddressModal({ address, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: address?.name || "",
    house: address?.house || "",
    apartment: address?.apartment || "",
    city: address?.city || "",
    area: address?.area || "",
    state: address?.state || "",
    landmark: address?.landmark || "",
    zipcode: address?.zipcode || "",
    isDefault: address?.isDefault || false,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const endpoint = address
        ? `http://localhost:3000/address` // PUT request for editing
        : `http://localhost:3000/address`; // POST request for adding

      const method = address ? "put" : "post"; // Determine HTTP method
      const payload = address
        ? { ...formData, id: address?._id } // Include `id` for editing
        : formData;

      const response = await axios[method](endpoint, payload, {
        withCredentials: true,
      });

      if (response.status === 200) {
        onSave(response.data.updatedAddress || response.data.address);
      }
      alert(response.data.message);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        alert(err.response.data.message);
      } else {
        alert("An unexpected error occurred. Please try again.");
      }
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-[#dae0ef] rounded-lg p-6 w-full max-w-md mx-4">
        <h3 className="text-xl font-semibold text-[#09274d] mb-4">
          {address ? "Edit Address" : "Add New Address"}
        </h3>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Address Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
                placeholder="Home, Office, etc."
                required
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="house"
                  className="block text-sm font-medium text-gray-700"
                >
                  House/Flat Number
                </label>
                <input
                  type="text"
                  id="house"
                  name="house"
                  value={formData.house}
                  onChange={handleChange}
                  className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
                  placeholder="House/Flat Number"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="apartment"
                  className="block text-sm font-medium text-gray-700"
                >
                  Apartment/Road
                </label>
                <input
                  type="text"
                  id="apartment"
                  name="apartment"
                  value={formData.apartment}
                  onChange={handleChange}
                  className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
                  placeholder="Apartment name or Road"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="landmark"
                  className="block text-sm font-medium text-gray-700"
                >
                  Landmark (Optional)
                </label>
                <input
                  type="text"
                  id="landmark"
                  name="landmark"
                  value={formData.landmark}
                  onChange={handleChange}
                  className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
                  placeholder="Nearby landmark"
                />
              </div>

              <div>
                <label
                  htmlFor="area"
                  className="block text-sm font-medium text-gray-700"
                >
                  Area
                </label>
                <input
                  type="text"
                  id="area"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
                  placeholder="Area/Locality"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700"
                >
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
                  placeholder="City"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="state"
                  className="block text-sm font-medium text-gray-700"
                >
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
                  placeholder="State"
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="zipcode"
                className="block text-sm font-medium text-gray-700"
              >
                Zipcode
              </label>
              <input
                type="text"
                id="zipcode"
                name="zipcode"
                value={formData.zipcode}
                onChange={handleChange}
                className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
                placeholder="Zipcode"
                required
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="isDefault"
                name="isDefault"
                checked={formData.isDefault}
                onChange={handleChange}
                className="rounded border-gray-300"
              />
              <label htmlFor="isDefault" className="ml-2 text-sm text-gray-700">
                Set as default address
              </label>
            </div>
          </div>

          <div className="flex justify-end mt-6 space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 bg-gray-200 text-gray-800 rounded-lg text-sm font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-3 bg-[#09274d] text-white rounded-lg text-sm font-semibold flex items-center"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Address"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Order History Component
function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    // Fetch user orders
    allOrders(setOrders, setLoading, setError);
  }, []);

  const toggleOrderDetails = (orderId) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null);
    } else {
      setExpandedOrder(orderId);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

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

  if (error === 500 && orders.length === 0) {
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
    <div>
      <h2 className="text-2xl font-semibold text-[#09274d] mb-6">
        Order History
      </h2>

      {orders.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border bg-white rounded-lg overflow-hidden"
            >
              <div
                className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50"
                onClick={() => toggleOrderDetails(order._id)}
              >
                <div>
                  <p className="font-medium">{order._id}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex items-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      order.orderStatus
                    )}`}
                  >
                    {order.orderStatus}
                  </span>
                  <span className="ml-4 text-[#09274d] font-medium">
                    ₹{order.orderAmount.toLocaleString()}
                  </span>
                  <svg
                    className={`w-5 h-5 ml-2 transform transition-transform ${
                      expandedOrder === order._id ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </div>
              </div>

              {expandedOrder === order._id && (
                <div className="p-4 border-t border-gray-200 bg-gray-50">
                  <h4 className="font-medium mb-2">Order Items</h4>

                  <div className="space-y-2">
                    {order.orderItems.map((item, index) => (
                      <div key={index} className="flex justify-between">
                        <div>
                          <p className="text-sm">{`${item.productId?.brandName} ${item.productId?.productName}`}</p>
                          <p className="text-xs text-gray-500">
                            Qty: {item.itemQuantity}
                          </p>
                        </div>
                        <p className="text-sm">
                          ₹{item.productId?.price.productPrice.toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-200 flex justify-between">
                    <p className="font-medium">Total</p>
                    <p className="font-medium">
                      ₹{order.orderAmount.toLocaleString()}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
