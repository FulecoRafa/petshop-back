const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  client:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client'
  },
  service:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service'
  },
  pet:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pet'
  },
  hour:{
    type: String,
    required: [true, "Hour of service is required"]
  },
  date:{
    type: Date,
    required: [true, "Day os service is required"]
  }
});

module.exports = mongoose.model('Scheduling', schema);