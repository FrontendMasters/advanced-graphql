const project = require('./project')
const loaders = require('./loaders')
const task = require('./task')
const merge = require('lodash/merge')

module.exports = {
  typeDefs: [
    project.typeDefs,
    task.typeDefs
  ].join(' '),
  resolvers: merge({}, project.resolvers, task.resolvers),
  context: {
    models: {
      project: project.model,
      task: task.model
    },
    loaders: loaders()
  }
}
