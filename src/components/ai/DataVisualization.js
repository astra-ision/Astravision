'use client';

import { useState, useEffect } from 'react';
import LoadingSpinner from '../ui/LoadingSpinner';

export default function DataVisualization() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [activeChart, setActiveChart] = useState('sales');
  const [timeRange, setTimeRange] = useState('year');
  const [error, setError] = useState(null);
  
  const chartTypes = [
    { id: 'sales', name: 'Sales Performance', icon: 'chart-bar' },
    { id: 'users', name: 'User Growth', icon: 'users' },
    { id: 'engagement', name: 'User Engagement', icon: 'chart-pie' },
    { id: 'regional', name: 'Regional Analysis', icon: 'globe' }
  ];
  
  const timeRanges = [
    { id: 'month', name: 'Last 30 Days' },
    { id: 'quarter', name: 'Last Quarter' },
    { id: 'year', name: 'Last Year' },
    { id: 'all', name: 'All Time' }
  ];
  
  useEffect(() => {
    setLoading(true);
    setError(null);
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      try {
        // Generate mock data based on the active chart and time range
        const mockData = generateMockData(activeChart, timeRange);
        setData(mockData);
      } catch (err) {
        setError('Error loading data: ' + err.message);
      } finally {
        setLoading(false);
      }
    }, 1000);
  }, [activeChart, timeRange]);
  
  const generateMockData = (chartType, range) => {
    // Number of data points based on time range
    let numPoints;
    let labelFormat;
    
    switch (range) {
      case 'month':
        numPoints = 30;
        labelFormat = 'day';
        break;
      case 'quarter':
        numPoints = 13;
        labelFormat = 'week';
        break;
      case 'year':
        numPoints = 12;
        labelFormat = 'month';
        break;
      case 'all':
        numPoints = 10;
        labelFormat = 'year';
        break;
      default:
        numPoints = 12;
        labelFormat = 'month';
    }
    
    const labels = generateLabels(numPoints, labelFormat);
    
    switch (chartType) {
      case 'sales':
        return {
          type: 'line',
          title: 'Sales Performance',
          description: 'Revenue and growth trends over time',
          labels,
          datasets: [
            {
              name: 'Revenue',
              data: generateDataPoints(numPoints, 10000, 50000, 5000),
              color: '#3b82f6',
              format: 'currency'
            },
            {
              name: 'Transactions',
              data: generateDataPoints(numPoints, 100, 500, 50),
              color: '#10b981',
              format: 'number'
            }
          ],
          insights: [
            { text: 'Revenue increased by 23% over this period', type: 'positive' },
            { text: 'Q3 showed the highest growth rate at 15%', type: 'positive' },
            { text: 'December had the highest transaction volume', type: 'neutral' }
          ]
        };
        
      case 'users':
        return {
          type: 'stacked',
          title: 'User Growth',
          description: 'New and active users over time',
          labels,
          datasets: [
            {
              name: 'New Users',
              data: generateDataPoints(numPoints, 100, 500, 50, 0.7),
              color: '#6366f1',
              format: 'number'
            },
            {
              name: 'Active Users',
              data: generateDataPoints(numPoints, 500, 2000, 200),
              color: '#8b5cf6',
              format: 'number'
            }
          ],
          insights: [
            { text: 'User acquisition increased by 34% year-over-year', type: 'positive' },
            { text: 'User retention rate improved to 78%', type: 'positive' },
            { text: 'Mobile users grew faster than desktop users', type: 'neutral' }
          ]
        };
        
      case 'engagement':
        return {
          type: 'pie',
          title: 'User Engagement',
          description: 'Distribution of user activity across the platform',
          labels: ['Dashboard', 'Analytics', 'Reports', 'Settings', 'Admin', 'Other'],
          datasets: [
            {
              name: 'Usage Percentage',
              data: [35, 25, 15, 10, 10, 5],
              colors: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444', '#6b7280'],
              format: 'percentage'
            }
          ],
          insights: [
            { text: 'Dashboard and Analytics account for 60% of all usage', type: 'neutral' },
            { text: 'Time spent in Reports increased by 15%', type: 'positive' },
            { text: 'Admin section usage decreased by 8%', type: 'negative' }
          ]
        };
        
      case 'regional':
        return {
          type: 'bar',
          title: 'Regional Analysis',
          description: 'Performance metrics across different regions',
          labels: ['North America', 'Europe', 'Asia Pacific', 'Latin America', 'Middle East', 'Africa'],
          datasets: [
            {
              name: 'Sales',
              data: [48000, 38000, 31000, 15000, 12000, 6000],
              color: '#3b82f6',
              format: 'currency'
            },
            {
              name: 'Users',
              data: [4800, 3500, 5200, 1800, 1200, 600],
              color: '#8b5cf6',
              format: 'number'
            }
          ],
          insights: [
            { text: 'Asia Pacific showed the highest growth rate at 28%', type: 'positive' },
            { text: 'North America remains the largest market by revenue', type: 'neutral' },
            { text: 'Latin America user growth exceeded projections by 15%', type: 'positive' }
          ]
        };
        
      default:
        return null;
    }
  };
  
  const generateLabels = (count, format) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const result = [];
    
    switch (format) {
      case 'day':
        for (let i = 0; i < count; i++) {
          result.push(`Day ${i + 1}`);
        }
        break;
      case 'week':
        for (let i = 0; i < count; i++) {
          result.push(`Week ${i + 1}`);
        }
        break;
      case 'month':
        for (let i = 0; i < count; i++) {
          result.push(months[i % 12]);
        }
        break;
      case 'year':
        const currentYear = new Date().getFullYear();
        for (let i = 0; i < count; i++) {
          result.push(`${currentYear - count + i + 1}`);
        }
        break;
      default:
        for (let i = 0; i < count; i++) {
          result.push(`Label ${i + 1}`);
        }
    }
    
    return result;
  };
  
  const generateDataPoints = (count, min, max, volatility, trend = 0.2) => {
    const result = [];
    let value = min + Math.random() * (max - min) / 2;
    
    for (let i = 0; i < count; i++) {
      // Apply trend (gradual increase)
      value += value * (trend / count);
      
      // Apply volatility
      const change = (Math.random() - 0.5) * 2 * volatility;
      value += change;
      
      // Ensure value stays within range
      value = Math.max(min, Math.min(max, value));
      
      result.push(Math.round(value));
    }
    
    return result;
  };
  
  const formatValue = (value, format) => {
    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          maximumFractionDigits: 0
        }).format(value);
      case 'percentage':
        return `${value}%`;
      case 'number':
      default:
        return new Intl.NumberFormat('en-US').format(value);
    }
  };
  
  const renderChart = () => {
    if (!data) return null;
    
    // Calculate chart dimensions and scales
    const chartWidth = 600;
    const chartHeight = 300;
    const padding = { top: 20, right: 20, bottom: 30, left: 60 };
    const innerWidth = chartWidth - padding.left - padding.right;
    const innerHeight = chartHeight - padding.top - padding.bottom;
    
    switch (data.type) {
      case 'line':
      case 'stacked': {
        // Find max value for scaling
        const maxValue = Math.max(
          ...data.datasets.map(ds => Math.max(...ds.data))
        );
        
        // X and Y scales
        const xScale = index => (index / (data.labels.length - 1)) * innerWidth;
        const yScale = value => innerHeight - (value / maxValue) * innerHeight;
        
        // Generate path for each dataset
        const paths = data.datasets.map(dataset => {
          // For line charts
          if (data.type === 'line') {
            let pathD = `M ${padding.left + xScale(0)} ${padding.top + yScale(dataset.data[0])}`;
            
            for (let i = 1; i < dataset.data.length; i++) {
              pathD += ` L ${padding.left + xScale(i)} ${padding.top + yScale(dataset.data[i])}`;
            }
            
            return (
              <path
                key={dataset.name}
                d={pathD}
                stroke={dataset.color}
                strokeWidth="2"
                fill="none"
              />
            );
          }
          // For stacked area charts
          else {
            const prevDataset = data.datasets[data.datasets.indexOf(dataset) - 1];
            const baseValues = prevDataset ? prevDataset.data : Array(dataset.data.length).fill(0);
            
            let pathD = `M ${padding.left + xScale(0)} ${padding.top + yScale(baseValues[0])}`;
            
            for (let i = 1; i < dataset.data.length; i++) {
              pathD += ` L ${padding.left + xScale(i)} ${padding.top + yScale(baseValues[i])}`;
            }
            
            for (let i = dataset.data.length - 1; i >= 0; i--) {
              const combinedValue = baseValues[i] + dataset.data[i];
              pathD += ` L ${padding.left + xScale(i)} ${padding.top + yScale(combinedValue)}`;
            }
            
            pathD += ' Z';
            
            return (
              <path
                key={dataset.name}
                d={pathD}
                fill={dataset.color}
                fillOpacity="0.7"
                stroke={dataset.color}
                strokeWidth="1"
              />
            );
          }
        });
        
        // Generate points for line chart
        const points = data.type === 'line' ? data.datasets.map(dataset => (
          dataset.data.map((value, index) => (
            <circle
              key={`${dataset.name}-${index}`}
              cx={padding.left + xScale(index)}
              cy={padding.top + yScale(value)}
              r="4"
              fill={dataset.color}
            />
          ))
        )) : null;
        
        return (
          <div className="mt-6">
            <svg width={chartWidth} height={chartHeight} className="mx-auto">
              {/* Y Axis */}
              <line
                x1={padding.left}
                y1={padding.top}
                x2={padding.left}
                y2={padding.top + innerHeight}
                stroke="#e5e7eb"
                strokeWidth="1"
              />
              
              {/* X Axis */}
              <line
                x1={padding.left}
                y1={padding.top + innerHeight}
                x2={padding.left + innerWidth}
                y2={padding.top + innerHeight}
                stroke="#e5e7eb"
                strokeWidth="1"
              />
              
              {/* Horizontal Grid Lines */}
              {Array.from({ length: 5 }).map((_, i) => (
                <line
                  key={`grid-h-${i}`}
                  x1={padding.left}
                  y1={padding.top + (innerHeight * i) / 4}
                  x2={padding.left + innerWidth}
                  y2={padding.top + (innerHeight * i) / 4}
                  stroke="#f3f4f6"
                  strokeWidth="1"
                />
              ))}
              
              {/* Y Axis Labels */}
              {Array.from({ length: 5 }).map((_, i) => (
                <text
                  key={`label-y-${i}`}
                  x={padding.left - 10}
                  y={padding.top + (innerHeight * i) / 4 + 5}
                  textAnchor="end"
                  fontSize="10"
                  fill="#6b7280"
                >
                  {formatValue(maxValue - (maxValue * i) / 4, data.datasets[0].format)}
                </text>
              ))}
              
              {/* X Axis Labels (showing only some for clarity) */}
              {data.labels
                .filter((_, i) => i % Math.ceil(data.labels.length / 6) === 0)
                .map((label, i, filteredLabels) => (
                  <text
                    key={`label-x-${i}`}
                    x={padding.left + xScale(i * Math.ceil(data.labels.length / filteredLabels.length))}
                    y={padding.top + innerHeight + 20}
                    textAnchor="middle"
                    fontSize="10"
                    fill="#6b7280"
                  >
                    {label}
                  </text>
                ))}
              
              {/* Chart Paths */}
              {paths}
              
              {/* Data Points (for line charts) */}
              {points && points.flat()}
            </svg>
            
            {/* Legend */}
            <div className="flex justify-center mt-4 space-x-6">
              {data.datasets.map(dataset => (
                <div key={dataset.name} className="flex items-center">
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: dataset.color }}
                  ></div>
                  <span className="text-sm text-gray-700">{dataset.name}</span>
                </div>
              ))}
            </div>
          </div>
        );
      }
      
      case 'bar': {
        // Find max value for scaling
        const maxValue = Math.max(
          ...data.datasets.map(ds => Math.max(...ds.data))
        );
        
        // Bar width calculations
        const groupWidth = innerWidth / data.labels.length;
        const barWidth = (groupWidth * 0.8) / data.datasets.length;
        const barSpacing = groupWidth * 0.2 / (data.datasets.length + 1);
        
        // Y scale
        const yScale = value => innerHeight - (value / maxValue) * innerHeight;
        
        return (
          <div className="mt-6">
            <svg width={chartWidth} height={chartHeight} className="mx-auto">
              {/* Y Axis */}
              <line
                x1={padding.left}
                y1={padding.top}
                x2={padding.left}
                y2={padding.top + innerHeight}
                stroke="#e5e7eb"
                strokeWidth="1"
              />
              
              {/* X Axis */}
              <line
                x1={padding.left}
                y1={padding.top + innerHeight}
                x2={padding.left + innerWidth}
                y2={padding.top + innerHeight}
                stroke="#e5e7eb"
                strokeWidth="1"
              />
              
              {/* Horizontal Grid Lines */}
              {Array.from({ length: 5 }).map((_, i) => (
                <line
                  key={`grid-h-${i}`}
                  x1={padding.left}
                  y1={padding.top + (innerHeight * i) / 4}
                  x2={padding.left + innerWidth}
                  y2={padding.top + (innerHeight * i) / 4}
                  stroke="#f3f4f6"
                  strokeWidth="1"
                />
              ))}
              
              {/* Y Axis Labels */}
              {Array.from({ length: 5 }).map((_, i) => (
                <text
                  key={`label-y-${i}`}
                  x={padding.left - 10}
                  y={padding.top + (innerHeight * i) / 4 + 5}
                  textAnchor="end"
                  fontSize="10"
                  fill="#6b7280"
                >
                  {formatValue(maxValue - (maxValue * i) / 4, data.datasets[0].format)}
                </text>
              ))}
              
              {/* Bars */}
              {data.datasets.map((dataset, datasetIndex) => (
                data.labels.map((label, labelIndex) => {
                  const barHeight = yScale(0) - yScale(dataset.data[labelIndex]);
                  const barX = padding.left + (labelIndex * groupWidth) + barSpacing + (datasetIndex * (barWidth + barSpacing));
                  const barY = padding.top + yScale(dataset.data[labelIndex]);
                  
                  return (
                    <rect
                      key={`${dataset.name}-${label}`}
                      x={barX}
                      y={barY}
                      width={barWidth}
                      height={barHeight}
                      fill={dataset.color}
                      fillOpacity="0.9"
                    />
                  );
                })
              ))}
              
              {/* X Axis Labels */}
              {data.labels.map((label, i) => (
                <text
                  key={`label-x-${i}`}
                  x={padding.left + (i * groupWidth) + (groupWidth / 2)}
                  y={padding.top + innerHeight + 20}
                  textAnchor="middle"
                  fontSize="9"
                  fill="#6b7280"
                >
                  {label.length > 10 ? `${label.substring(0, 10)}...` : label}
                </text>
              ))}
            </svg>
            
            {/* Legend */}
            <div className="flex justify-center mt-4 space-x-6">
              {data.datasets.map(dataset => (
                <div key={dataset.name} className="flex items-center">
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: dataset.color }}
                  ></div>
                  <span className="text-sm text-gray-700">{dataset.name}</span>
                </div>
              ))}
            </div>
          </div>
        );
      }
      
      case 'pie': {
        const dataset = data.datasets[0];
        const total = dataset.data.reduce((sum, val) => sum + val, 0);
        const radius = Math.min(innerWidth, innerHeight) / 2;
        const centerX = padding.left + innerWidth / 2;
        const centerY = padding.top + innerHeight / 2;
        
        // Create pie slices
        let startAngle = 0;
        const slices = dataset.data.map((value, index) => {
          const percentage = value / total;
          const endAngle = startAngle + percentage * 2 * Math.PI;
          
          // Calculate SVG arc path
          const x1 = centerX + radius * Math.cos(startAngle);
          const y1 = centerY + radius * Math.sin(startAngle);
          const x2 = centerX + radius * Math.cos(endAngle);
          const y2 = centerY + radius * Math.sin(endAngle);
          
          // Arc path
          const largeArcFlag = endAngle - startAngle > Math.PI ? 1 : 0;
          const pathD = `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
          
          // Label position
          const labelAngle = startAngle + (endAngle - startAngle) / 2;
          const labelRadius = radius * 0.7;
          const labelX = centerX + labelRadius * Math.cos(labelAngle);
          const labelY = centerY + labelRadius * Math.sin(labelAngle);
          
          // Calculate legend items positionally
          const slice = (
            <g key={`slice-${index}`}>
              <path
                d={pathD}
                fill={dataset.colors[index]}
                stroke="#ffffff"
                strokeWidth="1"
              />
              {percentage > 0.05 && (
                <text
                  x={labelX}
                  y={labelY}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="11"
                  fill="#ffffff"
                  fontWeight="bold"
                >
                  {Math.round(percentage * 100)}%
                </text>
              )}
            </g>
          );
          
          startAngle = endAngle;
          return slice;
        });
        
        return (
          <div className="mt-6">
            <svg width={chartWidth} height={chartHeight} className="mx-auto">
              {slices}
            </svg>
            
            {/* Legend */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-4 max-w-md mx-auto">
              {data.labels.map((label, index) => (
                <div key={label} className="flex items-center">
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: dataset.colors[index] }}
                  ></div>
                  <span className="text-sm text-gray-700">
                    {label} ({Math.round((dataset.data[index] / total) * 100)}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
      }
      
      default:
        return <p className="text-red-500">Unsupported chart type</p>;
    }
  };
  
  const renderInsights = () => {
    if (!data || !data.insights || data.insights.length === 0) return null;
    
    return (
      <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Key Insights</h3>
        <ul className="space-y-2">
          {data.insights.map((insight, index) => (
            <li key={index} className="flex items-start">
              {insight.type === 'positive' && (
                <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              )}
              {insight.type === 'negative' && (
                <svg className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
              {insight.type === 'neutral' && (
                <svg className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
              <span className="text-sm text-gray-600">{insight.text}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Data Visualization & Analytics</h2>
      
      <div className="mb-6">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {chartTypes.map(chart => (
              <div
                key={chart.id}
                onClick={() => setActiveChart(chart.id)}
                className={`cursor-pointer rounded-lg p-3 ${
                  activeChart === chart.id
                    ? 'bg-blue-50 border border-blue-200'
                    : 'bg-white border border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  {chart.icon === 'chart-bar' && (
                    <svg className={`h-5 w-5 mr-2 ${activeChart === chart.id ? 'text-blue-600' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  )}
                  {chart.icon === 'users' && (
                    <svg className={`h-5 w-5 mr-2 ${activeChart === chart.id ? 'text-blue-600' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  )}
                  {chart.icon === 'chart-pie' && (
                    <svg className={`h-5 w-5 mr-2 ${activeChart === chart.id ? 'text-blue-600' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                    </svg>
                  )}
                  {chart.icon === 'globe' && (
                    <svg className={`h-5 w-5 mr-2 ${activeChart === chart.id ? 'text-blue-600' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                  <h3 className={`font-medium ${activeChart === chart.id ? 'text-blue-800' : 'text-gray-700'}`}>
                    {chart.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-center mb-6">
        {data && (
          <div>
            <h3 className="text-lg font-medium text-gray-900">{data.title}</h3>
            <p className="text-sm text-gray-500">{data.description}</p>
          </div>
        )}
        
        <div className="flex space-x-2">
          {timeRanges.map(range => (
            <button
              key={range.id}
              onClick={() => setTimeRange(range.id)}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                timeRange === range.id
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              {range.name}
            </button>
          ))}
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner />
          <span className="ml-3 text-gray-600">Loading data...</span>
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          {error}
        </div>
      ) : (
        <>
          {renderChart()}
          {renderInsights()}
        </>
      )}
    </div>
  );
}
