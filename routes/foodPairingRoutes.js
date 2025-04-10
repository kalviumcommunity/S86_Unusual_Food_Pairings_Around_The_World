const express = require("express");
const router = express.Router();
const FoodPairing = require("../models/FoodPairing");

// CREATE
router.post("/", async (req, res) => {
  try {
    const newPairing = new FoodPairing(req.body);
    const saved = await newPairing.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ ALL
router.get("/", async (req, res) => {
  try {
    const items = await FoodPairing.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ SINGLE
router.get("/:id", async (req, res) => {
  try {
    const item = await FoodPairing.findById(req.params.id);
    res.json(item);
  } catch (err) {
    res.status(404).json({ error: "Item not found" });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updated = await FoodPairing.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    await FoodPairing.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(404).json({ error: "Item not found" });
  }
});

module.exports = router;
