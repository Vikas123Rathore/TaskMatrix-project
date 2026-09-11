import { CalendarDays, Pencil, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useTask } from '../context/TaskContext'

const TaskCard = ({ task }) => {
  const navigate = useNavigate()
  const { deleteTask } = useTask()

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this task?',
    )

    if (!confirmDelete) return

    try {
      await deleteTask(task._id)
    } catch (error) {
      console.error('Delete Task Error:', error)
    }
  }

  const getStatusClass = () => {
    if (task.status === 'Completed') {
      return 'bg-green-50 text-green-600'
    }

    if (task.status === 'In Progress') {
      return 'bg-purple-50 text-purple-600'
    }

    return 'bg-blue-50 text-blue-600'
  }

  const getPriorityClass = () => {
    if (task.priority === 'High') {
      return 'bg-red-50 text-red-600'
    }

    if (task.priority === 'Medium') {
      return 'bg-yellow-50 text-yellow-600'
    }

    return 'bg-green-50 text-green-600'
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{task.title}</h3>

          <p className="text-sm text-slate-500 mt-2 line-clamp-2">
            {task.description || 'No description available.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusClass()}`}
          >
            {task.status}
          </span>

          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityClass()}`}
          >
            {task.priority}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 mt-5 pt-4 border-t border-slate-100">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <CalendarDays className="w-4 h-4" />

          {task.dueDate
            ? new Date(task.dueDate).toLocaleDateString('en-US', {
                month: 'short',
                day: '2-digit',
                year: 'numeric',
              })
            : 'No due date'}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(`/tasks/${task._id}`)}
            className="text-sm font-medium text-blue-600 hover:text-blue-700 cursor-pointer"
          >
            View
          </button>

          <button
            onClick={() => navigate(`/tasks/${task._id}/edit`)}
            className="inline-flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
          >
            <Pencil className="w-4 h-4" />
            Edit
          </button>

          <button
            onClick={handleDelete}
            className="inline-flex items-center gap-1 text-sm font-medium text-red-600 hover:text-red-700 cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default TaskCard
