import React, { useEffect, useState, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import ForceGraph2D from 'react-force-graph-2d'
import './AboutPage.css'
import catIcon from '../assets/cat-icon.png'
import navIcon1 from '../assets/nav-icon-1.svg'
import navIcon2 from '../assets/nav-icon-2.svg'
import navIcon3 from '../assets/nav-icon-3.svg'
import iconX from '../assets/x-icon.svg'
import iconPinterest from '../assets/pinterest.svg'
import iconEmail from '../assets/email-icon.svg'
import cursorIcon from '../assets/cursor-icon.svg'
import handIcon from '../assets/hand-icon.svg'
import moveIcon from '../assets/move-icon.svg'
import workIcon from '../assets/work-icon.svg'
import workLinkIcon from '../assets/work-link-icon.svg'
import paperBg from '../assets/paper-bg.png'
import card4Cat from '../assets/card4-cat.png'
import figmaIcon from '../assets/figma-icon.svg'
import framerIcon from '../assets/framer-icon.svg'
import cursorIcon from '../assets/cursor-ai.svg'
import notionIcon from '../assets/notion-icon.svg'
import riveIcon from '../assets/rive-icon.svg'
import usertestingIcon from '../assets/usertesting-icon.svg'

// ============================================
// DEBUG MODE - Set to true to show borders
// ============================================
const DEBUG_MODE = false

// Reusable TypeTag Component
function TypeTag({ children, icon }) {
  return (
    <div className="media-type">
      {icon && <img alt="" src={icon} className="media-type-icon" />}
      <p className="media-type-text">{children}</p>
    </div>
  )
}

function AboutPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [numColumns, setNumColumns] = useState(3)
  const card4ContentRef = useRef(null)
  const catRef = useRef(null)
  const [lineCoords, setLineCoords] = useState({
    line1: { x1: 50, y1: 50, x2: 50, y2: 50 },
    line2: { x1: 50, y1: 50, x2: 50, y2: 50 },
    line3: { x1: 50, y1: 50, x2: 50, y2: 50 },
    line4: { x1: 50, y1: 50, x2: 50, y2: 50 },
    line5: { x1: 50, y1: 50, x2: 50, y2: 50 },
    line6: { x1: 50, y1: 50, x2: 50, y2: 50 },
  })
  const [draggedTag, setDraggedTag] = useState(null)
  const [tagPositions, setTagPositions] = useState({})
  const tagRefs = useRef({})
  const originalPositions = useRef({})
  const originalLineCoords = useRef(null)
  const [isBouncing, setIsBouncing] = useState(false)
  const graphContainerRef = useRef(null)
  const graphInstanceRef = useRef(null)
  const [graphDimensions, setGraphDimensions] = useState({ width: 400, height: 400 })

  // Graph data for interests map
  const interestsGraphData = {
    nodes: [
      { id: 'center', name: 'Me', val: 15 },
      { id: 'architecture', name: 'Architecture', val: 7 },
      { id: 'motion', name: 'Motion', val: 6 },
      { id: 'branding', name: 'Branding', val: 7 },
      { id: 'uiux', name: 'UI/UX', val: 8 },
      { id: 'steampunk', name: 'Steampunk', val: 5 },
      { id: 'maximalism', name: 'Maximalism', val: 5 },
      { id: 'journaling', name: 'Journaling', val: 6 },
      { id: 'furniture', name: 'Multi-purpose Furniture', val: 4 },
      { id: 'nostalgia', name: 'Nostalgia-Maxing', val: 5 }
    ],
    links: [
      { source: 'center', target: 'architecture' },
      { source: 'center', target: 'motion' },
      { source: 'center', target: 'branding' },
      { source: 'center', target: 'uiux' },
      { source: 'center', target: 'steampunk' },
      { source: 'center', target: 'maximalism' },
      { source: 'center', target: 'journaling' },
      { source: 'center', target: 'furniture' },
      { source: 'center', target: 'nostalgia' },
      { source: 'branding', target: 'uiux' },
      { source: 'branding', target: 'motion' },
      { source: 'architecture', target: 'furniture' },
      { source: 'steampunk', target: 'maximalism' },
      { source: 'nostalgia', target: 'journaling' }
    ]
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    setIsLoading(true)
    
    // Check if loading animation was shown
    const loadingStarted = sessionStorage.getItem('loadingAnimationStarted')
    const loadingCompleted = sessionStorage.getItem('loadingAnimationCompleted')
    
    // If loading animation was shown but not yet completed, wait for completion event
    if (loadingStarted && !loadingCompleted) {
      const handleLoadingComplete = () => {
        // Use requestAnimationFrame to ensure DOM is ready before removing class
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setIsLoading(false)
          })
        })
        window.removeEventListener('loadingAnimationCompleted', handleLoadingComplete)
      }
      window.addEventListener('loadingAnimationCompleted', handleLoadingComplete)
      return () => {
        window.removeEventListener('loadingAnimationCompleted', handleLoadingComplete)
      }
    } else {
      // Loading already completed or not started, use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTimeout(() => {
            setIsLoading(false)
          }, 100)
        })
      })
      return () => {}
    }
  }, [location])

  // Initial load animation
  useEffect(() => {
    setIsLoading(true)
    
    // Check if loading animation was shown
    const loadingStarted = sessionStorage.getItem('loadingAnimationStarted')
    const loadingCompleted = sessionStorage.getItem('loadingAnimationCompleted')
    
    // If loading animation was shown but not yet completed, wait for completion event
    if (loadingStarted && !loadingCompleted) {
      const handleLoadingComplete = () => {
        // Use requestAnimationFrame to ensure DOM is ready before removing class
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setIsLoading(false)
          })
        })
        window.removeEventListener('loadingAnimationCompleted', handleLoadingComplete)
      }
      window.addEventListener('loadingAnimationCompleted', handleLoadingComplete)
      return () => {
        window.removeEventListener('loadingAnimationCompleted', handleLoadingComplete)
      }
    } else {
      // Loading already completed or not started, use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTimeout(() => {
            setIsLoading(false)
          }, 100)
        })
      })
      return () => {}
    }
  }, [])

  // Calculate number of columns for animation delays
  useEffect(() => {
    const updateColumns = () => {
      // Grid uses minmax(380px, 1fr), so calculate based on container width
      const containerWidth = window.innerWidth
      if (containerWidth > 1200) {
        setNumColumns(3)
      } else if (containerWidth > 800) {
        setNumColumns(2)
      } else {
        setNumColumns(1)
      }
    }
    
    updateColumns()
    window.addEventListener('resize', updateColumns)
    return () => window.removeEventListener('resize', updateColumns)
  }, [])

  // Calculate animation delay for each card (left to right, top to bottom)
  const getCardAnimationDelay = (cardIndex) => {
    // Calculate row and column from card index
    const rowIndex = Math.floor(cardIndex / numColumns)
    const colIndex = cardIndex % numColumns
    // Calculate global index: rowIndex * numColumns + colIndex
    const globalIndex = rowIndex * numColumns + colIndex
    // Each card animates 0.1s after the previous one
    return globalIndex * 0.1
  }

  // Calculate line positions for Card 4
  useEffect(() => {
    const calculateLines = () => {
      if (!card4ContentRef.current || !catRef.current) return

      const contentRect = card4ContentRef.current.getBoundingClientRect()
      const catRect = catRef.current.getBoundingClientRect()
      const catCenterX = ((catRect.left + catRect.right) / 2 - contentRect.left) / contentRect.width * 100
      const catCenterY = ((catRect.top + catRect.bottom) / 2 - contentRect.top) / contentRect.height * 100
      
      // Cat is 64px height, so corners are 32px from center (assuming square)
      // Convert to percentage of container
      const catHalfSize = (32 / contentRect.width) * 100
      const catHalfSizeV = (32 / contentRect.height) * 100

      // Get tag positions
      const tag1 = card4ContentRef.current.querySelector('.card4-tag-1')
      const tag2 = card4ContentRef.current.querySelector('.card4-tag-2')
      const tag3 = card4ContentRef.current.querySelector('.card4-tag-3')
      const tag4 = card4ContentRef.current.querySelector('.card4-tag-4')
      const tag5 = card4ContentRef.current.querySelector('.card4-tag-5')
      const tag6 = card4ContentRef.current.querySelector('.card4-tag-6')

      const getTagCorner = (tag, corner, tagIndex) => {
        // Use dragged position if available
        const tagKey = `tag${tagIndex}`
        if (tagPositions[tagKey] && tag) {
          const tagRect = tag.getBoundingClientRect()
          const tagWidth = tagRect.width
          const tagHeight = tagRect.height
          const tagCenterX = (tagPositions[tagKey].x / contentRect.width) * 100
          const tagCenterY = (tagPositions[tagKey].y / contentRect.height) * 100
          
          // Calculate corner from center
          const halfWidth = (tagWidth / 2 / contentRect.width) * 100
          const halfHeight = (tagHeight / 2 / contentRect.height) * 100
          
          switch(corner) {
            case 'bottom-right':
              return { x: tagCenterX + halfWidth, y: tagCenterY + halfHeight }
            case 'bottom-middle':
              return { x: tagCenterX, y: tagCenterY + halfHeight }
            case 'bottom-left':
              return { x: tagCenterX - halfWidth, y: tagCenterY + halfHeight }
            case 'top-right':
              return { x: tagCenterX + halfWidth, y: tagCenterY - halfHeight }
            case 'top-middle':
              return { x: tagCenterX, y: tagCenterY - halfHeight }
            case 'top-left':
              return { x: tagCenterX - halfWidth, y: tagCenterY - halfHeight }
            default:
              return { x: tagCenterX, y: tagCenterY }
          }
        }
        
        if (!tag) return { x: 50, y: 50 }
        const tagRect = tag.getBoundingClientRect()
        const tagWidth = tagRect.width
        const tagHeight = tagRect.height
        
        // Calculate corner positions relative to content container
        let x, y
        switch(corner) {
          case 'bottom-right':
            x = (tagRect.right - contentRect.left) / contentRect.width * 100
            y = (tagRect.bottom - contentRect.top) / contentRect.height * 100
            break
          case 'bottom-middle':
            x = ((tagRect.left + tagRect.right) / 2 - contentRect.left) / contentRect.width * 100
            y = (tagRect.bottom - contentRect.top) / contentRect.height * 100
            break
          case 'bottom-left':
            x = (tagRect.left - contentRect.left) / contentRect.width * 100
            y = (tagRect.bottom - contentRect.top) / contentRect.height * 100
            break
          case 'top-right':
            x = (tagRect.right - contentRect.left) / contentRect.width * 100
            y = (tagRect.top - contentRect.top) / contentRect.height * 100
            break
          case 'top-middle':
            x = ((tagRect.left + tagRect.right) / 2 - contentRect.left) / contentRect.width * 100
            y = (tagRect.top - contentRect.top) / contentRect.height * 100
            break
          case 'top-left':
            x = (tagRect.left - contentRect.left) / contentRect.width * 100
            y = (tagRect.top - contentRect.top) / contentRect.height * 100
            break
          default:
            x = ((tagRect.left + tagRect.right) / 2 - contentRect.left) / contentRect.width * 100
            y = ((tagRect.top + tagRect.bottom) / 2 - contentRect.top) / contentRect.height * 100
        }
        return { x, y }
      }

      // Line 1: Top left cat corner -> bottom right of Reflective writing (tag-6)
      const tag6Corner = getTagCorner(tag6, 'bottom-right', 6)
      // Line 2: Top middle cat -> bottom middle of Architecture (tag-1)
      const tag1Corner = getTagCorner(tag1, 'bottom-middle', 1)
      // Line 3: Top right cat corner -> bottom left of Cute steampunk automata (tag-2)
      const tag2Corner = getTagCorner(tag2, 'bottom-left', 2)
      // Line 4: Bottom left cat corner -> top right of Multi-purpose furniture (tag-5)
      const tag5Corner = getTagCorner(tag5, 'top-right', 5)
      // Line 5: Bottom middle cat -> top middle of Side quests (tag-4)
      const tag4Corner = getTagCorner(tag4, 'top-middle', 4)
      // Line 6: Bottom right cat corner -> top left of Maximalist design (tag-3)
      const tag3Corner = getTagCorner(tag3, 'top-left', 3)

      const newLineCoords = {
        // Line 1: Top left corner -> Reflective writing (tag-6) bottom right
        line1: {
          x1: catCenterX - catHalfSize,
          y1: catCenterY - catHalfSizeV,
          x2: tag6Corner.x,
          y2: tag6Corner.y
        },
        // Line 2: Top middle -> Architecture (tag-1) bottom middle
        line2: {
          x1: catCenterX,
          y1: catCenterY - catHalfSizeV,
          x2: tag1Corner.x,
          y2: tag1Corner.y
        },
        // Line 3: Top right corner -> Cute steampunk automata (tag-2) bottom left
        line3: {
          x1: catCenterX + catHalfSize,
          y1: catCenterY - catHalfSizeV,
          x2: tag2Corner.x,
          y2: tag2Corner.y
        },
        // Line 4: Bottom left corner -> Multi-purpose furniture (tag-5) top right
        line4: {
          x1: catCenterX - catHalfSize,
          y1: catCenterY + catHalfSizeV,
          x2: tag5Corner.x,
          y2: tag5Corner.y
        },
        // Line 5: Bottom middle -> Side quests (tag-4) top middle
        line5: {
          x1: catCenterX,
          y1: catCenterY + catHalfSizeV,
          x2: tag4Corner.x,
          y2: tag4Corner.y
        },
        // Line 6: Bottom right corner -> Maximalist design (tag-3) top left
        line6: {
          x1: catCenterX + catHalfSize,
          y1: catCenterY + catHalfSizeV,
          x2: tag3Corner.x,
          y2: tag3Corner.y
        }
      }
      
      // Store original line coords on first calculation
      if (!originalLineCoords.current) {
        originalLineCoords.current = newLineCoords
      }
      
      setLineCoords(newLineCoords)
    }

    // Calculate on mount and resize
    const timer = setTimeout(calculateLines, 200)
    window.addEventListener('resize', calculateLines)
    
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', calculateLines)
    }
  }, [isLoading, draggedTag, tagPositions])

  // Store original positions on mount
  useEffect(() => {
    if (!card4ContentRef.current) return
    
    const tags = ['tag1', 'tag2', 'tag3', 'tag4', 'tag5', 'tag6']
    tags.forEach((tagName, index) => {
      const tag = card4ContentRef.current.querySelector(`.card4-tag-${index + 1}`)
      if (tag) {
        const rect = tag.getBoundingClientRect()
        const contentRect = card4ContentRef.current.getBoundingClientRect()
        originalPositions.current[tagName] = {
          left: rect.left - contentRect.left,
          top: rect.top - contentRect.top
        }
      }
    })
  }, [isLoading])

  // Update graph dimensions when container resizes
  useEffect(() => {
    const updateGraphSize = () => {
      if (graphContainerRef.current) {
        const rect = graphContainerRef.current.getBoundingClientRect()
        setGraphDimensions({
          width: rect.width,
          height: rect.height
        })
      }
    }

    updateGraphSize()
    window.addEventListener('resize', updateGraphSize)
    
    // Use a small delay to ensure container is rendered
    const timer = setTimeout(updateGraphSize, 100)
    
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', updateGraphSize)
    }
  }, [isLoading])

  // Drag handlers for Card 4 tags
  const handleTagMouseDown = (e, tagIndex) => {
    e.preventDefault()
    const tag = e.currentTarget
    if (!card4ContentRef.current || !catRef.current) return
    
    const contentRect = card4ContentRef.current.getBoundingClientRect()
    const tagRect = tag.getBoundingClientRect()
    
    const startX = e.clientX - tagRect.left
    const startY = e.clientY - tagRect.top
    
    setDraggedTag(tagIndex)
    
    // Store current tagPositions in closure
    let currentTagPositions = { ...tagPositions }
    
    const handleMouseMove = (e) => {
      if (!card4ContentRef.current || !catRef.current) return
      const currentContentRect = card4ContentRef.current.getBoundingClientRect()
      const tag = card4ContentRef.current.querySelector(`.card4-tag-${tagIndex}`)
      if (!tag) return
      
      const tagRect = tag.getBoundingClientRect()
      const tagWidth = tagRect.width
      const tagHeight = tagRect.height
      
      // Calculate new position
      let newX = e.clientX - currentContentRect.left - startX
      let newY = e.clientY - currentContentRect.top - startY
      
      // Constrain to content container bounds (accounting for tag size)
      const minX = tagWidth / 2
      const maxX = currentContentRect.width - tagWidth / 2
      const minY = tagHeight / 2
      const maxY = currentContentRect.height - tagHeight / 2
      
      newX = Math.max(minX, Math.min(maxX, newX))
      newY = Math.max(minY, Math.min(maxY, newY))
      
      const newPosition = { x: newX, y: newY }
      
      // Update position immediately
      currentTagPositions[`tag${tagIndex}`] = newPosition
      setTagPositions(prev => ({
        ...prev,
        [`tag${tagIndex}`]: newPosition
      }))
      
      // Immediately recalculate and update lines using requestAnimationFrame for smooth updates
      requestAnimationFrame(() => {
        if (!card4ContentRef.current || !catRef.current) return
        
        const catRect = catRef.current.getBoundingClientRect()
        const currentRect = card4ContentRef.current.getBoundingClientRect()
        const catCenterX = ((catRect.left + catRect.right) / 2 - currentRect.left) / currentRect.width * 100
        const catCenterY = ((catRect.top + catRect.bottom) / 2 - currentRect.top) / currentRect.height * 100
        
        const catHalfSize = (32 / currentRect.width) * 100
        const catHalfSizeV = (32 / currentRect.height) * 100
        
        // Get all tags
        const tag1 = card4ContentRef.current.querySelector('.card4-tag-1')
        const tag2 = card4ContentRef.current.querySelector('.card4-tag-2')
        const tag3 = card4ContentRef.current.querySelector('.card4-tag-3')
        const tag4 = card4ContentRef.current.querySelector('.card4-tag-4')
        const tag5 = card4ContentRef.current.querySelector('.card4-tag-5')
        const tag6 = card4ContentRef.current.querySelector('.card4-tag-6')
        
        const getTagCorner = (tag, corner, idx) => {
          const tagKey = `tag${idx}`
          const currentPositions = currentTagPositions
          
          if (currentPositions[tagKey] && tag) {
            const tagRect = tag.getBoundingClientRect()
            const tagWidth = tagRect.width
            const tagHeight = tagRect.height
            const tagCenterX = (currentPositions[tagKey].x / currentRect.width) * 100
            const tagCenterY = (currentPositions[tagKey].y / currentRect.height) * 100
            
            const halfWidth = (tagWidth / 2 / currentRect.width) * 100
            const halfHeight = (tagHeight / 2 / currentRect.height) * 100
            
            switch(corner) {
              case 'bottom-right': return { x: tagCenterX + halfWidth, y: tagCenterY + halfHeight }
              case 'bottom-middle': return { x: tagCenterX, y: tagCenterY + halfHeight }
              case 'bottom-left': return { x: tagCenterX - halfWidth, y: tagCenterY + halfHeight }
              case 'top-right': return { x: tagCenterX + halfWidth, y: tagCenterY - halfHeight }
              case 'top-middle': return { x: tagCenterX, y: tagCenterY - halfHeight }
              case 'top-left': return { x: tagCenterX - halfWidth, y: tagCenterY - halfHeight }
              default: return { x: tagCenterX, y: tagCenterY }
            }
          }
          
          if (!tag) return { x: 50, y: 50 }
          const rect = tag.getBoundingClientRect()
          let x, y
          switch(corner) {
            case 'bottom-right': x = (rect.right - currentRect.left) / currentRect.width * 100; y = (rect.bottom - currentRect.top) / currentRect.height * 100; break
            case 'bottom-middle': x = ((rect.left + rect.right) / 2 - currentRect.left) / currentRect.width * 100; y = (rect.bottom - currentRect.top) / currentRect.height * 100; break
            case 'bottom-left': x = (rect.left - currentRect.left) / currentRect.width * 100; y = (rect.bottom - currentRect.top) / currentRect.height * 100; break
            case 'top-right': x = (rect.right - currentRect.left) / currentRect.width * 100; y = (rect.top - currentRect.top) / currentRect.height * 100; break
            case 'top-middle': x = ((rect.left + rect.right) / 2 - currentRect.left) / currentRect.width * 100; y = (rect.top - currentRect.top) / currentRect.height * 100; break
            case 'top-left': x = (rect.left - currentRect.left) / currentRect.width * 100; y = (rect.top - currentRect.top) / currentRect.height * 100; break
            default: x = ((rect.left + rect.right) / 2 - currentRect.left) / currentRect.width * 100; y = ((rect.top + rect.bottom) / 2 - currentRect.top) / currentRect.height * 100
          }
          return { x, y }
        }
        
        const tag6Corner = getTagCorner(tag6, 'bottom-right', 6)
        const tag1Corner = getTagCorner(tag1, 'bottom-middle', 1)
        const tag2Corner = getTagCorner(tag2, 'bottom-left', 2)
        const tag5Corner = getTagCorner(tag5, 'top-right', 5)
        const tag4Corner = getTagCorner(tag4, 'top-middle', 4)
        const tag3Corner = getTagCorner(tag3, 'top-left', 3)
        
        // Update lines immediately
        setLineCoords({
          line1: { x1: catCenterX - catHalfSize, y1: catCenterY - catHalfSizeV, x2: tag6Corner.x, y2: tag6Corner.y },
          line2: { x1: catCenterX, y1: catCenterY - catHalfSizeV, x2: tag1Corner.x, y2: tag1Corner.y },
          line3: { x1: catCenterX + catHalfSize, y1: catCenterY - catHalfSizeV, x2: tag2Corner.x, y2: tag2Corner.y },
          line4: { x1: catCenterX - catHalfSize, y1: catCenterY + catHalfSizeV, x2: tag5Corner.x, y2: tag5Corner.y },
          line5: { x1: catCenterX, y1: catCenterY + catHalfSizeV, x2: tag4Corner.x, y2: tag4Corner.y },
          line6: { x1: catCenterX + catHalfSize, y1: catCenterY + catHalfSizeV, x2: tag3Corner.x, y2: tag3Corner.y }
        })
      })
    }
    
    const handleMouseUp = () => {
      setDraggedTag(null)
      
      // Remove dragged position to trigger bounce back animation
      setTagPositions(prev => {
        const newPos = { ...prev }
        delete newPos[`tag${tagIndex}`]
        return newPos
      })
      
      // During bounce, update line to follow tag
      setIsBouncing(true)
      const bounceInterval = setInterval(() => {
        if (!card4ContentRef.current || !catRef.current) {
          clearInterval(bounceInterval)
          setIsBouncing(false)
          return
        }
        
        const tag = card4ContentRef.current.querySelector(`.card4-tag-${tagIndex}`)
        if (!tag) {
          clearInterval(bounceInterval)
          setIsBouncing(false)
          // Final update to ensure line is at original position
          if (originalLineCoords.current) {
            setLineCoords(originalLineCoords.current)
          }
          return
        }
        
        const contentRect = card4ContentRef.current.getBoundingClientRect()
        const catRect = catRef.current.getBoundingClientRect()
        
        const catCenterX = ((catRect.left + catRect.right) / 2 - contentRect.left) / contentRect.width * 100
        const catCenterY = ((catRect.top + catRect.bottom) / 2 - contentRect.top) / contentRect.height * 100
        const catHalfSize = (32 / contentRect.width) * 100
        const catHalfSizeV = (32 / contentRect.height) * 100
        
        // Get all tags
        const tag1 = card4ContentRef.current.querySelector('.card4-tag-1')
        const tag2 = card4ContentRef.current.querySelector('.card4-tag-2')
        const tag3 = card4ContentRef.current.querySelector('.card4-tag-3')
        const tag4 = card4ContentRef.current.querySelector('.card4-tag-4')
        const tag5 = card4ContentRef.current.querySelector('.card4-tag-5')
        const tag6 = card4ContentRef.current.querySelector('.card4-tag-6')
        
        const getTagCorner = (t, corner, idx) => {
          if (!t) return { x: 50, y: 50 }
          const rect = t.getBoundingClientRect()
          switch(corner) {
            case 'bottom-right': return { x: (rect.right - contentRect.left) / contentRect.width * 100, y: (rect.bottom - contentRect.top) / contentRect.height * 100 }
            case 'bottom-middle': return { x: ((rect.left + rect.right) / 2 - contentRect.left) / contentRect.width * 100, y: (rect.bottom - contentRect.top) / contentRect.height * 100 }
            case 'bottom-left': return { x: (rect.left - contentRect.left) / contentRect.width * 100, y: (rect.bottom - contentRect.top) / contentRect.height * 100 }
            case 'top-right': return { x: (rect.right - contentRect.left) / contentRect.width * 100, y: (rect.top - contentRect.top) / contentRect.height * 100 }
            case 'top-middle': return { x: ((rect.left + rect.right) / 2 - contentRect.left) / contentRect.width * 100, y: (rect.top - contentRect.top) / contentRect.height * 100 }
            case 'top-left': return { x: (rect.left - contentRect.left) / contentRect.width * 100, y: (rect.top - contentRect.top) / contentRect.height * 100 }
            default: return { x: ((rect.left + rect.right) / 2 - contentRect.left) / contentRect.width * 100, y: ((rect.top + rect.bottom) / 2 - contentRect.top) / contentRect.height * 100 }
          }
        }
        
        const tag6Corner = getTagCorner(tag6, 'bottom-right', 6)
        const tag1Corner = getTagCorner(tag1, 'bottom-middle', 1)
        const tag2Corner = getTagCorner(tag2, 'bottom-left', 2)
        const tag5Corner = getTagCorner(tag5, 'top-right', 5)
        const tag4Corner = getTagCorner(tag4, 'top-middle', 4)
        const tag3Corner = getTagCorner(tag3, 'top-left', 3)
        
        setLineCoords({
          line1: { x1: catCenterX - catHalfSize, y1: catCenterY - catHalfSizeV, x2: tag6Corner.x, y2: tag6Corner.y },
          line2: { x1: catCenterX, y1: catCenterY - catHalfSizeV, x2: tag1Corner.x, y2: tag1Corner.y },
          line3: { x1: catCenterX + catHalfSize, y1: catCenterY - catHalfSizeV, x2: tag2Corner.x, y2: tag2Corner.y },
          line4: { x1: catCenterX - catHalfSize, y1: catCenterY + catHalfSizeV, x2: tag5Corner.x, y2: tag5Corner.y },
          line5: { x1: catCenterX, y1: catCenterY + catHalfSizeV, x2: tag4Corner.x, y2: tag4Corner.y },
          line6: { x1: catCenterX + catHalfSize, y1: catCenterY + catHalfSizeV, x2: tag3Corner.x, y2: tag3Corner.y }
        })
      }, 16) // ~60fps
      
      // Stop bouncing after animation completes (0.3s)
      setTimeout(() => {
        clearInterval(bounceInterval)
        setIsBouncing(false)
        // Final update to ensure line is at original position
        if (originalLineCoords.current) {
          setLineCoords(originalLineCoords.current)
        }
      }, 300)
      
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
    
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  return (
    <div className={`about-page ${isLoading ? 'page-loading' : ''}`}>
      
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
        <Link to="/work" className="nav-link-hitbox">
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
          <div className="name-section" style={{ animationDelay: '0s' }}>
            <h1 className="name-text">Cat Hoang</h1>
            <div className="cat-icon-wrapper">
              <div className="cat-icon-container">
                <img alt="Cat" src={catIcon} />
              </div>
            </div>
          </div>
          
          <div className="work-section" style={{ animationDelay: '0.1s' }}>
            <p className="work-title">What I do</p>
            <div className="work-links">
              <Link to="/work?tag=branding" className="tag-hitbox">
                <div className="work-link-wrapper">
                  <div className="work-link">
                    <div className="work-text-container">
                      <p className="work-text">Branding</p>
                    </div>
                  </div>
                </div>
              </Link>
              
              <Link to="/work?tag=motion" className="tag-hitbox">
                <div className="work-link-wrapper">
                  <div className="work-link">
                    <div className="work-text-container">
                      <p className="work-text">Motion</p>
                    </div>
                  </div>
                </div>
              </Link>
              
              <Link to="/work?tag=ui%2Fux" className="tag-hitbox">
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
          <div className="grid-card" style={{ animationDelay: `${getCardAnimationDelay(0)}s` }}>
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
                  <span>Web Brand Designer</span>
                </div>
                <div className="card-social">
                  <a href="https://x.com/angels_filth_" target="_blank" rel="noopener noreferrer" className="social-icon">
                    <img alt="X" src={iconX} />
                  </a>
                  <a href="https://ca.pinterest.com/catherinehoang44/" target="_blank" rel="noopener noreferrer" className="social-icon">
                    <img alt="Pinterest" src={iconPinterest} />
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
          <div className="grid-card grid-card-rive" style={{ animationDelay: `${getCardAnimationDelay(1)}s` }}>
            <div className="card-rive-container">
              <iframe 
                style={{ border: 'none', display: 'block' }}
                width="100%"
                height="100%"
                src="https://rive.app/s/ig4VWtkxtEaGi_NLJCoEOA/embed?runtime=rive-renderer"
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
          <div className="grid-card" style={{ animationDelay: `${getCardAnimationDelay(2)}s` }}>
            <div className="card-content">
              <div className="work-history">
                <div className="work-entry work-entry-present">
                  <a href="https://certification.adobe.com/" target="_blank" rel="noopener noreferrer" className="work-role-link">
                    <p className="work-role">UX Manager, Adobe</p>
                    <div className="work-role-hover-icon">
                      <img alt="" src={workLinkIcon} />
                    </div>
                  </a>
                  <p className="work-date">2023—present</p>
                </div>
                <div className="work-divider"></div>
                <div className="work-entry work-entry-past">
                  <a href="https://education.minecraft.net/en-us" target="_blank" rel="noopener noreferrer" className="work-role-link">
                    <p className="work-role">Marketing Intern, Microsoft</p>
                    <div className="work-role-hover-icon">
                      <img alt="" src={workLinkIcon} />
                    </div>
                  </a>
                  <p className="work-date">2022—2023</p>
                </div>
                <div className="work-divider"></div>
                <div className="work-entry work-entry-past">
                  <a href="https://www.ted.com/tedx/events/55425" target="_blank" rel="noopener noreferrer" className="work-role-link">
                    <p className="work-role">Product Designer, TEDxUW</p>
                    <div className="work-role-hover-icon">
                      <img alt="" src={workLinkIcon} />
                    </div>
                  </a>
                  <p className="work-date">2022—2023</p>
                </div>
                <div className="work-divider"></div>
                <div className="work-entry work-entry-past">
                  <a href="https://business-adobe-sandbox.framer.website/" target="_blank" rel="noopener noreferrer" className="work-role-link">
                    <p className="work-role">Design Manager Intern, Adobe</p>
                    <div className="work-role-hover-icon">
                      <img alt="" src={workLinkIcon} />
                    </div>
                  </a>
                  <p className="work-date">2022—2022</p>
                </div>
                <div className="work-divider"></div>
                <div className="work-entry work-entry-past">
                  <a href="https://aiesec.org/" target="_blank" rel="noopener noreferrer" className="work-role-link">
                    <p className="work-role">Brand Lead, AIESEC</p>
                    <div className="work-role-hover-icon">
                      <img alt="" src={workLinkIcon} />
                    </div>
                  </a>
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
          <div className="grid-card" style={{ animationDelay: `${getCardAnimationDelay(3)}s` }}>
            <div className="card-image-container">
              <img alt="" src={paperBg} className="card-image" />
            </div>
            <div className="card-rive-container card-rive-container-90">
              <iframe 
                style={{ border: 'none', width: '100%', height: '100%' }}
                src="https://rive.app/s/7HLGD_WZY0uw7WimAcm2hA/embed?runtime=rive-renderer"
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

          {/* ============================================
              CARD 5 - Edit content here
              ============================================ */}
          <div className="grid-card" style={{ animationDelay: `${getCardAnimationDelay(4)}s` }}>
            <div className="card-content">
              <div className="card-toolbox">
                <div className="card-toolbox-grid">
                  <a href="https://figma.com/" target="_blank" rel="noopener noreferrer" className="tool-wrapper">
                    <div className="tool-1">
                      <img src={figmaIcon} alt="Figma" className="tool-icon" />
                    </div>
                  </a>
                  <a href="https://framer.com/" target="_blank" rel="noopener noreferrer" className="tool-wrapper">
                    <div className="tool-2">
                      <img src={framerIcon} alt="Framer" className="tool-icon" />
                    </div>
                  </a>
                  <a href="https://miro.com/" target="_blank" rel="noopener noreferrer" className="tool-wrapper">
                    <div className="tool-3">
                      <img src={miroIcon} alt="Miro" className="tool-icon" />
                    </div>
                  </a>
                  <a href="https://www.notion.so/" target="_blank" rel="noopener noreferrer" className="tool-wrapper">
                    <div className="tool-4">
                      <img src={notionIcon} alt="Notion" className="tool-icon" />
                    </div>
                  </a>
                  <a href="https://rive.app/" target="_blank" rel="noopener noreferrer" className="tool-wrapper">
                    <div className="tool-5">
                      <img src={riveIcon} alt="Rive" className="tool-icon" />
                    </div>
                  </a>
                  <a href="https://www.usertesting.com/" target="_blank" rel="noopener noreferrer" className="tool-wrapper">
                    <div className="tool-6">
                      <img src={usertestingIcon} alt="UserTesting" className="tool-icon" />
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <div className="card-heading">
              <div className="card-icon-container">
                <img alt="" src={cursorIcon} />
              </div>
              <p className="card-heading-text">My design toolbox</p>
            </div>
          </div>

          {/* ============================================
              CARD 6 - Edit content here
              ============================================ */}
          <div className="grid-card" style={{ animationDelay: `${getCardAnimationDelay(5)}s` }}>
            <div className="card-image-container">
              <img alt="" src={paperBg} className="card-image" />
              {/* Hidden content - can be restored by removing display: none */}
              <div className="card4-content" ref={card4ContentRef} style={{ display: 'none' }}>
                {/* Lines connecting cat to tags */}
                <svg className="card4-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {/* Line 1: Top left corner -> Reflective writing (tag-6) */}
                  <line 
                    className="card4-line card4-line-1" 
                    x1={lineCoords.line1.x1} 
                    y1={lineCoords.line1.y1} 
                    x2={lineCoords.line1.x2} 
                    y2={lineCoords.line1.y2} 
                  />
                  {/* Line 2: Top middle -> Architecture (tag-1) */}
                  <line 
                    className="card4-line card4-line-2" 
                    x1={lineCoords.line2.x1} 
                    y1={lineCoords.line2.y1} 
                    x2={lineCoords.line2.x2} 
                    y2={lineCoords.line2.y2} 
                  />
                  {/* Line 3: Top right corner -> Cute steampunk automata (tag-2) */}
                  <line 
                    className="card4-line card4-line-3" 
                    x1={lineCoords.line3.x1} 
                    y1={lineCoords.line3.y1} 
                    x2={lineCoords.line3.x2} 
                    y2={lineCoords.line3.y2} 
                  />
                  {/* Line 4: Bottom left corner -> Multi-purpose furniture (tag-5) */}
                  <line 
                    className="card4-line card4-line-4" 
                    x1={lineCoords.line4.x1} 
                    y1={lineCoords.line4.y1} 
                    x2={lineCoords.line4.x2} 
                    y2={lineCoords.line4.y2} 
                  />
                  {/* Line 5: Bottom middle -> Side quests (tag-4) */}
                  <line 
                    className="card4-line card4-line-5" 
                    x1={lineCoords.line5.x1} 
                    y1={lineCoords.line5.y1} 
                    x2={lineCoords.line5.x2} 
                    y2={lineCoords.line5.y2} 
                  />
                  {/* Line 6: Bottom right corner -> Maximalist design (tag-3) */}
                  <line 
                    className="card4-line card4-line-6" 
                    x1={lineCoords.line6.x1} 
                    y1={lineCoords.line6.y1} 
                    x2={lineCoords.line6.x2} 
                    y2={lineCoords.line6.y2} 
                  />
                </svg>
                
                {/* Cat - centered */}
                <div className="card4-cat-wrapper">
                  <div className="card4-cat-container" ref={catRef}>
                    <img alt="Cat" src={card4Cat} />
                  </div>
                </div>
                
                {/* Tags - hexagon distribution */}
                <div className="card4-tags">
                  <div 
                    className={`card4-tag card4-tag-1 ${draggedTag === 1 ? 'card4-tag-dragging' : ''}`}
                    onMouseDown={(e) => handleTagMouseDown(e, 1)}
                    style={tagPositions.tag1 ? {
                      left: `${tagPositions.tag1.x}px`,
                      top: `${tagPositions.tag1.y}px`,
                      transform: 'translate(-50%, -50%)'
                    } : {}}
                  >
                    <p>Multi-purpose design</p>
                  </div>
                  <div 
                    className={`card4-tag card4-tag-2 ${draggedTag === 2 ? 'card4-tag-dragging' : ''}`}
                    onMouseDown={(e) => handleTagMouseDown(e, 2)}
                    style={tagPositions.tag2 ? {
                      left: `${tagPositions.tag2.x}px`,
                      top: `${tagPositions.tag2.y}px`,
                      transform: 'translate(-50%, -50%)'
                    } : {}}
                  >
                    <p>Architecture</p>
                  </div>
                  <div 
                    className={`card4-tag card4-tag-3 ${draggedTag === 3 ? 'card4-tag-dragging' : ''}`}
                    onMouseDown={(e) => handleTagMouseDown(e, 3)}
                    style={tagPositions.tag3 ? {
                      left: `${tagPositions.tag3.x}px`,
                      top: `${tagPositions.tag3.y}px`,
                      transform: 'translate(-50%, -50%)'
                    } : {}}
                  >
                    <p>Maximalism</p>
                  </div>
                  <div 
                    className={`card4-tag card4-tag-4 ${draggedTag === 4 ? 'card4-tag-dragging' : ''}`}
                    onMouseDown={(e) => handleTagMouseDown(e, 4)}
                    style={tagPositions.tag4 ? {
                      left: `${tagPositions.tag4.x}px`,
                      top: `${tagPositions.tag4.y}px`,
                      transform: 'translate(-50%, -50%)'
                    } : {}}
                  >
                    <p>Nostalgia-maxing</p>
                  </div>
                  <div 
                    className={`card4-tag card4-tag-5 ${draggedTag === 5 ? 'card4-tag-dragging' : ''}`}
                    onMouseDown={(e) => handleTagMouseDown(e, 5)}
                    style={tagPositions.tag5 ? {
                      left: `${tagPositions.tag5.x}px`,
                      top: `${tagPositions.tag5.y}px`,
                      transform: 'translate(-50%, -50%)'
                    } : {}}
                  >
                    <p>Steampunk</p>
                  </div>
                  <div 
                    className={`card4-tag card4-tag-6 ${draggedTag === 6 ? 'card4-tag-dragging' : ''}`}
                    onMouseDown={(e) => handleTagMouseDown(e, 6)}
                    style={tagPositions.tag6 ? {
                      left: `${tagPositions.tag6.x}px`,
                      top: `${tagPositions.tag6.y}px`,
                      transform: 'translate(-50%, -50%)'
                    } : {}}
                  >
                    <p>Journaling</p>
                  </div>
                </div>
              </div>
              {/* Interests map force graph */}
              <div className="card-interests-map" ref={graphContainerRef}>
                <ForceGraph2D
                  ref={graphInstanceRef}
                  graphData={interestsGraphData}
                  nodeLabel={(node) => {
                    // Only show label for nodes that link to work page
                    const linkableNodes = ['Branding', 'Motion', 'UI/UX']
                    return linkableNodes.includes(node.name) ? 'View work' : null
                  }}
                  nodeColor={() => '#333'}
                  linkColor={() => 'rgba(0, 0, 0, 0.15)'}
                  linkWidth={0.5}
                  nodeVal={node => node.val}
                  nodeRelSize={6}
                  nodeCanvasObject={(node, ctx, globalScale) => {
                    const label = node.name
                    const fontSize = 6 // Fixed size, not scaled
                    ctx.font = `${fontSize}px 'Neue Montreal', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`
                    ctx.textAlign = 'center'
                    ctx.textBaseline = 'middle'
                    
                    // Measure text to size rectangle
                    const textMetrics = ctx.measureText(label)
                    const textWidth = textMetrics.width
                    const textHeight = fontSize
                    const paddingTop = 2
                    const paddingBottom = 2
                    const paddingLeft = 6
                    const paddingRight = 6
                    
                    const rectWidth = textWidth + paddingLeft + paddingRight
                    const rectHeight = textHeight + paddingTop + paddingBottom
                    const cornerRadius = Math.min(64, Math.min(rectWidth, rectHeight) / 2) // Corner radius, but don't exceed half the smallest dimension
                    const x = node.x - rectWidth / 2
                    const y = node.y - rectHeight / 2
                    
                    // Helper function to draw rounded rectangle
                    const drawRoundedRect = (x, y, width, height, radius) => {
                      ctx.beginPath()
                      ctx.moveTo(x + radius, y)
                      ctx.lineTo(x + width - radius, y)
                      ctx.arcTo(x + width, y, x + width, y + radius, radius)
                      ctx.lineTo(x + width, y + height - radius)
                      ctx.arcTo(x + width, y + height, x + width - radius, y + height, radius)
                      ctx.lineTo(x + radius, y + height)
                      ctx.arcTo(x, y + height, x, y + height - radius, radius)
                      ctx.lineTo(x, y + radius)
                      ctx.arcTo(x, y, x + radius, y, radius)
                      ctx.closePath()
                    }
                    
                    // Draw shadow
                    ctx.save()
                    ctx.shadowColor = 'rgba(0, 0, 0, 0.04)'
                    ctx.shadowBlur = 4
                    ctx.shadowOffsetX = 0
                    ctx.shadowOffsetY = 2
                    drawRoundedRect(x, y, rectWidth, rectHeight, cornerRadius)
                    ctx.fillStyle = '#fff'
                    ctx.fill()
                    ctx.restore()
                    
                    // Draw text
                    ctx.fillStyle = '#8C8C8C'
                    ctx.fillText(label, node.x, node.y)
                  }}
                  nodePointerAreaPaint={(node, color, ctx, globalScale) => {
                    const label = node.name
                    const fontSize = 6 // Fixed size, not scaled
                    ctx.font = `${fontSize}px 'Neue Montreal', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`
                    ctx.textAlign = 'center'
                    ctx.textBaseline = 'middle'
                    
                    // Measure text to size rectangle (same as visual)
                    const textMetrics = ctx.measureText(label)
                    const textWidth = textMetrics.width
                    const textHeight = fontSize
                    const paddingTop = 2
                    const paddingBottom = 2
                    const paddingLeft = 6
                    const paddingRight = 6
                    
                    const rectWidth = textWidth + paddingLeft + paddingRight
                    const rectHeight = textHeight + paddingTop + paddingBottom
                    const cornerRadius = Math.min(64, Math.min(rectWidth, rectHeight) / 2) // Scale corner radius, but don't exceed half the smallest dimension
                    const x = node.x - rectWidth / 2
                    const y = node.y - rectHeight / 2
                    
                    // Helper function to draw rounded rectangle
                    const drawRoundedRect = (x, y, width, height, radius) => {
                      ctx.beginPath()
                      ctx.moveTo(x + radius, y)
                      ctx.lineTo(x + width - radius, y)
                      ctx.arcTo(x + width, y, x + width, y + radius, radius)
                      ctx.lineTo(x + width, y + height - radius)
                      ctx.arcTo(x + width, y + height, x + width - radius, y + height, radius)
                      ctx.lineTo(x + radius, y + height)
                      ctx.arcTo(x, y + height, x, y + height - radius, radius)
                      ctx.lineTo(x, y + radius)
                      ctx.arcTo(x, y, x + radius, y, radius)
                      ctx.closePath()
                    }
                    
                    // Paint rounded rectangle for interaction detection
                    ctx.fillStyle = color
                    drawRoundedRect(x, y, rectWidth, rectHeight, cornerRadius)
                    ctx.fill()
                  }}
                  cooldownTicks={100}
                  onEngineStop={() => {
                    if (graphInstanceRef.current) {
                      graphInstanceRef.current.zoomToFit(400, 80)
                    }
                  }}
                  width={graphDimensions.width}
                  height={graphDimensions.height}
                  enableZoomInteraction={true}
                  enablePanInteraction={true}
                  enableNodeDrag={true}
                  onNodeClick={(node) => {
                    // Map node names to work page tags
                    const tagMap = {
                      'Branding': 'branding',
                      'Motion': 'motion',
                      'UI/UX': 'ui/ux'
                    }
                    const tag = tagMap[node.name]
                    if (tag) {
                      navigate(`/work?tag=${encodeURIComponent(tag)}`)
                    }
                  }}
                  onNodeHover={(node) => {
                    if (node) {
                      const tagMap = {
                        'Branding': 'branding',
                        'Illustration': 'illustration',
                        'UI/UX': 'ui/ux',
                        'Motion': 'motion'
                      }
                      if (tagMap[node.name]) {
                        graphContainerRef.current?.style.setProperty('cursor', 'pointer')
                      } else {
                        graphContainerRef.current?.style.setProperty('cursor', 'default')
                      }
                    } else {
                      graphContainerRef.current?.style.setProperty('cursor', 'default')
                    }
                  }}
                />
              </div>
            </div>
            <div className="card-heading">
              <div className="card-icon-container">
                <img alt="" src={moveIcon} />
              </div>
              <p className="card-heading-text">My interests</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage
