import { useState } from 'react'
import { Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';


const UpdatedEntry = ({ entry, updateEntry }) => {
    const [inputValue, setInputValue] = useState('')
    const nav = useNavigate()

    async function updateContent(e) {
        e.preventDefault()

        const id = await updateEntry(entry._id, inputValue)
        // After the update is complete, navigate to the entry page
        console.log(entry)
        nav(`/entry/${id}`);

        // Reset the input value
        setInputValue('');
    }


    return (
        <div className="d-flex flex-column justify-content-evenly align-items-center m-3">
            <h3 className="text-center display-4 mb-3">Update Entry</h3>
            <form onSubmit={updateContent}>
                <textarea className="form-control" id="exampleFormControlTextarea1" placeholder='Update content here'
                    // any changes into the form will be stored into the inputValue
                    value={inputValue} onChange={e => setInputValue(e.target.value)}>
                </textarea>
                <div className="d-flex justify-content-evenly align-items-center mt-3">
                    <button type="submit" className="btn btn-info" id="entry-button"> Submit</button>
                    <button className="btn btn-info m-4">
                        <Link to={`/entry/${entry._id}`}>Go Back</Link>
                    </button>
                </div>
            </form>
        </div>

    )
}

export default UpdatedEntry