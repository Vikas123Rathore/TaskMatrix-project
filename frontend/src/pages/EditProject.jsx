import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useProject } from '../context/ProjectContext'

const EditProject = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const { getProject, updateProject, loading } = useProject()

  const [formData, setFormData] = useState({
    projectName: '',
    description: '',
    status: 'Pending',
  })

  const [error, setError] = useState('')

  // Get project data
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const project = await getProject(id)

        setFormData({
          projectName: project.projectName || '',
          description: project.description || '',
          status: project.status || 'Pending',
        })
      } catch (error) {
        console.error('Fetch Project Error:', error)
        setError('Failed to load project')
      }
    }

    fetchProject()
  }, [id])

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Update project
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setError('')

      await updateProject(id, formData)

      navigate(`/projects/${id}`)
    } catch (error) {
      console.error('Update Project Error:', error)

      setError(error.response?.data?.message || 'Failed to update project')
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(`/projects/${id}`)}
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Project
        </button>

        {/* Page Heading */}
        <div className="mt-6">
          <h1 className="text-2xl font-bold text-slate-900">Edit Project</h1>

          <p className="text-sm text-slate-500 mt-1">
            Update your project details
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-slate-200 rounded-2xl p-6 mt-6 shadow-sm"
        >
          {error && (
            <div className="mb-5 p-3 rounded-lg bg-red-50 border border-red-100 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Project Name */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Project Name
            </label>

            <input
              type="text"
              name="projectName"
              value={formData.projectName}
              onChange={handleChange}
              placeholder="Enter project name"
              className="w-full px-4 py-3 border border-slate-200 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
              required
            />
          </div>

          {/* Description */}
          <div className="mt-5">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter project description"
              rows="5"
              className="w-full px-4 py-3 border border-slate-200 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition resize-none"
              required
            />
          </div>

          {/* Status */}
          <div className="mt-5">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Status
            </label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-slate-200 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition bg-white"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate(`/projects/${id}`)}
              className="px-5 py-2.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? 'Updating...' : 'Update Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditProject
