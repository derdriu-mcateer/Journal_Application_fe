// BrowserRouter allows update to the URL without triggering full page refresh
// Routes is a container for multiple Route components 
// Route is used to conditionally render componenets based on the current URL and takes path as a prop 
import { BrowserRouter as Router, Routes, Route, Outlet, useParams } from 'react-router-dom'

// Import useState which is a hook that allows functional components in React to manage state.
import { useState } from 'react'

// Import Components to be rendered 
import Home from './Home'
import NewEntry from './NewEntry'
import CategorySelection from './CategorySelection'
import NavBar from './NavBar'
import ShowEntry from './ShowEntry'


function App() {

  // Hard coded categories and entries 
  const [categories] = useState(['Food', 'Gaming', 'Coding', 'Other'])
  const [entries, setEntries] = useState([{ category: 'Food', content: "Pizza" }])

  // Function which takes cat_id and content as parameters 
  function addEntry(cat_id, content) {
    const newId = entries.length
    // Key value pairs 
    const newEntry = {
      category: cat_id,
      content: content
    }
    // ...etnries leaves the previous array unchanged and adds the newEntry to the end of the array 
    setEntries([...entries, newEntry])

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
          <Route path="/" element={<Home entries={entries} />} />
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
