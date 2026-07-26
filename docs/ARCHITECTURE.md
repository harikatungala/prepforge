# 🏗️ PrepForge Architecture

## System Overview

PrepForge follows a **three-tier architecture** with clear separation of concerns:

```
┌─────────────────────────────────────────────┐
│     PRESENTATION LAYER (Frontend)           │
│  ┌───────────────────────────────────────┐  │
│  │  React Components                     │  │
│  │  - Pages, Forms, Charts               │  │
│  │  - State Management (React Hooks)     │  │
│  │  - Styling (Tailwind CSS)             │  │
│  └───────────────────────────────────────┘  │
│            ↓ HTTP/REST ↓                    │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│     APPLICATION LAYER (Backend)             │
│  ┌───────────────────────────────────────┐  │
│  │  FastAPI                              │  │
│  │  - Endpoints (/api/...)               │  │
│  │  - Business Logic                     │  │
│  │  - Authentication (JWT)               │  │
│  │  - Data Validation (Pydantic)         │  │
│  │  - AI Integration (OpenAI)            │  │
│  └───────────────────────────────────────┘  │
│            ↓ SQL ↓                          │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│     DATA LAYER (Database)                   │
│  ┌───────────────────────────────────────┐  │
│  │  PostgreSQL                           │  │
│  │  - Users Table                        │  │
│  │  - Resumes Table                      │  │
│  │  - Interview Sessions Table           │  │
│  │  - Feedback Table                     │  │
│  └───────────────────────────────────────┘  │
└─────────────────────────────────────────────┘
```

---

## Communication Flow

### User Authentication Flow

```
1. User enters credentials
   ↓
2. Frontend sends POST /api/auth/login
   ↓
3. Backend validates credentials
   ↓
4. Backend generates JWT token
   ↓
5. Frontend stores JWT in localStorage
   ↓
6. Future requests include JWT in Authorization header
   ↓
7. Backend validates JWT for protected routes
```

### Resume Upload Flow

```
1. User selects resume file
   ↓
2. Frontend sends multipart/form-data to POST /api/resume/upload
   ↓
3. Backend receives and validates file
   ↓
4. Backend stores file in storage
   ↓
5. Backend extracts text from resume
   ↓
6. Backend sends text to OpenAI API
   ↓
7. Backend receives AI analysis
   ↓
8. Backend stores analysis in database
   ↓
9. Backend returns results to frontend
   ↓
10. Frontend displays results to user
```

---

## Technology Decisions

### Why React?
- **Component-based** - Reusable UI pieces
- **Virtual DOM** - Efficient rendering
- **Large ecosystem** - Many libraries available
- **Popular** - Easy to find tutorials and help

### Why FastAPI?
- **Fast** - One of the fastest Python frameworks
- **Modern** - Built on top of Python 3.7+ features
- **Auto-documentation** - Built-in Swagger UI
- **Easy to learn** - Less boilerplate than Django
- **Type hints** - Better code clarity

### Why PostgreSQL?
- **Reliable** - ACID compliance
- **Powerful** - Advanced features (JSON, arrays, etc)
- **Open source** - Free and community-supported
- **Industry standard** - Used by many companies

### Why Tailwind CSS?
- **Utility-first** - Faster development
- **Small bundle** - Only includes used styles
- **Responsive** - Mobile-first approach
- **Customizable** - Easily theme the app

---

## API Design

### RESTful Principles

PrepForge follows REST conventions:

```
GET    /api/users/:id          - Retrieve user
POST   /api/users              - Create user
PUT    /api/users/:id          - Update user
DELETE /api/users/:id          - Delete user

GET    /api/resumes            - List resumes
POST   /api/resumes            - Upload resume
GET    /api/resumes/:id        - Get resume
DELETE /api/resumes/:id        - Delete resume

POST   /api/interviews/start   - Start interview
POST   /api/interviews/:id/answer - Submit answer
GET    /api/interviews/:id     - Get interview
```

### Response Format

All API responses follow a consistent format:

```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "John Doe"
  },
  "message": "User retrieved successfully"
}
```

Error Response:
```json
{
  "success": false,
  "error": "Invalid credentials",
  "code": "AUTH_FAILED"
}
```

---

## Security Architecture

### Authentication
- **JWT Tokens** - Stateless authentication
- **Password Hashing** - bcrypt for secure storage
- **Refresh Tokens** - Token rotation for security

### Authorization
- **Role-based Access Control** - Users can only access their own data
- **Protected Routes** - Frontend routes require authentication
- **Protected Endpoints** - Backend validates JWT on protected routes

### Data Protection
- **Environment Variables** - Secrets not in code
- **.gitignore** - Sensitive files not committed
- **HTTPS** - Encrypted communication (production)

---

## Database Schema Overview

### Users Table
```sql
users
├── id (Primary Key)
├── email (Unique)
├── password_hash
├── name
├── created_at
└── updated_at
```

### Resumes Table
```sql
resumes
├── id (Primary Key)
├── user_id (Foreign Key → users)
├── filename
├── file_path
├── extracted_text
├── ats_score
├── created_at
└── updated_at
```

### Interview Sessions Table
```sql
interview_sessions
├── id (Primary Key)
├── user_id (Foreign Key → users)
├── status (ongoing/completed)
├── score
├── created_at
└── updated_at
```

---

## Deployment Architecture

### Frontend Deployment (Vercel)
- Automatic deployment on git push
- CDN for fast global delivery
- SSL/HTTPS included

### Backend Deployment (Render/Railway)
- Docker containerization
- Environment variables stored securely
- Auto-scaling if needed

### Database Deployment
- Managed PostgreSQL service
- Automated backups
- Connection pooling for efficiency

---

## Error Handling

### Frontend Error Handling
```javascript
try {
  const response = await api.get('/users/me');
  setUser(response.data);
} catch (error) {
  if (error.response.status === 401) {
    // Redirect to login
  } else {
    // Show error message
  }
}
```

### Backend Error Handling
```python
@app.get("/users/{user_id}")
async def get_user(user_id: int):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user
```

---

## Performance Considerations

### Frontend Optimization
- Code splitting for faster initial load
- Lazy loading for images
- Caching API responses
- Minification and compression

### Backend Optimization
- Database indexing on frequently queried columns
- Query optimization (avoid N+1 queries)
- Caching with Redis (future phase)
- Rate limiting to prevent abuse

### Database Optimization
- Proper indexes on foreign keys
- Connection pooling
- Query optimization
- Regular backups

---

## Scalability

### Horizontal Scaling
- Stateless backend allows multiple instances
- Load balancing distributes traffic
- Database replication for read scaling

### Vertical Scaling
- Upgrade server resources if needed
- Database optimization
- Caching layer

---

## Monitoring & Logging

### What We Monitor
- API response times
- Error rates
- Database query performance
- User activity (anonymized)

### Logging Strategy
- All API requests logged
- Error stack traces captured
- Database queries logged (development)
- User actions tracked (for analytics)

---

## Future Enhancements

- **WebSockets** - Real-time notifications
- **Redis** - Caching layer
- **Message Queue** - Async job processing
- **Elasticsearch** - Advanced search
- **Analytics** - User behavior tracking
