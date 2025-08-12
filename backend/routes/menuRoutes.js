const express = require('express');
const router = express.Router();
const Item = require('../models/Item');  // Use Item model here instead of Dish

router.get('/', async (req, res) => {
  try {
    const items = await Item.find({});
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
