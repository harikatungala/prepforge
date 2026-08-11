# Frontend API Client

This directory contains the API client configuration.

## Files

- `api.js` - Axios instance with interceptors for authentication and error handling

## Usage

```javascript
import api from './api/api'

// Make authenticated requests
const response = await api.get('/api/users/me')
const data = await api.post('/api/auth/login', { email, password })
```

## Features

- ✅ Automatic Bearer token injection
- ✅ Token refresh on 401 responses
- ✅ Centralized error handling
- ✅ Environment-based API URL
