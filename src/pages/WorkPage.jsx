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
import work3Image from '../assets/work-3.png'
import adobeBusinessMotion from '../assets/adobe-business-motion.mp4'
import adobeGif from '../assets/adobe.gif'
import test1Mp4 from '../assets/test1.mp4'
import test2Mp4 from '../assets/test2.mp4'
import test3Jpg from '../assets/test3.jpg'
import test4Jpg from '../assets/test4.jpg'
import test5Jpg from '../assets/test5.jpg'
import test6Jpg from '../assets/test6.jpg'
import test7Jpg from '../assets/test7.jpg'
import test8Mp4 from '../assets/test8.mp4'
import snapshotArrow from '../assets/snapshot-arrow.svg'
import dottedLine from '../assets/dotted-line.svg'

// ============================================
// DEBUG MODE - Set to true to show borders
// ============================================
const DEBUG_MODE = false

// Sample work data - replace with your actual work items
// Base width for aspect ratio calculation: 429.33px (from About page cards)
const BASE_CARD_WIDTH = 429.33
const workItems = [
  { id: 5, tags: ['illustration', 'ui/ux'], title: 'Adobe Certifications', height: 420, aspectRatio: BASE_CARD_WIDTH / 420, image: adobeGif },
  { id: 7, tags: ['branding', 'illustration'], title: 'Project 1', height: 440, aspectRatio: BASE_CARD_WIDTH / 440, image: null, video: test2Mp4 },
  { id: 6, tags: ['ui/ux'], title: 'Project 2', height: 360, aspectRatio: BASE_CARD_WIDTH / 360, image: null, video: test1Mp4 },
  { id: 4, tags: ['branding'], title: 'Project 3', height: 380, aspectRatio: BASE_CARD_WIDTH / 380, image: null, video: adobeBusinessMotion },
  { id: 13, tags: ['ui/ux'], title: 'Project 4', height: 400, aspectRatio: BASE_CARD_WIDTH / 400, image: null, video: test8Mp4 },
  { id: 3, tags: ['ui/ux', 'branding', 'illustration'], title: 'Project 5', height: 450, aspectRatio: BASE_CARD_WIDTH / 450, image: work3Image },
  { id: 2, tags: ['illustration'], title: 'Project 6', height: 395, aspectRatio: BASE_CARD_WIDTH / 395, image: work2Image },
  { id: 1, tags: ['branding', 'ui/ux'], title: 'Project 7', height: 460, aspectRatio: BASE_CARD_WIDTH / 460, image: work1Image },
  { id: 9, tags: ['branding'], title: 'Project 8', height: 400, aspectRatio: BASE_CARD_WIDTH / 400, image: test4Jpg },
  { id: 10, tags: ['illustration', 'ui/ux'], title: 'Project 9', height: 410, aspectRatio: BASE_CARD_WIDTH / 410, image: test5Jpg },
  { id: 12, tags: ['branding', 'illustration'], title: 'Project 10', height: 430, aspectRatio: BASE_CARD_WIDTH / 430, image: test7Jpg },
  { id: 11, tags: ['ui/ux'], title: 'Project 11', height: 370, aspectRatio: BASE_CARD_WIDTH / 370, image: test6Jpg },
  { id: 8, tags: ['ui/ux'], title: 'Project 12', height: 390, aspectRatio: BASE_CARD_WIDTH / 390, image: test3Jpg },
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
        'ui/ux': 'ui/ux',
        'ui%2Fux': 'ui/ux', // URL-encoded version
        'ui-ux': 'ui/ux' // Alternative format
      }
      const mappedTag = tagMap[decodedTag] || tagMap[tagParam] || decodedTag
      if (['branding', 'illustration', 'ui/ux'].includes(mappedTag)) {
        setSelectedTag(mappedTag)
      }
    }
  }, [searchParams])

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
              {column.map((item) => (
                  <Link
                    key={item.id}
                    to={`/case/project-${item.id}`}
                    className="work-grid-card"
                  >
                  <div className={`work-card-image-placeholder ${item.video ? 'work-card-video-container' : ''}`}>
                    {item.video ? (
                      <video 
                        src={item.video} 
                        className="work-card-video"
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
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WorkPage

