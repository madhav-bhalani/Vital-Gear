import React, { useState, useEffect } from "react";
import Header from "./Header";
import Basics from "./Basics";
import { useModal } from "../ModalContext";
import fetchUser from "../../controllers/User/fetchUser";


function Checkout() {
  // Mock data for testing

  const mockAddresses = [
    { id: 1, name: "Home", fullAddress: "123 Main Street, Apartment 4B, Mumbai, Maharashtra - 400001" },
    { id: 2, name: "Office", fullAddress: "456 Business Park, Tower C, 5th Floor, Bengaluru, Karnataka - 560001" },
    { id: 3, name: "Parent's House", fullAddress: "789 Garden Colony, Near City Hospital, Delhi - 110001" }
  ];

  const mockCartItems = [
    {
      id: "p1",
      brand: "ProteinX",
      name: "Whey Isolate",
      size: "1000g",
      flavor: "Chocolate",
      price: 1999,
      quantity: 1,
      image: "/api/placeholder/100/100"
    },
    {
      id: "p2",
      brand: "FitLife",
      name: "BCAA Energy",
      size: "500g",
      flavor: "Blue Raspberry",
      price: 899,
      quantity: 2,
      image: "/api/placeholder/100/100"
    }
  ];

  // States
  const [selectedAddress, setSelectedAddress] = useState(mockAddresses[0].id);
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const [isEditing, setIsEditing] = useState({
    address: false
  });

  // Calculate totals
  const subtotal = mockCartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 0; // Free shipping
  const orderTotal = subtotal + shipping;

  // Handle order placement
  const handlePlaceOrder = () => {
    alert("Order placed successfully!");
    // Here you would typically handle order submission to your backend
  };

  // Handle user info changes

  // Format address for display
  const formatAddress = (address) => {
    if (address.fullAddress.length > 50) {
      return `${address.fullAddress.substring(0, 50)}...`;
    }
    return address.fullAddress;
  };
  
  const {userId, setUserId} = useModal();
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (userId) {
      fetchUser(userId, setLoading, setUser, setError);
    }
    console.log('HG userId', userId);
  }, [userId]);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>{error}</h1>;


  return (
    <><Header/>
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-[#09274d]">Checkout</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left column - User info and shipping */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-[#09274d]">Personal Information</h2>
                {/* <button 
                  onClick={() => setIsEditing({...isEditing, userInfo: !isEditing.userInfo})}
                  className="text-[#395c87] hover:text-[#09274d] font-medium"
                >
                  {isEditing.userInfo ? "Save" : "Edit"}
                </button> */}
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>

                    <p className="text-gray-800">{user.firstName} {user.lastName}</p>

                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
   
                    <p className="text-gray-800">{user.email}</p>

                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>


                    <p className="text-gray-800">{user.phone}</p>

                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-[#09274d]">Delivery Address</h2>
                <button 
                  onClick={() => setIsEditing({...isEditing, address: !isEditing.address})}
                  className="text-[#395c87] hover:text-[#09274d] font-medium"
                >
                  {isEditing.address ? "Save" : "Edit"}
                </button>
              </div>
              
              {isEditing.address ? (
                <div className="space-y-4">
                  <select 
                    value={selectedAddress} 
                    onChange={(e) => setSelectedAddress(Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-md bg-white"
                  >
                    {mockAddresses.map(address => (
                      <option key={address.id} value={address.id}>
                        {address.name}
                      </option>
                    ))}
                  </select>
                  
                  <div className="p-3 bg-[#dae0ef] rounded-md">
                    {mockAddresses.find(a => a.id === selectedAddress)?.fullAddress}
                  </div>
                  
                  <button className="text-[#395c87] hover:text-[#09274d] font-medium">
                    + Add New Address
                  </button>
                </div>
              ) : (
                <div>
                  <div className="flex items-baseline mb-2">
                    <span className="font-medium text-[#09274d] mr-2">
                      {mockAddresses.find(a => a.id === selectedAddress)?.name}:
                    </span>
                    <span className="text-gray-700">
                      {formatAddress(mockAddresses.find(a => a.id === selectedAddress))}
                    </span>
                  </div>
                </div>
              )}
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-[#09274d] mb-4">Payment Method</h2>
              
              <div className="space-y-3">
                <label className="flex items-center space-x-3 p-3 border rounded-md cursor-pointer bg-[#dae0ef]">
                  <input 
                    type="radio" 
                    name="payment" 
                    value="cod" 
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                    className="h-5 w-5 text-[#395c87]"
                  />
                  <span className="font-medium">Cash on Delivery</span>
                </label>
                
                <label className="flex items-center space-x-3 p-3 border rounded-md cursor-not-allowed opacity-50">
                  <input 
                    type="radio" 
                    name="payment" 
                    value="card" 
                    disabled
                    className="h-5 w-5"
                  />
                  <span>Credit/Debit Card</span>
                </label>
                
                <label className="flex items-center space-x-3 p-3 border rounded-md cursor-not-allowed opacity-50">
                  <input 
                    type="radio" 
                    name="payment" 
                    value="upi" 
                    disabled
                    className="h-5 w-5"
                  />
                  <span>UPI</span>
                </label>
                
                <label className="flex items-center space-x-3 p-3 border rounded-md cursor-not-allowed opacity-50">
                  <input 
                    type="radio" 
                    name="payment" 
                    value="wallet" 
                    disabled
                    className="h-5 w-5"
                  />
                  <span>Wallet</span>
                </label>
              </div>
            </div>
          </div>
          
          {/* Right column - Order summary */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-semibold text-[#09274d] mb-4">Order Summary</h2>
              
              <div className="max-h-72 overflow-y-auto mb-4">
                {mockCartItems.map(item => (
                  <div key={item.id} className="flex border-b border-gray-200 py-4">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                    <div className="ml-4 flex-1">
                      <div className="flex justify-between">
                        <div>
                          <p className="font-medium">{item.brand} {item.name}</p>
                          <p className="text-sm text-gray-600">{item.size}, {item.flavor}</p>
                          <p className="text-sm">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-medium">₹{item.price * item.quantity}</p>
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
                onClick={handlePlaceOrder}
                className="w-full py-3 bg-[#09274d] text-white rounded-md font-medium hover:bg-[#395c87] transition duration-300"
              >
                Place Order
              </button>
              
              <div className="mt-4 flex justify-between">
                <button className="text-[#395c87] hover:text-[#09274d] font-medium">
                  Return to Cart
                </button>
                <button className="text-[#395c87] hover:text-[#09274d] font-medium">
                  Edit Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Basics/>
    </>
  );
}

export default Checkout;