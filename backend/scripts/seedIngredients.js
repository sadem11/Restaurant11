const mongoose = require('mongoose');
const Ingredient = require('../models/ingredientModel');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    const ingredients = [
      { name: 'smoked bacon', unit: 'g', currentStock: 1000 },
      { name: 'sausage', unit: 'g', currentStock: 2000 },
      { name: 'tomato sauce', unit: 'g', currentStock: 5000 },
      { name: 'mushrooms', unit: 'g', currentStock: 1000 },
      { name: 'cheeze', unit: 'g', currentStock: 3000 },
      { name: 'pepperoni', unit: 'g', currentStock: 1500 },
      { name: 'olive', unit: 'g', currentStock: 800 }
    ];
    await Ingredient.insertMany(ingredients);
    console.log('✅ Ingredients added');
    mongoose.connection.close();
  })
  .catch(err => console.error(err));
