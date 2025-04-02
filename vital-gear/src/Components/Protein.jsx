import React, { useState, useEffect } from "react";
import Header from "./Header";
import Breadcrumb from "./Breadcrumb";
import ShopItem from "./ShopItem";
import Pagination from "./Pagination";
import ShoppingCart from "./ShoppingCart";
import Basics from "./Basics";
import fetchProducts from "../../controllers/fetchProduct";
import { useModal } from "../ModalContext";

export default function Protein() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts("protein", setProducts, setLoading, setError);
  }, []);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>{error}</h1>;

  // const fetchProducts = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:3000/displayProducts/protein');
  //     // console.log('Fetched data:', response.data);
  //     const fetchedProducts = Array.isArray(response.data) ? response.data : response.data.data || [];
  //     setProducts(fetchedProducts);
  //     setLoading(false);
  //   } catch (err) {
  //     setError(err.message || 'Failed to fetch products');
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchProducts();
  // }, []);

  // if (loading) return <h1>Loading...</h1>;
  // if (error) return <h1>{error}</h1>;

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
            VitalGear today!
          </p>
        </div>
        <div className="h-px bg-[#09274d] mt-3"></div>

        <div className="flex flex-row flex-wrap gap-10 my-5">
          {products.length > 0 ? (
            products.map((product) => (
              <ShopItem
                key={product._id}
                image={product.images[0].url || "default-image-url"}
                title={`${product.brandName || "Unknown"} ${
                  product.productName || "Product"
                }`}
                size={product.sizes?.weight[1] || "N/A"}
                flavour={product.productDetails?.flavours?.[0] || "N/A"}
                price={product.price?.productPrice || 0}
                onSale={product.price.onSale}
                id = {product._id}
                category={"Proteins"}
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
      <ShoppingCart />
    </>
  );
}
