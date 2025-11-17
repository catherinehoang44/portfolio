import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AboutPage from './pages/AboutPage'
import WorkPage from './pages/WorkPage'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/1/about" replace />} />
        <Route path="/1/about" element={<AboutPage />} />
        <Route path="/1/work" element={<WorkPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
