// BrowserRouter allows update to the URL without triggering full page refresh
// Routes is a container for multiple Route components 
// Route is used to conditionally render componenets based on the current URL and takes path as a prop 
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom'

// Import Components to be rendered 
import Home from './Home'
import NewEntry from './NewEntry'
import CategorySelection from './CategorySelection'
import NavBar from './NavBar'


function App() {

  return (
    <>
      <Router>
        <NavBar />
        <Routes>
        {/* Path prop specified the URL path pattern that should be matched for the route. When the current URL matches the path the associated elemnt will be rendered  */}
          <Route path="/" element={<Home />} />
        {/* The element prop is used to specify the React component (element) that should be rendered on a path match  */}
          <Route path="/category" element={<CategorySelection />} />
          <Route path="/entry" element={<Outlet />}>
            <Route path="new/:cat_id" element={<NewEntry />} />
          </Route>
          <Route path="*" element={<h1>ERROR PAGE NOT FOUND</h1>} />
        </Routes>
      </Router>

    </>
  )
}

export default App
