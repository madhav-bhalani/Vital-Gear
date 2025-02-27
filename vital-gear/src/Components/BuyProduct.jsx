import React from "react";

import Header from "./Header";
import SignIn from "./SignIn";
import Footer from "./Footer";
import SignUp from "./SignUp";
import Breadcrumb from "./Breadcrumb";
import { FaStar } from "react-icons/fa";
import { useState } from "react";
import { FaCheckCircle, FaUndo, FaTruck } from "react-icons/fa";
import ProductsBS from "./ProductsBS";
import SliderImage from "./SliderImage";
import ShoppingCart from "./ShoppingCart";

export default function BuyProduct() {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (amount) => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + amount;
      return newQuantity > 0 ? newQuantity : 1;
    });
  };

  let bestSelling = [1, 2, 3, 4];

  return (
    <>
      <Header />

      <div className="mx-32 my-16">
        <Breadcrumb />
        <div className="flex flex-row mt-10 gap-16 text-[#112D4E]">
          <SliderImage />
          <div className="basis-[60%] w-[500px]">
            <div className="flex flex-col gap-5">
              <p className="text-lg">Proteins</p>
              <p className="text-4xl font-bold">
                VitalGear Bizoyme Performance Whey, 4.4lb, Chocolate Hazelnut
                <span>
                  <div className="flex gap-1 items-center p-1 w-max">
                    <p className="pt-1 font-semibold text-lg">4.5</p>
                    <span>
                      <FaStar className="text-center text-lg" />
                    </span>
                  </div>
                </span>
              </p>

              <p className="text-2xl font-semibold flex flex-col">
                MRP: ₹6499
                <span className="text-sm font-normal">Inclusive all taxes</span>
              </p>

              <div className="flex flex-row gap-10 mt-4">
                <div className="flex flex-col gap-3">
                  <p className="text-xl font-semibold">
                    <span className="border-b-4 border-[#3F72AF]">Weight</span>
                  </p>
                  <select className="w-max rounded-lg border-gray-200 bg-[#DBE2EF] p-3 text-md shadow-sm">
                    <option value="2lb">2 lb</option>
                    <option value="4.4lb">4.4 lb</option>
                    <option value="6lb">6 lb</option>
                  </select>
                </div>
                <div className="flex flex-col gap-3">
                  <p className="text-xl font-semibold">
                    <span className="border-b-4 border-[#3F72AF]">Flavour</span>{" "}
                  </p>
                  <select className="w-max rounded-lg border-gray-200 bg-[#DBE2EF] p-3 text-md shadow-sm">
                    <option value="chocolate">Chocolate</option>
                    <option value="vanilla">Vanilla</option>
                    <option value="strawberry">Strawberry</option>
                    <option value="hazelnut">Hazelnut</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-5 space-x-4 pt-5 ">
                <span className="text-xl font-medium border-b-4 border-[#3F72AF]">
                  Select Quantity
                </span>
                <div className="flex items-center border border-gray-300 rounded">
                  <button
                    className="px-2 py-1 text-blue-600"
                    onClick={() => handleQuantityChange(-1)}
                  >
                    −
                  </button>
                  <input
                    type="text"
                    className="w-12 text-center border-none focus:ring-0"
                    value={quantity}
                    readOnly
                  />
                  <button
                    className="px-2 py-1 text-blue-600"
                    onClick={() => handleQuantityChange(1)}
                  >
                    +
                  </button>
                </div>
                <button className="px-4 py-2 font-semibold text-[#DBE2EF] bg-[#112D4E] rounded-md text-lg hover:bg-blue-700">
                  Add to Cart
                </button>
              </div>

              <div className="p-4 border text-[#112D4E] bg-[#DBE2EF] rounded-md w-max">
                <div className="mb-4 flex flex-col gap-3">
                  <h2 className="text-xl font-semibold">
                    <span className="border-b-4 border-[#3F72AF]">
                      Deliver to
                    </span>
                  </h2>
                  <p className="text-gray-600">
                    Enter Pincode to check Delivery Date
                  </p>
                  <div className="flex items-center mt-2">
                    <input
                      type="text"
                      placeholder="Enter Pincode"
                      className="w-full p-2 rounded-l-lg focus:outline-none"
                    />
                    <button className="px-4 py-2 bg-[#112D4E] text-[#DBE2EF] rounded-r-lg ">
                      Check
                    </button>
                  </div>
                </div>
                <div className="flex justify-between gap-10 mt-4">
                  <div className="flex flex-col items-center">
                    <FaCheckCircle className="text-2xl text-[#3F72AF]" />
                    <p className="mt-2 font-medium">Authentic Products</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <FaUndo className="text-2xl text-[#3F72AF]" />
                    <p className="mt-2 font-medium">14 Days Returnable</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <FaTruck className="text-2xl text-[#3F72AF]" />
                    <p className="mt-2 font-medium">Free Shipping</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col mt-5">
                <p className="flex flex-col">
                  <span className="text-xl border-b-4 border-[#3F72AF] font-semibold">
                    About the Product{" "}
                  </span>
                  <span className="font-semibold text-sm">
                    Biozyme Performance Whey
                  </span>
                </p>
                <p>
                  VitalGear Biozyme Performance Whey is crafted exclusively for
                  fitness and muscle-building champions who want their protein
                  supplement to be as effective as their efforts. It is
                  scientifically designed with Enhanced Absorption Formula
                  (EAF®) to maximize the bioavailability of protein for the
                  Indian bodies. It’s a part of Vital Gear's pioneering
                  innovation- the BIOZYME series. The other fitness supplements
                  in this iconic series are Biozyme Whey Iso-Zero & Biozyme Whey
                  Protein.
                </p>
              </div>

              <div className="flex flex-col">
                <div>
                  <p className="text-xl border-b-4 border-[#3F72AF] font-semibold">
                    You might also like
                  </p>
                </div>
                <div className="flex flex-row gap-3 pt-10">
                  {bestSelling.map((best, i) => {
                    return <ProductsBS key={i} />;
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ShoppingCart />
      <SignIn />
      <SignUp />
    </>
  );
}
