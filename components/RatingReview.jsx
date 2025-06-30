// StarRating.jsx
import React, { useState } from "react";

const StarRating = ({ value = 0, onChange, max = 5, size = 32, color = "#B55D51" }) => {
  const [hovered, setHovered] = useState(0);

  return (
    <div style={{ display: "flex", gap: 4 }}>
      {[...Array(max)].map((_, i) => {
        const starValue = i + 1;
        return (
          <span
            key={starValue}
            style={{
              cursor: "pointer",
              fontSize: size,
              color: starValue <= (hovered || value) ? color : "#e5e7eb",
              transition: "color 0.2s",
            }}
            onClick={(e) => 
              { e.stopPropagation();
                onChange && onChange(starValue)}}
            onMouseEnter={() => setHovered(starValue)}
            onMouseLeave={() => setHovered(0)}
            role="button"
            aria-label={`Rate ${starValue} star${starValue > 1 ? "s" : ""}`}
          >
            ★
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;