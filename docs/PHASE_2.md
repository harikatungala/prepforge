# 🎯 Phase 2: User Authentication

## Overview

Phase 2 implements complete user authentication including:
- User registration and login
- JWT token management
- Protected routes
- Form validation
- API integration

## ✅ Completed Features

### Frontend

#### Components
- **Button.jsx** - Reusable button with variants (primary, secondary, danger)
- **Input.jsx** - Form input with validation and error handling
- **Card.jsx** - Reusable card container
- **ProtectedRoute.jsx** - Route protection for authenticated users

#### Pages
- **LoginPage.jsx** - User login form with validation
- **SignupPage.jsx** - User registration form with auto-login
- **DashboardPage.jsx** - Protected user dashboard

#### Utilities
- **auth.js** - Authentication utilities (token/user management)
- **validation.js** - Form validation functions
- **api.js** - Axios API client with interceptors

#### Routing
- **AppRouter.jsx** - Router configuration with all routes
- **Root.jsx** - Root component wrapper
- Protected route implementation
- Auto-redirect on 401 errors

### Backend

#### Routes
- **POST /api/auth/register** - User registration
- **POST /api/auth/login** - User login with JWT
- **POST /api/auth/refresh** - Token refresh (placeholder)
- **GET /api/users/me** - Get current user profile (protected)
- **GET /api/users/{user_id}** - Get user by ID
- **PATCH /api/users/me** - Update user profile (protected)
- **DELETE /api/users/me** - Delete user account (protected)
- **GET /api/health** - Health check
- **GET /api/health/ready** - Readiness check

#### Security
- JWT token generation and validation
- Bcrypt password hashing
- Bearer token authentication
- Token expiration handling
- CORS configuration

#### Models & Schemas
- Enhanced User model with timestamps
- Pydantic schemas for validation
- User response schemas (without password)

## 🚀 Getting Started

### Frontend Setup

```bash
cd frontend
npm install

# Create .env file
cp .env.example .env

# Start development server
npm run dev
```

Visit: http://localhost:5173

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

pip install -r requirements.txt

# Create .env file
cp .env.example .env

# Update .env with your PostgreSQL credentials
# Then run:

uvicorn app.main:app --reload
```

Visit: http://localhost:8000/docs

## 📝 Testing the Authentication

### 1. Register a new user

**Frontend:**
1. Visit http://localhost:5173/signup
2. Fill in email, name, and password
3. Click "Sign Up"

**Backend (using curl):**
```bash
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "full_name": "John Doe",
    "password": "SecurePass123"
  }'
```

### 2. Login with credentials

**Frontend:**
1. Visit http://localhost:5173/login
2. Enter email and password
3. Click "Sign In"
4. Redirected to dashboard

**Backend (using curl):**
```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "SecurePass123"
  }'
```

### 3. Access protected route

**Get current user (requires token):**
```bash
TOKEN="your_jwt_token_here"

curl http://localhost:8000/api/users/me \
  -H "Authorization: Bearer $TOKEN"
```

## 🔐 Authentication Flow

```
┌─────────────┐
│   Frontend  │
└──────┬──────┘
       │ 1. POST /api/auth/login
       ├─────────────────────────────────┐
       │                                 │
       ▼                                 ▼
    ┌────────────────────────────────┐
    │  Backend (FastAPI)             │
    │  ✓ Verify credentials          │
    │  ✓ Generate JWT token          │
    │  ✓ Return token + user data    │
    └────────────────────────────────┘
       │
       │ 2. JWT token + user data
       ▼
    ┌────────────────────────────────┐
    │  localStorage (Frontend)       │
    │  ✓ Save token                  │
    │  ✓ Save user data              │
    └────────────────────────────────┘
       │
       │ 3. Redirect to /dashboard
       ▼
    ┌────────────────────────────────┐
    │  ProtectedRoute Component      │
    │  ✓ Check if token exists       │
    │  ✓ Allow/deny access           │
    └────────────────────────────────┘
       │
       │ 4. API requests with token
       ├─────────────────────────────────┐
       │                                 │
       ▼                                 ▼
    ┌────────────────────────────────┐
    │  Axios Interceptor             │
    │  ✓ Add Authorization header    │
    │  ✓ Send: Bearer <token>        │
    └────────────────────────────────┘
       │
       │
       ▼
    ┌────────────────────────────────┐
    │  Backend Route Handler         │
    │  ✓ Extract token from header   │
    │  ✓ Validate token              │
    │  ✓ Get user from token         │
    │  ✓ Return protected data       │
    └────────────────────────────────┘
```

## 📊 Database Schema

### Users Table

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR UNIQUE NOT NULL,
    full_name VARCHAR,
    hashed_password VARCHAR NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIMEZONE,
    updated_at TIMESTAMP WITH TIMEZONE
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_is_active ON users(is_active);
```

## 🔑 Environment Variables

### Frontend (.env)
```
VITE_API_URL=http://localhost:8000
```

### Backend (.env)
```
DATABASE_URL=postgresql://user:password@localhost:5432/prepforge
SECRET_KEY=your-secret-key-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
FRONTEND_URL=http://localhost:5173
OPENAI_API_KEY=your-openai-key
ENVIRONMENT=development
DEBUG=True
```

## 🛠️ Common Tasks

### Reset Database

```bash
# Connect to PostgreSQL
psql -U postgres

# Drop database
DROP DATABASE prepforge;

# Recreate database
CREATE DATABASE prepforge;
```

Then restart the backend to recreate tables.

### Clear Authentication

**Frontend (Browser Console):**
```javascript
localStorage.removeItem('token')
localStorage.removeItem('user')
```

### Test Protected Endpoints

Use Swagger UI: http://localhost:8000/docs
- Click "Authorize" button
- Enter token: `Bearer <your_token>`
- Try protected endpoints

## 📚 API Documentation

**Swagger UI:** http://localhost:8000/docs
**ReDoc:** http://localhost:8000/redoc

## ✅ Phase 2 Checklist

- [x] User registration endpoint
- [x] User login endpoint
- [x] JWT token generation
- [x] Password hashing (bcrypt)
- [x] Token validation
- [x] Login form component
- [x] Signup form component
- [x] Form validation
- [x] Protected routes
- [x] Token storage
- [x] API client with interceptors
- [x] Dashboard page
- [x] Logout functionality
- [x] Comprehensive documentation

## 🎯 Next Steps (Phase 3)

- Resume upload and parsing
- Resume analysis with AI
- ATS score calculation
- Resume improvement suggestions
- User resume management

---

**Questions?** Check individual README files in:
- `frontend/src/components/README.md`
- `frontend/src/pages/README.md`
- `frontend/src/utils/README.md`
- `frontend/src/api/README.md`
- `backend/README.md`
