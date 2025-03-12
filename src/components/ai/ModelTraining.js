'use client';

import { useState, useEffect } from 'react';
import LoadingSpinner from '../ui/LoadingSpinner';

export default function ModelTraining() {
  const [activeTab, setActiveTab] = useState('train');
  const [models, setModels] = useState([]);
  const [datasets, setDatasets] = useState([]);
  const [trainingJobs, setTrainingJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    modelType: 'classification',
    dataset: '',
    parameters: {
      epochs: 10,
      batchSize: 32,
      learningRate: 0.001,
      validationSplit: 0.2
    },
    advancedOptions: false
  });
  
  const modelTypes = [
    { id: 'classification', name: 'Classification' },
    { id: 'regression', name: 'Regression' },
    { id: 'clustering', name: 'Clustering' },
    { id: 'nlp', name: 'Natural Language Processing' },
    { id: 'vision', name: 'Computer Vision' }
  ];
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Simulate API call with setTimeout
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const mockModels = [
          {
            id: 'model-001',
            name: 'Customer Churn Predictor',
            type: 'classification',
            description: 'Predicts customer churn based on behavior patterns',
            accuracy: 0.89,
            f1Score: 0.87,
            lastTrained: '2023-03-15',
            status: 'active',
            datasetId: 'dataset-001'
          },
          {
            id: 'model-002',
            name: 'Product Recommendation Engine',
            type: 'clustering',
            description: 'Recommends products based on user behavior and preferences',
            accuracy: 0.92,
            f1Score: 0.90,
            lastTrained: '2023-02-28',
            status: 'active',
            datasetId: 'dataset-003'
          },
          {
            id: 'model-003',
            name: 'Sales Forecasting',
            type: 'regression',
            description: 'Predicts future sales based on historical data and market trends',
            accuracy: 0.85,
            f1Score: 0.83,
            lastTrained: '2023-03-10',
            status: 'active',
            datasetId: 'dataset-002'
          },
          {
            id: 'model-004',
            name: 'Sentiment Analysis',
            type: 'nlp',
            description: 'Analyzes sentiment in customer feedback and reviews',
            accuracy: 0.78,
            f1Score: 0.76,
            lastTrained: '2023-03-05',
            status: 'training',
            datasetId: 'dataset-004'
          },
          {
            id: 'model-005',
            name: 'Image Classifier',
            type: 'vision',
            description: 'Classifies product images for catalog management',
            accuracy: 0.94,
            f1Score: 0.93,
            lastTrained: '2023-02-20',
            status: 'inactive',
            datasetId: 'dataset-005'
          }
        ];
        
        const mockDatasets = [
          {
            id: 'dataset-001',
            name: 'Customer Behavior Data',
            description: 'Historical customer activity and churn data',
            records: 250000,
            features: 45,
            lastUpdated: '2023-03-01',
            format: 'CSV',
            size: '128MB'
          },
          {
            id: 'dataset-002',
            name: 'Sales History',
            description: 'Historical sales data with seasonal patterns',
            records: 120000,
            features: 32,
            lastUpdated: '2023-02-15',
            format: 'CSV',
            size: '85MB'
          },
          {
            id: 'dataset-003',
            name: 'User-Product Interactions',
            description: 'User behavior and product interaction data',
            records: 500000,
            features: 28,
            lastUpdated: '2023-03-05',
            format: 'JSON',
            size: '210MB'
          },
          {
            id: 'dataset-004',
            name: 'Customer Reviews',
            description: 'Text data from customer reviews and feedback',
            records: 75000,
            features: 10,
            lastUpdated: '2023-02-28',
            format: 'Text',
            size: '160MB'
          },
          {
            id: 'dataset-005',
            name: 'Product Images',
            description: 'Labeled product images for classification',
            records: 50000,
            features: 'N/A',
            lastUpdated: '2023-02-10',
            format: 'Image',
            size: '1.2GB'
          }
        ];
        
        const mockTrainingJobs = [
          {
            id: 'job-001',
            modelName: 'Customer Churn Predictor v2',
            modelType: 'classification',
            datasetId: 'dataset-001',
            startTime: '2023-03-18T14:30:00',
            status: 'running',
            progress: 65,
            estimatedCompletion: '2023-03-18T16:45:00'
          },
          {
            id: 'job-002',
            modelName: 'Sales Forecasting V3',
            modelType: 'regression',
            datasetId: 'dataset-002',
            startTime: '2023-03-18T12:15:00',
            status: 'running',
            progress: 87,
            estimatedCompletion: '2023-03-18T15:30:00'
          },
          {
            id: 'job-003',
            modelName: 'Sentiment Analysis V2',
            modelType: 'nlp',
            datasetId: 'dataset-004',
            startTime: '2023-03-17T18:45:00',
            status: 'completed',
            progress: 100,
            estimatedCompletion: '2023-03-17T22:10:00'
          },
          {
            id: 'job-004',
            modelName: 'Image Classifier V3',
            modelType: 'vision',
            datasetId: 'dataset-005',
            startTime: '2023-03-17T15:30:00',
            status: 'failed',
            progress: 37,
            estimatedCompletion: null,
            errorMessage: 'Out of memory error during training'
          }
        ];
        
        setModels(mockModels);
        setDatasets(mockDatasets);
        setTrainingJobs(mockTrainingJobs);
      } catch (err) {
        setError('Error loading data: ' + err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleParameterChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      parameters: {
        ...prev.parameters,
        [name]: parseFloat(value)
      }
    }));
  };
  
  const toggleAdvancedOptions = () => {
    setFormData(prev => ({
      ...prev,
      advancedOptions: !prev.advancedOptions
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.dataset || !formData.modelType) {
      alert('Please fill in all required fields');
      return;
    }
    
    // Create new training job
    const dataset = datasets.find(d => d.id === formData.dataset);
    const newJob = {
      id: `job-${trainingJobs.length + 1}`.padStart(7, '0'),
      modelName: formData.name,
      modelType: formData.modelType,
      datasetId: formData.dataset,
      datasetName: dataset?.name || 'Unknown dataset',
      startTime: new Date().toISOString(),
      status: 'running',
      progress: 0,
      estimatedCompletion: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString() // 2 hours from now
    };
    
    setTrainingJobs([newJob, ...trainingJobs]);
    
    // Reset form
    setFormData({
      name: '',
      description: '',
      modelType: 'classification',
      dataset: '',
      parameters: {
        epochs: 10,
        batchSize: 32,
        learningRate: 0.001,
        validationSplit: 0.2
      },
      advancedOptions: false
    });
    
    setShowForm(false);
    setActiveTab('jobs');
  };
  
  const formatDateTime = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString();
  };
  
  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">Active</span>;
      case 'inactive':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">Inactive</span>;
      case 'training':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">Training</span>;
      case 'running':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">Running</span>;
      case 'completed':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">Completed</span>;
      case 'failed':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">Failed</span>;
      default:
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">{status}</span>;
    }
  };
  
  const renderTrainTab = () => {
    return (
      <div>
        {showForm ? (
          <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-medium mb-4">Train New Model</h3>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Model Name*</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="My Model"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="modelType" className="block text-sm font-medium text-gray-700 mb-1">Model Type*</label>
                  <select
                    id="modelType"
                    name="modelType"
                    value={formData.modelType}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    {modelTypes.map(type => (
                      <option key={type.id} value={type.id}>{type.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="dataset" className="block text-sm font-medium text-gray-700 mb-1">Dataset*</label>
                  <select
                    id="dataset"
                    name="dataset"
                    value={formData.dataset}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Dataset</option>
                    {datasets.map(dataset => (
                      <option key={dataset.id} value={dataset.id}>{dataset.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="2"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Brief description of the model"
                  ></textarea>
                </div>
              </div>
              
              <div className="mb-4">
                <button
                  type="button"
                  onClick={toggleAdvancedOptions}
                  className="text-blue-600 text-sm font-medium hover:text-blue-800 flex items-center"
                >
                  {formData.advancedOptions ? (
                    <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  ) : (
                    <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                  {formData.advancedOptions ? 'Hide Advanced Options' : 'Show Advanced Options'}
                </button>
              </div>
              
              {formData.advancedOptions && (
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Training Parameters</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <label htmlFor="epochs" className="block text-sm text-gray-700 mb-1">Epochs</label>
                      <input
                        type="number"
                        id="epochs"
                        name="epochs"
                        value={formData.parameters.epochs}
                        onChange={handleParameterChange}
                        min="1"
                        max="100"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="batchSize" className="block text-sm text-gray-700 mb-1">Batch Size</label>
                      <input
                        type="number"
                        id="batchSize"
                        name="batchSize"
                        value={formData.parameters.batchSize}
                        onChange={handleParameterChange}
                        min="1"
                        max="512"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="learningRate" className="block text-sm text-gray-700 mb-1">Learning Rate</label>
                      <input
                        type="number"
                        id="learningRate"
                        name="learningRate"
                        value={formData.parameters.learningRate}
                        onChange={handleParameterChange}
                        min="0.0001"
                        max="0.1"
                        step="0.0001"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="validationSplit" className="block text-sm text-gray-700 mb-1">Validation Split</label>
                      <input
                        type="number"
                        id="validationSplit"
                        name="validationSplit"
                        value={formData.parameters.validationSplit}
                        onChange={handleParameterChange}
                        min="0.1"
                        max="0.5"
                        step="0.05"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              )}
              
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Start Training
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="mb-6">
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Train New Model
            </button>
          </div>
        )}
        
        <h3 className="text-lg font-medium mb-4">Your Models</h3>
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dataset</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Trained</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {models.map(model => {
                  const dataset = datasets.find(d => d.id === model.datasetId);
                  return (
                    <tr key={model.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{model.name}</div>
                        <div className="text-xs text-gray-500">{model.description}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {modelTypes.find(t => t.id === model.type)?.name || model.type}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{dataset?.name || 'Unknown'}</div>
                        <div className="text-xs text-gray-500">
                          {dataset ? `${dataset.records.toLocaleString()} records` : ''}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">Accuracy: {(model.accuracy * 100).toFixed(1)}%</div>
                        <div className="text-xs text-gray-500">F1 Score: {(model.f1Score * 100).toFixed(1)}%</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {model.lastTrained}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(model.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">Deploy</button>
                        <button className="text-blue-600 hover:text-blue-900 mr-3">Retrain</button>
                        <button className="text-red-600 hover:text-red-900">Delete</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };
  
  const renderJobsTab = () => {
    return (
      <div>
        <h3 className="text-lg font-medium mb-4">Training Jobs</h3>
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          {trainingJobs.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No training jobs found
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {trainingJobs.map(job => (
                <div key={job.id} className="p-4 hover:bg-gray-50">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                    <div>
                      <div className="flex items-center">
                        <h4 className="text-md font-medium text-gray-900">{job.modelName}</h4>
                        <span className="ml-2">{getStatusBadge(job.status)}</span>
                      </div>
                      <div className="text-sm text-gray-500">
                        {modelTypes.find(t => t.id === job.modelType)?.name || job.modelType} | Dataset: {datasets.find(d => d.id === job.datasetId)?.name || job.datasetId}
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 mt-2 md:mt-0">
                      Started: {formatDateTime(job.startTime)}
                    </div>
                  </div>
                  
                  {job.status === 'running' && (
                    <div className="mt-2">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Progress: {job.progress}%</span>
                        <span>Est. completion: {formatDateTime(job.estimatedCompletion)}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-blue-600 h-2.5 rounded-full" 
                          style={{ width: `${job.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                  
                  {job.status === 'completed' && (
                    <div className="mt-2 text-sm text-gray-700">
                      Training completed successfully
                    </div>
                  )}
                  
                  {job.status === 'failed' && (
                    <div className="mt-2 text-sm text-red-600">
                      Error: {job.errorMessage || 'Unknown error'}
                    </div>
                  )}
                  
                  <div className="mt-3 flex justify-end space-x-2">
                    {job.status === 'running' && (
                      <button className="text-sm text-red-600 hover:text-red-900">
                        Cancel
                      </button>
                    )}
                    {job.status === 'completed' && (
                      <>
                        <button className="text-sm text-blue-600 hover:text-blue-900">
                          View Results
                        </button>
                        <button className="text-sm text-blue-600 hover:text-blue-900">
                          Deploy Model
                        </button>
                      </>
                    )}
                    {job.status === 'failed' && (
                      <button className="text-sm text-blue-600 hover:text-blue-900">
                        Retry
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };
  
  const renderDatasetsTab = () => {
    return (
      <div>
        <h3 className="text-lg font-medium mb-4">Available Datasets</h3>
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Records</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Features</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Format</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {datasets.map(dataset => (
                  <tr key={dataset.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{dataset.name}</div>
                      <div className="text-xs text-gray-500">{dataset.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {dataset.records.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {dataset.features}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {dataset.format}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {dataset.size}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {dataset.lastUpdated}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">Explore</button>
                      <button className="text-blue-600 hover:text-blue-900">Use</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-6">Model Training & Management</h2>
      
      <div className="mb-6 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => handleTabChange('train')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'train'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Models
          </button>
          <button
            onClick={() => handleTabChange('jobs')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'jobs'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Training Jobs
          </button>
          <button
            onClick={() => handleTabChange('datasets')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'datasets'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Datasets
          </button>
        </nav>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner />
          <span className="ml-3 text-gray-600">Loading...</span>
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          {error}
        </div>
      ) : (
        <div>
          {activeTab === 'train' && renderTrainTab()}
          {activeTab === 'jobs' && renderJobsTab()}
          {activeTab === 'datasets' && renderDatasetsTab()}
        </div>
      )}
    </div>
  );
}
