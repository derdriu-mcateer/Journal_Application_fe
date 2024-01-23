// Import necessary modules
import express from 'express';
// const mongoose = require('mongoose');
import mongoose from 'mongoose';



// Define initial data for categories and entries
const categories = ['Food', 'Gaming', 'Coding', 'Other'];

const entries = [
    { category: 'Food', content: 'Pizza is yummy!' },
    { category: 'Coding', content: 'Coding is fun!' },
    { category: 'Gaming', content: 'Skyrim is for the Nords' }
];

// Connect to MongoDB
async function dbConnect() {
    try{
        await mongoose.connect('ADD DB_URI HERE')
        console.log(`MongoDB connected!`)
    } catch(error){
        console.log(`MongoDb failed to connect! Error:${error}`);
    }
}
dbConnect()


// Define the schema for entries in MongoDB
const entriesSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
});

// Create a model based on the schema
const EntryModel = mongoose.model('Entry', entriesSchema);

// Create an Express application
const app = express();

// Middleware to parse JSON in the request body
app.use(express.json());

// Define a route for the root endpoint that sends a simple JSON response
app.get('/', (req, res) => res.send({ info: 'Journal API' }));

// Define a route for the '/categories' endpoint that sends the categories array
app.get('/categories', (req, res) => res.send(categories));

// Define a route for the '/entries' endpoint that sends the entries array
app.get('/entries', (req, res) => res.send(entries));

// Define a route for the '/entries/:id' endpoint using HTTP GET method
app.get('/entries/:id', (req, res) => {
    // Extract the 'id' parameter from the request's URL parameters
    const entryId = req.params.id;

    // Retrieve the entry from the 'entries' array based on the extracted ID
    const entry = entries[entryId - 1];

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

// Start the Express application on port 3001
app.listen(3001);


