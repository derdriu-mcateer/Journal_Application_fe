
import { BrowserRouter as Router, Routes, Route, Outlet, useParams } from 'react-router-dom'
import reducer, { journalContext} from '../reducer'
import { useEffect, useReducer } from 'react'

// Import Components to be rendered 
import Home from './Home'
import NewEntry from './NewEntry'
import CategorySelection from './CategorySelection'
import NavBar from './NavBar'
import ShowEntry from './ShowEntry'
import UpdatedEntry from './UpdatedEntry'




function App() {

  const [state, dispatch] = useReducer(reducer, {categories: [], entries: []})
  const {categories} = state
  const {entries} = state


  useEffect(() => {
    fetch('https://journal-api-production.onrender.com/categories')
      .then(res => res.json())
      .then(data => 
        dispatch({
          type: 'setCategories',
          data: data
        })
      )

    fetch('https://journal-api-production.onrender.com/entries')
      .then(res => res.json())
      .then(data =>  
        dispatch({
          type: 'setEntries',
          data: data
      })
    )
  }, []);


  async function addEntry(cat_id, content) {

    const newId = entries.length

    const newEntry = {
      category: categories[cat_id]._id,
      content: content
    }

    const response = await fetch('https://journal-api-production.onrender.com/entries', {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newEntry)
    })
    const data = await response.json()
    dispatch({
      type: 'add entry',
      data: data
  })

    return newId
  }

  async function deleteEntry(id) {
    try {
      const response = await fetch(`https://journal-api-production.onrender.com/entries/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        dispatch({
          type: 'delete entry',
          id: id
        })
      } else {
        console.error('Failed to delete entry')
      }
    } catch (error) {
      console.error('Error deleting entry:', error.message)
    }
  }

  async function updateEntry(id, newContent) {
    try {
      const entryId = entries.findIndex(entry => entry._id === id)
      const response = await fetch(`https://journal-api-production.onrender.com/entries/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: newContent }),
      })

      if (response.ok) {
        dispatch({
          type: 'update entry',
          content: newContent,
          id: id
        })
        return entryId
      } else {
        console.error('Failed to update entry')
      }
    } catch (error) {
      console.error('Error updating entry:', error.message)
    }
  }

  async function addCategory(name) {
    const idNew = categories.length
    const newCategory = {
        name: name,
    }

    const response = await fetch('https://journal-api-production.onrender.com/categories', {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newCategory)
    })
    const data = await response.json()
  
    dispatch({
      type: 'add category',
      data: data
    })

    return idNew
}
  function UpdatedCategoryWrapper() {
    return (
      <CategorySelection categories={categories} addCategory={addCategory} />
    )
  }




  // Higher Order Component
  function ShowEntryWrapper() {
    // useParams hook to get the id from the URL (/:id)
    const { id } = useParams()

    return (
      // Wanting to access entires from the App parent component 
      // Display the entry where the id in the url matched the entry id 
      <ShowEntry entry={entries[id]} deleteEntry={deleteEntry} />
    )
  }

  function UpdatedEntryWrapper() {
    const { id } = useParams()

    return (
      <UpdatedEntry entry={entries[id]} updateEntry={updateEntry} />
    )
  }

  return (
    <journalContext.Provider value={state}>
      <Router>
        <NavBar />
        <Routes>
          {/* Path prop specified the URL path pattern that should be matched for the route. When the current URL matches the path the associated elemnt will be rendered  */}
          <Route path="/" element={<Home/>} />
          {/* The element prop is used to specify the React component (element) that should be rendered on a path match  */}
          <Route path="/category" element={<UpdatedCategoryWrapper/>} />
          <Route path="/entry" element={<Outlet />}>
            <Route path=":id" element={<ShowEntryWrapper />} />
            <Route path="new/:cat_id" element={<NewEntry addEntry={addEntry} />} />
            <Route path=":id/update" element={<UpdatedEntryWrapper />} />
          </Route>
          <Route path="*" element={<h1>ERROR PAGE NOT FOUND</h1>} />
        </Routes>
      </Router>

    </journalContext.Provider>
  )
}

export default App
