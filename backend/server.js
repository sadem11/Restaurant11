const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const protectedRoutes = require('./routes/protectedRoutes');
const ingredientRoutes = require('./routes/ingredientRoutes');
const itemRoutes = require('./routes/itemRoutes');
const assistantRoutes = require('./routes/assistantRoutes'); //assistant route

const app = express();

connectDB();

app.use(cors({
  origin: 'http://localhost:3000', // Adjust this to your frontend URL
  credentials: true, // Allow credentials if needed
}));
app.use(express.json());
app.use('/api/ingredients', ingredientRoutes);
//app.use('/api/pizzas', require('./routes/pizzaRoutes')); 
app.use('/api/dishes', require('./routes/menuRoutes')); 
app.use('/api/ingredients', require('./routes/ingredientRoutes')); // ingredient routes
app.use('/api/items', require('./routes/itemRoutes')); // item routes

app.use('/api/items', itemRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/protected', protectedRoutes);
app.use('/api/items', require('./routes/itemRoutes'));

const path = require('path');

// Serve images from src/utils/images
app.use(
  '/images',
  express.static(path.join(__dirname, '../src/utils/images'))
);

app.use('/api/assistant', assistantRoutes); //assistant route
app.get('/', (req, res) => {
  res.send('Restaurant API is running ');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});
