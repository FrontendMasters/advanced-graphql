const db = require('../db')
const { runQuery } = require('../run')
const projectResolvers = require('../../src/api/project/project.resolvers')

// tests are executed using Jest https://facebook.github.io/jest/

describe('Project', () => {
  beforeAll(db.connectToDB)
  afterAll(db.disconnectDB)
  afterEach(db.cleanDB)

  describe('resolvers', () => {
    describe('project', () => {
      test('should resolve correctly', async () => {
        // test the resolver function
      })

      test('should have correct query', async () => {
        // run an actual query and test result
      })
    })
  })
})
