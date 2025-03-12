'use client';

import { useState, useEffect } from 'react';
import LoadingSpinner from '../ui/LoadingSpinner';

export default function DealManagement() {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    client: '',
    value: '',
    stage: 'Discovery',
    priority: 'Medium',
    closeDate: '',
    description: ''
  });

  useEffect(() => {
    // In a real app, you would fetch deals from the API
    // Simulating API call with setTimeout
    setTimeout(() => {
      setDeals([
        {
          id: 1,
          title: 'Enterprise Software License',
          client: 'Acme Inc',
          value: 75000,
          stage: 'Proposal',
          priority: 'High',
          closeDate: '2023-04-15',
          probability: 70,
          description: 'Enterprise-wide software licensing deal including support and maintenance.',
          assignedTo: 'John Smith',
          createdAt: '2023-02-01'
        },
        {
          id: 2,
          title: 'Cloud Migration Project',
          client: 'XYZ Corp',
          value: 120000,
          stage: 'Negotiation',
          priority: 'High',
          closeDate: '2023-05-20',
          probability: 80,
          description: 'Migration of on-premise infrastructure to AWS cloud.',
          assignedTo: 'Sarah Lee',
          createdAt: '2023-01-15'
        },
        {
          id: 3,
          title: 'Website Redesign',
          client: 'ABC Ltd',
          value: 35000,
          stage: 'Discovery',
          priority: 'Medium',
          closeDate: '2023-06-10',
          probability: 40,
          description: 'Complete overhaul of company website with new branding.',
          assignedTo: 'Michael Chen',
          createdAt: '2023-03-01'
        },
        {
          id: 4,
          title: 'Mobile App Development',
          client: 'Tech Solutions',
          value: 85000,
          stage: 'Closed Won',
          priority: 'Medium',
          closeDate: '2023-02-28',
          probability: 100,
          description: 'Development of iOS and Android mobile applications for customer engagement.',
          assignedTo: 'Jane Doe',
          createdAt: '2022-12-05'
        },
        {
          id: 5,
          title: 'Security Audit & Implementation',
          client: 'Global Services',
          value: 42000,
          stage: 'Closed Lost',
          priority: 'Low',
          closeDate: '2023-01-31',
          probability: 0,
          description: 'Comprehensive security assessment and implementation of recommended measures.',
          assignedTo: 'Mark Johnson',
          createdAt: '2022-11-20'
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
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
    if (!formData.title || !formData.client || !formData.value || !formData.closeDate) {
      alert('Please fill in all required fields');
      return;
    }
    
    // In a real app, you would make an API call to save the deal
    const newDeal = {
      id: deals.length + 1,
      ...formData,
      value: parseFloat(formData.value),
      probability: getProbabilityByStage(formData.stage),
      assignedTo: 'Current User',
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    setDeals([newDeal, ...deals]);
    setShowForm(false);
    setFormData({
      title: '',
      client: '',
      value: '',
      stage: 'Discovery',
      priority: 'Medium',
      closeDate: '',
      description: ''
    });
  };

  const getProbabilityByStage = (stage) => {
    switch (stage) {
      case 'Discovery':
        return 20;
      case 'Qualification':
        return 40;
      case 'Proposal':
        return 60;
      case 'Negotiation':
        return 80;
      case 'Closed Won':
        return 100;
      case 'Closed Lost':
        return 0;
      default:
        return 50;
    }
  };

  const getStageColor = (stage) => {
    switch (stage) {
      case 'Discovery':
        return 'bg-purple-100 text-purple-800';
      case 'Qualification':
        return 'bg-blue-100 text-blue-800';
      case 'Proposal':
        return 'bg-indigo-100 text-indigo-800';
      case 'Negotiation':
        return 'bg-yellow-100 text-yellow-800';
      case 'Closed Won':
        return 'bg-green-100 text-green-800';
      case 'Closed Lost':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const filteredDeals = deals.filter(deal => 
    deal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    deal.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    deal.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalValue = filteredDeals.reduce((sum, deal) => sum + (deal.stage !== 'Closed Lost' ? deal.value : 0), 0);
  const weightedValue = filteredDeals.reduce((sum, deal) => sum + (deal.value * deal.probability / 100), 0);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="text-2xl font-semibold mb-2 sm:mb-0">Deal Management</h2>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search deals..."
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
            {showForm ? 'Cancel' : 'Add Deal'}
          </button>
        </div>
      </div>
      
      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <h3 className="text-sm font-medium text-blue-800 mb-1">Total Deals</h3>
            <p className="text-2xl font-bold text-blue-900">{filteredDeals.length}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <h3 className="text-sm font-medium text-green-800 mb-1">Total Value</h3>
            <p className="text-2xl font-bold text-green-900">{formatCurrency(totalValue)}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
            <h3 className="text-sm font-medium text-purple-800 mb-1">Weighted Value</h3>
            <p className="text-2xl font-bold text-purple-900">{formatCurrency(weightedValue)}</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
            <h3 className="text-sm font-medium text-yellow-800 mb-1">Win Rate</h3>
            <p className="text-2xl font-bold text-yellow-900">
              {deals.length > 0 
                ? `${Math.round((deals.filter(d => d.stage === 'Closed Won').length / deals.filter(d => ['Closed Won', 'Closed Lost'].includes(d.stage)).length) * 100)}%` 
                : '0%'}
            </p>
          </div>
        </div>
      )}
      
      {showForm && (
        <div className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-200">
          <h3 className="text-lg font-medium mb-4">Add New Deal</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Deal Title *</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="client" className="block text-sm font-medium text-gray-700 mb-1">Client *</label>
                <input
                  type="text"
                  id="client"
                  name="client"
                  value={formData.client}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="value" className="block text-sm font-medium text-gray-700 mb-1">Value ($) *</label>
                <input
                  type="number"
                  id="value"
                  name="value"
                  value={formData.value}
                  onChange={handleChange}
                  min="0"
                  step="1000"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="stage" className="block text-sm font-medium text-gray-700 mb-1">Stage</label>
                <select
                  id="stage"
                  name="stage"
                  value={formData.stage}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Discovery">Discovery</option>
                  <option value="Qualification">Qualification</option>
                  <option value="Proposal">Proposal</option>
                  <option value="Negotiation">Negotiation</option>
                  <option value="Closed Won">Closed Won</option>
                  <option value="Closed Lost">Closed Lost</option>
                </select>
              </div>
              <div>
                <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <select
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
              <div>
                <label htmlFor="closeDate" className="block text-sm font-medium text-gray-700 mb-1">Expected Close Date *</label>
                <input
                  type="date"
                  id="closeDate"
                  name="closeDate"
                  value={formData.closeDate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
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
                Save Deal
              </button>
            </div>
          </form>
        </div>
      )}
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner />
          <span className="ml-2 text-gray-600">Loading deals...</span>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deal</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stage</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Close Date</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDeals.length > 0 ? (
                filteredDeals.map((deal) => (
                  <tr key={deal.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{deal.title}</div>
                      <div className="text-xs text-gray-500">Created: {deal.createdAt}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{deal.client}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatCurrency(deal.value)}</div>
                      <div className="text-xs text-gray-500">{deal.probability}% probability</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStageColor(deal.stage)}`}>
                        {deal.stage}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(deal.priority)}`}>
                        {deal.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {deal.closeDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                      <button className="text-red-600 hover:text-red-900">Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
                    No deals found
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