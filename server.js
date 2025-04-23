const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require('./routes/userRoutes');
const foodPairingRoutes = require("./routes/foodPairingRoutes");
require("dotenv").config();

const app = express(); // <-- ADD THIS LINE

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use("/api/food-pairings", foodPairingRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Default route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
