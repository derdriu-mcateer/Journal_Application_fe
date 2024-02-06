import React from 'react'

// Entry accessed from ShowEntryWrapper function in App
const ShowEntry = ({ entry }) => {
    return entry ? (
        <>
            <div className="card text-bg-dark mb-3" id="entry-card">
                <div className="card-header">Entry</div>
                <div className="card-body">
                    <h5 className="card-title">{entry.content}</h5>
                    <p className="card-text">Posted in {entry.category}</p>
                </div>
            </div>
        </>
  ) : (
    <h3>Entry not found</h3>
  )
}

export default ShowEntry

