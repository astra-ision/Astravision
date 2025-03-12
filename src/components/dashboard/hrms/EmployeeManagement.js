'use client';

import { useState, useEffect } from 'react';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
export default function EmployeeManagement() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    department: 'Engineering',
    position: '',
    joiningDate: new Date().toISOString().split('T')[0],
    salary: '',
    status: 'active',
    address: '',
    emergencyContact: '',
    skills: '',
    manager: ''
  });

  const departments = [
    'Engineering',
    'Sales',
    'Marketing',
    'Finance',
    'HR',
    'Operations',
    'Product',
    'Customer Support'
  ];

  const statusOptions = [
    { id: 'active', name: 'Active', color: 'bg-green-100 text-green-800' },
    { id: 'onLeave', name: 'On Leave', color: 'bg-yellow-100 text-yellow-800' },
    { id: 'inactive', name: 'Inactive', color: 'bg-red-100 text-red-800' }
  ];

  useEffect(() => {
    // Simulated API call
    setTimeout(() => {
      setEmployees([
        {
          id: 'EMP001',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@astravision.com',
          phone: '(555) 123-4567',
          department: 'Engineering',
          position: 'Senior Software Engineer',
          joiningDate: '2022-06-15',
          salary: 95000,
          status: 'active',
          address: '123 Tech Street, Silicon Valley, CA',
          emergencyContact: 'Jane Doe - (555) 987-6543',
          skills: 'JavaScript, React, Node.js, Python',
          manager: 'David Wilson',
          avatar: 'https://i.pravatar.cc/150?img=1'
        },
        {
          id: 'EMP002',
          firstName: 'Sarah',
          lastName: 'Johnson',
          email: 'sarah.johnson@astravision.com',
          phone: '(555) 234-5678',
          department: 'Marketing',
          position: 'Marketing Manager',
          joiningDate: '2022-03-10',
          salary: 88000,
          status: 'active',
          address: '456 Brand Ave, Creative District, NY',
          emergencyContact: 'Mike Johnson - (555) 876-5432',
          skills: 'Digital Marketing, Content Strategy, SEO, Analytics',
          manager: 'Lisa Brown',
          avatar: 'https://i.pravatar.cc/150?img=5'
        },
        {
          id: 'EMP003',
          firstName: 'Michael',
          lastName: 'Wilson',
          email: 'michael.wilson@astravision.com',
          phone: '(555) 345-6789',
          department: 'Sales',
          position: 'Sales Representative',
          joiningDate: '2022-09-01',
          salary: 72000,
          status: 'active',
          address: '789 Commerce Blvd, Salestown, TX',
          emergencyContact: 'Emily Wilson - (555) 765-4321',
          skills: 'Negotiation, CRM, Prospecting, Relationship Management',
          manager: 'Robert Taylor',
          avatar: 'https://i.pravatar.cc/150?img=8'
        },
        {
          id: 'EMP004',
          firstName: 'Emily',
          lastName: 'Brown',
          email: 'emily.brown@astravision.com',
          phone: '(555) 456-7890',
          department: 'HR',
          position: 'HR Specialist',
          joiningDate: '2022-01-20',
          salary: 68000,
          status: 'onLeave',
          address: '321 People Place, Talent City, IL',
          emergencyContact: 'Daniel Brown - (555) 654-3210',
          skills: 'Recruitment, Employee Relations, Onboarding, Benefits Administration',
          manager: 'Patricia Evans',
          avatar: 'https://i.pravatar.cc/150?img=9'
        },
        {
          id: 'EMP005',
          firstName: 'David',
          lastName: 'Miller',
          email: 'david.miller@astravision.com',
          phone: '(555) 567-8901',
          department: 'Finance',
          position: 'Financial Analyst',
          joiningDate: '2022-04-15',
          salary: 82000,
          status: 'active',
          address: '654 Money Lane, Finance District, NY',
          emergencyContact: 'Sophie Miller - (555) 543-2109',
          skills: 'Financial Modeling, Data Analysis, Forecasting, Budgeting',
          manager: 'George Harris',
          avatar: 'https://i.pravatar.cc/150?img=12'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (department) => {
    setFilterDepartment(department);
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
    
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.position) {
      alert('Please fill in all required fields');
      return;
    }
    
    const newEmployee = {
      id: `EMP${String(employees.length + 1).padStart(3, '0')}`,
      ...formData,
      salary: parseFloat(formData.salary),
      avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`
    };
    
    setEmployees([newEmployee, ...employees]);
    setShowForm(false);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      department: 'Engineering',
      position: '',
      joiningDate: new Date().toISOString().split('T')[0],
      salary: '',
      status: 'active',
      address: '',
      emergencyContact: '',
      skills: '',
      manager: ''
    });
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const getStatusDetails = (statusId) => {
    return statusOptions.find(status => status.id === statusId) || 
           { name: statusId, color: 'bg-gray-100 text-gray-800' };
  };

  const filteredEmployees = employees.filter(employee => {
    const fullName = `${employee.firstName} ${employee.lastName}`.toLowerCase();
    
    const matchesSearch = 
      fullName.includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterDepartment === 'all' || employee.department === filterDepartment;
    
    return matchesSearch && matchesFilter;
  });

  // Calculate department statistics
  const calculateStats = () => {
    const totalEmployees = employees.length;
    const activeEmployees = employees.filter(e => e.status === 'active').length;
    const departmentDistribution = {};
    
    departments.forEach(dept => {
      departmentDistribution[dept] = employees.filter(e => e.department === dept).length;
    });
    
    const avgSalary = employees.reduce((sum, emp) => sum + emp.salary, 0) / totalEmployees || 0;
    
    return { totalEmployees, activeEmployees, departmentDistribution, avgSalary };
  };

  const stats = calculateStats();

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="text-2xl font-semibold mb-2 sm:mb-0">Employee Management</h2>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search employees..."
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
            {showForm ? 'Cancel' : 'Add Employee'}
          </button>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => handleFilterChange('all')}
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            filterDepartment === 'all' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
          }`}
        >
          All Departments
        </button>
        {departments.map(department => (
          <button
            key={department}
            onClick={() => handleFilterChange(department)}
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              filterDepartment === department ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
            }`}
          >
            {department}
          </button>
        ))}
      </div>

      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <h3 className="text-sm font-medium text-blue-800 mb-1">Total Employees</h3>
            <p className="text-2xl font-bold text-blue-900">{stats.totalEmployees}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <h3 className="text-sm font-medium text-green-800 mb-1">Active Employees</h3>
            <p className="text-2xl font-bold text-green-900">{stats.activeEmployees}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
            <h3 className="text-sm font-medium text-purple-800 mb-1">Departments</h3>
            <p className="text-2xl font-bold text-purple-900">{Object.keys(stats.departmentDistribution).length}</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
            <h3 className="text-sm font-medium text-yellow-800 mb-1">Avg. Salary</h3>
            <p className="text-2xl font-bold text-yellow-900">{formatCurrency(stats.avgSalary)}</p>
          </div>
        </div>
      )}

      {showForm && (
        <div className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-200">
          <h3 className="text-lg font-medium mb-4">Add New Employee</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
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
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                <select
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {departments.map(department => (
                    <option key={department} value={department}>{department}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">Position *</label>
                <input
                  type="text"
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="joiningDate" className="block text-sm font-medium text-gray-700 mb-1">Joining Date</label>
                <input
                  type="date"
                  id="joiningDate"
                  name="joiningDate"
                  value={formData.joiningDate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-1">Salary</label>
                <input
                  type="number"
                  id="salary"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
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
                  {statusOptions.map(option => (
                    <option key={option.id} value={option.id}>{option.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="manager" className="block text-sm font-medium text-gray-700 mb-1">Manager</label>
                <input
                  type="text"
                  id="manager"
                  name="manager"
                  value={formData.manager}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-1">Skills</label>
                <input
                  type="text"
                  id="skills"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Comma separated list of skills"
                />
              </div>
              <div className="sm:col-span-2 md:col-span-3">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="2"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
              <div className="sm:col-span-2 md:col-span-3">
                <label htmlFor="emergencyContact" className="block text-sm font-medium text-gray-700 mb-1">Emergency Contact</label>
                <input
                  type="text"
                  id="emergencyContact"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Name - Phone Number"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add Employee
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner />
          <span className="ml-2 text-gray-600">Loading employees...</span>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salary</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEmployees.map((employee) => {
                const statusDetails = getStatusDetails(employee.status);
                return (
                  <tr key={employee.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img className="h-10 w-10 rounded-full" src={employee.avatar} alt="" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{employee.firstName} {employee.lastName}</div>
                          <div className="text-xs text-gray-500">{employee.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{employee.email}</div>
                      <div className="text-xs text-gray-500">{employee.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {employee.department}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {employee.position}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusDetails.color}`}>
                        {statusDetails.name}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatCurrency(employee.salary)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                      <button className="text-red-600 hover:text-red-900">Delete</button>
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
