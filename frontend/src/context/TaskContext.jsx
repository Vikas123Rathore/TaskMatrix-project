import { createContext, useContext, useState } from 'react'
import api from '../api/axios'

const TaskContext = createContext()

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([])
  const [task, setTask] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // ================= CREATE TASK =================
  const createTask = async (taskData) => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.post('/tasks', taskData, {
        withCredentials: true,
      })

      console.log('Create Task Response:', response.data)

      if (response.data.success) {
        const newTask = response.data.task

        setTasks((prevTasks) => [newTask, ...prevTasks])
        setTask(newTask)
      }

      return response.data
    } catch (error) {
      console.error('Create Task Error:', error)

      setError(
        error.response?.data?.message || 'Failed to create task',
      )

      throw error
    } finally {
      setLoading(false)
    }
  }

  // ================= GET ALL TASKS =================
  const getTasks = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.get('/tasks', {
        withCredentials: true,
      })

      console.log('Get Tasks Response:', response.data)

      if (response.data.success) {
        setTasks(response.data.tasks || [])
      }

      return response.data.tasks || []
    } catch (error) {
      console.error('Get Tasks Error:', error)

      setError(
        error.response?.data?.message || 'Failed to fetch tasks',
      )

      throw error
    } finally {
      setLoading(false)
    }
  }

  // ================= GET SINGLE TASK =================
  const getTask = async (id) => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.get(`/tasks/${id}`, {
        withCredentials: true,
      })

      console.log('Get Task Response:', response.data)

      if (response.data.success) {
        setTask(response.data.task)
      }

      return response.data.task
    } catch (error) {
      console.error('Get Task Error:', error)

      setError(
        error.response?.data?.message || 'Failed to fetch task',
      )

      throw error
    } finally {
      setLoading(false)
    }
  }

  // ================= GET PROJECT TASKS =================
  const getProjectTasks = async (projectId) => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.get(
        `/tasks/project/${projectId}`,
        {
          withCredentials: true,
        },
      )

      console.log('Get Project Tasks Response:', response.data)

      if (response.data.success) {
        setTasks(response.data.tasks || [])
      }

      return response.data.tasks || []
    } catch (error) {
      console.error('Get Project Tasks Error:', error)

      setError(
        error.response?.data?.message ||
          'Failed to fetch project tasks',
      )

      throw error
    } finally {
      setLoading(false)
    }
  }

  // ================= UPDATE TASK =================
  const updateTask = async (id, taskData) => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.put(
        `/tasks/${id}`,
        taskData,
        {
          withCredentials: true,
        },
      )

      console.log('Update Task Response:', response.data)

      if (response.data.success) {
        const updatedTask = response.data.task

        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === id ? updatedTask : task,
          ),
        )

        setTask(updatedTask)
      }

      return response.data
    } catch (error) {
      console.error('Update Task Error:', error)

      setError(
        error.response?.data?.message || 'Failed to update task',
      )

      throw error
    } finally {
      setLoading(false)
    }
  }

  // ================= DELETE TASK =================
  const deleteTask = async (id) => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.delete(`/api/tasks/${id}`, {
        withCredentials: true,
      })

      console.log('Delete Task Response:', response.data)

      if (response.data.success) {
        setTasks((prevTasks) =>
          prevTasks.filter((task) => task._id !== id),
        )

        if (task?._id === id) {
          setTask(null)
        }
      }

      return response.data
    } catch (error) {
      console.error('Delete Task Error:', error)

      setError(
        error.response?.data?.message || 'Failed to delete task',
      )

      throw error
    } finally {
      setLoading(false)
    }
  }

  // ================= CLEAR TASK =================
  const clearTask = () => {
    setTask(null)
  }

  // ================= CLEAR ERROR =================
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

// ================= CUSTOM HOOK =================
export const useTask = () => {
  const context = useContext(TaskContext)

  if (!context) {
    throw new Error(
      'useTask must be used inside TaskProvider',
    )
  }

  return context
}
