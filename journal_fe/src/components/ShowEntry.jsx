import CategoryImage from './image';
import {useNavigate } from 'react-router-dom'

// Entry accessed from ShowEntryWrapper function in App
const ShowEntry = ({ entry}) => {
    const nav = useNavigate()

    const handleDelete = async (entryToDelete) => {
        
        if (entryToDelete && entryToDelete._id) {
            try {
                const response = await fetch(`http://localhost:3001/entries/${entryToDelete._id}`, {
                    method: 'DELETE',
                });
    
                if (response.ok) {
                    // Successfully deleted the entry
                    // You can perform any additional actions here if needed
                    console.log('Entry deleted successfully');
                    nav(`/`)
                } else {
                    // If the response status is not okay, handle the error
                    const errorData = await response.json();
                    throw new Error(errorData.message);
                }
            } catch (error) {
                // If an error occurs during the fetch request or processing the response
                console.error('Error deleting entry:', error.message);
            }
        } else {
            console.error('Invalid entry to delete:', entryToDelete);
        }
    };
    

    return entry ? (
        <>
            <div className="card text-bg-dark mb-3" id="entry-card">
                <div className="card-header">Entry</div>
                <div className="card-body">
                    <h5 className="card-title">{entry.content}</h5>
                    <p className="card-text">{entry.category.name}</p>
                    <CategoryImage category={entry.category.name} />
                    <button type="button" className="btn btn-danger" onClick={() =>{handleDelete(entry)}}>Delete</button>
                </div>
            </div>
        </>
  ) : (
    <h3>Entry not found</h3>
  )
}

export default ShowEntry

