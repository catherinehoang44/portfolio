import React from 'react'
import './HeroSection.css'

function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="computer-illustration">
          <div className="computer-monitor">
            <div className="monitor-screen">
              <div className="popup-window">
                <div className="window-titlebar">
                  <div className="window-controls">
                    <span className="control-dot red"></span>
                    <span className="control-dot yellow"></span>
                    <span className="control-dot green"></span>
                  </div>
                  <span className="window-title">product_design.psd</span>
                </div>
                <div className="window-content">
                  <p className="window-text">Turning paper balls into paper planes</p>
                  <div className="paper-airplane-icon">✈</div>
                </div>
              </div>
            </div>
            <div className="monitor-base"></div>
          </div>
          <div className="keyboard">
            <div className="keyboard-keys">
              <span className="key">C</span>
              <span className="key">A</span>
              <span className="key">T</span>
              <span className="key space"></span>
              <span className="key">H</span>
              <span className="key">O</span>
              <span className="key">A</span>
              <span className="key">N</span>
              <span className="key">G</span>
            </div>
            <div className="cat-icon">🐱</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection

