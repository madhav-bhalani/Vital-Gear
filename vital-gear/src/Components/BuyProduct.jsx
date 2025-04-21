import React, { useState, useEffect } from "react";

import Header from "./Header";
import SignIn from "./SignIn";
import Footer from "./Footer";
import SignUp from "./SignUp";
import Breadcrumb from "./Breadcrumb";
import { FaStar } from "react-icons/fa";
import { FaCheckCircle, FaUndo, FaTruck } from "react-icons/fa";
import ProductsBS from "./ProductsBS";
import SliderImage from "./SliderImage";
import singleProduct from "../../controllers/singleProduct";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function BuyProduct() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);


  let bestSelling = [1, 2, 3, 4];
  const handleQuantityChange = (amount) => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + amount;
      return newQuantity > 0 && newQuantity <= 5 ? newQuantity : prevQuantity;
    });
  };
  const { productId } = useParams();

  const [cartItems, setCartItems] = useState([]);

  //CART for logged in users
  const addToCart = async (id, quantity) => {
    cartItems.push({ productId: id, itemQuantity: quantity });
    try {
      const response = await axios.post(
        "http://localhost:3000/shopping/cart",
        { cartItems: JSON.stringify(cartItems) },
        { withCredentials: true }
      );
      console.log("cart data: ", response.data);
      alert(response.data.message);
    } catch (err) {
      alert(err.response.data.error);
      console.log(err.response.data.error);
    }
  };

  // CART for not logged in users
  const tempCart = async (productId, quantity) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/auth",
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        console.log("User is logged in, proceed with adding to cart");
        addToCart(productId, quantity);
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        console.log("Current cart: ", cartItems);
        const existingItemIndex = cartItems.findIndex(
          (item) => item.productId === productId
        );
        if (existingItemIndex !== -1) {
          cartItems[existingItemIndex].itemQuantity += quantity;
          console.log("Updated cart (quantity increased): ", cartItems);
        } else {
          cartItems.push({ productId: productId, itemQuantity: quantity });
          console.log("Updated cart (new item added): ", cartItems);
        }
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        alert("Item updated in local storage cart");
      } else {
        console.log("ERROR IN ADDING TO CART", err);
        alert("error while adding to local storage");
      }
    }
  };

  useEffect(() => {
    if (productId) {
      singleProduct(productId, setLoading, setProduct, setError);
    }
  }, [productId]);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>{error}</h1>;

  return (
    <>
      <Header />

      {product ? (
        <>
          <div className="mx-32 my-16">
            <Breadcrumb
              productTitle={product.brandName + " " + product.productName}
            />
            <div className="flex flex-row mt-10 gap-16 text-[#112D4E]">
              <SliderImage imageUrl={product.images} />
              <div className="basis-[60%] w-[500px]">
                <div className="flex flex-col gap-5">
                  <div className="text-4xl font-bold">
                    {product.brandName + " " + product.productName},{" "}
                    {product.sizes?.weight[1]}g,{" "}
                    {product.productDetails?.flavours?.[0]}
                    <span>
                      <div className="flex gap-1 items-center p-1 w-max">
                        <p className="pt-1 font-semibold text-lg">4.5</p>
                        <span>
                          <FaStar className="text-center text-lg" />
                        </span>
                      </div>
                    </span>
                  </div>

                  <p className="text-2xl font-semibold flex flex-col">
                    MRP: ₹{product.price?.productPrice}
                    <span className="text-sm font-normal">
                      Inclusive all taxes
                    </span>
                  </p>

                  <div className="flex flex-row gap-10 mt-4">
                    <div className="flex flex-col gap-3">
                      <p className="text-xl font-semibold">
                        <span className="border-b-4 border-[#3F72AF]">
                          Weight
                        </span>
                      </p>
                      <select className="w-max rounded-lg border-gray-200 bg-[#DBE2EF] p-3 text-md shadow-sm">
                        {product.sizes?.weight.map((w, i) => {
                          console.log(w);
                          return (
                            <option key={i} value={w}>
                              {w} g
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="flex flex-col gap-3">
                      <p className="text-xl font-semibold">
                        <span className="border-b-4 border-[#3F72AF]">
                          Flavour
                        </span>{" "}
                      </p>
                      <select className="w-max rounded-lg border-gray-200 bg-[#DBE2EF] p-3 text-md shadow-sm">
                        {product.productDetails?.flavours.map((f, i) => {
                          return (
                            <option key={i} value={f}>
                              {f}
                            </option>
                          );
                        })}
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
                    <button
                      onClick={() => tempCart(productId, quantity)}
                      className="px-4 py-2 font-semibold text-[#DBE2EF] bg-[#112D4E] rounded-md text-lg hover:bg-[#DBE2EF] hover:text-[#112D4E] duration-500"
                    >
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
                        {product.productName}
                      </span>
                    </p>
                    <p>
                      {product.productDetails?.description}
                      {/* VitalGear Biozyme Performance Whey is crafted exclusively
                      for fitness and muscle-building champions who want their
                      protein supplement to be as effective as their efforts. It
                      is scientifically designed with Enhanced Absorption
                      Formula (EAF®) to maximize the bioavailability of protein
                      for the Indian bodies. It’s a part of Vital Gear's
                      pioneering innovation- the BIOZYME series. The other
                      fitness supplements in this iconic series are Biozyme Whey
                      Iso-Zero & Biozyme Whey Protein. */}
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
        </>
      ) : (
        <>
          <p>No data available</p>
        </>
      )}

      <Footer />
      <SignIn />
      <SignUp />
    </>
  );
}
