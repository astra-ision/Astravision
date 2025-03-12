'use client';

import { useState, useEffect } from 'react';
import DataTable from '@/components/ui/DataTable';
import Modal from '@/components/ui/Modal';
import Form, { FormInput } from '@/components/ui/Form';
import Chart from '@/components/ui/Chart';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Notification from '@/components/ui/Notification';

export default function Recruitment() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('openings');
  const [jobOpenings, setJobOpenings] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [interviews, setInterviews] = useState([]);
  const [analytics, setAnalytics] = useState({});
  const [error, setError] = useState(null);
  
  // Modals
  const [jobModalOpen, setJobModalOpen] = useState(false);
  const [candidateModalOpen, setCandidateModalOpen] = useState(false);
  const [interviewModalOpen, setInterviewModalOpen] = useState(false);
  const [viewCandidateId, setViewCandidateId] = useState(null);
  const [editJobId, setEditJobId] = useState(null);
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [selectedCandidateId, setSelectedCandidateId] = useState(null);
  
  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Simulate API call with setTimeout
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock job openings data
        const mockJobOpenings = [
          {
            id: 'job-001',
            title: 'Senior Frontend Developer',
            department: 'Engineering',
            location: 'San Francisco, CA (Remote)',
            type: 'Full-time',
            experience: '5+ years',
            salary: '$120,000 - $150,000',
            status: 'Open',
            published: '2023-04-10',
            expires: '2023-06-10',
            applicants: 45,
            description: 'We are looking for an experienced Frontend Developer with expertise in React and modern JavaScript frameworks...',
            requirements: [
              'Strong proficiency in JavaScript, including DOM manipulation and ES6+ features',
              '5+ years experience with React.js and Redux',
              'Thorough understanding of React.js and its core principles',
              'Experience with popular React workflows (such as Flux or Redux)',
              'Familiarity with newer specifications of ECMAScript',
              'Experience with data structure libraries (e.g., Immutable.js)',
              'Knowledge of isomorphic React is a plus',
              'Understanding of REST APIs and HTTP protocol'
            ],
            responsibilities: [
              'Developing new user-facing features using React.js',
              'Building reusable components and front-end libraries for future use',
              'Translating designs and wireframes into high-quality code',
              'Optimizing components for maximum performance across a vast array of web-capable devices and browsers',
              'Coordinating with various stakeholders of the project during the development process'
            ]
          },
          {
            id: 'job-002',
            title: 'Product Manager',
            department: 'Product',
            location: 'New York, NY',
            type: 'Full-time',
            experience: '3+ years',
            salary: '$110,000 - $135,000',
            status: 'Open',
            published: '2023-04-15',
            expires: '2023-06-15',
            applicants: 38,
            description: 'We are seeking a skilled Product Manager to join our growing team...',
            requirements: [
              '3+ years of product management experience in a technology company',
              'Strong understanding of UX design principles',
              'Excellent analytical skills with experience in A/B testing and data-driven decision making',
              'Ability to work cross-functionally with engineering, design, and business teams',
              'Experience with agile development methodologies',
              'Strong communication and presentation skills'
            ],
            responsibilities: [
              'Define product vision, strategy, and roadmap for a key product area',
              'Gather and prioritize product requirements from stakeholders and customers',
              'Work closely with engineering teams to deliver high-quality products',
              'Define and analyze metrics that inform the success of products',
              'Lead the product development process from conception to launch',
              'Understand market trends and competition to inform product decisions'
            ]
          },
          {
            id: 'job-003',
            title: 'DevOps Engineer',
            department: 'Engineering',
            location: 'Remote',
            type: 'Full-time',
            experience: '2+ years',
            salary: '$90,000 - $120,000',
            status: 'Open',
            published: '2023-04-20',
            expires: '2023-06-20',
            applicants: 27,
            description: 'We are looking for a DevOps Engineer to help us build and maintain our cloud infrastructure...',
            requirements: [
              'Experience with AWS, GCP, or Azure',
              'Strong knowledge of Linux/Unix administration',
              'Experience with containerization technologies (Docker, Kubernetes)',
              'Familiarity with Infrastructure as Code (Terraform, CloudFormation)',
              'Understanding of CI/CD pipelines',
              'Experience with monitoring tools (Prometheus, Grafana, ELK stack)'
            ],
            responsibilities: [
              'Design, implement, and maintain our cloud infrastructure',
              'Automate deployment and scaling of applications',
              'Implement monitoring and alerting for our systems',
              'Collaborate with development teams to improve development workflow',
              'Ensure high availability and performance of our services',
              'Implement security best practices across our infrastructure'
            ]
          },
          {
            id: 'job-004',
            title: 'UI/UX Designer',
            department: 'Design',
            location: 'Chicago, IL (Hybrid)',
            type: 'Full-time',
            experience: '3+ years',
            salary: '$85,000 - $110,000',
            status: 'Closed',
            published: '2023-03-01',
            expires: '2023-04-15',
            applicants: 52,
            description: 'We are seeking a talented UI/UX Designer to create amazing user experiences...',
            requirements: [
              'Strong portfolio showcasing UI/UX design work',
              'Proficiency in design tools (Figma, Sketch, Adobe XD)',
              'Understanding of user-centered design principles',
              'Experience conducting user research and usability testing',
              'Knowledge of accessibility standards',
              'Ability to work in a collaborative environment'
            ],
            responsibilities: [
              'Create user-centered designs by understanding business requirements and user feedback',
              'Create user flows, wireframes, prototypes and mockups',
              'Design UI elements and UI components',
              'Create original graphic designs (e.g. images, sketches and tables)',
              'Conduct layout adjustments based on user feedback',
              'Collaborate with product managers and developers to implement designs'
            ]
          }
        ];
        setJobOpenings(mockJobOpenings);
        
        // Mock candidates data
        const mockCandidates = [
          {
            id: 'cand-001',
            name: 'Emily Johnson',
            email: 'emily.johnson@example.com',
            phone: '(555) 123-4567',
            jobId: 'job-001',
            jobTitle: 'Senior Frontend Developer',
            status: 'Interview',
            appliedDate: '2023-04-15',
            resumeUrl: 'https://example.com/resumes/emily-johnson.pdf',
            experience: '7 years',
            skills: ['React', 'JavaScript', 'TypeScript', 'CSS', 'Redux', 'GraphQL'],
            education: 'BS Computer Science, Stanford University',
            currentCompany: 'TechCorp Inc.',
            currentRole: 'Frontend Developer',
            notes: 'Strong candidate with relevant experience. Performed well in technical screening.',
            interviewFeedback: [
              { stage: 'Initial Screening', score: 4.5, feedback: 'Great communication skills, solid technical background' },
              { stage: 'Technical Interview', score: 4.2, feedback: 'Strong knowledge of React and modern JS concepts' }
            ]
          },
          {
            id: 'cand-002',
            name: 'Michael Chen',
            email: 'michael.chen@example.com',
            phone: '(555) 234-5678',
            jobId: 'job-001',
            jobTitle: 'Senior Frontend Developer',
            status: 'Offer',
            appliedDate: '2023-04-18',
            resumeUrl: 'https://example.com/resumes/michael-chen.pdf',
            experience: '8 years',
            skills: ['React', 'JavaScript', 'Node.js', 'Redux', 'WebGL', 'Performance Optimization'],
            education: 'MS Computer Science, MIT',
            currentCompany: 'WebSolutions LLC',
            currentRole: 'Senior UI Engineer',
            notes: 'Exceptional candidate with strong portfolio and relevant experience.',
            interviewFeedback: [
              { stage: 'Initial Screening', score: 4.8, feedback: 'Outstanding communication and problem-solving skills' },
              { stage: 'Technical Interview', score: 4.9, feedback: 'Excellent technical knowledge and practical experience' },
              { stage: 'Culture Fit', score: 4.7, feedback: 'Great team player, aligns well with company values' }
            ]
          },
          {
            id: 'cand-003',
            name: 'Sarah Rodriguez',
            email: 'sarah.r@example.com',
            phone: '(555) 345-6789',
            jobId: 'job-002',
            jobTitle: 'Product Manager',
            status: 'Review',
            appliedDate: '2023-04-20',
            resumeUrl: 'https://example.com/resumes/sarah-rodriguez.pdf',
            experience: '5 years',
            skills: ['Product Strategy', 'Agile', 'User Research', 'Data Analysis', 'Roadmapping'],
            education: 'MBA, UC Berkeley',
            currentCompany: 'ProductIQ',
            currentRole: 'Associate Product Manager',
            notes: 'Strong background in product management with good analytical skills.',
            interviewFeedback: [
              { stage: 'Initial Screening', score: 4.2, feedback: 'Good communication, shows potential' }
            ]
          },
          {
            id: 'cand-004',
            name: 'David Park',
            email: 'david.park@example.com',
            phone: '(555) 456-7890',
            jobId: 'job-003',
            jobTitle: 'DevOps Engineer',
            status: 'Rejected',
            appliedDate: '2023-04-22',
            resumeUrl: 'https://example.com/resumes/david-park.pdf',
            experience: '3 years',
            skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD', 'Linux'],
            education: 'BS Information Technology, Georgia Tech',
            currentCompany: 'CloudScale Systems',
            currentRole: 'Cloud Infrastructure Engineer',
            notes: 'Good technical skills but not enough experience for the senior role.',
            interviewFeedback: [
              { stage: 'Initial Screening', score: 3.5, feedback: 'Solid technical knowledge but lacks depth in some areas' },
              { stage: 'Technical Interview', score: 3.2, feedback: 'Struggled with some complex scenarios' }
            ]
          },
          {
            id: 'cand-005',
            name: 'Alex Thompson',
            email: 'alex.t@example.com',
            phone: '(555) 567-8901',
            jobId: 'job-002',
            jobTitle: 'Product Manager',
            status: 'New',
            appliedDate: '2023-04-25',
            resumeUrl: 'https://example.com/resumes/alex-thompson.pdf',
            experience: '4 years',
            skills: ['Product Development', 'Market Research', 'UX Design', 'Agile/Scrum', 'A/B Testing'],
            education: 'BS Business Administration, University of Michigan',
            currentCompany: 'InnovateCorp',
            currentRole: 'Product Manager',
            notes: 'Interesting background with good domain knowledge.',
            interviewFeedback: []
          }
        ];
        setCandidates(mockCandidates);
        
        // Mock interviews data
        const mockInterviews = [
          {
            id: 'int-001',
            candidateId: 'cand-001',
            candidateName: 'Emily Johnson',
            jobTitle: 'Senior Frontend Developer',
            stage: 'Technical Interview',
            scheduledDate: '2023-05-05T10:00:00',
            interviewers: ['Jennifer Wu', 'Robert Kim'],
            status: 'Scheduled',
            location: 'Zoom Meeting',
            notes: 'Focus on React architecture and state management'
          },
          {
            id: 'int-002',
            candidateId: 'cand-002',
            candidateName: 'Michael Chen',
            jobTitle: 'Senior Frontend Developer',
            stage: 'Final Interview',
            scheduledDate: '2023-05-03T14:00:00',
            interviewers: ['James Wilson', 'Sophia Lee', 'Thomas Garcia'],
            status: 'Completed',
            location: 'On-site',
            notes: 'Discuss team fit and career goals'
          },
          {
            id: 'int-003',
            candidateId: 'cand-003',
            candidateName: 'Sarah Rodriguez',
            jobTitle: 'Product Manager',
            stage: 'Initial Screening',
            scheduledDate: '2023-04-28T11:30:00',
            interviewers: ['Patricia Brown'],
            status: 'Completed',
            location: 'Phone Call',
            notes: 'Assess product management experience and approach'
          },
          {
            id: 'int-004',
            candidateId: 'cand-003',
            candidateName: 'Sarah Rodriguez',
            jobTitle: 'Product Manager',
            stage: 'Case Study',
            scheduledDate: '2023-05-10T13:00:00',
            interviewers: ['William Davis', 'Elizabeth Taylor'],
            status: 'Scheduled',
            location: 'Zoom Meeting',
            notes: 'Product case study presentation and Q&A'
          }
        ];
        setInterviews(mockInterviews);
        
        // Mock analytics data
        const mockAnalytics = {
          jobMetrics: {
            totalJobs: 12,
            openJobs: 8,
            closedJobs: 4,
            averageDaysToFill: 45,
            totalApplicants: 287,
            applicantsPerJob: 23.9
          },
          hiringFunnel: {
            applied: 287,
            screened: 134,
            interview: 68,
            assessment: 42,
            offer: 15,
            hired: 11,
            rejected: 261
          },
          timeToHire: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
            data: [52, 48, 43, 45, 41]
          },
          applicantSources: {
            'Company Website': 35,
            'LinkedIn': 28,
            'Indeed': 15,
            'Referral': 12,
            'Other Job Boards': 10
          },
          departmentHiring: {
            'Engineering': 42,
            'Product': 18,
            'Design': 15,
            'Marketing': 12,
            'Sales': 8,
            'HR': 5
          }
        };
        setAnalytics(mockAnalytics);
        
      } catch (err) {
        setError('Error loading recruitment data: ' + err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  
  // Column definitions for DataTable
  const jobColumns = [
    { key: 'title', label: 'Job Title', sortable: true },
    { key: 'department', label: 'Department', sortable: true },
    { key: 'location', label: 'Location', sortable: true },
    { key: 'type', label: 'Type', sortable: true },
    { 
      key: 'status', 
      label: 'Status', 
      sortable: true,
      render: (row) => (
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          row.status === 'Open' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {row.status}
        </span>
      )
    },
    { 
      key: 'applicants', 
      label: 'Applicants', 
      sortable: true,
      render: (row) => <span className="font-medium">{row.applicants}</span>
    },
    { 
      key: 'published', 
      label: 'Published', 
      sortable: true,
      render: (row) => new Date(row.published).toLocaleDateString()
    },
    { 
      key: 'actions', 
      label: 'Actions',
      sortable: false,
      render: (row) => (
        <div className="flex space-x-2">
          <button 
            onClick={() => handleEditJob(row.id)}
            className="text-blue-600 hover:text-blue-800"
          >
            Edit
          </button>
          <button 
            onClick={() => handleViewApplicants(row.id)}
            className="text-purple-600 hover:text-purple-800"
          >
            Applicants
          </button>
        </div>
      )
    }
  ];
  
  const candidateColumns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'jobTitle', label: 'Job', sortable: true },
    { 
      key: 'status', 
      label: 'Status', 
      sortable: true,
      render: (row) => (
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          row.status === 'New' ? 'bg-blue-100 text-blue-800' :
          row.status === 'Review' ? 'bg-yellow-100 text-yellow-800' :
          row.status === 'Interview' ? 'bg-purple-100 text-purple-800' :
          row.status === 'Offer' ? 'bg-green-100 text-green-800' :
          'bg-red-100 text-red-800'
        }`}>
          {row.status}
        </span>
      )
    },
    { 
      key: 'appliedDate', 
      label: 'Applied Date', 
      sortable: true,
      render: (row) => new Date(row.appliedDate).toLocaleDateString()
    },
    { key: 'experience', label: 'Experience', sortable: true },
    { 
      key: 'actions', 
      label: 'Actions',
      sortable: false,
      render: (row) => (
        <div className="flex space-x-2">
          <button 
            onClick={() => handleViewCandidate(row.id)}
            className="text-blue-600 hover:text-blue-800"
          >
            View
          </button>
          <button 
            onClick={() => handleScheduleInterview(row.id)}
            className="text-green-600 hover:text-green-800"
          >
            Schedule
          </button>
          <button 
            onClick={() => handleUpdateStatus(row.id)}
            className="text-purple-600 hover:text-purple-800"
          >
            Status
          </button>
        </div>
      )
    }
  ];
  
  const interviewColumns = [
    { 
      key: 'scheduledDate', 
      label: 'Date & Time', 
      sortable: true,
      render: (row) => new Date(row.scheduledDate).toLocaleString()
    },
    { key: 'candidateName', label: 'Candidate', sortable: true },
    { key: 'jobTitle', label: 'Position', sortable: true },
    { key: 'stage', label: 'Stage', sortable: true },
    { 
      key: 'interviewers', 
      label: 'Interviewers', 
      sortable: false,
      render: (row) => row.interviewers.join(', ')
    },
    { 
      key: 'status', 
      label: 'Status', 
      sortable: true,
      render: (row) => (
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          row.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
          row.status === 'Completed' ? 'bg-green-100 text-green-800' :
          'bg-red-100 text-red-800'
        }`}>
          {row.status}
        </span>
      )
    },
    { 
      key: 'actions', 
      label: 'Actions',
      sortable: false,
      render: (row) => (
        <div className="flex space-x-2">
          <button 
            onClick={() => handleEditInterview(row.id)}
            className="text-blue-600 hover:text-blue-800"
          >
            Edit
          </button>
          {row.status === 'Scheduled' && (
            <button 
              onClick={() => handleCompleteInterview(row.id)}
              className="text-green-600 hover:text-green-800"
            >
              Complete
            </button>
          )}
          {row.status === 'Scheduled' && (
            <button 
              onClick={() => handleCancelInterview(row.id)}
              className="text-red-600 hover:text-red-800"
            >
              Cancel
            </button>
          )}
        </div>
      )
    }
  ];
  
  // Action handlers
  const handleAddJob = () => {
    setEditJobId(null);
    setJobModalOpen(true);
  };
  
  const handleEditJob = (jobId) => {
    setEditJobId(jobId);
    setJobModalOpen(true);
  };
  
  const handleViewApplicants = (jobId) => {
    // Filter candidates for the selected job
    const jobApplicants = candidates.filter(c => c.jobId === jobId);
    setCandidates(jobApplicants);
    setActiveTab('candidates');
    
    // Get job title
    const job = jobOpenings.find(j => j.id === jobId);
    Notification.info({
      title: 'Viewing Applicants',
      message: `Showing ${jobApplicants.length} applicants for ${job?.title}`
    });
  };
  
  const handleAddCandidate = () => {
    setCandidateModalOpen(true);
  };
  
  const handleViewCandidate = (candidateId) => {
    setViewCandidateId(candidateId);
  };
  
  const handleScheduleInterview = (candidateId) => {
    const candidate = candidates.find(c => c.id === candidateId);
    setInterviewModalOpen(true);
    
    // Pre-fill form data
    // Implementation details would go here
  };
  
  const handleUpdateStatus = (candidateId) => {
    setSelectedCandidateId(candidateId);
    setStatusModalOpen(true);
  };
  
  const handleEditInterview = (interviewId) => {
    // Open interview edit form
    // Implementation details would go here
  };
  
  const handleCompleteInterview = (interviewId) => {
    // Mark interview as completed and collect feedback
    // Implementation details would go here
    Notification.success({
      title: 'Interview Completed',
      message: 'Interview has been marked as completed.'
    });
  };
  
  const handleCancelInterview = (interviewId) => {
    // Cancel the interview
    // Implementation details would go here
    Notification.warning({
      title: 'Interview Cancelled',
      message: 'Interview has been cancelled.'
    });
  };
  
  const handleJobSubmit = (values) => {
    if (editJobId) {
      // Update existing job
      const updatedJobs = jobOpenings.map(job => 
        job.id === editJobId ? { ...job, ...values } : job
      );
      setJobOpenings(updatedJobs);
      Notification.success({
        title: 'Job Updated',
        message: `${values.title} has been updated successfully.`
      });
    } else {
      // Add new job
      const newJob = {
        id: `job-${Date.now()}`,
        applicants: 0,
        published: new Date().toISOString().split('T')[0],
        ...values
      };
      setJobOpenings([...jobOpenings, newJob]);
      Notification.success({
        title: 'Job Created',
        message: `${values.title} has been published successfully.`
      });
    }
    setJobModalOpen(false);
  };
  
  const handleCandidateSubmit = (values) => {
    // Implementation details would go here
    Notification.success({
      title: 'Candidate Added',
      message: `${values.name} has been added successfully.`
    });
    setCandidateModalOpen(false);
  };
  
  const handleInterviewSubmit = (values) => {
    // Implementation details would go here
    Notification.success({
      title: 'Interview Scheduled',
      message: `Interview for ${values.candidateId} has been scheduled successfully.`
    });
    setInterviewModalOpen(false);
  };
  
  const handleStatusUpdate = (values) => {
    // Implementation details would go here
    Notification.success({
      title: 'Status Updated',
      message: `Status for ${selectedCandidateId} has been updated successfully.`
    });
    setStatusModalOpen(false);
  };
  
  // Render job openings tab
  const renderJobOpeningsTab = () => {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Job Openings</h3>
          <button
            onClick={handleAddJob}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            Add New Job
          </button>
        </div>
        
        <DataTable
          data={jobOpenings}
          columns={jobColumns}
          pagination={true}
          searchable={true}
          emptyMessage="No job openings found"
        />
      </div>
    );
  };
  
  // Render candidates tab
  const renderCandidatesTab = () => {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Candidates</h3>
          <div className="flex space-x-2">
            <button
              onClick={() => setCandidates(candidates)}
              className="bg-gray-200 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-300 transition-colors text-sm"
            >
              View All
            </button>
            <button
              onClick={handleAddCandidate}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              Add Candidate
            </button>
          </div>
        </div>
        
        <DataTable
          data={candidates}
          columns={candidateColumns}
          pagination={true}
          searchable={true}
          emptyMessage="No candidates found"
        />
        
        {viewCandidateId && (
          <CandidateDetails
            candidate={candidates.find(c => c.id === viewCandidateId)}
            onClose={() => setViewCandidateId(null)}
          />
        )}
      </div>
    );
  };
  
  // Render interviews tab
  const renderInterviewsTab = () => {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Interviews</h3>
          <button
            onClick={() => setInterviewModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            Schedule Interview
          </button>
        </div>
        
        <DataTable
          data={interviews}
          columns={interviewColumns}
          pagination={true}
          searchable={true}
          emptyMessage="No interviews scheduled"
        />
      </div>
    );
  };
  
  // Render analytics tab
  const renderAnalyticsTab = () => {
    if (!analytics.hiringFunnel) return null;
    
    const hiringFunnelData = [
      analytics.hiringFunnel.applied,
      analytics.hiringFunnel.screened,
      analytics.hiringFunnel.interview,
      analytics.hiringFunnel.assessment,
      analytics.hiringFunnel.offer,
      analytics.hiringFunnel.hired
    ];
    
    const hiringFunnelLabels = [
      'Applied',
      'Screened',
      'Interview',
      'Assessment',
      'Offer',
      'Hired'
    ];
    
    const applicantSourcesData = Object.values(analytics.applicantSources);
    const applicantSourcesLabels = Object.keys(analytics.applicantSources);
    
    const departmentHiringData = Object.values(analytics.departmentHiring);
    const departmentHiringLabels = Object.keys(analytics.departmentHiring);
    
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <h4 className="text-sm font-medium text-gray-500 mb-1">Open Positions</h4>
            <div className="text-2xl font-bold">{analytics.jobMetrics.openJobs}</div>
            <div className="mt-1 text-xs text-gray-500">Total: {analytics.jobMetrics.totalJobs}</div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <h4 className="text-sm font-medium text-gray-500 mb-1">Total Applicants</h4>
            <div className="text-2xl font-bold">{analytics.jobMetrics.totalApplicants}</div>
            <div className="mt-1 text-xs text-gray-500">Avg per job: {analytics.jobMetrics.applicantsPerJob.toFixed(1)}</div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <h4 className="text-sm font-medium text-gray-500 mb-1">Avg. Time to Fill</h4>
            <div className="text-2xl font-bold">{analytics.jobMetrics.averageDaysToFill} days</div>
            <div className="mt-1 text-xs text-gray-500">Candidates in pipeline: {analytics.hiringFunnel.interview + analytics.hiringFunnel.assessment}</div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <h4 className="text-sm font-medium text-gray-500 mb-3">Hiring Funnel</h4>
            <Chart
              type="bar"
              data={hiringFunnelData}
              labels={hiringFunnelLabels}
              height={300}
              title=""
              yAxisLabel="Number of Candidates"
              colors={['#3b82f6']}
            />
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <h4 className="text-sm font-medium text-gray-500 mb-3">Time to Hire (Days)</h4>
            <Chart
              type="line"
              data={analytics.timeToHire.data}
              labels={analytics.timeToHire.labels}
              height={300}
              title=""
              yAxisLabel="Days"
              colors={['#10b981']}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <h4 className="text-sm font-medium text-gray-500 mb-3">Applicant Sources</h4>
            <Chart
              type="pie"
              data={applicantSourcesData}
              labels={applicantSourcesLabels}
              height={300}
              title=""
            />
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <h4 className="text-sm font-medium text-gray-500 mb-3">Hiring by Department</h4>
            <Chart
              type="bar"
              data={departmentHiringData}
              labels={departmentHiringLabels}
              height={300}
              title=""
              yAxisLabel="Candidates"
              colors={['#8b5cf6']}
            />
          </div>
        </div>
      </div>
    );
  };
  
  // Job form
  const renderJobForm = () => {
    const job = editJobId ? jobOpenings.find(j => j.id === editJobId) : null;
    
    const initialValues = job ? {
      title: job.title,
      department: job.department,
      location: job.location,
      type: job.type,
      experience: job.experience,
      salary: job.salary,
      status: job.status,
      expires: job.expires,
      description: job.description
    } : {
      title: '',
      department: '',
      location: '',
      type: 'Full-time',
      experience: '',
      salary: '',
      status: 'Open',
      expires: '',
      description: ''
    };
    
    const departmentOptions = [
      { value: 'Engineering', label: 'Engineering' },
      { value: 'Product', label: 'Product' },
      { value: 'Design', label: 'Design' },
      { value: 'Marketing', label: 'Marketing' },
      { value: 'Sales', label: 'Sales' },
      { value: 'HR', label: 'HR' },
      { value: 'Finance', label: 'Finance' },
      { value: 'Operations', label: 'Operations' }
    ];
    
    const typeOptions = [
      { value: 'Full-time', label: 'Full-time' },
      { value: 'Part-time', label: 'Part-time' },
      { value: 'Contract', label: 'Contract' },
      { value: 'Internship', label: 'Internship' }
    ];
    
    const statusOptions = [
      { value: 'Open', label: 'Open' },
      { value: 'Closed', label: 'Closed' },
      { value: 'Draft', label: 'Draft' }
    ];
    
    return (
      <Form
        initialValues={initialValues}
        onSubmit={handleJobSubmit}
        validationSchema={{
          title: {
            required: { value: true, message: 'Job title is required' }
          },
          department: {
            required: { value: true, message: 'Department is required' }
          },
          location: {
            required: { value: true, message: 'Location is required' }
          }
        }}
      >
        {({ values, errors, handleChange, handleBlur, isSubmitting }) => (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <FormInput
                label="Job Title"
                name="title"
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.title}
                required
              />
              
              <FormInput
                label="Department"
                name="department"
                type="select"
                value={values.department}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.department}
                required
                options={departmentOptions}
              />
              
              <FormInput
                label="Location"
                name="location"
                value={values.location}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.location}
                required
                placeholder="City, State or Remote"
              />
              
              <FormInput
                label="Job Type"
                name="type"
                type="select"
                value={values.type}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.type}
                options={typeOptions}
              />
              
              <FormInput
                label="Experience Required"
                name="experience"
                value={values.experience}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="e.g. 3+ years"
              />
              
              <FormInput
                label="Salary Range"
                name="salary"
                value={values.salary}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="e.g. $80,000 - $100,000"
              />
              
              <FormInput
                label="Status"
                name="status"
                type="select"
                value={values.status}
                onChange={handleChange}
                onBlur={handleBlur}
                options={statusOptions}
              />
              
              <FormInput
                label="Expires"
                name="expires"
                type="date"
                value={values.expires}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            
            <FormInput
              label="Job Description"
              name="description"
              type="textarea"
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              rows={5}
            />
          </>
        )}
      </Form>
    );
  };
  
  // Candidate form
  const renderCandidateForm = () => {
    const initialValues = {
      name: '',
      email: '',
      phone: '',
      jobId: '',
      experience: '',
      skills: '',
      education: '',
      currentCompany: '',
      currentRole: '',
      notes: ''
    };
    
    return (
      <Form
        initialValues={initialValues}
        onSubmit={handleCandidateSubmit}
        validationSchema={{
          name: {
            required: { value: true, message: 'Candidate name is required' }
          },
          email: {
            required: { value: true, message: 'Email is required' },
            pattern: { 
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
              message: 'Please enter a valid email address' 
            }
          },
          jobId: {
            required: { value: true, message: 'Job position is required' }
          }
        }}
      >
        {({ values, errors, handleChange, handleBlur, isSubmitting }) => (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <FormInput
                label="Full Name"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.name}
                required
              />
              
              <FormInput
                label="Email"
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.email}
                required
              />
              
              <FormInput
                label="Phone"
                name="phone"
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.phone}
              />
              
              <FormInput
                label="Job Position"
                name="jobId"
                type="select"
                value={values.jobId}
                onChange={(e) => {
                  handleChange(e);
                  // Set job title based on selected job
                  const job = jobOpenings.find(j => j.id === e.target.value);
                  if (job) {
                    values.jobTitle = job.title;
                  }
                }}
                onBlur={handleBlur}
                error={errors.jobId}
                required
                options={jobOpenings
                  .filter(job => job.status === 'Open')
                  .map(job => ({ value: job.id, label: job.title }))}
              />
              
              <FormInput
                label="Experience"
                name="experience"
                value={values.experience}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="e.g. 5 years"
              />
              
              <FormInput
                label="Education"
                name="education"
                value={values.education}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="e.g. BS Computer Science, Stanford"
              />
              
              <FormInput
                label="Current Company"
                name="currentCompany"
                value={values.currentCompany}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              
              <FormInput
                label="Current Role"
                name="currentRole"
                value={values.currentRole}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            
            <FormInput
              label="Skills (comma separated)"
              name="skills"
              value={values.skills}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="e.g. JavaScript, React, Node.js"
            />
            
            <FormInput
              label="Notes"
              name="notes"
              type="textarea"
              value={values.notes}
              onChange={handleChange}
              onBlur={handleBlur}
              rows={3}
            />
          </>
        )}
      </Form>
    );
  };
  
  // Interview form
  const renderInterviewForm = () => {
    const candidate = selectedCandidateId 
      ? candidates.find(c => c.id === selectedCandidateId) 
      : null;
    
    const initialValues = {
      stage: candidate ? 'Initial Screening' : '',
      scheduledDate: '',
      interviewers: '',
      location: '',
      notes: ''
    };
    
    const stageOptions = [
      { value: 'Initial Screening', label: 'Initial Screening' },
      { value: 'Technical Interview', label: 'Technical Interview' },
      { value: 'Case Study', label: 'Case Study' },
      { value: 'Culture Fit', label: 'Culture Fit' },
      { value: 'Final Interview', label: 'Final Interview' }
    ];
    
    return (
      <Form
        initialValues={initialValues}
        onSubmit={handleInterviewSubmit}
        validationSchema={{
          stage: {
            required: { value: true, message: 'Interview stage is required' }
          },
          scheduledDate: {
            required: { value: true, message: 'Date and time are required' }
          },
          interviewers: {
            required: { value: true, message: 'Interviewer(s) are required' }
          }
        }}
      >
        {({ values, errors, handleChange, handleBlur, isSubmitting }) => (
          <>
            <div className="mb-4">
              {candidate ? (
                <div className="bg-blue-50 p-3 rounded-md mb-4">
                  <p className="text-sm font-medium">Scheduling interview for:</p>
                  <p className="text-sm font-bold">{candidate.name}</p>
                  <p className="text-sm text-gray-600">{candidate.jobTitle}</p>
                </div>
              ) : (
                <FormInput
                  label="Candidate"
                  name="candidateId"
                  type="select"
                  value={values.candidateId}
                  onChange={(e) => {
                    handleChange(e);
                    setSelectedCandidateId(e.target.value);
                  }}
                  onBlur={handleBlur}
                  error={errors.candidateId}
                  required
                  options={candidates
                    .filter(c => c.status !== 'Rejected')
                    .map(c => ({ value: c.id, label: `${c.name} (${c.jobTitle})` }))}
                />
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <FormInput
                label="Interview Stage"
                name="stage"
                type="select"
                value={values.stage}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.stage}
                required
                options={stageOptions}
              />
              
              <FormInput
                label="Date & Time"
                name="scheduledDate"
                type="datetime-local"
                value={values.scheduledDate}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.scheduledDate}
                required
              />
              
              <FormInput
                label="Interviewers (comma separated)"
                name="interviewers"
                value={values.interviewers}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.interviewers}
                required
                placeholder="e.g. John Smith, Jane Doe"
              />
              
              <FormInput
                label="Location"
                name="location"
                value={values.location}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="e.g. Zoom Meeting, Conference Room B"
              />
            </div>
            
            <FormInput
              label="Interview Notes/Focus Areas"
              name="notes"
              type="textarea"
              value={values.notes}
              onChange={handleChange}
              onBlur={handleBlur}
              rows={3}
            />
          </>
        )}
      </Form>
    );
  };
  
  // Status update form
  const renderStatusUpdateForm = () => {
    const candidate = selectedCandidateId 
      ? candidates.find(c => c.id === selectedCandidateId) 
      : null;
    
    const initialValues = {
      status: candidate?.status || 'New',
      notes: ''
    };
    
    const statusOptions = [
      { value: 'New', label: 'New' },
      { value: 'Review', label: 'Review' },
      { value: 'Interview', label: 'Interview' },
      { value: 'Assessment', label: 'Assessment' },
      { value: 'Offer', label: 'Offer' },
      { value: 'Hired', label: 'Hired' },
      { value: 'Rejected', label: 'Rejected' }
    ];
    
    return (
      <Form
        initialValues={initialValues}
        onSubmit={handleStatusUpdate}
        validationSchema={{
          status: {
            required: { value: true, message: 'Status is required' }
          }
        }}
      >
        {({ values, errors, handleChange, handleBlur, isSubmitting }) => (
          <>
            <div className="mb-4">
              {candidate && (
                <div className="bg-blue-50 p-3 rounded-md mb-4">
                  <p className="text-sm font-medium">Updating status for:</p>
                  <p className="text-sm font-bold">{candidate.name}</p>
                  <p className="text-sm text-gray-600">Current status: 
                    <span className={`ml-1 px-2 py-0.5 text-xs font-medium rounded-full inline-block ${
                      candidate.status === 'New' ? 'bg-blue-100 text-blue-800' :
                      candidate.status === 'Review' ? 'bg-yellow-100 text-yellow-800' :
                      candidate.status === 'Interview' ? 'bg-purple-100 text-purple-800' :
                      candidate.status === 'Offer' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {candidate.status}
                    </span>
                  </p>
                </div>
              )}
            </div>
            
            <FormInput
              label="Status"
              name="status"
              type="select"
              value={values.status}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.status}
              required
              options={statusOptions}
            />
            
            <FormInput
              label="Notes"
              name="notes"
              type="textarea"
              value={values.notes}
              onChange={handleChange}
              onBlur={handleBlur}
              rows={3}
              placeholder="Add notes about this status change"
            />
          </>
        )}
      </Form>
    );
  };
  
  // Candidate details component
  function CandidateDetails({ candidate, onClose }) {
    if (!candidate) return null;
    
    return (
      <Modal
        isOpen={!!candidate}
        onClose={onClose}
        title={`Candidate: ${candidate.name}`}
        size="lg"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">Contact Information</h4>
              <div className="space-y-2">
                <div>
                  <span className="text-sm font-medium">Email:</span>
                  <span className="text-sm ml-2">{candidate.email}</span>
                </div>
                <div>
                  <span className="text-sm font-medium">Phone:</span>
                  <span className="text-sm ml-2">{candidate.phone}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">Application Details</h4>
              <div className="space-y-2">
                <div>
                  <span className="text-sm font-medium">Position:</span>
                  <span className="text-sm ml-2">{candidate.jobTitle}</span>
                </div>
                <div>
                  <span className="text-sm font-medium">Status:</span>
                  <span className={`text-sm ml-2 px-2 py-0.5 rounded-full ${
                    candidate.status === 'New' ? 'bg-blue-100 text-blue-800' :
                    candidate.status === 'Review' ? 'bg-yellow-100 text-yellow-800' :
                    candidate.status === 'Interview' ? 'bg-purple-100 text-purple-800' :
                    candidate.status === 'Offer' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {candidate.status}
                  </span>
                </div>
                <div>
                  <span className="text-sm font-medium">Applied:</span>
                  <span className="text-sm ml-2">{new Date(candidate.appliedDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-1">Professional Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-sm font-medium">Experience:</span>
                <span className="text-sm ml-2">{candidate.experience}</span>
              </div>
              <div>
                <span className="text-sm font-medium">Current Company:</span>
                <span className="text-sm ml-2">{candidate.currentCompany}</span>
              </div>
              <div>
                <span className="text-sm font-medium">Current Role:</span>
                <span className="text-sm ml-2">{candidate.currentRole}</span>
              </div>
              <div>
                <span className="text-sm font-medium">Education:</span>
                <span className="text-sm ml-2">{candidate.education}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-2">Skills</h4>
            <div className="flex flex-wrap gap-2">
              {candidate.skills.map((skill, index) => (
                <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-1">Notes</h4>
            <p className="text-sm bg-gray-50 p-3 rounded-lg">{candidate.notes || 'No notes added.'}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-2">Interview Feedback</h4>
            {candidate.interviewFeedback && candidate.interviewFeedback.length > 0 ? (
              <div className="space-y-3">
                {candidate.interviewFeedback.map((feedback, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">{feedback.stage}</span>
                      <div className="flex items-center">
                        <span className="text-sm font-medium mr-1">Score:</span>
                        <span className={`text-sm font-medium ${
                          feedback.score >= 4 ? 'text-green-600' : 
                          feedback.score >= 3 ? 'text-yellow-600' : 
                          'text-red-600'
                        }`}>
                          {feedback.score}/5
                        </span>
                      </div>
                    </div>
                    <p className="text-sm">{feedback.feedback}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No interview feedback yet.</p>
            )}
          </div>
          
          <div className="flex justify-between">
            <div>
              <a 
                href={candidate.resumeUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                View Resume
              </a>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => {
                  onClose();
                  handleUpdateStatus(candidate.id);
                }}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Update Status
              </button>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
  
  // Main render
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
        {error}
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
          <li className="mr-2">
            <button
              className={`inline-block p-4 border-b-2 rounded-t-lg ${
                activeTab === 'openings'
                  ? 'text-blue-600 border-blue-600'
                  : 'border-transparent hover:text-gray-600 hover:border-gray-300'
              }`}
              onClick={() => handleTabChange('openings')}
            >
              Job Openings
            </button>
          </li>
          <li className="mr-2">
            <button
              className={`inline-block p-4 border-b-2 rounded-t-lg ${
                activeTab === 'candidates'
                  ? 'text-blue-600 border-blue-600'
                  : 'border-transparent hover:text-gray-600 hover:border-gray-300'
              }`}
              onClick={() => handleTabChange('candidates')}
            >
              Candidates
            </button>
          </li>
          <li className="mr-2">
            <button
              className={`inline-block p-4 border-b-2 rounded-t-lg ${
                activeTab === 'interviews'
                  ? 'text-blue-600 border-blue-600'
                  : 'border-transparent hover:text-gray-600 hover:border-gray-300'
              }`}
              onClick={() => handleTabChange('interviews')}
            >
              Interviews
            </button>
          </li>
          <li className="mr-2">
            <button
              className={`inline-block p-4 border-b-2 rounded-t-lg ${
                activeTab === 'analytics'
                  ? 'text-blue-600 border-blue-600'
                  : 'border-transparent hover:text-gray-600 hover:border-gray-300'
              }`}
              onClick={() => handleTabChange('analytics')}
            >
              Analytics
            </button>
          </li>
        </ul>
      </div>
      
      <div className="p-1">
        {activeTab === 'openings' && renderJobOpeningsTab()}
        {activeTab === 'candidates' && renderCandidatesTab()}
        {activeTab === 'interviews' && renderInterviewsTab()}
        {activeTab === 'analytics' && renderAnalyticsTab()}
      </div>
      
      {/* Job Modal */}
      <Modal
        isOpen={jobModalOpen}
        onClose={() => setJobModalOpen(false)}
        title={editJobId ? "Edit Job" : "Add New Job"}
        size="lg"
      >
        {renderJobForm()}
      </Modal>
      
      {/* Candidate Modal */}
      <Modal
        isOpen={candidateModalOpen}
        onClose={() => setCandidateModalOpen(false)}
        title="Add New Candidate"
        size="lg"
      >
        {renderCandidateForm()}
      </Modal>
      
      {/* Interview Modal */}
      <Modal
        isOpen={interviewModalOpen}
        onClose={() => setInterviewModalOpen(false)}
        title="Schedule Interview"
        size="md"
      >
        {renderInterviewForm()}
      </Modal>
      
      {/* Status Update Modal */}
      <Modal
        isOpen={statusModalOpen}
        onClose={() => setStatusModalOpen(false)}
        title="Update Candidate Status"
        size="sm"
      >
        {renderStatusUpdateForm()}
      </Modal>
    </div>
  );
}