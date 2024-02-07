import React from 'react';
import { Link } from 'react-router-dom';
import CategoryImage from './image';

const Home = ({ entries}) => {

  return (
    <>
      <div className="row justify-content-center">
        {entries.map((entry, index) => (
          <div className="card text-bg-dark col-md-4 mb-3" id="entry-card">
            <div className="card-header">Entry</div>
            <div className="card-body">
              <h5 className="card-title">{entry.content}</h5>
              <p className="card-text">{entry.category.name}</p>
              <CategoryImage category={entry.category.name} />
              <Link to={`/entry/${index}`}>View Entry</Link>
            </div>
          </div>
        ))}
      </div>

    </>
  );
};

export default Home;
