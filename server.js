const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // ✅ CORS for cross-origin access
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(cors()); // Allow requests from different origins
app.use(express.json());

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// ✅ Routes
const foodPairingRoutes = require("./routes/foodPairingRoutes");
app.use("/api/food-pairings", foodPairingRoutes);

// ✅ Default route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
