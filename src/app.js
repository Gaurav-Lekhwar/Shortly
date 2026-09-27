const express = require('express');

// Create the Express application instance
// This is the core of our backend – all middleware and routes will be attached here
const app = express();

// Built-in middleware: parses incoming JSON request bodies
// Without this, req.body would be undefined for JSON APIs
app.use(express.json());

// Simple health-check endpoint
// Used by Docker, load balancers, and us to verify the server is alive
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    environment: process.env.NODE_ENV || 'development',
  });
});

// Export the app so server.js (and later tests) can use it
// We intentionally do NOT call app.listen() here
module.exports = app;