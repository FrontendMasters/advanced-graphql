const db = require('../db')

describe('Project', () => {
  beforeAll(db.connectToDB)
  afterAll(db.disconnectDB)
  afterEach(db.cleanDB)

  describe('resolvers', () => {
    test('test', () => {
      expect(1).toBe(1)
    })
  })
})
