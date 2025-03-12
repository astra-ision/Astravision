'use client';

import { useState, useRef } from 'react';
import LoadingSpinner from '../ui/LoadingSpinner';

export default function ImageRecognition() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('object');
  
  const fileInputRef = useRef(null);
  
  const analysisModes = [
    { id: 'object', name: 'Object Detection', description: 'Identify objects within images with bounding boxes' },
    { id: 'classify', name: 'Image Classification', description: 'Categorize the entire image into classes' },
    { id: 'face', name: 'Face Detection', description: 'Detect and analyze facial features' },
    { id: 'ocr', name: 'Text Recognition', description: 'Extract text from images (OCR)' }
  ];
  
  const handleImageChange = (e) => {
    setError(null);
    setResults(null);
    
    const file = e.target.files[0];
    if (!file) return;
    
    // Check file type
    if (!file.type.includes('image/')) {
      setError('Please upload an image file (JPEG, PNG, etc.)');
      return;
    }
    
    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size exceeds 5MB limit');
      return;
    }
    
    setImage(file);
    
    // Create preview URL
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
  };
  
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    
    setError(null);
    setResults(null);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      
      // Check file type
      if (!file.type.includes('image/')) {
        setError('Please upload an image file (JPEG, PNG, etc.)');
        return;
      }
      
      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('File size exceeds 5MB limit');
        return;
      }
      
      setImage(file);
      
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    }
  };
  
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setResults(null);
  };
  
  const processImage = () => {
    if (!image) {
      setError('Please upload an image first');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      try {
        let mockResults;
        
        switch (activeTab) {
          case 'object':
            mockResults = {
              objects: [
                { class: 'person', confidence: 0.98, bbox: [50, 100, 320, 410] },
                { class: 'dog', confidence: 0.87, bbox: [390, 210, 210, 180] },
                { class: 'chair', confidence: 0.64, bbox: [570, 320, 110, 240] }
              ],
              processingTime: '1.2s'
            };
            break;
          case 'classify':
            mockResults = {
              classifications: [
                { class: 'living room', confidence: 0.82 },
                { class: 'indoor', confidence: 0.95 },
                { class: 'home', confidence: 0.78 },
                { class: 'pet', confidence: 0.71 },
                { class: 'furniture', confidence: 0.68 }
              ],
              processingTime: '0.8s'
            };
            break;
          case 'face':
            mockResults = {
              faces: [
                {
                  bbox: [120, 80, 160, 160],
                  confidence: 0.99,
                  landmarks: { eyes: 2, nose: 1, mouth: 1 },
                  attributes: { gender: 'female', age: 28, emotion: 'happy' }
                }
              ],
              processingTime: '1.5s'
            };
            break;
          case 'ocr':
            mockResults = {
              text: "The quick brown fox jumps over the lazy dog. This is an example of text extracted from the image using Optical Character Recognition (OCR) technology.",
              blocks: [
                { text: "The quick brown fox jumps over the lazy dog.", bbox: [50, 100, 400, 50], confidence: 0.95 },
                { text: "This is an example of text extracted from the image.", bbox: [50, 160, 400, 50], confidence: 0.92 },
                { text: "using Optical Character Recognition (OCR) technology.", bbox: [50, 220, 400, 50], confidence: 0.89 }
              ],
              languages: ["en"],
              processingTime: '1.1s'
            };
            break;
          default:
            mockResults = { error: 'Invalid analysis mode' };
        }
        
        setResults(mockResults);
      } catch (err) {
        setError('Error processing image: ' + err.message);
      } finally {
        setLoading(false);
      }
    }, 1500);
  };
  
  const renderResults = () => {
    if (!results) return null;
    
    switch (activeTab) {
      case 'object':
        return (
          <div>
            <h3 className="text-lg font-medium mb-3">Objects Detected</h3>
            <div className="relative mb-4">
              <img src={preview} alt="Preview" className="max-w-full rounded-lg" />
              {results.objects.map((obj, index) => (
                <div 
                  key={index}
                  className="absolute border-2 border-blue-500 bg-blue-500/20 rounded-sm flex items-end justify-start"
                  style={{
                    left: `${obj.bbox[0]}px`,
                    top: `${obj.bbox[1]}px`,
                    width: `${obj.bbox[2]}px`,
                    height: `${obj.bbox[3]}px`,
                  }}
                >
                  <span className="bg-blue-500 text-white text-xs px-1 py-0.5 rounded-sm">
                    {obj.class} ({Math.round(obj.confidence * 100)}%)
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-3">
              <p className="text-sm text-gray-600">
                Processing time: {results.processingTime}
              </p>
              <h4 className="text-md font-medium mt-2 mb-1">Objects ({results.objects.length}):</h4>
              <ul className="text-sm space-y-1">
                {results.objects.map((obj, index) => (
                  <li key={index} className="flex items-center">
                    <span className="w-24">{obj.class}</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full ml-2">
                      <div 
                        className="h-2 bg-blue-500 rounded-full" 
                        style={{ width: `${obj.confidence * 100}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 text-gray-700">{Math.round(obj.confidence * 100)}%</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
        
      case 'classify':
        return (
          <div>
            <h3 className="text-lg font-medium mb-3">Image Classification</h3>
            <div className="mb-4">
              <img src={preview} alt="Preview" className="max-w-full rounded-lg" />
            </div>
            <div className="mt-3">
              <p className="text-sm text-gray-600">
                Processing time: {results.processingTime}
              </p>
              <h4 className="text-md font-medium mt-2 mb-1">Categories:</h4>
              <ul className="text-sm space-y-1">
                {results.classifications.map((cls, index) => (
                  <li key={index} className="flex items-center">
                    <span className="w-24">{cls.class}</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full ml-2">
                      <div 
                        className="h-2 bg-green-500 rounded-full" 
                        style={{ width: `${cls.confidence * 100}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 text-gray-700">{Math.round(cls.confidence * 100)}%</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
        
      case 'face':
        return (
          <div>
            <h3 className="text-lg font-medium mb-3">Face Detection</h3>
            <div className="relative mb-4">
              <img src={preview} alt="Preview" className="max-w-full rounded-lg" />
              {results.faces.map((face, index) => (
                <div 
                  key={index}
                  className="absolute border-2 border-purple-500 bg-purple-500/20 rounded-sm"
                  style={{
                    left: `${face.bbox[0]}px`,
                    top: `${face.bbox[1]}px`,
                    width: `${face.bbox[2]}px`,
                    height: `${face.bbox[3]}px`,
                  }}
                >
                  <span className="absolute -top-6 left-0 bg-purple-500 text-white text-xs px-1 py-0.5 rounded-sm">
                    {face.attributes.gender}, ~{face.attributes.age} yrs, {face.attributes.emotion}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-3">
              <p className="text-sm text-gray-600">
                Processing time: {results.processingTime}
              </p>
              <h4 className="text-md font-medium mt-2 mb-1">Faces Detected: {results.faces.length}</h4>
              {results.faces.map((face, index) => (
                <div key={index} className="mb-3 bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm font-medium">Face #{index + 1} ({Math.round(face.confidence * 100)}% confidence)</p>
                  <div className="grid grid-cols-3 gap-2 mt-2 text-sm">
                    <div>
                      <span className="text-gray-600">Gender:</span> {face.attributes.gender}
                    </div>
                    <div>
                      <span className="text-gray-600">Age:</span> ~{face.attributes.age} years
                    </div>
                    <div>
                      <span className="text-gray-600">Emotion:</span> {face.attributes.emotion}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        
      case 'ocr':
        return (
          <div>
            <h3 className="text-lg font-medium mb-3">Text Recognition (OCR)</h3>
            <div className="relative mb-4">
              <img src={preview} alt="Preview" className="max-w-full rounded-lg" />
              {results.blocks.map((block, index) => (
                <div 
                  key={index}
                  className="absolute border border-red-500 bg-red-500/10 rounded-sm"
                  style={{
                    left: `${block.bbox[0]}px`,
                    top: `${block.bbox[1]}px`,
                    width: `${block.bbox[2]}px`,
                    height: `${block.bbox[3]}px`,
                  }}
                >
                </div>
              ))}
            </div>
            <div className="mt-3">
              <p className="text-sm text-gray-600">
                Processing time: {results.processingTime} | Language: {results.languages.join(', ')}
              </p>
              <h4 className="text-md font-medium mt-2 mb-1">Extracted Text:</h4>
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                <p className="whitespace-pre-line text-sm">{results.text}</p>
              </div>
              <h4 className="text-md font-medium mt-3 mb-1">Text Blocks ({results.blocks.length}):</h4>
              <ul className="text-sm space-y-1">
                {results.blocks.map((block, index) => (
                  <li key={index} className="flex flex-col">
                    <div className="flex items-center">
                      <span className="text-gray-700 font-medium">Block {index + 1}</span>
                      <span className="ml-2 text-gray-500 text-xs">
                        Confidence: {Math.round(block.confidence * 100)}%
                      </span>
                    </div>
                    <p className="text-gray-700">{block.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
        
      default:
        return <p className="text-red-500">Invalid analysis mode</p>;
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Image Recognition & Analysis</h2>
      
      <div className="mb-6">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {analysisModes.map(mode => (
              <div
                key={mode.id}
                onClick={() => handleTabChange(mode.id)}
                className={`cursor-pointer rounded-lg p-3 ${
                  activeTab === mode.id
                    ? 'bg-blue-50 border border-blue-200'
                    : 'bg-white border border-gray-200 hover:bg-gray-50'
                }`}
              >
                <h3 className={`font-medium ${activeTab === mode.id ? 'text-blue-800' : 'text-gray-700'}`}>
                  {mode.name}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  {mode.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <div 
            className="border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center p-6 h-64 bg-gray-50 cursor-pointer hover:bg-gray-100"
            onClick={handleUploadClick}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
              accept="image/*"
            />
            
            {preview ? (
              <img 
                src={preview} 
                alt="Preview" 
                className="max-h-full max-w-full rounded-lg object-contain" 
              />
            ) : (
              <>
                <svg className="h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="mt-2 text-sm text-gray-600">
                  Drag & drop an image here, or click to browse
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  PNG, JPG, GIF up to 5MB
                </p>
              </>
            )}
          </div>
          
          {error && (
            <div className="mt-3 text-red-500 text-sm">
              {error}
            </div>
          )}
          
          <div className="mt-4">
            <button
              onClick={processImage}
              disabled={!image || loading}
              className={`w-full py-2 px-4 rounded-lg ${
                !image || loading
                  ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <LoadingSpinner className="h-4 w-4" />
                  <span className="ml-2">Processing...</span>
                </div>
              ) : (
                `Analyze with ${analysisModes.find(m => m.id === activeTab)?.name || ''}`
              )}
            </button>
          </div>
          
          <div className="mt-4 text-sm text-gray-500">
            <h3 className="font-medium text-gray-700 mb-1">About this feature:</h3>
            <p>Upload an image to analyze it using our advanced AI. This feature can detect objects, classify images, identify faces, and extract text.</p>
            <p className="mt-2">For demonstration purposes, this is using simulated results.</p>
          </div>
        </div>
        
        <div>
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full">
              <LoadingSpinner className="h-8 w-8" />
              <p className="mt-4 text-gray-600">
                Analyzing your image...
              </p>
              <p className="text-sm text-gray-500 mt-2">
                This may take a few seconds
              </p>
            </div>
          ) : (
            <div>
              {results ? (
                renderResults()
              ) : (
                <div className="bg-gray-50 rounded-lg p-6 h-full flex flex-col items-center justify-center">
                  <svg className="h-16 w-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <p className="mt-4 text-gray-600 text-center">
                    Analysis results will appear here<br />
                    after you upload and analyze an image
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 