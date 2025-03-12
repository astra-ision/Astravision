'use client';

import { useState, useEffect } from 'react';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
export default function PerformanceEvaluation() {
  const [evaluations, setEvaluations] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPeriod, setFilterPeriod] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    employeeId: '',
    evaluationPeriod: 'Q1-2023',
    evaluationDate: new Date().toISOString().split('T')[0],
    evaluationType: 'quarterly',
    evaluator: '',
    performanceScore: 3,
    goalsScore: 3,
    skillsScore: 3,
    attitudeScore: 3,
    strengths: '',
    areasForImprovement: '',
    comments: '',
    goalsForNextPeriod: '',
    status: 'draft'
  });

  const evaluationPeriods = [
    'Q1-2023', 'Q2-2023', 'Q3-2023', 'Q4-2023',
    'Q1-2022', 'Q2-2022', 'Q3-2022', 'Q4-2022',
    'Annual-2022'
  ];

  const evaluationTypes = [
    { id: 'quarterly', name: 'Quarterly Review' },
    { id: 'annual', name: 'Annual Review' },
    { id: 'probation', name: 'Probation Review' },
    { id: 'project', name: 'Project Based Review' },
    { id: 'peer', name: 'Peer Review' }
  ];

  const statusOptions = [
    { id: 'draft', name: 'Draft', color: 'bg-gray-100 text-gray-800' },
    { id: 'submitted', name: 'Submitted', color: 'bg-blue-100 text-blue-800' },
    { id: 'reviewed', name: 'Reviewed', color: 'bg-yellow-100 text-yellow-800' },
    { id: 'completed', name: 'Completed', color: 'bg-green-100 text-green-800' }
  ];

  useEffect(() => {
    // Simulated API call
    setTimeout(() => {
      const employeeData = [
        { id: 'EMP001', name: 'John Doe', department: 'Engineering', position: 'Senior Software Engineer' },
        { id: 'EMP002', name: 'Sarah Johnson', department: 'Marketing', position: 'Marketing Manager' },
        { id: 'EMP003', name: 'Michael Wilson', department: 'Sales', position: 'Sales Representative' },
        { id: 'EMP004', name: 'Emily Brown', department: 'HR', position: 'HR Specialist' },
        { id: 'EMP005', name: 'David Miller', department: 'Finance', position: 'Financial Analyst' }
      ];
      
      setEmployees(employeeData);
      
      setEvaluations([
        {
          id: 'EVAL001',
          employeeId: 'EMP001',
          employeeName: 'John Doe',
          department: 'Engineering',
          position: 'Senior Software Engineer',
          evaluationPeriod: 'Q1-2023',
          evaluationDate: '2023-03-30',
          evaluationType: 'quarterly',
          evaluator: 'David Wilson',
          performanceScore: 4.5,
          goalsScore: 4,
          skillsScore: 5,
          attitudeScore: 4,
          averageScore: 4.38,
          rating: 'Exceeds Expectations',
          strengths: 'Technical expertise, problem-solving abilities, and team collaboration.',
          areasForImprovement: 'Documentation and knowledge sharing could be improved.',
          comments: 'John consistently delivers high-quality work and is a valuable team member.',
          goalsForNextPeriod: 'Lead the implementation of the new architecture, mentor junior developers.',
          status: 'completed',
          lastUpdated: '2023-04-05'
        },
        {
          id: 'EVAL002',
          employeeId: 'EMP002',
          employeeName: 'Sarah Johnson',
          department: 'Marketing',
          position: 'Marketing Manager',
          evaluationPeriod: 'Q1-2023',
          evaluationDate: '2023-03-28',
          evaluationType: 'quarterly',
          evaluator: 'Lisa Brown',
          performanceScore: 4,
          goalsScore: 4,
          skillsScore: 3.5,
          attitudeScore: 4.5,
          averageScore: 4,
          rating: 'Exceeds Expectations',
          strengths: 'Leadership skills, campaign management, and strategic planning.',
          areasForImprovement: 'Data analysis and technical marketing skills.',
          comments: 'Sarah has led successful marketing campaigns that increased our brand visibility.',
          goalsForNextPeriod: 'Develop a comprehensive digital marketing strategy, improve ROI tracking.',
          status: 'completed',
          lastUpdated: '2023-04-02'
        },
        {
          id: 'EVAL003',
          employeeId: 'EMP003',
          employeeName: 'Michael Wilson',
          department: 'Sales',
          position: 'Sales Representative',
          evaluationPeriod: 'Q1-2023',
          evaluationDate: '2023-03-25',
          evaluationType: 'quarterly',
          evaluator: 'Robert Taylor',
          performanceScore: 3.5,
          goalsScore: 3,
          skillsScore: 4,
          attitudeScore: 4,
          averageScore: 3.63,
          rating: 'Meets Expectations',
          strengths: 'Client relationship building, product knowledge, and negotiation skills.',
          areasForImprovement: 'Time management and follow-up process needs refinement.',
          comments: 'Michael is a strong performer who excels in building client relationships.',
          goalsForNextPeriod: 'Increase sales quota by 15%, improve lead conversion rate.',
          status: 'completed',
          lastUpdated: '2023-04-01'
        },
        {
          id: 'EVAL004',
          employeeId: 'EMP004',
          employeeName: 'Emily Brown',
          department: 'HR',
          position: 'HR Specialist',
          evaluationPeriod: 'Q1-2023',
          evaluationDate: '2023-03-29',
          evaluationType: 'quarterly',
          evaluator: 'Patricia Evans',
          performanceScore: 4,
          goalsScore: 4,
          skillsScore: 4,
          attitudeScore: 4.5,
          averageScore: 4.13,
          rating: 'Exceeds Expectations',
          strengths: 'Employee relations, recruitment process, and policy implementation.',
          areasForImprovement: 'HR analytics and reporting could be enhanced.',
          comments: 'Emily has significantly improved our recruitment process and employee onboarding.',
          goalsForNextPeriod: 'Implement new HRIS modules, develop employee engagement initiatives.',
          status: 'completed',
          lastUpdated: '2023-04-03'
        },
        {
          id: 'EVAL005',
          employeeId: 'EMP005',
          employeeName: 'David Miller',
          department: 'Finance',
          position: 'Financial Analyst',
          evaluationPeriod: 'Q2-2023',
          evaluationDate: '2023-06-15',
          evaluationType: 'quarterly',
          evaluator: 'George Harris',
          performanceScore: 3.5,
          goalsScore: 3,
          skillsScore: 4,
          attitudeScore: 3.5,
          averageScore: 3.5,
          rating: 'Meets Expectations',
          strengths: 'Financial modeling, data analysis, and attention to detail.',
          areasForImprovement: 'Communication of financial insights to non-finance teams.',
          comments: 'David provides reliable financial analysis that supports business decisions.',
          goalsForNextPeriod: 'Develop improved financial forecasting models, streamline budget process.',
          status: 'submitted',
          lastUpdated: '2023-06-16'
        },
        {
          id: 'EVAL006',
          employeeId: 'EMP001',
          employeeName: 'John Doe',
          department: 'Engineering',
          position: 'Senior Software Engineer',
          evaluationPeriod: 'Q2-2023',
          evaluationDate: '2023-06-25',
          evaluationType: 'quarterly',
          evaluator: 'David Wilson',
          performanceScore: 4,
          goalsScore: 4.5,
          skillsScore: 4,
          attitudeScore: 4,
          averageScore: 4.13,
          rating: 'Exceeds Expectations',
          strengths: 'System architecture design, technical leadership, and problem solving.',
          areasForImprovement: 'Delegating tasks more effectively to junior team members.',
          comments: 'John has successfully led the new architecture implementation project.',
          goalsForNextPeriod: 'Implement CI/CD pipeline improvements, reduce technical debt.',
          status: 'reviewed',
          lastUpdated: '2023-06-28'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (period) => {
    setFilterPeriod(period);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleScoreChange = (e) => {
    const { name, value } = e.target;
    const scoreValue = parseFloat(value);
    
    setFormData(prev => ({
      ...prev,
      [name]: scoreValue
    }));
  };

  const calculateAverageScore = (scores) => {
    const { performanceScore, goalsScore, skillsScore, attitudeScore } = scores;
    return ((performanceScore + goalsScore + skillsScore + attitudeScore) / 4).toFixed(2);
  };

  const getRatingFromScore = (score) => {
    if (score >= 4.5) return 'Outstanding';
    if (score >= 4) return 'Exceeds Expectations';
    if (score >= 3) return 'Meets Expectations';
    if (score >= 2) return 'Needs Improvement';
    return 'Unsatisfactory';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.employeeId || !formData.evaluationPeriod || !formData.evaluator) {
      alert('Please fill in all required fields');
      return;
    }
    
    const employee = employees.find(e => e.id === formData.employeeId);
    
    const averageScore = calculateAverageScore(formData);
    const rating = getRatingFromScore(averageScore);
    
    const newEvaluation = {
      id: `EVAL${String(evaluations.length + 1).padStart(3, '0')}`,
      employeeId: formData.employeeId,
      employeeName: employee?.name || 'Unknown Employee',
      department: employee?.department || 'Unknown Department',
      position: employee?.position || 'Unknown Position',
      evaluationPeriod: formData.evaluationPeriod,
      evaluationDate: formData.evaluationDate,
      evaluationType: formData.evaluationType,
      evaluator: formData.evaluator,
      performanceScore: parseFloat(formData.performanceScore),
      goalsScore: parseFloat(formData.goalsScore),
      skillsScore: parseFloat(formData.skillsScore),
      attitudeScore: parseFloat(formData.attitudeScore),
      averageScore: parseFloat(averageScore),
      rating: rating,
      strengths: formData.strengths,
      areasForImprovement: formData.areasForImprovement,
      comments: formData.comments,
      goalsForNextPeriod: formData.goalsForNextPeriod,
      status: formData.status,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    
    setEvaluations([newEvaluation, ...evaluations]);
    setShowForm(false);
    setFormData({
      employeeId: '',
      evaluationPeriod: 'Q1-2023',
      evaluationDate: new Date().toISOString().split('T')[0],
      evaluationType: 'quarterly',
      evaluator: '',
      performanceScore: 3,
      goalsScore: 3,
      skillsScore: 3,
      attitudeScore: 3,
      strengths: '',
      areasForImprovement: '',
      comments: '',
      goalsForNextPeriod: '',
      status: 'draft'
    });
  };

  const getStatusDetails = (statusId) => {
    return statusOptions.find(status => status.id === statusId) || 
           { name: statusId, color: 'bg-gray-100 text-gray-800' };
  };

  const updateEvaluationStatus = (evalId, newStatus) => {
    setEvaluations(evaluations.map(evaluation => {
      if (evaluation.id === evalId) {
        return { 
          ...evaluation, 
          status: newStatus,
          lastUpdated: new Date().toISOString().split('T')[0]
        };
      }
      return evaluation;
    }));
  };

  const filteredEvaluations = evaluations.filter(evaluation => {
    const matchesSearch = 
      evaluation.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evaluation.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evaluation.position.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterPeriod === 'all' || evaluation.evaluationPeriod === filterPeriod;
    
    return matchesSearch && matchesFilter;
  });

  // Calculate statistics
  const calculateStats = () => {
    const totalEvaluations = evaluations.length;
    const completedEvaluations = evaluations.filter(evaluation => evaluation.status === 'completed').length;
    
    // Calculate average scores by department
    const departmentScores = {};
    const departmentCounts = {};
    
    evaluations.forEach(evaluation => {
      if (!departmentScores[evaluation.department]) {
        departmentScores[evaluation.department] = 0;
        departmentCounts[evaluation.department] = 0;
      }
      departmentScores[evaluation.department] += evaluation.averageScore;
      departmentCounts[evaluation.department] += 1;
    });
    
    const avgScoreByDepartment = {};
    Object.keys(departmentScores).forEach(dept => {
      avgScoreByDepartment[dept] = departmentScores[dept] / departmentCounts[dept];
    });
    
    // Calculate average overall score
    const avgScore = evaluations.reduce((sum, evaluation) => sum + evaluation.averageScore, 0) / totalEvaluations || 0;
    
    return { totalEvaluations, completedEvaluations, avgScoreByDepartment, avgScore };
  };

  const stats = calculateStats();

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="text-2xl font-semibold mb-2 sm:mb-0">Performance Evaluation</h2>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search evaluations..."
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
            {showForm ? 'Cancel' : 'Create Evaluation'}
          </button>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => handleFilterChange('all')}
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            filterPeriod === 'all' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
          }`}
        >
          All Periods
        </button>
        {evaluationPeriods.slice(0, 6).map(period => (
          <button
            key={period}
            onClick={() => handleFilterChange(period)}
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              filterPeriod === period ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
            }`}
          >
            {period}
          </button>
        ))}
      </div>

      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <h3 className="text-sm font-medium text-blue-800 mb-1">Total Evaluations</h3>
            <p className="text-2xl font-bold text-blue-900">{stats.totalEvaluations}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <h3 className="text-sm font-medium text-green-800 mb-1">Completed Evaluations</h3>
            <p className="text-2xl font-bold text-green-900">{stats.completedEvaluations}</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
            <h3 className="text-sm font-medium text-yellow-800 mb-1">Engineering Avg Score</h3>
            <p className="text-2xl font-bold text-yellow-900">
              {stats.avgScoreByDepartment['Engineering'] ? stats.avgScoreByDepartment['Engineering'].toFixed(2) : 'N/A'}
            </p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
            <h3 className="text-sm font-medium text-purple-800 mb-1">Overall Avg Score</h3>
            <p className="text-2xl font-bold text-purple-900">{stats.avgScore.toFixed(2)}</p>
          </div>
        </div>
      )}

      {showForm && (
        <div className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-200">
          <h3 className="text-lg font-medium mb-4">Create Performance Evaluation</h3>
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
                    <option key={employee.id} value={employee.id}>{employee.name} - {employee.position}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="evaluationPeriod" className="block text-sm font-medium text-gray-700 mb-1">Evaluation Period *</label>
                <select
                  id="evaluationPeriod"
                  name="evaluationPeriod"
                  value={formData.evaluationPeriod}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  {evaluationPeriods.map(period => (
                    <option key={period} value={period}>{period}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="evaluationType" className="block text-sm font-medium text-gray-700 mb-1">Evaluation Type</label>
                <select
                  id="evaluationType"
                  name="evaluationType"
                  value={formData.evaluationType}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {evaluationTypes.map(type => (
                    <option key={type.id} value={type.id}>{type.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="evaluationDate" className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  id="evaluationDate"
                  name="evaluationDate"
                  value={formData.evaluationDate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="evaluator" className="block text-sm font-medium text-gray-700 mb-1">Evaluator *</label>
                <input
                  type="text"
                  id="evaluator"
                  name="evaluator"
                  value={formData.evaluator}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
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
            </div>
            
            <h4 className="text-md font-medium text-gray-700 mt-4">Performance Ratings (1-5)</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label htmlFor="performanceScore" className="block text-sm font-medium text-gray-700 mb-1">
                  Overall Performance: {formData.performanceScore}
                </label>
                <input
                  type="range"
                  id="performanceScore"
                  name="performanceScore"
                  min="1"
                  max="5"
                  step="0.5"
                  value={formData.performanceScore}
                  onChange={handleScoreChange}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Poor</span>
                  <span>Excellent</span>
                </div>
              </div>
              <div>
                <label htmlFor="goalsScore" className="block text-sm font-medium text-gray-700 mb-1">
                  Goals Achievement: {formData.goalsScore}
                </label>
                <input
                  type="range"
                  id="goalsScore"
                  name="goalsScore"
                  min="1"
                  max="5"
                  step="0.5"
                  value={formData.goalsScore}
                  onChange={handleScoreChange}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Poor</span>
                  <span>Excellent</span>
                </div>
              </div>
              <div>
                <label htmlFor="skillsScore" className="block text-sm font-medium text-gray-700 mb-1">
                  Skills & Knowledge: {formData.skillsScore}
                </label>
                <input
                  type="range"
                  id="skillsScore"
                  name="skillsScore"
                  min="1"
                  max="5"
                  step="0.5"
                  value={formData.skillsScore}
                  onChange={handleScoreChange}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Poor</span>
                  <span>Excellent</span>
                </div>
              </div>
              <div>
                <label htmlFor="attitudeScore" className="block text-sm font-medium text-gray-700 mb-1">
                  Attitude & Teamwork: {formData.attitudeScore}
                </label>
                <input
                  type="range"
                  id="attitudeScore"
                  name="attitudeScore"
                  min="1"
                  max="5"
                  step="0.5"
                  value={formData.attitudeScore}
                  onChange={handleScoreChange}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Poor</span>
                  <span>Excellent</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label htmlFor="strengths" className="block text-sm font-medium text-gray-700 mb-1">Strengths</label>
                <textarea
                  id="strengths"
                  name="strengths"
                  value={formData.strengths}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
              <div>
                <label htmlFor="areasForImprovement" className="block text-sm font-medium text-gray-700 mb-1">Areas for Improvement</label>
                <textarea
                  id="areasForImprovement"
                  name="areasForImprovement"
                  value={formData.areasForImprovement}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="comments" className="block text-sm font-medium text-gray-700 mb-1">Additional Comments</label>
                <textarea
                  id="comments"
                  name="comments"
                  value={formData.comments}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
              <div>
                <label htmlFor="goalsForNextPeriod" className="block text-sm font-medium text-gray-700 mb-1">Goals for Next Period</label>
                <textarea
                  id="goalsForNextPeriod"
                  name="goalsForNextPeriod"
                  value={formData.goalsForNextPeriod}
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
                {formData.status === 'draft' ? 'Save as Draft' : 'Submit Evaluation'}
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner />
          <span className="ml-2 text-gray-600">Loading evaluations...</span>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Evaluation Details</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scores</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEvaluations.map((evaluation) => {
                const statusDetails = getStatusDetails(evaluation.status);
                return (
                  <tr key={evaluation.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{evaluation.employeeName}</div>
                      <div className="text-xs text-gray-500">{evaluation.position}</div>
                      <div className="text-xs text-gray-500">{evaluation.department}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{evaluation.evaluationPeriod}</div>
                      <div className="text-xs text-gray-500">{evaluationTypes.find(t => t.id === evaluation.evaluationType)?.name || evaluation.evaluationType}</div>
                      <div className="text-xs text-gray-500">Date: {evaluation.evaluationDate}</div>
                      <div className="text-xs text-gray-500">Evaluator: {evaluation.evaluator}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{evaluation.rating}</div>
                      <div className="text-xs text-gray-500">
                        Average: <span className="font-medium">{evaluation.averageScore.toFixed(2)}</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        Performance: {evaluation.performanceScore} | Goals: {evaluation.goalsScore}
                      </div>
                      <div className="text-xs text-gray-500">
                        Skills: {evaluation.skillsScore} | Attitude: {evaluation.attitudeScore}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusDetails.color}`}>
                        {statusDetails.name}
                      </span>
                      <div className="text-xs text-gray-500 mt-1">
                        Updated: {evaluation.lastUpdated}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                      {evaluation.status === 'draft' && (
                        <button 
                          onClick={() => updateEvaluationStatus(evaluation.id, 'submitted')}
                          className="text-green-600 hover:text-green-900"
                        >
                          Submit
                        </button>
                      )}
                      {evaluation.status === 'submitted' && (
                        <button 
                          onClick={() => updateEvaluationStatus(evaluation.id, 'reviewed')}
                          className="text-yellow-600 hover:text-yellow-900"
                        >
                          Review
                        </button>
                      )}
                      {evaluation.status === 'reviewed' && (
                        <button 
                          onClick={() => updateEvaluationStatus(evaluation.id, 'completed')}
                          className="text-green-600 hover:text-green-900"
                        >
                          Complete
                        </button>
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
