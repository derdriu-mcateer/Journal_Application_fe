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
import UpdatedEntry from './UpdatedEntry'


function App() {

  // initializses a state variable categories/entries and a function setC/E to update the state. The initial value of each is an empty array [].
  const [categories, setCategories] = useState([])
  const [entries, setEntries] = useState([])

  // useEffect is being used to perform data fetching when the component mounts for the first time (due to the empty dependency array [])
  useEffect(() => {
    fetch('https://journal-api-production.onrender.com/categories')
      // converts the response to JSON format using res.json()
      .then(res => res.json())
      //updating the state variables categories with the fetched data.
      .then(data => setCategories(data))

    fetch('https://journal-api-production.onrender.com/entries')
      .then(res => res.json())
      //updating the state variables entries with the fetched data.
      .then(data => setEntries(data))


  }, []);

  // Async function which takes cat_id and content as parameters 
  async function addEntry(cat_id, content) {

    // create id for the new entry equal to the length of the entries array 
    const newId = entries.length

    // create a new entry object which accepts the parameters as values 
    const newEntry = {
      category: categories[cat_id]._id,
      content: content
    }

    // send a post request with the new entry data in the request body. It waits for the response using the await keyword.
    // without await - res.json() would be called on a Promise object representing the response, rather than the actual response data.
    const response = await fetch('https://journal-api-production.onrender.com/entries', {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newEntry)
    })

    // This line parses the JSON response from the server and stores it in the data variable.
    // Without await - data would be assigned a pending Promise object rather than the actual JSON data returned by the server.
    const data = await response.json()
    // ...entries leaves the previous array unchanged and adds the data to the end of the array
    setEntries([...entries, data])

    // the function returns the newId, which represents the index of the newly added entry in the entries array.
    return newId
  }

  async function deleteEntry(id) {
    try {
      const response = await fetch(`https://journal-api-production.onrender.com/entries/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        console.log('Entry Deleted')
        setEntries(entries.filter(entry => entry._id !== id))
        // Handle any additional actions after successful deletion if needed
      } else {
        // Handle the case where deletion fails
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
        console.log('Entry Updated')
        console.log(entryId)
        // Update the entry in the state
        setEntries(prevEntries => {
          return prevEntries.map(entry => {
            if (entry._id === id) {
              // If this is the updated entry, update its content
              return { ...entry, content: newContent }
            }
            return entry
          })
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
    // ...entries leaves the previous array unchanged and adds the data to the end of the array
    setCategories([...categories, data])

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
    <>
      <Router>
        <NavBar />
        <Routes>
          {/* Path prop specified the URL path pattern that should be matched for the route. When the current URL matches the path the associated elemnt will be rendered  */}
          <Route path="/" element={<Home entries={entries} />} />
          {/* The element prop is used to specify the React component (element) that should be rendered on a path match  */}
          <Route path="/category" element={<UpdatedCategoryWrapper/>} />
          <Route path="/entry" element={<Outlet />}>
            <Route path=":id" element={<ShowEntryWrapper />} />
            <Route path="new/:cat_id" element={<NewEntry categories={categories} addEntry={addEntry} />} />
            <Route path=":id/update" element={<UpdatedEntryWrapper />} />
          </Route>
          <Route path="*" element={<h1>ERROR PAGE NOT FOUND</h1>} />
        </Routes>
      </Router>

    </>
  )
}

export default App
