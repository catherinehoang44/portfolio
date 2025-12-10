import React from 'react'
import './ProjectTakeawaysTable.css'
import balanceIcon from '../assets/balance-icon.svg'
import dataIcon from '../assets/data-icon.svg'
import scaleIcon from '../assets/scale-icon.svg'
import accessibleIcon from '../assets/accessible-icon.svg'

export default function ProjectTakeawaysTable() {
  const takeaways = [
    {
      icon: balanceIcon,
      heading: "Balancing Ambition with Practicality",
      text: "Breaking down a large-scale vision into actionable, prioritized steps allowed us to make significant progress within tight time constraints."
    },
    {
      icon: dataIcon,
      heading: "Data-Informed Design Decisions",
      text: "Adobe's suite of design and data resources saved immense time and overhead, by guiding our choices to create a targetted final product."
    },
    {
      icon: scaleIcon,
      heading: "Scalability Through Modularity",
      text: "Designing a flexible, modular system enabled us to create a solution that could grow and adapt to future needs."
    },
    {
      icon: accessibleIcon,
      heading: "Accessibility as a Driver",
      text: "Prioritizing accessibility and cross-functional stakeholders from the start led to a more inclusive and ultimately better product for all users, not just those from different regions and specific needs."
    }
  ]

  return (
    <div className="project-takeaways-table">
      {takeaways.map((takeaway, index) => (
        <div key={index} className="project-takeaway-row">
          <div className="project-takeaway-heading">
            <div className="project-takeaway-icon">
              <img alt="" src={takeaway.icon} />
            </div>
            <p className="project-takeaway-heading-text">{takeaway.heading}</p>
          </div>
          <div className="project-takeaway-text">
            <p>{takeaway.text}</p>
          </div>
        </div>
      ))}
    </div>
  )
}








