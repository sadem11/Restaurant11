const mongoose = require('mongoose');
const Item = require('../models/Item'); // <-- use Item model now
require('dotenv').config();

const items = [
  { name: 'Sausage Pizza', category: 'pizza', price: 14.50, imageUrl: "pizza.jpg", },
  { name: 'Margherita Pizza', category: 'pizza', price: 8.50,  imageUrl: "pizza.jpg" },
  { name: 'Pepperoni Pizza', category: 'pizza', price: 12, imageUrl: "pizza.jpg" },
  { name: 'Chicken Burger', category: 'burger', price: 7.50, imageUrl: "burgers.jpg"},
  { name: 'Beef Burger', category: 'burger', price: 9.65, imageUrl: "burgers.jpg"},
  { name: 'Spicy Burger', category: 'burger', price: 10.90, imageUrl: "burgers.jpg"},
  { name: 'French Fries', category: 'fries', price: 3.50, imageUrl: "Fries.jpg" },
   { name: 'Cheesy Fries', category: 'fries', price: 5.00,imageUrl: "Fries.jpg" },
    { name: 'Spicy Fries', category: 'fries', price: 4.25, imageUrl: "Fries.jpg" },
  { name: 'Organic juice', category: 'drink', price: 2.60, imageUrl: "drinks-img.jpg" },
  { name: 'Coffee', category: 'drink', price: 3, imageUrl: "drinks-img.jpg"},
  { name: 'Spirits', category: 'drink', price: 5.10, imageUrl: "drinks-img.jpg" },
  { name: 'Tea', category: 'drink', price: 2.20, imageUrl: "drinks-img.jpg"},
  { name: 'Water', category: 'drink', price: 1.49, imageUrl: "drinks-img.jpg" },
  { name: 'Lemon Cake', category: 'dessert', price: 5.80, imageUrl: "dessert-img.jpg" },
  { name: 'Cinnamon rolls', category: 'dessert', price: 6.75, imageUrl: "dessert-img.jpg" },
  { name: 'Vegan pancakes', category: 'dessert', price: 7.50, imageUrl: "dessert-img.jpg" },
];

const seedItems = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Item.deleteMany(); // Clear collection
    await Item.insertMany(items);
    console.log('Items seeded');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedItems();
