// Imports
const express = require('express');
const mongoose = require('mongoose');
const requireDir = require('require-dir');
require('dotenv').config();

// Connecting to DB
mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useCreateIndex', true);

// Loading models
requireDir('./src/models');

// Setting app up
const app = express();
app.use(express.json());

// Routing
app.use('/products', require('./src/routes/product'));
app.use('/client', require('./src/routes/client'));
app.use('/orders', require('./src/routes/order'));
app.use('/services', require('./src/routes/service'));
app.use('/pets', require('./src/routes/pet'));
app.use('/apointments', require('./src/routes/scheduling'));

// Serving
app.listen(9000, ()=>{
  console.log("Server online @ http://localhost:9000");
})