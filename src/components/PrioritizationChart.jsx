import React from 'react'
import './PrioritizationChart.css'

// Image URLs from Figma
const imgContainerAndLines = "https://www.figma.com/api/mcp/asset/dd800a76-3f07-4a62-917d-c176e0500fdd"
const imgYAxisLine = "https://www.figma.com/api/mcp/asset/5d0fd60e-417b-4530-8d41-a19979d18a8b"
const imgYAxisLine1 = "https://www.figma.com/api/mcp/asset/4e19622d-f8b9-4a6d-a1b6-58ad3c32ba08"
const imgXLine = "https://www.figma.com/api/mcp/asset/f1e7dc58-c2e5-4fc9-9c8b-8417df22c664"
const imgXLine1 = "https://www.figma.com/api/mcp/asset/ede8e247-2016-475b-97cc-a07d304005d9"
const imgGroup3466770 = "https://www.figma.com/api/mcp/asset/9ef3febb-db74-46a5-ba7f-5a2836b643e1"
import circleImg from '../assets/4.0-circle.png'
import circleSelectedImg from '../assets/4.0-circle-selected.png'

export default function PrioritizationChart() {
  return (
    <div className="priorities-content">
      <div className="priorities-content-inner">
        <div className="priorities-text">
          <p>As a result of our research, we determined the need to broaden the scope of users and create new sets of content categories within the web experience. We plotted our potential users as a spectrum between enterprise and independent users, as well as junior to senior career experience.</p>
        </div>
        <div className="priorities-graph">
          <div className="priorities-graph-assets">
            <div className="priorities-container-and-lines">
              <img alt="" src={imgContainerAndLines} className="priorities-container-and-lines-img" />
            </div>
            <img src={circleImg} alt="" className="priorities-circle" />
            <img src={circleSelectedImg} alt="" className="priorities-circle-selected" />
            <div className="priorities-y-axis-line"></div>
            <div className="priorities-x-axis-line"></div>
            <div className="priorities-y-label-bottom">
              <div className="priorities-y-label-bottom-box">
                <p>Independent User</p>
              </div>
            </div>
            <div className="priorities-y-label-top">
              <div className="priorities-y-label-top-box">
                <p>Enterprise Partner</p>
              </div>
            </div>
            <div className="priorities-x-label-left">
              <div className="priorities-x-label-left-inner">
                <div className="priorities-x-label-left-box">
                  <p>Junior in Career</p>
                </div>
              </div>
            </div>
            <div className="priorities-x-label-right">
              <div className="priorities-x-label-right-inner">
                <div className="priorities-x-label-right-box">
                  <p>Senior in Career</p>
                </div>
              </div>
            </div>
          </div>
          <div className="priorities-plots">
            <div className="priorities-point priorities-point-highlight" style={{ left: '39.1%', top: 'calc(47.2% + 10px)' }}>
              <div className="priorities-point-icon">
                <img alt="" src={imgGroup3466770} />
              </div>
              <div className="priorities-point-text">
                <p className="priorities-point-title">Online Courses</p>
                <p className="priorities-point-subtitle">All Users</p>
              </div>
            </div>
            <div className="priorities-point" style={{ left: '22.3%', top: '9.3%' }}>
              <div className="priorities-point-icon">
                <img alt="" src={imgGroup3466770} />
              </div>
              <div className="priorities-point-text">
                <p className="priorities-point-title">On-Demand Training</p>
                <p className="priorities-point-subtitle">All Users</p>
              </div>
            </div>
            <div className="priorities-point" style={{ left: '0%', top: '75.8%' }}>
              <div className="priorities-point-icon">
                <img alt="" src={imgGroup3466770} />
              </div>
              <div className="priorities-point-text">
                <p className="priorities-point-title">Beginner Certificates</p>
                <p className="priorities-point-subtitle">New in Career</p>
              </div>
            </div>
            <div className="priorities-point" style={{ left: '72.0%', top: '62.9%' }}>
              <div className="priorities-point-icon">
                <img alt="" src={imgGroup3466770} />
              </div>
              <div className="priorities-point-text">
                <p className="priorities-point-title">Advanced Certificates</p>
                <p className="priorities-point-subtitle">Management</p>
              </div>
            </div>
            <div className="priorities-point" style={{ left: '1.9%', top: 'calc(50.0% - 30px)' }}>
              <div className="priorities-point-icon">
                <img alt="" src={imgGroup3466770} />
              </div>
              <div className="priorities-point-text">
                <p className="priorities-point-title">University/College Programs</p>
                <p className="priorities-point-subtitle">Education Partners, Students</p>
              </div>
            </div>
            <div className="priorities-point priorities-point-highlight" style={{ left: '45.4%', top: '66.5%' }}>
              <div className="priorities-point-icon">
                <img alt="" src={imgGroup3466770} />
              </div>
              <div className="priorities-point-text">
                <p className="priorities-point-title">Community Forums</p>
                <p className="priorities-point-subtitle">All Users</p>
              </div>
            </div>
            <div className="priorities-point priorities-point-highlight" style={{ left: '45.4%', top: '33.5%' }}>
              <div className="priorities-point-icon">
                <img alt="" src={imgGroup3466770} />
              </div>
              <div className="priorities-point-text">
                <p className="priorities-point-title">Support and FAQ</p>
                <p className="priorities-point-subtitle">All Users</p>
              </div>
            </div>
            <div className="priorities-point" style={{ left: '68.2%', top: 'calc(0% + 5px)' }}>
              <div className="priorities-point-icon">
                <img alt="" src={imgGroup3466770} />
              </div>
              <div className="priorities-point-text">
                <p className="priorities-point-title">Voucher Dashboard</p>
                <p className="priorities-point-subtitle">Adobe Partners</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

