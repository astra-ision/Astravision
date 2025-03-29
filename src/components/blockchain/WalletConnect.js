'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';

export default function WalletConnect() {
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState('');
  const [connectionError, setConnectionError] = useState('');
  const [loading, setLoading] = useState(false);
  const [networkName, setNetworkName] = useState('');
  
  // Check if MetaMask is installed
  const isMetaMaskInstalled = typeof window !== 'undefined' && window.ethereum;
  
  // Check if already connected on component mount
  useEffect(() => {
    checkConnection();
  }, []);
  
  // Function to get the network name
  const getNetworkName = async () => {
    if (!isMetaMaskInstalled) return;
    
    try {
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      switch (chainId) {
        case '0x1':
          return 'Ethereum Mainnet';
        case '0x5':
          return 'Goerli Testnet';
        case '0xaa36a7':
          return 'Sepolia Testnet';
        case '0x89':
          return 'Polygon Mainnet';
        case '0x13881':
          return 'Mumbai Testnet';
        default:
          return `Unknown Network (${chainId})`;
      }
    } catch (error) {
      console.error('Error getting network:', error);
      return 'Unknown Network';
    }
  };
  
  // Check if already connected
  const checkConnection = async () => {
    if (!isMetaMaskInstalled) return;
    
    try {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        await getBalance(accounts[0]);
        const network = await getNetworkName();
        setNetworkName(network);
      }
    } catch (error) {
      console.error('Error checking connection:', error);
    }
  };
  
  // Get account balance
  const getBalance = async (address) => {
    if (!isMetaMaskInstalled || !address) return;
    
    try {
      const balance = await window.ethereum.request({
        method: 'eth_getBalance',
        params: [address, 'latest'],
      });
      
      // Convert from Wei to ETH
      const ethBalance = parseInt(balance, 16) / 1e18;
      setBalance(ethBalance.toFixed(4));
    } catch (error) {
      console.error('Error getting balance:', error);
    }
  };
  
  // Connect wallet
  const connectWallet = async () => {
    if (!isMetaMaskInstalled) {
      setConnectionError('MetaMask is not installed. Please install MetaMask to continue.');
      return;
    }
    
    setLoading(true);
    setConnectionError('');
    
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);
      await getBalance(accounts[0]);
      const network = await getNetworkName();
      setNetworkName(network);
    } catch (error) {
      console.error('Error connecting wallet:', error);
      setConnectionError(error.message || 'Failed to connect wallet. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  // Disconnect wallet (note: this doesn't actually disconnect from MetaMask,
  // it just clears the state in this component)
  const disconnectWallet = () => {
    setAccount('');
    setBalance('');
    setNetworkName('');
  };
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-6">Blockchain Wallet</h2>
      
      {connectionError && (
        <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {connectionError}
          {!isMetaMaskInstalled && (
            <div className="mt-2">
              <a 
                href="https://metamask.io/download/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                Download MetaMask
              </a>
            </div>
          )}
        </div>
      )}
      
      {!account ? (
        <div className="text-center">
          <Button
            onClick={connectWallet}
            disabled={loading || !isMetaMaskInstalled}
            className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600"
          >
            {loading ? 'Connecting...' : 'Connect MetaMask'}
          </Button>
          <p className="mt-4 text-gray-600 text-sm">
            Connect your MetaMask wallet to access blockchain features
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500 mb-1">Connected Account</p>
                <p className="font-mono text-sm md:text-base truncate">
                  {account}
                </p>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(account);
                  // You could add a toast notification here
                }}
                className="text-blue-600 hover:text-blue-800"
              >
                Copy
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <p className="text-sm text-gray-500 mb-1">Network</p>
              <p className="font-semibold">{networkName}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <p className="text-sm text-gray-500 mb-1">Balance</p>
              <p className="font-semibold">{balance} ETH</p>
            </div>
          </div>
          
          <div className="flex justify-center">
            <Button
              onClick={disconnectWallet}
              className="bg-gray-500 hover:bg-gray-600"
            >
              Disconnect Wallet
            </Button>
          </div>
        </div>
      )}
    </div>
  );
} 