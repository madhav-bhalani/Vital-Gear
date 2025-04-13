import axios from "axios";

const allOrders = async (setOrders, setLoading, setError) => {
  try {
    setLoading(true);
    const response = await axios.get(`http://localhost:3000/getOrders`);
    const fetchedOrders = Array.isArray(response.data)
      ? response.data
      : response.data.data || [];
    setOrders(fetchedOrders);
    console.log(fetchedOrders);
  } catch (err) {
    setError(err.message || "Failed to fetch orders");
  } finally {
    setLoading(false);
  }
};

export default allOrders;
