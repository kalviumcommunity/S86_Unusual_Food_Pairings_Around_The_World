const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const foodPairingRoutes = require("./routes/foodPairingRoutes"); // Make sure this path matches your folder structure

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("MongoDB connected successfully"))
.catch((err) => console.error("MongoDB connection error:", err));

// Home Route (for DB connection check)
app.get("/", (req, res) => {
  if (mongoose.connection.readyState === 1) {
    res.send("Database connected successfully");
  } else {
    res.send("Database not connected");
  }
});

// API Routes
app.use("/api/food-pairings", foodPairingRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
