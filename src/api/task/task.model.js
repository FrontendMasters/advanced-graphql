const mongoose = require('mongoose')
const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  parentTask: {
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
    default: 'OPEN'
  },
  description: String,
  repoUrl: {
    type: String,
    required() {
      return this.type === 'dev'
    }
  },
  assetUrl: {
    type: String,
    required () {
      return this.type === 'design'
    }
  }
}, {timestamps: true})

taskSchema.index({name: 'text'})
taskSchema.index({project: 1, name: 1}, {unique: true})

module.exports = mongoose.model('task', taskSchema)
