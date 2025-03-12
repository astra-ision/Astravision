'use client';

import { useState, useEffect } from 'react';
import LoadingSpinner from '../ui/LoadingSpinner';

export default function DefiDashboard() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [portfolioValue, setPortfolioValue] = useState(0);
  const [assets, setAssets] = useState([]);
  const [defiProtocols, setDefiProtocols] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [marketData, setMarketData] = useState({});
  const [yieldFarms, setYieldFarms] = useState([]);
  const [liquidityPools, setLiquidityPools] = useState([]);
  
  useEffect(() => {
    // Since you're not connected to a backend, let's simulate loading data
    const loadMockData = () => {
      try {
        // Set mock data for portfolio
        setPortfolioValue(15482.65);
        setAssets([
          { name: 'Ethereum', symbol: 'ETH', amount: 2.45, value: 7563.75, change24h: 3.2 },
          { name: 'USD Coin', symbol: 'USDC', amount: 4200, value: 4200, change24h: 0 },
          { name: 'Aave', symbol: 'AAVE', amount: 12.5, value: 2375.45, change24h: -1.8 },
          { name: 'Compound', symbol: 'COMP', amount: 3.2, value: 856.32, change24h: 2.5 },
          { name: 'Uniswap', symbol: 'UNI', amount: 75, value: 487.50, change24h: 1.2 }
        ]);
        
        // Set mock data for DeFi protocols
        setDefiProtocols([
          { name: 'Aave', tvl: 12500000, yourSupply: 2375.45, yourBorrow: 0, apy: 3.2 },
          { name: 'Compound', tvl: 9800000, yourSupply: 856.32, yourBorrow: 0, apy: 2.8 },
          { name: 'Uniswap', tvl: 8200000, yourLiquidity: 487.50, fee24h: 1.25, apy: 5.4 }
        ]);
        
        // Set mock data for transactions
        setTransactions([
          { type: 'Swap', from: 'ETH', to: 'USDC', amount: '0.5 ETH', value: '$1,500', time: '2 hours ago' },
          { type: 'Deposit', token: 'USDC', amount: '2,000 USDC', protocol: 'Aave', time: '1 day ago' },
          { type: 'Withdraw', token: 'ETH', amount: '1 ETH', protocol: 'Compound', time: '3 days ago' }
        ]);
        
        // Set mock data for market overview
        setMarketData({
          defi: {
            tvl: 51700000000,
            dominance: { 
              Ethereum: 58, 
              BSC: 15, 
              Solana: 12, 
              Avalanche: 8, 
              Others: 7 
            },
            topProtocols: [
              { name: 'Aave', tvl: 5200000000 },
              { name: 'Curve', tvl: 4800000000 },
              { name: 'MakerDAO', tvl: 4100000000 },
              { name: 'Lido', tvl: 3700000000 },
              { name: 'Uniswap', tvl: 3200000000 }
            ]
          },
          ethereum: {
            price: 3075.64,
            change24h: 2.5
          },
          bitcoin: {
            price: 43750.25,
            change24h: 1.8
          }
        });
        
        // Set mock data for yield farms
        setYieldFarms([
          { protocol: 'Aave', asset: 'ETH', apy: 3.2, tvl: 2800000000, risk: 'Low' },
          { protocol: 'Compound', asset: 'USDC', apy: 4.5, tvl: 2100000000, risk: 'Low' },
          { protocol: 'Curve', asset: '3pool', apy: 6.8, tvl: 1850000000, risk: 'Medium' },
          { protocol: 'Yearn', asset: 'yETH', apy: 8.4, tvl: 950000000, risk: 'Medium' },
          { protocol: 'Sushi', asset: 'ETH-USDC', apy: 12.5, tvl: 780000000, risk: 'High' }
        ]);
        
        // Set mock data for liquidity pools
        setLiquidityPools([
          { name: 'ETH-USDC', protocol: 'Uniswap', apy: 14.2, tvl: 520000000, yourLiquidity: 487.50 },
          { name: 'ETH-BTC', protocol: 'Sushi', apy: 16.8, tvl: 480000000, yourLiquidity: 0 },
          { name: 'USDC-DAI', protocol: 'Curve', apy: 8.5, tvl: 650000000, yourLiquidity: 0 }
        ]);
        
        // Set loading to false
        setLoading(false);
      } catch (err) {
        console.error('Error loading mock data:', err);
        setError('Failed to load DeFi data. Please try again later.');
        setLoading(false);
      }
    };

    // Simulate API delay
    const timer = setTimeout(() => {
      loadMockData();
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  const formatCurrency = (value) => {
    if (!value) return '$0.00';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(value);
  };

  const formatPercentage = (value) => {
    if (!value) return '0%';
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
  };

  const formatLargeNumber = (value) => {
    if (!value) return '$0';
    
    if (value >= 1000000000) {
      return `$${(value / 1000000000).toFixed(1)}B`;
    } else if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}K`;
    }
    
    return `$${value.toFixed(2)}`;
  };

  const truncateAddress = (address) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  const handleConnectWallet = () => {
    // Connect to wallet logic
    setWalletConnected(true);
    // You might want to add actual wallet connection logic here if you're using a library like ethers.js
    console.log('Connecting wallet...');
    
    // If you are using mock data, just set the state as connected
    setWalletConnected(true);
    
    // If you want to simulate an async connection:
    /*
    setTimeout(() => {
      setWalletConnected(true);
      setWalletAddress("0x1234...5678"); // If you have a wallet address state
      setWalletBalance("0.5 ETH"); // If you have a wallet balance state
    }, 1000);
    */
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const renderSwapTab = () => {
    return (
      <div className="max-w-lg mx-auto">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-xl font-medium text-gray-900 mb-6">Swap Tokens</h3>
          
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
              <div className="flex items-center">
                <div className="relative flex-grow">
                  <input 
                    type="number" 
                    placeholder="0.0" 
                    className="w-full pr-24 py-2 bg-transparent text-gray-900 focus:outline-none text-xl"
                  />
                  <div className="absolute right-0 top-0 bottom-0 flex items-center">
                    <button className="flex items-center space-x-1 bg-gray-200 px-2 py-1 rounded-lg">
                      <span className="text-lg">🔷</span>
                      <span>ETH</span>
                      <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-1 text-sm text-gray-500">
                Balance: 2.45 ETH
              </div>
            </div>
            
            <div className="flex justify-center">
              <button className="bg-gray-200 p-2 rounded-full">
                <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                </svg>
              </button>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
              <div className="flex items-center">
                <div className="relative flex-grow">
                  <input 
                    type="number" 
                    placeholder="0.0" 
                    className="w-full pr-24 py-2 bg-transparent text-gray-900 focus:outline-none text-xl"
                    readOnly
                    value="1537.82"
                  />
                  <div className="absolute right-0 top-0 bottom-0 flex items-center">
                    <button className="flex items-center space-x-1 bg-gray-200 px-2 py-1 rounded-lg">
                      <span className="text-lg">💲</span>
                      <span>USDC</span>
                      <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-1 text-sm text-gray-500">
                Balance: 620.00 USDC
              </div>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Exchange Rate</span>
                <span className="text-gray-900">1 ETH = 3,075.64 USDC</span>
              </div>
              <div className="flex justify-between text-sm mt-2">
                <span className="text-gray-500">Fee</span>
                <span className="text-gray-900">0.3%</span>
              </div>
              <div className="flex justify-between text-sm mt-2">
                <span className="text-gray-500">Slippage Tolerance</span>
                <span className="text-gray-900">0.5%</span>
              </div>
              <div className="flex justify-between text-sm mt-2">
                <span className="text-gray-500">Minimum Received</span>
                <span className="text-gray-900">1,530.13 USDC</span>
              </div>
            </div>
            
            <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Swap
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  const renderMarketTab = () => {
    return (
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-xl font-medium text-gray-900 mb-4">DeFi Market Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-500 mb-1">Total Value Locked (TVL)</div>
              <div className="text-2xl font-bold text-gray-900">{formatLargeNumber(marketData.defi?.tvl)}</div>
              <div className="flex items-center text-xs text-gray-600 mt-2">
                <span>Across all DeFi protocols</span>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-500 mb-1">Ethereum Price</div>
              <div className="text-2xl font-bold text-gray-900">{formatCurrency(marketData.ethereum?.price)}</div>
              <div className="flex items-center text-xs mt-2">
                <span className={marketData.ethereum?.change24h >= 0 ? 'text-green-600' : 'text-red-600'}>
                  {formatPercentage(marketData.ethereum?.change24h)} (24h)
                </span>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-500 mb-1">Bitcoin Price</div>
              <div className="text-2xl font-bold text-gray-900">{formatCurrency(marketData.bitcoin?.price)}</div>
              <div className="flex items-center text-xs mt-2">
                <span className={marketData.bitcoin?.change24h >= 0 ? 'text-green-600' : 'text-red-600'}>
                  {formatPercentage(marketData.bitcoin?.change24h)} (24h)
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-xl font-medium text-gray-900 mb-4">DeFi Dominance by Blockchain</h3>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2">
              <div className="h-64 relative">
                {/* Placeholder for pie chart */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-48 rounded-full bg-gray-200 relative overflow-hidden">
                    {marketData.defi?.dominance && Object.entries(marketData.defi.dominance).map(([chain, percentage], index) => {
                      let startAngle = 0;
                      Object.entries(marketData.defi.dominance).slice(0, index).forEach(([_, pct]) => {
                        startAngle += (pct / 100) * 360;
                      });
                      
                      const endAngle = startAngle + (percentage / 100) * 360;
                      const colors = ['#3b82f6', '#f59e0b', '#10b981', '#8b5cf6', '#6b7280'];
                      
                      return (
                        <div 
                          key={chain}
                          className="absolute inset-0 origin-center"
                          style={{
                            backgroundColor: colors[index % colors.length],
                            clipPath: `polygon(50% 50%, 50% 0, ${50 + 50 * Math.cos(startAngle * Math.PI/180)}% ${50 - 50 * Math.sin(startAngle * Math.PI/180)}, ${50 + 50 * Math.cos(endAngle * Math.PI/180)}% ${50 - 50 * Math.sin(endAngle * Math.PI/180)})`
                          }}
                        ></div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 mt-4 md:mt-0">
              <div className="space-y-3">
                {marketData.defi?.dominance && Object.entries(marketData.defi.dominance).map(([chain, percentage], index) => {
                  const colors = ['bg-blue-500', 'bg-yellow-500', 'bg-green-500', 'bg-purple-500', 'bg-gray-500'];
                  
                  return (
                    <div key={chain} className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-2 ${colors[index % colors.length]}`}></div>
                      <div className="flex justify-between w-full">
                        <span className="text-sm text-gray-700">{chain}</span>
                        <span className="text-sm font-medium">{percentage}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-xl font-medium text-gray-900 mb-4">Top DeFi Protocols by TVL</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rank
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Protocol
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    TVL
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Market Share
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {marketData.defi?.topProtocols?.map((protocol, index) => {
                  const marketShare = ((protocol.tvl / marketData.defi.tvl) * 100).toFixed(1);
                  
                  return (
                    <tr key={protocol.name}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{protocol.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                        {formatLargeNumber(protocol.tvl)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="text-sm text-gray-900">{marketShare}%</div>
                        <div className="mt-1 w-full bg-gray-200 rounded-full h-1.5">
                          <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${marketShare}%` }}></div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };
  
  // Implementation for the Overview tab
  const renderOverviewTab = () => {
    return (
      <div className="space-y-6">
        {/* Portfolio Overview Card */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-xl font-medium text-gray-900 mb-4">Portfolio Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-500 mb-1">Total Value</div>
              <div className="text-2xl font-bold text-gray-900">$15,482.65</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-500 mb-1">Assets</div>
              <div className="text-2xl font-bold text-gray-900">5</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-500 mb-1">DeFi Protocols</div>
              <div className="text-2xl font-bold text-gray-900">3</div>
            </div>
          </div>
        </div>
        
        {/* Assets Table */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-xl font-medium text-gray-900 mb-4">Your Assets</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">24h</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                        E
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">Ethereum</div>
                        <div className="text-sm text-gray-500">ETH</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                    2.4500 ETH
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                    $7,563.75
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <span className="text-green-600">+3.2%</span>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                        U
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">USD Coin</div>
                        <div className="text-sm text-gray-500">USDC</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                    4,200.00 USDC
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                    $4,200.00
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <span className="text-gray-500">0.0%</span>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                        A
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">Aave</div>
                        <div className="text-sm text-gray-500">AAVE</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                    12.50 AAVE
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                    $2,375.45
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <span className="text-red-600">-1.8%</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Recent Transactions */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-xl font-medium text-gray-900 mb-4">Recent Transactions</h3>
          <div className="overflow-hidden">
            <ul className="divide-y divide-gray-200">
              <li className="py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center bg-blue-100 text-blue-600">
                    ↔️
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      Swap ETH → USDC
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      0.5 ETH ($1,500)
                    </p>
                  </div>
                  <div className="text-sm text-gray-500">
                    2 hours ago
                  </div>
                </div>
              </li>
              <li className="py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center bg-green-100 text-green-600">
                    ↓
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      Deposit USDC
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      2,000 USDC on Aave
                    </p>
                  </div>
                  <div className="text-sm text-gray-500">
                    1 day ago
                  </div>
                </div>
              </li>
              <li className="py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center bg-red-100 text-red-600">
                    ↑
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      Withdraw ETH
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      1 ETH from Compound
                    </p>
                  </div>
                  <div className="text-sm text-gray-500">
                    3 days ago
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  };

  // Implementation for the Yield Farming tab
  const renderYieldFarmingTab = () => {
    return (
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-xl font-medium text-gray-900 mb-4">Yield Opportunities</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Protocol</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">APY</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">TVL</th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Risk</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Aave</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">ETH</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-green-600 font-medium">3.2%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">$2.8B</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Low
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <button className="text-blue-600 hover:text-blue-900">
                      Deposit
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Compound</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">USDC</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-green-600 font-medium">4.5%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">$2.1B</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Low
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <button className="text-blue-600 hover:text-blue-900">
                      Deposit
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Curve</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">3pool</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-green-600 font-medium">6.8%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">$1.85B</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      Medium
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <button className="text-blue-600 hover:text-blue-900">
                      Deposit
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-xl font-medium text-gray-900 mb-4">Liquidity Pools</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pool</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Protocol</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">APY</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">TVL</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Your Liquidity</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">ETH-USDC</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Uniswap</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-green-600 font-medium">14.2%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">$520M</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">$487.50</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <button className="text-blue-600 hover:text-blue-900">
                      Manage
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">ETH-BTC</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Sushi</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-green-600 font-medium">16.8%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">$480M</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">-</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <button className="text-blue-600 hover:text-blue-900">
                      Add
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">USDC-DAI</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Curve</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-green-600 font-medium">8.5%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">$650M</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">-</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <button className="text-blue-600 hover:text-blue-900">
                      Add
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="text-2xl font-semibold mb-2 sm:mb-0">DeFi Dashboard</h2>
        <div className="flex items-center space-x-2">
          {!walletConnected ? (
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
      
      <div className="mb-6 border-b border-gray-200">
        <nav className="-mb-px flex overflow-x-auto">
          <button
            onClick={() => handleTabChange('overview')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm mr-8 ${
              activeTab === 'overview'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => handleTabChange('yield')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm mr-8 ${
              activeTab === 'yield'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Yield Farming
          </button>
          <button
            onClick={() => handleTabChange('swap')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm mr-8 ${
              activeTab === 'swap'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Swap
          </button>
          <button
            onClick={() => handleTabChange('market')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'market'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Market
          </button>
        </nav>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner />
          <span className="ml-3 text-gray-600">Loading DeFi data...</span>
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          {error}
        </div>
      ) : (
        <>
          {activeTab === 'overview' && renderOverviewTab()}
          {activeTab === 'yield' && renderYieldFarmingTab()}
          {activeTab === 'swap' && renderSwapTab()}
          {activeTab === 'market' && renderMarketTab()}
        </>
      )}
    </div>
  );
} 