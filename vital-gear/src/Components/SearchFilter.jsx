import React, { useState, useEffect } from "react";
import { FaSearch, FaFilter, FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function SearchFilter({ products, setFilteredProducts }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("default");
  const [showFilters, setShowFilters] = useState(false);

  // Extract filter options from products
  const [filterOptions, setFilterOptions] = useState({
    brands: [],
    flavours: [],
    sizes: [],
  });

  // Selected filters
  const [selectedFilters, setSelectedFilters] = useState({
    brands: [],
    flavours: [],
    sizes: [],
  });

  // Extract unique filter options when products change
  useEffect(() => {
    if (!products || products.length === 0) return;

    const brands = [
      ...new Set(products.map((product) => product.brandName || "Unknown")),
    ];

    const flavours = [
      ...new Set(
        products.flatMap((product) => product.productDetails?.flavours || [])
      ),
    ];

    const sizes = [
      ...new Set(
        products
          .flatMap((product) => product.sizes?.weight || [])
          .filter(Boolean)
      ),
    ].sort((a, b) => a - b);

    setFilterOptions({
      brands,
      flavours,
      sizes,
    });
  }, [products]);

  // Apply filters and search
  useEffect(() => {
    if (!products || products.length === 0) return;

    let filtered = [...products];

    // Apply search
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          (product.productName?.toLowerCase() || "").includes(
            searchTerm.toLowerCase()
          ) ||
          (product.brandName?.toLowerCase() || "").includes(
            searchTerm.toLowerCase()
          )
      );
    }

    // Apply brand filter
    if (selectedFilters.brands.length > 0) {
      filtered = filtered.filter((product) =>
        selectedFilters.brands.includes(product.brandName || "Unknown")
      );
    }

    // Apply flavour filter
    if (selectedFilters.flavours.length > 0) {
      filtered = filtered.filter((product) =>
        product.productDetails?.flavours?.some((flavour) =>
          selectedFilters.flavours.includes(flavour)
        )
      );
    }

    // Apply size filter
    if (selectedFilters.sizes.length > 0) {
      filtered = filtered.filter((product) =>
        product.sizes?.weight?.some((size) =>
          selectedFilters.sizes.includes(size)
        )
      );
    }

    // Apply sorting
    if (sortOption === "price-low-high") {
      filtered.sort(
        (a, b) => (a.price?.productPrice || 0) - (b.price?.productPrice || 0)
      );
    } else if (sortOption === "price-high-low") {
      filtered.sort(
        (a, b) => (b.price?.productPrice || 0) - (a.price?.productPrice || 0)
      );
    }

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedFilters, sortOption, setFilteredProducts]);

  // Handle filter selection
  const handleFilterChange = (type, value) => {
    setSelectedFilters((prev) => {
      const current = [...prev[type]];
      if (current.includes(value)) {
        return { ...prev, [type]: current.filter((item) => item !== value) };
      } else {
        return { ...prev, [type]: [...current, value] };
      }
    });
  };

  return (
    <div className="mb-8 mt-6">
      {/* Search and Sort Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center mb-4">
        {/* Search Input */}
        <div className="relative w-full md:w-2/3">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 pl-12 rounded-md border-2 border-[#09274d] bg-[#dae0ef] text-[#09274d] placeholder-[#395c87] focus:outline-none focus:ring-2 focus:ring-[#395c87]"
          />
          <FaSearch className="absolute left-4 top-4 text-[#09274d]" />
        </div>

        {/* Sort Dropdown */}
        <div className="relative w-full md:w-1/3">
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="w-full appearance-none px-4 py-3 rounded-md border-2 border-[#09274d] bg-[#dae0ef] text-[#09274d] focus:outline-none focus:ring-2 focus:ring-[#395c87] cursor-pointer"
          >
            <option value="default">Default Sorting</option>
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
          </select>
          <FaChevronDown className="absolute right-4 top-4 text-[#09274d]" />
        </div>
      </div>

      {/* Filter Toggle Button */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="flex items-center gap-2 px-4 py-2 bg-[#09274d] text-white rounded-md font-bold mb-2 hover:bg-[#395c87] transition-colors"
      >
        <FaFilter />
        {showFilters ? "Hide Filters" : "Show Filters"}
        {showFilters ? <FaChevronUp /> : <FaChevronDown />}
      </button>

      {/* Filter Options */}
      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 bg-[#dae0ef] rounded-md border-2 border-[#09274d]">
          {/* Brand Filter */}
          <div>
            <h3 className="font-bold text-lg text-[#09274d] mb-2">Brand</h3>
            <div className="flex flex-col gap-2 max-h-60 overflow-y-auto">
              {filterOptions.brands.map((brand) => (
                <label
                  key={brand}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedFilters.brands.includes(brand)}
                    onChange={() => handleFilterChange("brands", brand)}
                    className="w-4 h-4 accent-[#09274d]"
                  />
                  <span className="text-[#09274d]">{brand}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Flavour Filter */}
          <div>
            <h3 className="font-bold text-lg text-[#09274d] mb-2">Flavour</h3>
            <div className="flex flex-col gap-2 max-h-60 overflow-y-auto">
              {filterOptions.flavours.map((flavour) => (
                <label
                  key={flavour}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedFilters.flavours.includes(flavour)}
                    onChange={() => handleFilterChange("flavours", flavour)}
                    className="w-4 h-4 accent-[#09274d]"
                  />
                  <span className="text-[#09274d]">{flavour}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Size Filter */}
          <div>
            <h3 className="font-bold text-lg text-[#09274d] mb-2">Size</h3>
            <div className="flex flex-col gap-2 max-h-60 overflow-y-auto">
              {filterOptions.sizes.map((size) => (
                <label
                  key={size}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedFilters.sizes.includes(size)}
                    onChange={() => handleFilterChange("sizes", size)}
                    className="w-4 h-4 accent-[#09274d]"
                  />
                  <span className="text-[#09274d]">{size}g</span>
                </label>
              ))}
            </div>
          </div>

          {/* Filter Actions */}
          <div className="md:col-span-3 flex justify-end gap-3 mt-4">
            <button
              onClick={() =>
                setSelectedFilters({ brands: [], flavours: [], sizes: [] })
              }
              className="px-4 py-2 bg-white text-[#09274d] border-2 border-[#09274d] rounded-md font-bold hover:bg-[#dae0ef] transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
