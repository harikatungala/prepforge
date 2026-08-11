# Frontend Utilities

Helper functions and utilities for the frontend.

## Authentication (`auth.js`)

Utilities for managing authentication state:

- `getToken()` - Get stored JWT token
- `getUser()` - Get stored user data
- `saveAuthData(token, user)` - Save token and user
- `clearAuthData()` - Clear all auth data
- `isAuthenticated()` - Check if user is logged in
- `decodeToken(token)` - Decode JWT without verification
- `isTokenExpired(token)` - Check if token is expired

## Validation (`validation.js`)

Form validation utilities:

- `validateEmail(email)` - Validate email format
- `validatePassword(password)` - Validate password strength
- `validateName(name)` - Validate full name

## Usage

```javascript
import { isAuthenticated, getUser } from './utils/auth'
import { validateEmail } from './utils/validation'

if (isAuthenticated()) {
  const user = getUser()
  console.log(user.email)
}

if (validateEmail('test@example.com')) {
  // Valid email
}
```
