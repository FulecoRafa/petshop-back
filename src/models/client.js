const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name:{
    type: String,
    trim: true,
    unique: [true, "Username is unique"],
    required: [true, "Username is required"]
  },
  email:{
    type: String,
    required: [true, "Email is required"]
  },
  passwd:{
    type: String,
    required: [true, "Please provide a password"]
  },
  permission:{
    type: String,
    enum: ["user", "admin"],
    required: [true, "User permissions is required"]
  },
  address:{
    type: String,
    required: [true, "Please provide with your address"]
  },
  phone:{
    type: String,
    required: [true, "Please provide your phone number"]
  }
});

module.exports = mongoose.model('Client', schema);