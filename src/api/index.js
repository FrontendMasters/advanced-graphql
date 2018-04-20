const project = require('./project')
const merge = require('lodash/merge')

module.exports = {
  typeDefs: [project.typeDefs].join(' '),
  resolvers: merge({}, project.resolvers),
  context: {
    models: {
      project: project.model
    }
  }
}
