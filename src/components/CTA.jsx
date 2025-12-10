import React from 'react'
import highlightIcon from '../assets/highlight-icon.png'
import './CTA.css'

function CTA({ text, href, target = '_blank', rel = 'noopener noreferrer' }) {
  return (
    <div className="cta-container">
      <div className="cta-content">
        <div className="cta-layout">
          <div className="cta-icon-wrapper">
            <img alt="" src={highlightIcon} className="cta-icon" />
          </div>
          <a 
            href={href} 
            target={target} 
            rel={rel}
            className="cta-link"
          >
            {text}
          </a>
        </div>
      </div>
    </div>
  )
}

export default CTA
