const { typeDefs, resolvers, context } = require('../src/api')
const { makeExecutableSchema } = require('graphql-tools')
const { graphql } = require('graphql')

const runQuery = (query, ctx = {}) => {
  const schema = makeExecutableSchema({typeDefs, resolvers})
  return graphql(schema, query, null, {...context, ...ctx})
}
