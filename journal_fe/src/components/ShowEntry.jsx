import CategoryImage from './image'
import { Link, useNavigate, useParams } from 'react-router-dom'

// Entry accessed from ShowEntryWrapper function in App
const ShowEntry = ({ entry, deleteEntry }) => {
    const nav = useNavigate()
    const { id } = useParams()

    const handleDelete = async () => {
        try {
            await deleteEntry(entry._id)
            console.log('Entry deleted')
            nav('/')
        } catch (error) {
            console.error('Error deleting entry:', error.message)
        }
    }

    return entry ? (
        <>
            <div className="card text-bg-dark mb-3" id="entry-card">
                <div className="card-header">Entry</div>
                <div className="card-body">
                    <h5 className="card-title">{entry.content}</h5>
                    <p className="card-text">{entry.category.name}</p>
                    <div className="d-flex justify-content-evenly align-items-center">
                        <CategoryImage category={entry.category.name} />
                    </div>
                    <div className="d-flex justify-content-evenly align-items-center mt-3">
                        <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
                        <Link to={`/entry/${id}/update`} className="btn btn-info">Update</Link>
                    </div>
                </div>
            </div>
        </>
    ) : (
        <h3 className="text-center display-4">Entry not found</h3>
    )
}

export default ShowEntry

