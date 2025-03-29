'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createPortal } from 'react-dom';

export function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef(null);
  const inputRef = useRef(null);
  const router = useRouter();

  const sections = [
    { title: 'CRM', items: [
      { id: 'clients', title: 'Clients', path: '/dashboard/crm/clients' },
      { id: 'deals', title: 'Deals', path: '/dashboard/crm/deals' }
    ]},
    { title: 'ERP', items: [
      { id: 'inventory', title: 'Inventory', path: '/dashboard/erp/inventory' },
      { id: 'orders', title: 'Orders', path: '/dashboard/erp/orders' }
    ]},
    { title: 'HRMS', items: [
      { id: 'employees', title: 'Employees', path: '/dashboard/hrms/employees' },
      { id: 'recruitment', title: 'Recruitment', path: '/dashboard/hrms/recruitment' }
    ]},
    { title: 'AI', items: [
      { id: 'models', title: 'AI Models', path: '/dashboard/ai/models' },
      { id: 'chatbot', title: 'Chatbot', path: '/dashboard/ai/chatbot' }
    ]},
    { title: 'Blockchain', items: [
      { id: 'wallet', title: 'Wallet', path: '/dashboard/blockchain/wallet' },
      { id: 'contracts', title: 'Contracts', path: '/dashboard/blockchain/contracts' }
    ]}
  ];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    
    // Simulate search API call
    setTimeout(() => {
      const query = searchQuery.toLowerCase();
      const results = [];
      
      sections.forEach(section => {
        const matchedItems = section.items.filter(item => 
          item.title.toLowerCase().includes(query)
        );
        
        if (matchedItems.length > 0) {
          results.push({
            title: section.title,
            items: matchedItems
          });
        }
      });
      
      setSearchResults(results);
      setIsLoading(false);
    }, 300);
  }, [searchQuery]);

  const handleSelectResult = (path) => {
    setIsOpen(false);
    router.push(path);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center w-64 text-sm rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-gray-500 dark:text-gray-400"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <span>Search... </span>
        <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 px-1.5 font-mono text-xs font-medium text-gray-800 dark:text-gray-300">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>
    );
  }

  // Portal for modal
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 backdrop-blur-sm bg-black/30">
      <div 
        ref={searchRef}
        className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden"
      >
        <div className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 absolute left-3 top-3.5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search..."
            className="block w-full border-0 border-b border-gray-200 dark:border-gray-700 bg-transparent py-3 pl-10 pr-3 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-0 text-base"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              Searching...
            </div>
          ) : searchResults.length > 0 ? (
            <div className="py-2">
              {searchResults.map((section, index) => (
                <div key={index} className="mb-4">
                  <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 px-3 mb-2">
                    {section.title}
                  </h3>
                  <ul>
                    {section.items.map((item) => (
                      <li key={item.id}>
                        <button
                          onClick={() => handleSelectResult(item.path)}
                          className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100"
                        >
                          {item.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : searchQuery.trim() !== '' ? (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              No results found
            </div>
          ) : (
            <div className="p-4">
              <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 px-2 mb-2">
                Quick Links
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleSelectResult('/dashboard')}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100"
                >
                  <span className="bg-blue-100 dark:bg-blue-900 p-1 rounded">📊</span>
                  <span>Dashboard</span>
                </button>
                <button
                  onClick={() => handleSelectResult('/dashboard/settings')}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100"
                >
                  <span className="bg-gray-100 dark:bg-gray-900 p-1 rounded">⚙️</span>
                  <span>Settings</span>
                </button>
              </div>
            </div>
          )}
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-900 px-3 py-2 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
          <span>Press ESC to close, ↑↓ to navigate, Enter to select</span>
        </div>
      </div>
    </div>,
    document.body
  );
}
