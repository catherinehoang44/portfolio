import React from 'react'
import './ProjectTakeawaysTable.css'

// Icon URLs from Figma
const imgIcon = "https://www.figma.com/api/mcp/asset/92b84c52-08f2-414e-bed3-6b85d963cd55"
const imgIcon1 = "https://www.figma.com/api/mcp/asset/a068e4db-a430-4156-8dd2-32f2dd1035c2"
const imgIcon2 = "https://www.figma.com/api/mcp/asset/b1c2e887-48b8-4d1e-a178-5ac4e534d2dd"
const imgIcon3 = "https://www.figma.com/api/mcp/asset/47a1244b-119f-4ce1-abb0-09d02612e6cf"

export default function ProjectTakeawaysTable() {
  const takeaways = [
    {
      icon: imgIcon,
      heading: "Balancing Ambition with Practicality",
      text: "Breaking down a large-scale vision into actionable, prioritized steps allowed us to make significant progress within tight time constraints."
    },
    {
      icon: imgIcon1,
      heading: "Data-Informed Design Decisions",
      text: "Adobe's suite of design and data resources saved immense time and overhead, by guiding our choices to create a targetted final product."
    },
    {
      icon: imgIcon2,
      heading: "Scalability Through Modularity",
      text: "Designing a flexible, modular system enabled us to create a solution that could grow and adapt to future needs."
    },
    {
      icon: imgIcon3,
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




