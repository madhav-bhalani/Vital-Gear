import React, { useState, useEffect } from "react";
import Header from "../Header";
import Breadcrumb from "../Breadcrumb";
import ShopItem from "../ShopItem";
import Pagination from "../Pagination";
import Cart from "../Cart";
import Basics from "../Basics";
import SearchFilter from "../SearchFilter";
import fetchProducts from "../../../controllers/fetchProduct";

export default function Protein() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts("protein", setProducts, setLoading, setError);
  }, []);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>{error}</h1>;

  return (
    <>
      <Header />
      <div className="protein mx-6 md:mx-16 lg:mx-32 my-8 md:my-16">
        <Breadcrumb />
        <div className="py-5">
          <span className="flex items-center">
            <span className="pr-6 text-3xl md:text-4xl font-bold text-[#09274d]">
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
            VitalGear today!
          </p>
        </div>
        <div className="h-px bg-[#09274d] mt-3"></div>

        {/* Add SearchFilter component here */}
        <SearchFilter
          products={products}
          setFilteredProducts={setFilteredProducts}
        />

        <div className="flex flex-row flex-wrap gap-6 md:gap-10 my-5 justify-center md:justify-start">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
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
                category={"Proteins"}
              />
            ))
          ) : (
            <div className="w-full text-center py-12">
              <p className="text-xl text-[#09274d]">
                No products match your search criteria
              </p>
              <button
                onClick={() => setFilteredProducts(products)}
                className="mt-4 px-6 py-2 bg-[#09274d] text-white rounded-md font-bold hover:bg-[#395c87] transition-colors"
              >
                Reset Filters
              </button>
            </div>
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
