import React from "react";
import Header from "./Header";
import Breadcrumb from "./Breadcrumb";
import ShopItem from "./ShopItem";
import Footer from "./Footer";
import Pagination from "./Pagination";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ShoppingCart from "./ShoppingCart";
import Basics from "./Basics";

export default function Gainers() {
  let shopItem = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  // let image = "/products/gainer.webp";
  return (
    <>
      <Header />
      <div className="protein mx-32 my-16">
        <Breadcrumb />
        <div className="py-5">
          <span className="flex items-center">
            <span className="pr-6 text-4xl font-bold text-[#09274d]">
              VitalGear Mass & Weight Gainers
            </span>
            <span className="h-px flex-1 bg-[#09274d]"></span>
          </span>
        </div>
        <div className="py-3">
          <p className="text-left text-gray-500">
            Mass Gainers helps bodybuilders gain muscle mass. They provide a
            great blend of fats, carbs, & protein. A weight gainer is a bliss
            for all those fitness enthusiasts who want to gain weight in a
            healthy way and bulk up. VitalGear has a range of Mass Gainer &
            Weight Gainer in a variety of flavours and special ingredients like
            Digezyme, a blend of digestive enzymes, to give better results with
            maximum absorption.
          </p>
        </div>
        <div className="h-px bg-[#09274d] mt-3"></div>

        <div className="flex flex-row flex-wrap gap-10 my-5">
          {shopItem.map((product, i) => {
            return (
              <ShopItem
                key={i}
                image="/products/gainer.webp"
                title="VitalGear Super Gainer XXL Weight Gainer"
                size="11lb"
                flavour="Chocolate"
                price="3999"
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
