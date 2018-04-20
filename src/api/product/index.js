module.exports = {
  resolvers: require('./product.resolvers'),
  typeDefs: require('../../utils/gqlLoader')('product/product.graphql'),
  model: require('./product.model')
}
