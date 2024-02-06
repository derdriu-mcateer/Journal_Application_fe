// BrowserRouter allows update to the URL without triggering full page refresh
// Routes is a container for multiple Route components 
// Route is used to conditionally render componenets based on the current URL and takes path as a prop 
import { BrowserRouter as Router, Routes, Route, Outlet, useParams } from 'react-router-dom'

// Import Components to be rendered 
import Home from './Home'
import NewEntry from './NewEntry'
import CategorySelection from './CategorySelection'
import NavBar from './NavBar'
import { useState } from 'react'
import ShowEntry from './ShowEntry'


function App() {

  const [categories] = useState(['Food', 'Gaming', 'Coding', 'Other'])
  const [entries, setEntries] = useState([{category: 0, content: "Pizza"}])

  function addEntry(cat_id, content){
    const newEntry = {
      category: cat_id,
      content : content
    }
    setEntries([...entries, newEntry])

  }
  // Higher Order Component
  function ShowEntryWrapper(){
    const {id} = useParams()
    return (
      <ShowEntry entry={entries[id]}/>
    )
    
  }

  return (
    <>
      <Router>
        <NavBar />
        <Routes>
        {/* Path prop specified the URL path pattern that should be matched for the route. When the current URL matches the path the associated elemnt will be rendered  */}
          <Route path="/" element={<Home/>} />
        {/* The element prop is used to specify the React component (element) that should be rendered on a path match  */}
          <Route path="/category" element={<CategorySelection categories={categories}/>} />
          <Route path="/entry" element={<Outlet />}>
            <Route path=":id" element={<ShowEntryWrapper/>}/>
            <Route path="new/:cat_id" element={<NewEntry categories={categories} addEntry={addEntry}/>}/>
          </Route>
          <Route path="*" element={<h1>ERROR PAGE NOT FOUND</h1>} />
        </Routes>
      </Router>

    </>
  )
}

export default App
