module.exports = {
  resolvers: require('./search.resolvers'),
  typeDefs: require('../../utils/gqlLoader')('search/search.graphql'),
}
