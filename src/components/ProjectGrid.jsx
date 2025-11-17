import React from 'react'
import './ProjectGrid.css'

const projects = [
  {
    id: 1,
    title: 'Adobe UI',
    type: 'screenshot',
    content: 'Course Catalog interface with Adobe branding',
    color: '#FF0000'
  },
  {
    id: 2,
    title: 'Tech Nova Hackathon',
    type: 'illustration',
    content: '3D block letters with stars',
    color: '#4A90E2'
  },
  {
    id: 3,
    title: 'Goals App',
    type: 'mobile',
    content: 'Dark theme mobile app UI',
    color: '#1a1a1a'
  },
  {
    id: 4,
    title: '',
    type: 'empty',
    content: ''
  },
  {
    id: 5,
    title: 'TEDxUW',
    type: 'illustration',
    content: 'Minimalist logo with landscape',
    color: '#E62B1E'
  },
  {
    id: 6,
    title: 'Employee List UI',
    type: 'screenshot',
    content: 'Administrative interface with table',
    color: '#FF6B35'
  },
  {
    id: 7,
    title: 'Design Challenge',
    type: 'screenshot',
    content: 'Design software interface',
    color: '#4A4A4A'
  },
  {
    id: 8,
    title: '',
    type: 'empty',
    content: ''
  },
  {
    id: 9,
    title: 'Toaster Icon',
    type: 'illustration',
    content: '3D toaster device icon',
    color: '#9B59B6'
  },
  {
    id: 10,
    title: 'Minecraft Achievements',
    type: 'screenshot',
    content: 'Game achievement notifications',
    color: '#2ECC71'
  },
  {
    id: 11,
    title: 'Retro UI',
    type: 'screenshot',
    content: 'Nostalgic operating system interface',
    color: '#1a1a1a'
  },
  {
    id: 12,
    title: '',
    type: 'empty',
    content: ''
  }
]

function ProjectGrid() {
  return (
    <section className="project-grid-section">
      <div className="project-grid">
        {projects.map((project) => (
          <div key={project.id} className={`project-card ${project.type}`}>
            {project.type === 'empty' ? (
              <div className="empty-card"></div>
            ) : (
              <div className="project-content">
                <div className="project-preview" style={{ backgroundColor: project.color + '20' }}>
                  <div className="project-title">{project.title}</div>
                  <div className="project-description">{project.content}</div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export default ProjectGrid

