import axios from "axios";

const allProducts = async (setProducts, setLoading, setError) => {
    try{
        setLoading(true);
        const response = await axios.get(`http://localhost:3000/products`);
        const fetchedProducts = Array.isArray(response.data)
         ? response.data
         : response.data.data || [];
        setProducts(fetchedProducts);
        console.log(fetchedProducts);
    } catch(err){
        setError(err.message || 'Failed to fetch products');
    } finally{
        setLoading(false);
    }
};

export default allProducts;
