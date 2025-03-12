'use client';

import { useState } from 'react';
import InventoryManagement from '@/components/erp/InventoryManagement';

export default function ERPPage() {
  const [activeTab, setActiveTab] = useState('inventory');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'inventory':
        return <InventoryManagement />;
      default:
        return <InventoryManagement />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">ERP</h1>
        <p className="mt-2 text-gray-600">
          Manage your enterprise resources and operations
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200 overflow-x-auto">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('inventory')}
            className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'inventory'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Inventory Management
          </button>
          {/* Placeholder tabs for future components */}
          <button
            className="py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap border-transparent text-gray-300 cursor-not-allowed"
            disabled
          >
            Order Management (Coming Soon)
          </button>
          <button
            className="py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap border-transparent text-gray-300 cursor-not-allowed"
            disabled
          >
            Financial Management (Coming Soon)
          </button>
        </nav>
      </div>

      {/* Component Content */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        {renderTabContent()}
      </div>
    </div>
  );
}
