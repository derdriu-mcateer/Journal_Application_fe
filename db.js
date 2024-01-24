import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
async function dbConnect() {
    try{
        await mongoose.connect(process.env.DB_URI);
        console.log(`MongoDB connected!`)
    } catch(error){
        console.log(`MongoDb failed to connect! Error:${error}`);
    }
}
dbConnect()

process.on('SIGTERM',  () => mongoose.disconnect())

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

export {EntryModel}