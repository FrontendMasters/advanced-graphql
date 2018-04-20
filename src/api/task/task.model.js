const mongoose = require('mongoose')
const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'project'
  },
  status: {
    type: String,
    required: true,
    enum: [
      'open',
      'working',
      'reviewing',
      'done'
    ],
    default: 'open'
  },
  description: String,
}, {timestamps: true})

module.exports = mongoose.model('task', taskSchema)
