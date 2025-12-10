import React, { useState, useEffect, useRef } from 'react'
import './Slideshow.css'

function Slideshow({ images, active, onSlideChange }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const prevActiveRef = useRef(active)

  // Handle manual slide changes
  const handleSlideChange = (newIndex) => {
    setCurrentIndex(newIndex)
    if (onSlideChange) onSlideChange(newIndex)
  }

  useEffect(() => {
    // Only reset to 0 when transitioning from inactive to active
    if (active && !prevActiveRef.current) {
      setCurrentIndex(0)
      if (onSlideChange) onSlideChange(0)
    }
    prevActiveRef.current = active

    // Auto-advance disabled - slides only change manually via dots
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])

  if (!images || images.length === 0) return null

  return (
    <div className="slideshow-container">
      <div className="slideshow-wrapper">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index + 1}`}
            className={`slideshow-image ${index === currentIndex ? 'active' : ''}`}
            style={index === currentIndex ? { position: 'relative' } : {}}
          />
        ))}
      </div>
      <div className="slideshow-dots">
        {images.map((_, index) => (
          <button
            key={index}
            className={`slideshow-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => handleSlideChange(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default Slideshow

