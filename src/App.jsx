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
    // Format from 404.html: ?/path/to/page&other=params
    const search = location.search
    if (search && search.length > 1 && search[1] === '/') {
      // Extract the path from the query string
      // The path starts after '?/' and ends at '&' or end of string
      const pathEnd = search.indexOf('&', 2)
      const pathPart = pathEnd > 0 ? search.slice(2, pathEnd) : search.slice(2)
      const decodedPath = '/' + pathPart.replace(/~and~/g, '&')
      
      // Get remaining query params if any
      const remainingSearch = pathEnd > 0 ? search.slice(pathEnd) : ''
      
      // Build the new URL
      const newUrl = decodedPath + remainingSearch + location.hash
      
      // Only replace if the current pathname doesn't match
      if (location.pathname !== decodedPath) {
        window.history.replaceState(null, '', newUrl)
      }
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
