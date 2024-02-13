import React from 'react'
import { Link } from 'react-router-dom'
import CategoryImage from './image'

const Home = ({ entries }) => {

  return (
    <>
      <h3 className="text-center display-4">Journal Entries</h3>
      <div className="row justify-content-center">
        {entries.map((entry, index) => (
          <div className="card text-bg-dark col-md-4 mb-3" id="entry-card" key={index}>
            <div className="card-header text-center">Entry</div>
            <div className="card-body">
              <h5 className="card-title">{entry.content}</h5>
              <p className="card-text">{entry.category.name}</p>
              <div className="d-flex justify-content-evenly align-items-center">
                <CategoryImage category={entry.category.name} />
              </div>
              <div className="d-flex justify-content-center mt-3">
                <Link to={`/entry/${index}`} className="btn btn-primary">View Entry</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Home
