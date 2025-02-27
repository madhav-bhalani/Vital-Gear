import React from "react";
import ProductsBS from "./ProductsBS";

function BestSelling() {
  let items = [1, 2, 3, 4, 5];
  return (
    <>
      <div className="flex flex-col gap-10 p-5">
        <div>
          <p className="uppercase text-4xl text-center font-extrabold text-[#09274d]">
            best selling products
          </p>
        </div>
        <div className="flex flex-row gap-5 p-5">
          {items.map((product, i) => {
            return <ProductsBS key={i} />;
          })}
        </div>
      </div>
    </>
  );
}

export default BestSelling;
