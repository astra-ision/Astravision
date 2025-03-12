'use client';

import { useEffect, useRef } from 'react';

export default function Chart({
  type = 'line',
  data = [],
  labels = [],
  colors = ['#3b82f6', '#f59e0b', '#10b981', '#6366f1', '#ec4899', '#6b7280'],
  height = 300,
  width = '100%',
  showLegend = true,
  title = '',
  yAxisLabel = '',
  xAxisLabel = '',
  tooltips = true,
  stacked = false,
  fillOpacity = 0.2,
  lineWidth = 2,
  gridColor = '#e5e7eb',
  textColor = '#6b7280',
  animate = true
}) {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = height;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Define margins and chart area
    const margin = { top: 40, right: 30, bottom: 50, left: 60 };
    const chartWidth = canvas.width - margin.left - margin.right;
    const chartHeight = canvas.height - margin.top - margin.bottom;
    
    // Ensure data is in the correct format
    const datasets = Array.isArray(data[0]) ? data : [data];
    
    // Find max value for y-axis
    const maxValue = stacked
      ? Math.max(...labels.map((_, i) => {
          return datasets.reduce((acc, data) => acc + (data[i] || 0), 0);
        }))
      : Math.max(...datasets.flat().filter(v => v !== null && v !== undefined));
    
    // Define scales
    const xScale = chartWidth / Math.max(labels.length - 1, 1);
    const yScale = chartHeight / (maxValue || 1);
    
    // Draw grid
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 0.5;
    
    // Horizontal grid lines
    const gridLines = 5;
    for (let i = 0; i <= gridLines; i++) {
      const y = margin.top + chartHeight - (i / gridLines) * chartHeight;
      ctx.beginPath();
      ctx.moveTo(margin.left, y);
      ctx.lineTo(margin.left + chartWidth, y);
      ctx.stroke();
      
      // Y-axis labels
      ctx.fillStyle = textColor;
      ctx.font = '12px Arial';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.fillText(
        ((i / gridLines) * maxValue).toFixed(0),
        margin.left - 10,
        y
      );
    }
    
    // Vertical grid lines for bar charts
    if (type === 'bar') {
      for (let i = 0; i < labels.length; i++) {
        const x = margin.left + i * xScale + xScale / 2;
        ctx.beginPath();
        ctx.moveTo(x, margin.top);
        ctx.lineTo(x, margin.top + chartHeight);
        ctx.stroke();
      }
    }
    
    // X-axis labels
    ctx.fillStyle = textColor;
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    
    labels.forEach((label, i) => {
      const x = margin.left + i * xScale;
      ctx.fillText(
        label,
        type === 'bar' ? x + xScale / 2 : x,
        margin.top + chartHeight + 10
      );
    });
    
    // X and Y axis labels
    if (xAxisLabel) {
      ctx.fillStyle = textColor;
      ctx.font = 'bold 14px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(
        xAxisLabel,
        margin.left + chartWidth / 2,
        canvas.height - 10
      );
    }
    
    if (yAxisLabel) {
      ctx.save();
      ctx.fillStyle = textColor;
      ctx.font = 'bold 14px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.translate(15, margin.top + chartHeight / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.fillText(yAxisLabel, 0, 0);
      ctx.restore();
    }
    
    // Draw title
    if (title) {
      ctx.fillStyle = textColor;
      ctx.font = 'bold 16px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillText(title, canvas.width / 2, 10);
    }
    
    // Draw chart based on type
    if (type === 'line') {
      datasets.forEach((dataset, datasetIndex) => {
        const color = colors[datasetIndex % colors.length];
        
        // Draw line
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        
        dataset.forEach((value, i) => {
          const x = margin.left + i * xScale;
          const y = margin.top + chartHeight - (value * yScale || 0);
          
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        });
        
        ctx.stroke();
        
        // Fill area under line
        if (fillOpacity > 0) {
          ctx.fillStyle = color + Math.round(fillOpacity * 255).toString(16).padStart(2, '0');
          ctx.lineTo(margin.left + (dataset.length - 1) * xScale, margin.top + chartHeight);
          ctx.lineTo(margin.left, margin.top + chartHeight);
          ctx.closePath();
          ctx.fill();
        }
        
        // Draw points
        dataset.forEach((value, i) => {
          const x = margin.left + i * xScale;
          const y = margin.top + chartHeight - (value * yScale || 0);
          
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(x, y, 4, 0, Math.PI * 2);
          ctx.fill();
          
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(x, y, 2, 0, Math.PI * 2);
          ctx.fill();
        });
      });
    } else if (type === 'bar') {
      const barWidth = (xScale * 0.8) / datasets.length;
      
      datasets.forEach((dataset, datasetIndex) => {
        const color = colors[datasetIndex % colors.length];
        
        dataset.forEach((value, i) => {
          const x = margin.left + i * xScale + xScale * 0.1 + datasetIndex * barWidth;
          const y = margin.top + chartHeight - (value * yScale || 0);
          const height = value * yScale || 0;
          
          ctx.fillStyle = color;
          ctx.fillRect(x, y, barWidth, height);
          
          // Add border to bars
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
          ctx.lineWidth = 1;
          ctx.strokeRect(x, y, barWidth, height);
        });
      });
    } else if (type === 'pie') {
      const centerX = margin.left + chartWidth / 2;
      const centerY = margin.top + chartHeight / 2;
      const radius = Math.min(chartWidth, chartHeight) / 2;
      
      // Flatten data for pie chart
      const pieData = datasets[0] || [];
      const total = pieData.reduce((sum, value) => sum + value, 0);
      
      let startAngle = 0;
      
      pieData.forEach((value, i) => {
        const sliceAngle = (2 * Math.PI * value) / total;
        const endAngle = startAngle + sliceAngle;
        const color = colors[i % colors.length];
        
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.closePath();
        ctx.fill();
        
        // Add white border to slices
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Add labels to pie slices
        const labelAngle = startAngle + sliceAngle / 2;
        const labelRadius = radius * 0.7;
        const labelX = centerX + Math.cos(labelAngle) * labelRadius;
        const labelY = centerY + Math.sin(labelAngle) * labelRadius;
        
        ctx.fillStyle = 'white';
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        const percentage = Math.round((value / total) * 100);
        if (percentage >= 5) { // Only show label if slice is big enough
          ctx.fillText(`${percentage}%`, labelX, labelY);
        }
        
        startAngle = endAngle;
      });
    }
    
    // Draw legend
    if (showLegend && datasets.length > 1) {
      const legendY = margin.top + chartHeight + 30;
      const legendItemWidth = chartWidth / datasets.length;
      
      datasets.forEach((_, i) => {
        const color = colors[i % colors.length];
        const x = margin.left + i * legendItemWidth + legendItemWidth / 2;
        
        ctx.fillStyle = color;
        ctx.fillRect(x - 30, legendY, 20, 10);
        
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.lineWidth = 1;
        ctx.strokeRect(x - 30, legendY, 20, 10);
        
        ctx.fillStyle = textColor;
        ctx.font = '12px Arial';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(`Series ${i + 1}`, x - 5, legendY + 5);
      });
    }
  }, [
    data,
    labels,
    colors,
    height,
    width,
    showLegend,
    title,
    yAxisLabel,
    xAxisLabel,
    tooltips,
    stacked,
    fillOpacity,
    lineWidth,
    gridColor,
    textColor,
    animate,
    type
  ]);
  
  return (
    <div className="relative" style={{ width, height }}>
      <canvas ref={canvasRef} />
    </div>
  );
} 