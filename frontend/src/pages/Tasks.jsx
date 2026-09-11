import { useEffect } from 'react'
import { Plus, Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { useTask } from '../context/TaskContext'
import TaskCard from '../components/TaskCard'

const Tasks = () => {
  const navigate = useNavigate()

  const {
    tasks,
    getTasks,
    loading,
    error,
  } = useTask()

  useEffect(() => {
    getTasks()
  }, [])

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Tasks
            </h1>

            <p className="text-sm text-slate-500 mt-1">
              Manage all your tasks
            </p>
          </div>

          <button
            onClick={() => navigate('/tasks/create')}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition"
          >
            <Plus className="w-4 h-4" />
            Create Task
          </button>
        </div>

        {/* Search UI */}
        <div className="mt-6 bg-white border border-slate-200 rounded-xl p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

            <input
              type="text"
              placeholder="Search tasks..."
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-6 p-4 rounded-lg bg-red-50 border border-red-100 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="text-center py-10 text-slate-500">
            Loading tasks...
          </div>
        )}

        {/* Tasks */}
        {!loading && tasks.length > 0 && (
          <div className="grid grid-cols-1 gap-4 mt-6">
            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
              />
            ))}
          </div>
        )}

        {/* Empty */}
        {!loading && tasks.length === 0 && !error && (
          <div className="bg-white border border-slate-200 rounded-2xl p-10 mt-6 text-center">
            <h2 className="text-lg font-semibold text-slate-800">
              No tasks found
            </h2>

            <p className="text-sm text-slate-500 mt-2">
              Create your first task to get started.
            </p>

            <button
              onClick={() => navigate('/tasks/create')}
              className="mt-5 inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
            >
              <Plus className="w-4 h-4" />
              Create Task
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Tasks
