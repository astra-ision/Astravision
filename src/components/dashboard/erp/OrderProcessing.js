'use client';

import { useState, useEffect } from 'react';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
export default function OrderProcessing() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    items: [{ product: '', quantity: 1, price: 0 }],
    shippingAddress: '',
    paymentMethod: 'Credit Card',
    notes: ''
  });

  const statusOptions = [
    { id: 'pending', name: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
    { id: 'processing', name: 'Processing', color: 'bg-blue-100 text-blue-800' },
    { id: 'shipped', name: 'Shipped', color: 'bg-purple-100 text-purple-800' },
    { id: 'delivered', name: 'Delivered', color: 'bg-green-100 text-green-800' },
    { id: 'canceled', name: 'Canceled', color: 'bg-red-100 text-red-800' }
  ];

  const paymentStatusOptions = [
    { id: 'pending', name: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
    { id: 'paid', name: 'Paid', color: 'bg-green-100 text-green-800' },
    { id: 'refunded', name: 'Refunded', color: 'bg-red-100 text-red-800' }
  ];

  useEffect(() => {
    // In a real app, you would fetch orders from the API
    // Simulating API call with setTimeout
    setTimeout(() => {
      setOrders([
        {
          id: 'ORD-2023-1001',
          customerName: 'John Smith',
          customerEmail: 'john@example.com',
          items: [
            { product: 'Laptop - Dell XPS 15', quantity: 1, price: 1299.99 },
            { product: 'Wireless Mouse', quantity: 1, price: 24.99 }
          ],
          total: 1324.98,
          status: 'delivered',
          paymentStatus: 'paid',
          paymentMethod: 'Credit Card',
          shippingAddress: '123 Main St, City, State, 12345',
          orderDate: '2023-02-15',
          deliveryDate: '2023-02-20',
          notes: ''
        },
        {
          id: 'ORD-2023-1002',
          customerName: 'Jane Doe',
          customerEmail: 'jane@example.com',
          items: [
            { product: 'Office Chair - Ergonomic', quantity: 2, price: 249.99 }
          ],
          total: 499.98,
          status: 'shipped',
          paymentStatus: 'paid',
          paymentMethod: 'PayPal',
          shippingAddress: '456 Oak Ave, Town, State, 54321',
          orderDate: '2023-03-01',
          deliveryDate: null,
          notes: 'Please leave at the front door'
        },
        {
          id: 'ORD-2023-1003',
          customerName: 'Mike Johnson',
          customerEmail: 'mike@example.com',
          items: [
            { product: 'Printer Paper - A4', quantity: 5, price: 4.99 },
            { product: 'Network Switch - 24 Port', quantity: 1, price: 179.99 }
          ],
          total: 204.94,
          status: 'processing',
          paymentStatus: 'pending',
          paymentMethod: 'Bank Transfer',
          shippingAddress: '789 Pine St, Village, State, 67890',
          orderDate: '2023-03-05',
          deliveryDate: null,
          notes: ''
        },
        {
          id: 'ORD-2023-1004',
          customerName: 'Sarah Lee',
          customerEmail: 'sarah@example.com',
          items: [
            { product: 'Conference Table', quantity: 1, price: 899.99 }
          ],
          total: 899.99,
          status: 'pending',
          paymentStatus: 'pending',
          paymentMethod: 'Credit Card',
          shippingAddress: '101 Elm St, County, State, 45678',
          orderDate: '2023-03-08',
          deliveryDate: null,
          notes: 'Call before delivery'
        },
        {
          id: 'ORD-2023-1005',
          customerName: 'David Brown',
          customerEmail: 'david@example.com',
          items: [
            { product: 'Aluminum Sheets', quantity: 10, price: 35.50 }
          ],
          total: 355.00,
          status: 'canceled',
          paymentStatus: 'refunded',
          paymentMethod: 'Credit Card',
          shippingAddress: '202 Maple Dr, District, State, 98765',
          orderDate: '2023-02-25',
          deliveryDate: null,
          notes: 'Order canceled by customer'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (status) => {
    setFilterStatus(status);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...formData.items];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      items: updatedItems
    }));
  };

  const addItemField = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { product: '', quantity: 1, price: 0 }]
    }));
  };

  const removeItemField = (index) => {
    if (formData.items.length === 1) return;
    const updatedItems = [...formData.items];
    updatedItems.splice(index, 1);
    setFormData(prev => ({
      ...prev,
      items: updatedItems
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.customerName || !formData.customerEmail || !formData.shippingAddress) {
      alert('Please fill in all required fields');
      return;
    }
    
    if (formData.items.some(item => !item.product || item.quantity < 1 || item.price <= 0)) {
      alert('Please ensure all items have a name, valid quantity, and price');
      return;
    }
    
    // Calculate total
    const total = formData.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    
    // In a real app, you would make an API call to save the order
    const newOrder = {
      id: `ORD-${new Date().getFullYear()}-${1000 + orders.length + 1}`,
      ...formData,
      total,
      status: 'pending',
      paymentStatus: 'pending',
      orderDate: new Date().toISOString().split('T')[0],
      deliveryDate: null
    };
    
    setOrders([newOrder, ...orders]);
    setShowForm(false);
    setFormData({
      customerName: '',
      customerEmail: '',
      items: [{ product: '', quantity: 1, price: 0 }],
      shippingAddress: '',
      paymentMethod: 'Credit Card',
      notes: ''
    });
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  const getStatusDetails = (statusId) => {
    return statusOptions.find(status => status.id === statusId) || { name: statusId, color: 'bg-gray-100 text-gray-800' };
  };

  const getPaymentStatusDetails = (statusId) => {
    return paymentStatusOptions.find(status => status.id === statusId) || { name: statusId, color: 'bg-gray-100 text-gray-800' };
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => {
      if (order.id === orderId) {
        return { ...order, status: newStatus };
      }
      return order;
    }));
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || order.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  // Calculate statistics
  const pendingOrders = orders.filter(order => order.status === 'pending').length;
  const totalRevenue = orders
    .filter(order => order.paymentStatus === 'paid')
    .reduce((sum, order) => sum + order.total, 0);
  const averageOrderValue = orders.length > 0 ? 
    orders.reduce((sum, order) => sum + order.total, 0) / orders.length : 0;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="text-2xl font-semibold mb-2 sm:mb-0">Order Processing</h2>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search orders..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={handleSearch}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto"
          >
            {showForm ? 'Cancel' : 'New Order'}
          </button>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => handleFilterChange('all')}
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            filterStatus === 'all' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
          }`}
        >
          All Orders
        </button>
        {statusOptions.map(status => (
          <button
            key={status.id}
            onClick={() => handleFilterChange(status.id)}
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              filterStatus === status.id ? status.color : 'bg-gray-100 text-gray-800'
            }`}
          >
            {status.name}
          </button>
        ))}
      </div>
      
      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <h3 className="text-sm font-medium text-blue-800 mb-1">Total Orders</h3>
            <p className="text-2xl font-bold text-blue-900">{orders.length}</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
            <h3 className="text-sm font-medium text-yellow-800 mb-1">Pending Orders</h3>
            <p className="text-2xl font-bold text-yellow-900">{pendingOrders}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <h3 className="text-sm font-medium text-green-800 mb-1">Total Revenue</h3>
            <p className="text-2xl font-bold text-green-900">{formatCurrency(totalRevenue)}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
            <h3 className="text-sm font-medium text-purple-800 mb-1">Avg. Order Value</h3>
            <p className="text-2xl font-bold text-purple-900">{formatCurrency(averageOrderValue)}</p>
          </div>
        </div>
      )}
      
      {showForm && (
        <div className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-200">
          <h3 className="text-lg font-medium mb-4">Create New Order</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-1">Customer Name *</label>
                <input
                  type="text"
                  id="customerName"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="customerEmail" className="block text-sm font-medium text-gray-700 mb-1">Customer Email *</label>
                <input
                  type="email"
                  id="customerEmail"
                  name="customerEmail"
                  value={formData.customerEmail}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Order Items *</label>
              {formData.items.map((item, index) => (
                <div key={index} className="flex items-end space-x-2 mb-2">
                  <div className="flex-grow">
                    <input
                      type="text"
                      placeholder="Product name"
                      value={item.product}
                      onChange={(e) => handleItemChange(index, 'product', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div className="w-24">
                    <input
                      type="number"
                      placeholder="Qty"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value) || 1)}
                      min="1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div className="w-32">
                    <input
                      type="number"
                      placeholder="Price"
                      value={item.price}
                      onChange={(e) => handleItemChange(index, 'price', parseFloat(e.target.value) || 0)}
                      min="0"
                      step="0.01"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <button 
                      type="button" 
                      onClick={() => removeItemField(index)}
                      className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                      disabled={formData.items.length <= 1}
                    >
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={addItemField}
                className="mt-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 flex items-center"
              >
                <svg className="h-5 w-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Item
              </button>
            </div>
            
            <div>
              <label htmlFor="shippingAddress" className="block text-sm font-medium text-gray-700 mb-1">Shipping Address *</label>
              <textarea
                id="shippingAddress"
                name="shippingAddress"
                value={formData.shippingAddress}
                onChange={handleChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                <select
                  id="paymentMethod"
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Credit Card">Credit Card</option>
                  <option value="PayPal">PayPal</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Cash on Delivery">Cash on Delivery</option>
                </select>
              </div>
              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">Order Notes</label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Order
              </button>
            </div>
          </form>
        </div>
      )}
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner />
          <span className="ml-2 text-gray-600">Loading orders...</span>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => {
                  const statusDetails = getStatusDetails(order.status);
                  const paymentStatusDetails = getPaymentStatusDetails(order.paymentStatus);
                  return (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {order.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{order.customerName}</div>
                        <div className="text-xs text-gray-500">{order.customerEmail}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{order.orderDate}</div>
                        <div className="text-xs text-gray-500">
                          {order.deliveryDate ? `Delivered: ${order.deliveryDate}` : 'Pending delivery'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatCurrency(order.total)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusDetails.color}`}>
                          {statusDetails.name}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${paymentStatusDetails.color} mb-1`}>
                            {paymentStatusDetails.name}
                          </span>
                          <span className="text-xs text-gray-500">{order.paymentMethod}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button 
                          className="text-blue-600 hover:text-blue-900 mr-3"
                          onClick={() => alert(`View order ${order.id} details`)}
                        >
                          View
                        </button>
                        <button 
                          className="text-green-600 hover:text-green-900"
                          onClick={() => {
                            const nextStatus = {
                              'pending': 'processing',
                              'processing': 'shipped',
                              'shipped': 'delivered'
                            }[order.status];
                            if (nextStatus) updateOrderStatus(order.id, nextStatus);
                          }}
                          disabled={!['pending', 'processing', 'shipped'].includes(order.status)}
                        >
                          {
                            order.status === 'pending' ? 'Process' :
                            order.status === 'processing' ? 'Ship' :
                            order.status === 'shipped' ? 'Deliver' : ''
                          }
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
