# API

This directory contains API-related utilities.

## Files

- `api.js` - Axios instance and interceptors
- `endpoints.js` - API endpoint definitions

## Usage

```javascript
import api from './api'

const getUser = async (userId) => {
  const response = await api.get(`/users/${userId}`)
  return response.data
}
```
