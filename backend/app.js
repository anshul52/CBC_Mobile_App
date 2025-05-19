import express from "express";
import bodyParser from "body-parser";

const app = express();

// Regular body parser for normal routes
// app.use((req, res, next) => {
//   if (req.originalUrl === "/api/payment/webhook") {
//     next();
//   } else {
//     bodyParser.json()(req, res, next);
//   }
// });

// // Special handling for Stripe webhook endpoint
// app.post(
//   "/api/payment/webhook",
//   express.raw({ type: "application/json" }),
//   paymentController.handleWebhook
// );

// ... rest of your app configuration ...
