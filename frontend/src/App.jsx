import { Routes, Route, Navigate } from 'react-router-dom'

import { useContext } from 'react'

import Dashboard from './pages/Daskboard'
import Login from './pages/Login'
import Register from './pages/Register'

import { AuthContext } from './context/AuthContext'

function App() {
  const { userData, loading } = useContext(AuthContext)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Checking authentication...</p>
      </div>
    )
  }

  return (
    <Routes>
      {/* Login */}
      <Route
        path="/login"
        element={userData ? <Navigate to="/dashboard" replace /> : <Login />}
      />

      {/* Register */}
      <Route
        path="/register"
        element={userData ? <Navigate to="/dashboard" replace /> : <Register />}
      />

      {/* Dashboard */}
      <Route
        path="/dashboard"
        element={userData ? <Dashboard /> : <Navigate to="/login" replace />}
      />

      {/* Other routes */}
      <Route
        path="*"
        element={<Navigate to={userData ? '/dashboard' : '/login'} replace />}
      />
    </Routes>
  )
}

export default App
