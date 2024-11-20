import React from 'react'
import { Link } from '@mui/material';
import 'C:/React/Work/udemy/src/componentsCss/Devolopment.css'
const Devolopment = () => {
  return (
    <>
    <div>
      <div className="navbar">
      <span className="main-category">Development</span>
      <Link to="/" className="subcategory">Web Development</Link>
      <Link to="/" className="subcategory">Data Science</Link>
      <Link to="/" className="subcategory">Mobile Development</Link>
      <Link to="/" className="subcategory">Programming Languages</Link>
      <Link to="/" className="subcategory">Game Development</Link>
      <Link to="/" className="subcategory">Database Design & Development</Link>
      <span className="dots">⋮</span>
    </div>
    </div>
    </>
  )
}

export default Devolopment
