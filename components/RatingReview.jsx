import React from 'react'
import { FaStar } from "react-icons/fa";

function RatingReview({rating}) {
  return (
    <div className='flex'>
      {[...Array(5)].map((_, index)  => {
        return (  
          <FaStar
          key={index}
          size={15}
          color={index < rating ? "#B55D51" : "#e4e5e9"} // Color based on rating
        />
        )
      })}
    </div>
  )
}

export default RatingReview;