'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import NFTMarketplace from '@/components/blockchain/NFTMarketplace';
import SmartContractManagement from '@/components/blockchain/SmartContractManagement';
import DefiDashboard from '@/components/blockchain/DefiDashboard';
import DocumentVerifier from '@/components/blockchain/DocumentVerifier';
import TransactionHistory from '@/components/blockchain/TransactionHistory';
import WalletConnect from '@/components/blockchain/WalletConnect';

export default function BlockchainPage() {
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState('');
  
  // All blockchain navigation links including the additional ones
  const navLinks = [
    { name: 'NFT Marketplace', href: '/dashboard/blockchain/nft-marketplace' },
    { name: 'Smart Contracts', href: '/dashboard/blockchain/smart-contracts' },
    { name: 'DeFi Dashboard', href: '/dashboard/blockchain/defi-dashboard' },
    { name: 'Document Verifier', href: '/dashboard/blockchain/document-verifier' },
    { name: 'Transaction History', href: '/dashboard/blockchain/transaction-history' },
    { name: 'Wallet Connect', href: '/dashboard/blockchain/wallet-connect' }
  ];
  
  useEffect(() => {
    const currentPath = pathname.split('/').pop();
    setActiveTab(currentPath || 'nft-marketplace');
  }, [pathname]);

  const renderContent = () => {
    switch (activeTab) {
      case 'nft-marketplace':
        return <NFTMarketplace />;
      case 'smart-contracts':
        return <SmartContractManagement />;
      case 'defi-dashboard':
        return <DefiDashboard />;
      case 'document-verifier':
        return <DocumentVerifier />;
      case 'transaction-history':
        return <TransactionHistory />;
      case 'wallet-connect':
        return <WalletConnect />;
      default:
        return <NFTMarketplace />;
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Blockchain Solutions</h1>
      
      {/* Quick stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">Active Smart Contracts</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">12</dd>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">Total NFTs Minted</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">1,245</dd>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">DeFi TVL</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">$2.4M</dd>
          </div>
        </div>
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
                className={`${
                  activeTab === linkPath
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
    </div>
  );
} 