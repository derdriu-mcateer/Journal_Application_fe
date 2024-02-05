import React, { useState } from 'react'
import { Link } from "react-router-dom"

const CategorySelection = () => {
  const [categories, setCategories] = useState(['Food', 'Gaming', 'Coding', 'Other'])


  return (
    <>
      <h3> Please Select a Category</h3>
      <ul className="card-footer">
        {categories.map((item, index) => (
          <li key={index} className="card-footer-item">
            <Link to={`/entry/new/${index}`}>{item}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export default CategorySelection