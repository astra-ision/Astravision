'use client';

import { useState, useEffect } from 'react';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function InventoryManagement() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [categories, setCategories] = useState([
    'Electronics', 'Office Supplies', 'Furniture', 'IT Equipment', 'Raw Materials'
  ]);
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: 'Electronics',
    description: '',
    quantity: '',
    minQuantity: '',
    price: '',
    location: '',
    supplier: ''
  });

  useEffect(() => {
    // In a real app, you would fetch inventory from the API
    // Simulating API call with setTimeout
    setTimeout(() => {
      setInventory([
        {
          id: 1,
          name: 'Laptop - Dell XPS 15',
          sku: 'DELL-XPS-15',
          category: 'Electronics',
          description: 'High-performance laptop with 16GB RAM, 512GB SSD',
          quantity: 15,
          minQuantity: 5,
          price: 1299.99,
          location: 'Warehouse A, Shelf 3',
          supplier: 'Dell Inc',
          lastUpdated: '2023-02-15'
        },
        {
          id: 2,
          name: 'Office Chair - Ergonomic',
          sku: 'CHAIR-ERGO-101',
          category: 'Furniture',
          description: 'Adjustable ergonomic office chair with lumbar support',
          quantity: 32,
          minQuantity: 10,
          price: 249.99,
          location: 'Warehouse B, Section 5',
          supplier: 'Office Furniture Co',
          lastUpdated: '2023-01-20'
        },
        {
          id: 3,
          name: 'Printer Paper - A4',
          sku: 'PAPER-A4-500',
          category: 'Office Supplies',
          description: 'Premium A4 paper, 500 sheets per pack',
          quantity: 120,
          minQuantity: 50,
          price: 4.99,
          location: 'Warehouse A, Shelf 1',
          supplier: 'Paper Supplies Ltd',
          lastUpdated: '2023-02-28'
        },
        {
          id: 4,
          name: 'Network Switch - 24 Port',
          sku: 'NET-SWITCH-24',
          category: 'IT Equipment',
          description: '24-port gigabit ethernet network switch',
          quantity: 8,
          minQuantity: 3,
          price: 179.99,
          location: 'Warehouse A, Shelf 4',
          supplier: 'Networking Solutions',
          lastUpdated: '2023-02-10'
        },
        {
          id: 5,
          name: 'Aluminum Sheets',
          sku: 'RAW-AL-SHEET',
          category: 'Raw Materials',
          description: 'Aluminum sheets, 1mm thickness, 1m x 2m',
          quantity: 48,
          minQuantity: 20,
          price: 35.50,
          location: 'Warehouse C, Section 2',
          supplier: 'Metal Works Inc',
          lastUpdated: '2023-03-01'
        },
        {
          id: 6,
          name: 'Wireless Mouse',
          sku: 'MOUSE-WRLS-01',
          category: 'Electronics',
          description: 'Ergonomic wireless mouse with 12-month battery life',
          quantity: 4,
          minQuantity: 10,
          price: 24.99,
          location: 'Warehouse A, Shelf 2',
          supplier: 'Computer Accessories Ltd',
          lastUpdated: '2023-02-25'
        },
        {
          id: 7,
          name: 'Conference Table',
          sku: 'TABLE-CONF-01',
          category: 'Furniture',
          description: 'Large conference table, seats 12 people',
          quantity: 3,
          minQuantity: 1,
          price: 899.99,
          location: 'Warehouse B, Section 3',
          supplier: 'Office Furniture Co',
          lastUpdated: '2023-01-15'
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (category) => {
    setFilterCategory(category);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.name || !formData.sku || !formData.quantity || !formData.price) {
      alert('Please fill in all required fields');
      return;
    }
    
    // In a real app, you would make an API call to save the item
    const newItem = {
      id: inventory.length + 1,
      ...formData,
      quantity: parseInt(formData.quantity, 10),
      minQuantity: parseInt(formData.minQuantity, 10),
      price: parseFloat(formData.price),
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    
    setInventory([newItem, ...inventory]);
    setShowForm(false);
    setFormData({
      name: '',
      sku: '',
      category: 'Electronics',
      description: '',
      quantity: '',
      minQuantity: '',
      price: '',
      location: '',
      supplier: ''
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

  const getStockStatus = (item) => {
    if (item.quantity <= 0) {
      return { label: 'Out of Stock', color: 'bg-red-100 text-red-800' };
    } else if (item.quantity < item.minQuantity) {
      return { label: 'Low Stock', color: 'bg-yellow-100 text-yellow-800' };
    } else {
      return { label: 'In Stock', color: 'bg-green-100 text-green-800' };
    }
  };

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterCategory === 'all' || item.category === filterCategory;
    
    return matchesSearch && matchesFilter;
  });

  const totalValue = filteredInventory.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  const lowStockItems = filteredInventory.filter(item => item.quantity < item.minQuantity).length;
  const totalItems = filteredInventory.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="text-2xl font-semibold mb-2 sm:mb-0">Inventory Management</h2>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search inventory..."
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
            {showForm ? 'Cancel' : 'Add Item'}
          </button>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => handleFilterChange('all')}
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            filterCategory === 'all' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
          }`}
        >
          All Categories
        </button>
        {categories.map(category => (
          <button
            key={category}
            onClick={() => handleFilterChange(category)}
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              filterCategory === category ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      
      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <h3 className="text-sm font-medium text-blue-800 mb-1">Total Items</h3>
            <p className="text-2xl font-bold text-blue-900">{totalItems}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <h3 className="text-sm font-medium text-green-800 mb-1">Inventory Value</h3>
            <p className="text-2xl font-bold text-green-900">{formatCurrency(totalValue)}</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
            <h3 className="text-sm font-medium text-yellow-800 mb-1">Low Stock Items</h3>
            <p className="text-2xl font-bold text-yellow-900">{lowStockItems}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
            <h3 className="text-sm font-medium text-purple-800 mb-1">Categories</h3>
            <p className="text-2xl font-bold text-purple-900">{categories.length}</p>
          </div>
        </div>
      )}
      
      {showForm && (
        <div className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-200">
          <h3 className="text-lg font-medium mb-4">Add New Inventory Item</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Item Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="sku" className="block text-sm font-medium text-gray-700 mb-1">SKU *</label>
                <input
                  type="text"
                  id="sku"
                  name="sku"
                  value={formData.sku}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">Quantity *</label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="minQuantity" className="block text-sm font-medium text-gray-700 mb-1">Min Quantity</label>
                <input
                  type="number"
                  id="minQuantity"
                  name="minQuantity"
                  value={formData.minQuantity}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Price ($) *</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="supplier" className="block text-sm font-medium text-gray-700 mb-1">Supplier</label>
                <input
                  type="text"
                  id="supplier"
                  name="supplier"
                  value={formData.supplier}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="sm:col-span-2 md:col-span-3">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
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
                Save Item
              </button>
            </div>
          </form>
        </div>
      )}
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner />
          <span className="ml-2 text-gray-600">Loading inventory...</span>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInventory.length > 0 ? (
                filteredInventory.map((item) => {
                  const stockStatus = getStockStatus(item);
                  return (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{item.name}</div>
                        <div className="text-xs text-gray-500">{item.description.substring(0, 50)}{item.description.length > 50 ? '...' : ''}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.sku}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${stockStatus.color} mr-2`}>
                            {stockStatus.label}
                          </span>
                          <span className="text-sm text-gray-900">{item.quantity}</span>
                        </div>
                        <div className="text-xs text-gray-500">Min: {item.minQuantity}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{formatCurrency(item.price)}</div>
                        <div className="text-xs text-gray-500">Value: {formatCurrency(item.price * item.quantity)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{item.location}</div>
                        <div className="text-xs text-gray-500">Supplier: {item.supplier}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                        <button className="text-red-600 hover:text-red-900">Delete</button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
                    No inventory items found
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