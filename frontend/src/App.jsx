import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-50">
      <header className="bg-white shadow">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-primary-600">PrepForge</h1>
            <div className="space-x-4">
              <button className="px-4 py-2 text-gray-700 hover:text-primary-600">
                Sign In
              </button>
              <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                Get Started
              </button>
            </div>
          </div>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            Welcome to PrepForge
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            AI-Powered Interview Preparation Platform
          </p>
          <button className="px-8 py-3 bg-primary-600 text-white text-lg font-semibold rounded-lg hover:bg-primary-700">
            Start Preparing Now
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white p-8 rounded-lg shadow">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">📄 Resume Analysis</h3>
            <p className="text-gray-600">
              Get AI-powered feedback on your resume with ATS scores and improvement suggestions.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">🎤 Mock Interviews</h3>
            <p className="text-gray-600">
              Practice with AI-powered HR interviews and get real-time feedback on your responses.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">📊 Progress Tracking</h3>
            <p className="text-gray-600">
              Track your preparation journey with detailed analytics and achievement badges.
            </p>
          </div>
        </div>
      </main>

      <footer className="bg-gray-900 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-center text-gray-400">
            © 2026 PrepForge. Built with React, FastAPI, and AI.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
