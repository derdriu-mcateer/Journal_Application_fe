import React, { useState } from 'react'
import { Link } from "react-router-dom"

const CategorySelection = ({categories, addCategory}) => {

  const [inputValue, setInputValue] = useState('')

  async function createCategory(e) {
    e.preventDefault()

    const id = await addCategory(inputValue)
    setInputValue('')
  }

  return (
    <div className="category-container">
      <h3 className="text-center display-4"> Please Select a Category</h3>
      <ul className="list-group list-group-horizontal">
        {categories.map((item, index) => (
          <li key={index} className="list-group-item list-group-item-info">
            <Link to={`/entry/new/${index}`}>{item.name}</Link>
          </li>
        ))}
        <li className="list-group-item list-group-item-info">
      <form onSubmit={createCategory}>
        <input
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          placeholder="New Category Name"
        />
        <button type="submit">Add</button>
      </form></li>
      </ul>
    </div>
  )
}

export default CategorySelection