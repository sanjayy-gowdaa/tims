import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.model.js';
import Ticket from '../models/Ticket.model.js';

dotenv.config();

const users = [
  {
    name: 'Admin User',
    email: 'admin@company.com',
    password: 'password123',
    role: 'admin',
    department: 'it',
    status: 'active',
  },
  {
    name: 'John Agent',
    email: 'agent@company.com',
    password: 'password123',
    role: 'agent',
    department: 'it',
    status: 'active',
  },
  {
    name: 'Jane Manager',
    email: 'manager@company.com',
    password: 'password123',
    role: 'manager',
    department: 'operations',
    status: 'active',
  },
  {
    name: 'Bob User',
    email: 'user@company.com',
    password: 'password123',
    role: 'user',
    department: 'sales',
    status: 'active',
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');

    // Clear existing data
    await User.deleteMany();
    await Ticket.deleteMany();
    console.log('🗑️  Cleared existing data');

    // Create users one by one to trigger pre-save hook for password hashing
    const createdUsers = [];
    for (const userData of users) {
      const user = await User.create(userData);
      createdUsers.push(user);
    }
    console.log('👥 Created users');

    // Create sample tickets
    const ticketData = [
      {
        title: 'Cannot access email account',
        description: 'I am unable to login to my email account. Getting "Invalid credentials" error.',
        status: 'open',
        priority: 'high',
        category: 'it-support',
        createdBy: createdUsers[3]._id,
        assignedTo: createdUsers[1]._id,
      },
      {
        title: 'Request for new laptop',
        description: 'My current laptop is 5 years old and running very slow.',
        status: 'in-progress',
        priority: 'medium',
        category: 'it-support',
        createdBy: createdUsers[3]._id,
        assignedTo: createdUsers[1]._id,
      },
      {
        title: 'VPN connection issues',
        description: 'VPN keeps disconnecting every 10 minutes when working from home.',
        status: 'resolved',
        priority: 'high',
        category: 'it-support',
        createdBy: createdUsers[2]._id,
        assignedTo: createdUsers[1]._id,
        resolvedAt: new Date(),
      },
      {
        title: 'Office AC not working',
        description: 'Air conditioning in office room 301 is not working.',
        status: 'open',
        priority: 'medium',
        category: 'facilities',
        createdBy: createdUsers[3]._id,
      },
      {
        title: 'Payroll inquiry',
        description: 'I have not received my November paycheck yet.',
        status: 'pending',
        priority: 'critical',
        category: 'hr',
        createdBy: createdUsers[3]._id,
        assignedTo: createdUsers[2]._id,
      },
    ];

    // Create tickets one by one to trigger pre-save hook
    for (const ticketInfo of ticketData) {
      await Ticket.create(ticketInfo);
    }
    console.log('🎫 Created tickets');

    console.log('✅ Database seeded successfully!');
    console.log('\n📧 Login credentials:');
    console.log('Admin: admin@company.com / password123');
    console.log('Agent: agent@company.com / password123');
    console.log('Manager: manager@company.com / password123');
    console.log('User: user@company.com / password123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
