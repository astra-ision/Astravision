'use client';

import { useState } from 'react';
import Link from 'next/link';
import { dashboardLinks } from '@/constants/navigation';

export default function DashboardPage() {
  const [stats] = useState([
    { name: 'Active Projects', value: '45+' },
    { name: 'Team Members', value: '100+' },
    { name: 'Global Clients', value: '25+' },
    { name: 'Success Rate', value: '98%' },
  ]);

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">Welcome to Astravision Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Access and manage all your services from one central location.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-lg p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-600">{stat.name}</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Quick Access */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {dashboardLinks.slice(1, -1).map((service) => (
          <Link
            key={service.name}
            href={service.href}
            className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow group"
          >
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                {service.icon}
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">{service.name}</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Manage your {service.name.toLowerCase()} services and settings
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
        <div className="mt-4 space-y-4">
          <div className="flex items-center space-x-4">
            <div className="h-2 w-2 bg-green-500 rounded-full"></div>
            <p className="text-sm text-gray-600">New AI model deployed for sentiment analysis</p>
            <span className="text-xs text-gray-400">2 hours ago</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
            <p className="text-sm text-gray-600">Smart contract verification completed</p>
            <span className="text-xs text-gray-400">5 hours ago</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
            <p className="text-sm text-gray-600">New client onboarded to CRM</p>
            <span className="text-xs text-gray-400">1 day ago</span>
          </div>
        </div>
      </div>
    </div>
  );
} 