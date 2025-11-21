import React, { useEffect, useState, useRef } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import './CasePage.css'
import './AboutPage.css' // Import AboutPage.css for shared styles
import aboutBg from '../assets/about-bg.jpg'
import backIcon from '../assets/back-icon.svg'
import backHitbox from '../assets/back-hitbox.png'
import scopePng from '../assets/scope.png'
import hicksLawVideo from '../assets/hicks-law.mp4'
import highlightIcon from '../assets/highlight-icon.png'
import adobePlanPng from '../assets/adobe-plan.png'
import adobeFlowPng from '../assets/adobe-flow.png'
import test3Jpg from '../assets/test3.jpg'
import { workTitles } from '../constants/workTitles'

// ============================================
// DEBUG MODE - Set to true to show borders
// ============================================
const DEBUG_MODE = false

// Reusable Highlight Container Component
function HighlightContainer({ children }) {
  return (
    <div className="case-problem-highlight">
      <div className="case-problem-highlight-content">
        <div className="case-problem-highlight-inner-container">
          <div className="case-problem-highlight-layout">
            <img alt="" src={highlightIcon} className="case-problem-highlight-icon-img" />
            <p className="case-problem-highlight-text">
              {children}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Reusable TypeTag Component
function TypeTag({ children }) {
  return (
    <div className="media-type">
      <p className="media-type-text">{children}</p>
    </div>
  )
}

// Reusable Caption Component
function Caption({ number, text, type }) {
  return (
    <div className="case-imagery-caption">
      <p className="case-imagery-caption-text">
        <span className="case-imagery-caption-number">{number}</span>
        <span>{text}</span>
      </p>
      {type && <TypeTag>{type}</TypeTag>}
    </div>
  )
}

function CasePage() {
  const location = useLocation()
  const { projectName } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [activeImageId, setActiveImageId] = useState('section-1')
  
  // Define case sections based on project
  // Project 5 has specific sections: Overview, Problem, Strategy, Flow, Design, Retrospective
  // Project 14 (Pokemon: Cursor) has Demo section only
  const getCaseSections = () => {
    if (projectName === 'project-5') {
      return [
        { id: 'section-1', heading: 'Overview' },
        { id: 'section-2', heading: 'Problem' },
        { id: 'section-3', heading: 'Strategy' },
        { id: 'section-4', heading: 'Flow' },
        { id: 'section-5', heading: 'Design' },
        { id: 'section-6', heading: 'Retrospective' }
      ]
    }
    if (projectName === 'project-14') {
      return [
        { id: 'Demo', heading: 'Demo' }
      ]
    }
    // Default sections for other projects
    return [
      { id: 'section-1', heading: 'Section 1' },
      { id: 'section-2', heading: 'Section 2' },
      { id: 'section-3', heading: 'Section 3' }
    ]
  }
  
  const caseSections = getCaseSections()

  // Set initial active section to first section
  useEffect(() => {
    const sections = getCaseSections()
    if (sections.length > 0) {
      setActiveImageId(sections[0].id)
    }
    // For project-14, set to Demo section
    if (projectName === 'project-14') {
      setActiveImageId('Demo')
    }
  }, [projectName])

  useEffect(() => {
    window.scrollTo(0, 0)
    setIsLoading(true)
    
    // Check if loading animation was shown
    const loadingStarted = sessionStorage.getItem('loadingAnimationStarted')
    const loadingCompleted = sessionStorage.getItem('loadingAnimationCompleted')
    
    // If loading animation was shown but not yet completed, wait for completion event
    if (loadingStarted && !loadingCompleted) {
      const handleLoadingComplete = () => {
        setIsLoading(false)
        window.removeEventListener('loadingAnimationCompleted', handleLoadingComplete)
      }
      window.addEventListener('loadingAnimationCompleted', handleLoadingComplete)
      return () => {
        window.removeEventListener('loadingAnimationCompleted', handleLoadingComplete)
      }
    } else {
      // Loading already completed or not started, start immediately
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [location])

  // Initial load animation
  useEffect(() => {
    setIsLoading(true)
    
    // Check if loading animation was shown
    const loadingStarted = sessionStorage.getItem('loadingAnimationStarted')
    const loadingCompleted = sessionStorage.getItem('loadingAnimationCompleted')
    
    // If loading animation was shown but not yet completed, wait for completion event
    if (loadingStarted && !loadingCompleted) {
      const handleLoadingComplete = () => {
        setIsLoading(false)
        window.removeEventListener('loadingAnimationCompleted', handleLoadingComplete)
      }
      window.addEventListener('loadingAnimationCompleted', handleLoadingComplete)
      return () => {
        window.removeEventListener('loadingAnimationCompleted', handleLoadingComplete)
      }
    } else {
      // Loading already completed or not started, start immediately
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [])

  // Intersection Observer to detect which section is visible
  useEffect(() => {
    // Skip observer for project-14 (no scrolling sections)
    if (projectName === 'project-14') {
      return
    }

    const textContainer = document.querySelector('.case-text-container')
    if (!textContainer) return

    const observerOptions = {
      root: textContainer,
      rootMargin: '-50% 0px -50% 0px', // Trigger when section is centered
      threshold: 0
    }

    const observerCallback = (entries) => {
      // Always find the section closest to center (works for both scrolling up and down)
      const containerRect = textContainer.getBoundingClientRect()
      const containerCenter = containerRect.top + containerRect.height / 2
      
      let closestSection = null
      let closestDistance = Infinity
      
      caseSections.forEach((section) => {
        const sectionElement = document.getElementById(section.id)
        if (sectionElement) {
          const sectionRect = sectionElement.getBoundingClientRect()
          const sectionCenter = sectionRect.top + sectionRect.height / 2
          const distance = Math.abs(sectionCenter - containerCenter)
          
          // Only consider sections that are within the viewport
          if (sectionRect.bottom >= containerRect.top && sectionRect.top <= containerRect.bottom) {
            if (distance < closestDistance) {
              closestDistance = distance
              closestSection = section.id
            }
          }
        }
      })
      
      if (closestSection) {
        setActiveImageId(closestSection)
      }
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    // Observe all case sections
    caseSections.forEach((section) => {
      const element = document.getElementById(section.id)
      if (element) {
        observer.observe(element)
      }
    })
    
    return () => {
      observer.disconnect()
    }
  }, [caseSections, projectName])

  // Handle video playback when section comes into view
  useEffect(() => {
    // Find video for the active section (desktop)
    const video = document.querySelector(`#${activeImageId}-img`)
    const mobileVideo = document.querySelector(`#${activeImageId}-img-mobile`)
    
    const cleanupFunctions = []
    
    if (video && video.tagName === 'VIDEO') {
      // Play from start when section comes into view
      video.currentTime = 0
      video.play().catch(err => console.log('Video autoplay prevented:', err))
      
      // Stop video when it ends (don't loop)
      const handleEnded = () => {
        video.pause()
      }
      video.addEventListener('ended', handleEnded)
      cleanupFunctions.push(() => video.removeEventListener('ended', handleEnded))
    }
    
    // Also handle mobile video if it exists
    if (mobileVideo && mobileVideo.tagName === 'VIDEO') {
      // Play from start when section comes into view
      mobileVideo.currentTime = 0
      mobileVideo.play().catch(err => console.log('Video autoplay prevented:', err))
      
      // Stop video when it ends (don't loop)
      const handleMobileEnded = () => {
        mobileVideo.pause()
      }
      mobileVideo.addEventListener('ended', handleMobileEnded)
      cleanupFunctions.push(() => mobileVideo.removeEventListener('ended', handleMobileEnded))
    }
    
    return () => {
      cleanupFunctions.forEach(cleanup => cleanup())
    }
  }, [activeImageId])

  return (
    <div className={`case-page ${isLoading ? 'page-loading' : ''} ${DEBUG_MODE ? 'debug' : ''}`}>
      <img 
        alt="" 
        className="case-background" 
        src={aboutBg} 
      />
      
      {/* ============================================
          WORK DETAILS AT TOP
          ============================================ */}
      <div className="case-work-details-container">
        <Link to="/1/work" className="case-work-details-back">
          {/* Hidden image in normal flow to determine container width */}
          <img 
            alt="" 
            src={backHitbox} 
            className="case-back-hitbox-sizer"
          />
          <img alt="" src={backIcon} className="case-back-icon" />
        </Link>
        <div className="case-work-details-name">
          <p>{workTitles[projectName] || `Project ${projectName?.replace('project-', '') || '1'}`}</p>
        </div>
      </div>

      {/* Content area - split screen layout on desktop, vertical on mobile */}
      <div className="case-content-container">
        {/* Project 14 (Pokemon: Cursor) - Centered demo container */}
        {projectName === 'project-14' ? (
          <div id="Demo" className="case-demo-container">
            {/* Content will be centered here - add your demo content */}
          </div>
        ) : (
          <>
            {/* Desktop: Split screen layout */}
            <div className="case-text-container">
          {caseSections.map((section, index) => {
            // Project 5 Overview section has custom content
            if (projectName === 'project-5' && section.id === 'section-1') {
              return (
                <div key={section.id} id={section.id} data-section-index={index} className="case-section case-section-adobe-first">
                  <div className="case-section-text">
                    <h2 className="case-section-heading">{section.heading}</h2>
                    <p className="case-section-overview-title">How we achieved +500% Adobe credentialed in 3 Quarters</p>
                    <div className="case-section-description">
                      <p>When you hear "Adobe", your first thought may be Photoshop, the Creative Cloud products, or Adobe Acrobat.</p>
                      <p>&nbsp;</p>
                      <p>Yet, Adobe has 15 business analytic products under Experience Cloud. It's hard to care when it's frustrating and "nearly impossible" to self-learn these complex tools.</p>
                      <p>&nbsp;</p>
                      <p>To make the learning path enjoyable and clear for users, I led the end-to-end conception of the web experience for the Certification Learning Portal.</p>
                    </div>
                  </div>
                </div>
              )
            }
            // Project 5 Problem section has custom content
            if (projectName === 'project-5' && section.id === 'section-2') {
              return (
                <div key={section.id} id={section.id} data-section-index={index} className="case-section">
                  <div className="case-section-text">
                    <h2 className="case-section-heading">{section.heading}</h2>
                    <div className="case-section-description">
                      <p>On any Adobe forum, there was a resounding confusion on what Adobe Digital Experience even offered. The average person was not going to remember all 15 apps. Instead...</p>
                      <p>&nbsp;</p>
                      <p>They'd remember only 1 app at a time.</p>
                      <p>&nbsp;</p>
                      <p>And when they begun to learn that app, users came across the same set of problems.</p>
                      <p>&nbsp;</p>
                      <p>There was no central place to learn and actually try it out.</p>
                    </div>
                    <HighlightContainer>
                      <span>It's frustrating and time consuming to figure out </span>
                      <span className="case-problem-highlight-text-bold">how</span>
                      <span> to learn Adobe Digital Experience products, let alone learn the products themselves.</span>
                    </HighlightContainer>
                  </div>
                </div>
              )
            }
            // Project 5 Retrospective section has highlight component
            if (projectName === 'project-5' && section.id === 'section-6') {
              return (
                <div key={section.id} id={section.id} data-section-index={index} className="case-section case-section-last">
                  <div className="case-section-text">
                    <h2 className="case-section-heading">{section.heading}</h2>
                    <div className="case-section-description">
                      <p>Placeholder text content for {section.heading.toLowerCase()}. This will be replaced with actual project description and details.</p>
                    </div>
                    <HighlightContainer>
                      <span>We received funding and resources to bring the project into existence. Since launch, we've achieved over a million MoM learners on the platform, 500% of our target amount.</span>
                    </HighlightContainer>
                  </div>
                </div>
              )
            }
            return (
              <div key={section.id} id={section.id} data-section-index={index} className="case-section">
                <div className="case-section-text">
                  <h2 className="case-section-heading">{section.heading}</h2>
                  <p>Placeholder text content for {section.heading.toLowerCase()}. This will be replaced with actual project description and details.</p>
                </div>
              </div>
            )
          })}
        </div>
        <div className="case-imagery-container">
          {caseSections.map((section, index) => {
            // Project 5 Overview section has custom imagery
            if (projectName === 'project-5' && section.id === 'section-1') {
              return (
                <div key={section.id} data-section-index={index} className={`case-imagery-wrapper ${activeImageId === section.id ? 'active' : ''}`}>
                  <div id={`${section.id}-img`} className={`case-section-image-container ${activeImageId === section.id ? 'active' : ''}`}>
                    <img
                      src={scopePng}
                      alt="Scope"
                      className="case-section-image case-section-image-scope"
                    />
                  </div>
                  <Caption number="3.1" text=" B2C Opportunities - Dotted" type="Interactable" />
                </div>
              )
            }
            // Project 5 Problem section has video
            if (projectName === 'project-5' && section.id === 'section-2') {
              return (
                <div key={section.id} data-section-index={index} className={`case-imagery-wrapper ${activeImageId === section.id ? 'active' : ''}`}>
                  <video
                    id={`${section.id}-img`}
                    className={`case-section-video ${activeImageId === section.id ? 'active' : ''}`}
                    src={hicksLawVideo}
                    muted
                    playsInline
                    onMouseEnter={(e) => {
                      const video = e.target
                      video.currentTime = 0
                      video.play().catch(err => console.log('Video hover play prevented:', err))
                    }}
                  />
                  <Caption number="3.1" text=" B2C Opportunities - Dotted" type="Interactable" />
                </div>
              )
            }
            // Project 5 Strategy section has custom image
            if (projectName === 'project-5' && section.id === 'section-3') {
              return (
                <div key={section.id} data-section-index={index} className={`case-imagery-wrapper ${activeImageId === section.id ? 'active' : ''}`}>
                  <img
                    id={`${section.id}-img`}
                    src={adobePlanPng}
                    alt="Adobe Plan"
                    className={`case-section-image ${activeImageId === section.id ? 'active' : ''}`}
                  />
                  <Caption number="3.1" text=" B2C Opportunities - Dotted" type="Interactable" />
                </div>
              )
            }
            // Project 5 Flow section has custom image
            if (projectName === 'project-5' && section.id === 'section-4') {
              return (
                <div key={section.id} data-section-index={index} className={`case-imagery-wrapper ${activeImageId === section.id ? 'active' : ''}`}>
                  <img
                    id={`${section.id}-img`}
                    src={adobeFlowPng}
                    alt="Adobe Flow"
                    className={`case-section-image ${activeImageId === section.id ? 'active' : ''}`}
                  />
                  <Caption number="3.1" text=" B2C Opportunities - Dotted" type="Interactable" />
                </div>
              )
            }
            return (
              <div key={section.id} data-section-index={index} className={`case-imagery-wrapper ${activeImageId === section.id ? 'active' : ''}`}>
                <img
                  id={`${section.id}-img`}
                  src={`https://via.placeholder.com/600x400/f2f2f2/8c8c8c?text=Placeholder+${section.heading}`}
                  alt={`${section.heading} placeholder`}
                  className={`case-section-image ${activeImageId === section.id ? 'active' : ''}`}
                />
                <Caption number="3.1" text=" B2C Opportunities - Dotted" type="Interactable" />
              </div>
            )
          })}
        </div>
          </>
        )}
        
        {/* Mobile: Vertical layout with text and image together */}
        {projectName !== 'project-14' && (
        <div className="case-mobile-container">
          {caseSections.map((section, index) => {
            // Project 5 Overview section has custom content
            if (projectName === 'project-5' && section.id === 'section-1') {
              return (
                <div key={section.id} id={`${section.id}-mobile`} data-section-index={index} className="case-mobile-section case-mobile-section-adobe-first">
                  <div className="case-section-text">
                    <h2 className="case-section-heading">{section.heading}</h2>
                    <p className="case-section-overview-title">How we achieved +500% Adobe credentialed in 3 Quarters</p>
                    <div className="case-section-description">
                      <p>When you hear "Adobe", your first thought may be Photoshop, the Creative Cloud products, or Adobe Acrobat.</p>
                      <p>&nbsp;</p>
                      <p>Yet, Adobe has 15 business analytic products under Experience Cloud. It's hard to care when it's frustrating and "nearly impossible" to self-learn these complex tools.</p>
                      <p>&nbsp;</p>
                      <p>To make the learning path enjoyable and clear for users, I led the end-to-end conception of the web experience for the Certification Learning Portal.</p>
                    </div>
                  </div>
                  <div className="case-mobile-image-container">
                    <img
                      id={`${section.id}-img-mobile-2`}
                      src={scopePng}
                      alt="Scope"
                      className="case-mobile-image"
                    />
                  <Caption number="3.1" text=" B2C Opportunities - Dotted" type="Interactable" />
                  </div>
                </div>
              )
            }
            // Project 5 Problem section has video
            if (projectName === 'project-5' && section.id === 'section-2') {
              return (
                <div key={section.id} id={`${section.id}-mobile`} data-section-index={index} className="case-mobile-section">
                  <div className="case-section-text">
                    <h2 className="case-section-heading">{section.heading}</h2>
                    <div className="case-section-description">
                      <p>On any Adobe forum, there was a resounding confusion on what Adobe Digital Experience even offered. The average person was not going to remember all 15 apps. Instead...</p>
                      <p>&nbsp;</p>
                      <p>They'd remember only 1 app at a time.</p>
                      <p>&nbsp;</p>
                      <p>And when they begun to learn that app, users came across the same set of problems.</p>
                      <p>&nbsp;</p>
                      <p>There was no central place to learn and actually try it out.</p>
                    </div>
                    <HighlightContainer>
                      <span>It's frustrating and time consuming to figure out </span>
                      <span className="case-problem-highlight-text-bold">how</span>
                      <span> to learn Adobe Digital Experience products, let alone learn the products themselves.</span>
                    </HighlightContainer>
                  </div>
                  <video
                    id={`${section.id}-img-mobile`}
                    className="case-mobile-image"
                    src={hicksLawVideo}
                    muted
                    playsInline
                    onMouseEnter={(e) => {
                      const video = e.target
                      video.currentTime = 0
                      video.play().catch(err => console.log('Video hover play prevented:', err))
                    }}
                  />
                  <Caption number="3.1" text=" B2C Opportunities - Dotted" type="Interactable" />
                </div>
              )
            }
            // Project 5 Strategy section has custom image
            if (projectName === 'project-5' && section.id === 'section-3') {
              return (
                <div key={section.id} id={`${section.id}-mobile`} data-section-index={index} className="case-mobile-section">
                  <div className="case-section-text">
                    <h2 className="case-section-heading">{section.heading}</h2>
                    <p>Placeholder text content for {section.heading.toLowerCase()}. This will be replaced with actual project description and details.</p>
                  </div>
                  <img
                    id={`${section.id}-img-mobile`}
                    src={adobePlanPng}
                    alt="Adobe Plan"
                    className="case-mobile-image"
                  />
                  <Caption number="3.1" text=" B2C Opportunities - Dotted" type="Interactable" />
                </div>
              )
            }
            // Project 5 Flow section has custom image
            if (projectName === 'project-5' && section.id === 'section-4') {
              return (
                <div key={section.id} id={`${section.id}-mobile`} data-section-index={index} className="case-mobile-section">
                  <div className="case-section-text">
                    <h2 className="case-section-heading">{section.heading}</h2>
                    <p>Placeholder text content for {section.heading.toLowerCase()}. This will be replaced with actual project description and details.</p>
                  </div>
                  <img
                    id={`${section.id}-img-mobile`}
                    src={adobeFlowPng}
                    alt="Adobe Flow"
                    className="case-mobile-image"
                  />
                  <Caption number="3.1" text=" B2C Opportunities - Dotted" type="Interactable" />
                </div>
              )
            }
            // Project 5 Retrospective section has highlight component
            if (projectName === 'project-5' && section.id === 'section-6') {
              return (
                <div key={section.id} id={`${section.id}-mobile`} data-section-index={index} className="case-mobile-section">
                  <div className="case-section-text">
                    <h2 className="case-section-heading">{section.heading}</h2>
                    <div className="case-section-description">
                      <p>Placeholder text content for {section.heading.toLowerCase()}. This will be replaced with actual project description and details.</p>
                    </div>
                    <HighlightContainer>
                      <span>We received funding and resources to bring the project into existence. Since launch, we've achieved over a million MoM learners on the platform, 500% of our target amount.</span>
                    </HighlightContainer>
                  </div>
                </div>
              )
            }
            return (
              <div key={section.id} id={`${section.id}-mobile`} data-section-index={index} className="case-mobile-section">
                <div className="case-section-text">
                  <h2 className="case-section-heading">{section.heading}</h2>
                  <p>Placeholder text content for {section.heading.toLowerCase()}. This will be replaced with actual project description and details.</p>
                </div>
                <img
                  id={`${section.id}-img-mobile`}
                  src={`https://via.placeholder.com/600x400/f2f2f2/8c8c8c?text=Placeholder+${section.heading}`}
                  alt={`${section.heading} placeholder`}
                  className="case-mobile-image"
                />
                <Caption number="3.1" text=" B2C Opportunities - Dotted" type="Interactable" />
              </div>
            )
          })}
        </div>
        )}
      </div>

      {/* ============================================
          NAVIGATION BAR AT BOTTOM
          Dynamically generated based on case sections
          ============================================ */}
      <div className="case-nav-container">
        {caseSections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className={`nav-link-hitbox case-nav-link-hitbox ${activeImageId === section.id ? 'case-nav-link-hitbox-active' : ''}`}
            onClick={(e) => {
              e.preventDefault()
              // Check if we're on mobile (mobile container is visible)
              const isMobile = window.innerWidth <= 768
              
              if (isMobile) {
                // On mobile, scroll to mobile section
                const mobileElement = document.getElementById(`${section.id}-mobile`)
                if (mobileElement) {
                  mobileElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  // Update active image ID immediately
                  setActiveImageId(section.id)
                }
              } else {
                // On desktop, scroll to desktop section
                const desktopElement = document.getElementById(section.id)
                if (desktopElement) {
                  desktopElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
                  // Update active image ID immediately
                  setActiveImageId(section.id)
                }
              }
            }}
          >
            <div className={`nav-link-content case-nav-link-content ${DEBUG_MODE ? 'debug' : ''}`}>
              <span>{section.heading}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

export default CasePage


