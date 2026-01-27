import React, { useContext } from 'react'
import { assets } from '../../assets/assets'
import { Link, useLocation } from 'react-router-dom' // Added useLocation
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'
import { AppContext } from '../../context/AppContext'

const Navbar = () => {
  const { navigate, isEducator } = useContext(AppContext)
  const location = useLocation() // Correct way to get location

  const isCourseListPage = location.pathname.includes('/courses-list')
  const { openSignIn } = useClerk()
  const { user } = useUser()

  return (
    <div
      className={`sticky top-0 z-50 w-full transition-colors duration-300 border-b border-gray-200 ${
        isCourseListPage ? 'bg-white/90 backdrop-blur-md' : 'bg-cyan-100/90 backdrop-blur-md'
      }`}
    >
      <div className="flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 py-4 h-20">
        
        {/* --- Logo --- */}
        <img
          onClick={() => navigate('/Easy-Edu')}
          src={assets.logo}
          alt="Logo"
          className="w-28 lg:w-32 cursor-pointer transition-transform hover:scale-105 duration-200"
        />

        {/* --- Desktop Menu --- */}
        <div className="hidden md:flex items-center gap-8 text-gray-600 font-medium">
          {user && (
            <div className="flex items-center gap-6">
              <button 
                onClick={() => navigate('/educator')} 
                className="hover:text-blue-600 transition-colors duration-200"
              >
                {isEducator ? 'Educator Dashboard' : 'Become Educator'}
              </button>
              
              <Link 
                to="/my-enrollments" 
                className="hover:text-blue-600 transition-colors duration-200"
              >
                My Enrollments
              </Link>
            </div>
          )}

          {user ? (
            <div className="pl-4 border-l border-gray-300">
               <UserButton afterSignOutUrl="/" />
            </div>
          ) : (
            <button
              onClick={() => openSignIn()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full font-medium shadow-md transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
            >
              Create Account
            </button>
          )}
        </div>

        {/* --- Mobile Menu --- */}
        <div className="md:hidden flex items-center gap-4 text-gray-600">
          {user && (
            <div className="flex items-center gap-3 text-xs sm:text-sm">
              <button 
                onClick={() => navigate('/educator')}
                className="whitespace-nowrap hover:text-blue-600"
              >
                {isEducator ? 'Dashboard' : 'Educator'}
              </button>
              <span className="h-4 w-px bg-gray-400"></span>
              <Link 
                to="/my-enrollments"
                className="whitespace-nowrap hover:text-blue-600"
              >
                My Courses
              </Link>
            </div>
          )}

          {user ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <button onClick={() => openSignIn()}>
              <img src={assets.user_icon} alt="User" className="w-6 h-6 opacity-80" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar