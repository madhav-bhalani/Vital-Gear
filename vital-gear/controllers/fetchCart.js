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
    if (err.response && err.response.status === 401) {
      // User is logged out, fetch cart from localStorage
      const localCart = JSON.parse(localStorage.getItem("cartItems")) || [];
      // setCartItems(localCart);
      if(localCart.length > 0){
        const productDetails = await Promise.all(
          localCart.map(async (item) => {
            const response = await axios.get(
              `http://localhost:3000/products/${item.productId}`,
              { withCredentials: true }
            );
            return {
              ...response.data,
              itemQuantity: item.itemQuantity,
            };
          })
        );
        setCartItems(productDetails);
      } else{
        setCartItems([]);
      }
    } else {
      // Handle other errors
      setError(err.message || "An error occurred while fetching the cart.");
    }
  } finally {
    setLoading(false);
  }
};

export default fetchCart;
