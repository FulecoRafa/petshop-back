const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  key:{
    type: String,
    required: [true, "Key is required"]
  }
});

module.exports = mongoose.model('RefreshKey', schema);