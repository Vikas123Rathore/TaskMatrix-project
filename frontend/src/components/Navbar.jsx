import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  FolderKanban,
  ListTodo,
  Plus,
  User,
  LogOut,
} from 'lucide-react'
import { AuthContext } from '../context/AuthContext'

const Navbar = () => {
  const { logout, actionLoading } = useContext(AuthContext)
  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: LayoutDashboard,
    },
    {
      name: 'Projects',
      path: '/projects',
      icon: FolderKanban,
    },
    {
      name: 'Tasks',
      path: '/tasks',
      icon: ListTodo,
    },
  ]

  return (
    <nav className="h-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl h-full mx-auto px-6 flex items-center justify-between">
        {/* Logo - Left Side */}
        <div className="shrink-0">
          <NavLink to="/dashboard">
            <h2 className="text-2xl font-bold tracking-tight">
              Task<span className="text-blue-600">Matrix</span>
            </h2>
          </NavLink>
        </div>

        {/* All Options - Right Side */}
        <div className="flex items-center gap-4">
          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition duration-200 ${
                      isActive
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`
                  }
                >
                  <Icon size={17} />
                  {item.name}
                </NavLink>
              )
            })}
          </div>

          {/* Create New */}
          <button
            onClick={() => navigate('/projects/create')}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition duration-200 cursor-pointer"
          >
            <Plus size={17} />
            <span className="hidden sm:block">Create New</span>
          </button>

          {/* Profile */}
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition duration-200 ${
                isActive
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`
            }
          >
            <User size={17} />
            <span className="hidden sm:block">Profile</span>
          </NavLink>

          {/* Logout */}
          <button
            onClick={logout}
            disabled={actionLoading}
            className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <LogOut size={17} />

            <span className="hidden sm:block font-medium">
              {actionLoading ? 'Logging out...' : 'Logout'}
            </span>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
