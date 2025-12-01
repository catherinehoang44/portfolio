import React, { useState } from 'react'
import './Toggle.css'

export default function Toggle({ 
  checked = false, 
  onChange, 
  label,
  ...props 
}) {
  const [isChecked, setIsChecked] = useState(checked)

  const handleToggle = () => {
    const newValue = !isChecked
    setIsChecked(newValue)
    if (onChange) {
      onChange(newValue)
    }
  }

  return (
    <div className="toggle-wrapper" {...props}>
      <div className="toggle-bg">
        <div className="toggle-track">
          <button
            type="button"
            className={`toggle ${isChecked ? 'toggle-checked' : ''}`}
            onClick={handleToggle}
            aria-pressed={isChecked}
            role="switch"
          >
            <span className="toggle-slider">
              <span className="toggle-slider-inner">
                <span className="toggle-slider-cross">+</span>
              </span>
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
