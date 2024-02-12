import CategoryImage from './image'
import {Link, useNavigate, useParams } from 'react-router-dom'

// Entry accessed from ShowEntryWrapper function in App
const ShowEntry = ({entry, deleteEntry}) => {
    const nav = useNavigate()
    const {id} = useParams()

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
                    <CategoryImage category={entry.category.name} />
                    <button type="button" className="btn btn-danger" onClick={() =>{handleDelete()}}>Delete</button>
                    <button className="btn btn-info "><Link to={`/entry/${id}/update`}>Update</Link></button>
                </div>
            </div>
        </>
  ) : (
    <h3 className="text-center display-4">Entry not found</h3>
  )
}

export default ShowEntry

