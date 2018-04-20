module.exports = {
  resolvers: require('./task.resolvers'),
  typeDefs: require('../../utils/gqlLoader')('task/task.graphql'),
  model: require('./task.model')
}
