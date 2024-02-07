// BrowserRouter allows update to the URL without triggering full page refresh
// Routes is a container for multiple Route components 
// Route is used to conditionally render componenets based on the current URL and takes path as a prop 
import { BrowserRouter as Router, Routes, Route, Outlet, useParams } from 'react-router-dom'

// Import useState which is a hook that allows functional components in React to manage state.
import { useEffect, useState } from 'react'

// Import Components to be rendered 
import Home from './Home'
import NewEntry from './NewEntry'
import CategorySelection from './CategorySelection'
import NavBar from './NavBar'
import ShowEntry from './ShowEntry'


function App() {

  // Hard coded categories and entries 
  const [categories, setCategories] = useState([])
  const [entries, setEntries] = useState([])

  


  useEffect(() => {
    fetch('http://localhost:3001/categories')
    .then(res => res.json())
    .then(data => setCategories(data))

    fetch('http://localhost:3001/entries')
    .then(res => res.json())
    .then(data => setEntries(data))


  }, [])

  // Function which takes cat_id and content as parameters 
  async function addEntry(cat_id, content) {
    const newId = entries.length
    // Key value pairs 
    const newEntry = {
      category: categories[cat_id]._id,
      content: content
    }
    // ...entries leaves the previous array unchanged and adds the newEntry to the end of the array 
    

    const res = await fetch('http://localhost:3001/entries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newEntry)
    })
    const data = await res.json()
    setEntries([...entries, data])
    // 2. Add new entry to the entries list
    return newId
  }


  // Higher Order Component
  function ShowEntryWrapper() {
    // useParams hook to get the id from the URL (/:id)
    const { id } = useParams()

    return (
      // Wanting to access entires from the App parent component 
      // Display the entry where the id in the url matched the entry id 
      <ShowEntry entry={entries[id]} />
    )

  }

  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          {/* Path prop specified the URL path pattern that should be matched for the route. When the current URL matches the path the associated elemnt will be rendered  */}
          <Route path="/" element={<Home entries={entries}/>} />
          {/* The element prop is used to specify the React component (element) that should be rendered on a path match  */}
          <Route path="/category" element={<CategorySelection categories={categories} />} />
          <Route path="/entry" element={<Outlet />}>
            <Route path=":id" element={<ShowEntryWrapper />} />
            <Route path="new/:cat_id" element={<NewEntry categories={categories} addEntry={addEntry} />} />
          </Route>
          <Route path="*" element={<h1>ERROR PAGE NOT FOUND</h1>} />
        </Routes>
      </Router>

    </>
  )
}

export default App
