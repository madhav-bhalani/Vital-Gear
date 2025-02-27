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

export default function PrePostWorkouts() {
  let shopItem = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <>
      <Header />
      <div className="protein mx-32 my-16">
        <Breadcrumb />
        <div className="py-5">
          <span className="flex items-center">
            <span className="pr-6 text-4xl font-bold text-[#09274d]">
              VitalGear Pre & Post Workouts
            </span>
            <span className="h-px flex-1 bg-[#09274d]"></span>
          </span>
        </div>
        <div className="py-3">
          <p className="text-left text-gray-500">
            These pre/post workout supplements from muscleblaze brand, provide
            booster dose to energise the body. These help to enhance the bodily
            performances also. The post-exercise dietary supplements assist
            muscle restoration, protein synthesis, and normal fitness gains.
            Learn how incorporating those supplements can raise your exercises
            and make a contribution to your health achievements.
          </p>
        </div>
        <div className="h-px bg-[#09274d] mt-3"></div>

        <div className="flex flex-row flex-wrap gap-10 my-5">
          {shopItem.map((product, i) => {
            return (
              <ShopItem
                key={i}
                image="/products/creatine.webp"
                title="VitalGear Creatine & Shaker Combo"
                size="0.55lb"
                flavour="Unflavoured"
                price="1898"
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
