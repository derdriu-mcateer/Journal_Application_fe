import React, { useContext, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { journalContext } from '../reducer'

const NewEntry = ({addEntry}) => {
  const { cat_id } = useParams()
  const [inputValue, setInputValue] = useState('')
  const nav = useNavigate()
  const state = useContext(journalContext)
  const {categories} = state

  async function createEntry(e) {
    e.preventDefault()
    
    const id = await addEntry(cat_id, inputValue)
    setInputValue('')
    nav(`/entry/${id}`)

  }



  return (
    <div className="newEntry-container">

      <h3 className="text-center display-4">New Entry</h3>
      {/* Get categories from props and then uses the index provided from the URL and the gets name from the category object*/}
      <h4>Category: {categories[cat_id].name}</h4>
      
      {/* on submit the create entry function will exectute  */}
      <form onSubmit={createEntry}>
        <textarea className="form-control" id="exampleFormControlTextarea1" placeholder='Type your journal entry here'
          // any changes into the form will be stored into the inputValue
          value={inputValue} onChange={e => setInputValue(e.target.value)}>

        </textarea>

        <button type="submit" className="btn btn-info" id="entry-button"> Submit</button>

        <button className="btn btn-info m-4"> 
          <Link to="/category"> Go Back</Link>
        </button>
      </form>
    </div>
  )
}

export default NewEntry