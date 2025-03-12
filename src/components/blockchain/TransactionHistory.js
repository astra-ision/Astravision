'use client';

import { useState, useEffect } from 'react';
import LoadingSpinner from '../ui/LoadingSpinner';

export default function TransactionHistory({ account }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (account) {
      fetchTransactions();
    } else {
      setTransactions([]);
    }
  }, [account]);

  const fetchTransactions = async () => {
    if (!account) return;

    setLoading(true);
    setError('');

    try {
      // In a real implementation, you would fetch from your backend or etherscan API
      // const response = await fetch(`/api/blockchain/transactions?address=${account}`);
      // const data = await response.json();
      // if (!response.ok) throw new Error(data.message || 'Failed to fetch transactions');
      // setTransactions(data.transactions);

      // For now, we'll simulate some transactions
      setTimeout(() => {
        const mockTransactions = [
          {
            hash: '0xabc123...def456',
            from: account,
            to: '0x1234567890123456789012345678901234567890',
            value: '0.1',
            timestamp: new Date(Date.now() - 86400000).toISOString(),
            status: 'confirmed'
          },
          {
            hash: '0xdef456...789abc',
            from: '0x0987654321098765432109876543210987654321',
            to: account,
            value: '0.25',
            timestamp: new Date(Date.now() - 172800000).toISOString(),
            status: 'confirmed'
          },
          {
            hash: '0x789abc...def123',
            from: account,
            to: '0x2468135790246813579024681357902468135790',
            value: '0.05',
            timestamp: new Date(Date.now() - 259200000).toISOString(),
            status: 'confirmed'
          },
          {
            hash: '0xfed321...cba987',
            from: '0x1357924680135792468013579246801357924680',
            to: account,
            value: '0.75',
            timestamp: new Date(Date.now() - 345600000).toISOString(),
            status: 'confirmed'
          },
          {
            hash: '0x123abc...def789',
            from: account,
            to: '0x0246813579024681357902468135790246813579',
            value: '0.3',
            timestamp: new Date(Date.now() - 432000000).toISOString(),
            status: 'confirmed'
          },
        ];
        setTransactions(mockTransactions);
        setLoading(false);
      }, 1500);
    } catch (err) {
      console.error('Error fetching transactions:', err);
      setError(err.message || 'Failed to fetch transactions. Please try again.');
      setLoading(false);
    }
  };

  if (!account) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
        <p className="text-gray-500">Connect your wallet to view transaction history</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Recent Transactions</h2>
        <button
          onClick={fetchTransactions}
          disabled={loading}
          className="text-blue-600 hover:text-blue-800"
        >
          Refresh
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <LoadingSpinner />
          <span className="ml-2 text-gray-600">Loading transactions...</span>
        </div>
      ) : transactions.length === 0 ? (
        <div className="text-center py-10 border border-gray-200 rounded-lg">
          <p className="text-gray-500">No transactions found</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Transaction Hash
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  From
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  To
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Value (ETH)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions.map((tx, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-mono text-sm text-blue-600">
                    {tx.hash}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-mono">
                      {tx.from === account ? (
                        <span className="text-red-600">You</span>
                      ) : (
                        shortenAddress(tx.from)
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-mono">
                      {tx.to === account ? (
                        <span className="text-green-600">You</span>
                      ) : (
                        shortenAddress(tx.to)
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm ${tx.from === account ? 'text-red-600' : 'text-green-600'}`}>
                      {tx.from === account ? '-' : '+'}{tx.value}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {new Date(tx.timestamp).toLocaleString()}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function shortenAddress(address) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
} 