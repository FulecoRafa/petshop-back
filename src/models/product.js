const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title:{
    type: String,
    required: [true, 'Product name is required'],
    trim: true
  },
  slug:{
    type: String,
    required: [true, 'Product Slug is required'],
    trim: true,
    index: true,
    unique: true
  },
  description:{
    type: String,
    required: [true, 'Description for product is required'],
    trim: true
  },
  price:{
    type: Number,
    required: [true, 'Product price is required'],
  },
  active:{
    type: Boolean,
    required: true,
    default: true
  },
  tags:[{
    type: String,
    required: [true, 'Please put at least one tag for product']
  }]
});

module.exports = mongoose.model('Product', schema);