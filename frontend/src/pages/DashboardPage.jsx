import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { getUser, clearAuthData } from '../utils/auth'

export function DashboardPage() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const userData = getUser()
    setUser(userData)
  }, [])

  const handleLogout = () => {
    clearAuthData()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-50">
      <header className="bg-white shadow">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-primary-600">PrepForge</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">{user?.full_name || user?.email}</span>
            <Button variant="secondary" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Card>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome to Your Dashboard
          </h2>
          <p className="text-gray-600 mb-6">
            You are logged in as <strong>{user?.email}</strong>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <Card className="bg-blue-50 border border-blue-200">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Resume Analysis</h3>
              <p className="text-gray-600">Coming soon...</p>
            </Card>
            <Card className="bg-purple-50 border border-purple-200">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Mock Interviews</h3>
              <p className="text-gray-600">Coming soon...</p>
            </Card>
            <Card className="bg-green-50 border border-green-200">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Progress Analytics</h3>
              <p className="text-gray-600">Coming soon...</p>
            </Card>
          </div>
        </Card>
      </main>
    </div>
  )
}
