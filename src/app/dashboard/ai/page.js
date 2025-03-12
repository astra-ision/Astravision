'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import ImageRecognition from '@/components/ai/ImageRecognition';
import DataVisualization from '@/components/ai/DataVisualization';
import ModelTraining from '@/components/ai/ModelTraining';
import Chatbot from '@/components/ai/Chatbot';
import Predictions from '@/components/ai/Predictions';
import DocumentAnalyzer from '@/components/ai/DocumentAnalyzer';

export default function AIPage() {
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState('');
  const [services] = useState([
    {
      name: 'Text Analysis',
      description: 'Natural language processing and sentiment analysis',
      status: 'Operational',
      usage: 78,
    },
    {
      name: 'Image Recognition',
      description: 'Object detection and image classification',
      status: 'Operational',
      usage: 65,
    },
    {
      name: 'Document Processing',
      description: 'Document parsing and data extraction',
      status: 'Maintenance',
      usage: 45,
    },
    {
      name: 'Chatbot',
      description: 'AI-powered conversational interface',
      status: 'Operational',
      usage: 92,
    },
  ]);

  const recentActivity = [
    {
      id: 1,
      event: 'Model Update',
      description: 'Sentiment analysis model v2.3 deployed',
      time: '2 hours ago',
    },
    {
      id: 2,
      event: 'Training Started',
      description: 'Image classification model training initiated',
      time: '4 hours ago',
    },
    {
      id: 3,
      event: 'Performance Alert',
      description: 'Chatbot response time above threshold',
      time: '6 hours ago',
    },
  ];

  const stats = [
    {
      name: 'Active AI Models',
      value: '24',
      change: '+2',
      changeType: 'increase',
    },
    {
      name: 'API Requests',
      value: '1.2M',
      change: '+15%',
      changeType: 'increase',
    },
    {
      name: 'Avg Response Time',
      value: '120ms',
      change: '-10ms',
      changeType: 'decrease',
    },
    {
      name: 'Accuracy',
      value: '98.5%',
      change: '+0.5%',
      changeType: 'increase',
    },
  ];

  // Define navLinks directly without trying to import aiLinks
  const navLinks = [
    { name: 'AI Chatbot', href: '/dashboard/ai/chatbot' },
    { name: 'Image Recognition', href: '/dashboard/ai/image-recognition' },
    { name: 'Data Visualization', href: '/dashboard/ai/data-visualization' },
    { name: 'Model Training', href: '/dashboard/ai/model-training' },
    { name: 'Predictions', href: '/dashboard/ai/predictions' },
    { name: 'Document Analyzer', href: '/dashboard/ai/document-analyzer' }  
  ];

  // Update active tab based on current path
  useEffect(() => {
    const currentPath = pathname.split('/').pop();
    setActiveTab(currentPath || 'chatbot');
  }, [pathname]);

  const renderContent = () => {
    switch (activeTab) {
      case 'chatbot':
        return <Chatbot />;
      case 'image-recognition':
        return <ImageRecognition />;
      case 'data-visualization':
        return <DataVisualization />;
      case 'model-training':
        return <ModelTraining />;
      case 'predictions':
        return <Predictions />;
      case 'document-analyzer':
        return <DocumentAnalyzer />;
      default:
        return <Chatbot />;
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">AI Services</h1>

      {/* Quick Actions */}
      <div className="flex space-x-4">
        <button
          onClick={() => {
            router.push('/dashboard/ai/model-training');
            setActiveTab('model-training');
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Train New Model
        </button>
        <button
          onClick={() => {
            router.push('/dashboard/ai/data-visualization');
            setActiveTab('data-visualization');
          }}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          View Analytics
        </button>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service) => (
          <div key={service.name} className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900">{service.name}</h3>
            <p className="mt-1 text-sm text-gray-500">{service.description}</p>
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm">
                <span className={`px-2 py-1 rounded-full ${service.status === 'Operational' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                  {service.status}
                </span>
                <span className="text-gray-500">{service.usage}% usage</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          {navLinks.map((link) => {
            const linkPath = link.href.split('/').pop();
            return (
              <button
                key={link.name}
                onClick={() => {
                  router.push(link.href);
                  setActiveTab(linkPath);
                }}
                className={`${activeTab === linkPath
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                {link.name}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Render active component */}
      {renderContent()}

      {/* Recent Activity */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Recent Activity</h3>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <div className="flow-root">
            <ul className="-mb-8">
              {recentActivity.map((item, itemIdx) => (
                <li key={item.id}>
                  <div className="relative pb-8">
                    {itemIdx !== recentActivity.length - 1 ? (
                      <span
                        className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                        aria-hidden="true"
                      />
                    ) : null}
                    <div className="relative flex space-x-3">
                      <div>
                        <span className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
                          <svg
                            className="h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                          </svg>
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{item.event}</div>
                          <p className="mt-0.5 text-sm text-gray-500">{item.time}</p>
                        </div>
                        <div className="mt-2 text-sm text-gray-700">{item.description}</div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900 flex items-center">
                {stat.value}
                <span className={`ml-2 text-sm font-medium ${stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                  }`}>
                  {stat.change}
                </span>
              </dd>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 