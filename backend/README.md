# TIMS Backend API

Node.js + Express + MongoDB backend for the Ticketing and Issue Management System.

## Features

- ✅ User authentication & authorization (JWT)
- ✅ Role-based access control (User, Agent, Manager, Admin)
- ✅ Complete ticket CRUD operations
- ✅ Comments & attachments
- ✅ Ticket assignment & status tracking
- ✅ Analytics & reporting
- ✅ RESTful API design
- ✅ Error handling & validation
- ✅ Security best practices

## Prerequisites

- Node.js 16.x or higher
- MongoDB 5.x or higher

## Installation

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Configure environment variables in `.env`:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/tims
JWT_SECRET=your-secret-key
CORS_ORIGIN=http://localhost:3000
```

5. Seed the database with sample data:
```bash
npm run seed
```

6. Start the server:
```bash
npm run dev
```

The API will be available at `http://localhost:5000`

## Default Users

After seeding, you can login with:

- **Admin**: `admin@company.com` / `password123`
- **Agent**: `agent@company.com` / `password123`
- **Manager**: `manager@company.com` / `password123`
- **User**: `user@company.com` / `password123`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout user

### Users
- `GET /api/users` - Get all users (Admin/Manager)
- `GET /api/users/:id` - Get user by ID
- `GET /api/users/profile` - Get current user profile
- `PUT /api/users/profile` - Update current user profile
- `POST /api/users` - Create user (Admin)
- `PUT /api/users/:id` - Update user (Admin)
- `DELETE /api/users/:id` - Delete user (Admin)

### Tickets
- `GET /api/tickets` - Get all tickets
- `POST /api/tickets` - Create ticket
- `GET /api/tickets/:id` - Get ticket by ID
- `PUT /api/tickets/:id` - Update ticket
- `DELETE /api/tickets/:id` - Delete ticket (Admin)
- `GET /api/tickets/my-tickets` - Get user's tickets
- `GET /api/tickets/assigned` - Get assigned tickets
- `POST /api/tickets/:id/assign` - Assign ticket
- `PATCH /api/tickets/:id/status` - Update status
- `PATCH /api/tickets/:id/priority` - Update priority
- `GET /api/tickets/:id/comments` - Get comments
- `POST /api/tickets/:id/comments` - Add comment

### Analytics
- `GET /api/analytics/dashboard` - Dashboard stats
- `GET /api/analytics/tickets` - Ticket stats (Manager/Admin)
- `GET /api/analytics/agents` - Agent performance (Manager/Admin)
- `GET /api/analytics/categories` - Category stats (Manager/Admin)

## Project Structure

```
backend/
├── controllers/        # Route controllers
├── models/            # Mongoose models
├── routes/            # API routes
├── middleware/        # Custom middleware
├── scripts/           # Utility scripts
├── server.js          # Entry point
└── .env              # Environment variables
```

## Security Features

- Helmet.js for security headers
- Rate limiting
- CORS configuration
- JWT authentication
- Password hashing with bcrypt
- Input validation
- Error handling

## License

Copyright © 2025
aaluma doluma