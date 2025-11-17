import React from 'react'
import './AboutSection.css'

function AboutSection() {
  const designValues = [
    { label: 'Connection', percentage: 25 },
    { label: 'Community', percentage: 20 },
    { label: 'Immersion', percentage: 15 },
    { label: 'Storytelling', percentage: 15 },
    { label: 'Experimentation', percentage: 15 },
    { label: 'Play', percentage: 10 }
  ]

  const interests = [
    'Architecture',
    'Cute steampunk automata',
    'Minimalist design',
    'Bolo-queen',
    'Multi-use camper furniture',
    'Reflective writing'
  ]

  return (
    <section className="about-section">
      <div className="about-header">
        <div className="header-decoration left"></div>
        <h2 className="about-title">About Me</h2>
        <div className="header-decoration right"></div>
      </div>
      
      <div className="about-cards">
        <div className="about-card">
          <h3 className="card-title">Cat Hoang</h3>
          <p className="card-description">
            A Toronto-based gal who fell in love with dabbling in all things creative to light joy in others. Often excited :) Check out how she thinks, works, and loves.
          </p>
          <div className="card-footer">
            <span className="role">Product Designer</span>
            <div className="social-icons">
              <span className="icon">✕</span>
              <span className="icon">□</span>
            </div>
          </div>
        </div>

        <div className="about-card">
          <div className="donut-chart">
            <div className="chart-center">
              <div className="cat-icon-center">🐱</div>
            </div>
            <svg className="chart-segments" viewBox="0 0 360 360">
              <circle
                cx="180"
                cy="180"
                r="150"
                fill="none"
                stroke="#e0e0e0"
                strokeWidth="2"
              />
              <circle
                cx="180"
                cy="180"
                r="120"
                fill="none"
                stroke="#e0e0e0"
                strokeWidth="2"
              />
            </svg>
            <div className="chart-labels">
              {designValues.map((value, index) => (
                <div key={index} className="chart-segment">
                  <div className="segment-label">{value.label}</div>
                  <div className="segment-percentage">{value.percentage}%</div>
                </div>
              ))}
            </div>
          </div>
          <div className="chart-footer">
            <span className="icon-small">★</span>
            <span className="footer-text">My design values</span>
          </div>
        </div>

        <div className="about-card">
          <div className="mind-map">
            <div className="mind-map-center">
              <div className="cat-icon-center">🐱</div>
            </div>
            <div className="mind-map-nodes">
              {interests.map((interest, index) => (
                <div key={index} className="mind-map-node" style={{
                  '--angle': `${(index * 360) / interests.length}deg`
                }}>
                  <div className="node-line"></div>
                  <div className="node-tag">{interest}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="chart-footer">
            <span className="icon-small">★</span>
            <span className="footer-text">My interests</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection

