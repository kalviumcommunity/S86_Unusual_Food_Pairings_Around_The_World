// models/FoodPairing.js
const mongoose = require("mongoose");

const FoodPairingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  origin: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  ingredients: {
    type: [String],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  available: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("FoodPairing", FoodPairingSchema, "pairings");
