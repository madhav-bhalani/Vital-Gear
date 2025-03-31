import axios from "axios";
import React, { useState } from "react";
import "./AddProduct.jsx";

export default function AddProduct() {
  const [productCategory, setProductCategory] = useState("");

  // Handle category change to show relevant fields
  const handleCategoryChange = (e) => {
    setProductCategory(e.target.value);
  };

  // Determine if it's a supplement product
  const isSupplement = [
    "protein",
    "gainer",
    "pre-workout",
    "post-workout",
    "vitamin",
  ].includes(productCategory);

  // Determine if it's activewear
  const isActiveWear = productCategory === "active-wear";

  // Handle form submission

  return (
    <>
      <div className="container mx-auto py-8 px-4">
        <form
          action="http://localhost:3000/products/new"
          method="post"
          className="bg-[#dae0ef] mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 max-w-3xl mx-auto"
          encType="multipart/form-data"
        >
          <h1 className="text-center text-2xl font-bold text-[#09274d] sm:text-3xl">
            Add New Product
          </h1>

          <p className="text-center text-lg font-semibold">
            Product Information
          </p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="productName"
                className="block text-sm font-medium text-gray-700"
              >
                Product Name
              </label>
              <input
                type="text"
                id="productName"
                name="productName"
                className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
                placeholder="Product Name"
                required
              />
            </div>
            <div>
              <label
                htmlFor="brandName"
                className="block text-sm font-medium text-gray-700"
              >
                Brand Name
              </label>
              <input
                type="text"
                id="brandName"
                name="brandName"
                className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
                placeholder="Brand Name"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
              required
              onChange={handleCategoryChange}
              value={productCategory}
            >
              <option value="">Select a category</option>
              <option value="protein">Protein</option>
              <option value="gainer">Gainer</option>
              <option value="pre-workout">Pre-Workout</option>
              <option value="post-workout">Post-Workout</option>
              <option value="vitamin">Vitamin</option>
              <option value="active-wear">Active Wear</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="productDetails.description"
              className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
              placeholder="Product Description"
              rows="3"
            ></textarea>
          </div>

          {isActiveWear && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Colors (Active Wear)
              </label>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 mt-2">
                {["white", "black", "red", "navy blue", "grey"].map((color) => (
                  <label key={color} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="productDetails.colors"
                      value={color}
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm">
                      {color.charAt(0).toUpperCase() + color.slice(1)}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {isSupplement && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Flavours (Supplements)
              </label>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 mt-2">
                {["chocolate", "strawberry", "mango", "unflavoured"].map(
                  (flavor) => (
                    <label key={flavor} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="productDetails.flavours"
                        value={flavor}
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm">
                        {flavor.charAt(0).toUpperCase() + flavor.slice(1)}
                      </span>
                    </label>
                  )
                )}
              </div>
            </div>
          )}

          {isActiveWear && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Shirt Sizes
              </label>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-5 mt-2">
                {["s", "m", "l", "xl", "2xl"].map((size) => (
                  <label key={size} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="sizes.shirtSize"
                      value={size}
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm uppercase">{size}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {isSupplement && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Weight Options (grams)
              </label>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-5 mt-2">
                {[250, 500, 1000, 2000, 4000].map((weight) => (
                  <label key={weight} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="sizes.weight"
                      value={weight}
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm">{weight}g</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          <div>
            <label
              htmlFor="productImages"
              className="block text-sm font-medium text-gray-700"
            >
              Upload Slider Images
            </label>
            <input
              type="file"
              id="productImages"
              name="productImages"
              className="w-full rounded-lg bg-[white] border-gray-200 p-4 text-sm shadow-sm"
              placeholder="image1.jpg, image2.jpg, image3.jpg"
              multiple
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="productPrice"
                className="block text-sm font-medium text-gray-700"
              >
                Product Price (₹)
              </label>
              <input
                type="number"
                id="productPrice"
                name="price.productPrice"
                className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
                placeholder="0.00"
                min="0"
                step="0.01"
                required
              />
            </div>
            <div>
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-gray-700"
              >
                Stock Quantity
              </label>
              <input
                type="number"
                id="quantity"
                name="stock.quantity"
                className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
                placeholder="0"
                min="0"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="onSale"
                name="price.onSale"
                className="rounded border-gray-300"
                value={true}
              />
              <label
                htmlFor="onSale"
                className="ml-2 text-sm font-medium text-gray-700"
              >
                On Sale
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="inStock"
                name="stock.inStock"
                className="rounded border-gray-300"
                value={true}
                defaultChecked
              />
              <label
                htmlFor="inStock"
                className="ml-2 text-sm font-medium text-gray-700"
              >
                In Stock
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="block w-full rounded-lg bg-[#09274d] px-5 py-3 text-sm font-semibold text-white"
          >
            Add Product
          </button>
        </form>
      </div>
    </>
  );
}
