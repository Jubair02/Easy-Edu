import React, { useContext, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import Footer from '../../Components/Student/Footer'
import { useNavigate } from 'react-router-dom'

const MyEnrollments = () => {
  const { enrolledCourses, calculateCourseDuration } = useContext(AppContext)
  const navigate = useNavigate() // Best practice: use the hook directly

  const [progressArray, setProgressArray] = useState([
    { lectureCompleted: 2, totalLectures: 4 },
    { lectureCompleted: 1, totalLectures: 5 },
    { lectureCompleted: 6, totalLectures: 6 },
    { lectureCompleted: 3, totalLectures: 8 },
    { lectureCompleted: 4, totalLectures: 10 },
    { lectureCompleted: 5, totalLectures: 12 },
    { lectureCompleted: 6, totalLectures: 14 },
    { lectureCompleted: 2, totalLectures: 7 },
    { lectureCompleted: 3, totalLectures: 9 },
    { lectureCompleted: 4, totalLectures: 11 },
    { lectureCompleted: 4, totalLectures: 4 },
    { lectureCompleted: 2, totalLectures: 5 },
    { lectureCompleted: 3, totalLectures: 6 },
    { lectureCompleted: 4, totalLectures: 8 },
  ])

  return (
    <>
      <div className='max-w-7xl mx-auto px-4 sm:px-8 pt-14 pb-20 min-h-screen'>
        
        {/* Page Header */}
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-900'>My Enrollments</h1>
          <p className='text-gray-500 mt-2'>Manage your courses and track your progress.</p>
        </div>

        {/* Table Container */}
        <div className='bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden'>
          <div className='overflow-x-auto'>
            <table className='w-full min-w-[800px]'>
              
              {/* Table Head */}
              <thead className='bg-gray-50 border-b border-gray-200'>
                <tr>
                  <th className='px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider'>
                    Course Details
                  </th>
                  <th className='px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider'>
                    Duration
                  </th>
                  <th className='px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider'>
                    Progress
                  </th>
                  <th className='px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider'>
                    Status
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className='divide-y divide-gray-100'>
                {enrolledCourses.map((course, index) => {
                  
                  // Calculate Progress Logic for this specific row
                  const progress = progressArray[index]
                  const completed = progress ? progress.lectureCompleted : 0
                  const total = progress ? progress.totalLectures : 1 // prevent divide by zero
                  const progressPercent = Math.round((completed / total) * 100)
                  const isCompleted = progressPercent === 100

                  return (
                    <tr 
                      key={index} 
                      className='hover:bg-gray-50 transition-colors duration-200 group'
                    >
                      {/* Course Column */}
                      <td className='px-6 py-6'>
                        <div className='flex items-center gap-4'>
                          <div className='flex-shrink-0 relative rounded-lg overflow-hidden border border-gray-200'>
                            <img 
                              src={course.courseThumbnail} 
                              alt={course.courseTitle} 
                              className='w-16 h-16 sm:w-24 sm:h-16 object-cover group-hover:scale-105 transition-transform duration-300' 
                            />
                          </div>
                          <div className='max-w-xs'>
                            <h3 className='text-base font-semibold text-gray-900 line-clamp-2'>
                              {course.courseTitle}
                            </h3>
                            <p className='text-xs text-gray-500 mt-1'>
                              {/* If you have instructor data, use course.educator.name */}
                              By Educator
                            </p>
                          </div>
                        </div>
                      </td> 

                      {/* Duration Column */}
                      <td className='px-6 py-6 whitespace-nowrap text-sm text-gray-600 font-medium'>
                        {calculateCourseDuration(course)}
                      </td>

                      {/* Progress Column */}
                      <td className='px-6 py-6'>
                        <div className='w-full max-w-[150px]'>
                          <div className='flex justify-between mb-1'>
                            <span className='text-xs text-gray-600 font-medium'>
                              {completed} / {total} Lectures
                            </span>
                            <span className='text-xs text-blue-600 font-bold'>
                              {progressPercent}%
                            </span>
                          </div>
                          {/* Progress Bar Background */}
                          <div className='w-full bg-gray-200 rounded-full h-2'>
                            {/* Dynamic Progress Bar Fill */}
                            <div 
                              className={`h-2 rounded-full transition-all duration-500 ${isCompleted ? 'bg-green-500' : 'bg-blue-600'}`}
                              style={{ width: `${progressPercent}%` }} 
                            ></div>
                          </div>
                        </div>
                      </td>

                      {/* Status Column */}
                      <td className='px-6 py-6 whitespace-nowrap'>
                        <button 
                          className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-colors border 
                            ${isCompleted 
                              ? 'bg-green-50 text-green-600 border-green-100 hover:bg-green-100' 
                              : 'bg-blue-50 text-blue-600 border-blue-100 hover:bg-blue-100'
                            }`}
                          onClick={() => navigate('/player/' + course._id)}
                        >
                          {isCompleted ? 'Completed' : 'On Going'}
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          
          {/* Empty State */}
          {enrolledCourses.length === 0 && (
            <div className='p-12 text-center text-gray-500'>
              No enrollments found.
            </div>
          )}
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default MyEnrollments