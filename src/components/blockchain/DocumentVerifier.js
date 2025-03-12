'use client';

import { useState } from 'react';
import Button from '../ui/Button';
import LoadingSpinner from '../ui/LoadingSpinner';

export default function DocumentVerifier({ account }) {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [documentName, setDocumentName] = useState('');
  const [description, setDescription] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);
  const [error, setError] = useState('');
  const [mode, setMode] = useState('add'); // 'add' or 'verify'

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Check file size (max 5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError('File size should be less than 5MB.');
        setFile(null);
        setFileName('');
        return;
      }

      setFile(selectedFile);
      setFileName(selectedFile.name);
      setError('');
      setVerificationResult(null);
    }
  };

  const calculateFileHash = async (file) => {
    // In a real application, compute the SHA-256 hash of the file
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
    
    // Convert the hash to a hex string
    return Array.from(new Uint8Array(hashBuffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  };

  const handleAddDocument = async (e) => {
    e.preventDefault();
    
    if (!account) {
      setError('Please connect your wallet first');
      return;
    }
    
    if (!file) {
      setError('Please select a file to add');
      return;
    }
    
    if (!documentName.trim()) {
      setError('Please enter a document name');
      return;
    }
    
    setVerifying(true);
    setError('');

    try {
      // Calculate file hash
      const hash = await calculateFileHash(file);
      
      // In a real implementation, you would call a smart contract
      // const contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
      // await contract.methods.addDocument(hash, documentName, description).send({ from: account });
      
      // For now, we'll simulate a successful transaction
      setTimeout(() => {
        setVerificationResult({
          type: 'add',
          hash,
          name: documentName,
          description,
          timestamp: new Date().toISOString(),
          transactionHash: '0x' + Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('')
        });
        setVerifying(false);
        
        // Reset form
        setFile(null);
        setFileName('');
        setDocumentName('');
        setDescription('');
      }, 2000);
    } catch (err) {
      console.error('Error adding document:', err);
      setError(err.message || 'Failed to add document to blockchain. Please try again.');
      setVerifying(false);
    }
  };

  const handleVerifyDocument = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setError('Please select a file to verify');
      return;
    }
    
    setVerifying(true);
    setError('');

    try {
      // Calculate file hash
      const hash = await calculateFileHash(file);
      
      // In a real implementation, you would call a smart contract
      // const contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
      // const docInfo = await contract.methods.getDocument(hash).call();
      
      // For now, we'll simulate a verification result (sometimes verified, sometimes not)
      setTimeout(() => {
        const isVerified = Math.random() > 0.3;
        
        if (isVerified) {
          setVerificationResult({
            type: 'verify',
            verified: true,
            hash,
            name: 'Contract Agreement',
            description: 'Legal contract between parties',
            owner: '0x1234567890123456789012345678901234567890',
            timestamp: new Date(Date.now() - 86400000 * 30).toISOString()
          });
        } else {
          setVerificationResult({
            type: 'verify',
            verified: false,
            hash
          });
        }
        
        setVerifying(false);
      }, 2000);
    } catch (err) {
      console.error('Error verifying document:', err);
      setError(err.message || 'Failed to verify document. Please try again.');
      setVerifying(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setFileName('');
    setDocumentName('');
    setDescription('');
    setVerificationResult(null);
    setError('');
  };

  if (!account) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
        <p className="text-gray-500">Connect your wallet to verify documents on the blockchain</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-6">Document Verification</h2>

      {/* Mode selector */}
      <div className="flex border border-gray-200 rounded-lg overflow-hidden mb-6">
        <button
          className={`flex-1 py-2 text-center ${
            mode === 'add'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
          }`}
          onClick={() => {
            setMode('add');
            handleReset();
          }}
        >
          Add Document
        </button>
        <button
          className={`flex-1 py-2 text-center ${
            mode === 'verify'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
          }`}
          onClick={() => {
            setMode('verify');
            handleReset();
          }}
        >
          Verify Document
        </button>
      </div>
      
      {error && (
        <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {!verificationResult ? (
        <form onSubmit={mode === 'add' ? handleAddDocument : handleVerifyDocument}>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Upload Document</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors">
              {fileName ? (
                <div>
                  <p className="text-green-600 mb-2">Selected file: {fileName}</p>
                  <button
                    type="button"
                    onClick={() => {
                      setFile(null);
                      setFileName('');
                    }}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div>
                  <p className="text-gray-500 mb-2">Drag & drop your file here or click to browse</p>
                  <p className="text-xs text-gray-400">Max size: 5MB</p>
                </div>
              )}
              <input
                type="file"
                className={`absolute inset-0 w-full h-full opacity-0 cursor-pointer ${fileName ? 'pointer-events-none' : ''}`}
                onChange={handleFileChange}
                disabled={verifying}
              />
            </div>
          </div>
          
          {mode === 'add' && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="documentName">
                  Document Name
                </label>
                <input
                  id="documentName"
                  type="text"
                  value={documentName}
                  onChange={(e) => setDocumentName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={verifying}
                  required
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 mb-2" htmlFor="description">
                  Description (Optional)
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                  disabled={verifying}
                />
              </div>
            </>
          )}
          
          <div className="flex justify-center">
            <Button
              type="submit"
              disabled={!file || verifying}
              className="w-full md:w-auto"
            >
              {verifying ? (
                <>
                  <LoadingSpinner size="small" className="mr-2" />
                  {mode === 'add' ? 'Adding to Blockchain...' : 'Verifying...'}
                </>
              ) : (
                mode === 'add' ? 'Add to Blockchain' : 'Verify Document'
              )}
            </Button>
          </div>
        </form>
      ) : (
        <div className="space-y-6">
          {verificationResult.type === 'add' ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-800 mb-4">Document Added Successfully</h3>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Document Hash (SHA-256)</p>
                  <p className="font-mono text-sm break-all">{verificationResult.hash}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Document Name</p>
                  <p>{verificationResult.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Description</p>
                  <p>{verificationResult.description || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Timestamp</p>
                  <p>{new Date(verificationResult.timestamp).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Transaction Hash</p>
                  <p className="font-mono text-sm break-all">{verificationResult.transactionHash}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className={`${verificationResult.verified ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'} border rounded-lg p-6`}>
              <h3 className={`text-lg font-semibold ${verificationResult.verified ? 'text-green-800' : 'text-red-800'} mb-4`}>
                {verificationResult.verified ? 'Document Verified ✓' : 'Document Not Found ✗'}
              </h3>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Document Hash (SHA-256)</p>
                  <p className="font-mono text-sm break-all">{verificationResult.hash}</p>
                </div>
                
                {verificationResult.verified && (
                  <>
                    <div>
                      <p className="text-sm text-gray-500">Document Name</p>
                      <p>{verificationResult.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Description</p>
                      <p>{verificationResult.description || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Owner</p>
                      <p className="font-mono">{verificationResult.owner}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Added On</p>
                      <p>{new Date(verificationResult.timestamp).toLocaleString()}</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
          
          <div className="flex justify-center mt-6">
            <Button
              onClick={handleReset}
              className="bg-gray-500 hover:bg-gray-600"
            >
              {mode === 'add' ? 'Add Another Document' : 'Verify Another Document'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
} 