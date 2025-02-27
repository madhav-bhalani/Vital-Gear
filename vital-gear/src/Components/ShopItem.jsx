import React from "react";
import { FaStar } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export default function ShopItem({ image, title, size, flavour, price }) {
  return (
    <>
      <div className="flex flex-col gap-5 bg-[#dae0ef] max-w-lg p-5 rounded-md text-[#09274d]">
        <div className="flex flex-row gap-5">
          <div className="bg-[#faf7f7] rounded-md">
            <img
              src={image}
              alt="protein-powder"
              className="w-[269px] h-full rounded-md"
            />
          </div>
          <div className=" flex flex-col gap-2 text-lg">
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
          <NavLink to="/Proteins/BuyProduct" state={"Proteins"}>
            <button className="cursor-pointer relative group overflow-hidden border-2 px-8 py-2 border-[#09274d] rounded-full basis-[40%]">
              <span className="font-bold text-[#dae0ef] text-xl relative z-10 group-hover:text-[#09274d] duration-50 uppercase">
                Buy Now
              </span>
              <span className="absolute top-0 left-0 w-full bg-[#09274d] duration-500 group-hover:-translate-x-full h-full"></span>
              <span className="absolute top-0 left-0 w-full bg-[#09274d] duration-500 group-hover:translate-x-full h-full"></span>

              <span className="absolute top-0 left-0 w-full bg-[#09274d] duration-500 delay-300 group-hover:-translate-y-full h-full"></span>
              <span className="absolute delay-300 top-0 left-0 w-full bg-[#09274d] duration-500 group-hover:translate-y-full h-full"></span>
            </button>
          </NavLink>
          <button className="cursor-pointer relative group overflow-hidden border-2 px-8 py-2 border-[#09274d] rounded-full basis-[60%]">
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
