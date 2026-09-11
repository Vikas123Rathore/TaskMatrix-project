import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  User,
  Mail,
  ShieldCheck,
  FolderKanban,
  ListTodo,
  CheckCircle2,
  Clock3,
  Plus,
  ArrowRight,
  MoreHorizontal,
  Circle,
} from 'lucide-react'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

import { AuthContext } from '../context/AuthContext'
import { useProject } from '../context/ProjectContext'

const Dashboard = () => {
  const { userData } = useContext(AuthContext)
  const navigate = useNavigate()
  const { projects } = useProject()
  // =========================
  // INITIAL LOADING
  // =========================

  if (!userData) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-slate-500">Loading dashboard...</p>
      </div>
    )
  }

  // =========================
  // USER DATA
  // =========================

  const userName = userData.name || 'User'

  // =========================
  // PROJECT DATA
  // =========================

  // const projects = Array.isArray(userData.projects)
  //   ? userData.projects
  //   : []

  // =========================
  // PROJECT ANALYTICS
  // =========================

  const projectAnalytics = [
    {
      status: 'Pending',
      projects: projects.filter((project) => project.status === 'Pending')
        .length,
    },
    {
      status: 'In Progress',
      projects: projects.filter((project) => project.status === 'In Progress')
        .length,
    },
    {
      status: 'Completed',
      projects: projects.filter((project) => project.status === 'Completed')
        .length,
    },
  ]

  // =========================
  // TEMPORARY TASK DATA
  // Sprint 15 Task API ke baad
  // isse backend data se replace karna hai
  // =========================

  // const recentTasks = [
  //   {
  //     id: 1,
  //     title: 'Build authentication system',
  //     project: 'TaskMatrix',
  //     status: 'In Progress',
  //   },
  //   {
  //     id: 2,
  //     title: 'Create project management API',
  //     project: 'TaskMatrix',
  //     status: 'Completed',
  //   },
  //   {
  //     id: 3,
  //     title: 'Design dashboard interface',
  //     project: 'TaskMatrix',
  //     status: 'Pending',
  //   },
  //   {
  //     id: 4,
  //     title: 'Implement responsive navbar',
  //     project: 'TaskMatrix',
  //     status: 'Completed',
  //   },
  // ]

  // =========================
  // STATUS STYLE
  // =========================

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-50 text-green-600'

      case 'In Progress':
        return 'bg-blue-50 text-blue-600'

      case 'Pending':
        return 'bg-yellow-50 text-yellow-600'

      default:
        return 'bg-slate-50 text-slate-600'
    }
  }

  // =========================
  // DASHBOARD
  // =========================

  return (
    <div className="min-h-full bg-slate-50 text-slate-900">
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* ================================================= */}
        {/* WELCOME HEADER */}
        {/* ================================================= */}

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-8">
          <div>
            <p className="text-sm text-slate-500 mb-1">Welcome back 👋</p>

            <h1 className="text-3xl md:text-4xl font-bold tracking-tight capitalize">
              Good Morning, {userName}
            </h1>

            <p className="text-slate-500 mt-2">
              Here's what's happening with your TaskMatrix workspace.
            </p>
          </div>

          <button
            onClick={() => navigate('/projects/create')}
            className="flex items-center justify-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition cursor-pointer shadow-sm"
          >
            <Plus size={18} />
            Create Project
          </button>
        </div>

        {/* ================================================= */}
        {/* QUICK OVERVIEW */}
        {/* ================================================= */}

        <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm mb-6">
          {/* Heading */}

          <div className="flex items-center gap-3 mb-6">
            <div className="w-11 h-11 rounded-xl bg-purple-50 flex items-center justify-center">
              <FolderKanban className="w-5 h-5 text-purple-600" />
            </div>

            <div>
              <h2 className="text-xl font-semibold">Quick Overview</h2>

              <p className="text-sm text-slate-500 mt-0.5">
                Your workspace summary
              </p>
            </div>
          </div>

          {/* Overview Cards */}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Projects */}

            <div className="border border-slate-200 rounded-xl p-5 hover:border-blue-200 hover:shadow-sm transition">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                  <FolderKanban className="w-5 h-5 text-blue-600" />
                </div>
              </div>

              <p className="text-sm text-slate-500 mt-4">Projects</p>

              <p className="text-3xl font-bold text-slate-900 mt-1">
                {projects?.length || 0}
              </p>
            </div>

            {/* Tasks */}

            <div className="border border-slate-200 rounded-xl p-5 hover:border-orange-200 hover:shadow-sm transition">
              <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center">
                <ListTodo className="w-5 h-5 text-orange-600" />
              </div>

              <p className="text-sm text-slate-500 mt-4">Pending</p>

              <p className="text-3xl font-bold text-slate-900 mt-1">
                {
                  projects.filter((project) => project.status === 'Pending')
                    .length
                }
              </p>
            </div>

            {/* Completed */}

            <div className="border border-slate-200 rounded-xl p-5 hover:border-green-200 hover:shadow-sm transition">
              <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              </div>

              <p className="text-sm text-slate-500 mt-4">Completed</p>

              <p className="text-3xl font-bold text-slate-900 mt-1">
                {
                  projects.filter((project) => project.status === 'Completed')
                    .length
                }
              </p>
            </div>

            {/* In Progress */}

            <div className="border border-slate-200 rounded-xl p-5 hover:border-purple-200 hover:shadow-sm transition">
              <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
                <Clock3 className="w-5 h-5 text-purple-600" />
              </div>

              <p className="text-sm text-slate-500 mt-4">In Progress</p>

              <p className="text-3xl font-bold text-slate-900 mt-1">
                {
                  projects.filter((project) => project.status === 'In Progress')
                    .length
                }
              </p>
            </div>
          </div>
        </section>

        {/* ================================================= */}
        {/* ACCOUNT + PROJECTS */}
        {/* ================================================= */}

        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          {/* ================= ACCOUNT DETAILS ================= */}

          <section className="lg:col-span-1 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div>

              <div>
                <h2 className="text-lg font-semibold">Account Details</h2>

                <p className="text-sm text-slate-500">
                  Your account information
                </p>
              </div>
            </div>

            {/* Name */}

            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                <User className="w-5 h-5 text-slate-600" />
              </div>

              <div className="min-w-0">
                <p className="text-sm text-slate-500">Name</p>

                <p className="font-medium text-slate-900 mt-0.5 capitalize truncate">
                  {userData.name}
                </p>
              </div>
            </div>

            {/* Email */}

            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
                <Mail className="w-5 h-5 text-purple-600" />
              </div>

              <div className="min-w-0">
                <p className="text-sm text-slate-500">Email</p>

                <p className="font-medium text-slate-900 mt-0.5 truncate">
                  {userData.email}
                </p>
              </div>
            </div>

            {/* Status */}

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-green-600" />
              </div>

              <div>
                <p className="text-sm text-slate-500">Account Status</p>

                <div className="flex items-center gap-2 mt-0.5">
                  <span className="w-2 h-2 bg-green-500 rounded-full" />

                  <p className="font-medium text-green-600">Active</p>
                </div>
              </div>
            </div>
          </section>

          {/* ================= MY PROJECTS ================= */}

          <section className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
              <div>
                <h2 className="text-lg font-semibold">My Projects</h2>

                <p className="text-sm text-slate-500 mt-1">
                  Manage your recent projects.
                </p>
              </div>

              <button
                onClick={() => navigate('/projects')}
                className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 transition cursor-pointer"
              >
                View All
                <ArrowRight size={16} />
              </button>
            </div>

            <div className="p-6">
              {projects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {projects.slice(2, 4).map((project) => (
                    <div
                      key={project._id || project.id}
                      className="border border-slate-200 rounded-xl p-5 hover:border-blue-200 hover:shadow-sm transition"
                    >
                      <div className="flex items-start justify-between">
                        <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                          <FolderKanban size={20} />
                        </div>

                        <MoreHorizontal size={19} className="text-slate-400" />
                      </div>

                      <h3 className="font-semibold text-slate-900 mt-4">
                        {project.projectName}
                      </h3>

                      <p className="text-sm text-slate-500 mt-1 line-clamp-2">
                        {project.description ||
                          'No project description available.'}
                      </p>

                      <div className="flex items-center justify-between mt-5">
                        <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-medium">
                          {project.status || 'In Progress'}
                        </span>

                        <button
                          onClick={() => navigate('/projects')}
                          className="text-xs font-medium text-slate-500 hover:text-blue-600 cursor-pointer"
                        >
                          View Project
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center">
                    <FolderKanban size={26} />
                  </div>

                  <h3 className="font-semibold text-slate-900 mt-4">
                    No projects yet
                  </h3>

                  <p className="text-sm text-slate-500 mt-1">
                    Create your first project to get started.
                  </p>

                  <button
                    onClick={() => navigate('/projects/create')}
                    className="inline-flex items-center gap-2 mt-5 px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition cursor-pointer"
                  >
                    <Plus size={17} />
                    Create Project
                  </button>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* ================================================= */}
        {/* RECENT TASKS */}
        {/* ================================================= */}

        <section className="bg-white border border-slate-200 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-semibold">Recent Tasks</h2>

              <p className="text-sm text-slate-500 mt-1">
                Keep track of your latest work.
              </p>
            </div>

            <button
              onClick={() => navigate('/projects')}
              className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 transition cursor-pointer"
            >
              View All
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Task List */}

          <div className="divide-y divide-slate-100">
            {projects.slice(1, 3).map((task) => (
              <div
                key={task.id}
                className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition"
              >
                <div className="shrink-0 text-slate-400">
                  <Circle size={17} />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-slate-800 truncate">
                    {task.projectName || 'Untitled Task'}
                  </h3>

                  <p className="text-xs text-slate-400 mt-1">
                    {task.description}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium shrink-0 ${getStatusStyle(
                    task.status,
                  )}`}
                >
                  {task.status}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ================================================= */}
        {/* PROJECT ANALYTICS */}
        {/* ================================================= */}

        <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm mt-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                Project Analytics
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Overview of your projects by status.
              </p>
            </div>

            <button
              onClick={() => navigate('/projects')}
              className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 transition cursor-pointer"
            >
              View Projects
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Graph */}

          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={projectAnalytics}
                margin={{
                  top: 10,
                  right: 10,
                  left: 0,
                  bottom: 10,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />

                <XAxis dataKey="status" axisLine={false} tickLine={false} />

                <YAxis
                  allowDecimals={false}
                  axisLine={false}
                  tickLine={false}
                />

                <Tooltip cursor={{ opacity: 0.1 }} />

                <Bar
                  dataKey="projects"
                  name="Projects"
                  radius={[8, 8, 0, 0]}
                  barSize={55}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Dashboard
