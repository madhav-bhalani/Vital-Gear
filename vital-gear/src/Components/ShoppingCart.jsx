import React from "react";
import "./ShoppingCart.jsx";
import { useModal } from "../ModalContext";

const ShoppingCart = () => {
  const { cartVisible, handleCart } = useModal();
  let cart = [1, 2];
  return (
    <>
      <div
        className={`w-[100%] h-[100%] absolute top-0 bg-[black]/[0.2] ${
          cartVisible ? "block" : "hidden"
        }`}
        onClick={handleCart}
      ></div>
      <div
        className={`fixed left-[50%] z-10 duration-500 -translate-x-1/2 -translate-y-1/2 mx-auto min-w-[40%] max-w-2xl bg-[#DBE2EF] text-[#112D4E] flex flex-col w-[40%] gap-10 p-5 rounded-md ${
          cartVisible ? "top-[50%]" : "top-[-50%]"
        }`}
      >
        <div>
          <p className="text-2xl font-bold text-center">Shopping Cart</p>
        </div>
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
          <button className="transition-500 bg-[#112D4E] rounded-md text-[#DBE2EF] p-3 font-semibold hover:bg-[#DBE2EF] hover:text-[#112D4E] hover:border hover:border-[#112D4E]">
            Continue to Payment
          </button>
        </div>
      </div>
    </>
  );
};

export default ShoppingCart;

function CartItem() {
  return (
    <>
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
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div>
            <select className="w-max rounded-lg border-gray-200 bg-[#F9F7F7] p-3 text-sm shadow-sm">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div>
            <button className="font-semibold">Remove</button>
          </div>
        </div>
        <div>
          <p>₹1898</p>
        </div>
      </div>
    </>
  );
}
