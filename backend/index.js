// native_app/backend/index.js

import express from 'express'; // Import Express using ES6 syntax
import cors from 'cors'; // Import CORS
// body-parser is not needed as express.json() is used

const app = express(); // Create an Express application
const PORT = process.env.PORT || 8001; // Set the port

app.use(cors()); // Enable CORS
app.use(express.json()); // Middleware to parse JSON requests

// Example route
app.get('/', (req, res) => {
    res.send('Hello, World!'); // Respond with a simple message
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`); // Log the server URL
});