import React, { useState, useEffect, useRef } from 'react'
import './Slideshow.css'

function Slideshow({ images, active, onSlideChange }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const prevActiveRef = useRef(active)
  const touchStartX = useRef(null)
  const touchStartY = useRef(null)

  // Handle manual slide changes
  const handleSlideChange = (newIndex) => {
    setCurrentIndex(newIndex)
    if (onSlideChange) onSlideChange(newIndex)
  }

  // Navigate to next slide
  const goToNext = () => {
    const nextIndex = (currentIndex + 1) % images.length
    handleSlideChange(nextIndex)
  }

  // Navigate to previous slide
  const goToPrevious = () => {
    const prevIndex = (currentIndex - 1 + images.length) % images.length
    handleSlideChange(prevIndex)
  }

  // Handle click on media to go to next slide
  const handleMediaClick = (e) => {
    // Don't trigger if clicking on dots
    if (e.target.closest('.slideshow-dots')) {
      return
    }
    goToNext()
  }

  // Handle touch start for swipe detection
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
  }

  // Handle touch move to detect swipe
  const handleTouchMove = (e) => {
    if (touchStartX.current === null || touchStartY.current === null) {
      return
    }

    const touchEndX = e.touches[0].clientX
    const touchEndY = e.touches[0].clientY
    const diffX = touchStartX.current - touchEndX
    const diffY = touchStartY.current - touchEndY

    // Only process horizontal swipes (ignore vertical scrolling)
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 10) {
      e.preventDefault() // Prevent scrolling while swiping
    }
  }

  // Handle touch end to complete swipe
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null || touchStartY.current === null) {
      return
    }

    const touchEndX = e.changedTouches[0].clientX
    const touchEndY = e.changedTouches[0].clientY
    const diffX = touchStartX.current - touchEndX
    const diffY = touchStartY.current - touchEndY

    // Minimum swipe distance
    const minSwipeDistance = 50

    // Check if it's a horizontal swipe
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > minSwipeDistance) {
      if (diffX > 0) {
        // Swipe left - go to next
        goToNext()
      } else {
        // Swipe right - go to previous
        goToPrevious()
      }
    }

    // Reset touch coordinates
    touchStartX.current = null
    touchStartY.current = null
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
      <div 
        className="slideshow-wrapper"
        onClick={handleMediaClick}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ cursor: 'pointer' }}
      >
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

