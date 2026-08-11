/**
 * Form validation utilities
 */

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {Object} { isValid, message }
 */
export const validatePassword = (password) => {
  if (!password) return { isValid: false, message: 'Password is required' }
  if (password.length < 8) return { isValid: false, message: 'Password must be at least 8 characters' }
  if (!/[A-Z]/.test(password)) return { isValid: false, message: 'Password must contain uppercase letter' }
  if (!/[a-z]/.test(password)) return { isValid: false, message: 'Password must contain lowercase letter' }
  if (!/[0-9]/.test(password)) return { isValid: false, message: 'Password must contain number' }
  return { isValid: true, message: '' }
}

/**
 * Validate full name
 * @param {string} name - Name to validate
 * @returns {boolean} True if valid
 */
export const validateName = (name) => {
  return name && name.trim().length >= 2
}
