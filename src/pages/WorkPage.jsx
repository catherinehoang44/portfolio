import React, { useState, useEffect } from 'react'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import { useRive } from '@rive-app/react-canvas'
import './WorkPage.css'
import './AboutPage.css'
import navIcon1 from '../assets/nav-icon-1.svg'
import navIcon2 from '../assets/nav-icon-2.svg'
import navIcon3 from '../assets/nav-icon-3.svg'
import work3Image from '../assets/perplexity-concept.png'
import adobeBusinessMotion from '../assets/adobe-business-motion.mp4'
import adobeCertPortalCover from '../assets/adobe_cert_portal_cover.riv'
import test1Mp4 from '../assets/test1.mp4'
import toasterWebm from '../assets/toaster.webm'
import pixeldoroWebm from '../assets/pixeldoro.webm'
import dreamOnSuckerPng from '../assets/dream-on-sucker.png'
import openaiConceptPng from '../assets/openai-concept.png'
import answerThisPng from '../assets/answer-this.png'
import techNovaMp4 from '../assets/tech-nova.mp4'
import retroTechPng from '../assets/retro-tech.png'
import retroSiteMp4 from '../assets/retro-site.mp4'
import pokemonCursorPng from '../assets/pokemon-cursor.png'
import scrollExampleMp4 from '../assets/scroll-example.mp4'
import radialBitmapMp4 from '../assets/radial-bitmap.mp4'
import demeterehrPng from '../assets/demeterehr.png'
import snapshotArrow from '../assets/snapshot-arrow.svg'
import dottedLine from '../assets/dotted-line.svg'
import { workTitles } from '../constants/workTitles'

// ============================================
// DEBUG MODE - Set to true to show borders
// ============================================
const DEBUG_MODE = false

// Sample work data - replace with your actual work items
// Base width for aspect ratio calculation: 429.33px (from About page cards)
const BASE_CARD_WIDTH = 429.33

// Standard aspect ratios: 4:3, 1:1, 2:3
const ASPECT_RATIO_4_3 = 4 / 3 // 1.333
const ASPECT_RATIO_1_1 = 1 / 1 // 1.0
const ASPECT_RATIO_2_3 = 2 / 3 // 0.667

// Heights for each aspect ratio
const HEIGHT_4_3 = Math.round(BASE_CARD_WIDTH / ASPECT_RATIO_4_3) // 322px
const HEIGHT_1_1 = Math.round(BASE_CARD_WIDTH / ASPECT_RATIO_1_1) // 429px
const HEIGHT_2_3 = Math.round(BASE_CARD_WIDTH / ASPECT_RATIO_2_3) // 644px

// Helper function to determine closest aspect ratio
const getClosestAspectRatio = (currentHeight) => {
  const currentRatio = BASE_CARD_WIDTH / currentHeight
  const diff4_3 = Math.abs(currentRatio - ASPECT_RATIO_4_3)
  const diff1_1 = Math.abs(currentRatio - ASPECT_RATIO_1_1)
  const diff2_3 = Math.abs(currentRatio - ASPECT_RATIO_2_3)
  
  if (diff1_1 <= diff4_3 && diff1_1 <= diff2_3) {
    return { height: HEIGHT_1_1, aspectRatio: ASPECT_RATIO_1_1, ratio: '1:1' }
  } else if (diff4_3 <= diff2_3) {
    return { height: HEIGHT_4_3, aspectRatio: ASPECT_RATIO_4_3, ratio: '4:3' }
  } else {
    return { height: HEIGHT_2_3, aspectRatio: ASPECT_RATIO_2_3, ratio: '2:3' }
  }
}

// Aspect ratios are attached to each case and don't change when reordered
// Order set according to layout specification
// Column left (top to bottom): Adobe Certifications, [Perplexity], Answer This, PPT Night
// Column middle (top to bottom): Adobe Business, Pokemon, [Unity], Retro Site, Radial Bitmap, TechNova
// Column right (top to bottom): OpenAI, [Duolingo], Dream On Sucker, Pixeldoro

// Rive component for Adobe Cert Portal
function AdobeCertRive() {
  const { RiveComponent, rive } = useRive({
    src: adobeCertPortalCover,
    autoplay: true,
  })
  
  // Ensure the animation loops by restarting it when it ends
  useEffect(() => {
    if (!rive) return
    
    const checkAndRestart = () => {
      try {
        const artboard = rive.artboard
        if (artboard) {
          // Get all animations
          const animations = artboard.animationNames || []
          animations.forEach(animName => {
            const animation = artboard.animationByName(animName)
            if (animation) {
              // Check if animation has ended and restart it
              // Rive animations should loop by default, but if not, restart manually
              if (animation.hasEnded && !animation.loopValue) {
                animation.reset()
                animation.play()
              }
            }
          })
        }
      } catch (e) {
        // Silently handle errors
      }
    }
    
    // Check periodically if animation has ended and restart if needed
    const interval = setInterval(checkAndRestart, 100)
    
    return () => clearInterval(interval)
  }, [rive])
  
  return <RiveComponent style={{ width: '100%', height: '100%' }} />
}

const workItems = [
  // Column 0 (left) - position 1: Adobe Certifications (1:1)
  { id: 5, tags: ['ui/ux', 'web'], title: workTitles['project-5'], height: HEIGHT_1_1, aspectRatio: ASPECT_RATIO_1_1, image: null, video: null, rive: true },
  // Column 1 (middle) - position 1: Adobe Business (4:3)
  { id: 4, tags: ['motion', 'web'], title: workTitles['project-4'], height: HEIGHT_4_3, aspectRatio: ASPECT_RATIO_4_3, image: null, video: adobeBusinessMotion },
  // Column 2 (right) - position 1: OpenAI (1:1)
  { id: 10, tags: ['illustration'], title: workTitles['project-10'], height: HEIGHT_1_1, aspectRatio: ASPECT_RATIO_1_1, image: openaiConceptPng },
  // Column 0 (left) - position 2: [Perplexity] (1:1) - hidden
  { id: 3, tags: ['branding', 'illustration'], title: workTitles['project-3'], height: HEIGHT_1_1, aspectRatio: ASPECT_RATIO_1_1, image: work3Image },
  // Column 1 (middle) - position 2: Pokemon (4:3)
  { id: 14, tags: ['illustration', 'motion'], title: workTitles['project-14'], height: HEIGHT_4_3, aspectRatio: ASPECT_RATIO_4_3, image: pokemonCursorPng },
  // Column 2 (right) - position 2: [Duolingo] (4:3) - hidden
  { id: 6, tags: ['ui/ux', 'motion'], title: workTitles['project-6'], height: HEIGHT_4_3, aspectRatio: ASPECT_RATIO_4_3, image: null, video: test1Mp4 },
  // Column 0 (left) - position 3: Answer This (1:1)
  { id: 12, tags: ['branding', 'web'], title: workTitles['project-12'], height: HEIGHT_1_1, aspectRatio: ASPECT_RATIO_1_1, image: answerThisPng },
  // Column 1 (middle) - position 3: [Unity] (4:3) - hidden
  { id: 11, tags: ['illustration'], title: workTitles['project-11'], height: HEIGHT_4_3, aspectRatio: ASPECT_RATIO_4_3, image: null, video: scrollExampleMp4 },
  // Column 2 (right) - position 3: Dream On Sucker (4:3)
  { id: 9, tags: ['branding'], title: workTitles['project-9'], height: HEIGHT_4_3, aspectRatio: ASPECT_RATIO_4_3, image: dreamOnSuckerPng },
  // Column 0 (left) - position 4: PPT Night (2:3)
  { id: 1, tags: ['illustration', 'motion'], title: workTitles['project-1'], height: HEIGHT_2_3, aspectRatio: ASPECT_RATIO_2_3, image: null, video: toasterWebm },
  // Column 1 (middle) - position 4: Radial Bitmap (4:3)
  { id: 15, tags: ['illustration', 'web'], title: workTitles['project-15'], height: HEIGHT_4_3, aspectRatio: ASPECT_RATIO_4_3, image: null, video: radialBitmapMp4 },
  // Column 2 (right) - position 4: Pixeldoro (1:1)
  { id: 8, tags: ['illustration', 'ui/ux'], title: workTitles['project-8'], height: HEIGHT_1_1, aspectRatio: ASPECT_RATIO_1_1, image: null, video: pixeldoroWebm },
  // Column 1 (middle) - position 6: TechNova (4:3)
  { id: 13, tags: ['illustration', 'branding', 'web'], title: workTitles['project-13'], height: HEIGHT_4_3, aspectRatio: ASPECT_RATIO_4_3, image: null, video: techNovaMp4 },
  // Column 1 (middle) - position 7: Retro Site (4:3)
  { id: 2, tags: ['illustration', 'web'], title: workTitles['project-2'], height: HEIGHT_4_3, aspectRatio: ASPECT_RATIO_4_3, image: null, video: retroSiteMp4 },
  // DemeterEHR (1:1)
  { id: 16, tags: ['ui/ux', 'web'], title: workTitles['project-16'], height: HEIGHT_1_1, aspectRatio: ASPECT_RATIO_1_1, image: demeterehrPng },
]

function WorkPage() {
  const [searchParams] = useSearchParams()
  const [selectedTag, setSelectedTag] = useState('all')
  const [numColumns, setNumColumns] = useState(3)
  const location = useLocation()
  const [isLoading, setIsLoading] = useState(true)
  
  // Check for tag parameter from URL (e.g., from About page tag clicks)
  useEffect(() => {
    const tagParam = searchParams.get('tag')
    if (tagParam) {
      // Decode URL-encoded tag and map to actual tag values
      const decodedTag = decodeURIComponent(tagParam)
      const tagMap = {
        'branding': 'branding',
        'illustration': 'illustration',
        'motion': 'motion',
        'ui/ux': 'ui/ux',
        'ui%2Fux': 'ui/ux', // URL-encoded version
        'ui-ux': 'ui/ux', // Alternative format
        'web': 'web'
      }
      const mappedTag = tagMap[decodedTag] || tagMap[tagParam] || decodedTag
      if (['branding', 'illustration', 'motion', 'ui/ux', 'web'].includes(mappedTag)) {
        setSelectedTag(mappedTag)
      }
    }
  }, [searchParams])

  useEffect(() => {
    window.scrollTo(0, 0)
    setIsLoading(true)
    
    // Check if loading animation was shown
    const loadingStarted = sessionStorage.getItem('loadingAnimationStarted')
    const loadingCompleted = sessionStorage.getItem('loadingAnimationCompleted')
    
    // If loading animation was shown but not yet completed, wait for completion event
    if (loadingStarted && !loadingCompleted) {
      const handleLoadingComplete = () => {
        // Use requestAnimationFrame to ensure DOM is ready before removing class
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setIsLoading(false)
          })
        })
        window.removeEventListener('loadingAnimationCompleted', handleLoadingComplete)
      }
      window.addEventListener('loadingAnimationCompleted', handleLoadingComplete)
      return () => {
        window.removeEventListener('loadingAnimationCompleted', handleLoadingComplete)
      }
    } else {
      // Loading already completed or not started, use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTimeout(() => {
            setIsLoading(false)
          }, 100)
        })
      })
      return () => {}
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
        // Use requestAnimationFrame to ensure DOM is ready before removing class
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setIsLoading(false)
          })
        })
        window.removeEventListener('loadingAnimationCompleted', handleLoadingComplete)
      }
      window.addEventListener('loadingAnimationCompleted', handleLoadingComplete)
      return () => {
        window.removeEventListener('loadingAnimationCompleted', handleLoadingComplete)
      }
    } else {
      // Loading already completed or not started, use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTimeout(() => {
            setIsLoading(false)
          }, 100)
        })
      })
      return () => {}
    }
  }, [])

  useEffect(() => {
    const updateColumns = () => {
      setNumColumns(window.innerWidth > 1024 ? 3 : 2)
    }
    
    updateColumns()
    window.addEventListener('resize', updateColumns)
    return () => window.removeEventListener('resize', updateColumns)
  }, [])

  const handleTagClick = (tag) => {
    setSelectedTag(tag)
  }

  // Hide certain projects (but keep them in order for layout)
  const hiddenProjectIds = [3, 6, 11]
  
  const filteredItems = (selectedTag === 'all' 
    ? workItems 
    : workItems.filter(item => item.tags.includes(selectedTag))
  ).filter(item => !hiddenProjectIds.includes(item.id))

  // Distribute items into columns
  const columns = Array(numColumns).fill(null).map(() => [])
  filteredItems.forEach((item, index) => {
    columns[index % numColumns].push(item)
  })

  // Calculate animation delay for each card (left to right, top to bottom)
  const getCardAnimationDelay = (colIndex, rowIndex) => {
    // Calculate global index: rowIndex * numColumns + colIndex
    const globalIndex = rowIndex * numColumns + colIndex
    // Each card animates 0.1s after the previous one
    return globalIndex * 0.1
  }

  return (
    <div className={`work-page ${isLoading ? 'page-loading' : ''}`}>
      
      {/* ============================================
          1. NAVIGATION BAR
          ============================================ */}
      <div className="nav-container">
        <div className="nav-link-hitbox nav-link-hitbox-active">
          <div className={`nav-link-content ${DEBUG_MODE ? 'debug' : ''}`}>
            <img alt="" src={navIcon1} />
            <span>Work</span>
          </div>
        </div>
        <Link to="/about" className="nav-link-hitbox">
          <div className={`nav-link-content ${DEBUG_MODE ? 'debug' : ''}`}>
            <img alt="" src={navIcon2} />
            <span>About</span>
          </div>
        </Link>
        <a 
          href="https://drive.google.com/file/d/16-40Cn3zA-ycPumRDotUk9cQDE1S-8aO/view" 
          target="_blank" 
          rel="noopener noreferrer"
          className="nav-link-hitbox"
        >
          <div className={`nav-link-content ${DEBUG_MODE ? 'debug' : ''}`}>
            <img alt="" src={navIcon3} />
            <span>Resume</span>
          </div>
        </a>
      </div>

      {/* Content */}
      <div className="work-tags-container">
        <div className="work-links">
          <div 
            className={`tag-hitbox ${selectedTag === 'all' ? 'tag-hitbox-active' : ''}`}
            onClick={() => handleTagClick('all')}
          >
            <div className="work-link-wrapper">
              <div className="work-link">
                <div className="work-text-container">
                  <p className="work-text">All</p>
                </div>
              </div>
            </div>
          </div>
          
          <div 
            className={`tag-hitbox ${selectedTag === 'branding' ? 'tag-hitbox-active' : ''}`}
            onClick={() => handleTagClick('branding')}
          >
            <div className="work-link-wrapper">
              <div className="work-link">
                <div className="work-text-container">
                  <p className="work-text">Branding</p>
                </div>
              </div>
            </div>
          </div>
          
          <div 
            className={`tag-hitbox ${selectedTag === 'illustration' ? 'tag-hitbox-active' : ''}`}
            onClick={() => handleTagClick('illustration')}
          >
            <div className="work-link-wrapper">
              <div className="work-link">
                <div className="work-text-container">
                  <p className="work-text">Illustration</p>
                </div>
              </div>
            </div>
          </div>
          
          <div 
            className={`tag-hitbox ${selectedTag === 'motion' ? 'tag-hitbox-active' : ''}`}
            onClick={() => handleTagClick('motion')}
          >
            <div className="work-link-wrapper">
              <div className="work-link">
                <div className="work-text-container">
                  <p className="work-text">Motion</p>
                </div>
              </div>
            </div>
          </div>
          
          <div 
            className={`tag-hitbox ${selectedTag === 'ui/ux' ? 'tag-hitbox-active' : ''}`}
            onClick={() => handleTagClick('ui/ux')}
          >
            <div className="work-link-wrapper">
              <div className="work-link">
                <div className="work-text-container">
                  <p className="work-text">UI/UX</p>
                </div>
              </div>
            </div>
          </div>
          
          <div 
            className={`tag-hitbox ${selectedTag === 'web' ? 'tag-hitbox-active' : ''}`}
            onClick={() => handleTagClick('web')}
          >
            <div className="work-link-wrapper">
              <div className="work-link">
                <div className="work-text-container">
                  <p className="work-text">Web</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Work Grid */}
      <div className="work-content-container">
        <div className="work-grid-container">
          {columns.map((column, colIndex) => (
            <div key={colIndex} className="work-grid-column">
              {column.map((item, rowIndex) => {
                const animationDelay = getCardAnimationDelay(colIndex, rowIndex)
                
                // Determine external link URL for specific projects
                const getExternalLink = (id) => {
                  switch(id) {
                    case 1: return 'https://x.com/CatHoang_/status/1803918547095044497'
                    case 2: return 'https://my-retro-desktop.vercel.app/'
                    case 4: return 'https://business-adobe-sandbox.framer.website/'
                    case 8: return 'https://x.com/CatHoang_/status/1875347735987286473'
                    case 12: return 'https://answer-this.framer.website/'
                    case 13: return 'https://2022-technova.framer.website/'
                    case 14: return 'https://github.com/catherinehoang44/pokemon-cursor'
                    case 15: return 'https://radial-bitmap.vercel.app/'
                    case 16: return 'https://cats-life.notion.site/demeterehr'
                    default: return null
                  }
                }
                
                // Determine case study link (internal) for specific projects
                const getCaseStudyLink = (id) => {
                  switch(id) {
                    case 5: return `/case/project-5` // Adobe Cert
                    case 10: return `/case/project-10` // OpenAI Concept
                    default: return null
                  }
                }
                
                const externalLink = getExternalLink(item.id)
                const caseStudyLink = getCaseStudyLink(item.id)
                const hasLink = externalLink !== null || caseStudyLink !== null
                
                const cardContent = (
                  <>
                  <div 
                    className={`work-card-image-placeholder ${item.video || item.rive ? 'work-card-video-container' : ''} ${item.id === 13 ? 'work-card-technova' : ''}`}
                    style={{ aspectRatio: item.id === 13 ? undefined : item.aspectRatio }}
                  >
                    {item.rive && item.id === 5 ? (
                      <AdobeCertRive />
                    ) : item.video ? (
                      <video 
                        src={item.video} 
                        className={`work-card-video ${item.id === 13 ? 'work-card-video-technova' : ''}`}
                        autoPlay
                        loop
                        muted
                        playsInline
                      />
                    ) : item.image ? (
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="work-card-image"
                      />
                    ) : null}
                    <div className="work-snapshot-container">
                      <img src={dottedLine} alt="" className="work-snapshot-dotted-line work-snapshot-dotted-line-top" />
                      <div className="work-snapshot-content">
                        <div className="work-snapshot-header">
                          <p className="work-snapshot-title">{item.title}</p>
                          {hasLink && <img src={snapshotArrow} alt="" className="work-snapshot-arrow" />}
                        </div>
                        <p className="work-snapshot-tags-text">
                          {item.tags.join(' // ')}
                        </p>
                      </div>
                      <img src={dottedLine} alt="" className="work-snapshot-dotted-line work-snapshot-dotted-line-bottom" />
                    </div>
                  </div>
                  </>
                )
                
                if (externalLink) {
                  return (
                    <a
                      key={item.id}
                      href={externalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="work-grid-card"
                      style={{
                        animationDelay: `${animationDelay}s`
                      }}
                    >
                      {cardContent}
                    </a>
                  )
                } else if (caseStudyLink) {
                  return (
                    <Link
                      key={item.id}
                      to={caseStudyLink}
                      className="work-grid-card"
                      style={{
                        animationDelay: `${animationDelay}s`
                      }}
                    >
                      {cardContent}
                    </Link>
                  )
                } else {
                  return (
                    <div
                      key={item.id}
                      className="work-grid-card"
                      style={{
                        animationDelay: `${animationDelay}s`
                      }}
                    >
                      {cardContent}
                    </div>
                  )
                }
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WorkPage

