import React from 'react'
import { Link } from 'react-router-dom'

const SidebarCardforall = ({title, svg, to}) => {
  return (
   
        <Link className="nav-link active" to={to} style={{ marginBottom:"10px", textDecoration: 'none' }}>
            <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                {svg}
            </div>
        <span className="nav-link-text ms-1">{title}</span>
        </Link>
  )
}

export default SidebarCardforall