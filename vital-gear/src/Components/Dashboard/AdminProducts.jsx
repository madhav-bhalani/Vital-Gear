import { useState } from "react";
import { Search, Edit, Trash, Filter, ArrowUpDown } from "lucide-react";

export default function ProductDashboard() {
  // Sample product data
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Premium Headphones",
      brand: "AudioTech",
      category: "Electronics",
      sales: 342,
      rating: 4.7,
      revenue: 17100,
    },
    {
      id: 2,
      name: "Ergonomic Chair",
      brand: "ComfortPlus",
      category: "Furniture",
      sales: 128,
      rating: 4.5,
      revenue: 15360,
    },
    {
      id: 3,
      name: "Organic Coffee Beans",
      brand: "BeanMaster",
      category: "Food & Beverage",
      sales: 521,
      rating: 4.8,
      revenue: 7815,
    },
    {
      id: 4,
      name: "Wireless Keyboard",
      brand: "TechGear",
      category: "Electronics",
      sales: 215,
      rating: 4.3,
      revenue: 6450,
    },
    {
      id: 5,
      name: "Smart Watch",
      brand: "TechGear",
      category: "Electronics",
      sales: 187,
      rating: 4.6,
      revenue: 28050,
    },
    {
      id: 6,
      name: "Leather Sofa",
      brand: "ComfortPlus",
      category: "Furniture",
      sales: 42,
      rating: 4.4,
      revenue: 37800,
    },
    {
      id: 7,
      name: "Premium Protein Powder",
      brand: "FitLife",
      category: "Health",
      sales: 312,
      rating: 4.2,
      revenue: 12480,
    },
    {
      id: 8,
      name: "Yoga Mat",
      brand: "FitLife",
      category: "Health",
      sales: 245,
      rating: 4.7,
      revenue: 4900,
    },
  ]);

  // Category data with revenue calculations
  const categories = [
    { id: "all", name: "All Products" },
    { id: "Electronics", name: "Electronics" },
    { id: "Furniture", name: "Furniture" },
    { id: "Food & Beverage", name: "Food & Beverage" },
    { id: "Health", name: "Health" },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  // Handle search input
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle category selection
  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  // Handle sorting
  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Handle product deletion
  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((product) => product.id !== id));
    }
  };

  // Handle product edit
  const handleEdit = (id) => {
    // In a real application, this would open an edit form
    alert(`Edit product with ID: ${id}`);
  };

  // Filter and sort products
  const filteredProducts = products.filter(
    (product) =>
      (selectedCategory === "all" || product.category === selectedCategory) &&
      (product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (!sortConfig.key) return 0;

    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  // Calculate total revenue for the current filtered products
  const totalRevenue = sortedProducts.reduce(
    (sum, product) => sum + product.revenue,
    0
  );

  // Calculate category revenues
  const categoryRevenues = {};
  categories.forEach((category) => {
    if (category.id === "all") {
      categoryRevenues[category.id] = products.reduce(
        (sum, product) => sum + product.revenue,
        0
      );
    } else {
      categoryRevenues[category.id] = products
        .filter((product) => product.category === category.id)
        .reduce((sum, product) => sum + product.revenue, 0);
    }
  });

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main Content */}
      <div className="p-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-6 text-[#09274d]">
            Products Management
          </h2>

          {/* Search Bar */}
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={18} className="text-gray-500" />
            </div>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5"
              placeholder="Search products by name or brand..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          {/* Category Navigation */}
          <div className="flex overflow-x-auto bg-[#dae0ef] rounded-lg p-1 mb-6">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategorySelect(category.id)}
                className={`px-4 py-2 rounded-md whitespace-nowrap mx-1 ${
                  selectedCategory === category.id
                    ? "bg-[#395c87] text-white"
                    : "text-[#09274d]"
                }`}
              >
                {category.name}
                <span className="ml-2 text-xs font-medium">
                  ${(categoryRevenues[category.id] / 1000).toFixed(1)}K
                </span>
              </button>
            ))}
          </div>

          {/* Products List */}
          <div className="overflow-x-auto">
            <div className="mb-4 flex justify-between items-center">
              <p className="text-sm text-gray-500">
                Showing {sortedProducts.length} products
              </p>
              <p className="text-sm font-medium">
                Total Revenue:{" "}
                <span className="text-[#09274d] font-bold">
                  ${totalRevenue.toLocaleString()}
                </span>
              </p>
            </div>

            <table className="w-full text-sm text-left border-collapse">
              <thead className="text-xs uppercase bg-[#dae0ef] text-[#09274d]">
                <tr>
                  <th
                    onClick={() => requestSort("name")}
                    className="px-6 py-3 cursor-pointer"
                  >
                    <div className="flex items-center">
                      Product Name
                      <ArrowUpDown size={14} className="ml-1" />
                    </div>
                  </th>
                  <th
                    onClick={() => requestSort("brand")}
                    className="px-6 py-3 cursor-pointer"
                  >
                    <div className="flex items-center">
                      Brand
                      <ArrowUpDown size={14} className="ml-1" />
                    </div>
                  </th>
                  <th
                    onClick={() => requestSort("category")}
                    className="px-6 py-3 cursor-pointer"
                  >
                    <div className="flex items-center">
                      Category
                      <ArrowUpDown size={14} className="ml-1" />
                    </div>
                  </th>
                  <th
                    onClick={() => requestSort("sales")}
                    className="px-6 py-3 cursor-pointer"
                  >
                    <div className="flex items-center">
                      Sales
                      <ArrowUpDown size={14} className="ml-1" />
                    </div>
                  </th>
                  <th
                    onClick={() => requestSort("rating")}
                    className="px-6 py-3 cursor-pointer"
                  >
                    <div className="flex items-center">
                      Rating
                      <ArrowUpDown size={14} className="ml-1" />
                    </div>
                  </th>
                  <th
                    onClick={() => requestSort("revenue")}
                    className="px-6 py-3 cursor-pointer"
                  >
                    <div className="flex items-center">
                      Revenue
                      <ArrowUpDown size={14} className="ml-1" />
                    </div>
                  </th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="bg-white border-b hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {product.name}
                    </td>
                    <td className="px-6 py-4">{product.brand}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-[#dae0ef] text-[#09274d] rounded-full text-xs">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">{product.sales}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <span className="text-yellow-500">★</span>
                        <span className="ml-1">
                          {product.rating.toFixed(1)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium">
                      ${product.revenue.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(product.id)}
                          className="p-1 text-blue-600 hover:bg-blue-100 rounded-md"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-1 text-red-600 hover:bg-red-100 rounded-md"
                        >
                          <Trash size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {sortedProducts.length === 0 && (
                  <tr className="bg-white border-b">
                    <td
                      colSpan="7"
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      No products found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
