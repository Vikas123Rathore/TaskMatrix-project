import { useEffect, useState } from 'react'
import { ArrowLeft, Sparkles } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import axios from 'axios'

import { useTask } from '../context/TaskContext'
import { useProject } from '../context/ProjectContext'
import api from '../api/axios'

const CreateTask = () => {
  const { id: projectId } = useParams()
  const navigate = useNavigate()

  const { createTask, loading } = useTask()
  const { getProject } = useProject()

  const [project, setProject] = useState(null)
  const [error, setError] = useState('')

  // ==============================
  // AI STATES
  // ==============================

  const [aiInput, setAiInput] = useState('')
  const [aiResponse, setAiResponse] = useState(null)
  const [aiLoading, setAiLoading] = useState(false)

  // ==============================
  // TASK FORM
  // ==============================

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    status: 'Pending',
    dueDate: '',
  })

  // ==============================
  // GET PROJECT
  // ==============================

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await getProject(projectId)

        console.log('Loaded Project:', data)

        setProject(data)
      } catch (error) {
        console.error('Get Project Error:', error)

        setError('Failed to load project')
      }
    }

    fetchProject()
  }, [projectId])

  // ==============================
  // HANDLE TASK INPUT
  // ==============================

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // ==============================
  // AI TASK GENERATOR
  // ==============================

  const generateWithAI = async () => {
    if (!aiInput.trim()) {
      toast.error('Please enter a task idea')
      return
    }

    try {
      setAiLoading(true)
      setError('')

      console.log('AI Input:', aiInput)

      const response = await api.post(
        '/ai/generate-task',
        {
          title: aiInput,
        },
        {
          withCredentials: true,
        },
      )

      console.log('AI API Response:', response.data)

      const result = JSON.parse(response.data.response)

      console.log('Parsed AI Response:', result)

      setAiResponse(result)

      toast.success('AI suggestion generated')
    } catch (error) {
      console.error('AI Error:', error)

      toast.error(
        error.response?.data?.message || 'Failed to generate AI suggestion',
      )
    } finally {
      setAiLoading(false)
    }
  }

  // ==============================
  // CREATE TASK
  // ==============================

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setError('')

      const taskData = {
        title: formData.title,
        description: formData.description,
        project: projectId,
        priority: formData.priority,
        status: formData.status,
        dueDate: formData.dueDate || null,
      }

      console.log('Creating Task:', taskData)

      await createTask(taskData)

      console.log('Task Created Successfully')

      // toast.success('Task created successfully')

      navigate(`/projects/${projectId}`)
    } catch (error) {
      console.error('Create Task Error:', error)

      setError(error.response?.data?.message || 'Failed to create task')
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* ==============================
            BACK BUTTON
        ============================== */}

        <button
          onClick={() => navigate(`/projects/${projectId}`)}
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Project
        </button>

        {/* ==============================
            HEADER
        ============================== */}

        <div className="mt-6">
          <h1 className="text-2xl font-bold text-slate-900">Create Task</h1>

          <p className="text-sm text-slate-500 mt-1">
            Add a new task to your project
          </p>
        </div>

        {/* ==============================
            FORM
        ============================== */}

        <form
          onSubmit={handleSubmit}
          className="bg-white border border-slate-200 rounded-2xl p-6 mt-6 shadow-sm"
        >
          {/* ==============================
              ERROR
          ============================== */}

          {error && (
            <div className="mb-5 p-3 rounded-lg bg-red-50 border border-red-100 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* ==============================
              PROJECT
          ============================== */}

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Project
            </label>

            <div className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-700">
              {project?.projectName || 'Loading project...'}
            </div>
          </div>

          {/* ==============================
              NORMAL TASK NAME
          ============================== */}

          <div className="mt-5">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Task Name
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter task name"
              className="w-full px-4 py-3 border border-slate-200 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
              required
            />
          </div>

          {/* =====================================================
              AI TASK GENERATOR
          ===================================================== */}

          <div className="mt-6 p-5 bg-purple-50 border border-purple-100 rounded-xl">
            {/* AI HEADER */}

            <div className="flex items-center gap-2 mb-2">
              <div className="w-9 h-9 rounded-lg bg-purple-600 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>

              <div>
                <h2 className="text-base font-semibold text-slate-900">
                  AI Task Generator
                </h2>

                <p className="text-xs text-slate-500">
                  Generate task details using AI
                </p>
              </div>
            </div>

            {/* AI INPUT */}

            <div className="mt-4">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Enter task idea
              </label>

              <input
                type="text"
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                placeholder="Enter your project name to get your subtask details"
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition"
              />
            </div>

            {/* AI BUTTON */}

            <button
              type="button"
              onClick={generateWithAI}
              disabled={aiLoading}
              className="mt-3 flex items-center gap-2 px-4 py-2.5 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              <Sparkles className="w-4 h-4" />

              {aiLoading ? 'Generating...' : 'Generate with AI'}
            </button>

            {/* ==============================
                AI RESPONSE
            ============================== */}

            {aiResponse && (
              <div className="mt-5 bg-white border border-purple-100 rounded-xl p-5">
                <h3 className="text-sm font-semibold text-slate-900 mb-4">
                  AI Suggestion
                </h3>

                {/* TITLE */}

                <div className="mb-4">
                  <p className="text-xs font-medium text-slate-500 uppercase">
                    Title
                  </p>

                  <p className="mt-1 text-sm text-slate-700">
                    {aiResponse.title}
                  </p>
                </div>

                {/* DESCRIPTION */}

                <div className="mb-4">
                  <p className="text-xs font-medium text-slate-500 uppercase">
                    Description
                  </p>

                  <p className="mt-1 text-sm text-slate-700 leading-relaxed">
                    {aiResponse.description}
                  </p>
                </div>

                {/* PRIORITY */}

                <div className="mb-4">
                  <p className="text-xs font-medium text-slate-500 uppercase">
                    Priority
                  </p>

                  <p className="mt-1 text-sm text-slate-700">
                    {aiResponse.priority}
                  </p>
                </div>

                {/* SUBTASKS */}

                <div className="mb-4">
                  <p className="text-xs font-medium text-slate-500 uppercase">
                    Subtasks
                  </p>

                  <ul className="mt-2 list-disc list-inside text-sm text-slate-700 space-y-1">
                    {aiResponse.subtasks?.map((subtask, index) => (
                      <li key={index}>{subtask}</li>
                    ))}
                  </ul>
                </div>

                {/* COMPLEXITY */}

                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase">
                    Complexity
                  </p>

                  <p className="mt-1 text-sm text-slate-700">
                    {aiResponse.complexity}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* ==============================
              DESCRIPTION
          ============================== */}

          <div className="mt-5">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter task description"
              rows="5"
              className="w-full px-4 py-3 border border-slate-200 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition resize-none"
              required
            />
          </div>

          {/* ==============================
              PRIORITY
          ============================== */}

          <div className="mt-5">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Priority
            </label>

            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-white outline-none focus:border-blue-500"
            >
              <option value="Low">Low</option>

              <option value="Medium">Medium</option>

              <option value="High">High</option>
            </select>
          </div>

          {/* ==============================
              STATUS
          ============================== */}

          <div className="mt-5">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Status
            </label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-white outline-none focus:border-blue-500"
            >
              <option value="Pending">Pending</option>

              <option value="In Progress">In Progress</option>

              <option value="Completed">Completed</option>
            </select>
          </div>

          {/* ==============================
              DUE DATE
          ============================== */}

          <div className="mt-5">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Due Date
            </label>

            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-slate-200 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
            />
          </div>

          {/* ==============================
              BUTTONS
          ============================== */}

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate(`/projects/${projectId}`)}
              className="px-5 py-2.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition"
            >
              {loading ? 'Creating...' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateTask
