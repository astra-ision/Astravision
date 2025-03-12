'use client';

import { useState, useEffect } from 'react';
import LoadingSpinner from '../ui/LoadingSpinner';

export default function ContactTracking() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    type: 'Lead',
    status: 'New',
    notes: '',
    nextFollowUp: ''
  });

  useEffect(() => {
    // In a real app, you would fetch contacts from the API
    // Simulating API call with setTimeout
    setTimeout(() => {
      setContacts([
        {
          id: 1,
          name: 'John Smith',
          email: 'john@example.com',
          phone: '+1 123-456-7890',
          company: 'Acme Inc',
          type: 'Client',
          status: 'Active',
          lastContacted: '2023-03-05',
          nextFollowUp: '2023-03-20',
          notes: 'Interested in expanding their current subscription',
          interactions: [
            { type: 'Email', date: '2023-03-05', description: 'Sent follow-up about new features' },
            { type: 'Call', date: '2023-02-28', description: 'Discussed renewal options' },
            { type: 'Meeting', date: '2023-02-15', description: 'Initial consultation meeting' }
          ]
        },
        {
          id: 2,
          name: 'Jane Doe',
          email: 'jane@example.com',
          phone: '+1 234-567-8901',
          company: 'XYZ Corp',
          type: 'Lead',
          status: 'New',
          lastContacted: '2023-03-02',
          nextFollowUp: '2023-03-15',
          notes: 'Shown interest in our enterprise plan',
          interactions: [
            { type: 'Email', date: '2023-03-02', description: 'Sent product brochure' },
            { type: 'Call', date: '2023-03-01', description: 'Initial discovery call' }
          ]
        },
        {
          id: 3,
          name: 'Mark Johnson',
          email: 'mark@example.com',
          phone: '+1 345-678-9012',
          company: 'ABC Ltd',
          type: 'Prospect',
          status: 'Engaged',
          lastContacted: '2023-03-07',
          nextFollowUp: '2023-03-25',
          notes: 'Requested a proposal for custom development',
          interactions: [
            { type: 'Email', date: '2023-03-07', description: 'Sent requirements document' },
            { type: 'Meeting', date: '2023-03-03', description: 'Requirements gathering session' },
            { type: 'Call', date: '2023-02-25', description: 'Initial outreach' }
          ]
        },
        {
          id: 4,
          name: 'Sarah Lee',
          email: 'sarah@example.com',
          phone: '+1 456-789-0123',
          company: 'Tech Solutions',
          type: 'Client',
          status: 'Inactive',
          lastContacted: '2023-01-10',
          nextFollowUp: '2023-03-30',
          notes: 'Contract expired; needs follow-up for renewal',
          interactions: [
            { type: 'Email', date: '2023-01-10', description: 'Sent renewal reminder' },
            { type: 'Call', date: '2022-12-15', description: 'Check-in call' }
          ]
        },
        {
          id: 5,
          name: 'Michael Chen',
          email: 'michael@example.com',
          phone: '+1 567-890-1234',
          company: 'Global Services',
          type: 'Lead',
          status: 'Qualified',
          lastContacted: '2023-03-08',
          nextFollowUp: '2023-03-18',
          notes: 'Ready for product demo',
          interactions: [
            { type: 'Call', date: '2023-03-08', description: 'Qualification call' },
            { type: 'Email', date: '2023-03-01', description: 'Sent introduction email' }
          ]
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (type) => {
    setFilterType(type);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.name || !formData.email || !formData.company) {
      alert('Please fill in all required fields');
      return;
    }
    
    // In a real app, you would make an API call to save the contact
    const newContact = {
      id: contacts.length + 1,
      ...formData,
      lastContacted: new Date().toISOString().split('T')[0],
      interactions: []
    };
    
    setContacts([newContact, ...contacts]);
    setShowForm(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      type: 'Lead',
      status: 'New',
      notes: '',
      nextFollowUp: ''
    });
  };

  const addInteraction = (contactId, interactionType) => {
    const interaction = {
      type: interactionType,
      date: new Date().toISOString().split('T')[0],
      description: `New ${interactionType.toLowerCase()} recorded`
    };

    const updatedContacts = contacts.map(contact => {
      if (contact.id === contactId) {
        return {
          ...contact,
          lastContacted: interaction.date,
          interactions: [interaction, ...contact.interactions]
        };
      }
      return contact;
    });

    setContacts(updatedContacts);
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Lead':
        return 'bg-yellow-100 text-yellow-800';
      case 'Prospect':
        return 'bg-blue-100 text-blue-800';
      case 'Client':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'New':
        return 'bg-purple-100 text-purple-800';
      case 'Qualified':
        return 'bg-indigo-100 text-indigo-800';
      case 'Engaged':
        return 'bg-blue-100 text-blue-800';
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Inactive':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getInteractionIcon = (type) => {
    switch (type) {
      case 'Email':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      case 'Call':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        );
      case 'Meeting':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
    }
  };

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = 
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterType === 'all' || contact.type === filterType;
    
    return matchesSearch && matchesFilter;
  });

  const isFollowUpDue = (date) => {
    if (!date) return false;
    const today = new Date();
    const followUpDate = new Date(date);
    return followUpDate <= today;
  };

  const sortByNextFollowUp = (a, b) => {
    if (!a.nextFollowUp) return 1;
    if (!b.nextFollowUp) return -1;
    return new Date(a.nextFollowUp) - new Date(b.nextFollowUp);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="text-2xl font-semibold mb-2 sm:mb-0">Contact Tracking</h2>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search contacts..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={handleSearch}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto"
          >
            {showForm ? 'Cancel' : 'Add Contact'}
          </button>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => handleFilterChange('all')}
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            filterType === 'all' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
          }`}
        >
          All
        </button>
        <button
          onClick={() => handleFilterChange('Lead')}
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            filterType === 'Lead' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
          }`}
        >
          Leads
        </button>
        <button
          onClick={() => handleFilterChange('Prospect')}
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            filterType === 'Prospect' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
          }`}
        >
          Prospects
        </button>
        <button
          onClick={() => handleFilterChange('Client')}
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            filterType === 'Client' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
          }`}
        >
          Clients
        </button>
      </div>
      
      {showForm && (
        <div className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-200">
          <h3 className="text-lg font-medium mb-4">Add New Contact</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">Company *</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Lead">Lead</option>
                  <option value="Prospect">Prospect</option>
                  <option value="Client">Client</option>
                </select>
              </div>
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="New">New</option>
                  <option value="Qualified">Qualified</option>
                  <option value="Engaged">Engaged</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div>
                <label htmlFor="nextFollowUp" className="block text-sm font-medium text-gray-700 mb-1">Next Follow-up</label>
                <input
                  type="date"
                  id="nextFollowUp"
                  name="nextFollowUp"
                  value={formData.nextFollowUp}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="sm:col-span-2 md:col-span-3">
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save Contact
              </button>
            </div>
          </form>
        </div>
      )}
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner />
          <span className="ml-2 text-gray-600">Loading contacts...</span>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-4">Follow-ups Due</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredContacts
                .filter(contact => isFollowUpDue(contact.nextFollowUp))
                .sort(sortByNextFollowUp)
                .slice(0, 3)
                .map(contact => (
                  <div key={`followup-${contact.id}`} className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <div className="flex justify-between">
                      <h4 className="font-medium text-gray-900">{contact.name}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs ${getTypeColor(contact.type)}`}>
                        {contact.type}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{contact.company}</p>
                    <div className="mt-3 flex justify-between items-center">
                      <span className="text-sm text-red-600 font-medium">
                        Follow-up: {contact.nextFollowUp}
                      </span>
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => addInteraction(contact.id, 'Call')}
                          className="p-1 bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200"
                          title="Log call"
                        >
                          {getInteractionIcon('Call')}
                        </button>
                        <button 
                          onClick={() => addInteraction(contact.id, 'Email')}
                          className="p-1 bg-green-100 text-green-800 rounded-full hover:bg-green-200"
                          title="Log email"
                        >
                          {getInteractionIcon('Email')}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              {filteredContacts.filter(contact => isFollowUpDue(contact.nextFollowUp)).length === 0 && (
                <div className="col-span-full text-center p-4 bg-gray-50 rounded-lg text-gray-500">
                  No follow-ups due
                </div>
              )}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type/Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Follow-up</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredContacts.length > 0 ? (
                  filteredContacts.map((contact) => (
                    <tr key={contact.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{contact.name}</div>
                        <div className="text-sm text-gray-500">{contact.email}</div>
                        <div className="text-sm text-gray-500">{contact.phone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{contact.company}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col space-y-1">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getTypeColor(contact.type)}`}>
                            {contact.type}
                          </span>
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(contact.status)}`}>
                            {contact.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {contact.lastContacted}
                        {contact.interactions.length > 0 && (
                          <div className="mt-1 text-xs text-gray-400">
                            {contact.interactions[0].type} - {contact.interactions[0].description.substring(0, 20)}
                            {contact.interactions[0].description.length > 20 ? '...' : ''}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className={isFollowUpDue(contact.nextFollowUp) ? 'text-red-600 font-medium' : 'text-gray-500'}>
                          {contact.nextFollowUp || 'Not scheduled'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button 
                            onClick={() => addInteraction(contact.id, 'Call')}
                            className="p-1 bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200"
                            title="Log call"
                          >
                            {getInteractionIcon('Call')}
                          </button>
                          <button 
                            onClick={() => addInteraction(contact.id, 'Email')}
                            className="p-1 bg-green-100 text-green-800 rounded-full hover:bg-green-200"
                            title="Log email"
                          >
                            {getInteractionIcon('Email')}
                          </button>
                          <button 
                            onClick={() => addInteraction(contact.id, 'Meeting')}
                            className="p-1 bg-purple-100 text-purple-800 rounded-full hover:bg-purple-200"
                            title="Log meeting"
                          >
                            {getInteractionIcon('Meeting')}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                      No contacts found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
} 