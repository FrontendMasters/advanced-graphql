const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: [
      'bag',
      'shirt',
      'hoody',
      'bottoms',
      'shoes'
    ]
  }
}, {timestamps: true})

module.exports = mongoose.model('product', productSchema)
