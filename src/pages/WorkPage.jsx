import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './WorkPage.css'
import './AboutPage.css'
import aboutBg from '../assets/about-bg.jpg'
import navIcon1 from '../assets/nav-icon-1.svg'
import navIcon2 from '../assets/nav-icon-2.svg'
import navIcon3 from '../assets/nav-icon-3.svg'

// ============================================
// DEBUG MODE - Set to true to show borders
// ============================================
const DEBUG_MODE = true

// Sample work data - replace with your actual work items
const workItems = [
  { id: 1, tag: 'branding', title: 'Project 1', height: 400 },
  { id: 2, tag: 'illustration', title: 'Project 2', height: 350 },
  { id: 3, tag: 'ui/ux', title: 'Project 3', height: 450 },
  { id: 4, tag: 'branding', title: 'Project 4', height: 380 },
  { id: 5, tag: 'illustration', title: 'Project 5', height: 420 },
  { id: 6, tag: 'ui/ux', title: 'Project 6', height: 360 },
  { id: 7, tag: 'branding', title: 'Project 7', height: 440 },
  { id: 8, tag: 'ui/ux', title: 'Project 8', height: 390 },
]

function WorkPage() {
  const [selectedTag, setSelectedTag] = useState('all')
  const [numColumns, setNumColumns] = useState(3)

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
    : workItems.filter(item => item.tag === selectedTag)

  // Distribute items into columns
  const columns = Array(numColumns).fill(null).map(() => [])
  filteredItems.forEach((item, index) => {
    columns[index % numColumns].push(item)
  })

  return (
    <div className="work-page">
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
                <div 
                  key={item.id} 
                  className="work-grid-card"
                  style={{ height: `${item.height}px` }}
                >
                  <div className="work-card-content">
                    <h3>{item.title}</h3>
                    <p>Tag: {item.tag}</p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WorkPage

