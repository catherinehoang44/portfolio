import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import AboutPage from './pages/AboutPage'
import WorkPage from './pages/WorkPage'
import CasePage from './pages/CasePage'
import LoadingAnimation from './components/LoadingAnimation'
import './App.css'

// Component to handle GitHub Pages 404 redirect
function RedirectHandler() {
  const location = useLocation()
  
  useEffect(() => {
    // Handle GitHub Pages 404 redirect
    // If URL has query string starting with '/', extract the path
    const search = location.search
    if (search && search[1] === '/') {
      const path = search.slice(1).split('&')[0].replace(/~and~/g, '&')
      window.history.replaceState(null, '', path + location.hash)
    }
  }, [location])
  
  return null
}

function App() {
  const [showLoading, setShowLoading] = useState(true) // Show loading animation

  const handleLoadingComplete = () => {
    setShowLoading(false)
  }

  return (
    <BrowserRouter>
      <RedirectHandler />
      {showLoading && <LoadingAnimation onComplete={handleLoadingComplete} />}
      <Routes>
        <Route path="/" element={<Navigate to="/about" replace />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/case/:projectName" element={<CasePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
