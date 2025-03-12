'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
// Import all CRM components
import ClientList from '@/components/crm/ClientList';
import ContactTracking from '@/components/crm/ContactTracking';
import DealManagement from '@/components/crm/DealManagement';
import SalesPipeline from '@/components/crm/SalesPipeline';

export default function CRMPage() {
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState('');

  // Define navigation links directly instead of importing
  const navLinks = [
    { name: 'Client List', href: '/dashboard/crm/client-list' },
    { name: 'Contact Tracking', href: '/dashboard/crm/contact-tracking' },
    { name: 'Deal Management', href: '/dashboard/crm/deal-management' },
    { name: 'Sales Pipeline', href: '/dashboard/crm/sales-pipeline' }
  ];

  // Update active tab based on current path
  useEffect(() => {
    const currentPath = pathname.split('/').pop();
    setActiveTab(currentPath || 'client-list');
  }, [pathname]);

  const renderContent = () => {
    switch (activeTab) {
      case 'client-list':
        return <ClientList />;
      case 'contact-tracking':
        return <ContactTracking />;
      case 'deal-management':
        return <DealManagement />;
      case 'sales-pipeline':
        return <SalesPipeline />;
      default:
        return <ClientList />;
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">CRM Dashboard</h1>

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
                className={`${activeTab === linkPath
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