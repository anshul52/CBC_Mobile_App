import express from "express"; // Import Express using ES6 syntax
import cors from "cors"; // Import CORS
import dotenv from "dotenv"; // Import dotenv to load environment variables
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoutes.js";
import sportsRoute from "./routes/sportsRoute.js";
import paymentRoute from "./routes/paymentRoutes.js";
import { handleWebhook } from "./controllers/paymentController.js";
import morgan from "morgan";

dotenv.config(); // Load environment variables from .env file

const app = express(); // Create an Express application
const PORT = process.env.PORT; // Set the port

app.use(cors()); // Enable CORS
app.post("/webhook", express.raw({ type: "application/json" }), handleWebhook);
app.use(express.json()); // Middleware to parse JSON requests
app.use(morgan("dev")); // Log requests

app.use("/api/payment", paymentRoute);
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/sports", sportsRoute);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`); // Log the server URL
});
