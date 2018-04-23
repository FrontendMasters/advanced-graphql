const mongoose = require('mongoose')
const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  task: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'task'
  },
  dueDate: Date,
  project: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'project'
  },
  type: {
    type: String,
    required: true,
    enum: [
      'design',
      'dev'
    ]
  },
  status: {
    type: String,
    required: true,
    enum: [
      'OPEN',
      'IN_PROGRESS',
      'REVIEWING',
      'DONE'
    ],
    default: 'open'
  },
  description: String,
  repoUrl: {
    type: String,
    required(doc) {
      return doc.type === 'dev'
    }
  },
  assetUrl: {
    type: String,
    required (doc) {
      return doc.type === 'design'
    }
  }
}, {timestamps: true})

taskSchema.index({name: 'text'})
taskSchema.index({project: 1, name: 1}, {unique: true})

module.exports = mongoose.model('task', taskSchema)
