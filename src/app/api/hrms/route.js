import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { action, id, data } = body;

    switch (action) {
      case 'add-employee':
        // In a real implementation, save to database
        const newEmployee = {
          id: Date.now(),
          name: data.name,
          position: data.position,
          department: data.department,
          email: data.email,
          phone: data.phone,
          status: 'Active',
          joinDate: data.joinDate || new Date().toISOString().split('T')[0],
          created: new Date().toISOString()
        };
        return NextResponse.json(newEmployee);

      case 'update-employee':
        // In a real implementation, update in database
        return NextResponse.json({
          id: id,
          ...data,
          updated: new Date().toISOString()
        });

      case 'delete-employee':
        // In a real implementation, delete from database
        return NextResponse.json({ success: true, id });

      case 'request-leave':
        // In a real implementation, create leave request
        const leaveRequest = {
          id: Date.now(),
          employee: data.employee,
          employeeId: data.employeeId,
          type: data.type,
          from: data.from,
          to: data.to,
          reason: data.reason,
          status: 'Pending',
          created: new Date().toISOString()
        };
        return NextResponse.json(leaveRequest);

      case 'update-leave':
        // In a real implementation, update leave request
        return NextResponse.json({
          id: id,
          status: data.status,
          reviewedBy: data.reviewedBy,
          reviewedOn: new Date().toISOString()
        });

      case 'add-attendance':
        // In a real implementation, add attendance record
        const attendance = {
          id: Date.now(),
          employeeId: data.employeeId,
          date: data.date || new Date().toISOString().split('T')[0],
          timeIn: data.timeIn,
          timeOut: data.timeOut,
          status: data.status || 'Present',
          notes: data.notes,
          created: new Date().toISOString()
        };
        return NextResponse.json(attendance);

      default:
        return NextResponse.json({ success: false, message: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('HRMS API error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');
  const id = searchParams.get('id');
  const department = searchParams.get('department');
  const status = searchParams.get('status');

  try {
    switch (action) {
      case 'employees':
        // In a real implementation, fetch from database
        let mockEmployees = [
          { id: 1, name: 'John Doe', position: 'Software Engineer', department: 'Engineering', status: 'Active', joinDate: '2022-05-15' },
          { id: 2, name: 'Jane Smith', position: 'Product Manager', department: 'Product', status: 'Active', joinDate: '2021-10-12' },
          { id: 3, name: 'Robert Johnson', position: 'UI/UX Designer', department: 'Design', status: 'On Leave', joinDate: '2022-02-28' },
          { id: 4, name: 'Sarah Williams', position: 'Marketing Specialist', department: 'Marketing', status: 'Active', joinDate: '2023-01-15' },
          { id: 5, name: 'Michael Brown', position: 'DevOps Engineer', department: 'Engineering', status: 'Inactive', joinDate: '2021-08-10' },
        ];
        
        // Apply department filter if provided
        if (department) {
          mockEmployees = mockEmployees.filter(employee => 
            employee.department.toLowerCase() === department.toLowerCase()
          );
        }
        
        // Apply status filter if provided
        if (status) {
          mockEmployees = mockEmployees.filter(employee => 
            employee.status.toLowerCase() === status.toLowerCase()
          );
        }
        
        return NextResponse.json(mockEmployees);

      case 'employee':
        if (!id) {
          return NextResponse.json({ success: false, message: 'Employee ID is required' }, { status: 400 });
        }
        
        // In a real implementation, fetch specific employee
        const mockEmployee = {
          id: parseInt(id),
          name: 'John Doe',
          position: 'Software Engineer',
          department: 'Engineering',
          email: 'john.doe@astravision.com',
          phone: '123-456-7890',
          status: 'Active',
          joinDate: '2022-05-15',
          address: '123 Employee St, City, Country',
          emergencyContact: {
            name: 'Jane Doe',
            relationship: 'Spouse',
            phone: '098-765-4321'
          },
          manager: 'Sarah Manager',
          salary: '$85,000',
          skills: ['JavaScript', 'React', 'Node.js', 'Python'],
          documents: [
            { id: 1, name: 'Resume', uploadDate: '2022-05-10' },
            { id: 2, name: 'Contract', uploadDate: '2022-05-15' }
          ],
          performanceReviews: [
            { id: 1, date: '2022-11-15', score: 4.5, reviewedBy: 'Sarah Manager' },
            { id: 2, date: '2023-05-15', score: 4.7, reviewedBy: 'Sarah Manager' }
          ]
        };
        
        return NextResponse.json(mockEmployee);

      case 'leave-requests':
        // In a real implementation, fetch leave requests
        let mockLeaveRequests = [
          { id: 1, employee: 'Jane Smith', employeeId: 2, type: 'Sick Leave', from: '2023-03-10', to: '2023-03-12', status: 'Approved' },
          { id: 2, employee: 'Robert Johnson', employeeId: 3, type: 'Vacation', from: '2023-03-15', to: '2023-03-20', status: 'Pending' },
          { id: 3, employee: 'Michael Brown', employeeId: 5, type: 'Personal Leave', from: '2023-03-22', to: '2023-03-22', status: 'Pending' },
        ];
        
        // Filter by employee ID if provided
        if (id) {
          mockLeaveRequests = mockLeaveRequests.filter(request => 
            request.employeeId === parseInt(id)
          );
        }
        
        return NextResponse.json(mockLeaveRequests);

      case 'attendance':
        // In a real implementation, fetch attendance records
        const mockAttendance = [
          { id: 1, employeeId: 1, employeeName: 'John Doe', date: '2023-03-20', timeIn: '09:00', timeOut: '18:00', status: 'Present' },
          { id: 2, employeeId: 2, employeeName: 'Jane Smith', date: '2023-03-20', timeIn: '08:45', timeOut: '17:30', status: 'Present' },
          { id: 3, employeeId: 3, employeeName: 'Robert Johnson', date: '2023-03-20', timeIn: null, timeOut: null, status: 'On Leave' },
          { id: 4, employeeId: 4, employeeName: 'Sarah Williams', date: '2023-03-20', timeIn: '09:15', timeOut: '18:15', status: 'Present' },
          { id: 5, employeeId: 5, employeeName: 'Michael Brown', date: '2023-03-20', timeIn: '09:30', timeOut: '16:45', status: 'Present' },
        ];
        
        return NextResponse.json(mockAttendance);

      case 'departments':
        // In a real implementation, fetch departments
        const mockDepartments = [
          { id: 1, name: 'Engineering', manager: 'Sarah Manager', employeeCount: 45 },
          { id: 2, name: 'Product', manager: 'John Leader', employeeCount: 12 },
          { id: 3, name: 'Design', manager: 'Emily Creative', employeeCount: 8 },
          { id: 4, name: 'Marketing', manager: 'David Marketer', employeeCount: 15 },
          { id: 5, name: 'Sales', manager: 'Michael Seller', employeeCount: 20 },
          { id: 6, name: 'Human Resources', manager: 'Jessica People', employeeCount: 5 },
        ];
        
        return NextResponse.json(mockDepartments);

      default:
        return NextResponse.json({ message: 'HRMS API is working' });
    }
  } catch (error) {
    console.error('HRMS API error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
} 