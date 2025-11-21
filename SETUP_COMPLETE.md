# 🎉 TIMS Backend - Setup Complete!

Your Node.js + MongoDB backend for TIMS is now running!

## ✅ What's Been Created

### Backend Structure
```
backend/
├── controllers/           # Business logic
│   ├── auth.controller.js        - Authentication (login, register)
│   ├── user.controller.js        - User management
│   ├── ticket.controller.js      - Ticket operations
│   └── analytics.controller.js   - Analytics & reports
│
├── models/               # Database schemas
│   ├── User.model.js             - User schema with bcrypt hashing
│   └── Ticket.model.js           - Ticket schema with auto-numbering
│
├── routes/               # API routes
│   ├── auth.routes.js            - /api/auth/*
│   ├── user.routes.js            - /api/users/*
│   ├── ticket.routes.js          - /api/tickets/*
│   └── analytics.routes.js       - /api/analytics/*
│
├── middleware/           # Custom middleware
│   ├── auth.middleware.js        - JWT verification & role checking
│   └── error.middleware.js       - Centralized error handling
│
├── scripts/
│   └── seed.js                   - Database seeding script
│
├── uploads/              # File uploads directory
├── server.js             # Main entry point
├── package.json          # Dependencies
├── .env                  # Environment configuration
└── README.md            # Documentation
```

## 🚀 Current Status

✅ Backend server running on: **http://localhost:5000**
✅ Frontend running on: **http://localhost:3000**
✅ Database seeded with sample data
✅ MongoDB connected
✅ All API endpoints active

## 👥 Test Accounts

Login at http://localhost:3000 with:

| Role    | Email                  | Password    |
|---------|------------------------|-------------|
| Admin   | admin@company.com      | password123 |
| Agent   | agent@company.com      | password123 |
| Manager | manager@company.com    | password123 |
| User    | user@company.com       | password123 |

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout

### Tickets
- `GET /api/tickets` - List all tickets (with filters)
- `POST /api/tickets` - Create ticket
- `GET /api/tickets/:id` - Get ticket details
- `PUT /api/tickets/:id` - Update ticket
- `DELETE /api/tickets/:id` - Delete ticket (Admin only)
- `GET /api/tickets/my-tickets` - My tickets
- `GET /api/tickets/assigned` - Assigned tickets (Agent+)
- `POST /api/tickets/:id/assign` - Assign ticket (Agent+)
- `PATCH /api/tickets/:id/status` - Update status
- `PATCH /api/tickets/:id/priority` - Update priority (Agent+)
- `GET /api/tickets/:id/comments` - Get comments
- `POST /api/tickets/:id/comments` - Add comment

### Users
- `GET /api/users` - List users (Admin/Manager)
- `GET /api/users/:id` - Get user (Admin/Manager)
- `POST /api/users` - Create user (Admin)
- `PUT /api/users/:id` - Update user (Admin)
- `DELETE /api/users/:id` - Delete user (Admin)
- `GET /api/users/profile` - Get own profile
- `PUT /api/users/profile` - Update own profile

### Analytics
- `GET /api/analytics/dashboard` - Dashboard stats
- `GET /api/analytics/tickets` - Ticket stats (Manager+)
- `GET /api/analytics/agents` - Agent performance (Manager+)
- `GET /api/analytics/categories` - Category stats (Manager+)

## 🔐 Security Features

✅ JWT authentication with bcrypt password hashing
✅ Role-based authorization
✅ Helmet.js security headers
✅ CORS configuration
✅ Rate limiting (100 req/15min per IP)
✅ Input validation with express-validator
✅ MongoDB injection protection

## 🛠️ Testing the API

### Using the Frontend
1. Go to http://localhost:3000
2. Login with any test account
3. Use the UI to test all features

### Using curl
```bash
# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@company.com","password":"password123"}'

# Get tickets (use token from login)
curl http://localhost:5000/api/tickets \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"

# Health check
curl http://localhost:5000/health
```

### Using Postman
Import this collection:
- Base URL: `http://localhost:5000/api`
- Add Authorization header: `Bearer YOUR_TOKEN`

## 📊 Sample Data

The database includes:
- **4 Users**: 1 Admin, 1 Agent, 1 Manager, 1 User
- **5 Tickets**: Various statuses and priorities
- **Categories**: IT Support, HR, Facilities, Finance, Security, Operations

## 🎯 Next Steps

1. **Test the Application**
   - Login with different roles
   - Create tickets
   - Update statuses
   - Add comments
   - View analytics

2. **Customize**
   - Modify models in `backend/models/`
   - Add new endpoints in `backend/routes/`
   - Configure email in `.env` (optional)
   - Enable SSO in `.env` (optional)

3. **Deploy**
   - Set NODE_ENV=production
   - Use MongoDB Atlas for cloud database
   - Deploy backend to Heroku/Railway/AWS
   - Deploy frontend to Vercel/Netlify

## 📝 Environment Variables

Backend `.env`:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/tims
JWT_SECRET=tims-secret-key-2025-change-in-production
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:3000
```

Frontend `.env`:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## 🔄 Development Workflow

```bash
# Terminal 1 - Backend
cd backend
npm run dev    # Auto-restarts on file changes

# Terminal 2 - Frontend  
npm run dev    # Hot reload enabled

# Terminal 3 - MongoDB (if not running as service)
mongod

# Reset database
cd backend
npm run seed
```

## 🐛 Common Issues

**Port 5000 already in use:**
```bash
# Change PORT in backend/.env
PORT=5001
# Update VITE_API_BASE_URL in frontend .env
```

**MongoDB connection error:**
```bash
# Start MongoDB
mongod
# Or check if running:
mongosh
```

**CORS errors:**
- Check CORS_ORIGIN in backend/.env matches frontend URL

## 📚 Documentation

- Backend README: `backend/README.md`
- Frontend README: `README.md`
- API docs: Available endpoints listed above

## 🎊 Success!

Both frontend and backend are now fully integrated and running!

**Frontend:** http://localhost:3000
**Backend:** http://localhost:5000
**Health Check:** http://localhost:5000/health

Happy coding! 🚀
