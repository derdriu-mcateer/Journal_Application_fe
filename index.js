// Import necessary modules
import express from 'express';
import {EntryModel, CategoryModel} from './db.js'

// Define initial data for categories and entries
const categories = ['Food', 'Gaming', 'Coding', 'Other'];




// Create an Express application
const app = express();

// Middleware to parse JSON in the request body
app.use(express.json());

// Define a route for the root endpoint that sends a simple JSON response
app.get('/', (req, res) => res.send({ info: 'Journal API' }));

// Define a route for the '/categories' endpoint that sends the categories array
app.get('/categories', async (req, res) => res.send(await CategoryModel.find()));

// Define a route for the '/entries' endpoint that sends the entries array
app.get('/entries', async(req, res) => {
    res.send(await EntryModel.find())
});


// Define a route for the '/entries/:id' endpoint using HTTP GET method
app.get('/entries/:id', async(req, res) => {
    // Retrieve the entry from the 'entries' array based on the extracted ID
    const entry = await EntryModel.findOne({_id : req.params.id});
//    const entry = await EntryModel.findById(req.params.id);
    console.log(entry)
    // Check if an entry was found based on the provided ID
    if (entry) {
        // If an entry is found, send it as a JSON response
        res.send(entry);
    } else {
        // If no entry is found, send a 404 (Not Found) status and an error message as JSON
        res.status(404).send({ error: 'Entry not found' });
    }
});

// Define a route for the '/entries' endpoint with HTTP POST method
app.post('/entries', async (req, res) => {
    try {
        // Use the EntryModel to create a new entry in MongoDB
        const insertedEntry = await EntryModel.create(req.body);

        // Respond with HTTP status 201 (Created) and the created entry
        res.status(201).send(insertedEntry);

    } catch (err) {
        // If an error occurs during the creation of the entry, respond with HTTP status 400 (Bad Request) and an error message
        res.status(400).send({ error: err.message });
    }
});

app.put('/entries/:id', async(req, res) => {
    try {
        const updatedEntry = await EntryModel.findByIdAndUpdate(req.params.id, req.body, { new: true})
        if(updatedEntry){
            res.send(updatedEntry)
        } else {
            res.status(500).send({ error: 'Entry not found'})
        }
    } catch (error) {
        res.status(400).send({error: error.message})
    }
});

app.delete('/entries/:id', async(req, res) => {
    try {
        const deletedEntry = await EntryModel.findByIdAndUpdate(req.params.id)
        if(deletedEntry){
            res.sendStatus(204)
        } else {
            res.status(500).send({ error: 'Entry not found'})
        }
    } catch (error) {
        res.status(400).send({error: error.message})
    }
});
// Start the Express application on port 3001
app.listen(3001);


