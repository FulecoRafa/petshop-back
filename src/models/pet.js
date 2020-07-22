const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name:{
    type: String,
    required: [true, "Pet name is required"],
    trim: true
  },
  age:{
    type: Number,
    required: [true, "Pet age is required"]
  },
  type:{
    type: String,
    enum: ['Dog', 'Cat', 'Bird', 'Fish', 'Rabbit', 'Hamster', 'Snake'],
    required: [true, "Pet type is required"]
  },
  breed:{
    type: String,
    required: [true, "Pet breed is required"],
    trim: true
  },
  client:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client'
  },
  image:{
    type: String,
    required: [true, "Need to select pet avatar."]
  }
});

module.exports = mongoose.model('Pet', schema);