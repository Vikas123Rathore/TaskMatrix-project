import { createContext, useContext, useState } from 'react'
import toast from 'react-hot-toast'
import api from '../api/axios'

const TaskContext = createContext()

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([])
  const [task, setTask] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const createTask = async (taskData) => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.post('/tasks', taskData, {
        withCredentials: true,
      })

      if (response.data.success) {
        const newTask = response.data.task

        setTasks((prevTasks) => [newTask, ...prevTasks])
        setTask(newTask)

        toast.success('Task created successfully!')
      }

      return response.data
    } catch (error) {
      console.error('Create Task Error:', error)

      const message = error.response?.data?.message || 'Failed to create task'

      setError(message)
      toast.error(message)

      throw error
    } finally {
      setLoading(false)
    }
  }

  const getTasks = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.get('/tasks', {
        withCredentials: true,
      })

      if (response.data.success) {
        setTasks(response.data.tasks || [])
      }

      return response.data.tasks || []
    } catch (error) {
      console.error('Get Tasks Error:', error)

      const message = error.response?.data?.message || 'Failed to fetch tasks'

      setError(message)
      toast.error(message)

      throw error
    } finally {
      setLoading(false)
    }
  }

  const getTask = async (id) => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.get(`/tasks/${id}`, {
        withCredentials: true,
      })

      if (response.data.success) {
        setTask(response.data.task)
      }

      return response.data.task
    } catch (error) {
      console.error('Get Task Error:', error)

      const message = error.response?.data?.message || 'Failed to fetch task'

      setError(message)
      toast.error(message)

      throw error
    } finally {
      setLoading(false)
    }
  }

  const getProjectTasks = async (projectId) => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.get(`/tasks/project/${projectId}`, {
        withCredentials: true,
      })

      if (response.data.success) {
        setTasks(response.data.tasks || [])
      }

      return response.data.tasks || []
    } catch (error) {
      console.error('Get Project Tasks Error:', error)

      const message =
        error.response?.data?.message || 'Failed to fetch project tasks'

      setError(message)
      toast.error(message)

      throw error
    } finally {
      setLoading(false)
    }
  }

  const updateTask = async (id, taskData) => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.put(`/tasks/${id}`, taskData, {
        withCredentials: true,
      })

      if (response.data.success) {
        const updatedTask = response.data.task

        setTasks((prevTasks) =>
          prevTasks.map((task) => (task._id === id ? updatedTask : task)),
        )

        setTask(updatedTask)

        toast.success('Task updated successfully!')
      }

      return response.data
    } catch (error) {
      console.error('Update Task Error:', error)

      const message = error.response?.data?.message || 'Failed to update task'

      setError(message)
      toast.error(message)

      throw error
    } finally {
      setLoading(false)
    }
  }

  const deleteTask = async (id) => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.delete(`/tasks/${id}`, {
        withCredentials: true,
      })

      if (response.data.success) {
        setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id))

        if (task?._id === id) {
          setTask(null)
        }

        toast.success('Task deleted successfully!')
      }

      return response.data
    } catch (error) {
      console.error('Delete Task Error:', error)

      const message = error.response?.data?.message || 'Failed to delete task'

      setError(message)
      toast.error(message)

      throw error
    } finally {
      setLoading(false)
    }
  }

  const clearTask = () => {
    setTask(null)
  }

  const clearError = () => {
    setError(null)
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        task,
        loading,
        error,
        createTask,
        getTasks,
        getTask,
        getProjectTasks,
        updateTask,
        deleteTask,
        clearTask,
        clearError,
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}

export const useTask = () => {
  const context = useContext(TaskContext)

  if (!context) {
    throw new Error('useTask must be used inside TaskProvider')
  }

  return context
}
