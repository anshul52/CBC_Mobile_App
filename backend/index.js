import express from 'express'; // Import Express using ES6 syntax
import cors from 'cors'; // Import CORS
import dotenv from 'dotenv'; // Import dotenv to load environment variables
import authRoute from './routes/authRoute.js'; 
import morgan from 'morgan';

dotenv.config(); // Load environment variables from .env file

const app = express(); // Create an Express application
const PORT = process.env.PORT; // Set the port

app.use(cors()); // Enable CORS
app.use(express.json()); // Middleware to parse JSON requests
app.use(morgan("dev")); // Log requests

app.use("/api/auth", authRoute);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`); // Log the server URL
});