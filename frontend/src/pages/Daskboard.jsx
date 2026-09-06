import {
  User,
  Mail,
  ShieldCheck,
  FolderKanban,
  ListTodo,
  CheckCircle2,
  Search,
  LogOut,
} from 'lucide-react'

import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const Dashboard = () => {
  const { userData, logout, actionLoading } = useContext(AuthContext)

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

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* ================= NAVBAR ================= */}
      <nav className="h-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl h-full mx-auto px-6 flex items-center justify-between gap-6">
          {/* Logo */}
          <div className="shrink-0">
            <h2 className="text-2xl font-bold tracking-tight">
              Task<span className="text-blue-600">Matrix</span>
            </h2>
          </div>

          {/* Search */}
          <div className="hidden md:flex flex-1 max-w-md relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
            />
          </div>

          {/* Logout */}
          <button
            onClick={logout}
            disabled={actionLoading}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <LogOut size={18} />

            <span className="hidden sm:block font-medium">
              {actionLoading ? 'Logging out...' : 'Logout'}
            </span>
          </button>
        </div>
      </nav>

      {/* ================= MAIN ================= */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight capitalize">
            Welcome, {userData.name} 👋
          </h1>

          <p className="text-slate-500 mt-2">
            Here's your TaskMatrix account overview.
          </p>
        </div>

        {/* ================= GRID ================= */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* ================= ACCOUNT DETAILS ================= */}
          <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            {/* Heading */}
            <div className="flex items-center gap-3 mb-7">
              <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div>

              <div>
                <h2 className="text-xl font-semibold">Account Details</h2>

                <p className="text-sm text-slate-500 mt-0.5">
                  Your account information
                </p>
              </div>
            </div>

            {/* Name */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center">
                <User className="w-5 h-5 text-slate-600" />
              </div>

              <div>
                <p className="text-sm text-slate-500">Name</p>

                <p className="font-medium text-slate-900 mt-0.5 capitalize">
                  {userData.name}
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-11 h-11 rounded-xl bg-purple-50 flex items-center justify-center">
                <Mail className="w-5 h-5 text-purple-600" />
              </div>

              <div>
                <p className="text-sm text-slate-500">Email</p>

                <p className="font-medium text-slate-900 mt-0.5">
                  {userData.email}
                </p>
              </div>
            </div>

            {/* Status */}
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center">
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

          {/* ================= QUICK OVERVIEW ================= */}
          <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            {/* Heading */}
            <div className="flex items-center gap-3 mb-7">
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
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Projects */}
              <div className="border border-slate-200 rounded-xl p-5 hover:border-blue-200 hover:shadow-sm transition">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center mb-4">
                  <FolderKanban className="w-5 h-5 text-blue-600" />
                </div>

                <p className="text-sm text-slate-500">Projects</p>

                <p className="text-3xl font-bold text-slate-900 mt-1">0</p>
              </div>

              {/* Tasks */}
              <div className="border border-slate-200 rounded-xl p-5 hover:border-orange-200 hover:shadow-sm transition">
                <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center mb-4">
                  <ListTodo className="w-5 h-5 text-orange-600" />
                </div>

                <p className="text-sm text-slate-500">Tasks</p>

                <p className="text-3xl font-bold text-slate-900 mt-1">0</p>
              </div>

              {/* Completed */}
              <div className="border border-slate-200 rounded-xl p-5 hover:border-green-200 hover:shadow-sm transition">
                <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                </div>

                <p className="text-sm text-slate-500">Completed</p>

                <p className="text-3xl font-bold text-slate-900 mt-1">0</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
