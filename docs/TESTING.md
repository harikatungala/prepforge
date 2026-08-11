# Testing Guide for PrepForge

## Prerequisites

- Node.js 16+ installed
- Python 3.8+ installed
- PostgreSQL running locally
- Git repository cloned

---

## 🧪 Backend Testing

### 1. Setup Backend Environment

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Linux/Mac:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### 2. Configure Database

```bash
# Create .env file
cp .env.example .env
```

**Edit `.env` with your PostgreSQL credentials:**
```
DATABASE_URL=postgresql://postgres:password@localhost:5432/prepforge
SECRET_KEY=dev-secret-key-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
FRONTEND_URL=http://localhost:5173
ENVIRONMENT=development
DEBUG=True
```

### 3. Create PostgreSQL Database

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE prepforge;

# Exit
\q
```

### 4. Start Backend Server

```bash
uvicorn app.main:app --reload
```

**Expected Output:**
```
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     Started server process [12345]
INFO:     Waiting for applications startup.
INFO:     Application startup complete.
```

### 5. Verify Backend is Running

**Visit:** http://localhost:8000/docs

✅ You should see Swagger UI with all API endpoints

**Test Health Check:**
```bash
curl http://localhost:8000/api/health
```

Expected Response:
```json
{
  "status": "healthy",
  "message": "PrepForge API is running"
}
```

---

## 🧪 Frontend Testing

### 1. Setup Frontend Environment

```bash
cd frontend

# Install dependencies
npm install
```

### 2. Configure Environment

```bash
# Create .env file
cp .env.example .env
```

**Verify `.env` content:**
```
VITE_API_URL=http://localhost:8000
```

### 3. Start Frontend Server

```bash
npm run dev
```

**Expected Output:**
```
  VITE v5.0.8  ready in 234 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

### 4. Verify Frontend is Running

**Visit:** http://localhost:5173

✅ You should see the PrepForge landing page with:
- Navigation header with "Sign In" and "Get Started" buttons
- Hero section
- 3 feature cards
- Footer

---

## 🔐 Full Authentication Flow Test

### Test 1: User Registration

**Via Frontend:**
1. Go to http://localhost:5173/signup
2. Fill in the form:
   - Full Name: `John Doe`
   - Email: `john@example.com`
   - Password: `SecurePass123!`
   - Confirm Password: `SecurePass123!`
3. Click "Sign Up"
4. ✅ Should redirect to `/dashboard`
5. ✅ Should see "Welcome to Your Dashboard"

**Via Backend (cURL):**
```bash
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jane@example.com",
    "full_name": "Jane Smith",
    "password": "SecurePass123!"
  }'
```

**Expected Response:**
```json
{
  "id": 1,
  "email": "jane@example.com",
  "full_name": "Jane Smith",
  "is_active": true,
  "created_at": "2026-08-11T17:50:00",
  "updated_at": "2026-08-11T17:50:00"
}
```

---

### Test 2: User Login

**Via Frontend:**
1. Go to http://localhost:5173 (home page)
2. Click "Sign In" button
3. Enter credentials:
   - Email: `john@example.com`
   - Password: `SecurePass123!`
4. Click "Sign In"
5. ✅ Should redirect to `/dashboard`
6. ✅ Should display user name and email

**Via Backend (cURL):**
```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123!"
  }'
```

**Expected Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "user": {
    "id": 1,
    "email": "john@example.com",
    "full_name": "John Doe",
    "is_active": true,
    "created_at": "2026-08-11T17:50:00",
    "updated_at": "2026-08-11T17:50:00"
  }
}
```

**Copy the `access_token` for next tests**

---

### Test 3: Get Current User (Protected Route)

**Via Frontend:**
1. Visit http://localhost:5173/dashboard
2. ✅ Should display logged-in user info
3. Should NOT show 401 error

**Via Backend (cURL):**
```bash
TOKEN="your_access_token_from_login"

curl http://localhost:8000/api/users/me \
  -H "Authorization: Bearer $TOKEN"
```

**Expected Response:**
```json
{
  "id": 1,
  "email": "john@example.com",
  "full_name": "John Doe",
  "is_active": true,
  "created_at": "2026-08-11T17:50:00",
  "updated_at": "2026-08-11T17:50:00"
}
```

---

### Test 4: Invalid Credentials

**Via Frontend:**
1. Go to http://localhost:5173/login
2. Enter wrong password
3. Click "Sign In"
4. ✅ Should show error: "Invalid credentials"

**Via Backend (cURL):**
```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "WrongPassword"
  }'
```

**Expected Response:**
```json
{
  "detail": "Invalid credentials"
}
```

---

### Test 5: Protected Route Without Token

**Via Frontend:**
1. Clear localStorage: Open DevTools → Console → Run:
   ```javascript
   localStorage.removeItem('token')
   localStorage.removeItem('user')
   ```
2. Visit http://localhost:5173/dashboard
3. ✅ Should redirect to `/login`

**Via Backend (cURL):**
```bash
curl http://localhost:8000/api/users/me
```

**Expected Response:**
```json
{
  "detail": "Not authenticated"
}
```

---

### Test 6: Logout

**Via Frontend:**
1. Visit http://localhost:5173/dashboard (while logged in)
2. Click "Logout" button
3. ✅ Should redirect to home page `/`
4. localStorage should be cleared

---

## 🔍 Testing with Swagger UI

**Visit:** http://localhost:8000/docs

### Steps:

1. **Click "Authorize" button** (top right)
2. **Enter your token:**
   ```
   Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
3. **Click "Authorize"**
4. **Now try endpoints:**
   - `POST /api/auth/register` - Register user
   - `POST /api/auth/login` - Login user
   - `GET /api/users/me` - Get current user (protected)
   - `PATCH /api/users/me` - Update current user (protected)

---

## 📝 Form Validation Tests

### Test Invalid Email

**Via Frontend (Signup/Login):**
1. Enter invalid email: `notanemail`
2. Click Submit
3. ✅ Should show error: "Invalid email format"

### Test Short Password

**Via Frontend (Signup):**
1. Enter password: `Pass1`
2. Click Submit
3. ✅ Should show error: "Password must be at least 8 characters"

### Test Password Mismatch

**Via Frontend (Signup):**
1. Password: `SecurePass123!`
2. Confirm Password: `DifferentPass123`
3. Click Submit
4. ✅ Should show error: "Passwords do not match"

---

## 🐛 Debugging

### Backend Issues

**Database connection error:**
```
psycopg2.OperationalError: could not connect to server
```
✅ Solution: Ensure PostgreSQL is running and credentials in `.env` are correct

**Module not found error:**
```
ModuleNotFoundError: No module named 'fastapi'
```
✅ Solution: Run `pip install -r requirements.txt`

### Frontend Issues

**API connection error:**
```
Network Error
```
✅ Solution: 
- Ensure backend is running at http://localhost:8000
- Check VITE_API_URL in `.env`
- Check browser console for CORS errors

**White screen:**
✅ Solution:
- Check browser console for JavaScript errors
- Ensure React Router is properly configured
- Check that `main.jsx` imports Root correctly

---

## ✅ Testing Checklist

### Backend
- [ ] PostgreSQL running
- [ ] Backend server starts without errors
- [ ] `/api/health` endpoint responds
- [ ] User registration works
- [ ] User login works
- [ ] JWT token generated and returned
- [ ] Protected routes require valid token
- [ ] Invalid credentials rejected
- [ ] Swagger UI accessible at `/docs`

### Frontend
- [ ] Frontend server starts
- [ ] Landing page loads
- [ ] Navigation buttons visible
- [ ] Signup form displays
- [ ] Login form displays
- [ ] Form validation works
- [ ] User registration successful
- [ ] User login successful
- [ ] Token stored in localStorage
- [ ] Dashboard page loads (protected)
- [ ] Logout clears token
- [ ] Unauthenticated user redirected to login

### Integration
- [ ] Frontend communicates with backend API
- [ ] Authentication flow works end-to-end
- [ ] Protected routes work correctly
- [ ] Token expiration handled
- [ ] CORS configured properly

---

## 📊 Performance Benchmarks

### Backend Response Times (ideal)
- `POST /api/auth/register`: < 500ms
- `POST /api/auth/login`: < 500ms
- `GET /api/users/me`: < 200ms

### Frontend Load Times (ideal)
- Initial page load: < 3s
- Route navigation: < 500ms

---

## 🎓 What You've Tested

✅ **Authentication System**
- User registration
- User login
- JWT token generation
- Token validation
- Password hashing
- Protected routes

✅ **Form Handling**
- Email validation
- Password strength validation
- Form submission
- Error display

✅ **API Integration**
- Backend API endpoints
- Request/response handling
- Error handling
- Token management

✅ **Frontend Routing**
- Public routes
- Protected routes
- Redirects
- Navigation

---

## 🆘 Need Help?

If you encounter issues:

1. **Check logs:**
   - Backend: Look at terminal output
   - Frontend: Check browser DevTools Console

2. **Verify configuration:**
   - `.env` files created and filled correctly
   - Database running
   - Ports not in use (8000, 5173)

3. **Clear cache:**
   - Frontend: `npm run dev` (Vite auto-clears)
   - Backend: Restart server
   - Browser: Hard refresh (Ctrl+Shift+R)

4. **Reset database:**
   ```bash
   # Drop database
   psql -U postgres -c "DROP DATABASE prepforge;"
   # Recreate
   psql -U postgres -c "CREATE DATABASE prepforge;"
   ```

5. **Reinstall dependencies:**
   ```bash
   # Frontend
   rm -rf node_modules package-lock.json
   npm install
   
   # Backend
   rm -rf venv
   python -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```

---

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [React Router Documentation](https://reactrouter.com)
- [FastAPI Documentation](https://fastapi.tiangolo.com)
- [PostgreSQL Documentation](https://www.postgresql.org/docs)
- [JWT Authentication](https://jwt.io)

---

**Congratulations on completing Phase 2! 🎉**

Now that you've tested the authentication system, you're ready for Phase 3: Resume Upload & Analysis.
