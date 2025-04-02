import axios from "axios";

const singleProduct = async (productId, setLoading, setProducts, setError)=>{
    try{
        console.log("this is id "+productId);
        // setLoading(true);
        console.log('products loading...');
        const response = await axios.get(`http://localhost:3000/products/${productId}`);
        if (response.data && typeof response.data === 'object') {
            setProducts(response.data);
            console.log(response.data);
        } else {
            throw new Error("Invalid response data");
        }
    }catch(err){
        setError(err.message || "Failed to fetch product"); 
    }
    finally{
        setLoading(false);
    }
};

export default singleProduct;