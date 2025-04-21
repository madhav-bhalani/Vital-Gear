import axios from "axios";

const orderDetails = async (orderId, setOrderDetails, setLoading, setError) => {
  try {
    setLoading(true);
    const response = await axios.get(`http://localhost:3000/orders/details/${orderId}`, {
      withCredentials: true,
    });
    console.log("Fetched order details: ", response.data.order); // Debugging
    setOrderDetails(response.data.order); // Set the order object directly
  } catch (err) {
    console.error("Error fetching order details: ", err);
    setError(err.message || "Failed to fetch order details");
  } finally {
    setLoading(false);
  }
};

export default orderDetails;