'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { dashboardLinks } from '@/constants/navigation';

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  
  // Add effect to update main content margin when sidebar is collapsed
  useEffect(() => {
    const mainContent = document.querySelector('main');
    if (mainContent) {
      mainContent.style.marginLeft = collapsed ? '5rem' : '16rem';
    }
  }, [collapsed]);

  return (
    <aside 
      className={`bg-white shadow-md h-full ${
        collapsed ? 'w-20' : 'w-64'
      } transition-all duration-300 ease-in-out`}
    >
      <div className="h-full flex flex-col">
        {/* Collapse button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-4 hover:bg-gray-50 flex items-center justify-center"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <svg
            className={`h-6 w-6 text-gray-500 transform transition-transform duration-200 ${
              collapsed ? '' : 'rotate-180'
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
        </button>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-2 py-4 overflow-y-auto">
          {dashboardLinks.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-2 py-2 text-sm font-medium rounded-lg ${
                  isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <div className="flex items-center">
                  <span className={`${isActive ? 'text-blue-700' : 'text-gray-500'}`}>
                    {item.icon}
                  </span>
                  {!collapsed && (
                    <span className="ml-3">{item.name}</span>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Bottom section */}
        <div className="p-4 border-t border-gray-200">
          {!collapsed && (
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img
                  className="h-8 w-8 rounded-full"
                  src="https://ui-avatars.com/api/?name=Abhishek+Meena"
                  alt="User"
                />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">Abhishek</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
} 