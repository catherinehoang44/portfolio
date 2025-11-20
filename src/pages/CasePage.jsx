import React, { useEffect, useState, useRef } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import './CasePage.css'
import './AboutPage.css' // Import AboutPage.css for shared styles
import aboutBg from '../assets/about-bg.jpg'
import backIcon from '../assets/back-icon.svg'
import backHitbox from '../assets/back-hitbox.png'
import scopePng from '../assets/Scope.png'
import hicksLawVideo from '../assets/hicks-law.mp4'
const problemIcon = 'https://www.figma.com/api/mcp/asset/7527ea9e-d5e6-4521-b619-c7bc2a510de3'

// Work titles mapping - matches WorkPage workItems
const workTitles = {
  'project-1': 'Project 1',
  'project-2': 'Project 2',
  'project-3': 'Project 3',
  'project-4': 'Project 4',
  'project-5': 'Adobe Certifications',
  'project-6': 'Project 6',
  'project-7': 'Project 7',
  'project-8': 'Project 8',
  'project-9': 'Project 9',
  'project-10': 'Project 10',
  'project-11': 'Project 11',
  'project-12': 'Project 12',
  'project-13': 'Project 13',
}

// ============================================
// DEBUG MODE - Set to true to show borders
// ============================================
const DEBUG_MODE = false

function CasePage() {
  const location = useLocation()
  const { projectName } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [activeImageId, setActiveImageId] = useState('section-1')
  
  // Define case sections based on project
  // Project 5 has specific sections: Overview, Problem, Strategy, Flow, Design, Retrospective
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
  }, [projectName])

  useEffect(() => {
    window.scrollTo(0, 0)
    setIsLoading(true)
    // EDIT THIS: Change the delay (in milliseconds) to control when animation starts
    // Current: 100ms - elements render, then animation plays
    // Increase to slow down (e.g., 200ms, 300ms)
    // Decrease to speed up (e.g., 50ms)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 100)
    return () => clearTimeout(timer)
  }, [location])

  // Initial load animation
  useEffect(() => {
    setIsLoading(true)
    // EDIT THIS: Same as above - controls initial page load animation timing
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  // Intersection Observer to detect which section is visible and handle video looping
  useEffect(() => {
    const textContainer = document.querySelector('.case-text-container')
    if (!textContainer) return

    const observerOptions = {
      root: textContainer,
      rootMargin: '-50% 0px -50% 0px', // Trigger when section is centered
      threshold: 0
    }

    const observerCallback = (entries) => {
      // Process all entries to find which section is currently intersecting
      let intersectingSection = null
      
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id
          if (!sectionId.includes('-')) {
            intersectingSection = sectionId
          }
        }
      })
      
      // If we found an intersecting section, update the active image ID
      if (intersectingSection) {
        // Video will auto-play and loop via HTML attributes, no need to manually control
        
        // Update active image ID - this will trigger the image to show via className binding
        setActiveImageId(intersectingSection)
      } else {
        // No section is intersecting - find the closest section to center
        const textContainer = document.querySelector('.case-text-container')
        if (textContainer) {
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
              
              if (distance < closestDistance) {
                closestDistance = distance
                closestSection = section.id
              }
            }
          })
          
          if (closestSection) {
            setActiveImageId(closestSection)
          }
        }
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
    

    // Also observe mobile sections
    const mobileContainer = document.querySelector('.case-mobile-container')
    if (mobileContainer) {
      const mobileObserverOptions = {
        root: null,
        rootMargin: '-20% 0px -20% 0px',
        threshold: 0
      }
      
      const mobileObserverCallback = (entries) => {
        // Process all entries to find which section is currently intersecting
        let intersectingSection = null
        
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id.replace('-mobile', '')
            intersectingSection = sectionId
          }
        })
        
        // Hide all mobile images/videos first
        caseSections.forEach((section) => {
          if (section.id === 'section-1' && projectName === 'project-5') {
            const image = document.querySelector(`#${section.id}-img-mobile-2`)
            if (image) {
              image.style.display = 'none'
            }
          } else if (section.id === 'section-2' && projectName === 'project-5') {
            const video = document.querySelector(`#${section.id}-img-mobile`)
            if (video && video.tagName === 'VIDEO') {
              video.style.display = 'none'
              video.pause()
            }
          } else {
            const image = document.querySelector(`#${section.id}-img-mobile`)
            if (image) {
              image.style.display = 'none'
            }
          }
        })
        
        // Show the intersecting section's image/video
        if (intersectingSection) {
          if (intersectingSection === 'section-1' && projectName === 'project-5') {
            const image = document.querySelector(`#${intersectingSection}-img-mobile-2`)
            if (image) {
              image.style.display = 'block'
            }
          } else if (intersectingSection === 'section-2' && projectName === 'project-5') {
            const video = document.querySelector(`#${intersectingSection}-img-mobile`)
            if (video && video.tagName === 'VIDEO') {
              video.style.display = 'block'
            }
          } else {
            const image = document.querySelector(`#${intersectingSection}-img-mobile`)
            if (image) {
              image.style.display = 'block'
            }
          }
          
          // Update active image ID for navigation highlighting
          setActiveImageId(intersectingSection)
        }
      }
      
      const mobileObserver = new IntersectionObserver(mobileObserverCallback, mobileObserverOptions)
      
      caseSections.forEach((section) => {
        const element = document.getElementById(`${section.id}-mobile`)
        if (element) {
          mobileObserver.observe(element)
        }
      })
      
      
      return () => {
        observer.disconnect()
        mobileObserver.disconnect()
      }
    }
    
    return () => {
      observer.disconnect()
    }
  }, [caseSections, projectName])

  return (
    <div className={`case-page ${isLoading ? 'page-loading' : ''}`}>
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
        {/* Desktop: Split screen layout */}
        <div className="case-text-container">
          {caseSections.map((section) => {
            // Project 5 Overview section has custom content
            if (projectName === 'project-5' && section.id === 'section-1') {
              return (
                <div key={section.id} id={section.id} className="case-section case-section-adobe-first">
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
                <div key={section.id} id={section.id} className="case-section">
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
                    <div className="case-problem-highlight">
                      <div className="case-problem-highlight-content">
                        <div className="case-problem-highlight-layout">
                          <div className="case-problem-highlight-icon">
                            <div className="case-problem-highlight-icon-container">
                              <div className="case-problem-highlight-icon-inner">
                                <div className="case-problem-highlight-icon-wrapper">
                                  <img alt="" src={problemIcon} className="case-problem-highlight-icon-img" />
                                </div>
                              </div>
                            </div>
                          </div>
                          <p className="case-problem-highlight-text">
                            <span>It's frustrating and time consuming to figure out </span>
                            <span className="case-problem-highlight-text-bold">how</span>
                            <span> to learn Adobe Digital Experience products, let alone learn the products themselves.</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            }
            return (
              <div key={section.id} id={section.id} className="case-section">
                <div className="case-section-text">
                  <h2 className="case-section-heading">{section.heading}</h2>
                  <p>Placeholder text content for {section.heading.toLowerCase()}. This will be replaced with actual project description and details.</p>
                </div>
              </div>
            )
          })}
        </div>
        <div className="case-imagery-container">
          {caseSections.map((section) => {
            // Project 5 Overview section has custom imagery
            if (projectName === 'project-5' && section.id === 'section-1') {
              return (
                <div key={section.id} id={`${section.id}-img`} className={`case-section-image-container ${activeImageId === section.id ? 'active' : ''}`}>
                  <img
                    src={scopePng}
                    alt="Scope"
                    className="case-section-image case-section-image-scope"
                  />
                </div>
              )
            }
            // Project 5 Problem section has video
            if (projectName === 'project-5' && section.id === 'section-2') {
              return (
                <>
                  <video
                    key={section.id}
                    id={`${section.id}-img`}
                    className={`case-section-video ${activeImageId === section.id ? 'active' : ''}`}
                    src={hicksLawVideo}
                    muted
                    playsInline
                    loop
                    autoPlay
                  />
                </>
              )
            }
            return (
              <img
                key={section.id}
                id={`${section.id}-img`}
                src={`https://via.placeholder.com/600x400/f2f2f2/8c8c8c?text=Placeholder+${section.heading}`}
                alt={`${section.heading} placeholder`}
                className={`case-section-image ${activeImageId === section.id ? 'active' : ''}`}
              />
            )
          })}
        </div>
        
        {/* Mobile: Vertical layout with text and image together */}
        <div className="case-mobile-container">
          {caseSections.map((section) => {
            // Project 5 Overview section has custom content
            if (projectName === 'project-5' && section.id === 'section-1') {
              return (
                <div key={section.id} id={`${section.id}-mobile`} className="case-mobile-section case-mobile-section-adobe-first">
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
                  </div>
                </div>
              )
            }
            // Project 5 Problem section has video
            if (projectName === 'project-5' && section.id === 'section-2') {
              return (
                <div key={section.id} id={`${section.id}-mobile`} className="case-mobile-section">
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
                    <div className="case-problem-highlight">
                      <div className="case-problem-highlight-content">
                        <div className="case-problem-highlight-layout">
                          <div className="case-problem-highlight-icon">
                            <div className="case-problem-highlight-icon-container">
                              <div className="case-problem-highlight-icon-inner">
                                <div className="case-problem-highlight-icon-wrapper">
                                  <img alt="" src={problemIcon} className="case-problem-highlight-icon-img" />
                                </div>
                              </div>
                            </div>
                          </div>
                          <p className="case-problem-highlight-text">
                            <span>It's frustrating and time consuming to figure out </span>
                            <span className="case-problem-highlight-text-bold">how</span>
                            <span> to learn Adobe Digital Experience products, let alone learn the products themselves.</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <video
                    id={`${section.id}-img-mobile`}
                    className="case-mobile-image"
                    src={hicksLawVideo}
                    muted
                    playsInline
                    loop
                    autoPlay
                  />
                </div>
              )
            }
            return (
              <div key={section.id} id={`${section.id}-mobile`} className="case-mobile-section">
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
              </div>
            )
          })}
        </div>
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

