import React from 'react'

const Rating = ({rating}) => {
  return (
     <div style={{ display: "flex", gap: 4 }}>
      {[...Array(rating)].map((_, i) => {
        const starValue = i + 1;
        return (
          <span
            key={starValue}
            style={{
              cursor: "pointer",
              fontSize: 32,
              color: "#B55D51",
              transition: "color 0.2s",
            }}
            
          >
            ★
          </span>
        );
      })}
    </div>
  )
}

export default Rating