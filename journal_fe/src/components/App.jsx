import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Home'
import NewEntry from './NewEntry'
import CategorySelection from './CategorySelection'

function App() {


  return (
    <>
      <h1>My Journal</h1>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category" element={<CategorySelection />} />
          <Route path="/entry">
            <Route path="new" element={<NewEntry />} />
          </Route>
          <Route path="*" element={<h1>ERROR PAGE NOT FOUND</h1>}/>
        </Routes>
      </Router>

    </>
  )
}

export default App
