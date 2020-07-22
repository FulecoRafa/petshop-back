const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  customer:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: [true, "Client ID for customer is required"]
  },
  items:[{
      _id: false,
      quantity:{
        type: Number,
        required: true,
        default: 1
      },
      price:{
        type: Number,
        required: true
      },
      product:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    }
  }],
  createdAt:{
    type: Date,
    required: true,
    default: Date.now
  },
  status:{
    type: String,
    required: true,
    enum: ['processing', 'created', 'done'],
    default: 'processing'
  }
});

module.exports = mongoose.model('Order', schema);