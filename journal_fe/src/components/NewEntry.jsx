import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

const NewEntry = ({ categories, addEntry}) => {
  const { cat_id } = useParams()
  const [inputValue, setInputValue] = useState('')

  function createEntry(e) {
    e.preventDefault()
    addEntry(cat_id, inputValue)
    setInputValue('')

  }



  return (
    <div className="newEntry-container">
      <h3>New Entry</h3>
      <h4>Category: {categories[cat_id]}</h4>
      <form onSubmit={createEntry}>
        <textarea className="form-control" id="exampleFormControlTextarea1" placeholder='Type your journal entry here'
          value={inputValue} onChange={e => setInputValue(e.target.value)}>

        </textarea>
        <button type="submit" className="btn btn-info" id="entry-button"> Submit</button>
      </form>
    </div>
  )
}

export default NewEntry