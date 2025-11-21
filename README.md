# TIMS - Ticketing and Issue Management System

## Frontend Application

A modern, enterprise-grade React.js frontend for the Ticketing and Issue Management System (TIMS), designed for multinational corporations.

## Features

- **Authentication & Authorization**
  - Standard login and SSO integration
  - Role-based access control (User, Agent, Manager, Admin)
  - Secure token-based authentication

- **Ticket Management**
  - Create, view, update, and delete tickets
  - Advanced filtering and search
  - Real-time status tracking
  - Comment system with attachments
  - Priority and category management
  - Ticket assignment workflow

- **Dashboard & Analytics**
  - Comprehensive KPI metrics
  - Real-time statistics
  - Interactive charts and visualizations
  - Performance tracking (MTTR, SLA compliance)
  - Agent performance reports

- **User Management**
  - User CRUD operations (Admin only)
  - Role and permission management
  - Department assignment
  - Profile management

- **Multi-language Support**
  - i18n integration
  - Support for multiple languages
  - Easy language switching

- **Responsive Design**
  - Mobile-first approach
  - Tablet and desktop optimized
  - Modern UI with Tailwind CSS

## Technology Stack

- **React 18.2** - UI library
- **Vite** - Build tool and dev server
- **React Router v6** - Client-side routing
- **Zustand** - State management
- **React Query** - Server state management
- **Axios** - HTTP client
- **React Hook Form** - Form management
- **Tailwind CSS** - Utility-first CSS framework
- **Headless UI** - Accessible UI components
- **Chart.js** - Data visualization
- **i18next** - Internationalization
- **React Toastify** - Notifications

## Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd tims
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Configure environment variables in `.env`:
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_SSO_ENABLED=true
VITE_SSO_PROVIDER_URL=https://sso.company.com
VITE_APP_NAME=TIMS
VITE_DEFAULT_LANGUAGE=en
```

5. Start development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Common/         # Common UI components
│   ├── Layout/         # Layout components (Header, Sidebar, etc.)
│   ├── Tickets/        # Ticket-related components
│   ├── Dashboard/      # Dashboard components
│   └── Admin/          # Admin components
├── pages/              # Page components
│   ├── Auth/           # Authentication pages
│   ├── Dashboard/      # Dashboard page
│   ├── Tickets/        # Ticket pages
│   ├── User/           # User profile pages
│   ├── Admin/          # Admin pages
│   ├── Analytics/      # Analytics pages
│   ├── Settings/       # Settings pages
│   └── KnowledgeBase/  # Knowledge base pages
├── services/           # API service layer
│   ├── api.js          # Axios instance and interceptors
│   ├── authService.js  # Authentication services
│   ├── ticketService.js # Ticket services
│   ├── userService.js  # User services
│   └── analyticsService.js # Analytics services
├── store/              # State management
│   ├── authStore.js    # Authentication state
│   └── ticketStore.js  # Ticket state
├── utils/              # Utility functions
│   ├── constants.js    # App constants
│   └── helpers.js      # Helper functions
├── App.jsx             # Main app component
├── main.jsx            # Entry point
├── i18n.js             # Internationalization config
└── index.css           # Global styles
```

## Key Features Explained

### Authentication Flow
- Users can log in using email/password or SSO
- JWT tokens are stored securely
- Automatic token refresh
- Protected routes based on authentication status
- Role-based access control

### Ticket Management
- Multi-step ticket creation form
- File attachments support
- Real-time status updates
- Comment system with mentions
- Activity timeline
- Advanced filtering options

### State Management
- **Zustand** for client state (auth, tickets)
- **React Query** for server state (caching, refetching)
- Persistent storage for authentication

### API Integration
- Centralized API client with interceptors
- Automatic token injection
- Error handling and notifications
- Request/response transformation

## Development Guidelines

### Code Style
- Use functional components with hooks
- Follow React best practices
- Use Tailwind CSS utility classes
- Keep components small and focused
- Write descriptive prop types

### Naming Conventions
- Components: PascalCase (e.g., `TicketCard.jsx`)
- Files: camelCase for utilities (e.g., `helpers.js`)
- CSS classes: Follow Tailwind conventions
- Functions: camelCase (e.g., `handleSubmit`)

### State Management
- Use Zustand for global app state
- Use React Query for server data
- Use local state for UI-only state
- Avoid prop drilling

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimization

- Code splitting with React lazy loading
- Image optimization
- Caching with React Query
- Memoization where appropriate
- Virtual scrolling for large lists

## Security Considerations

- XSS protection
- CSRF token handling
- Secure token storage
- Input validation
- API request authentication
- Role-based access control

## Deployment

### Environment Variables
Set the following environment variables for production:

```env
VITE_API_BASE_URL=https://api.production.com/api
VITE_SSO_ENABLED=true
VITE_SSO_PROVIDER_URL=https://sso.production.com
```

### Build and Deploy
```bash
npm run build
```

Deploy the `dist` folder to your web server or CDN.

## Contributing

1. Create a feature branch
2. Make your changes
3. Write/update tests
4. Submit a pull request

## License

Copyright © 2025 - All rights reserved

## Support

For support, email support@tims.com or open an issue in the repository.
