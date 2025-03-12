'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
// Import all ERP components
import FinancialManagement from '@/components/dashboard/erp/FinancialManagement';
import InventoryManagement from '@/components/dashboard/erp/InventoryManagement';
import ProductList from '@/components/dashboard/erp/ProductList';
import SupplyChain from '@/components/dashboard/erp/SupplyChain';
import OrderProcessing from '@/components/dashboard/erp/OrderProcessing';

export default function ERPPage() {
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState('');

  // Define navigation links directly instead of importing
  const navLinks = [
    { name: 'Financial Management', href: '/dashboard/erp/financial-management' },
    { name: 'Inventory Management', href: '/dashboard/erp/inventory-management' },
    { name: 'Order Product', href: '/dashboard/erp/order-product' },
    { name: 'Product List', href: '/dashboard/erp/product-list' },
    { name: 'Supply Chain', href: '/dashboard/erp/supply-chain' }
  ];

  // Update active tab based on current path
  useEffect(() => {
    const currentPath = pathname.split('/').pop();
    setActiveTab(currentPath || 'financial-management');
  }, [pathname]);

  const renderContent = () => {
    switch (activeTab) {
      case 'financial-management':
        return <FinancialManagement/>;
      case 'inventory-management':
        return <InventoryManagement />;
      case 'order-product':
        return <OrderProcessing />;
      case 'product-list':
        return <ProductList />;
      case 'supply-chain':
        return <SupplyChain />;
      default:
        return <FinancialManagement/>;
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Enterprise Resource Planning</h1>
      
      {/* Stats summary could go here */}
      
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