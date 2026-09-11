import React, { useState } from 'react'
import { Search, Plus, SlidersHorizontal, ArrowLeft } from 'lucide-react'
import ProjectCard from '../components/ProjectCard'
import { useNavigate } from 'react-router-dom'
import { useProject } from '../context/ProjectContext'

const Projects = () => {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()
  const { projects } = useProject()

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 ">
      {/* Back Button */}
      <button
        onClick={() => navigate('/dashboard')}
        className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition mb-6 cursor-pointer"
      >
        <ArrowLeft size={17} />
        Back to Dashboard
      </button>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Projects</h1>

          <p className="text-slate-500 mt-1">
            Manage and track all your projects in one place.
          </p>
        </div>

        {/* Create Project Button */}
        <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition cursor-pointer">
          <Plus size={18} />
          Create Project
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        {/* Search */}
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects..."
            className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
          />
        </div>

        {/* Filter */}
        <button className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition cursor-pointer">
          <SlidersHorizontal size={17} />
          Filter
        </button>
      </div>

      {/* Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>
    </div>
  )
}

export default Projects
