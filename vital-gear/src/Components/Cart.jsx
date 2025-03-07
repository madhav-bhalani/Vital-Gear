import React from "react";
import "./Cart.jsx";
import { useState } from "react";
import { useModal } from "../ModalContext";

export default function Cart() {
  const { cartVisible, handleCart } = useModal();
  let cart = [1, 2, 3,4,5];

  

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
            {cart.map((value, i) => {
              return <CartItem key={i} />;
            })}
          </div>
          <div className="bg-[#F9F7F7] flex flex-col p-5 rounded-md">
            <div className="flex flex-row justify-between p-3 border-b-2 border-gray-300">
              <p>Subtotal</p>
              <p>₹5694</p>
            </div>
            <div className="flex flex-row justify-between p-3 border-b-2 border-gray-300">
              <p>Shipping</p>
              <p>Free Delivery</p>
            </div>
            <div className="flex flex-row justify-between p-3 border-b-2 border-gray-300">
              <p>Tax</p>
              <p>₹0.00</p>
            </div>
            <div className="flex flex-row justify-between p-3 font-semibold">
              <p>Order total</p>
              <p>₹5694</p>
            </div>
          </div>
          <div className="flex flex-row-reverse">
            <button className="transition-500 bg-[#112D4E] w-full rounded-md text-[#DBE2EF] p-3 font-semibold hover:bg-[#DBE2EF] hover:text-[#112D4E] hover:border hover:border-[#112D4E]">
              Continue to Payment
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function CartItem() {
  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-row gap-10 justify-between items-cente border-b-2 border-[#112D4E] p-3">
          <div className="flex flex-row gap-3 ">
            <img
              src="/products/creatine.webp"
              alt=""
              className="w-32 rounded-md"
            />
            <div className="flex flex-col">
              <p className="font-semibold">VitalGear Creatine & Shaker</p>
              <p>0.55lb, Unflavoured</p>
              <div className="flex flex-row items-center gap-2">
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

                <ItemCounter/>
               
                <div>
                  <button className="font-semibold">Remove</button>
                </div>
              </div>
            </div>
          </div>
          <div>
            <p>₹1898</p>
          </div>
        </div>
      </div>
    </>
  );
}

function ItemCounter(){
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (amount) => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + amount;
      return newQuantity > 0 ? newQuantity : 1;
    });
  };
  return(
    <>
     <div className="flex bg-[#112D4E] text-[#DBE2EF] items-center border border-gray-300 rounded">
                  <button
                    className="px-2 py-1"
                    onClick={() => handleQuantityChange(-1)}
                  >
                    −
                  </button>
                  <input
                    type="text"
                    className="text-[#3f72af] w-12 text-center border-none focus:ring-0"
                    value={quantity}
                    readOnly
                  />
                  <button
                    className="px-2 py-1"
                    onClick={() => handleQuantityChange(1)}
                  >
                    +
                  </button>
                </div>
    </>
  );
}