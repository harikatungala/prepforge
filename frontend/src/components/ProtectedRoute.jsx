import { Navigate } from 'react-router-dom'
import { isAuthenticated } from '../utils/auth'

/**
 * Protected Route Component
 * Redirects to login if user is not authenticated
 */
export function ProtectedRoute({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />
  }

  return children
}
