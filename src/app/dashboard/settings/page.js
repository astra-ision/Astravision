'use client';

import { useState } from 'react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    name: 'Abhishek Meena',
    email: 'astravision.global@gmail.com',
    phone: '+91 8696753044',
    company: 'Astravision',
    role: 'Administrator',
    bio: 'Senior software engineer with AI and blockchain technologies.',
    notifications: {
      email: true,
      sms: false,
      browser: true
    },
    theme: 'light',
    twoFactorAuth: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        notifications: {
          ...prev.notifications,
          [name]: checked
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, save settings to backend
    alert('Settings saved successfully!');
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-gray-600">Manage your account settings and preferences</p>
      </div>
      
      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'profile'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'notifications'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Notifications
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'security'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Security
          </button>
          <button
            onClick={() => setActiveTab('appearance')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'appearance'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Appearance
          </button>
        </nav>
      </div>

      {/* Content based on active tab */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        {activeTab === 'profile' && (
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-4">Additional Information</h2>
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Administrator">Administrator</option>
                  <option value="Manager">Manager</option>
                  <option value="Employee">Employee</option>
                  <option value="Guest">Guest</option>
                </select>
              </div>
              <div className="mt-4">
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  rows="4"
                  value={formData.bio}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </form>
        )}

        {activeTab === 'notifications' && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Notification Preferences</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="email"
                    name="email"
                    type="checkbox"
                    checked={formData.notifications.email}
                    onChange={handleChange}
                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="email" className="font-medium text-gray-700">Email Notifications</label>
                  <p className="text-gray-500">Receive email notifications for important updates.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="sms"
                    name="sms"
                    type="checkbox"
                    checked={formData.notifications.sms}
                    onChange={handleChange}
                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="sms" className="font-medium text-gray-700">SMS Notifications</label>
                  <p className="text-gray-500">Receive text message notifications for critical alerts.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="browser"
                    name="browser"
                    type="checkbox"
                    checked={formData.notifications.browser}
                    onChange={handleChange}
                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="browser" className="font-medium text-gray-700">Browser Notifications</label>
                  <p className="text-gray-500">Receive browser notifications when you're online.</p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={handleSubmit}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Save Preferences
              </button>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Security Settings</h2>
            
            <div className="mb-6">
              <h3 className="text-md font-medium mb-2">Change Password</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="mt-4">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  Update Password
                </button>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-md font-medium mb-2">Two-Factor Authentication</h3>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="twoFactorAuth"
                    name="twoFactorAuth"
                    type="checkbox"
                    checked={formData.twoFactorAuth}
                    onChange={() => setFormData(prev => ({ ...prev, twoFactorAuth: !prev.twoFactorAuth }))}
                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="twoFactorAuth" className="font-medium text-gray-700">Enable Two-Factor Authentication</label>
                  <p className="text-gray-500">Add an extra layer of security to your account.</p>
                </div>
              </div>
              {formData.twoFactorAuth && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700 mb-2">
                    Two-factor authentication adds an extra layer of security to your account. 
                    When enabled, you'll be required to provide a verification code in addition to your password when signing in.
                  </p>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 mt-2">
                    Set Up Two-Factor Authentication
                  </button>
                </div>
              )}
            </div>

            <div className="mt-8">
              <h3 className="text-md font-medium mb-2">Active Sessions</h3>
              <div className="bg-gray-50 p-4 rounded-lg mb-2">
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium">Current Session</p>
                    <p className="text-sm text-gray-500">MacBook Pro · Safari · Dubai, United Arab Emirates</p>
                    <p className="text-xs text-gray-500 mt-1">Started: Today, 10:32 AM</p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Active
                  </span>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium">iPhone 14 Pro</p>
                    <p className="text-sm text-gray-500">Safari · Bangalore, India</p>
                    <p className="text-xs text-gray-500 mt-1">Last active: Yesterday, 3:45 PM</p>
                  </div>
                  <button className="text-red-600 text-sm hover:text-red-800">
                    Log Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'appearance' && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Appearance Settings</h2>
            
            <div className="mb-6">
              <h3 className="text-md font-medium mb-2">Theme</h3>
              <div className="grid grid-cols-3 gap-4">
                <div 
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    formData.theme === 'light' ? 'bg-blue-50 border-blue-500' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setFormData(prev => ({ ...prev, theme: 'light' }))}
                >
                  <div className="h-24 bg-white border rounded-md mb-2"></div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="light"
                      name="theme"
                      checked={formData.theme === 'light'}
                      onChange={() => {}}
                      className="h-4 w-4 text-blue-600 border-gray-300"
                    />
                    <label htmlFor="light" className="ml-2 block text-sm font-medium text-gray-700">
                      Light
                    </label>
                  </div>
                </div>
                
                <div 
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    formData.theme === 'dark' ? 'bg-blue-50 border-blue-500' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setFormData(prev => ({ ...prev, theme: 'dark' }))}
                >
                  <div className="h-24 bg-gray-800 border rounded-md mb-2"></div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="dark"
                      name="theme"
                      checked={formData.theme === 'dark'}
                      onChange={() => {}}
                      className="h-4 w-4 text-blue-600 border-gray-300"
                    />
                    <label htmlFor="dark" className="ml-2 block text-sm font-medium text-gray-700">
                      Dark
                    </label>
                  </div>
                </div>
                
                <div 
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    formData.theme === 'system' ? 'bg-blue-50 border-blue-500' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setFormData(prev => ({ ...prev, theme: 'system' }))}
                >
                  <div className="h-24 bg-gradient-to-r from-white to-gray-800 border rounded-md mb-2"></div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="system"
                      name="theme"
                      checked={formData.theme === 'system'}
                      onChange={() => {}}
                      className="h-4 w-4 text-blue-600 border-gray-300"
                    />
                    <label htmlFor="system" className="ml-2 block text-sm font-medium text-gray-700">
                      System
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleSubmit}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Save Preferences
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 