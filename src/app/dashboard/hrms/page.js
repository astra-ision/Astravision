'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
// Import all HRMS components
import EmployeeList from '@/components/dashboard/hrms/EmployeeList';
import EmployeeManagement from '@/components/dashboard/hrms/EmployeeManagement';
import LeaveManagement from '@/components/dashboard/hrms/LeaveManagement';
import PerformanceEvaluation from '@/components/dashboard/hrms/PerformanceEvaluation';
import Recruitment from '@/components/dashboard/hrms/Recruitment';

export default function HRMSPage() {
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState('');

  // Define navigation links directly
  const navLinks = [
    { name: 'Employee List', href: '/dashboard/hrms/employee-list' },
    { name: 'Employee Management', href: '/dashboard/hrms/employee-management' },
    { name: 'Leave Management', href: '/dashboard/hrms/leave-management' },
    { name: 'Performance Evaluation', href: '/dashboard/hrms/performance-evaluation' },
    { name: 'Recruitment', href: '/dashboard/hrms/recruitment' }
  ];

  // Update active tab based on current path
  useEffect(() => {
    const currentPath = pathname.split('/').pop();
    setActiveTab(currentPath || 'employee-list');
  }, [pathname]);

  const renderContent = () => {
    switch (activeTab) {
      case 'employee-list':
        return <EmployeeList />;
      case 'employee-management':
        return <EmployeeManagement />;
      case 'leave-management':
        return <LeaveManagement />;
      case 'performance-evaluation':
        return <PerformanceEvaluation />;
      case 'recruitment':
        return <Recruitment />;
      default:
        return <EmployeeList />;
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">HRMS Dashboard</h1>
      
      {/* Summary stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">Total Employees</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">248</dd>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">Open Positions</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">15</dd>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">Attendance Rate</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">96%</dd>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">Average Performance</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">4.2/5</dd>
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