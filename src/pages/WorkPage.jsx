import React, { useState, useEffect } from 'react'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import './WorkPage.css'
import './AboutPage.css'
import aboutBg from '../assets/about-bg.jpg'
import navIcon1 from '../assets/nav-icon-1.svg'
import navIcon2 from '../assets/nav-icon-2.svg'
import navIcon3 from '../assets/nav-icon-3.svg'
import work1Image from '../assets/work-1.png'
import work2Image from '../assets/work-2.png'
import work3Image from '../assets/perplexity-concept.png'
import adobeBusinessMotion from '../assets/adobe-business-motion.mp4'
import adobeCourseCatalogMp4 from '../assets/adobe-course-catalog.mp4'
import test1Mp4 from '../assets/test1.mp4'
import test2Mp4 from '../assets/test2.mp4'
import toasterWebm from '../assets/toaster.webm'
import pixeldoroWebm from '../assets/pixeldoro.webm'
import test3Jpg from '../assets/test3.jpg'
import test4Jpg from '../assets/test4.jpg'
import dreamOnSuckerPng from '../assets/dream-on-sucker.png'
import test5Jpg from '../assets/test5.jpg'
import openaiConceptPng from '../assets/openai-concept.png'
import test6Jpg from '../assets/test6.jpg'
import test7Jpg from '../assets/test7.jpg'
import answerThisPng from '../assets/answer-this.png'
import technovaPng from '../assets/technova.png'
import retroTechPng from '../assets/retro-tech.png'
import retroSitePng from '../assets/retro-site.png'
import test8Mp4 from '../assets/test8.mp4'
import pokemonCursorMp4 from '../assets/pokemon-cursor.mp4'
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
const workItems = [
  { id: 5, tags: ['ui/ux'], title: workTitles['project-5'], height: 420, aspectRatio: BASE_CARD_WIDTH / 420, image: null, video: adobeCourseCatalogMp4 },
  { id: 7, tags: ['ui/ux', 'illustration'], title: workTitles['project-7'], height: 440, aspectRatio: BASE_CARD_WIDTH / 440, image: null, video: test2Mp4 },
  { id: 6, tags: ['ui/ux', 'motion'], title: workTitles['project-6'], height: 360, aspectRatio: BASE_CARD_WIDTH / 360, image: null, video: test1Mp4 },
  { id: 4, tags: ['motion'], title: workTitles['project-4'], height: 380, aspectRatio: BASE_CARD_WIDTH / 380, image: null, video: adobeBusinessMotion },
  { id: 11, tags: ['illustration'], title: workTitles['project-11'], height: 370, aspectRatio: BASE_CARD_WIDTH / 370, image: retroTechPng },
  { id: 3, tags: ['branding', 'illustration'], title: workTitles['project-3'], height: 450, aspectRatio: BASE_CARD_WIDTH / 450, image: work3Image },
  { id: 2, tags: ['illustration'], title: workTitles['project-2'], height: 395, aspectRatio: BASE_CARD_WIDTH / 395, image: retroSitePng },
  { id: 12, tags: ['branding'], title: workTitles['project-12'], height: 430, aspectRatio: BASE_CARD_WIDTH / 430, image: answerThisPng },
  { id: 9, tags: ['branding'], title: workTitles['project-9'], height: 400, aspectRatio: BASE_CARD_WIDTH / 400, image: dreamOnSuckerPng },
  { id: 10, tags: ['illustration'], title: workTitles['project-10'], height: 410, aspectRatio: BASE_CARD_WIDTH / 410, image: openaiConceptPng },
  { id: 1, tags: ['illustration', 'motion'], title: workTitles['project-1'], height: 460, aspectRatio: BASE_CARD_WIDTH / 460, image: null, video: toasterWebm },
  { id: 13, tags: ['illustration', 'branding'], title: workTitles['project-13'], height: 390, aspectRatio: BASE_CARD_WIDTH / 390, image: technovaPng },
  { id: 14, tags: ['illustration'], title: workTitles['project-14'], height: 400, aspectRatio: BASE_CARD_WIDTH / 400, image: null, video: pokemonCursorMp4 },
  { id: 8, tags: ['illustration'], title: workTitles['project-8'], height: 390, aspectRatio: BASE_CARD_WIDTH / 390, image: null, video: pixeldoroWebm },
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
        'ui-ux': 'ui/ux' // Alternative format
      }
      const mappedTag = tagMap[decodedTag] || tagMap[tagParam] || decodedTag
      if (['branding', 'illustration', 'motion', 'ui/ux'].includes(mappedTag)) {
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

  const filteredItems = selectedTag === 'all' 
    ? workItems 
    : workItems.filter(item => item.tags.includes(selectedTag))

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
      <img 
        alt="" 
        className="work-background" 
        src={aboutBg} 
      />
      
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
        <Link to="/1/about" className="nav-link-hitbox">
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
        </div>
      </div>

      {/* Work Grid */}
      <div className="work-content-container">
        <div className="work-grid-container">
          {columns.map((column, colIndex) => (
            <div key={colIndex} className="work-grid-column">
              {column.map((item, rowIndex) => {
                const animationDelay = getCardAnimationDelay(colIndex, rowIndex)
                return (
                  <Link
                    key={item.id}
                    to={`/case/project-${item.id}`}
                    className="work-grid-card"
                    style={{
                      animationDelay: `${animationDelay}s`
                    }}
                  >
                  <div className={`work-card-image-placeholder ${item.video ? 'work-card-video-container' : ''} ${item.id === 6 ? 'work-card-video-square' : ''} ${item.id === 1 || item.id === 5 || item.id === 8 ? 'work-card-video-fill-width' : ''}`}>
                    {item.video ? (
                      <video 
                        src={item.video} 
                        className={`work-card-video ${item.id === 6 ? 'work-card-video-square' : ''} ${item.id === 1 || item.id === 5 || item.id === 8 ? 'work-card-video-fill-width' : ''}`}
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
                          <img src={snapshotArrow} alt="" className="work-snapshot-arrow" />
                        </div>
                        <p className="work-snapshot-tags-text">
                          {item.tags.join(' // ')}
                        </p>
                      </div>
                      <img src={dottedLine} alt="" className="work-snapshot-dotted-line work-snapshot-dotted-line-bottom" />
                    </div>
                  </div>
                </Link>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WorkPage

