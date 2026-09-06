import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate()

  // Sirf app start par auth check ke liye
  const [loading, setLoading] = useState(true)

  // Login/Register/Logout button loading ke liye
  const [actionLoading, setActionLoading] = useState(false)

  const [userData, setUserData] = useState(null)

  // =========================
  // GET CURRENT USER
  // =========================
  const getCurrentUser = async () => {
    try {
      const res = await api.get('/auth/current-user')

      if (res.data.success) {
        setUserData(res.data.user)
      } else {
        setUserData(null)
      }
    } catch (error) {
      setUserData(null)
    } finally {
      setLoading(false)
    }
  }

  // =========================
  // REGISTER
  // =========================
  const register = async (name, email, password) => {
    try {
      setActionLoading(true)

      const res = await api.post('/auth/register', {
        name,
        email,
        password,
      })

      console.log('Register:', res.data)

      if (res.data.success) {
        navigate('/login')
      }
    } catch (error) {
      console.error('Register Error:', error)

      alert(error.response?.data?.message || 'Registration failed')
    } finally {
      setActionLoading(false)
    }
  }

  // =========================
  // LOGIN
  // =========================
  const login = async (email, password) => {
    try {
      setActionLoading(true)

      const res = await api.post('/auth/login', {
        email,
        password,
      })

      console.log('Login:', res.data)

      if (res.data.success) {
        setUserData(res.data.user)

        navigate('/dashboard')
      }
    } catch (error) {
      console.error('Login Error:', error)

      alert(error.response?.data?.message || 'Login failed')
    } finally {
      setActionLoading(false)
    }
  }

  // =========================
  // LOGOUT
  // =========================
  const logout = async () => {
    try {
      setActionLoading(true)

      await api.post('/auth/logout')

      // Pehle user ko logout state me lao
      setUserData(null)

      // Phir login page par jao
      navigate('/login', { replace: true })
    } catch (error) {
      console.error('Logout Error:', error)

      // Even if API fails, local auth state clear kar do
      setUserData(null)

      navigate('/login', { replace: true })
    } finally {
      setActionLoading(false)
    }
  }

  // =========================
  // INITIAL AUTH CHECK
  // =========================
  useEffect(() => {
    getCurrentUser()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        userData,
        setUserData,

        loading,
        actionLoading,

        register,
        login,
        logout,
        getCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
