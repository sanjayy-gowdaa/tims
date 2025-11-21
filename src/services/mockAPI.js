// Mock delay to simulate network requests
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Generate mock ticket ID
let ticketIdCounter = 100;

// Mock Users Data
export const mockUsers = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@company.com',
    role: 'admin',
    department: 'it',
    status: 'active',
    phone: '+1-555-0100',
    location: 'New York, USA',
    createdAt: new Date('2024-01-01').toISOString(),
  },
  {
    id: '2',
    name: 'John Agent',
    email: 'agent@company.com',
    role: 'agent',
    department: 'it',
    status: 'active',
    phone: '+1-555-0101',
    location: 'London, UK',
    createdAt: new Date('2024-02-01').toISOString(),
  },
  {
    id: '3',
    name: 'Jane Manager',
    email: 'manager@company.com',
    role: 'manager',
    department: 'operations',
    status: 'active',
    phone: '+1-555-0102',
    location: 'Tokyo, Japan',
    createdAt: new Date('2024-03-01').toISOString(),
  },
  {
    id: '4',
    name: 'Bob User',
    email: 'user@company.com',
    role: 'user',
    department: 'sales',
    status: 'active',
    phone: '+1-555-0103',
    location: 'Sydney, Australia',
    createdAt: new Date('2024-04-01').toISOString(),
  },
];

// Mock Tickets Data
export const mockTickets = [
  {
    id: '1',
    ticketNumber: 'TKT-000001',
    title: 'Cannot access email account',
    description: 'I am unable to login to my email account. Getting "Invalid credentials" error even though I am sure the password is correct.',
    status: 'open',
    priority: 'high',
    category: 'it-support',
    createdBy: mockUsers[3],
    assignedTo: mockUsers[1],
    createdAt: new Date('2024-11-15T09:30:00').toISOString(),
    updatedAt: new Date('2024-11-15T10:15:00').toISOString(),
    attachments: [],
    history: [
      {
        id: '1',
        description: 'Ticket created',
        createdAt: new Date('2024-11-15T09:30:00').toISOString(),
      },
      {
        id: '2',
        description: 'Assigned to John Agent',
        createdAt: new Date('2024-11-15T10:15:00').toISOString(),
      },
    ],
  },
  {
    id: '2',
    ticketNumber: 'TKT-000002',
    title: 'Request for new laptop',
    description: 'My current laptop is 5 years old and running very slow. I need a new laptop for better productivity.',
    status: 'in-progress',
    priority: 'medium',
    category: 'it-support',
    createdBy: mockUsers[3],
    assignedTo: mockUsers[1],
    createdAt: new Date('2024-11-14T14:20:00').toISOString(),
    updatedAt: new Date('2024-11-16T11:30:00').toISOString(),
    attachments: [],
    history: [
      {
        id: '1',
        description: 'Ticket created',
        createdAt: new Date('2024-11-14T14:20:00').toISOString(),
      },
      {
        id: '2',
        description: 'Status changed to In Progress',
        createdAt: new Date('2024-11-16T11:30:00').toISOString(),
      },
    ],
  },
  {
    id: '3',
    ticketNumber: 'TKT-000003',
    title: 'VPN connection issues',
    description: 'VPN keeps disconnecting every 10 minutes when working from home. This is affecting my productivity.',
    status: 'resolved',
    priority: 'high',
    category: 'it-support',
    createdBy: mockUsers[2],
    assignedTo: mockUsers[1],
    createdAt: new Date('2024-11-10T08:00:00').toISOString(),
    updatedAt: new Date('2024-11-12T16:45:00').toISOString(),
    resolvedAt: new Date('2024-11-12T16:45:00').toISOString(),
    attachments: [],
    history: [
      {
        id: '1',
        description: 'Ticket created',
        createdAt: new Date('2024-11-10T08:00:00').toISOString(),
      },
      {
        id: '2',
        description: 'Status changed to Resolved',
        createdAt: new Date('2024-11-12T16:45:00').toISOString(),
      },
    ],
  },
  {
    id: '4',
    ticketNumber: 'TKT-000004',
    title: 'Office AC not working',
    description: 'Air conditioning in office room 301 is not working. Temperature is too high.',
    status: 'open',
    priority: 'medium',
    category: 'facilities',
    createdBy: mockUsers[3],
    assignedTo: null,
    createdAt: new Date('2024-11-17T13:00:00').toISOString(),
    updatedAt: new Date('2024-11-17T13:00:00').toISOString(),
    attachments: [],
    history: [
      {
        id: '1',
        description: 'Ticket created',
        createdAt: new Date('2024-11-17T13:00:00').toISOString(),
      },
    ],
  },
  {
    id: '5',
    ticketNumber: 'TKT-000005',
    title: 'Payroll inquiry',
    description: 'I have not received my November paycheck yet. Could you please check the status?',
    status: 'pending',
    priority: 'critical',
    category: 'hr',
    createdBy: mockUsers[3],
    assignedTo: mockUsers[2],
    createdAt: new Date('2024-11-16T10:30:00').toISOString(),
    updatedAt: new Date('2024-11-17T09:00:00').toISOString(),
    attachments: [],
    history: [
      {
        id: '1',
        description: 'Ticket created',
        createdAt: new Date('2024-11-16T10:30:00').toISOString(),
      },
    ],
  },
];

// Mock Comments
export const mockComments = {
  '1': [
    {
      id: '1',
      content: 'I will look into this issue right away.',
      author: mockUsers[1],
      createdAt: new Date('2024-11-15T10:20:00').toISOString(),
    },
    {
      id: '2',
      content: 'Have you tried resetting your password?',
      author: mockUsers[1],
      createdAt: new Date('2024-11-15T11:00:00').toISOString(),
    },
  ],
  '2': [
    {
      id: '1',
      content: 'Request approved. Processing your laptop order.',
      author: mockUsers[1],
      createdAt: new Date('2024-11-16T11:35:00').toISOString(),
    },
  ],
};

// Mock Analytics Data
export const mockAnalytics = {
  totalTickets: 45,
  openTickets: 12,
  inProgressTickets: 8,
  resolvedTickets: 25,
  avgResolutionTime: '4.5h',
  ticketsByCategory: [
    { name: 'it-support', count: 25, percentage: 56 },
    { name: 'hr', count: 8, percentage: 18 },
    { name: 'facilities', count: 6, percentage: 13 },
    { name: 'finance', count: 4, percentage: 9 },
    { name: 'other', count: 2, percentage: 4 },
  ],
  ticketTrends: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    open: [5, 8, 6, 10, 7, 4, 12],
    inProgress: [3, 5, 4, 6, 5, 3, 8],
    resolved: [10, 12, 15, 14, 18, 16, 25],
  },
  categoryStats: [
    { name: 'IT Support', count: 25 },
    { name: 'HR', count: 8 },
    { name: 'Facilities', count: 6 },
    { name: 'Finance', count: 4 },
    { name: 'Other', count: 2 },
  ],
  agentPerformance: [
    { name: 'John Agent', resolved: 15, avgTime: 4 },
    { name: 'Jane Manager', resolved: 10, avgTime: 6 },
  ],
  mttr: '4.5h',
  slaCompliance: 92,
};

// Mock API Functions
export const mockAPI = {
  // Auth
  login: async (credentials) => {
    await delay();
    const user = mockUsers.find(u => u.email === credentials.email);
    
    if (!user) {
      throw new Error('Invalid credentials');
    }
    
    return {
      user,
      token: 'mock-jwt-token-' + Date.now(),
    };
  },

  // Tickets
  getTickets: async () => {
    await delay();
    return { tickets: mockTickets };
  },

  getTicketById: async (id) => {
    await delay();
    const ticket = mockTickets.find(t => t.id === id);
    if (!ticket) throw new Error('Ticket not found');
    return ticket;
  },

  createTicket: async (data) => {
    await delay();
    const newTicket = {
      id: String(++ticketIdCounter),
      ticketNumber: `TKT-${String(ticketIdCounter).padStart(6, '0')}`,
      ...data,
      status: 'open',
      createdBy: mockUsers[0],
      assignedTo: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      attachments: [],
      history: [{
        id: '1',
        description: 'Ticket created',
        createdAt: new Date().toISOString(),
      }],
    };
    mockTickets.unshift(newTicket);
    return { ticket: newTicket };
  },

  updateTicket: async (id, updates) => {
    await delay();
    const index = mockTickets.findIndex(t => t.id === id);
    if (index === -1) throw new Error('Ticket not found');
    
    mockTickets[index] = {
      ...mockTickets[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    
    return { ticket: mockTickets[index] };
  },

  // Comments
  getComments: async (ticketId) => {
    await delay();
    return mockComments[ticketId] || [];
  },

  addComment: async (ticketId, comment) => {
    await delay();
    const newComment = {
      id: String(Date.now()),
      ...comment,
      author: mockUsers[0],
      createdAt: new Date().toISOString(),
    };
    
    if (!mockComments[ticketId]) {
      mockComments[ticketId] = [];
    }
    mockComments[ticketId].push(newComment);
    
    return newComment;
  },

  // Users
  getUsers: async () => {
    await delay();
    return { users: mockUsers };
  },

  getUserById: async (id) => {
    await delay();
    const user = mockUsers.find(u => u.id === id);
    if (!user) throw new Error('User not found');
    return user;
  },

  getProfile: async () => {
    await delay();
    return mockUsers[0]; // Return admin user as current user
  },

  updateProfile: async (data) => {
    await delay();
    const user = { ...mockUsers[0], ...data };
    return { user };
  },

  createUser: async (data) => {
    await delay();
    const newUser = {
      id: String(mockUsers.length + 1),
      ...data,
      status: 'active',
      createdAt: new Date().toISOString(),
    };
    mockUsers.push(newUser);
    return { user: newUser };
  },

  updateUser: async (id, data) => {
    await delay();
    const index = mockUsers.findIndex(u => u.id === id);
    if (index === -1) throw new Error('User not found');
    
    mockUsers[index] = { ...mockUsers[index], ...data };
    return { user: mockUsers[index] };
  },

  deleteUser: async (id) => {
    await delay();
    const index = mockUsers.findIndex(u => u.id === id);
    if (index === -1) throw new Error('User not found');
    
    mockUsers.splice(index, 1);
    return { success: true };
  },

  // Analytics
  getDashboardStats: async () => {
    await delay();
    return mockAnalytics;
  },

  getTicketStats: async () => {
    await delay();
    return mockAnalytics;
  },
};
