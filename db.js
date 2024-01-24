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

const closeConnection = () => {
    console.log('Mongoose disconnecting ...')
    mongoose.disconnect()
}


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



// Define the schema for entries in MongoDB
const categoriesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
});

// Create a model based on the schema
const CategoryModel = mongoose.model('Category', categoriesSchema);



export {closeConnection, EntryModel,CategoryModel}