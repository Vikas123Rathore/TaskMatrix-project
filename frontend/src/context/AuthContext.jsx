import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import api from '../api/axios'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(false)
  const [userData, setUserData] = useState(null)

  // GET CURRENT USER
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

  // REGISTER
  const register = async (name, email, password) => {
    try {
      setActionLoading(true)

      const res = await api.post('/auth/register', {
        name,
        email,
        password,
      })

      if (res.data.success) {
        toast.success('Account created successfully!')
        navigate('/login')
      }
    } catch (error) {
      console.error('Register Error:', error)

      const message = error.response?.data?.message || 'Registration failed'

      toast.error(message)

      throw error
    } finally {
      setActionLoading(false)
    }
  }

  // LOGIN
  const login = async (email, password) => {
    try {
      setActionLoading(true)

      const res = await api.post('/auth/login', {
        email,
        password,
      })

      if (res.data.success) {
        setUserData(res.data.user)

        toast.success('Login successful!')

        navigate('/dashboard')
      }
    } catch (error) {
      console.error('Login Error:', error)

      const message = error.response?.data?.message || 'Login failed'

      toast.error(message)

      throw error
    } finally {
      setActionLoading(false)
    }
  }

  // LOGOUT
  const logout = async () => {
    try {
      setActionLoading(true)

      await api.post('/auth/logout')

      setUserData(null)

      toast.success('Logged out successfully!')

      navigate('/login', { replace: true })
    } catch (error) {
      console.error('Logout Error:', error)

      setUserData(null)

      toast.error('Logout failed')

      navigate('/login', { replace: true })
    } finally {
      setActionLoading(false)
    }
  }

  // INITIAL AUTH CHECK
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
