'use client';

import { useState, useEffect } from 'react';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
export default function LeaveManagement() {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    employeeId: '',
    leaveType: 'annual',
    startDate: '',
    endDate: '',
    reason: '',
    status: 'pending'
  });

  const leaveTypes = [
    { id: 'annual', name: 'Annual Leave', color: 'bg-green-100 text-green-800' },
    { id: 'sick', name: 'Sick Leave', color: 'bg-red-100 text-red-800' },
    { id: 'personal', name: 'Personal Leave', color: 'bg-blue-100 text-blue-800' },
    { id: 'maternity', name: 'Maternity Leave', color: 'bg-purple-100 text-purple-800' },
    { id: 'paternity', name: 'Paternity Leave', color: 'bg-purple-100 text-purple-800' },
    { id: 'unpaid', name: 'Unpaid Leave', color: 'bg-gray-100 text-gray-800' }
  ];

  const statusOptions = [
    { id: 'pending', name: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
    { id: 'approved', name: 'Approved', color: 'bg-green-100 text-green-800' },
    { id: 'rejected', name: 'Rejected', color: 'bg-red-100 text-red-800' }
  ];

  useEffect(() => {
    // Simulated API call
    setTimeout(() => {
      const employeeData = [
        { id: 'EMP001', name: 'John Doe' },
        { id: 'EMP002', name: 'Sarah Johnson' },
        { id: 'EMP003', name: 'Michael Wilson' },
        { id: 'EMP004', name: 'Emily Brown' },
        { id: 'EMP005', name: 'David Miller' }
      ];
      
      setEmployees(employeeData);
      
      setLeaveRequests([
        {
          id: 'LR001',
          employeeId: 'EMP001',
          employeeName: 'John Doe',
          leaveType: 'annual',
          startDate: '2023-06-10',
          endDate: '2023-06-17',
          days: 5,
          reason: 'Family vacation',
          status: 'approved',
          appliedOn: '2023-05-20',
          approvedBy: 'Lisa Brown'
        },
        {
          id: 'LR002',
          employeeId: 'EMP002',
          employeeName: 'Sarah Johnson',
          leaveType: 'sick',
          startDate: '2023-03-15',
          endDate: '2023-03-16',
          days: 2,
          reason: 'Flu',
          status: 'approved',
          appliedOn: '2023-03-14',
          approvedBy: 'David Wilson'
        },
        {
          id: 'LR003',
          employeeId: 'EMP003',
          employeeName: 'Michael Wilson',
          leaveType: 'personal',
          startDate: '2023-04-05',
          endDate: '2023-04-05',
          days: 1,
          reason: 'Personal appointment',
          status: 'approved',
          appliedOn: '2023-03-25',
          approvedBy: 'Robert Taylor'
        },
        {
          id: 'LR004',
          employeeId: 'EMP004',
          employeeName: 'Emily Brown',
          leaveType: 'maternity',
          startDate: '2023-07-01',
          endDate: '2023-10-01',
          days: 65,
          reason: 'Maternity leave',
          status: 'pending',
          appliedOn: '2023-05-15',
          approvedBy: null
        },
        {
          id: 'LR005',
          employeeId: 'EMP001',
          employeeName: 'John Doe',
          leaveType: 'sick',
          startDate: '2023-02-25',
          endDate: '2023-02-27',
          days: 3,
          reason: 'Cold and fever',
          status: 'approved',
          appliedOn: '2023-02-24',
          approvedBy: 'Lisa Brown'
        },
        {
          id: 'LR006',
          employeeId: 'EMP005',
          employeeName: 'David Miller',
          leaveType: 'annual',
          startDate: '2023-05-20',
          endDate: '2023-05-25',
          days: 4,
          reason: 'Personal trip',
          status: 'rejected',
          appliedOn: '2023-04-30',
          approvedBy: 'George Harris',
          rejectionReason: 'Critical project deadline'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (status) => {
    setFilterStatus(status);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateDays = (start, end) => {
    if (!start || !end) return 0;
    
    const startDate = new Date(start);
    const endDate = new Date(end);
    
    // Calculate difference in time
    const timeDiff = endDate.getTime() - startDate.getTime();
    
    // Calculate days and add 1 (inclusive of start and end days)
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
    
    // Exclude weekends
    let weekendCount = 0;
    for (let i = 0; i < daysDiff; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      
      // 0 is Sunday, 6 is Saturday
      const day = currentDate.getDay();
      if (day === 0 || day === 6) {
        weekendCount++;
      }
    }
    
    return daysDiff - weekendCount;
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    
    const updatedFormData = {
      ...formData,
      [name]: value
    };
    
    // If both dates are set, calculate days
    if (updatedFormData.startDate && updatedFormData.endDate) {
      const days = calculateDays(updatedFormData.startDate, updatedFormData.endDate);
      updatedFormData.days = days;
    }
    
    setFormData(updatedFormData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.employeeId || !formData.startDate || !formData.endDate || !formData.reason) {
      alert('Please fill in all required fields');
      return;
    }
    
    if (new Date(formData.startDate) > new Date(formData.endDate)) {
      alert('End date must be after start date');
      return;
    }
    
    const days = calculateDays(formData.startDate, formData.endDate);
    
    if (days <= 0) {
      alert('Leave period must include working days');
      return;
    }
    
    const employee = employees.find(e => e.id === formData.employeeId);
    
    const newLeaveRequest = {
      id: `LR${String(leaveRequests.length + 1).padStart(3, '0')}`,
      employeeId: formData.employeeId,
      employeeName: employee?.name || 'Unknown',
      leaveType: formData.leaveType,
      startDate: formData.startDate,
      endDate: formData.endDate,
      days: days,
      reason: formData.reason,
      status: 'pending',
      appliedOn: new Date().toISOString().split('T')[0],
      approvedBy: null
    };
    
    setLeaveRequests([newLeaveRequest, ...leaveRequests]);
    setShowForm(false);
    setFormData({
      employeeId: '',
      leaveType: 'annual',
      startDate: '',
      endDate: '',
      reason: '',
      status: 'pending'
    });
  };

  const getLeaveTypeDetails = (typeId) => {
    return leaveTypes.find(type => type.id === typeId) || 
           { name: typeId, color: 'bg-gray-100 text-gray-800' };
  };

  const getStatusDetails = (statusId) => {
    return statusOptions.find(status => status.id === statusId) || 
           { name: statusId, color: 'bg-gray-100 text-gray-800' };
  };

  const updateLeaveStatus = (leaveId, newStatus) => {
    setLeaveRequests(leaveRequests.map(leave => {
      if (leave.id === leaveId) {
        return { 
          ...leave, 
          status: newStatus,
          approvedBy: newStatus === 'approved' ? 'Admin User' : leave.approvedBy
        };
      }
      return leave;
    }));
  };

  const filteredLeaveRequests = leaveRequests.filter(leave => {
    const matchesSearch = 
      leave.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      leave.reason.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || leave.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  // Calculate leave statistics
  const calculateStats = () => {
    const totalLeaves = leaveRequests.length;
    const pendingLeaves = leaveRequests.filter(l => l.status === 'pending').length;
    const approvedLeaves = leaveRequests.filter(l => l.status === 'approved').length;
    
    // Get leave days by type for approved leaves
    const leaveByType = {};
    leaveTypes.forEach(type => {
      leaveByType[type.id] = leaveRequests
        .filter(l => l.leaveType === type.id && l.status === 'approved')
        .reduce((sum, l) => sum + l.days, 0);
    });
    
    return { totalLeaves, pendingLeaves, approvedLeaves, leaveByType };
  };

  const stats = calculateStats();

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="text-2xl font-semibold mb-2 sm:mb-0">Leave Management</h2>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search leaves..."
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
            {showForm ? 'Cancel' : 'Apply Leave'}
          </button>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => handleFilterChange('all')}
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            filterStatus === 'all' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
          }`}
        >
          All Requests
        </button>
        {statusOptions.map(status => (
          <button
            key={status.id}
            onClick={() => handleFilterChange(status.id)}
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              filterStatus === status.id ? status.color : 'bg-gray-100 text-gray-800'
            }`}
          >
            {status.name}
          </button>
        ))}
      </div>

      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <h3 className="text-sm font-medium text-blue-800 mb-1">Total Requests</h3>
            <p className="text-2xl font-bold text-blue-900">{stats.totalLeaves}</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
            <h3 className="text-sm font-medium text-yellow-800 mb-1">Pending Requests</h3>
            <p className="text-2xl font-bold text-yellow-900">{stats.pendingLeaves}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <h3 className="text-sm font-medium text-green-800 mb-1">Approved Leaves</h3>
            <p className="text-2xl font-bold text-green-900">{stats.approvedLeaves}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
            <h3 className="text-sm font-medium text-purple-800 mb-1">Annual Leave Days</h3>
            <p className="text-2xl font-bold text-purple-900">{stats.leaveByType.annual || 0}</p>
          </div>
        </div>
      )}

      {showForm && (
        <div className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-200">
          <h3 className="text-lg font-medium mb-4">Apply for Leave</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="employeeId" className="block text-sm font-medium text-gray-700 mb-1">Employee *</label>
                <select
                  id="employeeId"
                  name="employeeId"
                  value={formData.employeeId}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Employee</option>
                  {employees.map(employee => (
                    <option key={employee.id} value={employee.id}>{employee.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="leaveType" className="block text-sm font-medium text-gray-700 mb-1">Leave Type *</label>
                <select
                  id="leaveType"
                  name="leaveType"
                  value={formData.leaveType}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  {leaveTypes.map(type => (
                    <option key={type.id} value={type.id}>{type.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">Start Date *</label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleDateChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">End Date *</label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleDateChange}
                  min={formData.startDate || new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              {formData.startDate && formData.endDate && formData.days > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Working Days</label>
                  <div className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50">
                    {formData.days} day{formData.days !== 1 ? 's' : ''}
                  </div>
                </div>
              )}
              <div className="sm:col-span-2">
                <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">Reason *</label>
                <textarea
                  id="reason"
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                ></textarea>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Submit Request
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner />
          <span className="ml-2 text-gray-600">Loading leave requests...</span>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Leave Period</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Days</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLeaveRequests.map((leave) => {
                const leaveTypeDetails = getLeaveTypeDetails(leave.leaveType);
                const statusDetails = getStatusDetails(leave.status);
                return (
                  <tr key={leave.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{leave.employeeName}</div>
                      <div className="text-xs text-gray-500">{leave.employeeId}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{leave.startDate} to {leave.endDate}</div>
                      <div className="text-xs text-gray-500">Applied: {leave.appliedOn}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${leaveTypeDetails.color}`}>
                        {leaveTypeDetails.name}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {leave.days} day{leave.days !== 1 ? 's' : ''}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusDetails.color}`}>
                        {statusDetails.name}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{leave.reason}</div>
                      {leave.approvedBy && (
                        <div className="text-xs text-gray-500">
                          {leave.status === 'approved' ? 'Approved by: ' : 'Reviewed by: '} 
                          {leave.approvedBy}
                        </div>
                      )}
                      {leave.rejectionReason && (
                        <div className="text-xs text-red-500">
                          Reason: {leave.rejectionReason}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {leave.status === 'pending' && (
                        <>
                          <button 
                            onClick={() => updateLeaveStatus(leave.id, 'approved')}
                            className="text-green-600 hover:text-green-900 mr-3"
                          >
                            Approve
                          </button>
                          <button 
                            onClick={() => updateLeaveStatus(leave.id, 'rejected')}
                            className="text-red-600 hover:text-red-900"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      {leave.status !== 'pending' && (
                        <span className="text-gray-400">Processed</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
