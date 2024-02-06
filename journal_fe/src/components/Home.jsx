import React from 'react';
import { Link } from 'react-router-dom';

const Home = ({entries}) => {

return (
        <>
        <div>
          {entries.map((entry,index) =>(
            <div className="card text-bg-dark mb-3" id="entry-card">
            <div className="card-header">Entry</div>
            <div className="card-body">
                <h5 className="card-title">{entry.content}</h5>
                <p className="card-text">Posted in {entry.category}</p>
                <Link to={`/entry/${index}`}>Veiw Entry</Link>
            </div>
        </div>
          ))}
        </div>
            
        </>
  );
};

export default Home;
