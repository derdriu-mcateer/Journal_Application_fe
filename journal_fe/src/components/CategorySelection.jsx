import React from 'react'
import { Link } from "react-router-dom"

const CategorySelection = ({categories}) => {

  return (
    <div className="category-container">
      <h3> Please Select a Category</h3>
      <ul className="list-group list-group-horizontal">
        {categories.map((item, index) => (
          <li key={index} className="list-group-item list-group-item-info">
            <Link to={`/entry/new/${index}`}>{item}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CategorySelection