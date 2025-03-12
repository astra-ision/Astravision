'use client';

import { useState, useEffect } from 'react';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function FinancialManagement() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [dateRange, setDateRange] = useState({
    start: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  });
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    type: 'income',
    category: 'Sales',
    amount: '',
    description: '',
    reference: '',
    paymentMethod: 'bank_transfer',
    status: 'completed'
  });

  const transactionTypes = [
    { id: 'income', name: 'Income', color: 'bg-green-100 text-green-800' },
    { id: 'expense', name: 'Expense', color: 'bg-red-100 text-red-800' },
    { id: 'transfer', name: 'Transfer', color: 'bg-blue-100 text-blue-800' }
  ];

  const categories = {
    income: ['Sales', 'Services', 'Investments', 'Other Income'],
    expense: ['Supplies', 'Salaries', 'Rent', 'Utilities', 'Marketing', 'Other Expenses'],
    transfer: ['Internal Transfer', 'External Transfer']
  };

  const paymentMethods = [
    { id: 'bank_transfer', name: 'Bank Transfer' },
    { id: 'credit_card', name: 'Credit Card' },
    { id: 'cash', name: 'Cash' },
    { id: 'check', name: 'Check' },
    { id: 'digital_wallet', name: 'Digital Wallet' }
  ];

  const statusOptions = [
    { id: 'completed', name: 'Completed', color: 'bg-green-100 text-green-800' },
    { id: 'pending', name: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
    { id: 'failed', name: 'Failed', color: 'bg-red-100 text-red-800' }
  ];

  useEffect(() => {
    // Simulated API call
    setTimeout(() => {
      setTransactions([
        {
          id: 'TRX-2023-001',
          date: '2023-03-01',
          type: 'income',
          category: 'Sales',
          amount: 15000.00,
          description: 'Software license sales',
          reference: 'INV-2023-001',
          paymentMethod: 'bank_transfer',
          status: 'completed'
        },
        {
          id: 'TRX-2023-002',
          date: '2023-03-02',
          type: 'expense',
          category: 'Salaries',
          amount: 8500.00,
          description: 'Monthly payroll',
          reference: 'PAY-2023-001',
          paymentMethod: 'bank_transfer',
          status: 'completed'
        },
        {
          id: 'TRX-2023-003',
          date: '2023-03-03',
          type: 'expense',
          category: 'Rent',
          amount: 2000.00,
          description: 'Office rent payment',
          reference: 'RENT-2023-003',
          paymentMethod: 'bank_transfer',
          status: 'completed'
        },
        {
          id: 'TRX-2023-004',
          date: '2023-03-05',
          type: 'income',
          category: 'Services',
          amount: 5000.00,
          description: 'Consulting services',
          reference: 'INV-2023-002',
          paymentMethod: 'credit_card',
          status: 'completed'
        },
        {
          id: 'TRX-2023-005',
          date: '2023-03-07',
          type: 'expense',
          category: 'Marketing',
          amount: 1500.00,
          description: 'Digital marketing campaign',
          reference: 'MKT-2023-001',
          paymentMethod: 'credit_card',
          status: 'pending'
        },
        {
          id: 'TRX-2023-006',
          date: '2023-03-10',
          type: 'transfer',
          category: 'Internal Transfer',
          amount: 10000.00,
          description: 'Transfer between accounts',
          reference: 'TRF-2023-001',
          paymentMethod: 'bank_transfer',
          status: 'completed'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (type) => {
    setFilterType(type);
  };

  const handleDateRangeChange = (e) => {
    const { name, value } = e.target;
    setDateRange(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'type' ? { category: categories[value][0] } : {})
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.amount || !formData.description) {
      alert('Please fill in all required fields');
      return;
    }
    
    const newTransaction = {
      id: `TRX-${new Date().getFullYear()}-${String(transactions.length + 1).padStart(3, '0')}`,
      ...formData,
      amount: parseFloat(formData.amount)
    };
    
    setTransactions([newTransaction, ...transactions]);
    setShowForm(false);
    setFormData({
      date: new Date().toISOString().split('T')[0],
      type: 'income',
      category: 'Sales',
      amount: '',
      description: '',
      reference: '',
      paymentMethod: 'bank_transfer',
      status: 'completed'
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

  const getTypeDetails = (typeId) => {
    return transactionTypes.find(type => type.id === typeId) || 
           { name: typeId, color: 'bg-gray-100 text-gray-800' };
  };

  const getStatusDetails = (statusId) => {
    return statusOptions.find(status => status.id === statusId) || 
           { name: statusId, color: 'bg-gray-100 text-gray-800' };
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = 
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.reference.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterType === 'all' || transaction.type === filterType;
    
    const transactionDate = new Date(transaction.date);
    const startDate = new Date(dateRange.start);
    const endDate = new Date(dateRange.end);
    const matchesDate = transactionDate >= startDate && transactionDate <= endDate;
    
    return matchesSearch && matchesFilter && matchesDate;
  });

  // Calculate financial metrics
  const calculateMetrics = () => {
    const totalIncome = filteredTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const totalExpense = filteredTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const balance = totalIncome - totalExpense;
    
    const pendingTransactions = filteredTransactions
      .filter(t => t.status === 'pending')
      .length;

    return { totalIncome, totalExpense, balance, pendingTransactions };
  };

  const metrics = calculateMetrics();

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="text-2xl font-semibold mb-2 sm:mb-0">Financial Management</h2>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search transactions..."
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
            {showForm ? 'Cancel' : 'Add Transaction'}
          </button>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleFilterChange('all')}
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              filterType === 'all' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
            }`}
          >
            All Types
          </button>
          {transactionTypes.map(type => (
            <button
              key={type.id}
              onClick={() => handleFilterChange(type.id)}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                filterType === type.id ? type.color : 'bg-gray-100 text-gray-800'
              }`}
            >
              {type.name}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Date Range:</span>
          <input
            type="date"
            name="start"
            value={dateRange.start}
            onChange={handleDateRangeChange}
            className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
          />
          <span className="text-sm">to</span>
          <input
            type="date"
            name="end"
            value={dateRange.end}
            onChange={handleDateRangeChange}
            className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
          />
        </div>
      </div>

      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <h3 className="text-sm font-medium text-green-800 mb-1">Total Income</h3>
            <p className="text-2xl font-bold text-green-900">{formatCurrency(metrics.totalIncome)}</p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg border border-red-100">
            <h3 className="text-sm font-medium text-red-800 mb-1">Total Expenses</h3>
            <p className="text-2xl font-bold text-red-900">{formatCurrency(metrics.totalExpense)}</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <h3 className="text-sm font-medium text-blue-800 mb-1">Balance</h3>
            <p className={`text-2xl font-bold ${metrics.balance >= 0 ? 'text-green-900' : 'text-red-900'}`}>
              {formatCurrency(metrics.balance)}
            </p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
            <h3 className="text-sm font-medium text-yellow-800 mb-1">Pending Transactions</h3>
            <p className="text-2xl font-bold text-yellow-900">{metrics.pendingTransactions}</p>
          </div>
        </div>
      )}

      {showForm && (
        <div className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-200">
          <h3 className="text-lg font-medium mb-4">Add New Transaction</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {transactionTypes.map(type => (
                    <option key={type.id} value={type.id}>{type.name}</option>
                  ))}
                </select>
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
                  {categories[formData.type].map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">Amount *</label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                <select
                  id="paymentMethod"
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {paymentMethods.map(method => (
                    <option key={method.id} value={method.id}>{method.name}</option>
                  ))}
                </select>
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
                <label htmlFor="reference" className="block text-sm font-medium text-gray-700 mb-1">Reference</label>
                <input
                  type="text"
                  id="reference"
                  name="reference"
                  value={formData.reference}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add Transaction
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner />
          <span className="ml-2 text-gray-600">Loading transactions...</span>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction) => {
                  const typeDetails = getTypeDetails(transaction.type);
                  const statusDetails = getStatusDetails(transaction.status);
                  return (
                    <tr key={transaction.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{transaction.date}</div>
                        <div className="text-xs text-gray-500">{transaction.id}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{transaction.description}</div>
                        <div className="text-xs text-gray-500">
                          Ref: {transaction.reference || 'N/A'} | 
                          Method: {paymentMethods.find(m => m.id === transaction.paymentMethod)?.name || transaction.paymentMethod}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${typeDetails.color}`}>
                          {typeDetails.name}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {transaction.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`text-sm font-semibold ${
                          transaction.type === 'income' ? 'text-green-600' : 
                          transaction.type === 'expense' ? 'text-red-600' : 'text-blue-600'
                        }`}>
                          {transaction.type === 'expense' ? '-' : ''}{formatCurrency(transaction.amount)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusDetails.color}`}>
                          {statusDetails.name}
                        </span>
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
                    No transactions found
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
