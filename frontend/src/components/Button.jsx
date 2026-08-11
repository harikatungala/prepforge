/**
 * Reusable Button Component
 * @param {string} children - Button text
 * @param {string} variant - 'primary' | 'secondary' | 'danger'
 * @param {boolean} disabled - Disable button
 * @param {function} onClick - Click handler
 * @param {string} className - Additional classes
 */
export function Button({
  children,
  variant = 'primary',
  disabled = false,
  onClick,
  className = '',
  type = 'button',
  ...props
}) {
  const baseStyles = 'px-4 py-2 rounded-lg font-medium transition-colors duration-200'
  
  const variants = {
    primary: 'bg-sky-600 text-white hover:bg-sky-700 disabled:bg-gray-400',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 disabled:bg-gray-100',
    danger: 'bg-red-600 text-white hover:bg-red-700 disabled:bg-gray-400',
  }
  
  const variantStyle = variants[variant] || variants.primary
  const finalClassName = `${baseStyles} ${variantStyle} ${className}`
  
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={finalClassName}
      {...props}
    >
      {children}
    </button>
  )
}
