import axios from "axios";

const fetchProducts = async (category, setProducts, setLoading, setError) => {
  try {
    setLoading(true);
    const response = await axios.get(
      `http://localhost:3000/products/category/${category}`
    );
    const fetchedProducts = Array.isArray(response.data)
      ? response.data
      : response.data.data || [];
    setProducts(fetchedProducts);
  } catch (err) {
    setError(err.message || "Failed to fetch products");
  } finally {
    setLoading(false);
  }
};

export default fetchProducts;
