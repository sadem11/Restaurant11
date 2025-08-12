const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  unit: { type: String, enum: ['g', 'kg', 'ml', 'l', 'piece', 'unit'], required: true },
  currentStock: { type: Number, default: 0 },
  alertThreshold: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Ingredient', ingredientSchema);
