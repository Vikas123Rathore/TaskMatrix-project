import { createContext, useContext, useEffect, useState } from 'react'
import api from '../api/axios'
import { useNavigate } from 'react-router-dom'
const ProjectContext = createContext()

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
const Navigate = useNavigate()
  // ================= GET ALL PROJECTS =================
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
      console.log('Get Projects Response:', response.data)
    } catch (error) {
      console.error('Get Projects Error:', error)

      setError(error.response?.data?.message || 'Failed to fetch projects')
    } finally {
      setLoading(false)
    }
  }

  // ================= CREATE PROJECT =================
  const createProject = async (projectData) => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.post('/projects/create', projectData, {
        withCredentials: true,
      })
      console.log('Create Project Response:', response.data)
      if (response.data.success) {
        setProjects((prevProjects) => [response.data.project, ...prevProjects])
      }
      // Navigate('/projects')
      return response.data
    } catch (error) {
      console.error('Create Project Error:', error)

      setError(error.response?.data?.message || 'Failed to create project')

      throw error
    } finally {
      setLoading(false)
    }
  }

  // ================= GET SINGLE PROJECT =================
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

      setError(error.response?.data?.message || 'Failed to fetch project')

      throw error
    } finally {
      setLoading(false)
    }
  }

  // ================= UPDATE PROJECT =================
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
      }

      return response.data
    } catch (error) {
      console.error('Update Project Error:', error)

      setError(error.response?.data?.message || 'Failed to update project')

      throw error
    } finally {
      setLoading(false)
    }
  }

  // ================= DELETE PROJECT =================
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
      }

      return response.data
    } catch (error) {
      console.error('Delete Project Error:', error)

      setError(error.response?.data?.message || 'Failed to delete project')

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

// ================= CUSTOM HOOK =================
export const useProject = () => {
  const context = useContext(ProjectContext)

  // if (!context) {
  //   throw new Error('useProject must be used inside ProjectProvider')
  // }

  return context
}
