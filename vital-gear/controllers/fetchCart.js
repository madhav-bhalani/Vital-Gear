import axios from "axios";

const fetchCart = async (setCartItems, setLoading, setError) => {
  try {
    setLoading(true);
    const response = await axios.get("http://localhost:3000/shopping/cart", {
      withCredentials: true,
    });
    console.log("Server response:", response.data);
    const fetchedCartItems = Array.isArray(response.data.cartItems)
      ? response.data.cartItems
      : response.data.data.cartItems || [];
    setCartItems(fetchedCartItems);
  } catch (err) {
    setError(err.message || "Failed to fetch cart items");
  } finally {
    setLoading(false);
  }
};

export default fetchCart;
