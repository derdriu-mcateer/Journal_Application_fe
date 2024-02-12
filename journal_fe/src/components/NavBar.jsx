import { useRef } from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  const navBarRef = useRef()

  function toggleHamburger() {
    // Toggle the 'is-active' class on the button
    const button = document.querySelector('.navbar-toggler')
    button.classList.toggle('is-active')

    // Toggle the 'is-active' class on the navbar
    navBarRef.current.classList.toggle('is-active')
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
      <div className="container-fluid">
        <Link to="/">
            <h4 className="logo">My Journal</h4>
        </Link>
        
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={toggleHamburger}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" ref={navBarRef} id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link active" aria-current="page" >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/category" className="nav-link active" aria-current="page">
                Create new Entry
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
