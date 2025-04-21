import React, { useState, useEffect } from "react";
import Header from "../Header";
import Breadcrumb from "../Breadcrumb";
import ShopItem from "../ShopItem";
import Pagination from "../Pagination";
import Basics from "../Basics";
import fetchProducts from "../../../controllers/fetchProduct";
import Cart from "../Cart";

export default function ActiveWear() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts("active-wear", setProducts, setLoading, setError);
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
              VitalGear Active Wear
            </span>
            <span className="h-px flex-1 bg-[#09274d]"></span>
          </span>
        </div>
        <div className="py-3">
          <p className="text-left text-gray-500">
            VitalGear Activewear is a range of trendy gym clothes that are
            crafted to ensure greater comfort while engaging in physical fitness
            activities. These clothes are made of poly-spandex, a fabric that
            dries quickly and feels super soft on your skin. Moreover, they are
            highly stretchable, which makes them ideal for rigorous sports and
            exercises such as squats and running. Adding cherry to the top, they
            are also highly affordable.
          </p>
        </div>
        <div className="h-px bg-[#09274d] mt-3"></div>

        {/* <div className="flex flex-row flex-wrap gap-10 my-5">
          {shopItem.map((product, i) => {
            return (
              <ShopItem
                key={i}
                image="/products/compression.webp"
                title="VitalGear Compression Tee Full Sleeve"
                size="Medium"
                flavour="Midnight Black"
                price="1199"
              />
            );
          })}
        </div> */}
        <div className="flex flex-row flex-wrap gap-10 my-5">
          {products.length > 0 ? (
            products.map((product) => (
              <ShopItem
                key={product._id}
                image={product.images[0].url || " "}
                title={`${product.brandName || " "} ${
                  product.productName || " "
                }`}
                size={
                  product.sizes?.shirtSize[1] ||
                  " "
                }
                flavour={
                  product.productDetails?.colors[0] ||
                  " "
                }
                price={product.price?.productPrice || 0}
                onSale={product.price.onSale}
                id={product._id}
                category={"Active Wear"}
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
