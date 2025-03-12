'use client';

import { useState } from 'react';
import Chatbot from '@/components/ai/Chatbot';
import DocumentAnalyzer from '@/components/ai/DocumentAnalyzer';
import Predictions from '@/components/ai/Predictions';
import ImageRecognition from '@/components/ai/ImageRecognition';
import DataVisualization from '@/components/ai/DataVisualization';
import ModelTraining from '@/components/ai/ModelTraining';

export default function AIPage() {
  const [activeTab, setActiveTab] = useState('chatbot');
  
  // Rest of your existing code...

  const renderTabContent = () => {
    switch (activeTab) {
      case 'chatbot':
        return <Chatbot />;
      case 'document':
        return <DocumentAnalyzer />;
      case 'predictions':
        return <Predictions />;
      case 'image':
        return <ImageRecognition />;
      case 'data':
        return <DataVisualization />;
      case 'model':
        return <ModelTraining />;
      default:
        return <Chatbot />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Your existing code... */}

      {/* Updated Tabs */}
      <div className="mb-6 border-b border-gray-200 overflow-x-auto">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('chatbot')}
            className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'chatbot'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            AI Chatbot
          </button>
          <button
            onClick={() => setActiveTab('document')}
            className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'document'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Document Analysis
          </button>
          <button
            onClick={() => setActiveTab('predictions')}
            className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'predictions'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Predictive Analytics
          </button>
          {/* New tabs for the additional components */}
          <button
            onClick={() => setActiveTab('image')}
            className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'image'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Image Recognition
          </button>
          <button
            onClick={() => setActiveTab('data')}
            className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'data'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Data Visualization
          </button>
          <button
            onClick={() => setActiveTab('model')}
            className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'model'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Model Training
          </button>
        </nav>
      </div>

      {/* Tab content */}
      <div className="mb-6">
        {renderTabContent()}
      </div>

      {/* Rest of your page... */}
    </div>
  );
}