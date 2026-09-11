import { useEffect } from 'react'
import { ArrowLeft, CalendarDays, Pencil, Trash2 } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'

import { useTask } from '../context/TaskContext'

const TaskDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const { task, getTask, deleteTask, loading } = useTask()

  useEffect(() => {
    getTask(id)
  }, [id])

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this task?',
    )

    if (!confirmDelete) return

    try {
      await deleteTask(id)

      navigate('/tasks')
    } catch (error) {
      console.error('Delete Task Error:', error)
    }
  }

  if (loading && !task) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-500">Loading task...</p>
      </div>
    )
  }

  if (!task) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-slate-900">
            Task not found
          </h2>

          <button
            onClick={() => navigate('/tasks')}
            className="mt-4 text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            ← Back to Tasks
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back */}
        <button
          onClick={() => navigate('/tasks')}
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Tasks
        </button>

        {/* Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 mt-6 shadow-sm">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm text-slate-400">Task Details</p>

              <h1 className="text-3xl font-bold text-slate-900 mt-1">
                {task.title}
              </h1>

              <p className="text-slate-500 mt-3">
                {task.description || 'No description available.'}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate(`/tasks/${id}/edit`)}
                className="inline-flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                <Pencil className="w-4 h-4" />
                Edit
              </button>

              <button
                onClick={handleDelete}
                className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>

          {/* Status / Priority */}
          <div className="flex flex-wrap gap-3 mt-6">
            <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-medium">
              Status: {task.status}
            </span>

            <span className="px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-medium">
              Priority: {task.priority}
            </span>
          </div>
        </div>

        {/* Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <CalendarDays className="w-5 h-5 text-blue-600" />

            <p className="text-sm text-slate-500 mt-4">Due Date</p>

            <p className="font-semibold text-slate-800 mt-1">
              {task.dueDate
                ? new Date(task.dueDate).toLocaleDateString('en-US', {
                    month: 'short',
                    day: '2-digit',
                    year: 'numeric',
                  })
                : 'No due date'}
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <p className="text-sm text-slate-500">Project</p>

            <p className="font-semibold text-slate-800 mt-1">
              {task.project?.projectName || task.projectName || 'No project'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskDetails
