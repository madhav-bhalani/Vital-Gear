import { React, useState } from "react";
import { FaStar } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useModal } from "../ModalContext";
import axios from "axios";

export default function ShopItem({
  image,
  title,
  size,
  flavour,
  price,
  onSale,
  id,
  category,
}) {
  const { toggleBread } = useModal();
  const [quantity, setQuantity] = useState(1);
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

  return (
    <>
      <div className="flex flex-col gap-5 bg-[#dae0ef] max-w-lg p-5 rounded-md text-[#09274d]">
        <div className="flex flex-row gap-5">
          <div className="relative bg-[#faf7f7] rounded-md">
            <img
              src={image}
              alt="protein-powder"
              className="w-[300px] h-[212px] rounded-md"
            />
            <span
              className={`absolute top-2 left-2 bg-[#09274d] text-white text-xs font-bold px-2 py-1 rounded-full ${
                onSale ? "visible" : "invisible"
              }`}
            >
              Sale!
            </span>
          </div>
          <div className=" flex flex-col gap-2 text-lg ">
            <p>{title},</p>
            <p className="font-semibold">
              {size}, {flavour}
            </p>
            <p className="font-semibold">₹{price}</p>
            <div className="flex rounded-md bg-[#3F72AF] text-[#dae0ef] font-semibold gap-1 items-center p-1 w-max">
              <p className="pt-1">4.5</p>
              <span>
                <FaStar className="text-center text-md" />
              </span>
            </div>
          </div>
          <div className="rounded-full p-3 bg-[#faf7f7] h-max">
            <FaRegHeart className="text-md" />
          </div>
        </div>

        <div className="flex flex-row justify-center gap-5">
          {/* <button>Buy Now</button>
            <button>Add to Cart</button> */}
          <NavLink to={`/Products/${id}`} state={category}>
            <button
              onClick={toggleBread}
              className="cursor-pointer relative group overflow-hidden border-2 px-8 py-2 border-[#09274d] rounded-full basis-[40%]"
            >
              <span className="font-bold text-[#dae0ef] text-xl relative z-10 group-hover:text-[#09274d] duration-50 uppercase">
                Buy Now
              </span>
              <span className="absolute top-0 left-0 w-full bg-[#09274d] duration-500 group-hover:-translate-x-full h-full"></span>
              <span className="absolute top-0 left-0 w-full bg-[#09274d] duration-500 group-hover:translate-x-full h-full"></span>

              <span className="absolute top-0 left-0 w-full bg-[#09274d] duration-500 delay-300 group-hover:-translate-y-full h-full"></span>
              <span className="absolute delay-300 top-0 left-0 w-full bg-[#09274d] duration-500 group-hover:translate-y-full h-full"></span>
            </button>
          </NavLink>
          <button
            onClick={() => tempCart(id , quantity)}
            className="cursor-pointer relative group overflow-hidden border-2 px-8 py-2 border-[#09274d] rounded-full basis-[60%]"
          >
            <span className="font-bold text-[#dae0ef] text-xl relative z-10 group-hover:text-[#09274d] duration-500 uppercase">
              Add to cart
            </span>
            <span className="absolute top-0 left-0 w-full bg-[#09274d] duration-500 group-hover:-translate-x-full h-full"></span>
            <span className="absolute top-0 left-0 w-full bg-[#09274d] duration-500 group-hover:translate-x-full h-full"></span>

            <span className="absolute top-0 left-0 w-full bg-[#09274d] duration-500 delay-300 group-hover:-translate-y-full h-full"></span>
            <span className="absolute delay-300 top-0 left-0 w-full bg-[#09274d] duration-500 group-hover:translate-y-full h-full"></span>
          </button>
        </div>
      </div>
    </>
  );
}
