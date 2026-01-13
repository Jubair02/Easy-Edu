import React from 'react'

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 z-50">
      <div className="flex flex-col items-center gap-3">
        {/* Spinner Ring */}
        <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
        
        {/* Optional Text */}
        <p className="text-gray-500 font-medium text-sm animate-pulse">
          Loading course data...
        </p>
      </div>
    </div>
  )
}

export default Loading