// backend/models/dishModel.js
const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: Number,
});

const Dish = mongoose.model('Dish', dishSchema);

module.exports = Dish;
