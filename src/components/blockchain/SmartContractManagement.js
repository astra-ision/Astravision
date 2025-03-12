'use client';

import { useState, useEffect } from 'react';
import LoadingSpinner from '../ui/LoadingSpinner';

export default function SmartContractManagement() {
  const [contracts, setContracts] = useState([]);
  const [networks, setNetworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeContract, setActiveContract] = useState(null);
  const [activeNetwork, setActiveNetwork] = useState('ethereum');
  const [activeTab, setActiveTab] = useState('overview');
  const [connected, setConnected] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Simulate API call with setTimeout
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock networks data
        const mockNetworks = [
          { id: 'ethereum', name: 'Ethereum Mainnet', icon: '🌐', chainId: '1' },
          { id: 'goerli', name: 'Goerli Testnet', icon: '🧪', chainId: '5' },
          { id: 'polygon', name: 'Polygon', icon: '⬡', chainId: '137' },
          { id: 'arbitrum', name: 'Arbitrum', icon: '🔷', chainId: '42161' },
          { id: 'optimism', name: 'Optimism', icon: '🔴', chainId: '10' }
        ];
        
        // Mock contracts data
        const mockContracts = [
          {
            id: 'contract-001',
            name: 'Token Sale Contract',
            address: '0x8Fc5d6Afe37AaA9F0B3e4CAa95401F2F9B27c620',
            network: 'ethereum',
            abi: '[ ... contract ABI ... ]',
            creationDate: '2023-01-15',
            creationTxHash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
            deployedBy: '0x8Fc5d6Afe37AaA9F0B3e4CAa95401F2F9B27c620',
            contract: {
              type: 'ERC20',
              verified: true,
              totalSupply: '1000000',
              holders: 248,
              functions: [
                { name: 'transfer', inputs: ['address', 'uint256'], outputs: ['bool'] },
                { name: 'balanceOf', inputs: ['address'], outputs: ['uint256'] },
                { name: 'approve', inputs: ['address', 'uint256'], outputs: ['bool'] },
                { name: 'transferFrom', inputs: ['address', 'address', 'uint256'], outputs: ['bool'] },
                { name: 'mint', inputs: ['address', 'uint256'], outputs: [] },
                { name: 'burn', inputs: ['uint256'], outputs: [] }
              ],
              events: [
                { name: 'Transfer', parameters: ['address indexed from', 'address indexed to', 'uint256 value'] },
                { name: 'Approval', parameters: ['address indexed owner', 'address indexed spender', 'uint256 value'] }
              ]
            }
          },
          {
            id: 'contract-002',
            name: 'NFT Collection',
            address: '0x7Bc5d6Ada37AfB9F0B3e4CAa95401F2F9B27c890',
            network: 'ethereum',
            abi: '[ ... contract ABI ... ]',
            creationDate: '2023-02-10',
            creationTxHash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
            deployedBy: '0x8Fc5d6Afe37AaA9F0B3e4CAa95401F2F9B27c620',
            contract: {
              type: 'ERC721',
              verified: true,
              totalSupply: '10000',
              holders: 3520,
              functions: [
                { name: 'mint', inputs: ['address', 'uint256'], outputs: [] },
                { name: 'balanceOf', inputs: ['address'], outputs: ['uint256'] },
                { name: 'ownerOf', inputs: ['uint256'], outputs: ['address'] },
                { name: 'safeTransferFrom', inputs: ['address', 'address', 'uint256'], outputs: [] },
                { name: 'transferFrom', inputs: ['address', 'address', 'uint256'], outputs: [] },
                { name: 'approve', inputs: ['address', 'uint256'], outputs: [] },
                { name: 'setApprovalForAll', inputs: ['address', 'bool'], outputs: [] },
                { name: 'getApproved', inputs: ['uint256'], outputs: ['address'] },
                { name: 'isApprovedForAll', inputs: ['address', 'address'], outputs: ['bool'] }
              ],
              events: [
                { name: 'Transfer', parameters: ['address indexed from', 'address indexed to', 'uint256 indexed tokenId'] },
                { name: 'Approval', parameters: ['address indexed owner', 'address indexed approved', 'uint256 indexed tokenId'] },
                { name: 'ApprovalForAll', parameters: ['address indexed owner', 'address indexed operator', 'bool approved'] }
              ]
            }
          },
          {
            id: 'contract-003',
            name: 'Staking Contract',
            address: '0x9Ca5d6Afe37AaA9F0B3e4CAa95401F2F9B27c456',
            network: 'polygon',
            abi: '[ ... contract ABI ... ]',
            creationDate: '2023-03-05',
            creationTxHash: '0x7890abcdef1234567890abcdef1234567890abcdef1234567890abcdef123456',
            deployedBy: '0x8Fc5d6Afe37AaA9F0B3e4CAa95401F2F9B27c620',
            contract: {
              type: 'Custom',
              verified: true,
              totalSupply: 'N/A',
              holders: 'N/A',
              functions: [
                { name: 'stake', inputs: ['uint256'], outputs: [] },
                { name: 'unstake', inputs: ['uint256'], outputs: [] },
                { name: 'claim', inputs: [], outputs: [] },
                { name: 'getReward', inputs: ['address'], outputs: ['uint256'] },
                { name: 'getStakedAmount', inputs: ['address'], outputs: ['uint256'] }
              ],
              events: [
                { name: 'Staked', parameters: ['address indexed user', 'uint256 amount'] },
                { name: 'Unstaked', parameters: ['address indexed user', 'uint256 amount'] },
                { name: 'RewardClaimed', parameters: ['address indexed user', 'uint256 amount'] }
              ]
            }
          }
        ];
        
        setNetworks(mockNetworks);
        setContracts(mockContracts);
      } catch (err) {
        setError('Error loading contract data: ' + err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  const handleNetworkChange = (networkId) => {
    setActiveNetwork(networkId);
    setActiveContract(null);
  };
  
  const handleContractSelect = (contract) => {
    setActiveContract(contract);
    setActiveTab('overview');
  };
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  
  const handleConnectWallet = () => {
    setConnected(true);
  };
  
  const truncateAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };
  
  const filteredContracts = contracts.filter(contract => 
    contract.network === activeNetwork
  );
  
  const renderContractList = () => {
    if (filteredContracts.length === 0) {
      return (
        <div className="border border-gray-200 rounded-lg p-6 text-center bg-gray-50">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No contracts found</h3>
          <p className="mt-1 text-sm text-gray-500">
            You have no contracts deployed on this network.
          </p>
          <div className="mt-6">
            <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
              Deploy New Contract
            </button>
          </div>
        </div>
      );
    }
    
    return (
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {filteredContracts.map(contract => (
            <li 
              key={contract.id}
              className={`cursor-pointer hover:bg-gray-50 ${activeContract?.id === contract.id ? 'bg-blue-50' : ''}`}
              onClick={() => handleContractSelect(contract)}
            >
              <div className="px-4 py-4 flex items-center sm:px-6">
                <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <div className="flex text-sm">
                      <p className="font-medium text-blue-600 truncate">{contract.name}</p>
                    </div>
                    <div className="mt-2 flex">
                      <div className="flex items-center text-sm text-gray-500">
                        <span className="truncate">{truncateAddress(contract.address)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex-shrink-0 sm:mt-0">
                    <div className="flex overflow-hidden">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        contract.contract.type === 'ERC20' ? 'bg-green-100 text-green-800' :
                        contract.contract.type === 'ERC721' ? 'bg-purple-100 text-purple-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {contract.contract.type}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="ml-5 flex-shrink-0">
                  <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  const renderContractOverview = () => {
    if (!activeContract) return null;
    
    return (
      <div>
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-medium text-gray-900 mb-4">{activeContract.name}</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-gray-500">Contract Address:</span>
                  <div className="flex items-center mt-1">
                    <span className="text-sm font-mono bg-gray-100 rounded p-1">{activeContract.address}</span>
                    <button className="ml-2 text-blue-600 hover:text-blue-800">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Type:</span>
                  <div className="mt-1">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      activeContract.contract.type === 'ERC20' ? 'bg-green-100 text-green-800' :
                      activeContract.contract.type === 'ERC721' ? 'bg-purple-100 text-purple-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {activeContract.contract.type}
                    </span>
                    {activeContract.contract.verified && (
                      <span className="ml-2 px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                        Verified
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Network:</span>
                  <div className="mt-1 text-sm">
                    {networks.find(n => n.id === activeContract.network)?.name || activeContract.network}
                  </div>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Deployed:</span>
                  <div className="mt-1 text-sm">{activeContract.creationDate}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Deployed By:</span>
                  <div className="mt-1 text-sm font-mono">{truncateAddress(activeContract.deployedBy)}</div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-md font-medium text-gray-700 mb-3">Contract Statistics</h4>
              <div className="grid grid-cols-2 gap-4">
                {activeContract.contract.totalSupply !== 'N/A' && (
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <span className="text-xs text-gray-500">Total Supply</span>
                    <div className="text-lg font-semibold">{activeContract.contract.totalSupply}</div>
                  </div>
                )}
                {activeContract.contract.holders !== 'N/A' && (
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <span className="text-xs text-gray-500">Holders</span>
                    <div className="text-lg font-semibold">{activeContract.contract.holders}</div>
                  </div>
                )}
                <div className="bg-gray-50 p-3 rounded-lg">
                  <span className="text-xs text-gray-500">Functions</span>
                  <div className="text-lg font-semibold">{activeContract.contract.functions.length}</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <span className="text-xs text-gray-500">Events</span>
                  <div className="text-lg font-semibold">{activeContract.contract.events.length}</div>
                </div>
              </div>
              <div className="mt-6">
                <h4 className="text-md font-medium text-gray-700 mb-3">Actions</h4>
                <div className="space-y-2">
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors text-sm">
                    Interact with Contract
                  </button>
                  <button className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 px-4 rounded-lg transition-colors text-sm">
                    View on Explorer
                  </button>
                  <button className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 px-4 rounded-lg transition-colors text-sm">
                    Export ABI
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  const renderContractFunctions = () => {
    if (!activeContract) return null;
    
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Contract Functions</h3>
        {activeContract.contract.functions.length === 0 ? (
          <div className="text-center py-6 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No functions available for this contract.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {activeContract.contract.functions.map((func, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-blue-600">{func.name}</span>
                  <button className="text-blue-600 hover:text-blue-800 text-sm">
                    Execute
                  </button>
                </div>
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="text-gray-500">Inputs:</span> 
                    <span className="ml-2 font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                      {func.inputs.length === 0 ? 'None' : func.inputs.join(', ')}
                    </span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-500">Outputs:</span> 
                    <span className="ml-2 font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                      {func.outputs.length === 0 ? 'None' : func.outputs.join(', ')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };
  
  const renderContractEvents = () => {
    if (!activeContract) return null;
    
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Contract Events</h3>
        {activeContract.contract.events.length === 0 ? (
          <div className="text-center py-6 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No events available for this contract.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {activeContract.contract.events.map((event, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-purple-600">{event.name}</span>
                  <button className="text-blue-600 hover:text-blue-800 text-sm">
                    Listen
                  </button>
                </div>
                <div className="text-sm">
                  <span className="text-gray-500">Parameters:</span> 
                  <div className="mt-1 font-mono text-xs bg-gray-100 p-2 rounded overflow-auto">
                    {event.parameters.join(', ')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="text-2xl font-semibold mb-2 sm:mb-0">Smart Contract Management</h2>
        <div className="flex items-center space-x-2">
          {!connected ? (
            <button
              onClick={handleConnectWallet}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              Connect Wallet
            </button>
          ) : (
            <div className="px-4 py-2 bg-gray-100 rounded-lg text-sm text-gray-700">
              Connected: {truncateAddress('0x8Fc5d6Afe37AaA9F0B3e4CAa95401F2F9B27c620')}
            </div>
          )}
        </div>
      </div>
      
      <div className="border-b border-gray-200 mb-6">
        <div className="flex overflow-x-auto py-2 space-x-2">
          {networks.map(network => (
            <button
              key={network.id}
              onClick={() => handleNetworkChange(network.id)}
              className={`px-3 py-2 rounded-lg text-sm whitespace-nowrap ${
                activeNetwork === network.id 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span className="mr-1">{network.icon}</span> {network.name}
            </button>
          ))}
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner />
          <span className="ml-3 text-gray-600">Loading contracts...</span>
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          {error}
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          <div className="xl:col-span-4">
            <h3 className="text-lg font-medium text-gray-700 mb-3">Your Contracts</h3>
            {renderContractList()}
            <div className="mt-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm w-full">
                Deploy New Contract
              </button>
            </div>
          </div>
          
          <div className="xl:col-span-8">
            {activeContract ? (
              <>
                <div className="mb-6 border-b border-gray-200">
                  <nav className="-mb-px flex space-x-8">
                    <button
                      onClick={() => handleTabChange('overview')}
                      className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === 'overview'
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      Overview
                    </button>
                    <button
                      onClick={() => handleTabChange('functions')}
                      className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === 'functions'
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      Functions
                    </button>
                    <button
                      onClick={() => handleTabChange('events')}
                      className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === 'events'
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      Events
                    </button>
                  </nav>
                </div>
                
                {activeTab === 'overview' && renderContractOverview()}
                {activeTab === 'functions' && renderContractFunctions()}
                {activeTab === 'events' && renderContractEvents()}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full py-12 bg-gray-50 rounded-lg border border-gray-200">
                <svg className="h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-gray-900">No contract selected</h3>
                <p className="mt-1 text-gray-500 text-center max-w-sm">
                  Select a contract from the list or deploy a new contract to get started.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 