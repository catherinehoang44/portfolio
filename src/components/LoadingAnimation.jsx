import React, { useState, useEffect } from 'react'
import aboutBg from '../assets/about-bg.jpg'
import catBefore from '../assets/cat-before.png'
import catAfter from '../assets/cat-after.png'
import './LoadingAnimation.css'

function LoadingAnimation({ onComplete }) {
  const [animationStage, setAnimationStage] = useState('initial') // initial -> slide-up -> hold-center -> scale-up -> hold-scaled -> fade-out
  const [showAfter, setShowAfter] = useState(false)

  useEffect(() => {
    // Mark that loading animation has started (for pages to know)
    sessionStorage.setItem('loadingAnimationStarted', 'true')
    
    // Start slide-up animation immediately
    setAnimationStage('slide-up')
    
    // Stage 1: Slide up to center (0.5s)
    const slideUpTimer = setTimeout(() => {
      setAnimationStage('hold-center') // Hold at center for 0.4s
    }, 500)

    // Stage 2: Hold at center (0.4s)
    const holdCenterTimer = setTimeout(() => {
      setAnimationStage('scale-up')
      setShowAfter(true) // Switch to cat-after.png when scale starts
    }, 900) // 500ms (slide-up) + 400ms (hold-center)

    // Stage 3: Scale up with bounce (0.4s)
    const scaleUpTimer = setTimeout(() => {
      setAnimationStage('hold-scaled') // Hold at scaled size for 0.15s
    }, 1300) // 900ms + 400ms (scale-up with bounce)

    // Stage 4: Hold at scaled size (0.15s)
    const holdScaledTimer = setTimeout(() => {
      setAnimationStage('fade-out')
      setShowAfter(false) // Switch back to cat-before.png when shrinking
    }, 1450) // 1300ms + 150ms (hold-scaled)

    // Stage 5: Scale back and fade out (0.4s)
    const fadeOutTimer = setTimeout(() => {
      // Mark that loading animation has completed
      sessionStorage.setItem('loadingAnimationCompleted', 'true')
      // Dispatch custom event to notify pages
      window.dispatchEvent(new CustomEvent('loadingAnimationCompleted'))
      if (onComplete) {
        onComplete()
      }
    }, 1850) // 1450ms + 400ms (fade-out)

    return () => {
      clearTimeout(slideUpTimer)
      clearTimeout(holdCenterTimer)
      clearTimeout(scaleUpTimer)
      clearTimeout(holdScaledTimer)
      clearTimeout(fadeOutTimer)
    }
  }, [onComplete])

  return (
    <div className={`loading-animation ${animationStage}`}>
      <img 
        src={aboutBg} 
        alt="" 
        className="loading-bg"
      />
      <div className="loading-cat-container">
        <img 
          src={showAfter ? catAfter : catBefore} 
          alt="Cat" 
          className="loading-cat"
        />
      </div>
    </div>
  )
}

export default LoadingAnimation

