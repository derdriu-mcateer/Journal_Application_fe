import React, { useContext, useState } from 'react'
import { Link } from "react-router-dom"
import { journalContext } from '../reducer'

const CategorySelection = ({addCategory}) => {

  const state = useContext(journalContext)
  const {categories} = state

  
  const [inputValue, setInputValue] = useState('')

  async function createCategory(e) {
    e.preventDefault()

    const id = await addCategory(inputValue)
    setInputValue('')
  }

  return (
    <div className="category-container">
      <h3 className="text-center display-4"> Please Select a Category</h3>
      <ul className="d-flex flex-column list-group list-group-horizontal">
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
        <button className="btn btn-info m-2"type="submit">Add</button>
      </form></li>
      </ul>
    </div>
  )
}

export default CategorySelection