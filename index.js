import express from 'express';

const categories = ['Food', 'Gaming', 'Coding', 'Other'];

const entries = [
    { category: 'Food', content: 'Pizza is yummy!' },
    { category: 'Coding', content: 'Coding is fun!' },
    { category: 'Gaming', content: 'Skyrim is for the Nords' }
]

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
app.post('/entries', (req, res) => {
    // Log the request body to the console
    console.log(req.body);
    // TODO: Validate the request body

    // Create a new entry object and push it to the entries array
    entries.push(req.body);

    // Respond with HTTP status 201 (Created) and the created entry
    res.status(201).send(entries[entries.length - 1]);
});

// Start the Express application on port 3001
app.listen(3001);



// app.get('/example', (req, res) => {
//     // Access information from the request object (req)
//     const clientIP = req.ip;
//     const userAgent = req.get('User-Agent');

//     // Send a response back to the client using the response object (res)
//     res.status(200).send(`Hello! Your IP is ${clientIP} and you're using ${userAgent}`);
// });        