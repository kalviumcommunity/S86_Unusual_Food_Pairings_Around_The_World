// server.js
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

let dbStatus = 'Not connected';

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  dbStatus = 'Connected to MongoDB';
  console.log(dbStatus);
})
.catch((err) => {
  dbStatus = 'Failed to connect';
  console.error(err);
});

// Home Route
app.get('/', (req, res) => {
  res.send(`Database Connection Status: ${dbStatus}`);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
