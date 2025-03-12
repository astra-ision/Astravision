import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { action, id, data } = body;

    switch (action) {
      case 'add-client':
        // In a real implementation, save to database
        const newClient = {
          id: Date.now(),
          name: data.name,
          contact: data.contact,
          email: data.email,
          phone: data.phone,
          status: data.status || 'Active',
          value: data.value || '$0',
          created: new Date().toISOString()
        };
        return NextResponse.json(newClient);

      case 'update-client':
        // In a real implementation, update in database
        return NextResponse.json({
          id: id,
          ...data,
          updated: new Date().toISOString()
        });

      case 'delete-client':
        // In a real implementation, delete from database
        return NextResponse.json({ success: true, id });

      case 'add-note':
        // In a real implementation, add note to client
        const newNote = {
          id: Date.now(),
          clientId: id,
          text: data.text,
          createdBy: data.createdBy,
          created: new Date().toISOString()
        };
        return NextResponse.json(newNote);

      case 'add-task':
        // In a real implementation, add task related to client
        const newTask = {
          id: Date.now(),
          clientId: id,
          title: data.title,
          description: data.description,
          dueDate: data.dueDate,
          assignedTo: data.assignedTo,
          priority: data.priority || 'Medium',
          status: data.status || 'Pending',
          created: new Date().toISOString()
        };
        return NextResponse.json(newTask);

      default:
        return NextResponse.json({ success: false, message: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('CRM API error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');
  const id = searchParams.get('id');

  try {
    switch (action) {
      case 'clients':
        // In a real implementation, fetch from database
        const mockClients = [
          { id: 1, name: 'Acme Corp', contact: 'John Doe', email: 'john@acmecorp.com', phone: '123-456-7890', status: 'Active', value: '$15,000' },
          { id: 2, name: 'TechSolutions', contact: 'Jane Smith', email: 'jane@techsolutions.com', phone: '234-567-8901', status: 'Active', value: '$25,000' },
          { id: 3, name: 'Global Industries', contact: 'Robert Johnson', email: 'robert@globalind.com', phone: '345-678-9012', status: 'Inactive', value: '$10,000' },
          { id: 4, name: 'Bright Ideas', contact: 'Sarah Thompson', email: 'sarah@brightideas.com', phone: '456-789-0123', status: 'Active', value: '$30,000' },
          { id: 5, name: 'Infinite Systems', contact: 'Michael Brown', email: 'michael@infinite.com', phone: '567-890-1234', status: 'Pending', value: '$20,000' },
        ];
        return NextResponse.json(mockClients);

      case 'client':
        if (!id) {
          return NextResponse.json({ success: false, message: 'Client ID is required' }, { status: 400 });
        }
        // In a real implementation, fetch specific client
        const mockClient = {
          id: parseInt(id),
          name: 'Acme Corp',
          contact: 'John Doe',
          email: 'john@acmecorp.com',
          phone: '123-456-7890',
          status: 'Active', 
          value: '$15,000',
          address: '123 Business St, City, Country',
          notes: [
            { id: 1, text: 'Initial meeting went well', createdBy: 'Jane Doe', created: '2023-01-15T10:30:00Z' },
            { id: 2, text: 'Followed up on proposal', createdBy: 'Jane Doe', created: '2023-01-20T14:45:00Z' }
          ],
          tasks: [
            { id: 1, title: 'Send contract', status: 'Completed', dueDate: '2023-01-25', priority: 'High' },
            { id: 2, title: 'Schedule follow-up call', status: 'Pending', dueDate: '2023-02-05', priority: 'Medium' }
          ]
        };
        return NextResponse.json(mockClient);

      case 'tasks':
        // In a real implementation, fetch tasks
        const mockTasks = [
          { id: 1, clientId: 1, title: 'Send contract', description: 'Email the final contract', dueDate: '2023-01-25', assignedTo: 'Jane Doe', priority: 'High', status: 'Completed' },
          { id: 2, clientId: 1, title: 'Schedule follow-up call', description: 'Discuss next steps', dueDate: '2023-02-05', assignedTo: 'Jane Doe', priority: 'Medium', status: 'Pending' },
          { id: 3, clientId: 2, title: 'Prepare proposal', description: 'Create custom solution', dueDate: '2023-02-10', assignedTo: 'John Smith', priority: 'High', status: 'In Progress' },
          { id: 4, clientId: 3, title: 'Send invoice', description: 'Monthly service invoice', dueDate: '2023-02-01', assignedTo: 'Alex Johnson', priority: 'Medium', status: 'Completed' },
        ];
        return NextResponse.json(mockTasks);

      default:
        return NextResponse.json({ message: 'CRM API is working' });
    }
  } catch (error) {
    console.error('CRM API error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
} 