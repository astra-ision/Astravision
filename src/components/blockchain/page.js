'use client';

import { useState } from 'react';
import WalletConnect from '@/components/blockchain/WalletConnect';
import TransactionHistory from '@/components/blockchain/TransactionHistory';
import DocumentVerifier from '@/components/blockchain/DocumentVerifier';
import NFTMarketplace from '@/components/blockchain/NFTMarketplace';
import SmartContractManagement from '@/components/blockchain/SmartContractManagement';
import DefiDashboard from '@/components/blockchain/DefiDashboard';

export default function BlockchainPage() {
  const [activeTab, setActiveTab] = useState('wallet');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'wallet':
        return <WalletConnect />;
      case 'transactions':
        return <TransactionHistory />;
      case 'documents':
        return <DocumentVerifier />;
      case 'nft':
        return <NFTMarketplace />;
      case 'contracts':
        return <SmartContractManagement />;
      case 'defi':
        return <DefiDashboard />;
      default:
        return <WalletConnect />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">Blockchain Services</h1>
        <p className="mt-2 text-gray-600">
          Manage and interact with blockchain features
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200 overflow-x-auto">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('wallet')}
            className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'wallet'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Wallet Connect
          </button>
          <button
            onClick={() => setActiveTab('transactions')}
            className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'transactions'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Transaction History
          </button>
          <button
            onClick={() => setActiveTab('documents')}
            className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'documents'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Document Verification
          </button>
          <button
            onClick={() => setActiveTab('nft')}
            className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'nft'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            NFT Marketplace
          </button>
          <button
            onClick={() => setActiveTab('contracts')}
            className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'contracts'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Smart Contract Management
          </button>
          <button
            onClick={() => setActiveTab('defi')}
            className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'defi'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            DeFi Dashboard
          </button>
        </nav>
      </div>

      {/* Tab content */}
      <div className="mb-6">
        {renderTabContent()}
      </div>

      {/* Additional content can go here */}
    </div>
  );
}
