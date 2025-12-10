import React, { useState, useEffect, useRef } from 'react'
import './Slideshow.css'

function VideoSlideshow({ videos, active, onSlideChange }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const prevActiveRef = useRef(active)
  const videoRefs = useRef([])

  // Handle manual slide changes
  const handleSlideChange = (newIndex) => {
    // Pause current video
    if (videoRefs.current[currentIndex]) {
      videoRefs.current[currentIndex].pause()
      videoRefs.current[currentIndex].currentTime = 0
    }
    
    setCurrentIndex(newIndex)
    if (onSlideChange) onSlideChange(newIndex)
    
    // Autoplay new video
    if (videoRefs.current[newIndex] && active) {
      const video = videoRefs.current[newIndex]
      video.currentTime = 0
      video.play().catch(err => console.log('Video autoplay prevented:', err))
    }
  }

  useEffect(() => {
    // Only reset to 0 when transitioning from inactive to active
    if (active && !prevActiveRef.current) {
      setCurrentIndex(0)
      if (onSlideChange) onSlideChange(0)
      // Reset all videos
      videoRefs.current.forEach(video => {
        if (video) {
          video.pause()
          video.currentTime = 0
        }
      })
    }
    prevActiveRef.current = active
  }, [active, onSlideChange])

  // Autoplay active video
  useEffect(() => {
    if (active && videoRefs.current[currentIndex]) {
      const video = videoRefs.current[currentIndex]
      video.currentTime = 0
      video.play().catch(err => console.log('Video autoplay prevented:', err))
    }
  }, [active, currentIndex])

  const handleVideoMouseEnter = (e, index) => {
    if (index === currentIndex) {
      const video = e.target
      video.currentTime = 0
      video.play().catch(err => console.log('Video hover play prevented:', err))
    }
  }

  if (!videos || videos.length === 0) return null

  return (
    <div className="slideshow-container">
      <div className="slideshow-wrapper">
        {videos.map((video, index) => (
          <video
            key={index}
            ref={el => videoRefs.current[index] = el}
            src={video}
            className={`slideshow-image ${index === currentIndex ? 'active' : ''}`}
            style={index === currentIndex ? { position: 'relative' } : {}}
            muted
            playsInline
            autoPlay
            loop
            onMouseEnter={(e) => handleVideoMouseEnter(e, index)}
          />
        ))}
      </div>
      <div className="slideshow-dots">
        {videos.map((_, index) => (
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

export default VideoSlideshow

