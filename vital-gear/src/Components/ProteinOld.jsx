import React from "react";
import Header from "./Header";
import Breadcrumb from "./Breadcrumb";
import ShopItem from "./ShopItem";
import Footer from "./Footer";
import Pagination from "./Pagination";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Cart from "./Cart";
import Basics from "./Basics";
import productsData from "./productsData.json";

export default function Protein() {
  // let shopItem = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <>
      <Header />
      <div className="protein mx-32 my-16">
        <Breadcrumb />
        <div className="py-5">
          <span className="flex items-center">
            <span className="pr-6 text-4xl font-bold text-[#09274d]">
              VitalGear Protein Powder
            </span>
            <span className="h-px flex-1 bg-[#09274d]"></span>
          </span>
        </div>
        <div className="py-3">
          <p className="text-left text-gray-500">
            Introducing VitalGear Whey Protein, the ultimate choice for fast
            muscle recovery and prevention of muscle breakdown. Our whey protein
            is a complete protein, containing all nine essential amino acids,
            ensuring you get the best nutrition possible. VitalGear Whey Protein
            boasts superior absorbability compared to other whey supplements,
            thanks to its premium quality whey isolate. Explore our diverse
            range of protein powders and supplements, including Biozyme Whey
            Protein Isolate, Whey Active, Whey Premium, and Whey Prime, all
            offered at competitive prices. Elevate your fitness journey with
            VitalGear today!
          </p>
        </div>
        <div className="h-px bg-[#09274d] mt-3"></div>

        <div className="flex flex-row flex-wrap gap-10 my-5">
          {productsData.map((product, i) => {
            return (
              <ShopItem
                key={product.id}
                image={product.image}
                title={product.brand + " " + product.name}
                size={product.size}
                flavour={product.flavour}
                price={product.price}
              />
            );
          })}
        </div>
      </div>

      <div className="pb-10">
        <Pagination />
      </div>

      <Basics />
      <Cart />
    </>
  );
}
