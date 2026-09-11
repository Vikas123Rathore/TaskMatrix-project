import React, { useContext } from 'react'
import { User, Mail, Calendar, ShieldCheck, Edit3 } from 'lucide-react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
const Profile = () => {
  const { userData } = useContext(AuthContext)
  const navigate = useNavigate()



  // const userName = userData?.name || 'Vikas Rathore'
  // const userEmail = userData?.email || 'vikas@example.com'

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Profile</h1>

        <p className="text-slate-500 mt-1">Manage your account information.</p>
      </div>

      {/* Profile Header Card */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-5">
          {/* Avatar */}
          <div className="w-20 h-20 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
            <span className="text-2xl font-bold capitalize">
              {userData?.name?.charAt(0).toUpperCase() || 'V'}
            </span>
          </div>

          {/* User Info */}
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-slate-900 uppercase">{userData?.name || 'Vikas Rathore'}</h2>

            <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
              <Mail size={15} />
              {userData?.email || 'vikas@example.com'}
            </div>
          </div>

          {/* Edit Button */}
          <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition cursor-pointer">
            <Edit3 size={17} />
            Edit Profile
          </button>
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 mb-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-6">
          Personal Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Name */}
          <div className="p-4 bg-slate-50 rounded-xl">
            <div className="flex items-center gap-2 text-sm text-slate-400 mb-2 capitalize">
              <User size={16} />
              Full Name
            </div>

            <p className="font-medium text-slate-800 capitalize">{userData?.name || 'Vikas Rathore'}</p>
          </div>

          {/* Email */}
          <div className="p-4 bg-slate-50 rounded-xl">
            <div className="flex items-center gap-2 text-sm text-slate-400 mb-2">
              <Mail size={16} />
              Email Address
            </div>

            <p className="font-medium text-slate-800">{userData?.email || 'vikas@example.com'}</p>
          </div>
        </div>
      </div>

      {/* Account Information */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-6">
          Account Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Account Status */}
          <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
            <div className="w-10 h-10 rounded-lg bg-green-50 text-green-600 flex items-center justify-center">
              <ShieldCheck size={20} />
            </div>

            <div>
              <p className="text-sm text-slate-400">Account Status</p>

              <p className="font-medium text-green-600 mt-1">Active</p>
            </div>
          </div>

          {/* Member Since */}
          <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Calendar size={20} />
            </div>

            <div>
              <p className="text-sm text-slate-400">Member Since</p>

              <p className="font-medium text-slate-800 mt-1">September 2026</p>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom Navigation */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8 pb-4">
        <button
          onClick={() => navigate('/dashboard')}
          className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition duration-200 cursor-pointer"
        >
          Go to Dashboard
        </button>

        <button
          onClick={() => navigate('/projects')}
          className="w-full sm:w-auto px-6 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 hover:text-slate-900 transition duration-200 cursor-pointer"
        >
          View Projects
        </button>
      </div>
    </div>
  )
}

export default Profile
