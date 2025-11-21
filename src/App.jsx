import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AboutPage from './pages/AboutPage'
import WorkPage from './pages/WorkPage'
import CasePage from './pages/CasePage'
import LoadingAnimation from './components/LoadingAnimation'
import './App.css'

function App() {
  const [showLoading, setShowLoading] = useState(false) // Hidden for now

  const handleLoadingComplete = () => {
    setShowLoading(false)
  }

  return (
    <BrowserRouter>
      {showLoading && <LoadingAnimation onComplete={handleLoadingComplete} />}
      <Routes>
        <Route path="/" element={<Navigate to="/1/about" replace />} />
        <Route path="/1/about" element={<AboutPage />} />
        <Route path="/1/work" element={<WorkPage />} />
        <Route path="/case/:projectName" element={<CasePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
