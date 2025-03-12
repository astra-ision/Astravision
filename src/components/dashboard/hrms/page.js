'use client';

import { useState } from 'react';
import Recruitment from '@/components/hrms/Recruitment';

export default function HRMSPage() {
  const [activeTab, setActiveTab] = useState('recruitment');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'recruitment':
        return <Recruitment />;
      default:
        return <Recruitment />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">HRMS</h1>
        <p className="mt-2 text-gray-600">
          Manage human resources and employee operations
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200 overflow-x-auto">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('recruitment')}
            className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'recruitment'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Recruitment
          </button>
          {/* Placeholder tabs for future components */}
          <button
            className="py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap border-transparent text-gray-300 cursor-not-allowed"
            disabled
          >
            Performance Evaluation (Coming Soon)
          </button>
          <button
            className="py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap border-transparent text-gray-300 cursor-not-allowed"
            disabled
          >
            Employee Management (Coming Soon)
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
