'use client';

import { useState, useEffect } from 'react';
import LoadingSpinner from '../ui/LoadingSpinner';

export default function SalesPipeline() {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [draggedDeal, setDraggedDeal] = useState(null);
  const [stages, setStages] = useState([
    { id: 'discovery', name: 'Discovery', color: 'bg-purple-100' },
    { id: 'qualification', name: 'Qualification', color: 'bg-blue-100' },
    { id: 'proposal', name: 'Proposal', color: 'bg-indigo-100' },
    { id: 'negotiation', name: 'Negotiation', color: 'bg-yellow-100' },
    { id: 'closed_won', name: 'Closed Won', color: 'bg-green-100' },
    { id: 'closed_lost', name: 'Closed Lost', color: 'bg-red-100' },
  ]);

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
          stage: 'proposal',
          priority: 'High',
          closeDate: '2023-04-15',
          probability: 70,
          assignedTo: 'John Smith',
        },
        {
          id: 2,
          title: 'Cloud Migration Project',
          client: 'XYZ Corp',
          value: 120000,
          stage: 'negotiation',
          priority: 'High',
          closeDate: '2023-05-20',
          probability: 80,
          assignedTo: 'Sarah Lee',
        },
        {
          id: 3,
          title: 'Website Redesign',
          client: 'ABC Ltd',
          value: 35000,
          stage: 'discovery',
          priority: 'Medium',
          closeDate: '2023-06-10',
          probability: 40,
          assignedTo: 'Michael Chen',
        },
        {
          id: 4,
          title: 'Mobile App Development',
          client: 'Tech Solutions',
          value: 85000,
          stage: 'closed_won',
          priority: 'Medium',
          closeDate: '2023-02-28',
          probability: 100,
          assignedTo: 'Jane Doe',
        },
        {
          id: 5,
          title: 'Security Audit & Implementation',
          client: 'Global Services',
          value: 42000,
          stage: 'closed_lost',
          priority: 'Low',
          closeDate: '2023-01-31',
          probability: 0,
          assignedTo: 'Mark Johnson',
        },
        {
          id: 6,
          title: 'E-commerce Platform',
          client: 'Retail Solutions',
          value: 95000,
          stage: 'qualification',
          priority: 'High',
          closeDate: '2023-07-15',
          probability: 50,
          assignedTo: 'John Smith',
        },
        {
          id: 7,
          title: 'Data Analytics Dashboard',
          client: 'Financial Corp',
          value: 62000,
          stage: 'discovery',
          priority: 'Medium',
          closeDate: '2023-08-10',
          probability: 30,
          assignedTo: 'Sarah Lee',
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleDragStart = (e, deal) => {
    setDraggedDeal(deal);
  };

  const handleDragOver = (e, stageId) => {
    e.preventDefault();
  };

  const handleDrop = (e, stageId) => {
    e.preventDefault();
    if (draggedDeal) {
      const updatedDeals = deals.map(deal => {
        if (deal.id === draggedDeal.id) {
          return { ...deal, stage: stageId };
        }
        return deal;
      });
      setDeals(updatedDeals);
      setDraggedDeal(null);
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

  const getStageTotal = (stageId) => {
    return deals
      .filter(deal => deal.stage === stageId)
      .reduce((total, deal) => total + deal.value, 0);
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

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Sales Pipeline</h2>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Add Deal
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            Filter
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner />
          <span className="ml-2 text-gray-600">Loading pipeline...</span>
        </div>
      ) : (
        <div className="overflow-x-auto pb-4">
          <div className="flex space-x-4 min-w-max">
            {stages.map((stage) => (
              <div
                key={stage.id}
                className="w-72 flex-shrink-0"
                onDragOver={(e) => handleDragOver(e, stage.id)}
                onDrop={(e) => handleDrop(e, stage.id)}
              >
                <div className={`${stage.color} p-3 rounded-t-lg border border-b-0 border-gray-200`}>
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">{stage.name}</h3>
                    <span className="text-sm font-semibold">
                      {deals.filter(deal => deal.stage === stage.id).length} deals
                    </span>
                  </div>
                  <div className="text-sm mt-1 font-medium">
                    {formatCurrency(getStageTotal(stage.id))}
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-b-lg min-h-[400px] border border-gray-200 p-2">
                  {deals
                    .filter(deal => deal.stage === stage.id)
                    .map(deal => (
                      <div
                        key={deal.id}
                        className="bg-white p-3 rounded-lg shadow-sm mb-2 cursor-move"
                        draggable
                        onDragStart={(e) => handleDragStart(e, deal)}
                      >
                        <div className="font-medium text-gray-900 mb-1 truncate">
                          {deal.title}
                        </div>
                        <div className="text-sm text-gray-500 mb-2 truncate">
                          {deal.client}
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="font-medium">{formatCurrency(deal.value)}</span>
                          <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(deal.priority)}`}>
                            {deal.priority}
                          </span>
                        </div>
                        <div className="mt-2 pt-2 border-t border-gray-100 text-xs text-gray-500 flex justify-between items-center">
                          <span>Close: {deal.closeDate}</span>
                          <span>{deal.probability}%</span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="mt-6 border-t border-gray-200 pt-4">
        <h3 className="text-lg font-medium mb-4">Pipeline Summary</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <h4 className="text-sm font-medium text-blue-800 mb-1">Total Deals</h4>
            <p className="text-2xl font-bold text-blue-900">{deals.length}</p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <h4 className="text-sm font-medium text-green-800 mb-1">Total Pipeline Value</h4>
            <p className="text-2xl font-bold text-green-900">
              {formatCurrency(deals.reduce((sum, deal) => sum + deal.value, 0))}
            </p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
            <h4 className="text-sm font-medium text-purple-800 mb-1">Avg. Deal Size</h4>
            <p className="text-2xl font-bold text-purple-900">
              {formatCurrency(deals.length ? deals.reduce((sum, deal) => sum + deal.value, 0) / deals.length : 0)}
            </p>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
            <h4 className="text-sm font-medium text-yellow-800 mb-1">Weighted Pipeline</h4>
            <p className="text-2xl font-bold text-yellow-900">
              {formatCurrency(deals.reduce((sum, deal) => sum + (deal.value * deal.probability / 100), 0))}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 