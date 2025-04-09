// Import Express
const express = require('express');

// Create the app
const app = express();

// Define the port
const PORT = process.env.PORT || 3000;

// /ping route
app.get('/ping', (req, res) => {
  res.send('pong');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
