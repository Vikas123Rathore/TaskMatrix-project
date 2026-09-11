import React from 'react'
import { NavLink } from 'react-router-dom'
import { ArrowUpRight, Mail } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
          {/* Brand */}
          <div className="max-w-sm">
            <NavLink to="/dashboard">
              <h2 className="text-2xl font-bold tracking-tight">
                Task<span className="text-blue-500">Matrix</span>
              </h2>
            </NavLink>

            <p className="text-sm text-slate-400 leading-6 mt-3">
              A simple and powerful project management platform built to help
              teams organize work and get things done.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3">
              <NavLink
                to="/dashboard"
                className="text-sm text-slate-400 hover:text-white transition"
              >
                Dashboard
              </NavLink>

              <NavLink
                to="/projects"
                className="text-sm text-slate-400 hover:text-white transition"
              >
                Projects
              </NavLink>

              <NavLink
                to="/profile"
                className="text-sm text-slate-400 hover:text-white transition"
              >
                Profile
              </NavLink>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Contact</h3>

            <a
              href="mailto:support@taskmatrix.com"
              className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition"
            >
              <Mail size={16} />
              support@taskmatrix.com
            </a>

            <a
              href="https://github.com/Vikas123Rathore/prodesk-capstone-taskmatrix"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition mt-3"
            >
              GitHub
              <ArrowUpRight size={15} />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 mt-10 pt-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-slate-500">
              © {new Date().getFullYear()} TaskMatrix. All rights reserved.
            </p>

            <p className="text-xs text-slate-500">Built with React & Node.js</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
