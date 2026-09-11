import { useProject } from '../context/ProjectContext'
import { useNavigate } from 'react-router-dom'
const ProjectCard = ({ project }) => {
  const { getProject } = useProject()
  const navigate = useNavigate()
  const viewProject = async () => {
    try {
      await getProject(project._id)
      navigate(`/projects/${project._id}`)
    } catch (error) {
      console.error('Unable to view project:', error)
    }
  }

  const editProject = async () => {
    try {
      await getProject(project._id)
      navigate(`/projects/${project._id}/edit`)
    } catch (error) {
      console.error('Unable to edit project:', error)
    }
  }

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition duration-200">
      {/* Card Header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            {project.projectName}{' '}
          </h3>

          <p className="text-sm text-slate-500 mt-1">{project.description} </p>
        </div>

        {/* More Button */}
        <button className="text-slate-400 hover:text-slate-700 text-xl">
          ⋮
        </button>
      </div>

      {/* Status */}
      <div className="mt-5">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600">
          <span className="w-2 h-2 rounded-full bg-blue-500"></span>
          {project.status}{' '}
        </span>
      </div>

      {/* Project Info */}
      <div className="mt-5 flex items-center justify-between text-sm">
        <div>
          <p className="text-slate-400">Tasks</p>
          <p className="font-semibold text-slate-800 mt-1">8 Tasks</p>
        </div>

        <div>
          <p className="text-slate-400">Created</p>
          <p className="font-semibold text-slate-800 mt-1">
            {project.createdAt
              ? new Date(project.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: '2-digit',
                  year: 'numeric',
                })
              : 'N/A'}
          </p>{' '}
        </div>
      </div>

      {/* Progress */}
      {/* Progress */}
      <div className="mt-5">
        <div className="flex justify-between text-xs mb-2">
          <span className="text-slate-500">Progress</span>
          <span className="font-medium text-slate-700">
            {project.status === 'Pending'
              ? '0%'
              : project.status === 'In Progress'
                ? '50%'
                : project.status === 'Completed'
                  ? '100%'
                  : '0%'}
          </span>
        </div>

        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 rounded-full transition-all duration-300"
            style={{
              width:
                project.status === 'Pending'
                  ? '0%'
                  : project.status === 'In Progress'
                    ? '50%'
                    : project.status === 'Completed'
                      ? '100%'
                      : '0%',
            }}
          ></div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
        <button
          className="text-sm font-medium text-blue-600 hover:text-blue-700 cursor-pointer"
          onClick={viewProject}
        >
          View Project →
        </button>

        <button
          className="text-sm text-slate-500 hover:text-slate-800 cursor-pointer"
          onClick={editProject}
        >
          Edit
        </button>
      </div>
    </div>
  )
}

export default ProjectCard
