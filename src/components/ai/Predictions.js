'use client';

import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import LoadingSpinner from '../ui/LoadingSpinner';

// Sample data for the chart
const sampleData = [
  { month: 'Jan', actual: 4000, predicted: 4200 },
  { month: 'Feb', actual: 3000, predicted: 3100 },
  { month: 'Mar', actual: 2000, predicted: 2300 },
  { month: 'Apr', actual: 2780, predicted: 2900 },
  { month: 'May', actual: 1890, predicted: 2100 },
  { month: 'Jun', actual: 2390, predicted: 2500 },
  { month: 'Jul', actual: 3490, predicted: 3300 },
  { month: 'Aug', actual: null, predicted: 3800 },
  { month: 'Sep', actual: null, predicted: 4100 },
  { month: 'Oct', actual: null, predicted: 4500 },
  { month: 'Nov', actual: null, predicted: 4800 },
  { month: 'Dec', actual: null, predicted: 5100 },
];

const predictionTypes = [
  { id: 'revenue', label: 'Revenue Forecast' },
  { id: 'users', label: 'User Growth' },
  { id: 'churn', label: 'Churn Rate' },
  { id: 'conversion', label: 'Conversion Rate' },
];

export default function Predictions() {
  const [selectedPrediction, setSelectedPrediction] = useState('revenue');
  const [loading, setLoading] = useState(true);
  const [predictionData, setPredictionData] = useState([]);
  const [metrics, setMetrics] = useState({
    currentValue: 0,
    predictedValue: 0,
    percentageChange: 0,
    accuracy: 0,
  });
  
  useEffect(() => {
    // In a real app, you would fetch prediction data from your API
    // const fetchPredictions = async () => {
    //   try {
    //     const response = await fetch(`/api/ai/predictions/${selectedPrediction}`);
    //     const data = await response.json();
    //     setPredictionData(data.predictions);
    //     setMetrics(data.metrics);
    //   } catch (error) {
    //     console.error('Error fetching predictions:', error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    
    // For now, we'll simulate data loading
    setLoading(true);
    setTimeout(() => {
      setPredictionData(sampleData);
      setMetrics({
        currentValue: 3490,
        predictedValue: 5100,
        percentageChange: 46.13,
        accuracy: 92.7,
      });
      setLoading(false);
    }, 1000);
  }, [selectedPrediction]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="text-2xl font-semibold mb-2 sm:mb-0">AI Predictions</h2>
        <div className="inline-flex rounded-md shadow-sm">
          {predictionTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedPrediction(type.id)}
              className={`px-4 py-2 text-sm font-medium ${
                selectedPrediction === type.id
                  ? 'text-blue-700 bg-blue-100'
                  : 'text-gray-700 bg-white hover:bg-gray-50'
              } border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 first:rounded-l-lg last:rounded-r-lg -ml-px first:ml-0`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner />
          <span className="ml-2 text-gray-600">Loading predictions...</span>
        </div>
      ) : (
        <div>
          {/* Metrics cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <p className="text-sm text-gray-500 mb-1">Current Value</p>
              <p className="text-2xl font-bold">${metrics.currentValue.toLocaleString()}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <p className="text-sm text-gray-500 mb-1">Predicted (Dec)</p>
              <p className="text-2xl font-bold">${metrics.predictedValue.toLocaleString()}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <p className="text-sm text-gray-500 mb-1">Growth</p>
              <p className={`text-2xl font-bold ${metrics.percentageChange > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {metrics.percentageChange > 0 ? '+' : ''}{metrics.percentageChange}%
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <p className="text-sm text-gray-500 mb-1">Prediction Accuracy</p>
              <p className="text-2xl font-bold">{metrics.accuracy}%</p>
            </div>
          </div>
          
          {/* Chart */}
          <div className="h-80 bg-gray-50 rounded-lg border border-gray-200 p-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={predictionData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    borderColor: '#e2e8f0',
                    borderRadius: '0.5rem',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                  }} 
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="actual" 
                  stroke="#3b82f6" 
                  strokeWidth={2} 
                  dot={{ r: 4 }} 
                  activeDot={{ r: 8 }} 
                  name="Actual" 
                />
                <Line 
                  type="monotone" 
                  dataKey="predicted" 
                  stroke="#a855f7" 
                  strokeDasharray="5 5" 
                  strokeWidth={2} 
                  dot={{ r: 4 }} 
                  activeDot={{ r: 8 }} 
                  name="Predicted" 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          {/* Additional insights */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">AI Insights</h3>
            <p className="text-blue-700">
              Based on current trends, we predict a <span className="font-semibold">{metrics.percentageChange}%</span> increase in {selectedPrediction === 'revenue' ? 'revenue' : selectedPrediction} by December. Historical accuracy of our model is <span className="font-semibold">{metrics.accuracy}%</span>.
            </p>
            <p className="text-blue-700 mt-2">
              Key factors contributing to this prediction include seasonal trends, marketing campaigns, and market conditions.
            </p>
          </div>
        </div>
      )}
    </div>
  );
} 