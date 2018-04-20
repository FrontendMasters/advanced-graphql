module.exports = {
  resolvers: require('./project.resolvers'),
  typeDefs: require('../../utils/gqlLoader')('project/project.graphql'),
  model: require('./project.model')
}
