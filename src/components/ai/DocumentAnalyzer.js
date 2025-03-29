'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import LoadingSpinner from '../ui/LoadingSpinner';

export default function DocumentAnalyzer() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Check file type (PDF, DOCX, TXT)
      const fileType = selectedFile.type;
      if (
        fileType !== 'application/pdf' &&
        fileType !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' &&
        fileType !== 'text/plain'
      ) {
        setError('Please upload a PDF, DOCX, or TXT file.');
        setFile(null);
        setFileName('');
        return;
      }

      // Check file size (max 10MB)
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError('File size should be less than 10MB.');
        setFile(null);
        setFileName('');
        return;
      }

      setFile(selectedFile);
      setFileName(selectedFile.name);
      setError('');
      setResult(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file to analyze.');
      return;
    }

    setAnalyzing(true);
    setError('');

    try {
      // In a real implementation, you would upload the file to your server
      // const formData = new FormData();
      // formData.append('document', file);
      
      // const response = await fetch('/api/ai/analyze-document', {
      //   method: 'POST',
      //   body: formData,
      // });
      
      // const data = await response.json();
      // if (!response.ok) throw new Error(data.message || 'Failed to analyze document');
      
      // For now, we'll simulate a response
      setTimeout(() => {
        setResult({
          summary: 'This document appears to be a technical specification for a new AI-driven system. It outlines architecture, components, and implementation details.',
          keyPoints: [
            'Project timeline: 6 months',
            'Budget allocation: $120,000',
            'Primary technologies: TensorFlow, React, Node.js',
            'Integration with existing systems required',
            'Security compliance with ISO 27001 standards'
          ],
          entities: {
            people: ['John Smith', 'Maria Garcia', 'Ahmed Khan'],
            organizations: ['Astravision', 'TechPartners Inc.', 'Global AI Solutions'],
            dates: ['January 15, 2024', 'March 30, 2024', 'December 10, 2024']
          },
          sentiment: 'Positive',
          confidenceScore: 0.87
        });
        setAnalyzing(false);
      }, 2000);
    } catch (err) {
      console.error('Error analyzing document:', err);
      setError(err.message || 'Failed to analyze document. Please try again.');
      setAnalyzing(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setFileName('');
    setResult(null);
    setError('');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-6">Document Analyzer</h2>
      
      {error && (
        <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {!result ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Upload Document</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors">
              {fileName ? (
                <div>
                  <p className="text-green-600 mb-2">Selected file: {fileName}</p>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div>
                  <p className="text-gray-500 mb-2">Drag & drop your file here or click to browse</p>
                  <p className="text-xs text-gray-400">Supported formats: PDF, DOCX, TXT (Max size: 10MB)</p>
                </div>
              )}
              <input
                type="file"
                className={`absolute inset-0 w-full h-full opacity-0 cursor-pointer ${fileName ? 'pointer-events-none' : ''}`}
                onChange={handleFileChange}
                accept=".pdf,.docx,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
                disabled={analyzing}
              />
            </div>
          </div>
          
          <div className="flex justify-center">
            <Button
              type="submit"
              disabled={!file || analyzing}
              className="w-full md:w-auto"
            >
              {analyzing ? (
                <>
                  <LoadingSpinner size="small" className="mr-2" />
                  Analyzing...
                </>
              ) : (
                'Analyze Document'
              )}
            </Button>
          </div>
        </form>
      ) : (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Summary</h3>
            <p className="text-gray-700">{result.summary}</p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">Key Points</h3>
            <ul className="list-disc list-inside space-y-1">
              {result.keyPoints.map((point, index) => (
                <li key={index} className="text-gray-700">{point}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">Detected Entities</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">People</h4>
                <ul className="text-sm text-gray-700">
                  {result.entities.people.map((person, index) => (
                    <li key={index}>{person}</li>
                  ))}
                </ul>
              </div>
              <div className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">Organizations</h4>
                <ul className="text-sm text-gray-700">
                  {result.entities.organizations.map((org, index) => (
                    <li key={index}>{org}</li>
                  ))}
                </ul>
              </div>
              <div className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">Dates</h4>
                <ul className="text-sm text-gray-700">
                  {result.entities.dates.map((date, index) => (
                    <li key={index}>{date}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mt-6">
            <Button
              onClick={handleReset}
              className="bg-gray-500 hover:bg-gray-600"
            >
              Analyze Another Document
            </Button>
          </div>
        </div>
      )}
    </div>
  );
} 