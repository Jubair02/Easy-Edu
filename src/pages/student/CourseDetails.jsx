import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import Loading from '../../components/Student/Loading' // Ensure path matches new file
import { assets } from '../../assets/assets'
import humanizeDuration from 'humanize-duration'
import Footer from '../../Components/Student/Footer'
import YouTube from 'react-youtube'

const CourseDetails = () => {
  const { id } = useParams()
  const {
    allCourses,
    calculateRating,
    calculateNoOfLectures,
    calculateCourseDuration,
    calculateChapterTime,
    currency
  } = useContext(AppContext)

  const [courseData, setCourseData] = useState(null)
  const [openSections, setOpenSections] = useState({})
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false)
  const [playerData, setPlayerData] = useState(null)

  useEffect(() => {
    // Check if courses are loaded in context
    if (allCourses && allCourses.length > 0) {
      const findCourse = allCourses.find(course => course._id === id)
      setCourseData(findCourse || null)
    }
  }, [id, allCourses])

  // --- LOADING STATE ---
  // This will render immediately on refresh until courseData is found
  if (!courseData) {
    return <Loading />
  }

  const toggleSection = (index) => {
    setOpenSections(prev => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  return (
    <div className="relative min-h-screen bg-gray-50 text-gray-800">
      
      {/* --- Hero Background --- */}
      <div className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-b from-cyan-100/60 to-transparent -z-10" />

      {/* --- Main Content --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pt-16 pb-20">
        
        <div className="flex flex-col-reverse lg:flex-row gap-12">
          
          {/* --- LEFT COLUMN --- */}
          <div className="flex-1 space-y-8">
            
            {/* Header */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                {courseData.courseTitle}
              </h1>

              <div
                className="mt-4 text-gray-600 text-base leading-relaxed line-clamp-3"
                dangerouslySetInnerHTML={{
                  __html: courseData.courseDescription?.slice(0, 200) + '...',
                }}
              />

              {/* Ratings */}
              <div className="flex flex-wrap items-center gap-4 mt-5 text-sm md:text-base">
                <div className="flex items-center gap-1">
                  <span className="font-bold text-amber-500">{calculateRating ? calculateRating(courseData) : '4.5'}</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <img
                        key={i}
                        src={i < Math.floor(calculateRating ? calculateRating(courseData) : 4) ? assets.star : assets.star_blank}
                        alt=""
                        className="w-4 h-4"
                      />
                    ))}
                  </div>
                  <span className="text-gray-500 ml-1">
                    ({courseData.courseRatings?.length || 0} ratings)
                  </span>
                </div>
                
                <span className="hidden md:block w-px h-4 bg-gray-300"></span>

                <div className="text-gray-600">
                  {courseData.enrolledStudents?.length || 0} students enrolled
                </div>
              </div>

              <div className="mt-3 text-sm text-gray-500">
                Created by <span className="text-blue-600 font-medium hover:underline cursor-pointer">5 Minute School</span>
              </div>
            </div>

            {/* Structure Accordion */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                <h2 className="text-xl font-bold text-gray-900">Course Structure</h2>

                
                <p className="text-sm text-gray-500 mt-1">
                  {courseData.courseContent?.length || 0} chapters • {calculateNoOfLectures(courseData)} lectures • {calculateCourseDuration(courseData)} total length
                </p>
              </div>

              <div className="divide-y divide-gray-100">
                {courseData.courseContent?.length ? (
                  courseData.courseContent.map((chapter, index) => (
                    <div key={index} className="group">
                      <div
                        className="flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-blue-50/30 transition-colors"
                        onClick={() => toggleSection(index)}
                      >
                        <div className="flex items-center gap-3">
                          <img 
                            src={assets.down_arrow_icon} 
                            alt="toggle" 
                            className={`w-3.5 h-3.5 transition-transform duration-300 ${openSections[index] ? 'rotate-180' : ''}`} 
                          />
                          <h3 className="font-medium text-gray-800">{chapter.chapterTitle}</h3>
                        </div>
                        <span className="text-xs md:text-sm text-gray-500 font-medium bg-gray-100 px-2 py-1 rounded">
                          {chapter.chapterContent?.length || 0} lectures • {calculateChapterTime(chapter)}
                        </span>
                      </div>

                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          openSections[index] ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <ul className="px-6 pb-4 pt-1 space-y-2">
                          {chapter.chapterContent?.map((lecture, i) => (
                            <li key={i} className="flex items-start gap-3 pl-7 group/lecture">
                              <img src={assets.play_icon} alt="play" className="w-4 h-4 mt-1 opacity-60 group-hover/lecture:opacity-100 transition-opacity" />
                              <div className="flex-1">
                                <p className="text-sm text-gray-700 group-hover/lecture:text-blue-600 transition-colors">
                                  {lecture.lectureTitle}
                                </p>
                                <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                                  <span>{humanizeDuration(lecture.lectureDuration * 60 * 1000, { units: ['h', 'm'], round: true })}</span>
                                  {lecture.isPreviewFree && (
                                    <button 
                                      onClick={() => setPlayerData({ videoId: lecture.lectureUrl.split('/').pop() })} 
                                      className="text-blue-500 font-medium hover:underline"
                                    >
                                      Watch Preview
                                    </button>
                                  )}
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center text-gray-500">No chapters available yet.</div>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 md:p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Description</h3>
              <div
                className="prose prose-sm md:prose-base text-gray-600 max-w-none"
                dangerouslySetInnerHTML={{ __html: courseData.courseDescription }}
              />
            </div>
          </div>

          {/* --- RIGHT COLUMN --- */}
          <div className="lg:w-[380px] relative">
            <div className="lg:sticky lg:top-24 bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-2xl">
              
              <div className="relative w-full aspect-video bg-black group">
                {playerData ? (
                  <YouTube 
                    videoId={playerData.videoId} 
                    opts={{ playerVars: { autoplay: 1 } }} 
                    iframeClassName="w-full h-full"
                    className="w-full h-full"
                  />
                ) : (
                  <div className="relative w-full h-full cursor-pointer">
                     <img src={courseData.courseThumbnail} alt="Course Thumbnail" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 mb-4 text-red-500 bg-red-50 w-fit px-3 py-1 rounded-full">
                  <img src={assets.time_left_clock_icon} alt="clock" className="w-4 h-4" />
                  <span className="text-xs font-semibold">5 days left at this price!</span>
                </div>

                <div className="flex items-end gap-3 mb-6">
                  <span className="text-3xl font-bold text-gray-900">
                    {currency}{(courseData.coursePrice - (courseData.discount * courseData.coursePrice / 100)).toFixed(2)}
                  </span>
                  <span className="text-lg text-gray-400 line-through mb-1">
                    {currency}{courseData.coursePrice}
                  </span>
                  <span className="text-sm font-medium text-green-600 mb-1 bg-green-100 px-2 py-0.5 rounded">
                    {courseData.discount}% OFF
                  </span>
                </div>

                <button className="w-full py-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg shadow-lg hover:shadow-blue-500/30 transition-all duration-200 transform hover:-translate-y-0.5">
                  {isAlreadyEnrolled ? 'Go to Course' : 'Enroll Now'}
                </button>
                <p className="text-xs text-center text-gray-400 mt-3">30-Day Money-Back Guarantee</p>

                <div className="mt-8 pt-6 border-t border-gray-100">
                  <h4 className="font-semibold text-gray-900 mb-4">This course includes:</h4>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex items-center gap-3">
                       <img src={assets.lesson_icon} alt="lessons" className="w-4 h-4 opacity-70"/>
                       <span>{calculateNoOfLectures(courseData)} lessons</span>
                    </li>
                    <li className="flex items-center gap-3">
                       <img src={assets.time_clock_icon} alt="duration" className="w-4 h-4 opacity-70"/>
                       <span>{calculateCourseDuration(courseData)} of video content</span>
                    </li>
                    <li className="flex items-center gap-3">
                       <div className="w-4 flex justify-center"><span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span></div>
                       <span>Lifetime access with free updates</span>
                    </li>
                    <li className="flex items-center gap-3">
                       <div className="w-4 flex justify-center"><span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span></div>
                       <span>Downloadable resources</span>
                    </li>
                    <li className="flex items-center gap-3">
                       <div className="w-4 flex justify-center"><span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span></div>
                       <span>Certificate of completion</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  )
}

export default CourseDetails