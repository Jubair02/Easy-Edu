import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { useParams } from 'react-router-dom'
import { assets } from '../../assets/assets'
import humanizeDuration from 'humanize-duration'
import YouTube from 'react-youtube'
import Footer from '../../Components/Student/Footer'
import Rating from '../../Components/Student/Rating'

const Player = () => {

  const { enrolledCourses, calculateChapterTime } = useContext(AppContext)
  const { courseId } = useParams()
  const [courseData, setCourseData] = useState(null)
  const [openSections, setOpenSections] = useState({})
  const [playerData, setPlayerData] = useState(null)

  // --- 1. Fetch Course Data ---
  const getCourseData = () => {
    const foundCourse = enrolledCourses.find((course) => course._id === courseId)
    setCourseData(foundCourse)
  }

  // --- 2. Accordion Toggle Logic ---
  const toggleSection = (index) => {
    setOpenSections(prev => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  // --- 3. Initial Load ---
  useEffect(() => {
    if (enrolledCourses.length > 0) {
      getCourseData()
    }
  }, [enrolledCourses, courseId])

  // --- 4. Safety Guard (Loading State) ---
  if (!courseData) {
    return <div className='min-h-screen flex items-center justify-center font-bold text-lg'>Loading Course...</div>
  }

  return (
    <>
      <div className='p-4 sm:p-10 flex flex-col-reverse md:flex-row gap-10 min-h-screen'>
        
        {/* --- LEFT SIDE: Course Content (Curriculum) --- */}
        <div className='md:w-1/2 max-w-xl'>
          
          {/* Header */}
          <div className="mb-4">
            <h2 className='text-xl font-bold'>Course Structure</h2>
            <p className="text-sm text-gray-500 mt-1">
              {courseData.courseContent.length} chapters
            </p>
          </div>

          {/* Accordion Container */}
          <div className="divide-y divide-gray-100 border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
            {courseData.courseContent.map((chapter, index) => (
              <div key={index} className="group">
                
                {/* Chapter Title Bar */}
                <div
                  className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-gray-50 transition-colors bg-white"
                  onClick={() => toggleSection(index)}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={assets.down_arrow_icon}
                      alt="toggle"
                      className={`w-3.5 h-3.5 transition-transform duration-300 ${openSections[index] ? 'rotate-180' : ''}`}
                    />
                    <h3 className="font-medium text-gray-800 text-base">{chapter.chapterTitle}</h3>
                  </div>
                  <span className="text-xs text-gray-500 font-medium bg-gray-100 px-2.5 py-1 rounded-full">
                     {calculateChapterTime(chapter)}
                  </span>
                </div>

                {/* Dropdown List of Lectures */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out bg-gray-50 ${openSections[index] ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <ul className="px-5 pb-4 pt-2 space-y-1">
                    {chapter.chapterContent.map((lecture, i) => (
                      <li
                        key={i}
                        className={`flex items-start gap-3 pl-2 py-2.5 rounded-md cursor-pointer transition-all duration-200 
                          ${playerData && playerData.lectureUrl === lecture.lectureUrl 
                            ? 'bg-blue-100 border-l-4 border-blue-600' 
                            : 'hover:bg-gray-200 border-l-4 border-transparent'
                          }`}
                        onClick={() => setPlayerData({
                          ...lecture,
                          chapter: index + 1,
                          lecture: i + 1
                        })}
                      >
                        {/* Icon */}
                        <img
                          src={playerData && playerData.lectureUrl === lecture.lectureUrl ? assets.blue_tick_icon : assets.play_icon}
                          alt="play"
                          className="w-4 h-4 mt-1 opacity-70"
                        />
                        
                        {/* Text Info */}
                        <div className="flex-1">
                          <p className={`text-sm font-medium ${playerData && playerData.lectureUrl === lecture.lectureUrl ? 'text-blue-700' : 'text-gray-700'}`}>
                            {lecture.lectureTitle}
                          </p>
                          <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                            <span>{humanizeDuration(lecture.lectureDuration * 60 * 1000, { units: ['h', 'm'], round: true })}</span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          <div className='flex items-center gap-2 py-3 mt-10'>
            <h1 className='text-xl font-bold'>Rate this Course :</h1>
            <Rating/>
          </div>
        </div>

        {/* --- RIGHT SIDE: Video Player --- */}
        <div className='md:w-1/2'>
          <div className='sticky top-24'>
            {playerData ? (
              <div className='bg-white p-5 rounded-xl shadow-lg border border-gray-100'>
                {/* YouTube Wrapper */}
                <div className='aspect-video rounded-lg overflow-hidden bg-black relative'>
                  <YouTube
                    videoId={playerData.lectureUrl.split('/').pop()} 
                    iframeClassName="w-full h-full absolute top-0 left-0"
                    opts={{
                      width: '100%',
                      height: '100%',
                      playerVars: { autoplay: 1 }
                    }}
                  />
                </div>
                
                {/* Video Details & Controls */}
                <div className='mt-5'>
                  <div className='flex items-start justify-between gap-4'>
                    <div>
                      <h1 className='text-xl font-bold text-gray-900 leading-tight'>
                        {playerData.lectureTitle}
                      </h1>
                      <p className='text-sm text-gray-500 mt-1'>
                        Chapter {playerData.chapter} • Lecture {playerData.lecture}
                      </p>
                    </div>
                    <button className='bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors shadow-md'>
                      {false ? 'Completed' : 'Mark Complete'}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              // Empty State (Initial View)
              <div className='bg-white p-8 rounded-xl border border-gray-200 shadow-sm text-center'>
                <div className='aspect-video rounded-lg overflow-hidden mb-6 relative group cursor-pointer'>
                   <img
                    src={courseData.courseThumbnail}
                    alt="Course Thumbnail"
                    className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                  />
                  <div className='absolute inset-0 bg-black/20 flex items-center justify-center'>
                    <div className='w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg'>
                       <img src={assets.play_icon} className='w-6 h-6 ml-1 opacity-80' alt="" />
                    </div>
                  </div>
                </div>
                <h2 className='text-2xl font-bold text-gray-800'>{courseData.courseTitle}</h2>
                <p className='text-gray-500 mt-2'>Select a lecture from the course content to start watching.</p>
              </div>
            )}
          </div>
        </div>

      </div>
      <Footer />
    </>
  )
}

export default Player