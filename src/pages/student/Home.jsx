import React from 'react'
import Hero from '../../Components/Student/Hero'
import Companies from '../../Components/Student/Companies'
import CoursesSection from '../../Components/Student/CoursesSection'

const Home = () => {
  return (
    <div className='flex flex-col items-center space-y-7 text-center'
    >
      <Hero />
      <Companies/>
      <CoursesSection/>
    </div>
  )
}

export default Home
