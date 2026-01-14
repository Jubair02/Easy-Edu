import React, { useEffect, useState } from 'react';

const Rating = ({ initialRating = 0, onRate }) => {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(0); // State for hover effect

  const handleRating = (value) => {
    setRating(value);
    if (onRate) onRate(value);
  };

  useEffect(() => {
    setRating(initialRating);
  }, [initialRating]);

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }, (_, index) => {
        const starValue = index + 1;
        
        // Determine if this star should be colored (active)
        // It is active if it's less than or equal to the hover state (if hovering)
        // OR less than or equal to the actual rating (if not hovering)
        const isActive = starValue <= (hover || rating);

        return (
          <button
            key={index}
            type="button" // Prevent form submission
            className={`transition-transform duration-200 hover:scale-110 focus:outline-none 
              ${isActive ? 'text-yellow-400' : 'text-gray-300'}`}
            onClick={() => handleRating(starValue)}
            onMouseEnter={() => setHover(starValue)}
            onMouseLeave={() => setHover(0)}
          >
            {/* SVG Star Icon for high quality rendering */}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="currentColor" 
              className="w-6 h-6 sm:w-8 sm:h-8" // Responsive sizes
            >
              <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
            </svg>
          </button>
        );
      })}
    </div>
  );
};

export default Rating;