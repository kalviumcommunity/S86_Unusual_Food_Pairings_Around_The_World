const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const FoodPairing = require('../models/FoodPairing');

// Validation Middleware
const validatePairing = [
  body('name').notEmpty().withMessage('Name is required'),
  body('origin').notEmpty().withMessage('Origin is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('ingredients').isArray({ min: 1 }).withMessage('Ingredients must be an array with at least one item'),
  body('price').isFloat({ gt: 0 }).withMessage('Price must be a number greater than 0'),
  body('rating').isFloat({ min: 0, max: 5 }).withMessage('Rating must be between 0 and 5'),
  body('available').isBoolean().withMessage('Available must be a boolean'),
  body('created_by').notEmpty().withMessage('created_by is required'),
];

// CREATE with Validation
router.post('/', validatePairing, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const newPairing = new FoodPairing(req.body);
    const saved = await newPairing.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ ALL (support filter by created_by)
router.get('/', async (req, res) => {
  try {
    const filter = req.query.created_by ? { created_by: req.query.created_by } : {};
    const items = await FoodPairing.find(filter).populate('created_by');
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ SINGLE
router.get('/:id', async (req, res) => {
  try {
    const item = await FoodPairing.findById(req.params.id).populate('created_by');
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE
router.put('/:id', async (req, res) => {
  try {
    const updated = await FoodPairing.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    await FoodPairing.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(404).json({ error: 'Item not found' });
  }
});

module.exports = router;
