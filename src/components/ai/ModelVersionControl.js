'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import notification from '@/lib/notification';

// Sample data for model versions
const INITIAL_MODELS = [
  {
    id: 'model-1',
    name: 'Image Classification v3.2',
    type: 'Computer Vision',
    createdAt: '2023-10-15T08:30:00Z',
    status: 'active',
    version: '3.2.0',
    accuracy: 0.94,
    author: 'John Doe',
    description: 'Improved object detection with enhanced edge recognition'
  },
  {
    id: 'model-2',
    name: 'Image Classification v3.1',
    type: 'Computer Vision',
    createdAt: '2023-09-20T11:45:00Z',
    status: 'archived',
    version: '3.1.0',
    accuracy: 0.91,
    author: 'John Doe',
    description: 'New feature extraction methods for better accuracy'
  },
  {
    id: 'model-3',
    name: 'Text Classification v2.0',
    type: 'NLP',
    createdAt: '2023-10-05T14:20:00Z',
    status: 'active',
    version: '2.0.0',
    accuracy: 0.88,
    author: 'Jane Smith',
    description: 'Multilingual sentiment analysis model'
  },
  {
    id: 'model-4',
    name: 'Text Classification v1.5',
    type: 'NLP',
    createdAt: '2023-08-12T09:15:00Z',
    status: 'archived',
    version: '1.5.0',
    accuracy: 0.82,
    author: 'Jane Smith',
    description: 'English-only sentiment analysis model'
  }
];

export default function ModelVersionControl() {
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeploying, setIsDeploying] = useState(false);
  const [isRollingBack, setIsRollingBack] = useState(false);
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'archived'
  const [selectedType, setSelectedType] = useState('all'); // 'all', 'Computer Vision', 'NLP', etc.
  
  useEffect(() => {
    // Simulate API call to fetch models
    const fetchModels = async () => {
      setIsLoading(true);
      try {
        // In production, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setModels(INITIAL_MODELS);
      } catch (error) {
        notification.error('Failed to load models');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchModels();
  }, []);
  
  const handleDeployModel = async (model) => {
    setIsDeploying(true);
    try {
      // In production, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      notification.success(`Model ${model.name} deployed successfully`);
    } catch (error) {
      notification.error('Failed to deploy model');
    } finally {
      setIsDeploying(false);
    }
  };
  
  const handleRollbackModel = async (model) => {
    setIsRollingBack(true);
    try {
      // In production, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      notification.success(`Rolled back to model ${model.name}`);
    } catch (error) {
      notification.error('Failed to roll back model');
    } finally {
      setIsRollingBack(false);
    }
  };

  const handleArchiveModel = async (model) => {
    try {
      // In production, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Update local state
      setModels(models.map(m => 
        m.id === model.id ? { ...m, status: 'archived' } : m
      ));
      
      notification.success(`Model ${model.name} archived successfully`);
    } catch (error) {
      notification.error('Failed to archive model');
    }
  };

  const filteredModels = models.filter(model => {
    const statusMatch = filter === 'all' || model.status === filter;
    const typeMatch = selectedType === 'all' || model.type === selectedType;
    return statusMatch && typeMatch;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Model Version Control</h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Manage and deploy different versions of your AI models</p>
      </div>
      
      <div className="p-6">
        <div className="flex flex-wrap gap-4 mb-6">
          <div>
            <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
            <select
              id="status-filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="archived">Archived</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="type-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Model Type</label>
            <select
              id="type-filter"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
            >
              <option value="all">All Types</option>
              <option value="Computer Vision">Computer Vision</option>
              <option value="NLP">NLP</option>
            </select>
          </div>
          
          <div className="ml-auto">
            <label className="invisible block text-sm font-medium mb-1">Action</label>
            <button
              onClick={() => window.location.href = '/dashboard/ai/models/create'}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm font-medium"
            >
              Create New Model
            </button>
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-12">
            <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Model</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Version</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Created</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Accuracy</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredModels.map((model) => (
                    <tr 
                      key={model.id} 
                      className="hover:bg-gray-50 dark:hover:bg-gray-700"
                      onClick={() => setSelectedModel(model)}
                    >
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{model.name}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{model.author}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{model.type}</td>
                      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{model.version}</td>
                      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{formatDate(model.createdAt)}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          model.status === 'active' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' 
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                        }`}>
                          {model.status.charAt(0).toUpperCase() + model.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                        {(model.accuracy * 100).toFixed(1)}%
                      </td>
                      <td className="px-6 py-4 text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          {model.status === 'active' ? (
                            <>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeployModel(model);
                                }}
                                disabled={isDeploying}
                                className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                              >
                                Deploy
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleArchiveModel(model);
                                }}
                                className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                              >
                                Archive
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRollbackModel(model);
                              }}
                              disabled={isRollingBack}
                              className="text-yellow-600 hover:text-yellow-900 dark:text-yellow-400 dark:hover:text-yellow-300"
                            >
                              Rollback
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {filteredModels.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">No models found matching your filters</p>
              </div>
            )}
          </>
        )}
      </div>
      
      {selectedModel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{selectedModel.name}</h3>
              <button
                onClick={() => setSelectedModel(null)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Version</p>
                  <p className="text-base text-gray-900 dark:text-white">{selectedModel.version}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Type</p>
                  <p className="text-base text-gray-900 dark:text-white">{selectedModel.type}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Created</p>
                  <p className="text-base text-gray-900 dark:text-white">{formatDate(selectedModel.createdAt)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Author</p>
                  <p className="text-base text-gray-900 dark:text-white">{selectedModel.author}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</p>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    selectedModel.status === 'active' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' 
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                  }`}>
                    {selectedModel.status.charAt(0).toUpperCase() + selectedModel.status.slice(1)}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Accuracy</p>
                  <p className="text-base text-gray-900 dark:text-white">{(selectedModel.accuracy * 100).toFixed(1)}%</p>
                </div>
              </div>
              
              <div className="mb-6">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Description</p>
                <p className="text-base text-gray-900 dark:text-white">{selectedModel.description}</p>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setSelectedModel(null)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Close
                </button>
                {selectedModel.status === 'active' ? (
                  <>
                    <button
                      onClick={() => {
                        handleDeployModel(selectedModel);
                        setSelectedModel(null);
                      }}
                      disabled={isDeploying}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                    >
                      {isDeploying ? 'Deploying...' : 'Deploy'}
                    </button>
                    <button
                      onClick={() => {
                        handleArchiveModel(selectedModel);
                        setSelectedModel(null);
                      }}
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                      Archive
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      handleRollbackModel(selectedModel);
                      setSelectedModel(null);
                    }}
                    disabled={isRollingBack}
                    className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 disabled:opacity-50"
                  >
                    {isRollingBack ? 'Rolling back...' : 'Rollback'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
