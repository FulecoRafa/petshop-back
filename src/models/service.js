const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title: {
      type: String,
      required: [true, 'O título é obrigatório'],
      trim: true
  },
  slug: {
      type: String,
      required: [true, 'O slug é obrigatório'],
      trim: true,
      index: true,
      unique: true
  },
  description: {
      type: String,
      required: [true, 'A descrição é obrigatória']
  },
  partner: {
      type:String,
      Required: [true, 'O nome do profissional que presta o serviço é obrigatório']
  },
  price: {
      type: Number,
      required: [true, 'O preço é obrigatório']
  },
  hours: [{
      type: String,
      required: true
  }],
  image:{
    type: String,
    required: [true, "Please provide service icon"]
  }
});

module.exports = mongoose.model('Service', schema)