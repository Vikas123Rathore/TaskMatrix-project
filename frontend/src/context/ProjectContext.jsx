import { createContext, useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import api from '../api/axios'

const ProjectContext = createContext()

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const getProjects = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.get('/projects', {
        withCredentials: true,
      })

      if (response.data.success) {
        setProjects(response.data.projects)
      }
    } catch (error) {
      console.error('Get Projects Error:', error)

      const message =
        error.response?.data?.message || 'Failed to fetch projects'

      setError(message)
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  const createProject = async (projectData) => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.post('/projects/create', projectData, {
        withCredentials: true,
      })

      if (response.data.success) {
        setProjects((prevProjects) => [response.data.project, ...prevProjects])

        toast.success('Project created successfully!')
      }

      return response.data
    } catch (error) {
      console.error('Create Project Error:', error)

      const message =
        error.response?.data?.message || 'Failed to create project'

      setError(message)
      toast.error(message)

      throw error
    } finally {
      setLoading(false)
    }
  }

  const getProject = async (id) => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.get(`/projects/${id}`, {
        withCredentials: true,
      })

      return response.data.project
    } catch (error) {
      console.error('Get Project Error:', error)

      const message = error.response?.data?.message || 'Failed to fetch project'

      setError(message)
      toast.error(message)

      throw error
    } finally {
      setLoading(false)
    }
  }

  const updateProject = async (id, projectData) => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.put(`/projects/${id}`, projectData, {
        withCredentials: true,
      })

      if (response.data.success) {
        setProjects((prevProjects) =>
          prevProjects.map((project) =>
            project._id === id ? response.data.project : project,
          ),
        )

        toast.success('Project updated successfully!')
      }

      return response.data
    } catch (error) {
      console.error('Update Project Error:', error)

      const message =
        error.response?.data?.message || 'Failed to update project'

      setError(message)
      toast.error(message)

      throw error
    } finally {
      setLoading(false)
    }
  }

  const deleteProject = async (id) => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.delete(`/projects/${id}`, {
        withCredentials: true,
      })

      if (response.data.success) {
        setProjects((prevProjects) =>
          prevProjects.filter((project) => project._id !== id),
        )

        toast.success('Project deleted successfully!')
      }

      return response.data
    } catch (error) {
      console.error('Delete Project Error:', error)

      const message =
        error.response?.data?.message || 'Failed to delete project'

      setError(message)
      toast.error(message)

      throw error
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getProjects()
  }, [])

  return (
    <ProjectContext.Provider
      value={{
        projects,
        loading,
        error,
        getProjects,
        createProject,
        getProject,
        updateProject,
        deleteProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  )
}

export const useProject = () => {
  const context = useContext(ProjectContext)

  if (!context) {
    throw new Error('useProject must be used inside ProjectProvider')
  }

  return context
}
