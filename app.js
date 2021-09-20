const express = require('express');
const path = require('path');
const dotenv = require('dotenv') //virtual environment
const connectDB = require('./database/connection');

// Initialize express
const app = new express();

// Load config
dotenv.config({ path: './config/config.env' })

// Initialize DB
connectDB()





// Body parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Get Home page
app.get('/', (req, res) => {
  res.send('hellow')
});



const PORT = process.env.PORT || 3000
app.listen(PORT, console.log(`Server running on port ${PORT}`));
