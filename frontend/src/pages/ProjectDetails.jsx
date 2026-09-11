import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  Pencil,
  Trash2,
  Plus,
  CheckCircle2,
} from 'lucide-react'

import { useProject } from '../context/ProjectContext'
import { useTask } from '../context/TaskContext'

const ProjectDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const { getProject, deleteProject, loading } = useProject()
  const { getProjectTasks, tasks, loading: taskLoading } = useTask()

  const [project, setProject] = useState(null)

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        // Get Project
        const projectData = await getProject(id)
        setProject(projectData)

        // Get Tasks of this Project
        await getProjectTasks(id)
      } catch (error) {
        console.error('Failed to load project data:', error)
      }
    }

    fetchProjectData()
  }, [id])

  // ================= DELETE PROJECT =================
  const handleDelete = async () => {
    try {
      await deleteProject(id)

      navigate('/projects')
    } catch (error) {
      console.error('Delete Project Error:', error)
    }
  }

  // ================= PROJECT PROGRESS =================
  const getProgress = () => {
    if (project?.status === 'Completed') return 100

    if (project?.status === 'In Progress') return 50

    return 0
  }

  // ================= LOADING =================
  if (loading && !project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-500">Loading project...</p>
      </div>
    )
  }

  // ================= PROJECT NOT FOUND =================
  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-slate-900">
            Project not found
          </h2>

          <button
            onClick={() => navigate('/projects')}
            className="mt-4 text-sm font-medium text-blue-600 hover:text-blue-700 cursor-pointer"
          >
            ← Back to Projects
          </button>
        </div>
      </div>
    )
  }

  const progress = getProgress()

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* ================= BACK BUTTON ================= */}
        <button
          onClick={() => navigate('/projects')}
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Projects
        </button>

        {/* ================= HEADER ================= */}
        <div className="mt-6 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            {/* Project Info */}
            <div>
              <p className="text-sm text-slate-400">Project Details</p>

              <h1 className="text-3xl font-bold text-slate-900 mt-1">
                {project.projectName}
              </h1>

              <p className="text-slate-500 mt-2 max-w-2xl">
                {project.description}
              </p>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex items-center gap-3">
              {/* Edit */}
              <button
                onClick={() => navigate(`/projects/${id}/edit`)}
                className="inline-flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition cursor-pointer"
              >
                <Pencil className="w-4 h-4" />
                Edit
              </button>

              {/* Delete */}
              <button
                onClick={handleDelete}
                className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>

          {/* ================= STATUS ================= */}
          <div className="mt-6">
            <span
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
                project.status === 'Completed'
                  ? 'bg-green-50 text-green-600'
                  : project.status === 'In Progress'
                    ? 'bg-purple-50 text-purple-600'
                    : 'bg-blue-50 text-blue-600'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  project.status === 'Completed'
                    ? 'bg-green-500'
                    : project.status === 'In Progress'
                      ? 'bg-purple-500'
                      : 'bg-blue-500'
                }`}
              ></span>

              {project.status}
            </span>
          </div>
        </div>

        {/* ================= PROJECT INFORMATION ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
          {/* Created */}
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
              <CalendarDays className="w-5 h-5 text-blue-600" />
            </div>

            <p className="text-sm text-slate-500 mt-4">Created</p>

            <p className="font-semibold text-slate-800 mt-1">
              {project.createdAt
                ? new Date(project.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: '2-digit',
                    year: 'numeric',
                  })
                : 'N/A'}
            </p>
          </div>

          {/* Last Updated */}
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
              <Clock3 className="w-5 h-5 text-purple-600" />
            </div>

            <p className="text-sm text-slate-500 mt-4">Last Updated</p>

            <p className="font-semibold text-slate-800 mt-1">
              {project.updatedAt
                ? new Date(project.updatedAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: '2-digit',
                    year: 'numeric',
                  })
                : 'N/A'}
            </p>
          </div>

          {/* Tasks Count */}
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            </div>

            <p className="text-sm text-slate-500 mt-4">Tasks</p>

            <p className="font-semibold text-slate-800 mt-1">
              {tasks.length} {tasks.length === 1 ? 'Task' : 'Tasks'}
            </p>
          </div>
        </div>

        {/* ================= PROJECT PROGRESS ================= */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 mt-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Project Progress
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Progress based on current project status
              </p>
            </div>

            <span className="text-lg font-semibold text-slate-800">
              {progress}%
            </span>
          </div>

          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden mt-5">
            <div
              className="h-full bg-blue-600 rounded-full transition-all duration-500"
              style={{
                width: `${progress}%`,
              }}
            ></div>
          </div>
        </div>

        {/* ================= TASKS SECTION ================= */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 mt-6">
          {/* Tasks Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Tasks</h2>

              <p className="text-sm text-slate-500 mt-1">
                Manage tasks for this project
              </p>
            </div>

            {/* Create Task Button */}
            <button
              onClick={() => navigate(`/projects/${id}/tasks/create`)}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Create Task
            </button>
          </div>

          {/* ================= TASK LIST ================= */}
          <div className="mt-6">
            {taskLoading ? (
              <div className="border border-slate-200 rounded-xl p-8 text-center">
                <p className="text-sm text-slate-500">Loading tasks...</p>
              </div>
            ) : tasks.length === 0 ? (
              /* Empty Task State */
              <div className="border border-dashed border-slate-200 rounded-xl p-8 text-center">
                <div className="w-12 h-12 mx-auto rounded-full bg-slate-50 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-slate-400" />
                </div>

                <h3 className="text-sm font-semibold text-slate-800 mt-4">
                  No tasks yet
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  Create a task to start working on this project.
                </p>

                <button
                  onClick={() => navigate(`/projects/${id}/tasks/create`)}
                  className="mt-4 text-sm font-medium text-blue-600 hover:text-blue-700 cursor-pointer"
                >
                  Create your first task →
                </button>
              </div>
            ) : (
              /* Task List */
              <div className="space-y-4">
                {tasks.map((task) => (
                  <div
                    key={task._id}
                    className="border border-slate-200 rounded-xl p-5 hover:shadow-sm transition"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h3 className="text-base font-semibold text-slate-900">
                          {task.title}
                        </h3>

                        <p className="text-sm text-slate-500 mt-2">
                          {task.description || 'No description available.'}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            task.status === 'Completed'
                              ? 'bg-green-50 text-green-600'
                              : task.status === 'In Progress'
                                ? 'bg-purple-50 text-purple-600'
                                : 'bg-blue-50 text-blue-600'
                          }`}
                        >
                          {task.status}
                        </span>

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            task.priority === 'High'
                              ? 'bg-red-50 text-red-600'
                              : task.priority === 'Medium'
                                ? 'bg-yellow-50 text-yellow-600'
                                : 'bg-green-50 text-green-600'
                          }`}
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

                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => navigate(`/tasks/${task._id}`)}
                          className="text-sm font-medium text-blue-600 hover:text-blue-700 cursor-pointer"
                        >
                          View
                        </button>

                        <button
                          onClick={() => navigate(`/tasks/${task._id}/edit`)}
                          className="text-sm font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ================= DESCRIPTION ================= */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 mt-6">
          <h2 className="text-lg font-semibold text-slate-900">Description</h2>

          <p className="text-sm text-slate-600 leading-6 mt-3">
            {project.description || 'No description available.'}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetails
