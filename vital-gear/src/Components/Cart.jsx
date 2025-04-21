import React from "react";
import "./Cart.jsx";
import { useState, useEffect, } from "react";
import { useNavigate } from "react-router-dom";
import { useModal } from "../ModalContext";
import fetchCart from "../../controllers/fetchCart.js";
import axios from "axios";
import Basics from "./Basics.jsx";

export default function Cart() {
  const navigate = useNavigate();
  const { cartVisible, handleCart, setIsSignInVisible } = useModal();

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const removeCartItem = async (productId) => {
    try{
      const response = await axios.delete(`http://localhost:3000/shopping/cart/${productId}`, {
        withCredentials: true,
      });
      console.log("Server response:", response.data);
      if (response.status === 200) {
        setCartItems((prevItems) =>
          prevItems.filter((item) => item.productId._id !== productId)
        );
      }
    } catch (err) {
      if(err.response && err.response.status === 401) {
        // User is logged out, remove item from localStorage
        const localCart = JSON.parse(localStorage.getItem("cartItems")) || [];
        const updatedCart = localCart.filter((item) => item.productId !== productId);
        localStorage.setItem("cartItems", JSON.stringify(updatedCart));
        setCartItems(updatedCart);
      }
      else{
        setError(err.message || "An error occurred while removing the item.");
      }
    }
  }

  const handleCheckout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/auth",
        {},
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        // User is logged in, navigate to Checkout
        navigate("/checkout");
      }
      else if (response.status === 204) {
        navigate("/checkout");
        // Handle this case if needed
      }
      else if(response.status === 401){
        navigate("/login");
      }
    } catch (err) {
        console.error("Error during checkout:", err);
        setError("An error occurred. Please try again.");
      }
  };

  console.log("HG Cart inside Cart: ",cartVisible);
  useEffect(() => {
    fetchCart(setCartItems, setLoading, setError);
  }, []);

  console.log("HG cart items: ",cartItems);

  let totalPrice = 0;


  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>{error}</h1>;

  return (
    <>
      {/* Overlay (background fade effect) */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-black/50 transition-opacity ${
          cartVisible ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={handleCart}
      ></div>

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 z-50 h-screen overflow-y-auto p-4 w-[30rem] bg-[#DBE2EF] text-[#112D4E] shadow-lg transition-transform transform ${
          cartVisible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={handleCart}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-900"
        >
          ✖
        </button>

        {/* Cart Content */}
        <div className="flex flex-col gap-5">
          <div>
            <p className="text-2xl font-bold text-center underline">
              Shopping Cart
            </p>
          </div>
          {/* Items */}
          <div className="flex flex-col gap-5">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                totalPrice = totalPrice + (item.productId?.price?.productPrice || item.price?.productPrice) * item.itemQuantity,
                <CartItem
                  key={item.productId?._id || item._id}
                  image={item.productId?.images?.[0]?.url || item.images?.[0]?.url}
                  title={`${item.productId?.brandName || item.brandName} ${item.productId?.productName || item.productName}`}
                  size={`${item.productId?.sizes?.weight?.[0] || item.sizes?.weight?.[0]}g`}
                  flavour={item.productId?.productDetails?.flavours?.[0] || item.productDetails?.flavours?.[0]}
                  price={item.productId?.price?.productPrice || item.price?.productPrice}
                  quantity={item.itemQuantity}
                  removeFunc={() => removeCartItem(item.productId?._id || item._id)}
                />
                
              ))
            ) : (
              <p>No items in cart</p>
            )}
          </div>
          <div className="bg-[#F9F7F7] flex flex-col p-5 rounded-md">
            <div className="flex flex-row justify-between p-3 border-b-2 border-gray-300">
              <p>Subtotal</p>
              <p>{totalPrice}</p>
            </div>
            <div className="flex flex-row justify-between p-3 border-b-2 border-gray-300">
              <p>Shipping</p>
              <p>Free Delivery</p>
            </div>
            {/* <div className="flex flex-row justify-between p-3 border-b-2 border-gray-300">
              <p>Tax</p>
              <p>₹0.00</p>
            </div> */}
            <div className="flex flex-row justify-between p-3 font-semibold">
              <p>Order total</p>
              <p>{totalPrice}</p>
            </div>
          </div>
          <div className="flex flex-row-reverse">
            <button onClick={handleCheckout} className="transition-6000 bg-[#112D4E] w-[100%] rounded-md text-[#DBE2EF] p-3 font-semibold hover:bg-[#DBE2EF] hover:text-[#112D4E] hover:border hover:border-[#112D4E]">
              Continue to checkout
            </button>
          </div>
        </div>
      </div>
      <Basics/>
    </>
  );
}

function CartItem({removeFunc, image, title, size, flavour, price, quantity }) {
  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-row gap-10 justify-between items-cente border-b-2 border-[#112D4E] p-3">
          <div className="flex flex-row gap-3 ">
            <img src={image} alt="" className="w-32 rounded-md" />
            <div className="flex flex-col">
              <p className="font-semibold">{title}</p>
              <p>
                {size}, {flavour}
              </p>
              <div className="flex flex-col gap-2">
                <p className="font-semibold">Qty: {quantity}</p>
                {/* DropDown Qunatity Options */}
                {/* <div>
                  <select className="w-max rounded-lg border-gray-200 bg-[#F9F7F7] p-3 text-sm shadow-sm">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div> */}

                {/* <ItemCounter quantity={quantity} /> */}

                <div>
                  <button className="hover:underline" onClick={removeFunc}>Remove</button>
                </div>
              </div>
            </div>
          </div>
          <div>
            <p>₹{price}</p>
          </div>
        </div>
      </div>
    </>
  );
}

// function ItemCounter() {
//   const [quantity, setQuantity] = useState(1);

//   const handleQuantityChange = (amount) => {
//     setQuantity((prevQuantity) => {
//       const newQuantity = prevQuantity + amount;
//       return newQuantity > 0 ? newQuantity : 1;
//     });
//   };
//   return (
//     <>
//       <div className="flex bg-[#112D4E] text-[#DBE2EF] items-center border border-gray-300 rounded">
//         <button className="px-2 py-1" onClick={() => handleQuantityChange(-1)}>
//           −
//         </button>
//         <input
//           type="text"
//           className="text-[#3f72af] w-12 text-center border-none focus:ring-0"
//           value={quantity}
//           readOnly
//         />
//         <button className="px-2 py-1" onClick={() => handleQuantityChange(1)}>
//           +
//         </button>
//       </div>
//     </>
//   );
// }
