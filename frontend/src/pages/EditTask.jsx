import { useEffect, useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'

import { useTask } from '../context/TaskContext'

const EditTask = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const { getTask, updateTask, loading } = useTask()

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    status: 'Pending',
    dueDate: '',
  })

  const [error, setError] = useState('')
  const [pageLoading, setPageLoading] = useState(true)

  // ================= GET PREVIOUS TASK DATA =================
  useEffect(() => {
    const fetchTask = async () => {
      try {
        setPageLoading(true)
        setError('')

        const data = await getTask(id)

        console.log('Previous Task Data:', data)

        if (!data) {
          setError('Task not found')
          return
        }

        setFormData({
          title: data.title || '',
          description: data.description || '',
          priority: data.priority || 'Medium',
          status: data.status || 'Pending',
          dueDate: data.dueDate ? data.dueDate.substring(0, 10) : '',
        })
      } catch (error) {
        console.error('Get Task Error:', error)

        setError(error.response?.data?.message || 'Failed to load task')
      } finally {
        setPageLoading(false)
      }
    }

    fetchTask()
  }, [id])

  // ================= HANDLE INPUT =================
  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // ================= UPDATE TASK =================
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setError('')

      const taskData = {
        title: formData.title,
        description: formData.description,
        priority: formData.priority,
        status: formData.status,
        dueDate: formData.dueDate || null,
      }

      console.log('Updating Task:', taskData)

      await updateTask(id, taskData)

      console.log('Task Updated Successfully')

      navigate(`/tasks/${id}`)
    } catch (error) {
      console.error('Update Task Error:', error)

      setError(error.response?.data?.message || 'Failed to update task')
    }
  }

  // ================= LOADING =================
  if (pageLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-500">Loading task details...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(`/tasks/${id}`)}
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Task
        </button>

        {/* Heading */}
        <h1 className="text-2xl font-bold text-slate-900 mt-6">Edit Task</h1>

        <p className="text-sm text-slate-500 mt-1">Update task details</p>

        <form
          onSubmit={handleSubmit}
          className="bg-white border border-slate-200 rounded-2xl p-6 mt-6 shadow-sm"
        >
          {/* Error */}
          {error && (
            <div className="mb-5 p-3 rounded-lg bg-red-50 border border-red-100 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Task Title
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter task title"
              className="w-full px-4 py-3 border border-slate-200 rounded-lg outline-none focus:border-blue-500"
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
              rows="5"
              placeholder="Enter task description"
              className="w-full px-4 py-3 border border-slate-200 rounded-lg outline-none focus:border-blue-500 resize-none"
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
              onClick={() => navigate(`/tasks/${id}`)}
              className="px-5 py-2.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Updating...' : 'Update Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditTask
