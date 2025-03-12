'use client';

import { useState, useEffect } from 'react';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function SupplyChain() {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Raw Materials',
    contactPerson: '',
    email: '',
    phone: '',
    address: '',
    rating: 5,
    status: 'active',
    paymentTerms: 'net30',
    notes: ''
  });

  const categories = [
    'Raw Materials',
    'Electronics',
    'Office Supplies',
    'Packaging',
    'Transportation',
    'Services'
  ];

  const statusOptions = [
    { id: 'active', name: 'Active', color: 'bg-green-100 text-green-800' },
    { id: 'inactive', name: 'Inactive', color: 'bg-red-100 text-red-800' },
    { id: 'pending', name: 'Pending Review', color: 'bg-yellow-100 text-yellow-800' }
  ];

  const paymentTermsOptions = [
    { id: 'immediate', name: 'Immediate' },
    { id: 'net15', name: 'Net 15' },
    { id: 'net30', name: 'Net 30' },
    { id: 'net60', name: 'Net 60' }
  ];

  useEffect(() => {
    // Simulated API call
    setTimeout(() => {
      setSuppliers([
        {
          id: 1,
          name: 'TechPro Solutions',
          category: 'Electronics',
          contactPerson: 'John Smith',
          email: 'john@techpro.com',
          phone: '+1-555-0123',
          address: '123 Tech Lane, Silicon Valley, CA',
          rating: 4.5,
          status: 'active',
          paymentTerms: 'net30',
          lastDelivery: '2023-03-01',
          totalOrders: 156,
          onTimeDelivery: 98,
          qualityScore: 4.8,
          notes: 'Preferred supplier for electronic components'
        },
        {
          id: 2,
          name: 'Global Raw Materials Inc',
          category: 'Raw Materials',
          contactPerson: 'Sarah Johnson',
          email: 'sarah@grm.com',
          phone: '+1-555-0124',
          address: '456 Industrial Pkwy, Detroit, MI',
          rating: 4.2,
          status: 'active',
          paymentTerms: 'net60',
          lastDelivery: '2023-03-05',
          totalOrders: 89,
          onTimeDelivery: 92,
          qualityScore: 4.5,
          notes: 'Bulk supplier for manufacturing materials'
        },
        {
          id: 3,
          name: 'Office Plus Supplies',
          category: 'Office Supplies',
          contactPerson: 'Mike Wilson',
          email: 'mike@officeplus.com',
          phone: '+1-555-0125',
          address: '789 Commerce St, Chicago, IL',
          rating: 4.0,
          status: 'active',
          paymentTerms: 'net15',
          lastDelivery: '2023-03-08',
          totalOrders: 245,
          onTimeDelivery: 96,
          qualityScore: 4.2,
          notes: 'Regular supplier for office materials'
        },
        {
          id: 4,
          name: 'PackMaster Solutions',
          category: 'Packaging',
          contactPerson: 'Lisa Brown',
          email: 'lisa@packmaster.com',
          phone: '+1-555-0126',
          address: '321 Package Ave, Portland, OR',
          rating: 3.8,
          status: 'pending',
          paymentTerms: 'net30',
          lastDelivery: '2023-02-28',
          totalOrders: 67,
          onTimeDelivery: 88,
          qualityScore: 3.9,
          notes: 'New packaging supplier under review'
        },
        {
          id: 5,
          name: 'Swift Logistics',
          category: 'Transportation',
          contactPerson: 'David Lee',
          email: 'david@swiftlog.com',
          phone: '+1-555-0127',
          address: '654 Transport Way, Dallas, TX',
          rating: 4.7,
          status: 'active',
          paymentTerms: 'immediate',
          lastDelivery: '2023-03-10',
          totalOrders: 178,
          onTimeDelivery: 99,
          qualityScore: 4.9,
          notes: 'Premium logistics partner'
        }
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
    
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Please fill in all required fields');
      return;
    }
    
    const newSupplier = {
      id: suppliers.length + 1,
      ...formData,
      lastDelivery: null,
      totalOrders: 0,
      onTimeDelivery: 100,
      qualityScore: 5.0
    };
    
    setSuppliers([newSupplier, ...suppliers]);
    setShowForm(false);
    setFormData({
      name: '',
      category: 'Raw Materials',
      contactPerson: '',
      email: '',
      phone: '',
      address: '',
      rating: 5,
      status: 'active',
      paymentTerms: 'net30',
      notes: ''
    });
  };

  const getStatusDetails = (statusId) => {
    return statusOptions.find(status => status.id === statusId) || 
           { name: statusId, color: 'bg-gray-100 text-gray-800' };
  };

  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesSearch = 
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterCategory === 'all' || supplier.category === filterCategory;
    
    return matchesSearch && matchesFilter;
  });

  const calculateMetrics = () => {
    const activeSuppliers = suppliers.filter(s => s.status === 'active').length;
    const avgRating = suppliers.reduce((sum, s) => sum + s.rating, 0) / suppliers.length || 0;
    const avgOnTime = suppliers.reduce((sum, s) => sum + s.onTimeDelivery, 0) / suppliers.length || 0;
    const totalSuppliers = suppliers.length;

    return { activeSuppliers, avgRating, avgOnTime, totalSuppliers };
  };

  const metrics = calculateMetrics();

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="text-2xl font-semibold mb-2 sm:mb-0">Supply Chain Management</h2>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search suppliers..."
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
            {showForm ? 'Cancel' : 'Add Supplier'}
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
            <h3 className="text-sm font-medium text-blue-800 mb-1">Total Suppliers</h3>
            <p className="text-2xl font-bold text-blue-900">{metrics.totalSuppliers}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <h3 className="text-sm font-medium text-green-800 mb-1">Active Suppliers</h3>
            <p className="text-2xl font-bold text-green-900">{metrics.activeSuppliers}</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
            <h3 className="text-sm font-medium text-yellow-800 mb-1">Avg. Rating</h3>
            <p className="text-2xl font-bold text-yellow-900">{metrics.avgRating.toFixed(1)}/5.0</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
            <h3 className="text-sm font-medium text-purple-800 mb-1">On-Time Delivery</h3>
            <p className="text-2xl font-bold text-purple-900">{metrics.avgOnTime.toFixed(1)}%</p>
          </div>
        </div>
      )}

      {showForm && (
        <div className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-200">
          <h3 className="text-lg font-medium mb-4">Add New Supplier</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Supplier Name *</label>
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
                <label htmlFor="contactPerson" className="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
                <input
                  type="text"
                  id="contactPerson"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {statusOptions.map(option => (
                    <option key={option.id} value={option.id}>{option.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="paymentTerms" className="block text-sm font-medium text-gray-700 mb-1">Payment Terms</label>
                <select
                  id="paymentTerms"
                  name="paymentTerms"
                  value={formData.paymentTerms}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {paymentTermsOptions.map(option => (
                    <option key={option.id} value={option.id}>{option.name}</option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2 md:col-span-3">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="2"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
              <div className="sm:col-span-2 md:col-span-3">
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows="2"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add Supplier
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner />
          <span className="ml-2 text-gray-600">Loading suppliers...</span>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSuppliers.map((supplier) => {
                const statusDetails = getStatusDetails(supplier.status);
                return (
                  <tr key={supplier.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{supplier.name}</div>
                      <div className="text-xs text-gray-500">ID: {supplier.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{supplier.category}</div>
                      <div className="text-xs text-gray-500">Terms: {paymentTermsOptions.find(t => t.id === supplier.paymentTerms)?.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusDetails.color}`}>
                        {statusDetails.name}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">Rating: {supplier.rating}/5.0</div>
                      <div className="text-xs text-gray-500">
                        On-time: {supplier.onTimeDelivery}% | Quality: {supplier.qualityScore}/5.0
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{supplier.contactPerson}</div>
                      <div className="text-xs text-gray-500">{supplier.email}</div>
                      <div className="text-xs text-gray-500">{supplier.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                      <button className="text-red-600 hover:text-red-900">Delete</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
