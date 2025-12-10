import React, { useEffect, useState, useRef } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { useRive } from '@rive-app/react-canvas'
import './CasePage.css'
import './AboutPage.css' // Import AboutPage.css for shared styles
import backIcon from '../assets/back-icon.svg'
import backHitbox from '../assets/back-hitbox.png'
import scopePng from '../assets/scope.png'
import hicksLawVideo from '../assets/hicks-law.mp4'
import highlightIcon from '../assets/highlight-icon.png'
import adobePlanPng from '../assets/adobe-plan.png'
import adobeFlowPng from '../assets/adobe-flow.png'
import adobeBusinessMotion from '../assets/adobe-business-motion.mp4'
import adobeBusinessFramerPreview from '../assets/adobe-business-framer-preview.mp4'
import adobeBusinessScope from '../assets/adobe-business-scope.svg'
import adobeCertPortalCover from '../assets/adobe_cert_portal_cover.riv'
import work3Image from '../assets/perplexity-concept.png'
import answerThisPng from '../assets/answer-this.png'
import toasterWebm from '../assets/toaster.webm'
import pixeldoroWebm from '../assets/pixeldoro.webm'
import radialBitmapMp4 from '../assets/radial-bitmap.mp4'
import retroSiteMp4 from '../assets/retro-site.mp4'
import openaiConceptPng from '../assets/openai-concept.png'
import openai0 from '../assets/openai-0.svg'
import openai1 from '../assets/openai-1.svg'
import openai2 from '../assets/openai-2.svg'
import techNovaMp4 from '../assets/tech-nova.mp4'
import dreamOnSuckerPng from '../assets/dream-on-sucker.png'
import retroTechPng from '../assets/retro-tech.png'
import scrollExampleMp4 from '../assets/scroll-example.mp4'
import test1Mp4 from '../assets/test1.mp4'
import PrioritizationChart from '../components/PrioritizationChart'
import Slideshow from '../components/Slideshow'
import ProjectTakeawaysTable from '../components/ProjectTakeawaysTable'
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
function Caption({ number, text, type, version }) {
  const displayText = version ? `${text} - Version ${version}` : text
  return (
    <div className="case-imagery-caption">
      <p className="case-imagery-caption-text">
        <span className="case-imagery-caption-number">{number}</span>
        <span>{displayText}</span>
      </p>
      {type && <TypeTag>{type}</TypeTag>}
    </div>
  )
}

// Rive component for Adobe Cert Portal
function AdobeCertRive() {
  const { RiveComponent } = useRive({
    src: adobeCertPortalCover,
    autoplay: true,
  })
  return <RiveComponent style={{ width: '100%', height: '100%' }} />
}

function CasePage() {
  const location = useLocation()
  const { projectName } = useParams()
  const [activeImageId, setActiveImageId] = useState('section-1')
  const [slideshowIndex, setSlideshowIndex] = useState(0)
  const prevActiveImageIdRef = useRef('section-1')
  
  // Hide certain projects for now
  const hiddenProjects = ['project-3', 'project-6', 'project-11']
  if (hiddenProjects.includes(projectName)) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <p>This case study is currently unavailable.</p>
        <Link to="/work">Back to Work</Link>
      </div>
    )
  }
  
  // Define case sections based on project
  // Has specific sections: Overview, Problem, Strategy, Flow, Design, Retrospective
  // (Pokemon: Cursor) has Demo section only
  const getCaseSections = () => {
    if (projectName === 'project-5') {
      return [
        { id: 'section-1', heading: 'Overview' },
        { id: 'section-2', heading: 'Adobe Certification Portal Launch', navTitle: 'Portal Launch' },
        { id: 'section-6', heading: 'Retrospective' }
      ]
    }
    if (projectName === 'project-4') {
      return [
        { id: 'section-1', heading: 'Overview' },
        { id: 'section-2', heading: 'Prototype' },
        { id: 'section-3', heading: 'Motion Design' }
      ]
    }
    if (projectName === 'project-3') {
      return [
        { id: 'section-1', heading: 'Overview' },
        { id: 'section-2', heading: 'Design' },
        { id: 'section-3', heading: 'Implementation' }
      ]
    }
    if (projectName === 'project-12') {
      return [
        { id: 'section-1', heading: 'Overview' },
        { id: 'section-2', heading: 'Design' },
        { id: 'section-3', heading: 'Framer Showcase' }
      ]
    }
    if (projectName === 'project-1') {
      return [
        { id: 'section-1', heading: 'Overview' },
        { id: 'section-2', heading: 'Design' },
        { id: 'section-3', heading: 'Rive Animation' }
      ]
    }
    if (projectName === 'project-8') {
      return [
        { id: 'section-1', heading: 'Overview' },
        { id: 'section-2', heading: 'Game Design' },
        { id: 'section-3', heading: 'UI Assets' }
      ]
    }
    if (projectName === 'project-15') {
      return [
        { id: 'Demo', heading: 'Demo' }
      ]
    }
    if (projectName === 'project-2') {
      return [
        { id: 'Demo', heading: 'Demo' }
      ]
    }
    if (projectName === 'project-10') {
      return [
        { id: 'section-1', heading: 'Summary' }
      ]
    }
    if (projectName === 'project-13') {
      return [
        { id: 'section-1', heading: 'Overview' },
        { id: 'section-2', heading: 'Design' },
        { id: 'section-3', heading: 'Framer Showcase' }
      ]
    }
    if (projectName === 'project-9') {
      return [
        { id: 'section-1', heading: 'Overview' },
        { id: 'section-2', heading: 'Design' },
        { id: 'section-3', heading: 'Project Archive' }
      ]
    }
    if (projectName === 'project-11') {
      return [
        { id: 'section-1', heading: 'Overview' },
        { id: 'section-2', heading: 'Design' },
        { id: 'section-3', heading: 'Interactive Experience' }
      ]
    }
    if (projectName === 'project-7') {
      return [
        { id: 'section-1', heading: 'Overview' },
        { id: 'section-2', heading: 'Design' },
        { id: 'section-3', heading: 'Personal Projects' }
      ]
    }
    if (projectName === 'project-6') {
      return [
        { id: 'section-1', heading: 'Overview' },
        { id: 'section-2', heading: 'Design' },
        { id: 'section-3', heading: 'Motion Interaction' }
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
    // Set to Demo section
    if (projectName === 'project-14' || projectName === 'project-2' || projectName === 'project-15') {
      setActiveImageId('Demo')
    }
  }, [projectName])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  // Intersection Observer to detect which section is visible
  useEffect(() => {
    // Skip observer (no scrolling sections)
    if (projectName === 'project-14' || projectName === 'project-2' || projectName === 'project-15') {
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
        const prevActiveImageId = prevActiveImageIdRef.current
        setActiveImageId(closestSection)
        // Reset slideshow index only when leaving section-5, not when entering it
        if (prevActiveImageId === 'section-5' && closestSection !== 'section-5') {
          setSlideshowIndex(0)
        }
        prevActiveImageIdRef.current = closestSection
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
      
      // Stop video when it ends (don't loop) - unless video has loop attribute
      if (!video.hasAttribute('loop')) {
        const handleEnded = () => {
          video.pause()
        }
        video.addEventListener('ended', handleEnded)
        cleanupFunctions.push(() => video.removeEventListener('ended', handleEnded))
      }
    }
    
    // Also handle mobile video if it exists
    if (mobileVideo && mobileVideo.tagName === 'VIDEO') {
      // Play from start when section comes into view
      mobileVideo.currentTime = 0
      mobileVideo.play().catch(err => console.log('Video autoplay prevented:', err))
      
      // Stop video when it ends (don't loop) - unless video has loop attribute
      if (!mobileVideo.hasAttribute('loop')) {
        const handleMobileEnded = () => {
          mobileVideo.pause()
        }
        mobileVideo.addEventListener('ended', handleMobileEnded)
        cleanupFunctions.push(() => mobileVideo.removeEventListener('ended', handleMobileEnded))
      }
    }
    
    return () => {
      cleanupFunctions.forEach(cleanup => cleanup())
    }
  }, [activeImageId])

  return (
    <div className={`case-page ${DEBUG_MODE ? 'debug' : ''}`}>
      
      {/* ============================================
          WORK DETAILS AT TOP
          ============================================ */}
      <div className="case-work-details-container">
        <Link to="/work" className="case-work-details-back">
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
        {/* (Pokemon: Cursor), (Retro Site), and (Radial Bitmap) - Centered demo container */}
        {projectName === 'project-14' || projectName === 'project-2' || projectName === 'project-15' ? (
          <div id="Demo" className="case-demo-container">
            {projectName === 'project-2' ? (
              <iframe
                src="https://my-retro-desktop.vercel.app/"
                className="case-section-iframe"
                title="Explore My Desktop"
                allow="autoplay"
              />
            ) : projectName === 'project-15' ? (
              <iframe
                src="https://radial-bitmap.vercel.app/"
                className="case-section-iframe"
                title="Radial Bitmap Tool"
                allow="autoplay"
              />
            ) : null}
          </div>
        ) : (
          <>
            {/* Desktop: Split screen layout */}
            <div className={`case-text-container ${projectName === 'project-5' ? 'case-text-container-project-5' : ''}`}>
              {/* Divider container - 30% height on desktop, hidden on mobile */}
              <div className="case-section-divider"></div>
          {caseSections.map((section, index) => {
            // 5 Overview section has custom content
            if (projectName === 'project-5' && section.id === 'section-1') {
              return (
                <div key={section.id} id={section.id} data-section-index={index} className="case-section case-section-first">
                  <div className="case-section-text">
                    <h2 className="case-section-heading">{caseSections.length > 1 ? `${index + 1}. ` : ''}{section.heading}</h2>
                    <div className="case-section-description">
                      <p>At Adobe, I designed, tested and shipped the <a href="https://certification.adobe.com/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>Adobe Certification Portal</a>.</p>
                      <p>&nbsp;</p>
                      <p>I was involved in the end-to-end user flows of:</p>
                      <p>&nbsp;</p>
                      <ul>
                        <li>Core Experience</li>
                        <li>Certification Renewals</li>
                        <li>Learning Management Systems (LMS)</li>
                        <li>Platform Integrations</li>
                      </ul>
                      <p>&nbsp;</p>
                      <p>I helped launch the Adobe Certification Portal in October 2024, and the KPIs have grown tremendously during my time on the team:</p>
                      <p>&nbsp;</p>
                      <ul>
                        <li>0 to 1.2 million active users</li>
                        <li>52 to 69% renewal rate (+17%)</li>
                        <li>17k to 30k certification holders (+57%)</li>
                      </ul>
                      <p>&nbsp;</p>
                      <p>Here's an overview of the features and quality of life improvements I've designed and tested, from ideation to launch.</p>
                      <p>&nbsp;</p>
                      <ul>
                        <li>Portal Launch</li>
                        <li>Certification Renewals</li>
                        <li>Course Catalog</li>
                        <li>University Page</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )
            }
            // Problem section has custom content
            if (projectName === 'project-5' && section.id === 'section-2') {
              return (
                <div key={section.id} id={section.id} data-section-index={index} className="case-section">
                  <div className="case-section-text">
                    <h2 className="case-section-heading">{caseSections.length > 1 ? `${index + 1}. ` : ''}{section.heading}</h2>
                    <div className="case-section-description">
                      <p>On any Adobe forum, there was widespread confusion about what Adobe Digital Experience actually offered. Users start learning one app at a time before exploring others (96% of learners).</p>
                      <p>&nbsp;</p>
                      <p>And when they begun to learn that app, users came across the same set of problems:</p>
                      <p>&nbsp;</p>
                      <ul>
                        <li>There was no central place to learn and practice using the product.</li>
                        <li>It's frustrating and time-consuming to figure out how to learn Adobe Digital Experience products, let alone learn the products themselves.</li>
                      </ul>
                      <p>&nbsp;</p>
                      <p>I conceptualized and pitched building a learning platform, striking a balance between Adobe enterprise partners (primary audience) and individual learners (secondary audience). We received funding and resources to bring the project into existence at <a href="https://certification.adobe.com/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>certification.adobe.com</a>.</p>
                    </div>
                  </div>
                </div>
              )
            }
            // 5 Retrospective section
            if (projectName === 'project-5' && section.id === 'section-6') {
              return (
                <div key={section.id} id={section.id} data-section-index={index} className="case-section">
                  <div className="case-section-text">
                    <h2 className="case-section-heading">{caseSections.length > 1 ? `${index + 1}. ` : ''}{section.heading}</h2>
                    <div className="case-section-description">
                      <p>By grounding an ambitious vision and timeline in practical, modular steps and data-informed decisions, we were able to deliver meaningful progress quickly.</p>
                      <p>&nbsp;</p>
                      <p>The late nights and great conversations that came from these projects were genuinely the most fun I had in design!</p>
                    </div>
                  </div>
                </div>
              )
            }
            // Strategy section has custom content
            // 4 Overview section
            if (projectName === 'project-4' && section.id === 'section-1') {
              return (
                <div key={section.id} id={section.id} data-section-index={index} className="case-section case-section-project-4">
                  <div className="case-section-text">
                    <h2 className="case-section-heading">{caseSections.length > 1 ? `${index + 1}. ` : ''}{section.heading}</h2>
                    <div className="case-section-description">
                      <p>Adobe for Business represents Adobe's enterprise solutions, showcasing its comprehensive suite of business analytics products under Adobe Experience Cloud. This project tested and advocated for <a href="https://framer.com/" target="_blank" rel="noopener noreferrer" className="case-section-link">Framer</a> as a prototyping tool.</p>
                      <p>&nbsp;</p>
                      <p>I designed and developed this site using Framer and created the motion animations with Rive and Adobe After Effects.</p>
                    </div>
                  </div>
                </div>
              )
            }
            // 4 Prototype section
            if (projectName === 'project-4' && section.id === 'section-2') {
              return (
                <div key={section.id} id={section.id} data-section-index={index} className="case-section case-section-project-4">
                  <div className="case-section-text">
                    <h2 className="case-section-heading">{caseSections.length > 1 ? `${index + 1}. ` : ''}{section.heading}</h2>
                    <div className="case-section-description">
                      <p>You can experience the complete interactive design, animations, and user flows exactly as intended: <a href="https://business-adobe-sandbox.framer.website/" target="_blank" rel="noopener noreferrer" className="case-section-link">business.adobe.com/home/prototype</a></p>
                      <p>&nbsp;</p>
                      <p><strong>Key design decisions included:</strong></p>
                      <p>&nbsp;</p>
                      <p><strong>Visual Hierarchy</strong></p>
                      <p>Large, impactful hero sections with clear calls-to-action guide users through Adobe's product offerings and business solutions.</p>
                      <p>&nbsp;</p>
                      <p><strong>Interactive Elements</strong></p>
                      <p>Smooth scroll animations, hover effects, and dynamic content reveal create an engaging user experience that showcases Adobe's innovative technology.</p>
                    </div>
                  </div>
                </div>
              )
            }
            // 4 Motion Design section
            if (projectName === 'project-4' && section.id === 'section-3') {
              return (
                <div key={section.id} id={section.id} data-section-index={index} className="case-section case-section-last case-section-project-4">
                  <div className="case-section-text">
                    <h2 className="case-section-heading">{caseSections.length > 1 ? `${index + 1}. ` : ''}{section.heading}</h2>
                    <div className="case-section-description">
                      <p>The design process focused on creating a clean, professional interface that effectively communicates Adobe's enterprise value proposition.</p>
                    </div>
                  </div>
                </div>
              )
            }
            // 3 Overview section
            if (projectName === 'project-3' && section.id === 'section-1') {
              return (
                <div key={section.id} id={section.id} data-section-index={index} className="case-section case-section-project-3">
                  <div className="case-section-text">
                    <h2 className="case-section-heading">{caseSections.length > 1 ? `${index + 1}. ` : ''}{section.heading}</h2>
                    <div className="case-section-description">
                      <p>Perplexity AI Comet represents a conceptual redesign of Perplexity's interface, exploring how AI-powered search experiences can be more intuitive and visually engaging. This project demonstrates modern web design principles applied to complex information architecture.</p>
                      <p>&nbsp;</p>
                      <p>The design focuses on creating a seamless experience for users interacting with AI-powered search, balancing clarity of information with the dynamic nature of AI-generated responses. The interface emphasizes readability, visual hierarchy, and smooth interactions that make complex AI interactions feel natural and approachable.</p>
                      <p>&nbsp;</p>
                      <p>This case study showcases how thoughtful design can enhance the user experience of AI tools, making advanced technology accessible and enjoyable for everyday users.</p>
                    </div>
                  </div>
                </div>
              )
            }
            // 3 Design section
            if (projectName === 'project-3' && section.id === 'section-2') {
              return (
                <div key={section.id} id={section.id} data-section-index={index} className="case-section case-section-project-3">
                  <div className="case-section-text">
                    <h2 className="case-section-heading">{caseSections.length > 1 ? `${index + 1}. ` : ''}{section.heading}</h2>
                    <div className="case-section-description">
                      <p>The design process centered on creating an interface that feels both powerful and approachable. Key considerations included how to present AI-generated content in a way that feels trustworthy and easy to digest.</p>
                      <p>&nbsp;</p>
                      <p><strong>Visual Language</strong></p>
                      <p>Clean, modern aesthetics with careful attention to typography and spacing create a sense of clarity and professionalism. The design uses subtle animations and transitions to guide user attention and provide feedback.</p>
                      <p>&nbsp;</p>
                      <p><strong>Information Architecture</strong></p>
                      <p>The layout prioritizes the AI response while maintaining easy access to sources, related queries, and additional context. This hierarchical approach helps users quickly understand and verify information.</p>
                      <p>&nbsp;</p>
                      <p><strong>User Experience</strong></p>
                      <p>Interactive elements are designed to feel responsive and intuitive, with clear visual feedback for user actions. The interface adapts smoothly to different content types and query complexities.</p>
                    </div>
                  </div>
                </div>
              )
            }
            // 3 Implementation section
            if (projectName === 'project-3' && section.id === 'section-3') {
              return (
                <div key={section.id} id={section.id} data-section-index={index} className="case-section case-section-last case-section-project-3">
                  <div className="case-section-text">
                    <h2 className="case-section-heading">{caseSections.length > 1 ? `${index + 1}. ` : ''}{section.heading}</h2>
                    <div className="case-section-description">
                      <p>This conceptual design explores the potential of modern web interfaces for AI-powered tools. The project demonstrates how thoughtful design can make complex technology feel accessible and intuitive.</p>
                      <p>&nbsp;</p>
                      <p><strong>View the live Perplexity AI Comet site:</strong></p>
                      <p><a href="https://www.perplexity.ai/comet" target="_blank" rel="noopener noreferrer" style={{ color: '#8c8c8c', textDecoration: 'underline' }}>https://www.perplexity.ai/comet</a></p>
                      <p>&nbsp;</p>
                      <p>This project serves as both a design exploration and a demonstration of how user-centered design principles can enhance AI interfaces, creating experiences that feel natural and empowering for users.</p>
                    </div>
                  </div>
                </div>
              )
            }
            // 12 Overview section
            if (projectName === 'project-12' && section.id === 'section-1') {
              return (
                <div key={section.id} id={section.id} data-section-index={index} className="case-section case-section-project-12">
                  <div className="case-section-text">
                    <h2 className="case-section-heading">{caseSections.length > 1 ? `${index + 1}. ` : ''}{section.heading}</h2>
                    <div className="case-section-description">
                      <p>AnswerThis is an all-in-one AI research assistant designed to help researchers from finding research gaps to publication. This project showcases how Framer can be used to create comprehensive, feature-rich web experiences that effectively communicate complex product capabilities.</p>
                      <p>&nbsp;</p>
                      <p>The site demonstrates AnswerThis's powerful features including AI writing assistance, literature review generation, citation management, and access to 250M+ research papers. The design balances information density with clarity, helping researchers quickly understand the platform's value proposition.</p>
                      <p>&nbsp;</p>
                      <p>This case study highlights how modern design tools like Framer enable rapid prototyping and deployment of complex product marketing sites, allowing designers to create production-ready experiences without traditional development constraints.</p>
                    </div>
                  </div>
                </div>
              )
            }
            // 12 Design section
            if (projectName === 'project-12' && section.id === 'section-2') {
              return (
                <div key={section.id} id={section.id} data-section-index={index} className="case-section case-section-project-12">
                  <div className="case-section-text">
                    <h2 className="case-section-heading">{caseSections.length > 1 ? `${index + 1}. ` : ''}{section.heading}</h2>
                    <div className="case-section-description">
                      <p>The design approach focused on creating a clear, trustworthy interface that communicates AnswerThis's comprehensive research capabilities. The site needed to convey both the technical sophistication and the practical benefits of the platform.</p>
                      <p>&nbsp;</p>
                      <p><strong>Feature Presentation</strong></p>
                      <p>Key features are presented with clear visual hierarchy, using icons, illustrations, and concise descriptions. Each feature section builds understanding of how AnswerThis streamlines the research process.</p>
                      <p>&nbsp;</p>
                      <p><strong>Trust and Credibility</strong></p>
                      <p>Testimonials, user counts, and security messaging are strategically placed to build trust. The design emphasizes the platform's reliability and the quality of its research tools.</p>
                      <p>&nbsp;</p>
                      <p><strong>User Journey</strong></p>
                      <p>The layout guides users from understanding the problem (research complexity) to seeing the solution (AnswerThis's features) to taking action (signing up). Clear calls-to-action throughout support conversion.</p>
                    </div>
                  </div>
                </div>
              )
            }
            // 12 Framer Showcase section
            if (projectName === 'project-12' && section.id === 'section-3') {
              return (
                <div key={section.id} id={section.id} data-section-index={index} className="case-section case-section-last case-section-project-12">
                  <div className="case-section-text">
                    <h2 className="case-section-heading">{caseSections.length > 1 ? `${index + 1}. ` : ''}{section.heading}</h2>
                    <div className="case-section-description">
                      <p>This project was built entirely in Framer, demonstrating the platform's ability to handle complex, content-rich websites with multiple sections, interactive elements, and detailed feature presentations.</p>
                      <p>&nbsp;</p>
                      <p>Framer enabled rapid iteration on the design, real-time collaboration, and seamless deployment of a fully functional marketing site. The platform's capabilities allowed for sophisticated layouts, animations, and interactions that would typically require extensive development work.</p>
                      <p>&nbsp;</p>
                      <p><strong>Experience the live site:</strong></p>
                      <p><a href="https://answer-this.framer.website/" target="_blank" rel="noopener noreferrer" style={{ color: '#8c8c8c', textDecoration: 'underline' }}>https://answer-this.framer.website/</a></p>
                      <p>&nbsp;</p>
                      <p>This project showcases how Framer empowers designers to create comprehensive product marketing sites that effectively communicate complex value propositions while maintaining design quality and user experience standards.</p>
                    </div>
                  </div>
                </div>
              )
            }
            // 15 Overview section
            if (projectName === 'project-15' && section.id === 'section-1') {
              return (
                <div key={section.id} id={section.id} data-section-index={index} className="case-section case-section-project-15">
                  <div className="case-section-text">
                    <h2 className="case-section-heading">{caseSections.length > 1 ? `${index + 1}. ` : ''}{section.heading}</h2>
                    <div className="case-section-description">
                      <p>I made a way for me to create unique circular backgrounds. The Radial Bitmap Tool is a custom solution I developed to generate distinctive circular patterns and backgrounds that I can use across my design work.</p>
                      <p>&nbsp;</p>
                      <p>This tool allows me to quickly generate variations of circular bitmap patterns, giving me the flexibility to create custom backgrounds that fit specific design needs. Rather than relying on generic patterns or spending time manually creating each variation, this tool streamlines the process while ensuring each output is unique.</p>
                      <p>&nbsp;</p>
                      <p>This project demonstrates how creating custom tools can solve specific design challenges and improve workflow efficiency, allowing for more creative exploration and faster iteration.</p>
                    </div>
                  </div>
                </div>
              )
            }
            // 15 Tool Design section
            if (projectName === 'project-15' && section.id === 'section-2') {
              return (
                <div key={section.id} id={section.id} data-section-index={index} className="case-section case-section-project-15">
                  <div className="case-section-text">
                    <h2 className="case-section-heading">{caseSections.length > 1 ? `${index + 1}. ` : ''}{section.heading}</h2>
                    <div className="case-section-description">
                      <p>The tool is designed with simplicity and efficiency in mind. The interface allows for quick generation of circular bitmap patterns with various parameters that can be adjusted to create different visual effects.</p>
                      <p>&nbsp;</p>
                      <p><strong>Functionality</strong></p>
                      <p>The tool generates circular patterns by processing bitmap data in a radial format, creating unique visual textures that can be used as backgrounds or design elements. Each generation produces a distinct result, ensuring variety in the outputs.</p>
                      <p>&nbsp;</p>
                      <p><strong>User Experience</strong></p>
                      <p>The design prioritizes ease of use, allowing for quick iteration and experimentation. The tool provides immediate visual feedback, making it easy to find the right pattern for a specific design need.</p>
                      <p>&nbsp;</p>
                      <p><strong>Output Quality</strong></p>
                      <p>Generated patterns maintain high quality and can be exported in formats suitable for various design applications, ensuring they integrate seamlessly into different projects.</p>
                    </div>
                  </div>
                </div>
              )
            }
            // 15 Implementation section
            if (projectName === 'project-15' && section.id === 'section-3') {
              return (
                <div key={section.id} id={section.id} data-section-index={index} className="case-section case-section-last case-section-project-15">
                  <div className="case-section-text">
                    <h2 className="case-section-heading">{caseSections.length > 1 ? `${index + 1}. ` : ''}{section.heading}</h2>
                    <div className="case-section-description">
                      <p>The Radial Bitmap Tool was built to solve a specific workflow challenge I encountered in my design work. By creating a custom solution, I was able to streamline the process of generating unique circular backgrounds while maintaining creative control over the output.</p>
                      <p>&nbsp;</p>
                      <p>This project showcases the value of building custom tools that address specific design needs. Rather than adapting to existing tools that don't quite fit the requirement, creating a tailored solution allows for better workflow integration and more efficient design processes.</p>
                      <p>&nbsp;</p>
                      <p><strong>Experience the live site:</strong></p>
                      <p><a href="https://radial-bitmap.vercel.app/" target="_blank" rel="noopener noreferrer" style={{ color: '#8c8c8c', textDecoration: 'underline' }}>https://radial-bitmap.vercel.app/</a></p>
                      <p>&nbsp;</p>
                      <p>The tool has become an essential part of my design toolkit, enabling me to quickly generate unique backgrounds that add visual interest and personality to my projects without the time investment of manual creation.</p>
                    </div>
                  </div>
                </div>
              )
            }
            // 2 Overview section
            if (projectName === 'project-2' && section.id === 'section-1') {
              return (
                <div key={section.id} id={section.id} data-section-index={index} className="case-section case-section-project-2">
                  <div className="case-section-text">
                    <h2 className="case-section-heading">{caseSections.length > 1 ? `${index + 1}. ` : ''}{section.heading}</h2>
                    <div className="case-section-description">
                      <p>Nostalgic Exhibit is an online mixed media exhibit that explores themes of nostalgia through various artistic mediums. The project creates a digital space where visitors can experience curated works that evoke memories, emotions, and connections to the past.</p>
                      <p>&nbsp;</p>
                      <p>The exhibit combines different forms of media—illustration, photography, video, and interactive elements—to create a rich, immersive experience that captures the essence of nostalgia. Each piece in the collection tells a story, inviting viewers to reflect on their own memories and experiences.</p>
                      <p>&nbsp;</p>
                      <p>This case study demonstrates how digital platforms can be used to create meaningful cultural experiences, bringing together diverse artistic expressions in a cohesive, accessible format that reaches audiences beyond traditional gallery spaces.</p>
                      <p>&nbsp;</p>
                      <p><a href="https://my-retro-desktop.vercel.app/" target="_blank" rel="noopener noreferrer" style={{ color: '#8c8c8c', textDecoration: 'underline' }}>https://my-retro-desktop.vercel.app/</a></p>
                    </div>
                  </div>
                </div>
              )
            }
            // 2 Design section
            if (projectName === 'project-2' && section.id === 'section-2') {
              return (
                <div key={section.id} id={section.id} data-section-index={index} className="case-section case-section-project-2">
                  <div className="case-section-text">
                    <h2 className="case-section-heading">{caseSections.length > 1 ? `${index + 1}. ` : ''}{section.heading}</h2>
                    <div className="case-section-description">
                      <p>The design approach focused on creating an atmosphere that feels both familiar and contemplative. The visual language draws from nostalgic aesthetics while maintaining a modern, clean interface that doesn't compete with the artwork.</p>
                      <p>&nbsp;</p>
                      <p><strong>Visual Identity</strong></p>
                      <p>The color palette and typography choices evoke warmth and familiarity, creating an emotional connection that supports the nostalgic theme. The design feels inviting and personal, like browsing through a cherished photo album or visiting a favorite place from childhood.</p>
                      <p>&nbsp;</p>
                      <p><strong>Layout and Navigation</strong></p>
                      <p>The layout prioritizes the artwork, giving each piece space to breathe and be appreciated. Navigation is intuitive, allowing visitors to explore the collection at their own pace while maintaining a sense of discovery and wonder.</p>
                      <p>&nbsp;</p>
                      <p><strong>User Experience</strong></p>
                      <p>The experience is designed to be contemplative and immersive, encouraging visitors to slow down and engage deeply with each piece. Interactive elements enhance the storytelling without overwhelming the core content.</p>
                    </div>
                  </div>
                </div>
              )
            }
            // 2 Mixed Media section
            if (projectName === 'project-2' && section.id === 'section-3') {
              return (
                <div key={section.id} id={section.id} data-section-index={index} className="case-section case-section-last case-section-project-2">
                  <div className="case-section-text">
                    <h2 className="case-section-heading">{caseSections.length > 1 ? `${index + 1}. ` : ''}{section.heading}</h2>
                    <div className="case-section-description">
                      <p>The exhibit showcases a diverse range of media types, each contributing to the overall narrative of nostalgia. Illustrations capture moments and emotions, photographs preserve memories, videos bring scenes to life, and interactive elements invite participation.</p>
                      <p>&nbsp;</p>
                      <p><strong>Media Integration</strong></p>
                      <p>Different media types are seamlessly integrated, creating a cohesive experience despite their varied formats. Each medium is given appropriate presentation that highlights its unique qualities while contributing to the overall theme.</p>
                      <p>&nbsp;</p>
                      <p><strong>Curatorial Approach</strong></p>
                      <p>The selection and arrangement of works create a narrative arc that guides visitors through different aspects of nostalgia. The curation considers both individual pieces and their relationships to each other, building a comprehensive exploration of the theme.</p>
                      <p>&nbsp;</p>
                      <p>This project demonstrates how thoughtful curation and design can create meaningful digital cultural experiences that resonate with audiences and provide a platform for artistic expression and reflection.</p>
                    </div>
                  </div>
                </div>
              )
            }
            // 10 Overview section
            if (projectName === 'project-10' && section.id === 'section-1') {
              return (
                <div key={section.id} id={section.id} data-section-index={index} className="case-section case-section-last case-section-project-10">
                  <div className="case-section-text">
                    <h2 className="case-section-heading">{caseSections.length > 1 ? `${index + 1}. ` : ''}{section.heading}</h2>
                    <div className="case-section-description">
                      <p>As a personal project, I created imagery for the web for ChatGPT Enterprise. I developed visual content that communicates the value proposition for OpenAI.</p>
                      <p>&nbsp;</p>
                      <p>Ultimately, the design process was focused on creating something simple with a clear purpose. The design "speaks for itself".</p>
                    </div>
                  </div>
                </div>
              )
            }
            // 13 Overview section
            if (projectName === 'project-13' && section.id === 'section-1') {
              return (
                <div key={section.id} id={section.id} data-section-index={index} className="case-section case-section-project-13">
                  <div className="case-section-text">
                    <h2 className="case-section-heading">{caseSections.length > 1 ? `${index + 1}. ` : ''}{section.heading}</h2>
                    <div className="case-section-description">
                      <p>TechNova Hackathon is a hackathon event website designed to create safe, inclusive, and empowering spaces for women and non-binary individuals to start, grow, and thrive in the technology industry. The site serves as the digital home for a 36-hour virtual hackathon that brings together students, industry professionals, and sponsors.</p>
                      <p>&nbsp;</p>
                      <p>The website communicates TechNova's mission to foster an inclusive community, connect students with career opportunities, and empower hackers to create. The design needed to balance information about the event schedule, workshops, tech fair, and application process while maintaining an approachable, welcoming atmosphere.</p>
                      <p>&nbsp;</p>
                      <p>This case study demonstrates how thoughtful web design can support community-building initiatives, making technical events more accessible and inviting for underrepresented groups in technology.</p>
                    </div>
                  </div>
                </div>
              )
            }
            // 13 Design section
            if (projectName === 'project-13' && section.id === 'section-2') {
              return (
                <div key={section.id} id={section.id} data-section-index={index} className="case-section case-section-project-13">
                  <div className="case-section-text">
                    <h2 className="case-section-heading">{caseSections.length > 1 ? `${index + 1}. ` : ''}{section.heading}</h2>
                    <div className="case-section-description">
                      <p>The design approach focused on creating a welcoming, energetic atmosphere that reflects TechNova's values of inclusivity and empowerment. The visual language needed to feel approachable for beginners while still conveying the excitement and professionalism of a major hackathon event.</p>
                      <p>&nbsp;</p>
                      <p><strong>Visual Identity</strong></p>
                      <p>The color palette and typography choices create a vibrant, modern feel that appeals to a diverse audience. The design balances playfulness with professionalism, ensuring the site feels both fun and credible.</p>
                      <p>&nbsp;</p>
                      <p><strong>Information Architecture</strong></p>
                      <p>The site organizes complex event information into clear sections: Prepare with Us (workshops), Hack with Us (main hackathon), Connect with Us (tech fair), and Hear from Others (testimonials). This structure helps visitors understand the full event experience and find relevant information quickly.</p>
                      <p>&nbsp;</p>
                      <p><strong>User Experience</strong></p>
                      <p>The design prioritizes clarity and ease of navigation, making it simple for potential participants to understand what the event offers, how to apply, and what to expect. The layout guides users through the event timeline and key information without overwhelming them.</p>
                    </div>
                  </div>
                </div>
              )
            }
            // 13 Framer Showcase section
            if (projectName === 'project-13' && section.id === 'section-3') {
              return (
                <div key={section.id} id={section.id} data-section-index={index} className="case-section case-section-last case-section-project-13">
                  <div className="case-section-text">
                    <h2 className="case-section-heading">{caseSections.length > 1 ? `${index + 1}. ` : ''}{section.heading}</h2>
                    <div className="case-section-description">
                      <p>This project was built entirely in Framer, demonstrating the platform's ability to create engaging event websites with multiple sections, interactive elements, and dynamic content. Framer enabled rapid iteration on the design and seamless deployment of a fully functional event site.</p>
                      <p>&nbsp;</p>
                      <p>The platform's capabilities allowed for sophisticated layouts, animations, and interactions that would typically require extensive development work. The site effectively communicates TechNova's mission while providing all necessary information for participants, sponsors, and attendees.</p>
                      <p>&nbsp;</p>
                      <p><strong>Experience the live site:</strong></p>
                      <p><a href="https://2022-technova.framer.website/" target="_blank" rel="noopener noreferrer" style={{ color: '#8c8c8c', textDecoration: 'underline' }}>https://2022-technova.framer.website/</a></p>
                      <p>&nbsp;</p>
                      <p>This project showcases how Framer empowers designers to create comprehensive event websites that effectively communicate complex information while maintaining design quality and user experience standards, enabling community organizations to build professional digital presences without traditional development constraints.</p>
                    </div>
                  </div>
                </div>
              )
            }
            // 9 Overview section
            if (projectName === 'project-9' && section.id === 'section-1') {
              return (
                <div key={section.id} id={section.id} data-section-index={index} className="case-section case-section-project-9">
                  <div className="case-section-text">
                    <h2 className="case-section-heading">{caseSections.length > 1 ? `${index + 1}. ` : ''}{section.heading}</h2>
                    <div className="case-section-description">
                      <p>Dream On, Sucker is a site designed to store ideas for projects and products, including failed versions of products that shut down. The platform serves as a digital archive and reflection space, documenting both successful concepts and those that didn't make it to market.</p>
                      <p>&nbsp;</p>
                      <p>The site acknowledges that not every idea succeeds, and that failure is an important part of the creative and entrepreneurial process. By preserving both successful and unsuccessful projects, Dream On, Sucker creates a comprehensive record of the innovation journey, showing the full spectrum of product development from conception to conclusion.</p>
                      <p>&nbsp;</p>
                      <p>This case study demonstrates how thoughtful design can create meaningful spaces for reflection and learning, turning what might be seen as failures into valuable documentation and educational resources.</p>
                    </div>
                  </div>
                </div>
              )
            }
            // 9 Design section
            if (projectName === 'project-9' && section.id === 'section-2') {
              return (
                <div key={section.id} id={section.id} data-section-index={index} className="case-section case-section-project-9">
                  <div className="case-section-text">
                    <h2 className="case-section-heading">{caseSections.length > 1 ? `${index + 1}. ` : ''}{section.heading}</h2>
                    <div className="case-section-description">
                      <p>The design approach focused on creating a respectful, thoughtful presentation of both successful and unsuccessful projects. The visual language needed to honor the work that went into each project while being honest about outcomes.</p>
                      <p>&nbsp;</p>
                      <p><strong>Visual Identity</strong></p>
                      <p>The design uses a clean, archival aesthetic that feels both professional and contemplative. The visual language treats all projects with equal respect, whether they succeeded or failed, emphasizing the value of the process and learning over outcomes.</p>
                      <p>&nbsp;</p>
                      <p><strong>Content Organization</strong></p>
                      <p>The site organizes projects in a way that makes it easy to browse and learn from both successes and failures. Each project entry provides context about its goals, development process, and eventual outcome, creating a comprehensive archive of innovation attempts.</p>
                      <p>&nbsp;</p>
                      <p><strong>User Experience</strong></p>
                      <p>The interface encourages exploration and reflection, making it easy to discover projects and understand the lessons learned from each. The design supports both casual browsing and deeper research into specific projects or themes.</p>
                    </div>
                  </div>
                </div>
              )
            }
            // 9 Project Archive section
            if (projectName === 'project-9' && section.id === 'section-3') {
              return (
                <div key={section.id} id={section.id} data-section-index={index} className="case-section case-section-last case-section-project-9">
                  <div className="case-section-text">
                    <h2 className="case-section-heading">{caseSections.length > 1 ? `${index + 1}. ` : ''}{section.heading}</h2>
                    <div className="case-section-description">
                      <p>The project archive serves as a comprehensive repository of innovation attempts, preserving both the ideas that succeeded and those that didn't. This approach creates a valuable resource for understanding the full spectrum of product development and the reality that most ideas don't make it to market.</p>
                      <p>&nbsp;</p>
                      <p><strong>Documentation Approach</strong></p>
                      <p>Each archived project includes information about its concept, development process, challenges faced, and eventual outcome. This documentation provides valuable insights into why projects succeed or fail, creating educational content for future innovators.</p>
                      <p>&nbsp;</p>
                      <p><strong>Learning from Failure</strong></p>
                      <p>By treating failed projects with the same respect as successful ones, the archive normalizes failure as part of the innovation process. This approach helps destigmatize unsuccessful attempts and encourages more honest conversations about the realities of product development.</p>
                      <p>&nbsp;</p>
                      <p>This project demonstrates how thoughtful design can create meaningful spaces for reflection and learning, turning what might be seen as failures into valuable documentation that helps future innovators understand the full journey of bringing ideas to life.</p>
                    </div>
                  </div>
                </div>
              )
            }
            // 11 Overview section
            if (projectName === 'project-11' && section.id === 'section-1') {
              return (
                <div key={section.id} id={section.id} data-section-index={index} className="case-section case-section-project-11">
                  <div className="case-section-text">
                    <h2 className="case-section-heading">{caseSections.length > 1 ? `${index + 1}. ` : ''}{section.heading}</h2>
                    <div className="case-section-description">
                      <p>Unity Web Concept is a scrollable interactive web page designed to help users learn more about Unity, the popular game development platform. The site creates an engaging, immersive experience that introduces Unity's capabilities, features, and potential for creators.</p>
                      <p>&nbsp;</p>
                      <p>The design uses scroll-based interactions and animations to guide users through information about Unity, making the learning experience feel dynamic and engaging rather than static. The interactive elements help users understand Unity's features through direct experience rather than just reading about them.</p>
                      <p>&nbsp;</p>
                      <p>This case study demonstrates how interactive web design can transform educational content into engaging experiences, making complex platforms more approachable and helping potential users understand tools through direct interaction.</p>
                    </div>
                  </div>
                </div>
              )
            }
            // 11 Design section
            if (projectName === 'project-11' && section.id === 'section-2') {
              return (
                <div key={section.id} id={section.id} data-section-index={index} className="case-section case-section-project-11">
                  <div className="case-section-text">
                    <h2 className="case-section-heading">{caseSections.length > 1 ? `${index + 1}. ` : ''}{section.heading}</h2>
                    <div className="case-section-description">
                      <p>The design approach focused on creating a scrollable, interactive experience that feels both informative and engaging. The visual language needed to reflect Unity's position as a powerful, professional tool while remaining approachable for beginners.</p>
                      <p>&nbsp;</p>
                      <p><strong>Scroll-Based Interactions</strong></p>
                      <p>The site uses scroll-triggered animations and interactions to reveal content progressively, creating a sense of discovery and engagement. As users scroll, new information appears, animations play, and interactive elements respond, making the learning process feel dynamic and immersive.</p>
                      <p>&nbsp;</p>
                      <p><strong>Visual Language</strong></p>
                      <p>The design uses modern, clean aesthetics that suggest both technical capability and creative potential. The visual language balances professionalism with approachability, making Unity feel accessible to creators at all skill levels.</p>
                      <p>&nbsp;</p>
                      <p><strong>Information Architecture</strong></p>
                      <p>The content is organized to guide users through Unity's key features and capabilities in a logical progression. Each section builds understanding, helping users gradually learn about Unity's potential and how it can support their creative projects.</p>
                    </div>
                  </div>
                </div>
              )
            }
            // 11 Interactive Experience section
            if (projectName === 'project-11' && section.id === 'section-3') {
              return (
                <div key={section.id} id={section.id} data-section-index={index} className="case-section case-section-last case-section-project-11">
                  <div className="case-section-text">
                    <h2 className="case-section-heading">{caseSections.length > 1 ? `${index + 1}. ` : ''}{section.heading}</h2>
                    <div className="case-section-description">
                      <p>The interactive experience transforms learning about Unity from passive reading into active exploration. Scroll-based interactions, animations, and dynamic content reveal create an engaging journey that helps users understand Unity's capabilities through direct experience.</p>
                      <p>&nbsp;</p>
                      <p><strong>Engagement Through Interaction</strong></p>
                      <p>Interactive elements respond to user scrolling and input, creating a sense of agency and participation. This approach makes the learning process feel more like exploration than study, encouraging users to continue engaging with the content.</p>
                      <p>&nbsp;</p>
                      <p><strong>Progressive Disclosure</strong></p>
                      <p>Information is revealed progressively as users scroll, preventing information overload while maintaining engagement. This approach helps users absorb information at their own pace, making complex topics more digestible.</p>
                      <p>&nbsp;</p>
                      <p>This project showcases how interactive web design can transform educational content into engaging experiences, making complex platforms more approachable and helping potential users understand tools through direct interaction rather than traditional documentation.</p>
                    </div>
                  </div>
                </div>
              )
            }
            // 7 Overview section
            if (projectName === 'project-7' && section.id === 'section-1') {
              return (
                <div key={section.id} id={section.id} data-section-index={index} className="case-section case-section-project-7">
                  <div className="case-section-text">
                    <h2 className="case-section-heading">{caseSections.length > 1 ? `${index + 1}. ` : ''}{section.heading}</h2>
                    <div className="case-section-description">
                      <p>My Mac Desktop is a personal project where I recreated my Mac Desktop for fun to show what I use and what I've made. The project showcases both the tools and applications I use daily, as well as personal projects that exist outside of my portfolio—like my crochet projects, a cat bed I'm making, my Minecraft YouTube channel, and other creative endeavors.</p>
                      <p>&nbsp;</p>
                      <p>The recreation captures the essence of my workspace, revealing not just my professional tools but also the personal projects and hobbies that shape my creative identity. It's a snapshot of my digital life, showing the intersection between work and personal interests.</p>
                      <p>&nbsp;</p>
                      <p>This case study demonstrates how personal projects can provide insight into a creator's broader interests and the tools they use, creating a more complete picture of their creative practice beyond their professional portfolio.</p>
                    </div>
                  </div>
                </div>
              )
            }
            // 7 Design section
            if (projectName === 'project-7' && section.id === 'section-2') {
              return (
                <div key={section.id} id={section.id} data-section-index={index} className="case-section case-section-project-7">
                  <div className="case-section-text">
                    <h2 className="case-section-heading">{caseSections.length > 1 ? `${index + 1}. ` : ''}{section.heading}</h2>
                    <div className="case-section-description">
                      <p>The design approach focused on creating an accurate, detailed recreation of my Mac Desktop that feels authentic and personal. The visual language needed to capture both the familiar macOS interface and the unique personal touches that make it my own workspace.</p>
                      <p>&nbsp;</p>
                      <p><strong>Visual Accuracy</strong></p>
                      <p>The recreation pays attention to detail, accurately representing the macOS interface, icons, and layout. This attention to detail creates a sense of authenticity and makes the project feel like a genuine snapshot of my desktop environment.</p>
                      <p>&nbsp;</p>
                      <p><strong>Personal Elements</strong></p>
                      <p>The design includes personal touches that reveal my interests and projects outside of my portfolio. These elements—from crochet projects to YouTube channels—create a more complete picture of who I am as a creator and what inspires me.</p>
                      <p>&nbsp;</p>
                      <p><strong>Narrative Through Organization</strong></p>
                      <p>The arrangement of icons and windows tells a story about my workflow and interests. The organization reveals how I structure my digital workspace and what tools and projects are most important to me.</p>
                    </div>
                  </div>
                </div>
              )
            }
            // 7 Personal Projects section
            if (projectName === 'project-7' && section.id === 'section-3') {
              return (
                <div key={section.id} id={section.id} data-section-index={index} className="case-section case-section-last case-section-project-7">
                  <div className="case-section-text">
                    <h2 className="case-section-heading">{caseSections.length > 1 ? `${index + 1}. ` : ''}{section.heading}</h2>
                    <div className="case-section-description">
                      <p>The desktop recreation showcases various personal projects that exist outside of my professional portfolio, providing a glimpse into my broader creative interests and hobbies. These projects include crochet work, physical crafting projects like a cat bed, content creation through my Minecraft YouTube channel, and other personal creative endeavors.</p>
                      <p>&nbsp;</p>
                      <p><strong>Beyond the Portfolio</strong></p>
                      <p>These personal projects represent the full spectrum of my creative practice, showing that my interests extend beyond professional design work. They reveal the hobbies, experiments, and side projects that fuel my creativity and inform my professional work.</p>
                      <p>&nbsp;</p>
                      <p><strong>Creative Identity</strong></p>
                      <p>By including these personal projects, the desktop recreation creates a more complete picture of my creative identity. It shows that creativity isn't limited to professional work but extends into all aspects of life, from crafting to content creation to experimentation.</p>
                      <p>&nbsp;</p>
                      <p>This project demonstrates how personal projects can provide valuable insight into a creator's interests and inspirations, showing the full range of their creative practice and the diverse ways they express their creativity.</p>
                    </div>
                  </div>
                </div>
              )
            }
            // 6 Overview section
            if (projectName === 'project-6' && section.id === 'section-1') {
              return (
                <div key={section.id} id={section.id} data-section-index={index} className="case-section case-section-project-6">
                  <div className="case-section-text">
                    <h2 className="case-section-heading">{caseSections.length > 1 ? `${index + 1}. ` : ''}{section.heading}</h2>
                    <div className="case-section-description">
                      <p>Duolingo Concept is a design exploration of how I might make the Duolingo app UI interactive with motion. The project reimagines the language learning experience through thoughtful motion design, creating interactions that feel engaging, responsive, and delightful.</p>
                      <p>&nbsp;</p>
                      <p>The concept focuses on enhancing the user experience through motion that provides feedback, guides attention, and makes the learning process feel more dynamic and engaging. Motion becomes a tool for communication, helping users understand their progress, celebrate achievements, and navigate the interface more intuitively.</p>
                      <p>&nbsp;</p>
                      <p>This case study demonstrates how motion design can transform a functional app into a more engaging, delightful experience, showing how thoughtful animation can enhance usability while making interactions feel more human and responsive.</p>
                    </div>
                  </div>
                </div>
              )
            }
            // 6 Design section
            if (projectName === 'project-6' && section.id === 'section-2') {
              return (
                <div key={section.id} id={section.id} data-section-index={index} className="case-section case-section-project-6">
                  <div className="case-section-text">
                    <h2 className="case-section-heading">{caseSections.length > 1 ? `${index + 1}. ` : ''}{section.heading}</h2>
                    <div className="case-section-description">
                      <p>The design approach focused on creating motion interactions that feel natural, purposeful, and delightful. Each animation serves a specific function—providing feedback, guiding attention, or celebrating progress—while maintaining the playful, encouraging tone that makes Duolingo engaging.</p>
                      <p>&nbsp;</p>
                      <p><strong>Motion as Feedback</strong></p>
                      <p>Animations provide immediate, clear feedback for user actions. When users answer questions correctly or incorrectly, motion reinforces the outcome, making the learning process feel more responsive and engaging.</p>
                      <p>&nbsp;</p>
                      <p><strong>Progress Visualization</strong></p>
                      <p>Motion helps visualize progress and achievement, making learning milestones feel more tangible and rewarding. Animated progress bars, level-ups, and streak celebrations use motion to amplify the sense of accomplishment.</p>
                      <p>&nbsp;</p>
                      <p><strong>Navigation and Flow</strong></p>
                      <p>Transitions between screens and lessons use motion to create a sense of continuity and flow. These animations guide users through the learning journey, making navigation feel smooth and intuitive.</p>
                    </div>
                  </div>
                </div>
              )
            }
            // 6 Motion Interaction section
            if (projectName === 'project-6' && section.id === 'section-3') {
              return (
                <div key={section.id} id={section.id} data-section-index={index} className="case-section case-section-last case-section-project-6">
                  <div className="case-section-text">
                    <h2 className="case-section-heading">{caseSections.length > 1 ? `${index + 1}. ` : ''}{section.heading}</h2>
                    <div className="case-section-description">
                      <p>The motion interactions transform the Duolingo experience from static to dynamic, making every interaction feel responsive and engaging. Motion becomes a language of its own, communicating feedback, progress, and encouragement through animation.</p>
                      <p>&nbsp;</p>
                      <p><strong>Interactive Feedback</strong></p>
                      <p>Every user action receives animated feedback that feels immediate and satisfying. Correct answers celebrate with motion, incorrect answers provide gentle, encouraging feedback, and progress updates animate to show advancement through lessons.</p>
                      <p>&nbsp;</p>
                      <p><strong>Emotional Connection</strong></p>
                      <p>Motion creates an emotional connection with the learning process, making achievements feel more rewarding and mistakes feel less discouraging. The animations add personality to the interface, making the app feel more like a supportive learning companion than a static tool.</p>
                      <p>&nbsp;</p>
                      <p>This project showcases how motion design can enhance app experiences, demonstrating that thoughtful animation can make interactions feel more human, responsive, and engaging while improving usability and user satisfaction.</p>
                    </div>
                  </div>
                </div>
              )
            }
            // 1 Overview section
            if (projectName === 'project-1' && section.id === 'section-1') {
              return (
                <div key={section.id} id={section.id} data-section-index={index} className="case-section case-section-project-1">
                  <div className="case-section-text">
                    <h2 className="case-section-heading">{caseSections.length > 1 ? `${index + 1}. ` : ''}{section.heading}</h2>
                    <div className="case-section-description">
                      <p>PPT Night Poster is a personal project that explores the unexpected through interactive animation. Using Rive, I created an animated poster that reveals something surprising about myself—challenging first impressions and inviting viewers to discover a hidden layer.</p>
                      <p>&nbsp;</p>
                      <p>The project represents a playful experiment in self-expression through motion design, where the medium itself becomes part of the message. The interactive element encourages engagement, making the discovery of the unexpected moment feel personal and memorable.</p>
                      <p>&nbsp;</p>
                      <p>This case study demonstrates how animation and interactivity can transform static design into an experience that tells a story beyond what's immediately visible.</p>
                    </div>
                  </div>
                </div>
              )
            }
            // 1 Design section
            if (projectName === 'project-1' && section.id === 'section-2') {
              return (
                <div key={section.id} id={section.id} data-section-index={index} className="case-section case-section-project-1">
                  <div className="case-section-text">
                    <h2 className="case-section-heading">{caseSections.length > 1 ? `${index + 1}. ` : ''}{section.heading}</h2>
                    <div className="case-section-description">
                      <p>The design process focused on creating a visual narrative that builds anticipation before revealing the unexpected element. The poster starts with a clean, professional aesthetic that hints at one interpretation, then transforms to reveal something completely different.</p>
                      <p>&nbsp;</p>
                      <p><strong>Visual Language</strong></p>
                      <p>The initial design uses familiar, approachable visuals that set up expectations. The color palette and typography are carefully chosen to support the narrative arc from expectation to surprise.</p>
                      <p>&nbsp;</p>
                      <p><strong>Animation Strategy</strong></p>
                      <p>The motion design guides the viewer's attention and creates a moment of discovery. Transitions are timed to maximize impact, making the reveal feel natural yet surprising.</p>
                      <p>&nbsp;</p>
                      <p><strong>Interactive Elements</strong></p>
                      <p>User interaction triggers the transformation, making the experience feel personal and engaging. The interactive nature encourages exploration and repeat viewing.</p>
                    </div>
                  </div>
                </div>
              )
            }
            // 1 Rive Animation section
            if (projectName === 'project-1' && section.id === 'section-3') {
              return (
                <div key={section.id} id={section.id} data-section-index={index} className="case-section case-section-last case-section-project-1">
                  <div className="case-section-text">
                    <h2 className="case-section-heading">{caseSections.length > 1 ? `${index + 1}. ` : ''}{section.heading}</h2>
                    <div className="case-section-description">
                      <p>This project was built using Rive, a powerful tool for creating interactive animations that run smoothly across platforms. Rive enabled me to create complex animations with precise timing and smooth transitions that would be difficult to achieve with traditional animation tools.</p>
                      <p>&nbsp;</p>
                      <p>The platform's capabilities allowed for seamless integration of interactive elements, making the poster feel alive and responsive. The animation runs efficiently, maintaining performance while delivering a rich, engaging experience.</p>
                      <p>&nbsp;</p>
                      <p>This project showcases how modern animation tools like Rive can elevate design work, transforming static visuals into interactive experiences that tell deeper stories and create memorable moments of connection with viewers.</p>
                    </div>
                  </div>
                </div>
              )
            }
            // 8 Overview section
            if (projectName === 'project-8' && section.id === 'section-1') {
              return (
                <div key={section.id} id={section.id} data-section-index={index} className="case-section case-section-project-8">
                  <div className="case-section-text">
                    <h2 className="case-section-heading">{caseSections.length > 1 ? `${index + 1}. ` : ''}{section.heading}</h2>
                    <div className="case-section-description">
                      <p>Pixeldoro is an RPG-style pixel art Pomodoro timer that gamifies productivity. I designed all the game UI assets, creating a cohesive visual system that makes time management feel like an adventure rather than a chore.</p>
                      <p>&nbsp;</p>
                      <p>The project combines the proven effectiveness of the Pomodoro Technique with the engaging aesthetics of retro RPG games. Players complete work sessions to progress through their day, with visual feedback and rewards that make productivity feel rewarding and fun.</p>
                      <p>&nbsp;</p>
                      <p>This case study demonstrates how game design principles can be applied to productivity tools, creating experiences that motivate users through visual storytelling and interactive feedback.</p>
                    </div>
                  </div>
                </div>
              )
            }
            // 8 Game Design section
            if (projectName === 'project-8' && section.id === 'section-2') {
              return (
                <div key={section.id} id={section.id} data-section-index={index} className="case-section case-section-project-8">
                  <div className="case-section-text">
                    <h2 className="case-section-heading">{caseSections.length > 1 ? `${index + 1}. ` : ''}{section.heading}</h2>
                    <div className="case-section-description">
                      <p>The game design centers around creating a sense of progression and achievement. Each completed Pomodoro session feels like a small victory, with visual rewards and progress indicators that keep users motivated.</p>
                      <p>&nbsp;</p>
                      <p><strong>RPG Mechanics</strong></p>
                      <p>The interface uses familiar RPG elements like health bars, experience points, and character progression to make time tracking feel like leveling up. These mechanics provide clear feedback and create a sense of accomplishment.</p>
                      <p>&nbsp;</p>
                      <p><strong>Pixel Art Aesthetic</strong></p>
                      <p>The retro pixel art style creates a nostalgic, approachable feel that makes the tool less intimidating than traditional productivity apps. The visual language is playful yet functional, balancing charm with clarity.</p>
                      <p>&nbsp;</p>
                      <p><strong>User Experience</strong></p>
                      <p>The design prioritizes ease of use while maintaining the game-like feel. Controls are intuitive, and the visual feedback is immediate and satisfying, making the act of starting a timer feel like beginning a quest.</p>
                    </div>
                  </div>
                </div>
              )
            }
            // 8 UI Assets section
            if (projectName === 'project-8' && section.id === 'section-3') {
              return (
                <div key={section.id} id={section.id} data-section-index={index} className="case-section case-section-last case-section-project-8">
                  <div className="case-section-text">
                    <h2 className="case-section-heading">{caseSections.length > 1 ? `${index + 1}. ` : ''}{section.heading}</h2>
                    <div className="case-section-description">
                      <p>I designed all the game UI assets from scratch, creating a cohesive pixel art style that feels both nostalgic and modern. Each element was carefully crafted to fit within the RPG theme while maintaining clarity and functionality.</p>
                      <p>&nbsp;</p>
                      <p><strong>Asset Creation</strong></p>
                      <p>All icons, buttons, progress bars, and interface elements were designed in pixel art style, ensuring consistency across the entire application. The assets use a limited color palette that creates visual harmony while maintaining good contrast for usability.</p>
                      <p>&nbsp;</p>
                      <p><strong>Visual System</strong></p>
                      <p>The UI assets work together to create a unified visual language that supports the game mechanics. Each element reinforces the RPG theme while serving its functional purpose, creating an immersive experience that makes productivity feel engaging.</p>
                      <p>&nbsp;</p>
                      <p>This project showcases how thoughtful asset design can transform a functional tool into an experience that users look forward to using, proving that productivity apps don't have to be boring.</p>
                    </div>
                  </div>
                </div>
              )
            }
            return (
              <div key={section.id} id={section.id} data-section-index={index} className="case-section">
                <div className="case-section-text">
                  <h2 className="case-section-heading">{index + 1}. {section.heading}</h2>
                  <p>Placeholder text content for {section.heading.toLowerCase()}. This will be replaced with actual project description and details.</p>
                </div>
              </div>
            )
          })}
              {/* Divider container at the end - 30% height on desktop, hidden on mobile */}
              <div className="case-section-divider case-section-divider-end"></div>
        </div>
        <div className="case-imagery-container">
          {caseSections.map((section, index) => {
            // 5 Overview section has custom imagery
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
                  <Caption number="1.0" text=" Project Scope" type="Image" />
                </div>
              )
            }
            // 5 Problem section has video
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
                  <Caption number="2.0" text=" Hicks Law" type="Video" />
                </div>
              )
            }
            // 5 Retrospective section has table
            if (projectName === 'project-5' && section.id === 'section-6') {
              return (
                <div key={section.id} data-section-index={index} className={`case-imagery-wrapper ${activeImageId === section.id ? 'active' : ''}`}>
                  <div id={`${section.id}-img`} className={`case-section-image-container ${activeImageId === section.id ? 'active' : ''}`}>
                    <ProjectTakeawaysTable />
                  </div>
                  <Caption number="3.0" text=" Project Takeaways" type="Table" />
                </div>
              )
            }
            // 4 Overview section has video
            if (projectName === 'project-4' && section.id === 'section-1') {
              return (
                <div key={section.id} data-section-index={index} className={`case-imagery-wrapper ${activeImageId === section.id ? 'active' : ''}`}>
                  <img
                    id={`${section.id}-img`}
                    src={adobeBusinessScope}
                    alt="Adobe Business Scope"
                    className={`case-section-image ${activeImageId === section.id ? 'active' : ''}`}
                  />
                  <Caption number="1.0" text=" Project Scope" type="Image" />
                </div>
              )
            }
            // 4 Design section has video
            if (projectName === 'project-4' && section.id === 'section-2') {
              return (
                <div key={section.id} data-section-index={index} className={`case-imagery-wrapper ${activeImageId === section.id ? 'active' : ''}`}>
                  <video
                    id={`${section.id}-img`}
                    className={`case-section-video ${activeImageId === section.id ? 'active' : ''}`}
                    src={adobeBusinessFramerPreview}
                    muted
                    playsInline
                    onMouseEnter={(e) => {
                      const video = e.target
                      video.currentTime = 0
                      video.play().catch(err => console.log('Video hover play prevented:', err))
                    }}
                  />
                  <Caption number="2.0" text=" Framer Preview" type="Video" />
                </div>
              )
            }
            // 4 Framer Showcase section has video
            if (projectName === 'project-4' && section.id === 'section-3') {
              return (
                <div key={section.id} data-section-index={index} className={`case-imagery-wrapper ${activeImageId === section.id ? 'active' : ''}`}>
                  <video
                    id={`${section.id}-img`}
                    className={`case-section-video ${activeImageId === section.id ? 'active' : ''}`}
                    src={adobeBusinessMotion}
                    muted
                    playsInline
                    onMouseEnter={(e) => {
                      const video = e.target
                      video.currentTime = 0
                      video.play().catch(err => console.log('Video hover play prevented:', err))
                    }}
                  />
                  <Caption number="3.0" text=" Content Management Motion" type="Video" />
                </div>
              )
            }
            // 3 Overview section has image
            if (projectName === 'project-3' && section.id === 'section-1') {
              return (
                <div key={section.id} data-section-index={index} className={`case-imagery-wrapper ${activeImageId === section.id ? 'active' : ''}`}>
                  <img
                    id={`${section.id}-img`}
                    src={work3Image}
                    alt="Perplexity Concept"
                    className={`case-section-image ${activeImageId === section.id ? 'active' : ''}`}
                  />
                  <Caption number="1.0" text=" Site Overview" type="Image" />
                </div>
              )
            }
            // 3 Design section has image
            if (projectName === 'project-3' && section.id === 'section-2') {
              return (
                <div key={section.id} data-section-index={index} className={`case-imagery-wrapper ${activeImageId === section.id ? 'active' : ''}`}>
                  <img
                    id={`${section.id}-img`}
                    src={work3Image}
                    alt="Perplexity Design"
                    className={`case-section-image ${activeImageId === section.id ? 'active' : ''}`}
                  />
                  <Caption number="2.0" text=" Design Showcase" type="Image" />
                </div>
              )
            }
            // 3 Implementation section has image
            if (projectName === 'project-3' && section.id === 'section-3') {
              return (
                <div key={section.id} data-section-index={index} className={`case-imagery-wrapper ${activeImageId === section.id ? 'active' : ''}`}>
                  <img
                    id={`${section.id}-img`}
                    src={work3Image}
                    alt="Perplexity Implementation"
                    className={`case-section-image ${activeImageId === section.id ? 'active' : ''}`}
                  />
                  <Caption number="3.0" text=" Implementation" type="Image" />
                </div>
              )
            }
            // 12 Overview section has image
            if (projectName === 'project-12' && section.id === 'section-1') {
              return (
                <div key={section.id} data-section-index={index} className={`case-imagery-wrapper ${activeImageId === section.id ? 'active' : ''}`}>
                  <img
                    id={`${section.id}-img`}
                    src={answerThisPng}
                    alt="AnswerThis Overview"
                    className={`case-section-image ${activeImageId === section.id ? 'active' : ''}`}
                  />
                  <Caption number="1.0" text=" Site Overview" type="Image" />
                </div>
              )
            }
            // 12 Design section has image
            if (projectName === 'project-12' && section.id === 'section-2') {
              return (
                <div key={section.id} data-section-index={index} className={`case-imagery-wrapper ${activeImageId === section.id ? 'active' : ''}`}>
                  <img
                    id={`${section.id}-img`}
                    src={answerThisPng}
                    alt="AnswerThis Design"
                    className={`case-section-image ${activeImageId === section.id ? 'active' : ''}`}
                  />
                  <Caption number="2.0" text=" Design Showcase" type="Image" />
                </div>
              )
            }
            // 12 Framer Showcase section has image
            if (projectName === 'project-12' && section.id === 'section-3') {
              return (
                <div key={section.id} data-section-index={index} className={`case-imagery-wrapper ${activeImageId === section.id ? 'active' : ''}`}>
                  <img
                    id={`${section.id}-img`}
                    src={answerThisPng}
                    alt="AnswerThis Framer"
                    className={`case-section-image ${activeImageId === section.id ? 'active' : ''}`}
                  />
                  <Caption number="3.0" text=" Framer Implementation" type="Image" />
                </div>
              )
            }
            // 1 Overview section has video
            if (projectName === 'project-1' && section.id === 'section-1') {
              return (
                <div key={section.id} data-section-index={index} className={`case-imagery-wrapper ${activeImageId === section.id ? 'active' : ''}`}>
                  <video
                    id={`${section.id}-img`}
                    className={`case-section-video ${activeImageId === section.id ? 'active' : ''}`}
                    src={toasterWebm}
                    muted
                    playsInline
                    onMouseEnter={(e) => {
                      const video = e.target
                      video.currentTime = 0
                      video.play().catch(err => console.log('Video hover play prevented:', err))
                    }}
                  />
                  <Caption number="1.0" text=" Site Overview" type="Video" />
                </div>
              )
            }
            // 1 Design section has video
            if (projectName === 'project-1' && section.id === 'section-2') {
              return (
                <div key={section.id} data-section-index={index} className={`case-imagery-wrapper ${activeImageId === section.id ? 'active' : ''}`}>
                  <video
                    id={`${section.id}-img`}
                    className={`case-section-video ${activeImageId === section.id ? 'active' : ''}`}
                    src={toasterWebm}
                    muted
                    playsInline
                    onMouseEnter={(e) => {
                      const video = e.target
                      video.currentTime = 0
                      video.play().catch(err => console.log('Video hover play prevented:', err))
                    }}
                  />
                  <Caption number="2.0" text=" Design Showcase" type="Video" />
                </div>
              )
            }
            // 1 Rive Animation section has video
            if (projectName === 'project-1' && section.id === 'section-3') {
              return (
                <div key={section.id} data-section-index={index} className={`case-imagery-wrapper ${activeImageId === section.id ? 'active' : ''}`}>
                  <video
                    id={`${section.id}-img`}
                    className={`case-section-video ${activeImageId === section.id ? 'active' : ''}`}
                    src={toasterWebm}
                    muted
                    playsInline
                    onMouseEnter={(e) => {
                      const video = e.target
                      video.currentTime = 0
                      video.play().catch(err => console.log('Video hover play prevented:', err))
                    }}
                  />
                  <Caption number="3.0" text=" Rive Animation" type="Video" />
                </div>
              )
            }
            // 8 Overview section has video
            if (projectName === 'project-8' && section.id === 'section-1') {
              return (
                <div key={section.id} data-section-index={index} className={`case-imagery-wrapper ${activeImageId === section.id ? 'active' : ''}`}>
                  <video
                    id={`${section.id}-img`}
                    className={`case-section-video ${activeImageId === section.id ? 'active' : ''}`}
                    src={pixeldoroWebm}
                    muted
                    playsInline
                    onMouseEnter={(e) => {
                      const video = e.target
                      video.currentTime = 0
                      video.play().catch(err => console.log('Video hover play prevented:', err))
                    }}
                  />
                  <Caption number="1.0" text=" Site Overview" type="Video" />
                </div>
              )
            }
            // 8 Game Design section has video
            if (projectName === 'project-8' && section.id === 'section-2') {
              return (
                <div key={section.id} data-section-index={index} className={`case-imagery-wrapper ${activeImageId === section.id ? 'active' : ''}`}>
                  <video
                    id={`${section.id}-img`}
                    className={`case-section-video ${activeImageId === section.id ? 'active' : ''}`}
                    src={pixeldoroWebm}
                    muted
                    playsInline
                    onMouseEnter={(e) => {
                      const video = e.target
                      video.currentTime = 0
                      video.play().catch(err => console.log('Video hover play prevented:', err))
                    }}
                  />
                  <Caption number="2.0" text=" Game Design" type="Video" />
                </div>
              )
            }
            // 8 UI Assets section has video
            if (projectName === 'project-8' && section.id === 'section-3') {
              return (
                <div key={section.id} data-section-index={index} className={`case-imagery-wrapper ${activeImageId === section.id ? 'active' : ''}`}>
                  <video
                    id={`${section.id}-img`}
                    className={`case-section-video ${activeImageId === section.id ? 'active' : ''}`}
                    src={pixeldoroWebm}
                    muted
                    playsInline
                    onMouseEnter={(e) => {
                      const video = e.target
                      video.currentTime = 0
                      video.play().catch(err => console.log('Video hover play prevented:', err))
                    }}
                  />
                  <Caption number="3.0" text=" UI Assets" type="Video" />
                </div>
              )
            }
            // 15 Overview section has video
            if (projectName === 'project-15' && section.id === 'section-1') {
              return (
                <div key={section.id} data-section-index={index} className={`case-imagery-wrapper ${activeImageId === section.id ? 'active' : ''}`}>
                  <video
                    id={`${section.id}-img`}
                    className={`case-section-video ${activeImageId === section.id ? 'active' : ''}`}
                    src={radialBitmapMp4}
                    muted
                    playsInline
                    onMouseEnter={(e) => {
                      const video = e.target
                      video.currentTime = 0
                      video.play().catch(err => console.log('Video hover play prevented:', err))
                    }}
                  />
                  <Caption number="1.0" text=" Site Overview" type="Video" />
                </div>
              )
            }
            // 15 Tool Design section has video
            if (projectName === 'project-15' && section.id === 'section-2') {
              return (
                <div key={section.id} data-section-index={index} className={`case-imagery-wrapper ${activeImageId === section.id ? 'active' : ''}`}>
                  <video
                    id={`${section.id}-img`}
                    className={`case-section-video ${activeImageId === section.id ? 'active' : ''}`}
                    src={radialBitmapMp4}
                    muted
                    playsInline
                    onMouseEnter={(e) => {
                      const video = e.target
                      video.currentTime = 0
                      video.play().catch(err => console.log('Video hover play prevented:', err))
                    }}
                  />
                  <Caption number="2.0" text=" Tool Design" type="Video" />
                </div>
              )
            }
            // 15 Implementation section has video
            if (projectName === 'project-15' && section.id === 'section-3') {
              return (
                <div key={section.id} data-section-index={index} className={`case-imagery-wrapper ${activeImageId === section.id ? 'active' : ''}`}>
                  <video
                    id={`${section.id}-img`}
                    className={`case-section-video ${activeImageId === section.id ? 'active' : ''}`}
                    src={radialBitmapMp4}
                    muted
                    playsInline
                    onMouseEnter={(e) => {
                      const video = e.target
                      video.currentTime = 0
                      video.play().catch(err => console.log('Video hover play prevented:', err))
                    }}
                  />
                  <Caption number="3.0" text=" Implementation" type="Video" />
                </div>
              )
            }
            // 2 Overview section has image
            if (projectName === 'project-2' && section.id === 'section-1') {
              return (
                <div key={section.id} data-section-index={index} className={`case-imagery-wrapper ${activeImageId === section.id ? 'active' : ''}`}>
                  <video
                    id={`${section.id}-img`}
                    className={`case-section-video ${activeImageId === section.id ? 'active' : ''}`}
                    src={retroSiteMp4}
                    autoPlay
                    muted
                    playsInline
                  />
                  <Caption number="1.0" text=" Site Overview" type="Image" />
                </div>
              )
            }
            // 2 Design section has image
            if (projectName === 'project-2' && section.id === 'section-2') {
              return (
                <div key={section.id} data-section-index={index} className={`case-imagery-wrapper ${activeImageId === section.id ? 'active' : ''}`}>
                  <video
                    id={`${section.id}-img`}
                    className={`case-section-video ${activeImageId === section.id ? 'active' : ''}`}
                    src={retroSiteMp4}
                    autoPlay
                    muted
                    playsInline
                  />
                  <Caption number="2.0" text=" Design" type="Image" />
                </div>
              )
            }
            // 2 Mixed Media section has image
            if (projectName === 'project-2' && section.id === 'section-3') {
              return (
                <div key={section.id} data-section-index={index} className={`case-imagery-wrapper ${activeImageId === section.id ? 'active' : ''}`}>
                  <video
                    id={`${section.id}-img`}
                    className={`case-section-video ${activeImageId === section.id ? 'active' : ''}`}
                    src={retroSiteMp4}
                    autoPlay
                    muted
                    playsInline
                  />
                  <Caption number="3.0" text=" Mixed Media" type="Image" />
                </div>
              )
            }
            // 10 Overview section has image
            if (projectName === 'project-10' && section.id === 'section-1') {
              const openaiImages = [openai0, openai1, openai2]
              const openaiCaptions = [
                "Concept 1 - Save Time",
                "Concept 2 - Parallel Code Tasks",
                "Concept 3 - Data Insights"
              ]
              return (
                <div key={section.id} data-section-index={index} className={`case-imagery-wrapper case-imagery-wrapper-center ${activeImageId === section.id ? 'active' : ''}`}>
                  <div
                    id={`${section.id}-img`}
                    className={`case-section-slideshow ${activeImageId === section.id ? 'active' : ''}`}
                  >
                    <Slideshow 
                      images={openaiImages} 
                      active={activeImageId === section.id} 
                      onSlideChange={(index) => setSlideshowIndex(index)}
                    />
                  </div>
                  <Caption 
                    number="1.0" 
                    text={` ${openaiCaptions[slideshowIndex] || openaiCaptions[0]}`}
                    type="Slideshow"
                  />
                </div>
              )
            }
            // 10 Design section has image
            // 13 Overview section has video
            if (projectName === 'project-13' && section.id === 'section-1') {
              return (
                <div key={section.id} data-section-index={index} className={`case-imagery-wrapper ${activeImageId === section.id ? 'active' : ''}`}>
                  <video
                    id={`${section.id}-img`}
                    className={`case-section-video ${activeImageId === section.id ? 'active' : ''}`}
                    src={techNovaMp4}
                    muted
                    playsInline
                    onMouseEnter={(e) => {
                      const video = e.target
                      video.currentTime = 0
                      video.play().catch(err => console.log('Video hover play prevented:', err))
                    }}
                  />
                  <Caption number="1.0" text=" Site Overview" type="Video" />
                </div>
              )
            }
            // 13 Design section has video
            if (projectName === 'project-13' && section.id === 'section-2') {
              return (
                <div key={section.id} data-section-index={index} className={`case-imagery-wrapper ${activeImageId === section.id ? 'active' : ''}`}>
                  <video
                    id={`${section.id}-img`}
                    className={`case-section-video ${activeImageId === section.id ? 'active' : ''}`}
                    src={techNovaMp4}
                    muted
                    playsInline
                    onMouseEnter={(e) => {
                      const video = e.target
                      video.currentTime = 0
                      video.play().catch(err => console.log('Video hover play prevented:', err))
                    }}
                  />
                  <Caption number="2.0" text=" Design" type="Video" />
                </div>
              )
            }
            // 13 Framer Showcase section has video
            if (projectName === 'project-13' && section.id === 'section-3') {
              return (
                <div key={section.id} data-section-index={index} className={`case-imagery-wrapper ${activeImageId === section.id ? 'active' : ''}`}>
                  <video
                    id={`${section.id}-img`}
                    className={`case-section-video ${activeImageId === section.id ? 'active' : ''}`}
                    src={techNovaMp4}
                    muted
                    playsInline
                    onMouseEnter={(e) => {
                      const video = e.target
                      video.currentTime = 0
                      video.play().catch(err => console.log('Video hover play prevented:', err))
                    }}
                  />
                  <Caption number="3.0" text=" Framer Implementation" type="Image" />
                </div>
              )
            }
            // 9 Overview section has image
            if (projectName === 'project-9' && section.id === 'section-1') {
              return (
                <div key={section.id} data-section-index={index} className={`case-imagery-wrapper ${activeImageId === section.id ? 'active' : ''}`}>
                  <img
                    id={`${section.id}-img`}
                    src={dreamOnSuckerPng}
                    alt="Dream On, Sucker"
                    className={`case-section-image ${activeImageId === section.id ? 'active' : ''}`}
                  />
                  <Caption number="1.0" text=" Site Overview" type="Image" />
                </div>
              )
            }
            // 9 Design section has image
            if (projectName === 'project-9' && section.id === 'section-2') {
              return (
                <div key={section.id} data-section-index={index} className={`case-imagery-wrapper ${activeImageId === section.id ? 'active' : ''}`}>
                  <img
                    id={`${section.id}-img`}
                    src={dreamOnSuckerPng}
                    alt="Dream On, Sucker Design"
                    className={`case-section-image ${activeImageId === section.id ? 'active' : ''}`}
                  />
                  <Caption number="2.0" text=" Design" type="Image" />
                </div>
              )
            }
            // 9 Project Archive section has image
            if (projectName === 'project-9' && section.id === 'section-3') {
              return (
                <div key={section.id} data-section-index={index} className={`case-imagery-wrapper ${activeImageId === section.id ? 'active' : ''}`}>
                  <img
                    id={`${section.id}-img`}
                    src={dreamOnSuckerPng}
                    alt="Dream On, Sucker Project Archive"
                    className={`case-section-image ${activeImageId === section.id ? 'active' : ''}`}
                  />
                  <Caption number="3.0" text=" Project Archive" type="Image" />
                </div>
              )
            }
            // 11 Overview section has video
            if (projectName === 'project-11' && section.id === 'section-1') {
              return (
                <div key={section.id} data-section-index={index} className={`case-imagery-wrapper ${activeImageId === section.id ? 'active' : ''}`}>
                  <video
                    id={`${section.id}-img`}
                    className={`case-section-video ${activeImageId === section.id ? 'active' : ''}`}
                    src={scrollExampleMp4}
                    muted
                    playsInline
                    onMouseEnter={(e) => {
                      const video = e.target
                      video.currentTime = 0
                      video.play().catch(err => console.log('Video hover play prevented:', err))
                    }}
                  />
                  <Caption number="1.0" text=" Site Overview" type="Video" />
                </div>
              )
            }
            // 11 Design section has video
            if (projectName === 'project-11' && section.id === 'section-2') {
              return (
                <div key={section.id} data-section-index={index} className={`case-imagery-wrapper ${activeImageId === section.id ? 'active' : ''}`}>
                  <video
                    id={`${section.id}-img`}
                    className={`case-section-video ${activeImageId === section.id ? 'active' : ''}`}
                    src={scrollExampleMp4}
                    muted
                    playsInline
                    onMouseEnter={(e) => {
                      const video = e.target
                      video.currentTime = 0
                      video.play().catch(err => console.log('Video hover play prevented:', err))
                    }}
                  />
                  <Caption number="2.0" text=" Design" type="Video" />
                </div>
              )
            }
            // 11 Interactive Experience section has video
            if (projectName === 'project-11' && section.id === 'section-3') {
              return (
                <div key={section.id} data-section-index={index} className={`case-imagery-wrapper ${activeImageId === section.id ? 'active' : ''}`}>
                  <video
                    id={`${section.id}-img`}
                    className={`case-section-video ${activeImageId === section.id ? 'active' : ''}`}
                    src={scrollExampleMp4}
                    muted
                    playsInline
                    onMouseEnter={(e) => {
                      const video = e.target
                      video.currentTime = 0
                      video.play().catch(err => console.log('Video hover play prevented:', err))
                    }}
                  />
                  <Caption number="3.0" text=" Interactive Experience" type="Video" />
                </div>
              )
            }
            // 7 Overview section has video
            if (projectName === 'project-7' && section.id === 'section-1') {
              return (
                <div key={section.id} data-section-index={index} className={`case-imagery-wrapper ${activeImageId === section.id ? 'active' : ''}`}>
                  <div
                    id={`${section.id}-img`}
                    className={`case-section-image ${activeImageId === section.id ? 'active' : ''}`}
                    style={{ width: '100%', height: '100%', backgroundColor: '#e8e8e8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <p style={{ color: '#8c8c8c' }}>Video unavailable</p>
                  </div>
                  <Caption number="1.0" text=" Site Overview" type="Video" />
                </div>
              )
            }
            // 7 Design section has video
            if (projectName === 'project-7' && section.id === 'section-2') {
              return (
                <div key={section.id} data-section-index={index} className={`case-imagery-wrapper ${activeImageId === section.id ? 'active' : ''}`}>
                  <div
                    id={`${section.id}-img`}
                    className={`case-section-image ${activeImageId === section.id ? 'active' : ''}`}
                    style={{ width: '100%', height: '100%', backgroundColor: '#e8e8e8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <p style={{ color: '#8c8c8c' }}>Video unavailable</p>
                  </div>
                  <Caption number="2.0" text=" Design" type="Video" />
                </div>
              )
            }
            // 7 Personal Projects section has video
            if (projectName === 'project-7' && section.id === 'section-3') {
              return (
                <div key={section.id} data-section-index={index} className={`case-imagery-wrapper ${activeImageId === section.id ? 'active' : ''}`}>
                  <div
                    id={`${section.id}-img`}
                    className={`case-section-image ${activeImageId === section.id ? 'active' : ''}`}
                    style={{ width: '100%', height: '100%', backgroundColor: '#e8e8e8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <p style={{ color: '#8c8c8c' }}>Video unavailable</p>
                  </div>
                  <Caption number="3.0" text=" Personal Projects" type="Video" />
                </div>
              )
            }
            // 6 Overview section has video
            if (projectName === 'project-6' && section.id === 'section-1') {
              return (
                <div key={section.id} data-section-index={index} className={`case-imagery-wrapper ${activeImageId === section.id ? 'active' : ''}`}>
                  <video
                    id={`${section.id}-img`}
                    className={`case-section-video ${activeImageId === section.id ? 'active' : ''}`}
                    src={test1Mp4}
                    muted
                    playsInline
                    onMouseEnter={(e) => {
                      const video = e.target
                      video.currentTime = 0
                      video.play().catch(err => console.log('Video hover play prevented:', err))
                    }}
                  />
                  <Caption number="1.0" text=" Site Overview" type="Video" />
                </div>
              )
            }
            // 6 Design section has video
            if (projectName === 'project-6' && section.id === 'section-2') {
              return (
                <div key={section.id} data-section-index={index} className={`case-imagery-wrapper ${activeImageId === section.id ? 'active' : ''}`}>
                  <video
                    id={`${section.id}-img`}
                    className={`case-section-video ${activeImageId === section.id ? 'active' : ''}`}
                    src={test1Mp4}
                    muted
                    playsInline
                    onMouseEnter={(e) => {
                      const video = e.target
                      video.currentTime = 0
                      video.play().catch(err => console.log('Video hover play prevented:', err))
                    }}
                  />
                  <Caption number="2.0" text=" Design" type="Video" />
                </div>
              )
            }
            // 6 Motion Interaction section has video
            if (projectName === 'project-6' && section.id === 'section-3') {
              return (
                <div key={section.id} data-section-index={index} className={`case-imagery-wrapper ${activeImageId === section.id ? 'active' : ''}`}>
                  <video
                    id={`${section.id}-img`}
                    className={`case-section-video ${activeImageId === section.id ? 'active' : ''}`}
                    src={test1Mp4}
                    muted
                    playsInline
                    onMouseEnter={(e) => {
                      const video = e.target
                      video.currentTime = 0
                      video.play().catch(err => console.log('Video hover play prevented:', err))
                    }}
                  />
                  <Caption number="3.0" text=" Motion Interaction" type="Video" />
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
                <Caption number={`${index + 1}.0`} text={` ${section.heading}`} type="Image" />
              </div>
            )
          })}
        </div>
          </>
        )}
        
        {/* Mobile: Vertical layout with text and image together */}
        {projectName !== 'project-14' && projectName !== 'project-2' && projectName !== 'project-15' && (
        <div className="case-mobile-container">
          {caseSections.map((section, index) => {
            // 5 Overview section has custom content
            if (projectName === 'project-5' && section.id === 'section-1') {
              return (
                <div key={section.id} id={`${section.id}-mobile`} data-section-index={index} className="case-mobile-section case-mobile-section-adobe-first">
                  <div className="case-section-text">
                    <h2 className="case-section-heading">{caseSections.length > 1 ? `${index + 1}. ` : ''}{section.heading}</h2>
                    <div className="case-section-description">
                      <p>At Adobe, I designed, tested and shipped the <a href="https://certification.adobe.com/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>Adobe Certification Portal</a>.</p>
                      <p>&nbsp;</p>
                      <p>I was involved in the end-to-end user flows of:</p>
                      <p>&nbsp;</p>
                      <ul>
                        <li>Core Experience</li>
                        <li>Certification Renewals</li>
                        <li>Learning Management Systems (LMS)</li>
                        <li>Platform Integrations</li>
                      </ul>
                      <p>&nbsp;</p>
                      <p>I helped launch the Adobe Certification Portal in October 2024, and the KPIs have grown tremendously during my time on the team:</p>
                      <p>&nbsp;</p>
                      <ul>
                        <li>0 to 1.2 million active users</li>
                        <li>52 to 69% renewal rate (+17%)</li>
                        <li>17k to 30k certification holders (+57%)</li>
                      </ul>
                      <p>&nbsp;</p>
                      <p>Here's an overview of the features and quality of life improvements I've designed and tested, from ideation to launch.</p>
                      <p>&nbsp;</p>
                      <ul>
                        <li>Portal Launch</li>
                        <li>Certification Renewals</li>
                        <li>Course Catalog</li>
                        <li>University Page</li>
                      </ul>
                    </div>
                  </div>
                  <div className="case-mobile-image-container">
                    <img
                      id={`${section.id}-img-mobile-2`}
                      src={scopePng}
                      alt="Scope"
                      className="case-mobile-image"
                    />
                  <Caption number="1.0" text=" Project Scope" type="Image" />
                  </div>
                </div>
              )
            }
            // 5 Problem section has video
            if (projectName === 'project-5' && section.id === 'section-2') {
              return (
                <div key={section.id} id={`${section.id}-mobile`} data-section-index={index} className="case-mobile-section">
                  <div className="case-section-text">
                    <h2 className="case-section-heading">{caseSections.length > 1 ? `${index + 1}. ` : ''}{section.heading}</h2>
                    <div className="case-section-description">
                      <p>On any Adobe forum, there was widespread confusion about what Adobe Digital Experience actually offered. Users start learning one app at a time before exploring others (96% of learners).</p>
                      <p>&nbsp;</p>
                      <p>And when they begun to learn that app, users came across the same set of problems:</p>
                      <p>&nbsp;</p>
                      <ul>
                        <li>There was no central place to learn and practice using the product.</li>
                        <li>It's frustrating and time-consuming to figure out how to learn Adobe Digital Experience products, let alone learn the products themselves.</li>
                      </ul>
                      <p>&nbsp;</p>
                      <p>I conceptualized and pitched building a learning platform, striking a balance between Adobe enterprise partners (primary audience) and individual learners (secondary audience). We received funding and resources to bring the project into existence at <a href="https://certification.adobe.com/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>certification.adobe.com</a>.</p>
                    </div>
                  </div>
                  <video
                    id={`${section.id}-img-mobile`}
                    className="case-mobile-video"
                    src={hicksLawVideo}
                    muted
                    playsInline
                    controls
                  />
                  <Caption number="2.0" text=" Hicks Law" type="Video" />
                </div>
              )
            }
            // 5 Strategy section has custom video
            if (projectName === 'project-5' && section.id === 'section-3') {
              return (
                <div key={section.id} id={`${section.id}-mobile`} data-section-index={index} className="case-mobile-section">
                  <div className="case-section-text">
                    <h2 className="case-section-heading">{caseSections.length > 1 ? `${index + 1}. ` : ''}{section.heading}</h2>
                    <div className="case-section-description">
                      <p>Renewing an Adobe certification felt opaque and misaligned with current industry standards. Early user feedback made it clear that certification holders were frustrated by having to prepare for a full proctored exam every three years to maintain their credential.</p>
                      <p>&nbsp;</p>
                      <p>My user research revealed that this frustration stemmed from placing the entire burden on the user. Adobe required significant time, money, and preparation with the looming risk of failing the exam and repeating the exam prep process. The existing notification system only added stress to their preparation.</p>
                      <p>&nbsp;</p>
                      <p>I resolved this by designing a unified renewal logic model that emphasized continuous learning. The new framework introduced free renewal course modules instead of paid exams, quizzes with multiple attempts, clear eligibility windows, and a trackable progress model—making renewal predictable, achievable, and aligned with how professionals learn today.</p>
                    </div>
                  </div>
                  <div
                    id={`${section.id}-img-mobile`}
                    className="case-mobile-interactable"
                  >
                    <AdobeCertRive />
                  </div>
                  <Caption number="3.0" text=" Course Catalog Assets" type="Interactable" />
                </div>
              )
            }
            // 5 Flow section has custom image
            if (projectName === 'project-5' && section.id === 'section-4') {
              return (
                <div key={section.id} id={`${section.id}-mobile`} data-section-index={index} className="case-mobile-section">
                  <div className="case-section-text">
                    <h2 className="case-section-heading">{caseSections.length > 1 ? `${index + 1}. ` : ''}{section.heading}</h2>
                    <div className="case-section-description">
                      <p><strong>Flow 1 Improvements</strong></p>
                      <p>Overdeliver with clear design and user experience.</p>
                      <p>&nbsp;</p>
                      <p><strong>Flow 2 Improvements</strong></p>
                      <p>Encouraging continuous engagement through gamified elements.</p>
                      <p>&nbsp;</p>
                      <p><strong>Flow 3 Improvements</strong></p>
                      <p>Receive guidance from Adobe product teams outside of the internal team.</p>
                    </div>
                  </div>
                  <img
                    id={`${section.id}-img-mobile`}
                    src={adobePlanPng}
                    alt="Adobe Plan"
                    className="case-mobile-image"
                  />
                  <Caption number={`${index + 1}.0`} text=" Project Timeline" type="Image" />
                </div>
              )
            }
            // 5 Design section has video
            if (projectName === 'project-5' && section.id === 'section-5') {
              return (
                <div key={section.id} id={`${section.id}-mobile`} data-section-index={index} className="case-mobile-section">
                  <div className="case-section-text">
                    <h2 className="case-section-heading">{caseSections.length > 1 ? `${index + 1}. ` : ''}{section.heading}</h2>
                    <div className="case-section-description">
                      <p>For this case study, we'll focus on the efforts for the Course Catalog. For each section of the site, multiple iterations were created and tested to refine the user experience. We designed mobile first for scalability and simplification of the user flow, which acted as the base to then create the desktop version.</p>
                    </div>
                  </div>
                  <video
                    id={`${section.id}-img-mobile`}
                    className="case-mobile-video"
                    src={hicksLawVideo}
                    muted
                    playsInline
                    controls
                  />
                  <Caption 
                    number={`${index + 1}.0`} 
                    text=" Course Catalog" 
                    type="Video"
                  />
                </div>
              )
            }
            // 5 Retrospective section has highlight component and table
            if (projectName === 'project-5' && section.id === 'section-6') {
              return (
                <div key={section.id} id={`${section.id}-mobile`} data-section-index={index} className="case-mobile-section">
                  <div className="case-section-text">
                    <h2 className="case-section-heading">{caseSections.length > 1 ? `${index + 1}. ` : ''}{section.heading}</h2>
                    <div className="case-section-description">
                      <p>By grounding an ambitious vision and timeline in practical, modular steps and data-informed decisions, we were able to deliver meaningful progress quickly.</p>
                      <p>&nbsp;</p>
                      <p>The late nights and great conversations that came from these projects were genuinely the most fun I had in design!</p>
                    </div>
                  </div>
                  <div
                    id={`${section.id}-img-mobile`}
                    className="case-mobile-table"
                  >
                    <ProjectTakeawaysTable />
                  </div>
                  <Caption number={`${index + 1}.0`} text=" Project Takeaways" type="Table" />
                </div>
              )
            }
            // 4 Overview section mobile
            if (projectName === 'project-4' && section.id === 'section-1') {
              return (
                <div key={section.id} id={`${section.id}-mobile`} data-section-index={index} className="case-mobile-section">
                  <div className="case-section-text">
                    <h2 className="case-section-heading">{caseSections.length > 1 ? `${index + 1}. ` : ''}{section.heading}</h2>
                    <div className="case-section-description">
                      <p>Adobe for Business represents Adobe's enterprise solutions, showcasing its comprehensive suite of business analytics products under Adobe Experience Cloud. This project tested and advocated for <a href="https://framer.com/" target="_blank" rel="noopener noreferrer" className="case-section-link">Framer</a> as a prototyping tool.</p>
                      <p>&nbsp;</p>
                      <p>I designed and developed this site using Framer and created the motion animations with Rive and Adobe After Effects.</p>
                    </div>
                  </div>
                  <img
                    id={`${section.id}-img-mobile`}
                    src={adobeBusinessScope}
                    alt="Adobe Business Scope"
                    className="case-mobile-image"
                  />
                  <Caption number="1.0" text=" Project Scope" type="Image" />
                </div>
              )
            }
            // 4 Prototype section mobile
            if (projectName === 'project-4' && section.id === 'section-2') {
              return (
                <div key={section.id} id={`${section.id}-mobile`} data-section-index={index} className="case-mobile-section">
                  <div className="case-section-text">
                    <h2 className="case-section-heading">{caseSections.length > 1 ? `${index + 1}. ` : ''}{section.heading}</h2>
                    <div className="case-section-description">
                      <p>You can experience the complete interactive design, animations, and user flows exactly as intended: <a href="https://business-adobe-sandbox.framer.website/" target="_blank" rel="noopener noreferrer" className="case-section-link">business.adobe.com/home/prototype</a></p>
                      <p>&nbsp;</p>
                      <p><strong>Key design decisions included:</strong></p>
                      <p>&nbsp;</p>
                      <p><strong>Visual Hierarchy</strong></p>
                      <p>Large, impactful hero sections with clear calls-to-action guide users through Adobe's product offerings and business solutions.</p>
                      <p>&nbsp;</p>
                      <p><strong>Interactive Elements</strong></p>
                      <p>Smooth scroll animations, hover effects, and dynamic content reveal create an engaging user experience that showcases Adobe's innovative technology.</p>
                    </div>
                  </div>
                  <video
                    id={`${section.id}-img-mobile`}
                    className="case-mobile-video"
                    src={adobeBusinessFramerPreview}
                    muted
                    playsInline
                    controls
                  />
                  <Caption number="2.0" text=" Framer Preview" type="Video" />
                </div>
              )
            }
            // 4 Motion Design section mobile
            if (projectName === 'project-4' && section.id === 'section-3') {
              return (
                <div key={section.id} id={`${section.id}-mobile`} data-section-index={index} className="case-mobile-section">
                  <div className="case-section-text">
                    <h2 className="case-section-heading">{caseSections.length > 1 ? `${index + 1}. ` : ''}{section.heading}</h2>
                    <div className="case-section-description">
                      <p>The design process focused on creating a clean, professional interface that effectively communicates Adobe's enterprise value proposition.</p>
                    </div>
                  </div>
                  <video
                    id={`${section.id}-img-mobile`}
                    className="case-mobile-video"
                    src={adobeBusinessMotion}
                    muted
                    playsInline
                    controls
                  />
                  <Caption number="3.0" text=" Content Management Motion" type="Video" />
                </div>
              )
            }
            // 3 Overview section mobile
            if (projectName === 'project-3' && section.id === 'section-1') {
              return (
                <div key={section.id} id={`${section.id}-mobile`} data-section-index={index} className="case-mobile-section">
                  <div className="case-section-text">
                    <h2 className="case-section-heading">{caseSections.length > 1 ? `${index + 1}. ` : ''}{section.heading}</h2>
                    <div className="case-section-description">
                      <p>Perplexity AI Comet represents a conceptual redesign of Perplexity's interface, exploring how AI-powered search experiences can be more intuitive and visually engaging. This project demonstrates modern web design principles applied to complex information architecture.</p>
                      <p>&nbsp;</p>
                      <p>The design focuses on creating a seamless experience for users interacting with AI-powered search, balancing clarity of information with the dynamic nature of AI-generated responses. The interface emphasizes readability, visual hierarchy, and smooth interactions that make complex AI interactions feel natural and approachable.</p>
                      <p>&nbsp;</p>
                      <p>This case study showcases how thoughtful design can enhance the user experience of AI tools, making advanced technology accessible and enjoyable for everyday users.</p>
                    </div>
                  </div>
                  <img
                    id={`${section.id}-img-mobile`}
                    src={work3Image}
                    alt="Perplexity Concept"
                    className="case-mobile-image"
                  />
                  <Caption number="1.0" text=" Site Overview" type="Image" />
                </div>
              )
            }
            // 3 Design section mobile
            if (projectName === 'project-3' && section.id === 'section-2') {
              return (
                <div key={section.id} id={`${section.id}-mobile`} data-section-index={index} className="case-mobile-section">
                  <div className="case-section-text">
                    <h2 className="case-section-heading">{caseSections.length > 1 ? `${index + 1}. ` : ''}{section.heading}</h2>
                    <div className="case-section-description">
                      <p>The design process centered on creating an interface that feels both powerful and approachable. Key considerations included how to present AI-generated content in a way that feels trustworthy and easy to digest.</p>
                      <p>&nbsp;</p>
                      <p><strong>Visual Language</strong></p>
                      <p>Clean, modern aesthetics with careful attention to typography and spacing create a sense of clarity and professionalism. The design uses subtle animations and transitions to guide user attention and provide feedback.</p>
                      <p>&nbsp;</p>
                      <p><strong>Information Architecture</strong></p>
                      <p>The layout prioritizes the AI response while maintaining easy access to sources, related queries, and additional context. This hierarchical approach helps users quickly understand and verify information.</p>
                      <p>&nbsp;</p>
                      <p><strong>User Experience</strong></p>
                      <p>Interactive elements are designed to feel responsive and intuitive, with clear visual feedback for user actions. The interface adapts smoothly to different content types and query complexities.</p>
                    </div>
                  </div>
                  <img
                    id={`${section.id}-img-mobile`}
                    src={work3Image}
                    alt="Perplexity Design"
                    className="case-mobile-image"
                  />
                  <Caption number="2.0" text=" Design Showcase" type="Image" />
                </div>
              )
            }
            // 3 Implementation section mobile
            if (projectName === 'project-3' && section.id === 'section-3') {
              return (
                <div key={section.id} id={`${section.id}-mobile`} data-section-index={index} className="case-mobile-section">
                  <div className="case-section-text">
                    <h2 className="case-section-heading">{caseSections.length > 1 ? `${index + 1}. ` : ''}{section.heading}</h2>
                    <div className="case-section-description">
                      <p>This conceptual design explores the potential of modern web interfaces for AI-powered tools. The project demonstrates how thoughtful design can make complex technology feel accessible and intuitive.</p>
                      <p>&nbsp;</p>
                      <p><strong>View the live Perplexity AI Comet site:</strong></p>
                      <p><a href="https://www.perplexity.ai/comet" target="_blank" rel="noopener noreferrer" style={{ color: '#8c8c8c', textDecoration: 'underline' }}>https://www.perplexity.ai/comet</a></p>
                      <p>&nbsp;</p>
                      <p>This project serves as both a design exploration and a demonstration of how user-centered design principles can enhance AI interfaces, creating experiences that feel natural and empowering for users.</p>
                    </div>
                  </div>
                  <img
                    id={`${section.id}-img-mobile`}
                    src={work3Image}
                    alt="Perplexity Implementation"
                    className="case-mobile-image"
                  />
                  <Caption number="3.0" text=" Implementation" type="Image" />
                </div>
              )
            }
            // 12 Overview section mobile
            if (projectName === 'project-12' && section.id === 'section-1') {
              return (
                <div key={section.id} id={`${section.id}-mobile`} data-section-index={index} className="case-mobile-section">
                  <div className="case-section-text">
                    <h2 className="case-section-heading">{caseSections.length > 1 ? `${index + 1}. ` : ''}{section.heading}</h2>
                    <div className="case-section-description">
                      <p>AnswerThis is an all-in-one AI research assistant designed to help researchers from finding research gaps to publication. This project showcases how Framer can be used to create comprehensive, feature-rich web experiences that effectively communicate complex product capabilities.</p>
                      <p>&nbsp;</p>
                      <p>The site demonstrates AnswerThis's powerful features including AI writing assistance, literature review generation, citation management, and access to 250M+ research papers. The design balances information density with clarity, helping researchers quickly understand the platform's value proposition.</p>
                      <p>&nbsp;</p>
                      <p>This case study highlights how modern design tools like Framer enable rapid prototyping and deployment of complex product marketing sites, allowing designers to create production-ready experiences without traditional development constraints.</p>
                    </div>
                  </div>
                  <img
                    id={`${section.id}-img-mobile`}
                    src={answerThisPng}
                    alt="AnswerThis Overview"
                    className="case-mobile-image"
                  />
                  <Caption number="1.0" text=" Site Overview" type="Image" />
                </div>
              )
            }
            // 12 Design section mobile
            if (projectName === 'project-12' && section.id === 'section-2') {
              return (
                <div key={section.id} id={`${section.id}-mobile`} data-section-index={index} className="case-mobile-section">
                  <div className="case-section-text">
                    <h2 className="case-section-heading">{caseSections.length > 1 ? `${index + 1}. ` : ''}{section.heading}</h2>
                    <div className="case-section-description">
                      <p>The design approach focused on creating a clear, trustworthy interface that communicates AnswerThis's comprehensive research capabilities. The site needed to convey both the technical sophistication and the practical benefits of the platform.</p>
                      <p>&nbsp;</p>
                      <p><strong>Feature Presentation</strong></p>
                      <p>Key features are presented with clear visual hierarchy, using icons, illustrations, and concise descriptions. Each feature section builds understanding of how AnswerThis streamlines the research process.</p>
                      <p>&nbsp;</p>
                      <p><strong>Trust and Credibility</strong></p>
                      <p>Testimonials, user counts, and security messaging are strategically placed to build trust. The design emphasizes the platform's reliability and the quality of its research tools.</p>
                      <p>&nbsp;</p>
                      <p><strong>User Journey</strong></p>
                      <p>The layout guides users from understanding the problem (research complexity) to seeing the solution (AnswerThis's features) to taking action (signing up). Clear calls-to-action throughout support conversion.</p>
                    </div>
                  </div>
                  <img
                    id={`${section.id}-img-mobile`}
                    src={answerThisPng}
                    alt="AnswerThis Design"
                    className="case-mobile-image"
                  />
                  <Caption number="2.0" text=" Design Showcase" type="Image" />
                </div>
              )
            }
            // 12 Framer Showcase section mobile
            if (projectName === 'project-12' && section.id === 'section-3') {
              return (
                <div key={section.id} id={`${section.id}-mobile`} data-section-index={index} className="case-mobile-section">
                  <div className="case-section-text">
                    <h2 className="case-section-heading">{caseSections.length > 1 ? `${index + 1}. ` : ''}{section.heading}</h2>
                    <div className="case-section-description">
                      <p>This project was built entirely in Framer, demonstrating the platform's ability to handle complex, content-rich websites with multiple sections, interactive elements, and detailed feature presentations.</p>
                      <p>&nbsp;</p>
                      <p>Framer enabled rapid iteration on the design, real-time collaboration, and seamless deployment of a fully functional marketing site. The platform's capabilities allowed for sophisticated layouts, animations, and interactions that would typically require extensive development work.</p>
                      <p>&nbsp;</p>
                      <p><strong>Experience the live site:</strong></p>
                      <p><a href="https://answer-this.framer.website/" target="_blank" rel="noopener noreferrer" style={{ color: '#8c8c8c', textDecoration: 'underline' }}>https://answer-this.framer.website/</a></p>
                      <p>&nbsp;</p>
                      <p>This project showcases how Framer empowers designers to create comprehensive product marketing sites that effectively communicate complex value propositions while maintaining design quality and user experience standards.</p>
                    </div>
                  </div>
                  <img
                    id={`${section.id}-img-mobile`}
                    src={answerThisPng}
                    alt="AnswerThis Framer"
                    className="case-mobile-image"
                  />
                  <Caption number="3.0" text=" Framer Implementation" type="Image" />
                </div>
              )
            }
            // 13 Overview section mobile
            if (projectName === 'project-13' && section.id === 'section-1') {
              return (
                <div key={section.id} id={`${section.id}-mobile`} data-section-index={index} className="case-mobile-section">
                  <div className="case-section-text">
                    <h2 className="case-section-heading">{caseSections.length > 1 ? `${index + 1}. ` : ''}{section.heading}</h2>
                    <div className="case-section-description">
                      <p>TechNova Hackathon is a hackathon event website designed to create safe, inclusive, and empowering spaces for women and non-binary individuals to start, grow, and thrive in the technology industry. The site serves as the digital home for a 36-hour virtual hackathon that brings together students, industry professionals, and sponsors.</p>
                      <p>&nbsp;</p>
                      <p>The website communicates TechNova's mission to foster an inclusive community, connect students with career opportunities, and empower hackers to create. The design needed to balance information about the event schedule, workshops, tech fair, and application process while maintaining an approachable, welcoming atmosphere.</p>
                      <p>&nbsp;</p>
                      <p>This case study demonstrates how thoughtful web design can support community-building initiatives, making technical events more accessible and inviting for underrepresented groups in technology.</p>
                    </div>
                  </div>
                  <video
                    id={`${section.id}-img-mobile`}
                    className="case-mobile-video"
                    src={techNovaMp4}
                    muted
                    playsInline
                    controls
                  />
                  <Caption number="1.0" text=" Site Overview" type="Video" />
                </div>
              )
            }
            // 13 Design section mobile
            if (projectName === 'project-13' && section.id === 'section-2') {
              return (
                <div key={section.id} id={`${section.id}-mobile`} data-section-index={index} className="case-mobile-section">
                  <div className="case-section-text">
                    <h2 className="case-section-heading">{caseSections.length > 1 ? `${index + 1}. ` : ''}{section.heading}</h2>
                    <div className="case-section-description">
                      <p>The design approach focused on creating a welcoming, energetic atmosphere that reflects TechNova's values of inclusivity and empowerment. The visual language needed to feel approachable for beginners while still conveying the excitement and professionalism of a major hackathon event.</p>
                      <p>&nbsp;</p>
                      <p><strong>Visual Identity</strong></p>
                      <p>The color palette and typography choices create a vibrant, modern feel that appeals to a diverse audience. The design balances playfulness with professionalism, ensuring the site feels both fun and credible.</p>
                      <p>&nbsp;</p>
                      <p><strong>Information Architecture</strong></p>
                      <p>The site organizes complex event information into clear sections: Prepare with Us (workshops), Hack with Us (main hackathon), Connect with Us (tech fair), and Hear from Others (testimonials). This structure helps visitors understand the full event experience and find relevant information quickly.</p>
                      <p>&nbsp;</p>
                      <p><strong>User Experience</strong></p>
                      <p>The design prioritizes clarity and ease of navigation, making it simple for potential participants to understand what the event offers, how to apply, and what to expect. The layout guides users through the event timeline and key information without overwhelming them.</p>
                    </div>
                  </div>
                  <video
                    id={`${section.id}-img-mobile`}
                    className="case-mobile-video"
                    src={techNovaMp4}
                    muted
                    playsInline
                    controls
                  />
                  <Caption number="2.0" text=" Design" type="Video" />
                </div>
              )
            }
            // 13 Framer Showcase section mobile
            if (projectName === 'project-13' && section.id === 'section-3') {
              return (
                <div key={section.id} id={`${section.id}-mobile`} data-section-index={index} className="case-mobile-section">
                  <div className="case-section-text">
                    <h2 className="case-section-heading">{caseSections.length > 1 ? `${index + 1}. ` : ''}{section.heading}</h2>
                    <div className="case-section-description">
                      <p>This project was built entirely in Framer, demonstrating the platform's ability to create engaging event websites with multiple sections, interactive elements, and dynamic content. Framer enabled rapid iteration on the design and seamless deployment of a fully functional event site.</p>
                      <p>&nbsp;</p>
                      <p>The platform's capabilities allowed for sophisticated layouts, animations, and interactions that would typically require extensive development work. The site effectively communicates TechNova's mission while providing all necessary information for participants, sponsors, and attendees.</p>
                      <p>&nbsp;</p>
                      <p><strong>Experience the live site:</strong></p>
                      <p><a href="https://2022-technova.framer.website/" target="_blank" rel="noopener noreferrer" style={{ color: '#8c8c8c', textDecoration: 'underline' }}>https://2022-technova.framer.website/</a></p>
                      <p>&nbsp;</p>
                      <p>This project showcases how Framer empowers designers to create comprehensive event websites that effectively communicate complex information while maintaining design quality and user experience standards, enabling community organizations to build professional digital presences without traditional development constraints.</p>
                    </div>
                  </div>
                  <video
                    id={`${section.id}-img-mobile`}
                    className="case-mobile-video"
                    src={techNovaMp4}
                    muted
                    playsInline
                    controls
                  />
                  <Caption number="3.0" text=" Framer Implementation" type="Video" />
                </div>
              )
            }
            // 9 Overview section mobile
            if (projectName === 'project-9' && section.id === 'section-1') {
              return (
                <div key={section.id} id={`${section.id}-mobile`} data-section-index={index} className="case-mobile-section">
                  <div className="case-section-text">
                    <h2 className="case-section-heading">{caseSections.length > 1 ? `${index + 1}. ` : ''}{section.heading}</h2>
                    <div className="case-section-description">
                      <p>Dream On, Sucker is a site designed to store ideas for projects and products, including failed versions of products that shut down. The platform serves as a digital archive and reflection space, documenting both successful concepts and those that didn't make it to market.</p>
                      <p>&nbsp;</p>
                      <p>The site acknowledges that not every idea succeeds, and that failure is an important part of the creative and entrepreneurial process. By preserving both successful and unsuccessful projects, Dream On, Sucker creates a comprehensive record of the innovation journey, showing the full spectrum of product development from conception to conclusion.</p>
                      <p>&nbsp;</p>
                      <p>This case study demonstrates how thoughtful design can create meaningful spaces for reflection and learning, turning what might be seen as failures into valuable documentation and educational resources.</p>
                    </div>
                  </div>
                  <img
                    id={`${section.id}-img-mobile`}
                    src={dreamOnSuckerPng}
                    alt="Dream On, Sucker"
                    className="case-mobile-image"
                  />
                  <Caption number="1.0" text=" Site Overview" type="Image" />
                </div>
              )
            }
            // 9 Design section mobile
            if (projectName === 'project-9' && section.id === 'section-2') {
              return (
                <div key={section.id} id={`${section.id}-mobile`} data-section-index={index} className="case-mobile-section">
                  <div className="case-section-text">
                    <h2 className="case-section-heading">{caseSections.length > 1 ? `${index + 1}. ` : ''}{section.heading}</h2>
                    <div className="case-section-description">
                      <p>The design approach focused on creating a respectful, thoughtful presentation of both successful and unsuccessful projects. The visual language needed to honor the work that went into each project while being honest about outcomes.</p>
                      <p>&nbsp;</p>
                      <p><strong>Visual Identity</strong></p>
                      <p>The design uses a clean, archival aesthetic that feels both professional and contemplative. The visual language treats all projects with equal respect, whether they succeeded or failed, emphasizing the value of the process and learning over outcomes.</p>
                      <p>&nbsp;</p>
                      <p><strong>Content Organization</strong></p>
                      <p>The site organizes projects in a way that makes it easy to browse and learn from both successes and failures. Each project entry provides context about its goals, development process, and eventual outcome, creating a comprehensive archive of innovation attempts.</p>
                      <p>&nbsp;</p>
                      <p><strong>User Experience</strong></p>
                      <p>The interface encourages exploration and reflection, making it easy to discover projects and understand the lessons learned from each. The design supports both casual browsing and deeper research into specific projects or themes.</p>
                    </div>
                  </div>
                  <img
                    id={`${section.id}-img-mobile`}
                    src={dreamOnSuckerPng}
                    alt="Dream On, Sucker Design"
                    className="case-mobile-image"
                  />
                  <Caption number="2.0" text=" Design" type="Image" />
                </div>
              )
            }
            // 9 Project Archive section mobile
            if (projectName === 'project-9' && section.id === 'section-3') {
              return (
                <div key={section.id} id={`${section.id}-mobile`} data-section-index={index} className="case-mobile-section">
                  <div className="case-section-text">
                    <h2 className="case-section-heading">{caseSections.length > 1 ? `${index + 1}. ` : ''}{section.heading}</h2>
                    <div className="case-section-description">
                      <p>The project archive serves as a comprehensive repository of innovation attempts, preserving both the ideas that succeeded and those that didn't. This approach creates a valuable resource for understanding the full spectrum of product development and the reality that most ideas don't make it to market.</p>
                      <p>&nbsp;</p>
                      <p><strong>Documentation Approach</strong></p>
                      <p>Each archived project includes information about its concept, development process, challenges faced, and eventual outcome. This documentation provides valuable insights into why projects succeed or fail, creating educational content for future innovators.</p>
                      <p>&nbsp;</p>
                      <p><strong>Learning from Failure</strong></p>
                      <p>By treating failed projects with the same respect as successful ones, the archive normalizes failure as part of the innovation process. This approach helps destigmatize unsuccessful attempts and encourages more honest conversations about the realities of product development.</p>
                      <p>&nbsp;</p>
                      <p>This project demonstrates how thoughtful design can create meaningful spaces for reflection and learning, turning what might be seen as failures into valuable documentation that helps future innovators understand the full journey of bringing ideas to life.</p>
                    </div>
                  </div>
                  <img
                    id={`${section.id}-img-mobile`}
                    src={dreamOnSuckerPng}
                    alt="Dream On, Sucker Project Archive"
                    className="case-mobile-image"
                  />
                  <Caption number="3.0" text=" Project Archive" type="Image" />
                </div>
              )
            }
            // 11 Overview section mobile
            if (projectName === 'project-11' && section.id === 'section-1') {
              return (
                <div key={section.id} id={`${section.id}-mobile`} data-section-index={index} className="case-mobile-section">
                  <div className="case-section-text">
                    <h2 className="case-section-heading">{caseSections.length > 1 ? `${index + 1}. ` : ''}{section.heading}</h2>
                    <div className="case-section-description">
                      <p>Unity Web Concept is a scrollable interactive web page designed to help users learn more about Unity, the popular game development platform. The site creates an engaging, immersive experience that introduces Unity's capabilities, features, and potential for creators.</p>
                      <p>&nbsp;</p>
                      <p>The design uses scroll-based interactions and animations to guide users through information about Unity, making the learning experience feel dynamic and engaging rather than static. The interactive elements help users understand Unity's features through direct experience rather than just reading about them.</p>
                      <p>&nbsp;</p>
                      <p>This case study demonstrates how interactive web design can transform educational content into engaging experiences, making complex platforms more approachable and helping potential users understand tools through direct interaction.</p>
                    </div>
                  </div>
                  <video
                    id={`${section.id}-img-mobile`}
                    className="case-mobile-video"
                    src={scrollExampleMp4}
                    muted
                    playsInline
                    controls
                  />
                  <Caption number="1.0" text=" Site Overview" type="Video" />
                </div>
              )
            }
            // 11 Design section mobile
            if (projectName === 'project-11' && section.id === 'section-2') {
              return (
                <div key={section.id} id={`${section.id}-mobile`} data-section-index={index} className="case-mobile-section">
                  <div className="case-section-text">
                    <h2 className="case-section-heading">{caseSections.length > 1 ? `${index + 1}. ` : ''}{section.heading}</h2>
                    <div className="case-section-description">
                      <p>The design approach focused on creating a scrollable, interactive experience that feels both informative and engaging. The visual language needed to reflect Unity's position as a powerful, professional tool while remaining approachable for beginners.</p>
                      <p>&nbsp;</p>
                      <p><strong>Scroll-Based Interactions</strong></p>
                      <p>The site uses scroll-triggered animations and interactions to reveal content progressively, creating a sense of discovery and engagement. As users scroll, new information appears, animations play, and interactive elements respond, making the learning process feel dynamic and immersive.</p>
                      <p>&nbsp;</p>
                      <p><strong>Visual Language</strong></p>
                      <p>The design uses modern, clean aesthetics that suggest both technical capability and creative potential. The visual language balances professionalism with approachability, making Unity feel accessible to creators at all skill levels.</p>
                      <p>&nbsp;</p>
                      <p><strong>Information Architecture</strong></p>
                      <p>The content is organized to guide users through Unity's key features and capabilities in a logical progression. Each section builds understanding, helping users gradually learn about Unity's potential and how it can support their creative projects.</p>
                    </div>
                  </div>
                  <video
                    id={`${section.id}-img-mobile`}
                    className="case-mobile-video"
                    src={scrollExampleMp4}
                    muted
                    playsInline
                    controls
                  />
                  <Caption number="2.0" text=" Design" type="Video" />
                </div>
              )
            }
            // 11 Interactive Experience section mobile
            if (projectName === 'project-11' && section.id === 'section-3') {
              return (
                <div key={section.id} id={`${section.id}-mobile`} data-section-index={index} className="case-mobile-section">
                  <div className="case-section-text">
                    <h2 className="case-section-heading">{caseSections.length > 1 ? `${index + 1}. ` : ''}{section.heading}</h2>
                    <div className="case-section-description">
                      <p>The interactive experience transforms learning about Unity from passive reading into active exploration. Scroll-based interactions, animations, and dynamic content reveal create an engaging journey that helps users understand Unity's capabilities through direct experience.</p>
                      <p>&nbsp;</p>
                      <p><strong>Engagement Through Interaction</strong></p>
                      <p>Interactive elements respond to user scrolling and input, creating a sense of agency and participation. This approach makes the learning process feel more like exploration than study, encouraging users to continue engaging with the content.</p>
                      <p>&nbsp;</p>
                      <p><strong>Progressive Disclosure</strong></p>
                      <p>Information is revealed progressively as users scroll, preventing information overload while maintaining engagement. This approach helps users absorb information at their own pace, making complex topics more digestible.</p>
                      <p>&nbsp;</p>
                      <p>This project showcases how interactive web design can transform educational content into engaging experiences, making complex platforms more approachable and helping potential users understand tools through direct interaction rather than traditional documentation.</p>
                    </div>
                  </div>
                  <video
                    id={`${section.id}-img-mobile`}
                    className="case-mobile-video"
                    src={scrollExampleMp4}
                    muted
                    playsInline
                    controls
                  />
                  <Caption number="3.0" text=" Interactive Experience" type="Video" />
                </div>
              )
            }
            // 7 Overview section mobile
            if (projectName === 'project-7' && section.id === 'section-1') {
              return (
                <div key={section.id} id={`${section.id}-mobile`} data-section-index={index} className="case-mobile-section">
                  <div className="case-section-text">
                    <h2 className="case-section-heading">{caseSections.length > 1 ? `${index + 1}. ` : ''}{section.heading}</h2>
                    <div className="case-section-description">
                      <p>My Mac Desktop is a personal project where I recreated my Mac Desktop for fun to show what I use and what I've made. The project showcases both the tools and applications I use daily, as well as personal projects that exist outside of my portfolio—like my crochet projects, a cat bed I'm making, my Minecraft YouTube channel, and other creative endeavors.</p>
                      <p>&nbsp;</p>
                      <p>The recreation captures the essence of my workspace, revealing not just my professional tools but also the personal projects and hobbies that shape my creative identity. It's a snapshot of my digital life, showing the intersection between work and personal interests.</p>
                      <p>&nbsp;</p>
                      <p>This case study demonstrates how personal projects can provide insight into a creator's broader interests and the tools they use, creating a more complete picture of their creative practice beyond their professional portfolio.</p>
                    </div>
                  </div>
                  <div
                    id={`${section.id}-img-mobile`}
                    className="case-mobile-video"
                    style={{ width: '100%', height: '100%', backgroundColor: '#e8e8e8', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '200px' }}
                  >
                    <p style={{ color: '#8c8c8c' }}>Video unavailable</p>
                  </div>
                  <Caption number="1.0" text=" Site Overview" type="Video" />
                </div>
              )
            }
            // 7 Design section mobile
            if (projectName === 'project-7' && section.id === 'section-2') {
              return (
                <div key={section.id} id={`${section.id}-mobile`} data-section-index={index} className="case-mobile-section">
                  <div className="case-section-text">
                    <h2 className="case-section-heading">{caseSections.length > 1 ? `${index + 1}. ` : ''}{section.heading}</h2>
                    <div className="case-section-description">
                      <p>The design approach focused on creating an accurate, detailed recreation of my Mac Desktop that feels authentic and personal. The visual language needed to capture both the familiar macOS interface and the unique personal touches that make it my own workspace.</p>
                      <p>&nbsp;</p>
                      <p><strong>Visual Accuracy</strong></p>
                      <p>The recreation pays attention to detail, accurately representing the macOS interface, icons, and layout. This attention to detail creates a sense of authenticity and makes the project feel like a genuine snapshot of my desktop environment.</p>
                      <p>&nbsp;</p>
                      <p><strong>Personal Elements</strong></p>
                      <p>The design includes personal touches that reveal my interests and projects outside of my portfolio. These elements—from crochet projects to YouTube channels—create a more complete picture of who I am as a creator and what inspires me.</p>
                      <p>&nbsp;</p>
                      <p><strong>Narrative Through Organization</strong></p>
                      <p>The arrangement of icons and windows tells a story about my workflow and interests. The organization reveals how I structure my digital workspace and what tools and projects are most important to me.</p>
                    </div>
                  </div>
                  <div
                    id={`${section.id}-img-mobile`}
                    className="case-mobile-video"
                    style={{ width: '100%', height: '100%', backgroundColor: '#e8e8e8', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '200px' }}
                  >
                    <p style={{ color: '#8c8c8c' }}>Video unavailable</p>
                  </div>
                  <Caption number="2.0" text=" Design" type="Video" />
                </div>
              )
            }
            // 7 Personal Projects section mobile
            if (projectName === 'project-7' && section.id === 'section-3') {
              return (
                <div key={section.id} id={`${section.id}-mobile`} data-section-index={index} className="case-mobile-section">
                  <div className="case-section-text">
                    <h2 className="case-section-heading">{caseSections.length > 1 ? `${index + 1}. ` : ''}{section.heading}</h2>
                    <div className="case-section-description">
                      <p>The desktop recreation showcases various personal projects that exist outside of my professional portfolio, providing a glimpse into my broader creative interests and hobbies. These projects include crochet work, physical crafting projects like a cat bed, content creation through my Minecraft YouTube channel, and other personal creative endeavors.</p>
                      <p>&nbsp;</p>
                      <p><strong>Beyond the Portfolio</strong></p>
                      <p>These personal projects represent the full spectrum of my creative practice, showing that my interests extend beyond professional design work. They reveal the hobbies, experiments, and side projects that fuel my creativity and inform my professional work.</p>
                      <p>&nbsp;</p>
                      <p><strong>Creative Identity</strong></p>
                      <p>By including these personal projects, the desktop recreation creates a more complete picture of my creative identity. It shows that creativity isn't limited to professional work but extends into all aspects of life, from crafting to content creation to experimentation.</p>
                      <p>&nbsp;</p>
                      <p>This project demonstrates how personal projects can provide valuable insight into a creator's interests and inspirations, showing the full range of their creative practice and the diverse ways they express their creativity.</p>
                    </div>
                  </div>
                  <div
                    id={`${section.id}-img-mobile`}
                    className="case-mobile-video"
                    style={{ width: '100%', height: '100%', backgroundColor: '#e8e8e8', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '200px' }}
                  >
                    <p style={{ color: '#8c8c8c' }}>Video unavailable</p>
                  </div>
                  <Caption number="3.0" text=" Personal Projects" type="Video" />
                </div>
              )
            }
            // 6 Overview section mobile
            if (projectName === 'project-6' && section.id === 'section-1') {
              return (
                <div key={section.id} id={`${section.id}-mobile`} data-section-index={index} className="case-mobile-section">
                  <div className="case-section-text">
                    <h2 className="case-section-heading">{caseSections.length > 1 ? `${index + 1}. ` : ''}{section.heading}</h2>
                    <div className="case-section-description">
                      <p>Duolingo Concept is a design exploration of how I might make the Duolingo app UI interactive with motion. The project reimagines the language learning experience through thoughtful motion design, creating interactions that feel engaging, responsive, and delightful.</p>
                      <p>&nbsp;</p>
                      <p>The concept focuses on enhancing the user experience through motion that provides feedback, guides attention, and makes the learning process feel more dynamic and engaging. Motion becomes a tool for communication, helping users understand their progress, celebrate achievements, and navigate the interface more intuitively.</p>
                      <p>&nbsp;</p>
                      <p>This case study demonstrates how motion design can transform a functional app into a more engaging, delightful experience, showing how thoughtful animation can enhance usability while making interactions feel more human and responsive.</p>
                    </div>
                  </div>
                  <video
                    id={`${section.id}-img-mobile`}
                    className="case-mobile-video"
                    src={test1Mp4}
                    muted
                    playsInline
                    controls
                  />
                  <Caption number="1.0" text=" Site Overview" type="Video" />
                </div>
              )
            }
            // 6 Design section mobile
            if (projectName === 'project-6' && section.id === 'section-2') {
              return (
                <div key={section.id} id={`${section.id}-mobile`} data-section-index={index} className="case-mobile-section">
                  <div className="case-section-text">
                    <h2 className="case-section-heading">{caseSections.length > 1 ? `${index + 1}. ` : ''}{section.heading}</h2>
                    <div className="case-section-description">
                      <p>The design approach focused on creating motion interactions that feel natural, purposeful, and delightful. Each animation serves a specific function—providing feedback, guiding attention, or celebrating progress—while maintaining the playful, encouraging tone that makes Duolingo engaging.</p>
                      <p>&nbsp;</p>
                      <p><strong>Motion as Feedback</strong></p>
                      <p>Animations provide immediate, clear feedback for user actions. When users answer questions correctly or incorrectly, motion reinforces the outcome, making the learning process feel more responsive and engaging.</p>
                      <p>&nbsp;</p>
                      <p><strong>Progress Visualization</strong></p>
                      <p>Motion helps visualize progress and achievement, making learning milestones feel more tangible and rewarding. Animated progress bars, level-ups, and streak celebrations use motion to amplify the sense of accomplishment.</p>
                      <p>&nbsp;</p>
                      <p><strong>Navigation and Flow</strong></p>
                      <p>Transitions between screens and lessons use motion to create a sense of continuity and flow. These animations guide users through the learning journey, making navigation feel smooth and intuitive.</p>
                    </div>
                  </div>
                  <video
                    id={`${section.id}-img-mobile`}
                    className="case-mobile-video"
                    src={test1Mp4}
                    muted
                    playsInline
                    controls
                  />
                  <Caption number="2.0" text=" Design" type="Video" />
                </div>
              )
            }
            // 6 Motion Interaction section mobile
            if (projectName === 'project-6' && section.id === 'section-3') {
              return (
                <div key={section.id} id={`${section.id}-mobile`} data-section-index={index} className="case-mobile-section">
                  <div className="case-section-text">
                    <h2 className="case-section-heading">{caseSections.length > 1 ? `${index + 1}. ` : ''}{section.heading}</h2>
                    <div className="case-section-description">
                      <p>The motion interactions transform the Duolingo experience from static to dynamic, making every interaction feel responsive and engaging. Motion becomes a language of its own, communicating feedback, progress, and encouragement through animation.</p>
                      <p>&nbsp;</p>
                      <p><strong>Interactive Feedback</strong></p>
                      <p>Every user action receives animated feedback that feels immediate and satisfying. Correct answers celebrate with motion, incorrect answers provide gentle, encouraging feedback, and progress updates animate to show advancement through lessons.</p>
                      <p>&nbsp;</p>
                      <p><strong>Emotional Connection</strong></p>
                      <p>Motion creates an emotional connection with the learning process, making achievements feel more rewarding and mistakes feel less discouraging. The animations add personality to the interface, making the app feel more like a supportive learning companion than a static tool.</p>
                      <p>&nbsp;</p>
                      <p>This project showcases how motion design can enhance app experiences, demonstrating that thoughtful animation can make interactions feel more human, responsive, and engaging while improving usability and user satisfaction.</p>
                    </div>
                  </div>
                  <video
                    id={`${section.id}-img-mobile`}
                    className="case-mobile-video"
                    src={test1Mp4}
                    muted
                    playsInline
                    controls
                  />
                  <Caption number="3.0" text=" Motion Interaction" type="Video" />
                </div>
              )
            }
            // 1 Overview section mobile
            if (projectName === 'project-1' && section.id === 'section-1') {
              return (
                <div key={section.id} id={`${section.id}-mobile`} data-section-index={index} className="case-mobile-section">
                  <div className="case-section-text">
                    <h2 className="case-section-heading">{caseSections.length > 1 ? `${index + 1}. ` : ''}{section.heading}</h2>
                    <div className="case-section-description">
                      <p>PPT Night Poster is a personal project that explores the unexpected through interactive animation. Using Rive, I created an animated poster that reveals something surprising about myself—challenging first impressions and inviting viewers to discover a hidden layer.</p>
                      <p>&nbsp;</p>
                      <p>The project represents a playful experiment in self-expression through motion design, where the medium itself becomes part of the message. The interactive element encourages engagement, making the discovery of the unexpected moment feel personal and memorable.</p>
                      <p>&nbsp;</p>
                      <p>This case study demonstrates how animation and interactivity can transform static design into an experience that tells a story beyond what's immediately visible.</p>
                    </div>
                  </div>
                  <video
                    id={`${section.id}-img-mobile`}
                    className="case-mobile-video"
                    src={toasterWebm}
                    muted
                    playsInline
                    controls
                  />
                  <Caption number="1.0" text=" Site Overview" type="Video" />
                </div>
              )
            }
            // 1 Design section mobile
            if (projectName === 'project-1' && section.id === 'section-2') {
              return (
                <div key={section.id} id={`${section.id}-mobile`} data-section-index={index} className="case-mobile-section">
                  <div className="case-section-text">
                    <h2 className="case-section-heading">{caseSections.length > 1 ? `${index + 1}. ` : ''}{section.heading}</h2>
                    <div className="case-section-description">
                      <p>The design process focused on creating a visual narrative that builds anticipation before revealing the unexpected element. The poster starts with a clean, professional aesthetic that hints at one interpretation, then transforms to reveal something completely different.</p>
                      <p>&nbsp;</p>
                      <p><strong>Visual Language</strong></p>
                      <p>The initial design uses familiar, approachable visuals that set up expectations. The color palette and typography are carefully chosen to support the narrative arc from expectation to surprise.</p>
                      <p>&nbsp;</p>
                      <p><strong>Animation Strategy</strong></p>
                      <p>The motion design guides the viewer's attention and creates a moment of discovery. Transitions are timed to maximize impact, making the reveal feel natural yet surprising.</p>
                      <p>&nbsp;</p>
                      <p><strong>Interactive Elements</strong></p>
                      <p>User interaction triggers the transformation, making the experience feel personal and engaging. The interactive nature encourages exploration and repeat viewing.</p>
                    </div>
                  </div>
                  <video
                    id={`${section.id}-img-mobile`}
                    className="case-mobile-video"
                    src={toasterWebm}
                    muted
                    playsInline
                    controls
                  />
                  <Caption number="2.0" text=" Design Showcase" type="Video" />
                </div>
              )
            }
            // 1 Rive Animation section mobile
            if (projectName === 'project-1' && section.id === 'section-3') {
              return (
                <div key={section.id} id={`${section.id}-mobile`} data-section-index={index} className="case-mobile-section">
                  <div className="case-section-text">
                    <h2 className="case-section-heading">{caseSections.length > 1 ? `${index + 1}. ` : ''}{section.heading}</h2>
                    <div className="case-section-description">
                      <p>This project was built using Rive, a powerful tool for creating interactive animations that run smoothly across platforms. Rive enabled me to create complex animations with precise timing and smooth transitions that would be difficult to achieve with traditional animation tools.</p>
                      <p>&nbsp;</p>
                      <p>The platform's capabilities allowed for seamless integration of interactive elements, making the poster feel alive and responsive. The animation runs efficiently, maintaining performance while delivering a rich, engaging experience.</p>
                      <p>&nbsp;</p>
                      <p>This project showcases how modern animation tools like Rive can elevate design work, transforming static visuals into interactive experiences that tell deeper stories and create memorable moments of connection with viewers.</p>
                    </div>
                  </div>
                  <video
                    id={`${section.id}-img-mobile`}
                    className="case-mobile-video"
                    src={toasterWebm}
                    muted
                    playsInline
                    controls
                  />
                  <Caption number="3.0" text=" Rive Animation" type="Video" />
                </div>
              )
            }
            // 8 Overview section mobile
            if (projectName === 'project-8' && section.id === 'section-1') {
              return (
                <div key={section.id} id={`${section.id}-mobile`} data-section-index={index} className="case-mobile-section">
                  <div className="case-section-text">
                    <h2 className="case-section-heading">{caseSections.length > 1 ? `${index + 1}. ` : ''}{section.heading}</h2>
                    <div className="case-section-description">
                      <p>Pixeldoro is an RPG-style pixel art Pomodoro timer that gamifies productivity. I designed all the game UI assets, creating a cohesive visual system that makes time management feel like an adventure rather than a chore.</p>
                      <p>&nbsp;</p>
                      <p>The project combines the proven effectiveness of the Pomodoro Technique with the engaging aesthetics of retro RPG games. Players complete work sessions to progress through their day, with visual feedback and rewards that make productivity feel rewarding and fun.</p>
                      <p>&nbsp;</p>
                      <p>This case study demonstrates how game design principles can be applied to productivity tools, creating experiences that motivate users through visual storytelling and interactive feedback.</p>
                    </div>
                  </div>
                  <video
                    id={`${section.id}-img-mobile`}
                    className="case-mobile-video"
                    src={pixeldoroWebm}
                    muted
                    playsInline
                    controls
                  />
                  <Caption number="1.0" text=" Site Overview" type="Video" />
                </div>
              )
            }
            // 8 Game Design section mobile
            if (projectName === 'project-8' && section.id === 'section-2') {
              return (
                <div key={section.id} id={`${section.id}-mobile`} data-section-index={index} className="case-mobile-section">
                  <div className="case-section-text">
                    <h2 className="case-section-heading">{caseSections.length > 1 ? `${index + 1}. ` : ''}{section.heading}</h2>
                    <div className="case-section-description">
                      <p>The game design centers around creating a sense of progression and achievement. Each completed Pomodoro session feels like a small victory, with visual rewards and progress indicators that keep users motivated.</p>
                      <p>&nbsp;</p>
                      <p><strong>RPG Mechanics</strong></p>
                      <p>The interface uses familiar RPG elements like health bars, experience points, and character progression to make time tracking feel like leveling up. These mechanics provide clear feedback and create a sense of accomplishment.</p>
                      <p>&nbsp;</p>
                      <p><strong>Pixel Art Aesthetic</strong></p>
                      <p>The retro pixel art style creates a nostalgic, approachable feel that makes the tool less intimidating than traditional productivity apps. The visual language is playful yet functional, balancing charm with clarity.</p>
                      <p>&nbsp;</p>
                      <p><strong>User Experience</strong></p>
                      <p>The design prioritizes ease of use while maintaining the game-like feel. Controls are intuitive, and the visual feedback is immediate and satisfying, making the act of starting a timer feel like beginning a quest.</p>
                    </div>
                  </div>
                  <video
                    id={`${section.id}-img-mobile`}
                    className="case-mobile-video"
                    src={pixeldoroWebm}
                    muted
                    playsInline
                    controls
                  />
                  <Caption number="2.0" text=" Game Design" type="Video" />
                </div>
              )
            }
            // 8 UI Assets section mobile
            if (projectName === 'project-8' && section.id === 'section-3') {
              return (
                <div key={section.id} id={`${section.id}-mobile`} data-section-index={index} className="case-mobile-section">
                  <div className="case-section-text">
                    <h2 className="case-section-heading">{caseSections.length > 1 ? `${index + 1}. ` : ''}{section.heading}</h2>
                    <div className="case-section-description">
                      <p>I designed all the game UI assets from scratch, creating a cohesive pixel art style that feels both nostalgic and modern. Each element was carefully crafted to fit within the RPG theme while maintaining clarity and functionality.</p>
                      <p>&nbsp;</p>
                      <p><strong>Asset Creation</strong></p>
                      <p>All icons, buttons, progress bars, and interface elements were designed in pixel art style, ensuring consistency across the entire application. The assets use a limited color palette that creates visual harmony while maintaining good contrast for usability.</p>
                      <p>&nbsp;</p>
                      <p><strong>Visual System</strong></p>
                      <p>The UI assets work together to create a unified visual language that supports the game mechanics. Each element reinforces the RPG theme while serving its functional purpose, creating an immersive experience that makes productivity feel engaging.</p>
                      <p>&nbsp;</p>
                      <p>This project showcases how thoughtful asset design can transform a functional tool into an experience that users look forward to using, proving that productivity apps don't have to be boring.</p>
                    </div>
                  </div>
                  <video
                    id={`${section.id}-img-mobile`}
                    className="case-mobile-video"
                    src={pixeldoroWebm}
                    muted
                    playsInline
                    controls
                  />
                  <Caption number="3.0" text=" UI Assets" type="Video" />
                </div>
              )
            }
            // 15 Overview section mobile
            if (projectName === 'project-15' && section.id === 'section-1') {
              return (
                <div key={section.id} id={`${section.id}-mobile`} data-section-index={index} className="case-mobile-section">
                  <div className="case-section-text">
                    <h2 className="case-section-heading">{caseSections.length > 1 ? `${index + 1}. ` : ''}{section.heading}</h2>
                    <div className="case-section-description">
                      <p>I made a way for me to create unique circular backgrounds. The Radial Bitmap Tool is a custom solution I developed to generate distinctive circular patterns and backgrounds that I can use across my design work.</p>
                      <p>&nbsp;</p>
                      <p>This tool allows me to quickly generate variations of circular bitmap patterns, giving me the flexibility to create custom backgrounds that fit specific design needs. Rather than relying on generic patterns or spending time manually creating each variation, this tool streamlines the process while ensuring each output is unique.</p>
                      <p>&nbsp;</p>
                      <p>This project demonstrates how creating custom tools can solve specific design challenges and improve workflow efficiency, allowing for more creative exploration and faster iteration.</p>
                    </div>
                  </div>
                  <video
                    id={`${section.id}-img-mobile`}
                    className="case-mobile-video"
                    src={radialBitmapMp4}
                    muted
                    playsInline
                    controls
                  />
                  <Caption number="1.0" text=" Site Overview" type="Video" />
                </div>
              )
            }
            // 15 Tool Design section mobile
            if (projectName === 'project-15' && section.id === 'section-2') {
              return (
                <div key={section.id} id={`${section.id}-mobile`} data-section-index={index} className="case-mobile-section">
                  <div className="case-section-text">
                    <h2 className="case-section-heading">{caseSections.length > 1 ? `${index + 1}. ` : ''}{section.heading}</h2>
                    <div className="case-section-description">
                      <p>The tool is designed with simplicity and efficiency in mind. The interface allows for quick generation of circular bitmap patterns with various parameters that can be adjusted to create different visual effects.</p>
                      <p>&nbsp;</p>
                      <p><strong>Functionality</strong></p>
                      <p>The tool generates circular patterns by processing bitmap data in a radial format, creating unique visual textures that can be used as backgrounds or design elements. Each generation produces a distinct result, ensuring variety in the outputs.</p>
                      <p>&nbsp;</p>
                      <p><strong>User Experience</strong></p>
                      <p>The design prioritizes ease of use, allowing for quick iteration and experimentation. The tool provides immediate visual feedback, making it easy to find the right pattern for a specific design need.</p>
                      <p>&nbsp;</p>
                      <p><strong>Output Quality</strong></p>
                      <p>Generated patterns maintain high quality and can be exported in formats suitable for various design applications, ensuring they integrate seamlessly into different projects.</p>
                    </div>
                  </div>
                  <video
                    id={`${section.id}-img-mobile`}
                    className="case-mobile-video"
                    src={radialBitmapMp4}
                    muted
                    playsInline
                    controls
                  />
                  <Caption number="2.0" text=" Tool Design" type="Video" />
                </div>
              )
            }
            // 15 Implementation section mobile
            if (projectName === 'project-15' && section.id === 'section-3') {
              return (
                <div key={section.id} id={`${section.id}-mobile`} data-section-index={index} className="case-mobile-section">
                  <div className="case-section-text">
                    <h2 className="case-section-heading">{caseSections.length > 1 ? `${index + 1}. ` : ''}{section.heading}</h2>
                    <div className="case-section-description">
                      <p>The Radial Bitmap Tool was built to solve a specific workflow challenge I encountered in my design work. By creating a custom solution, I was able to streamline the process of generating unique circular backgrounds while maintaining creative control over the output.</p>
                      <p>&nbsp;</p>
                      <p>This project showcases the value of building custom tools that address specific design needs. Rather than adapting to existing tools that don't quite fit the requirement, creating a tailored solution allows for better workflow integration and more efficient design processes.</p>
                      <p>&nbsp;</p>
                      <p><strong>Experience the live site:</strong></p>
                      <p><a href="https://radial-bitmap.vercel.app/" target="_blank" rel="noopener noreferrer" style={{ color: '#8c8c8c', textDecoration: 'underline' }}>https://radial-bitmap.vercel.app/</a></p>
                      <p>&nbsp;</p>
                      <p>The tool has become an essential part of my design toolkit, enabling me to quickly generate unique backgrounds that add visual interest and personality to my projects without the time investment of manual creation.</p>
                    </div>
                  </div>
                  <video
                    id={`${section.id}-img-mobile`}
                    className="case-mobile-video"
                    src={radialBitmapMp4}
                    muted
                    playsInline
                    controls
                  />
                  <Caption number="3.0" text=" Implementation" type="Video" />
                </div>
              )
            }
            return (
              <div key={section.id} id={`${section.id}-mobile`} data-section-index={index} className="case-mobile-section">
                <div className="case-section-text">
                  <h2 className="case-section-heading">{index + 1}. {section.heading}</h2>
                  <p>Placeholder text content for {section.heading.toLowerCase()}. This will be replaced with actual project description and details.</p>
                </div>
                <img
                  id={`${section.id}-img-mobile`}
                  src={`https://via.placeholder.com/600x400/f2f2f2/8c8c8c?text=Placeholder+${section.heading}`}
                  alt={`${section.heading} placeholder`}
                  className="case-mobile-image"
                />
                <Caption number={`${index + 1}.0`} text={` ${section.heading}`} type="Image" />
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
              <span>{section.navTitle || section.heading}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

export default CasePage


