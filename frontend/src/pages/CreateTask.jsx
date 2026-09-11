import { useEffect, useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'

import { useTask } from '../context/TaskContext'
import { useProject } from '../context/ProjectContext'

const CreateTask = () => {
  const { id: projectId } = useParams()
  const navigate = useNavigate()

  const { createTask, loading } = useTask()
  const { getProject } = useProject()

  const [project, setProject] = useState(null)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    status: 'Pending',
    dueDate: '',
  })

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await getProject(projectId)
        setProject(data)
      } catch (error) {
        console.error('Get Project Error:', error)
        setError('Failed to load project')
      }
    }

    fetchProject()
  }, [projectId])

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setError('')

      const taskData = {
        title: formData.title,
        description: formData.description,
        project: projectId,
        priority: formData.priority,
        status: formData.status,
        dueDate: formData.dueDate || null,
      }

      console.log('Creating Task:', taskData)

      await createTask(taskData)

      navigate(`/projects/${projectId}`)
    } catch (error) {
      console.error('Create Task Error:', error)

      setError(error.response?.data?.message || 'Failed to create task')
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => navigate(`/projects/${projectId}`)}
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Project
        </button>

        <div className="mt-6">
          <h1 className="text-2xl font-bold text-slate-900">Create Task</h1>

          <p className="text-sm text-slate-500 mt-1">
            Add a new task to your project
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white border border-slate-200 rounded-2xl p-6 mt-6 shadow-sm"
        >
          {error && (
            <div className="mb-5 p-3 rounded-lg bg-red-50 border border-red-100 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Project */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Project
            </label>

            <div className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-700">
              {project?.projectName || 'Loading project...'}
            </div>
          </div>

          {/* Title */}
          <div className="mt-5">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Task Title
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter task title"
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
              placeholder="Enter task description"
              rows="5"
              className="w-full px-4 py-3 border border-slate-200 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition resize-none"
              required
            />
          </div>

          {/* Priority */}
          <div className="mt-5">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Priority
            </label>

            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-white"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
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
              className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-white"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {/* Due Date */}
          <div className="mt-5">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Due Date
            </label>

            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-slate-200 rounded-lg outline-none focus:border-blue-500"
            />
          </div>

          {/* Buttons */}
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate(`/projects/${projectId}`)}
              className="px-5 py-2.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateTask
