import { Routes, Route, Navigate } from 'react-router-dom'
import { useContext } from 'react'

import Dashboard from './pages/Daskboard'
import Login from './pages/Login'
import Register from './pages/Register'

import { AuthContext } from './context/AuthContext'
import Navbar from './components/Navbar'
import Projects from './pages/Projects'
import CreateProject from './pages/CreateProject'
import Profile from './pages/Profile'
import Footer from './components/Footer'
import ProjectDetails from './pages/ProjectDetails'
import EditProject from './pages/EditProject'
import Tasks from './pages/Tasks'
import CreateTask from './pages/CreateTask'
import TaskDetails from './pages/TaskDetails'
import EditTask from './pages/EditTask'
function App() {
  const { userData, loading } = useContext(AuthContext)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Checking authentication...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar - only for logged-in users */}
      {userData && <Navbar />}

      {/* Main Content */}
      <main className="flex-1">
        <Routes>
          {/* Login */}
          <Route
            path="/login"
            element={
              userData ? <Navigate to="/dashboard" replace /> : <Login />
            }
          />

          {/* Register */}
          <Route
            path="/register"
            element={
              userData ? <Navigate to="/dashboard" replace /> : <Register />
            }
          />

          {/* Dashboard */}
          <Route
            path="/dashboard"
            element={
              userData ? <Dashboard /> : <Navigate to="/login" replace />
            }
          />

          {/* Projects */}
          <Route
            path="/projects"
            element={userData ? <Projects /> : <Navigate to="/login" replace />}
          />

          {/* Create Project */}
          <Route
            path="/projects/create"
            element={
              userData ? <CreateProject /> : <Navigate to="/login" replace />
            }
          />

          {/* Profile */}
          <Route
            path="/profile"
            element={userData ? <Profile /> : <Navigate to="/login" replace />}
          />

          {/* Project Details */}
          <Route path="/projects/:id" element={<ProjectDetails />} />

          {/* Project Edit */}
          <Route path="/projects/:id/edit" element={<EditProject />} />

          {/* task */}

          <Route
            path="/tasks"
            element={userData ? <Tasks /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/tasks"
            element={userData ? <Tasks /> : <Navigate to="/login" replace />}
          />

          <Route
            path="/tasks/create"
            element={
              userData ? <CreateTask /> : <Navigate to="/login" replace />
            }
          />

          <Route
            path="/tasks/:id"
            element={
              userData ? <TaskDetails /> : <Navigate to="/login" replace />
            }
          />

          <Route
            path="/tasks/:id/edit"
            element={userData ? <EditTask /> : <Navigate to="/login" replace />}
          />

          <Route
            path="/projects/:id/tasks/create"
            element={
              userData ? <CreateTask /> : <Navigate to="/login" replace />
            }
          />

          {/* Other routes */}
          <Route
            path="*"
            element={
              <Navigate to={userData ? '/dashboard' : '/login'} replace />
            }
          />
        </Routes>
      </main>

      {/* Footer - only for logged-in users */}
      {userData && <Footer />}
    </div>
  )
}

export default App
