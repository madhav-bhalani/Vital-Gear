import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import orderDetails from "../../../controllers/Admin/orderDetails";

const AdminOrderDetails = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { orderId } = useParams();

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  useEffect(() => {
    if (orderId) {
      orderDetails(orderId, setOrder, setLoading, setError);
    }
  }, [orderId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!order) return <p>No order details available.</p>;

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-6xl mx-auto">
      {/* Order Header */}
      <div className="border-b pb-6 mb-6" style={{ borderColor: "#dae0ef" }}>
        <h1 className="text-2xl font-bold" style={{ color: "#09274d" }}>
          Order Details
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <p className="text-sm" style={{ color: "#395c87" }}>
              Order ID
            </p>
            <p className="font-medium" style={{ color: "#09274d" }}>
              {order._id}
            </p>
          </div>
          <div>
            <p className="text-sm" style={{ color: "#395c87" }}>
              Order Date
            </p>
            <p className="font-medium" style={{ color: "#09274d" }}>
              {formatDate(order.createdAt)}
            </p>
          </div>
          <div>
            <p className="text-sm" style={{ color: "#395c87" }}>
              Status
            </p>
            <p className="font-medium" style={{ color: "#09274d" }}>
              {order.orderStatus}
            </p>
          </div>
          <div>
            <p className="text-sm" style={{ color: "#395c87" }}>
              Total Amount
            </p>
            <p className="font-medium" style={{ color: "#09274d" }}>
              {formatCurrency(order.orderAmount)}
            </p>
          </div>
        </div>
      </div>

      {/* Customer Information */}
      {/* Customer Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <h2
            className="text-lg font-semibold mb-2"
            style={{ color: "#09274d" }}
          >
            Customer Information
          </h2>
          <div className="p-4 rounded" style={{ backgroundColor: "#dae0ef" }}>
            <p className="font-medium" style={{ color: "#09274d" }}>
              {order.user?.firstName || "N/A"} {order.user?.lastName || ""}
            </p>
            <p style={{ color: "#395c87" }}>{order.user?.email || "N/A"}</p>
            <p style={{ color: "#395c87" }}>{order.user?.phone || "N/A"}</p>
          </div>
        </div>

        <div>
          <h2
            className="text-lg font-semibold mb-2"
            style={{ color: "#09274d" }}
          >
            Shipping Address
          </h2>
          <div className="p-4 rounded" style={{ backgroundColor: "#dae0ef" }}>
            <p style={{ color: "#395c87" }}>
              {order.shippingAddress?.house || "N/A"},{" "}
              {order.shippingAddress?.apartment || ""}
            </p>
            <p style={{ color: "#395c87" }}>
              {order.shippingAddress?.area || "N/A"}
            </p>
            <p style={{ color: "#395c87" }}>
              {order.shippingAddress?.city || "N/A"},{" "}
              {order.shippingAddress?.state || "N/A"}{" "}
              {order.shippingAddress?.zipcode || ""}
            </p>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4" style={{ color: "#09274d" }}>
          Order Items
        </h2>
        <div className="overflow-x-auto">
          <table
            className="min-w-full bg-white border"
            style={{ borderColor: "#dae0ef" }}
          >
            <thead style={{ backgroundColor: "#09274d" }}>
              <tr>
                <th className="py-2 px-4 border-b text-left text-white">
                  Product
                </th>
                <th className="py-2 px-4 border-b text-right text-white">
                  Price
                </th>
                <th className="py-2 px-4 border-b text-right text-white">
                  Quantity
                </th>
                <th className="py-2 px-4 border-b text-right text-white">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {order.orderItems?.length > 0 ? (
                order.orderItems.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50">
                    <td
                      className="py-2 px-4 border-b"
                      style={{ borderColor: "#dae0ef" }}
                    >
                      <div className="flex items-center">
                        <img
                          src={item.productId?.images?.[0]?.url || ""}
                          alt={item.productId?.productName || "Product Image"}
                          className="w-12 h-12 mr-3 object-cover rounded"
                        />
                        <div>
                          <p
                            className="font-medium"
                            style={{ color: "#09274d" }}
                          >
                            {item.productId?.productName || "N/A"}
                          </p>
                          <p className="text-sm" style={{ color: "#395c87" }}>
                            SKU: {item.productId?._id || "N/A"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td
                      className="py-2 px-4 border-b text-right"
                      style={{ borderColor: "#dae0ef", color: "#395c87" }}
                    >
                      {formatCurrency(item.productId?.price?.productPrice || 0)}
                    </td>
                    <td
                      className="py-2 px-4 border-b text-right"
                      style={{ borderColor: "#dae0ef", color: "#395c87" }}
                    >
                      {item.itemQuantity || 0}
                    </td>
                    <td
                      className="py-2 px-4 border-b text-right font-medium"
                      style={{ borderColor: "#dae0ef", color: "#09274d" }}
                    >
                      {formatCurrency(
                        (item.productId?.price?.productPrice || 0) *
                          (item.itemQuantity || 0)
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-500">
                    No items found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetails;
