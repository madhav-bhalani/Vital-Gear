import React, { useState, useEffect } from "react";
import Header from "../Header";
import Breadcrumb from "../Breadcrumb";
import ShopItem from "../ShopItem";
import fetchProducts from "../../../controllers/fetchProduct";
import Pagination from "../Pagination";
import Cart from "../Cart";

import Basics from "../Basics";

export default function PreWorkouts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts("pre-workout", setProducts, setLoading, setError);
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
              VitalGear Pre Workouts
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
          {products.length > 0 ? (
            products.map((product) => (
              <ShopItem
                key={product._id}
                image={product.images[0].url || " "}
                title={`${product.brandName || " "} ${
                  product.productName || " "
                }`}
                size={`${product.sizes?.weight[1]}g` || ' '}
                flavour={product.productDetails?.flavours?.[0] || " "}
                price={product.price?.productPrice || 0}
                onSale={product.price.onSale}
                id={product._id}
                category={"Pre-Workouts"}
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
