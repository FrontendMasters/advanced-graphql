const product = require('./product')
const merge = require('lodash/merge')

module.exports = {
  typeDefs: [product.typeDefs].join(' '),
  resolvers: merge({}, product.resolvers),
  context: {
    models: {
      product: product.model
    }
  }
}
