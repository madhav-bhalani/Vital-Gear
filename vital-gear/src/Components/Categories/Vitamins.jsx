import React, { useState, useEffect } from "react";
import Header from "../Header";
import Breadcrumb from "../Breadcrumb";
import ShopItem from "../ShopItem";
import Pagination from "../Pagination";
import Cart from "../Cart";
import Basics from "../Basics";
import fetchProducts from "../../../controllers/fetchProduct";

export default function Vitamins() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts("vitamin", setProducts, setLoading, setError);
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
                  " "
                }
                price={product.price?.productPrice || 0}
                onSale={product.price.onSale}
                id={product._id}
                category={"Vitamins"}
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
