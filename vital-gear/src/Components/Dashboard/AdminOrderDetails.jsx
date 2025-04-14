import React, { useState } from 'react';

const AdminOrderDetails = () => {
  // Static sample data
  const order = {
    id: "ORD-12345",
    date: "2025-04-12T15:30:00",
    status: "Processing",
    paymentStatus: "Pending",
    paymentMethod: "Cash on Delivery (COD)",
    total: 239.97,
    shippingCost: 9.99,
    customer: {
      name: "Alex Johnson",
      email: "alex.johnson@example.com",
      phone: "+1 (555) 123-4567"
    },
    shippingAddress: {
      street: "123 Main Street",
      city: "Portland",
      state: "OR",
      zipCode: "97201",
      country: "United States"
    },
    items: [
      {
        id: "PROD-001",
        name: "Premium Coffee Beans",
        price: 24.99,
        quantity: 2,
        total: 49.98,
        image: "/api/placeholder/80/80"
      },
      {
        id: "PROD-015",
        name: "Ceramic Pour-Over Coffee Maker",
        price: 89.99,
        quantity: 1,
        total: 89.99,
        image: "/api/placeholder/80/80"
      },
      {
        id: "PROD-023",
        name: "Electric Coffee Grinder",
        price: 89.99,
        quantity: 1,
        total: 89.99,
        image: "/api/placeholder/80/80"
      }
    ]
  };

  // Status options
  const statusOptions = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];
  
  // State for the selected status
  const [selectedStatus, setSelectedStatus] = useState(order.status);

  // Format date
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  // Status badge color
  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Payment status badge color
  const getPaymentStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'refunded': return 'bg-purple-100 text-purple-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Handle status update
  const handleStatusUpdate = () => {
    // This would connect to your backend in the real implementation
    console.log(`Status updated to: ${selectedStatus}`);
    // For now, just show an alert
    alert(`Order status updated to: ${selectedStatus}`);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-6xl mx-auto">
      {/* Order Header */}
      <div className="border-b pb-6 mb-6" style={{ borderColor: '#dae0ef' }}>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-4">
          <h1 className="text-2xl font-bold" style={{ color: '#09274d' }}>Order Details</h1>
          <div className="flex items-center space-x-2">
            <button className="px-4 py-2 rounded hover:opacity-90 transition" 
                    style={{ backgroundColor: '#dae0ef', color: '#09274d' }}>
              Print Order
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <p className="text-sm" style={{ color: '#395c87' }}>Order ID</p>
            <p className="font-medium" style={{ color: '#09274d' }}>{order.id}</p>
          </div>
          <div>
            <p className="text-sm" style={{ color: '#395c87' }}>Order Date</p>
            <p className="font-medium" style={{ color: '#09274d' }}>{formatDate(order.date)}</p>
          </div>
          <div>
            <p className="text-sm" style={{ color: '#395c87' }}>Status</p>
            <div className="flex items-center space-x-2 mt-1">
              <select 
                value={selectedStatus} 
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="border rounded px-2 py-1 text-sm"
                style={{ borderColor: '#dae0ef', color: '#09274d' }}
              >
                {statusOptions.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
              <button 
                onClick={handleStatusUpdate}
                className="px-2 py-1 text-xs text-white rounded"
                style={{ backgroundColor: '#395c87' }}
              >
                Update
              </button>
            </div>
          </div>
          <div>
            <p className="text-sm" style={{ color: '#395c87' }}>Payment</p>
            <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getPaymentStatusColor(order.paymentStatus)}`}>
              {order.paymentStatus}
            </span>
          </div>
        </div>
      </div>

      {/* Customer Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <h2 className="text-lg font-semibold mb-2" style={{ color: '#09274d' }}>Customer Information</h2>
          <div className="p-4 rounded" style={{ backgroundColor: '#dae0ef' }}>
            <p className="font-medium" style={{ color: '#09274d' }}>{order.customer.name}</p>
            <p style={{ color: '#395c87' }}>{order.customer.email}</p>
            <p style={{ color: '#395c87' }}>{order.customer.phone}</p>
          </div>
        </div>
        
        <div>
          <h2 className="text-lg font-semibold mb-2" style={{ color: '#09274d' }}>Payment Method</h2>
          <div className="p-4 rounded" style={{ backgroundColor: '#dae0ef' }}>
            <p style={{ color: '#395c87' }}>{order.paymentMethod}</p>
          </div>
        </div>
      </div>

      {/* Shipping Address */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-2" style={{ color: '#09274d' }}>Shipping Address</h2>
        <div className="p-4 rounded" style={{ backgroundColor: '#dae0ef' }}>
          <p style={{ color: '#395c87' }}>{order.shippingAddress.street}</p>
          <p style={{ color: '#395c87' }}>
            {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
          </p>
          <p style={{ color: '#395c87' }}>{order.shippingAddress.country}</p>
        </div>
      </div>

      {/* Order Items */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4" style={{ color: '#09274d' }}>Order Items</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border" style={{ borderColor: '#dae0ef' }}>
            <thead style={{ backgroundColor: '#09274d' }}>
              <tr>
                <th className="py-2 px-4 border-b text-left text-white">Product</th>
                <th className="py-2 px-4 border-b text-right text-white">Price</th>
                <th className="py-2 px-4 border-b text-right text-white">Quantity</th>
                <th className="py-2 px-4 border-b text-right text-white">Total</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b" style={{ borderColor: '#dae0ef' }}>
                    <div className="flex items-center">
                      <img src={item.image} alt={item.name} className="w-12 h-12 mr-3 object-cover rounded" />
                      <div>
                        <p className="font-medium" style={{ color: '#09274d' }}>{item.name}</p>
                        <p className="text-sm" style={{ color: '#395c87' }}>SKU: {item.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-2 px-4 border-b text-right" style={{ borderColor: '#dae0ef', color: '#395c87' }}>
                    {formatCurrency(item.price)}
                  </td>
                  <td className="py-2 px-4 border-b text-right" style={{ borderColor: '#dae0ef', color: '#395c87' }}>
                    {item.quantity}
                  </td>
                  <td className="py-2 px-4 border-b text-right font-medium" style={{ borderColor: '#dae0ef', color: '#09274d' }}>
                    {formatCurrency(item.total)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Summary */}
      <div className="flex justify-end mb-6">
        <div className="w-full md:w-64">
          <div className="flex justify-between py-2">
            <span style={{ color: '#395c87' }}>Subtotal</span>
            <span style={{ color: '#09274d' }}>{formatCurrency(order.total - order.shippingCost)}</span>
          </div>
          <div className="flex justify-between py-2">
            <span style={{ color: '#395c87' }}>Shipping</span>
            <span style={{ color: '#09274d' }}>{formatCurrency(order.shippingCost)}</span>
          </div>
          <div className="flex justify-between py-2 font-semibold text-lg border-t" style={{ borderColor: '#dae0ef' }}>
            <span style={{ color: '#09274d' }}>Total</span>
            <span style={{ color: '#09274d' }}>{formatCurrency(order.total)}</span>
          </div>
        </div>
      </div>

      {/* Admin Actions */}
      <div className="border-t pt-6 flex flex-wrap gap-3 justify-end" style={{ borderColor: '#dae0ef' }}>
        <button className="px-4 py-2 text-white rounded hover:opacity-90 transition" style={{ backgroundColor: '#395c87' }}>
          Cancel Order
        </button>
      </div>
    </div>
  );
};

export default AdminOrderDetails;