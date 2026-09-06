import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthContext } from '../context/AuthContext'

const Register = () => {
  const navigate = useNavigate()

  const { register, actionLoading } = useContext(AuthContext)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    await register(formData.name, formData.email, formData.password)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-zinc-600 to-black flex items-center justify-center px-4">
      <div className="w-full max-w-5xl min-h-[600px] bg-zinc-900/80 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl grid md:grid-cols-2">
        {/* LEFT - FORM */}
        <div className="flex items-center justify-center p-8 md:p-12">
          <div className="w-full max-w-md">
            {/* Logo */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white">
                Task<span className="text-blue-500">Matrix</span>
              </h2>

              <p className="text-zinc-500 mt-2">
                Create your account and start managing tasks.
              </p>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label className="text-sm text-zinc-400">Full Name</label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                  className="w-full mt-2 px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 outline-none focus:border-blue-500 transition"
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-sm text-zinc-400">Email</label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className="w-full mt-2 px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 outline-none focus:border-blue-500 transition"
                />
              </div>

              {/* Password */}
              <div>
                <label className="text-sm text-zinc-400">Password</label>

                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="w-full mt-2 px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 outline-none focus:border-blue-500 transition"
                />
              </div>

              {/* Button */}
              <button
                type="submit"
                disabled={actionLoading}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-900 text-white font-semibold rounded-xl transition duration-200"
              >
                {actionLoading ? 'Please wait...' : 'Register'}
              </button>
            </form>

            {/* Login */}
            <div className="text-center mt-7">
              <p className="text-zinc-500 text-sm">
                Already have an account?
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="ml-2 text-blue-500 hover:text-blue-400 font-medium"
                >
                  Login
                </button>
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT - HERO */}
        <div className="hidden md:flex relative overflow-hidden bg-gradient-to-br from-blue-600 via-zinc-900 to-slate-700 items-center justify-center p-12">
          <div className="absolute w-72 h-72 bg-blue-600/20 rounded-full blur-3xl top-10 right-10" />

          <div className="relative z-10">
            <p className="text-green-600 font-bold mb-5 tracking-widest uppercase text-sm">
              Agile Project Management
            </p>

            <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
              Turn ideas
              <br />
              into
              <br />
              <span className="text-blue-500">action.</span>
            </h1>

            <p className="text-zinc-400 text-lg mt-7 max-w-md leading-relaxed">
              Plan smarter. Collaborate better. Track every task and move your
              projects forward with TaskMatrix.
            </p>

            <div className="flex gap-10 mt-10">
              <div>
                <h3 className="text-2xl font-bold text-white">100%</h3>

                <p className="text-zinc-500 text-sm mt-1">Organized</p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white">Fast</h3>

                <p className="text-zinc-500 text-sm mt-1">Collaboration</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
