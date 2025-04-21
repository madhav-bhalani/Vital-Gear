import axios from "axios";

const checkout = async (setUser, setCartItems, setLoading, setError) => {
  try {
    setLoading(true);
    const response = await axios.get(
      "http://localhost:3000/shopping/checkout",
      {
        withCredentials: true,
        headers: {
          "Cache-Control": "no-cache",
        },
      }
    );
    console.log("Server response:", response.data);
    const fetchedCartItems = Array.isArray(response.data.cartItems)
      ? response.data.cartItems
      : response.data.data.cartItems || [];
    const fetchedUser = Array.isArray(response.data.userData)
      ? response.data.userData
      : response.data.data.userData || [];
    setCartItems(fetchedCartItems);
    setUser(fetchedUser);
    console.log("Fetched cart items:", fetchedUser);
    // console.log("Fetched user data:", fetchedUser);
  } catch (err) {
    setError(err.message || "Failed to fetch checkout information");
  } finally {
    setLoading(false);
  }
};

export default checkout;
