import React from 'react'
import { Link } from 'react-router-dom'
import './AboutPage.css'
import aboutBg from '../assets/about-bg.jpg'
import catIcon from '../assets/cat-icon.png'
import navIcon1 from '../assets/nav-icon-1.svg'
import navIcon2 from '../assets/nav-icon-2.svg'
import navIcon3 from '../assets/nav-icon-3.svg'
import iconX from '../assets/icon-x.svg'
import iconEmail from '../assets/icon-email.svg'
import cursorIcon from '../assets/cursor-icon.svg'
import handIcon from '../assets/hand-icon.svg'
import moveIcon from '../assets/move-icon.svg'
import workIcon from '../assets/work-icon.svg'
import card4Bg from '../assets/Card 4 BG.png'

// ============================================
// DEBUG MODE - Set to true to show borders
// ============================================
const DEBUG_MODE = true

function AboutPage() {
  return (
    <div className="about-page">
      <img 
        alt="" 
        className="about-background" 
        src={aboutBg} 
      />
      
      {/* ============================================
          TABLE OF CONTENTS
          ============================================
          1. NAVIGATION BAR (lines 20-64)
          2. TITLE SECTION (lines 68-76)
          3. WORK GRID (lines 95-103)
          ============================================ */}
      
      {/* ============================================
          1. NAVIGATION BAR
          ============================================ */}
      <div className="nav-container">
        <Link to="/1/work" className="nav-link-hitbox">
          <div className={`nav-link-content ${DEBUG_MODE ? 'debug' : ''}`}>
            <img alt="" src={navIcon1} />
            <span>Work</span>
          </div>
        </Link>
        <div className="nav-link-hitbox nav-link-hitbox-active">
          <div className={`nav-link-content ${DEBUG_MODE ? 'debug' : ''}`}>
            <img alt="" src={navIcon2} />
            <span>About</span>
          </div>
        </div>
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
      <div className="content-container">
        <div className="header-section">
          {/* ============================================
              2. TITLE SECTION
              ============================================ */}
          <div className="name-section">
            <h1 className="name-text">Cat Hoang</h1>
            <div className="cat-icon-wrapper">
              <div className="cat-icon-container">
                <img alt="Cat" src={catIcon} />
              </div>
            </div>
          </div>
          
          <div className="work-section">
            <p className="work-title">What I do</p>
            <div className="work-links">
              <Link to="/1/work" className="tag-hitbox">
                <div className="work-link-wrapper">
                  <div className="work-link">
                    <div className="work-text-container">
                      <p className="work-text">Branding</p>
                    </div>
                  </div>
                </div>
              </Link>
              
              <Link to="/1/work" className="tag-hitbox">
                <div className="work-link-wrapper">
                  <div className="work-link">
                    <div className="work-text-container">
                      <p className="work-text">Illustration</p>
                    </div>
                  </div>
                </div>
              </Link>
              
              <Link to="/1/work" className="tag-hitbox">
                <div className="work-link-wrapper">
                  <div className="work-link">
                    <div className="work-text-container">
                      <p className="work-text">UI/UX</p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* ============================================
            3. WORK GRID
            ============================================ */}
        <div className="grid-container">
          {/* ============================================
              CARD 1 - Edit content here
              ============================================ */}
          <div className="grid-card">
            <div className="card-content">
              <div className="card-description">
                <p>A Toronto-based gal who fell in love with dabbling in all things creative to light joy in others.</p>
                <p>&nbsp;</p>
                <p>Often excited :)</p>
                <p>&nbsp;</p>
                <p>Check out how she thinks, works, and loves.</p>
              </div>
              <div className="card-footer">
                <div className="card-tag">
                  <span>Brand Designer</span>
                </div>
                <div className="card-social">
                  <a href="https://x.com/angelfilth_" target="_blank" rel="noopener noreferrer" className="social-icon">
                    <img alt="X" src={iconX} />
                  </a>
                  <a href="mailto:catherinehoang44@gmail.com" className="social-icon">
                    <img alt="Email" src={iconEmail} />
                  </a>
                </div>
              </div>
            </div>
            <div className="card-heading">
              <div className="card-icon-container">
                <img alt="" src={cursorIcon} />
              </div>
              <p className="card-heading-text">About</p>
            </div>
          </div>

          {/* ============================================
              CARD 2 - Edit content here
              ============================================ */}
          <div className="grid-card">
            <div className="card-rive-container">
              <iframe 
                style={{ border: 'none', display: 'block' }}
                width="100%"
                height="100%"
                src="https://rive.app/s/TKHGytBLUki_7X9iYNOgZA/embed?runtime=rive-renderer"
                allowFullScreen
                allow="autoplay"
                title="Design values animation"
              />
            </div>
            <div className="card-heading">
              <div className="card-icon-container">
                <img alt="" src={handIcon} />
              </div>
              <p className="card-heading-text">Design values</p>
            </div>
          </div>

          {/* ============================================
              CARD 3 - Edit content here
              ============================================ */}
          <div className="grid-card">
            <div className="card-content">
              <div className="work-history">
                <div className="work-entry work-entry-present">
                  <div className="work-icon-wrapper">
                    <img alt="" src={workIcon} />
                  </div>
                  <p className="work-role">User Experience Manager at Adobe</p>
                  <p className="work-date">2023—present</p>
                </div>
                <div className="work-divider"></div>
                <div className="work-entry work-entry-past">
                  <p className="work-role">Product Marketing Intern at Microsoft, Minecraft</p>
                  <div className="work-role-hover-icon">
                    <img alt="" src={workIcon} />
                  </div>
                  <p className="work-date">2022—2023</p>
                </div>
                <div className="work-divider"></div>
                <div className="work-entry work-entry-past">
                  <p className="work-role">Product Designer at TEDxUW</p>
                  <div className="work-role-hover-icon">
                    <img alt="" src={workIcon} />
                  </div>
                  <p className="work-date">2022—2023</p>
                </div>
                <div className="work-divider"></div>
                <div className="work-entry work-entry-past">
                  <p className="work-role">Design Program Manager Intern at Adobe</p>
                  <div className="work-role-hover-icon">
                    <img alt="" src={workIcon} />
                  </div>
                  <p className="work-date">2022—2022</p>
                </div>
                <div className="work-divider"></div>
                <div className="work-entry work-entry-past">
                  <p className="work-role">Brand Lead at AIESEC in Waterloo</p>
                  <div className="work-role-hover-icon">
                    <img alt="" src={workIcon} />
                  </div>
                  <p className="work-date">2020—2022</p>
                </div>
              </div>
            </div>
            <div className="card-heading">
              <div className="card-icon-container">
                <img alt="" src={cursorIcon} />
              </div>
              <p className="card-heading-text">Work</p>
            </div>
          </div>

          {/* ============================================
              CARD 4 - Edit content here
              ============================================ */}
          <div className="grid-card">
            <div className="card-image-container">
              <img alt="" src={card4Bg} className="card-image" />
            </div>
            <div className="card-heading">
              <div className="card-icon-container">
                <img alt="" src={moveIcon} />
              </div>
              <p className="card-heading-text">My interests</p>
            </div>
          </div>

          {/* ============================================
              CARD 5 - Edit content here
              ============================================ */}
          <div className="grid-card">
            <div className="card-rive-container card-rive-container-90">
              <iframe 
                style={{ border: 'none', width: '100%', height: '100%' }}
                src="https://rive.app/s/jO318YieskuE4NTyLe3LXg/embed?runtime=rive-renderer"
                allowFullScreen
                allow="autoplay"
                title="Design problem solving animation"
              />
            </div>
            <div className="card-heading">
              <div className="card-icon-container">
                <img alt="" src={handIcon} />
              </div>
              <p className="card-heading-text">Design problem solving</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage
