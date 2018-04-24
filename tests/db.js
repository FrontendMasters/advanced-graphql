const mongoose = require('mongoose')
const Task = require('../src/api/task/task.model')
const Project = require('../src/api/project/project.model')
mongoose.Promise = global.Promise

const models = {
  task: Task,
  project: Project
}

const cleanDB = async (done) => {
  await models.task.remove({})
  await models.project.remove({})
  done()
}

const connectToDB = async () => {
  const connection = await mongoose.connect('mongodb://localhost/done-test')
  return connection
}

const disconnectDB = (done = () => {}) => {
  mongoose.disconnect(done)
}


const generateMongooseId = () => {
  return mongoose.Types.ObjectId()
}

module.exports = {
  cleanDB,
  connectToDB,
  disconnectDB,
  generateMongooseId,
  models
}
