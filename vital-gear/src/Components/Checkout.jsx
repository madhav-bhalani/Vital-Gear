import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Basics from "./Basics";
import { useModal } from "../ModalContext";
import checkout from "../../controllers/checkout";

function Checkout() {
  const navigate  = useNavigate();
  const { userId } = useModal(); // Get userId from context
  const [user, setUser] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState({ address: false });
  const [selectedAddress, setSelectedAddress] = useState(null);

  const placeOrder = async () => {
    try{
      const response = await axios.post('http://localhost:3000/orders/place', {address: selectedAddress}, {withCredentials: true});
      if (response.status === 201) {
        alert(response.data.message);
        navigate("/");
      }
    }catch(err){
      setError(err.message || "Failed to place order");
    }
  }


  useEffect(() => {
    if (userId) {
      checkout(setUser, setCartItems, setLoading, setError);
    }
  }, [userId]);

  console.log("HG user in client:", user);

  useEffect(() => {
    if (
      user.length > 0 &&
      user[0] &&
      Array.isArray(user[0]?.addresses) &&
      user[0]?.addresses.length > 0
    ) {
      console.log("HG address: ", user[0]?.addresses);
      const defaultAddress = user[0]?.addresses.find((addr) => addr.isDefault);
      setSelectedAddress(
        defaultAddress ? defaultAddress._id : user[0].addresses[0]._id
      );
    } else {
      console.warn("Addresses are missing or undefined:", user[0]);
    }
  }, [user]);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>{error}</h1>;

  // Helper function to format the address
  const formatAddress = (address) => {
    if (!address) return "No address available";
    return `${address.house}, ${address.apartment}, ${address.area}, ${address.city}, ${address.state} - ${address.zipcode}`;
  };

  // Calculate totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.productId.price.productPrice * item.itemQuantity,
    0
  );
  const shipping = 0; // Free shipping
  const orderTotal = subtotal + shipping;

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-8 text-[#09274d]">
            Checkout
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left column - User info and shipping */}
            <div className="md:col-span-2">
              {/* Personal Information */}
              {user.map((user) => (
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                  <h2 className="text-xl font-semibold text-[#09274d] mb-4">
                    Personal Information
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <p className="text-gray-800">
                        {user.firstName} {user.lastName}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <p className="text-gray-800">{user.email}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Mobile Number
                      </label>
                      <p className="text-gray-800">{user.phone}</p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Delivery Address */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-[#09274d]">
                    Delivery Address
                  </h2>
                  <button
                    onClick={() =>
                      setIsEditing({
                        ...isEditing,
                        address: !isEditing.address,
                      })
                    }
                    className="text-[#395c87] hover:text-[#09274d] font-medium"
                  >
                    {isEditing.address ? "Save" : "Edit"}
                  </button>
                </div>

                {isEditing.address ? (
                  <div className="space-y-4">
                    <select
                      value={selectedAddress}
                      onChange={(e) => setSelectedAddress(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md bg-white"
                    >
                      {user[0]?.addresses?.map((address) => (
                        <option key={address._id} value={address._id}>
                          {address.name}
                        </option>
                      ))}
                    </select>

                    <div className="p-3 bg-[#dae0ef] rounded-md">
                      {formatAddress(
                        user[0]?.addresses?.find(
                          (a) => a._id === selectedAddress
                        )
                      )}
                    </div>

                    <button className="text-[#395c87] hover:text-[#09274d] font-medium">
                      + Add New Address
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-baseline mb-2">
                      <span className="font-medium text-[#09274d] mr-2">
                        {
                          user[0]?.addresses?.find(
                            (a) => a._id === selectedAddress
                          )?.name
                        }
                        :
                      </span>
                      <span className="text-gray-700">
                        {formatAddress(
                          user[0]?.addresses?.find(
                            (a) => a._id === selectedAddress
                          )
                        )}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-[#09274d] mb-4">
                  Payment Method
                </h2>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 p-3 border rounded-md cursor-pointer bg-[#dae0ef]">
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked
                      className="h-5 w-5 text-[#395c87]"
                    />
                    <span className="font-medium">Cash on Delivery</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Right column - Order summary */}
            <div>
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                <h2 className="text-xl font-semibold text-[#09274d] mb-4">
                  Order Summary
                </h2>
                <div className="max-h-72 overflow-y-auto mb-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.productId._id}
                      className="flex border-b border-gray-200 py-4"
                    >
                      <img
                        src={item.productId.images[0].url}
                        alt={item.productId.productName}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="ml-4 flex-1">
                        <div className="flex justify-between">
                          <div>
                            <p className="font-medium">
                              {item.productId.brandName}{" "}
                              {item.productId.productName}
                            </p>
                            <p className="text-sm text-gray-600">
                              {item.productId.sizes.weight[0]}g,{" "}
                              {item.productId.productDetails.flavours[0]}
                            </p>
                            <p className="text-sm">Qty: {item.itemQuantity}</p>
                          </div>
                          <p className="font-medium">
                            ₹
                            {item.productId.price.productPrice *
                              item.itemQuantity}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-b border-gray-200 py-4 mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between font-medium text-lg">
                    <span>Total</span>
                    <span>₹{orderTotal}</span>
                  </div>
                </div>

                <button
                  onClick={placeOrder}
                  disabled={cartItems.length === 0}
                  className="w-full py-3 bg-[#09274d] text-white rounded-md font-medium hover:bg-[#395c87] transition duration-300"
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Basics />
    </>
  );
}

export default Checkout;
