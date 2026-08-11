/**
 * Reusable Card Component
 * @param {React.ReactNode} children - Card content
 * @param {string} className - Additional classes
 */
export function Card({ children, className = '', ...props }) {
  return (
    <div
      className={`bg-white rounded-lg shadow-md p-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
