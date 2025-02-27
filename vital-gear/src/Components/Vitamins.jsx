import React from "react";
import Header from "./Header";
import Breadcrumb from "./Breadcrumb";
import ShopItem from "./ShopItem";
import Footer from "./Footer";
import Pagination from "./Pagination";
import ShoppingCart from "./ShoppingCart";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Basics from "./Basics";

export default function Vitamins() {
  let shopItem = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <>
      <Header />
      <div className="protein mx-32 my-16">
        <Breadcrumb />
        <div className="py-5">
          <span className="flex items-center">
            <span className="pr-6 text-4xl font-bold text-[#09274d]">
              VitalGear Multi-Vitamins
            </span>
            <span className="h-px flex-1 bg-[#09274d]"></span>
          </span>
        </div>
        <div className="py-3">
          <p className="text-left text-gray-500">
            Vitamins play different roles in maintaining the body's optimal
            functioning. Certain vitamins support healthy neuron function and
            infection resistance, while others may aid in appropriate blood
            clotting or the body's ability to obtain energy from food. However,
            when the body gets short of these, people tend to opt for vitamin
            supplements in order to fulfil the nutrient debt in the body.
          </p>
        </div>
        <div className="h-px bg-[#09274d] mt-3"></div>

        <div className="flex flex-row flex-wrap gap-10 my-5">
          {shopItem.map((product, i) => {
            return (
              <ShopItem
                key={i}
                image="/products/vitamin.webp"
                title="VitalGear MB-Vite Multivitamin"
                size="60 tablets"
                price="699"
              />
            );
          })}
        </div>
      </div>

      <div className="pb-10">
        <Pagination />
      </div>

      <Basics/>
      <ShoppingCart />
      
    </>
  );
}
