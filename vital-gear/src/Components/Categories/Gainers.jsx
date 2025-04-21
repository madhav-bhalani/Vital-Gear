import React, { useState, useEffect } from "react";
import Header from "../Header";
import Breadcrumb from "../Breadcrumb";
import ShopItem from "../ShopItem";
import Footer from "../Footer";
import Pagination from "../Pagination";
import SignIn from "../SignIn";
import SignUp from "../SignUp";
import Cart from "../Cart";
import Basics from "../Basics";
import fetchProducts from "../../../controllers/fetchProduct";

export default function Gainers() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts("gainer", setProducts, setLoading, setError);
  }, []);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>{error}</h1>;

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
          {products.length > 0 ? (
            products.map((product) => (
              <ShopItem
                key={product._id}
                image={product.images[0].url || " "}
                title={`${product.brandName || " "} ${
                  product.productName || " "
                }`}
                size={`${product.sizes?.weight[1]}g` || ' '}
                flavour={
                  product.productDetails?.flavours?.[0] ||
                  product.productDetails?.colors[0] ||
                  " "
                }
                price={product.price?.productPrice || " "}
                onSale={product.price.onSale}
                id={product._id}
                category={"Gainers"}
              />
            ))
          ) : (
            <p>No products available</p>
          )}
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
