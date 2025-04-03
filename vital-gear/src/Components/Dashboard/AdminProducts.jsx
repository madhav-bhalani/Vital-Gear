import React, { useEffect, useState } from 'react';
import { Search, Edit, Trash, Filter, ArrowUpDown } from 'lucide-react';
import allProducts from '../../../controllers/Admin/allProducts';

export default function ProductDashboard() {
  // Minimal sample data (you'll replace this with MongoDB data)
  // const [products, setProducts] = useState([
  //   { id: 1, name: 'Premium Headphones', brand: 'AudioTech', category: 'Protein', sales: 342, rating: 4.7, revenue: 17100 },
  //   { id: 2, name: 'Ergonomic Chair', brand: 'ComfortPlus', category: 'Gainer', sales: 128, rating: 4.5, revenue: 15360 },
  // ]);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  // Basic categories
  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'Protein', name: 'Protein' },
    { id: 'Gainer', name: 'Gainer' },
    {id: 'pre-workout', name:'Pre Workout'},
    {id: 'post-workout', name:'Post Workout'},
    {id: 'vitamin', name:'Vitamin'},
    {id: 'active-wear', name:'Active Wear'}
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  // Handle search input
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    // In real implementation: Call your API to fetch filtered data
  };

  // Handle category selection
  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    // In real implementation: Call your API to fetch filtered data
  };

  // Handle sorting
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
    // In real implementation: Call your API to fetch sorted data
  };

  // Handle product deletion
  const handleDelete = (id) => {
    // In real implementation: Call your API to delete product
    console.log(`Delete product with ID: ${id}`);
  };

  // Handle product edit
  const handleEdit = (id) => {
    // In real implementation: Navigate to edit form or open modal
    console.log(`Edit product with ID: ${id}`);
  };

  // This is just for demo - you'll get these values from your API
  // const totalRevenue = 32460;
  // const categoryRevenues = {
  //   'all': 32460,
  //   'Protein': 17100,
  //   'Gainer': 15360
  // };


  useEffect(()=>{
    allProducts(setProducts, setLoading, setError);
  }, [])

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>{error}</h1>;

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Main Content */}
      <div className="p-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-6">Products Management</h2>
          
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
                  selectedCategory === category.id ? 'bg-[#395c87] text-white' : 'text-[#09274d]'
                }`}
              >
                {category.name}
                {/* <span className="ml-2 text-xs font-medium">
                  ${(categoryRevenues[category.id] / 1000).toFixed(1)}K
                </span> */}
              </button>
            ))}
          </div>
          
          {/* Products List */}
          <div className="overflow-x-auto">
            <div className="mb-4 flex justify-between items-center">
              <p className="text-sm text-gray-500">
                Showing {products.length} products
              </p>
              {/* <p className="text-sm font-medium">
                Total Revenue: <span className="text-[#09274d] font-bold">${totalRevenue.toLocaleString()}</span>
              </p> */}
            </div>
            
            <table className="w-full text-sm text-left border-collapse">
              <thead className="text-xs uppercase bg-[#dae0ef] text-[#09274d]">
                <tr>
                  <th onClick={() => requestSort('name')} className="px-6 py-3 cursor-pointer">
                    <div className="flex items-center">
                      Product Name
                      <ArrowUpDown size={14} className="ml-1" />
                    </div>
                  </th>
                  <th onClick={() => requestSort('brand')} className="px-6 py-3 cursor-pointer">
                    <div className="flex items-center">
                      Brand
                      <ArrowUpDown size={14} className="ml-1" />
                    </div>
                  </th>
                  <th onClick={() => requestSort('category')} className="px-6 py-3 cursor-pointer">
                    <div className="flex items-center">
                      Category
                      <ArrowUpDown size={14} className="ml-1" />
                    </div>
                  </th>
                  {/* <th onClick={() => requestSort('sales')} className="px-6 py-3 cursor-pointer">
                    <div className="flex items-center">
                      Sales
                      <ArrowUpDown size={14} className="ml-1" />
                    </div>
                  </th> */}
                  <th onClick={() => requestSort('rating')} className="px-6 py-3 cursor-pointer">
                    <div className="flex items-center">
                      Rating
                      <ArrowUpDown size={14} className="ml-1" />
                    </div>
                  </th>
                  <th onClick={() => requestSort('stock')} className="px-6 py-3 cursor-pointer">
                    <div className="flex items-center">
                      Stock
                      <ArrowUpDown size={14} className="ml-1" />
                    </div>
                  </th>
                  {/* <th onClick={() => requestSort('revenue')} className="px-6 py-3 cursor-pointer">
                    <div className="flex items-center">
                      Revenue
                      <ArrowUpDown size={14} className="ml-1" />
                    </div>
                  </th> */}
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="bg-white border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{product.productName}</td>
                    <td className="px-6 py-4">{product.brandName}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-[#dae0ef] text-[#09274d] rounded-full text-xs">
                        {product.category}
                      </span>
                    </td>
                    {/* <td className="px-6 py-4">{product.sales}</td> */}
                    
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <span className="text-yellow-500">★</span>
                        <span className="ml-1">{product.rating.toFixed(1)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">{product.stock?.quantity}</td>
                    {/* <td className="px-6 py-4 font-medium">${product.revenue.toLocaleString()}</td> */}
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
                {products.length === 0 && (
                  <tr className="bg-white border-b">
                    <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
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