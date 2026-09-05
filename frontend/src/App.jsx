import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

import Auth from './pages/Auth'
import Dashboard from './pages/Daskboard'
import api from './api/axios'

function App() {
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)

  const getUserData = async () => {
    try {
      const response = await api.get('/auth/current-user')

      if (response.data.success) {
        setUserData(response.data.user)
      }
    } catch (error) {
      setUserData(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getUserData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Checking authentication...</p>
      </div>
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route
          path="/login"
          element={userData ? <Navigate to="/dashboard" replace /> : <Auth />}
        />

        {/* Signup */}
        <Route
          path="/signup"
          element={userData ? <Navigate to="/dashboard" replace /> : <Auth />}
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            userData ? (
              <Dashboard userData={userData} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Other routes */}
        <Route
          path="*"
          element={<Navigate to={userData ? '/dashboard' : '/login'} replace />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
