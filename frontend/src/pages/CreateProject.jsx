import React, { useState } from 'react'
import { ArrowLeft, FolderPlus, Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useProject } from '../context/ProjectContext'
import axios from 'axios'
import { toast } from 'react-hot-toast'

const CreateProject = () => {
  const navigate = useNavigate()
  const { loading, createProject } = useProject()

  // ==============================
  // AI STATES
  // ==============================

  const [aiInput, setAiInput] = useState('')
  const [aiResponse, setAiResponse] = useState(null)
  const [aiLoading, setAiLoading] = useState(false)

  // ==============================
  // PROJECT FORM
  // ==============================

  const [formData, setFormData] = useState({
    projectName: '',
    description: '',
    status: 'Pending',
  })

  // ==============================
  // HANDLE INPUT CHANGE
  // ==============================

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // ==============================
  // GENERATE PROJECT DESCRIPTION
  // WITH AI
  // ==============================

  const generateWithAI = async () => {
    if (!aiInput.trim()) {
      toast.error('Please enter a project name')
      return
    }

    try {
      setAiLoading(true)

      console.log('Sending project name to AI:', aiInput)

      const response = await axios.post(
        'http://localhost:8080/api/ai/generate-project',
        {
          projectName: aiInput,
        },
        {
          withCredentials: true,
        },
      )

      console.log('AI API Response:', response.data)

      const result = JSON.parse(response.data.response)

      console.log('Parsed AI Response:', result)

      setAiResponse(result)

      toast.success('Project description generated')
    } catch (error) {
      console.error('AI Frontend Error:', error)

      toast.error(
        error.response?.data?.message ||
          'Failed to generate project description',
      )
    } finally {
      setAiLoading(false)
    }
  }

  // ==============================
  // CREATE PROJECT
  // ==============================

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      console.log('Project Data:', formData)

      await createProject(formData)

      console.log('Project Created Successfully')

      toast.success('Project created successfully')

      setFormData({
        projectName: '',
        description: '',
        status: 'Pending',
      })

      setAiInput('')
      setAiResponse(null)

      navigate('/projects')
    } catch (error) {
      console.error('Create Project Error:', error)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      {/* ==============================
          BACK BUTTON
      ============================== */}

      <button
        onClick={() => navigate('/projects')}
        className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition mb-6 cursor-pointer"
      >
        <ArrowLeft size={17} />
        Back to Projects
      </button>

      {/* ==============================
          HEADER
      ============================== */}

      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <FolderPlus size={22} />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Create Project
            </h1>

            <p className="text-slate-500 mt-1">
              Create a new project and start managing your tasks.
            </p>
          </div>
        </div>
      </div>

      {/* ==============================
          FORM CARD
      ============================== */}

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ==============================
              PROJECT NAME
          ============================== */}

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Project Name
            </label>

            <input
              type="text"
              name="projectName"
              value={formData.projectName}
              onChange={handleChange}
              placeholder="Enter project name"
              required
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
            />
          </div>

          {/* =====================================================
              AI PROJECT GENERATOR
          ===================================================== */}

          <div className="p-5 bg-purple-50 border border-purple-100 rounded-xl">
            {/* AI HEADER */}

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-purple-600 text-white">
                <Sparkles size={19} />
              </div>

              <div>
                <h2 className="text-base font-semibold text-slate-900">
                  AI Project Generator
                </h2>

                <p className="text-xs text-slate-500 mt-0.5">
                  Generate a project description using AI
                </p>
              </div>
            </div>

            {/* AI INPUT */}

            <div className="mt-4">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Enter project idea
              </label>

              <input
                type="text"
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                placeholder="Example: E-commerce website"
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition"
              />
            </div>

            {/* AI BUTTON */}

            <button
              type="button"
              onClick={generateWithAI}
              disabled={aiLoading}
              className="mt-3 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Sparkles size={16} />

              {aiLoading ? 'Generating...' : 'Generate with AI'}
            </button>

            {/* ==============================
                AI RESPONSE
            ============================== */}

            {aiResponse && (
              <div className="mt-5 p-5 bg-white border border-purple-100 rounded-xl">
                <h3 className="text-sm font-semibold text-slate-900 mb-4">
                  AI Suggestion
                </h3>

                {/* PROJECT NAME */}

                <div className="mb-4">
                  <p className="text-xs font-medium text-slate-500 uppercase">
                    Project Name
                  </p>

                  <p className="mt-1 text-sm text-slate-700">
                    {aiResponse.projectName}
                  </p>
                </div>

                {/* DESCRIPTION */}

                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase">
                    Description
                  </p>

                  <p className="mt-1 text-sm text-slate-700 leading-relaxed">
                    {aiResponse.description}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* ==============================
              DESCRIPTION
          ============================== */}

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your project..."
              rows="5"
              required
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none resize-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
            />
          </div>

          {/* ==============================
              STATUS
          ============================== */}

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Status
            </label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition cursor-pointer"
            >
              <option value="Pending">Pending</option>

              <option value="In Progress">In Progress</option>

              <option value="Completed">Completed</option>
            </select>
          </div>

          {/* ==============================
              BUTTONS
          ============================== */}

          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-slate-100">
            {/* CANCEL */}

            <button
              type="button"
              onClick={() => navigate('/projects')}
              className="px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition cursor-pointer"
            >
              Cancel
            </button>

            {/* CREATE PROJECT */}

            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating...' : 'Create Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateProject
