const mongoose = require('mongoose')
const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    trim: true
  }
}, {timestamps: true})

module.exports = mongoose.model('project', projectSchema)
